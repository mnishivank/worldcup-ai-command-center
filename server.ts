import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

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

// Gemini Chat Endpoint for AI Assistant
app.post('/api/chat', async (req, res) => {
  try {
    const { prompt, context } = req.body;
    
    let systemInstruction = "You are the FIFA World Cup 2026 AI Assistant. Provide helpful, concise answers to fans, staff, and volunteers about stadium operations, schedules, navigation, and general tournament info. Tone should be professional, welcoming, and energetic.";
    
    if (context === 'operations') {
      systemInstruction = "You are the Operations Command Center AI. Provide tactical, concise summaries of stadium situations, crowd control recommendations, and emergency response suggestions based on provided data.";
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    res.json({ text: response.text });
  } catch (error: any) {
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
