import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export default function FanAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Welcome to the World Cup 2026! I am your AI Fan Assistant. How can I help you today? You can ask me about match schedules, stadium navigation, or local recommendations.'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userMessage })
      });
      
      const data = await response.json();
      
      if (!response.ok) throw new Error(data.error || 'Failed to get response');

      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.text
      }]);
    } catch (error: any) {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'I apologize, but I am having trouble connecting to the network right now. Please try again later.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const SUGGESTIONS = [
    "What time does the USA vs England match start?",
    "Where is the nearest accessible entrance for Gate C?",
    "Are there any vegetarian food options near Section 120?",
    "How do I get to the stadium using public transit?"
  ];

  return (
    <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full p-4 md:p-6 h-[calc(100vh-4rem)]">
      
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Bot className="text-blue-400" /> AI Fan Assistant
          </h1>
          <p className="text-slate-400 text-sm">Powered by Google Gemini</p>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-xs font-medium bg-blue-500/10 text-blue-300 px-3 py-1.5 rounded-full border border-blue-500/20">
          <Info className="w-3.5 h-3.5" />
          Multilingual Support Active
        </div>
      </div>

      <div className="flex-1 glass-panel rounded-2xl border border-white/10 flex flex-col overflow-hidden relative shadow-2xl">
        
        {/* Chat Area */}
        <div 
          className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6"
          role="log"
          aria-live="polite"
          aria-atomic="false"
        >
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "flex gap-4 max-w-[85%]",
                  msg.role === 'user' ? "ml-auto flex-row-reverse" : ""
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center shrink-0 border",
                  msg.role === 'user' 
                    ? "bg-slate-700 border-slate-600 text-slate-200" 
                    : "bg-blue-600/20 border-blue-500/30 text-blue-400"
                )}>
                  {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                
                <div className={cn(
                  "p-4 rounded-2xl text-sm leading-relaxed",
                  msg.role === 'user'
                    ? "bg-rose-600 text-white rounded-tr-none"
                    : "bg-white/5 border border-white/5 text-slate-200 rounded-tl-none"
                )}>
                  {msg.content}
                </div>
              </motion.div>
            ))}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-4 max-w-[85%]"
              >
                <div className="w-8 h-8 rounded-full bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="p-4 rounded-2xl rounded-tl-none bg-white/5 border border-white/5 flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
                  <span className="text-slate-400 text-sm">Thinking...</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-slate-900/80 border-t border-white/10 backdrop-blur-md">
          {messages.length === 1 && (
            <div className="flex flex-wrap gap-2 mb-4" aria-label="Suggested questions">
              {SUGGESTIONS.map((suggestion, i) => (
                <button
                  key={i}
                  onClick={() => setInput(suggestion)}
                  className="text-xs bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-3 py-1.5 text-slate-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
          <form onSubmit={handleSubmit} className="flex gap-2">
            <label htmlFor="chat-input" className="sr-only">Type your message</label>
            <input
              id="chat-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about schedules, facilities, or directions..."
              className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus-visible:ring-2 focus-visible:ring-blue-500/50 transition-all"
              disabled={isLoading}
              aria-disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              aria-disabled={!input.trim() || isLoading}
              aria-label="Send message"
              className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:hover:bg-blue-600 text-white rounded-xl px-4 py-3 flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <Send className="w-5 h-5" aria-hidden="true" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
