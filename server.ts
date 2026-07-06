import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

dotenv.config();

const app = express();
app.set('trust proxy', 1);
const PORT = 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key_for_development';

// Security Middleware
app.use(helmet({
  contentSecurityPolicy: false, // Disabled for dev environment inline scripts/styles
}));
app.use(cors());
app.use(express.json({ limit: '10kb' })); // Limit body size to prevent payload too large DOS

// Rate Limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // limit each IP to 200 requests per windowMs
  validate: { xForwardedForHeader: false, trustProxy: false, default: true },
  message: { error: 'Too many requests, please try again later.' }
});

app.use('/api/', apiLimiter);

// JWT Authentication Middleware
const authenticateToken = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  // Allow unauthenticated access to login
  if (req.path === '/auth/login') return next();

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Authentication required' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired token' });
    (req as any).user = user;
    next();
  });
};

app.use('/api/', authenticateToken);

// Authentication Endpoint
app.post('/api/auth/login', (req, res) => {
  // In a real app, validate credentials here. For this demo, we issue a mock token.
  const token = jwt.sign({ role: 'fan', id: 'user_123' }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

// Initialize Gemini Client (Lazy initialization check recommended)
let aiClient: GoogleGenAI | null = null;
function getAIClient() {
  if (!aiClient) {
    if (!process.env.GEMINI_API_KEY) {
      console.warn("WARNING: GEMINI_API_KEY is not set.");
    }
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY || 'dummy_key',
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// Mock Analytics Data API
app.get('/api/analytics/crowd', (req, res) => {
  res.json({
    data: [
      { time: '10:00', 'Gate A': 400, 'Gate B': 240, 'Gate C': 2400 },
      { time: '11:00', 'Gate A': 300, 'Gate B': 139, 'Gate C': 2210 },
      { time: '12:00', 'Gate A': 200, 'Gate B': 9800, 'Gate C': 2290 },
      { time: '13:00', 'Gate A': 278, 'Gate B': 3908, 'Gate C': 2000 },
      { time: '14:00', 'Gate A': 189, 'Gate B': 4800, 'Gate C': 2181 },
      { time: '15:00', 'Gate A': 239, 'Gate B': 3800, 'Gate C': 2500 },
      { time: '16:00', 'Gate A': 349, 'Gate B': 4300, 'Gate C': 2100 },
    ]
  });
});

app.get('/api/analytics/sustainability', (req, res) => {
  res.json({
    energy: [
      { name: 'Mon', value: 4000 },
      { name: 'Tue', value: 3000 },
      { name: 'Wed', value: 2000 },
      { name: 'Thu', value: 2780 },
      { name: 'Fri', value: 1890 },
      { name: 'Sat', value: 2390 },
      { name: 'Sun', value: 3490 },
    ],
    waste: [
      { name: 'Recycled', value: 60 },
      { name: 'Compost', value: 30 },
      { name: 'Landfill', value: 10 },
    ]
  });
});

const chatSchema = z.object({
  prompt: z.string().min(1, 'Prompt is required').max(1000, 'Prompt too long'),
  context: z.string().optional()
});

// Gemini Chat Endpoint for AI Assistant
app.post('/api/chat', async (req, res) => {
  try {
    // Input Validation using Zod
    const validatedData = chatSchema.parse(req.body);
    const { prompt, context } = validatedData;
    
    let systemInstruction = "You are the FIFA World Cup 2026 AI Assistant. Provide helpful, concise answers to fans, staff, and volunteers about stadium operations, schedules, navigation, and general tournament info. Tone should be professional, welcoming, and energetic.";
    
    if (context === 'operations') {
      systemInstruction = "You are the Operations Command Center AI. Provide tactical, concise summaries of stadium situations, crowd control recommendations, and emergency response suggestions based on provided data.";
    }

    const ai = getAIClient();
    if (!process.env.GEMINI_API_KEY) {
      return res.status(503).json({ error: 'AI service unavailable: API key missing' });
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash", // Correct model alias
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    res.json({ text: response.text });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.issues[0].message });
    }
    console.error('Gemini API Error:', error);
    res.status(500).json({ error: error.message || 'Failed to generate response' });
  }
});

// Setup Vite Middleware or Static files
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
