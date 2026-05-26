import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, Sparkles, User, HelpCircle, RefreshCw } from "lucide-react";
import { ChatMessage } from "../types";
import { motion, AnimatePresence } from "motion/react";

export default function AiChatDouble() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "init",
      sender: "ai",
      text: "Hello! I am **Antara's Interactive AI Double**. I'm trained on her portfolio, professional background, 6-year Fine Arts Honors background, and machine learning specializations.\n\nAsk me anything about her projects, her skills, or how she can contribute to your development team!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });

      if (!response.ok) {
        throw new Error("Chat double service error");
      }

      const result = await response.json();
      const aiMsg: ChatMessage = {
        id: Math.random().toString(),
        sender: "ai",
        text: result.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
      const errorMsg: ChatMessage = {
        id: Math.random().toString(),
        sender: "ai",
        text: "**System double message:** Our neural routing layers are highly activated right now. Please test again in a moment, or feel free to email Antara directly at **antaradebnath250@gmail.com**!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(input);
  };

  // Pre-configured interview prompt vectors for recruiters (increases conversions!)
  const PRESET_PROMPTS = [
    { label: "🎨 Fine Arts Background", text: "Tell me about your 6-year Honours Diploma in Fine Arts and classical sketching." },
    { label: "⚡ Core Skills & PyTorch", text: "What are your main machine learning, computer vision, and programming skills?" },
    { label: "💼 Junior Opportunities?", text: "What kind of software engineer or AI roles are you looking for?" },
    { label: "🧬 Sketchpad to Neurons", text: "How does classical charcoal drawing help you design neural network systems?" },
  ];

  // Helper to parse simple markdown bold strings to elegant HTML safely
  const formatMarkdown = (text: string) => {
    return text.split("\n\n").map((para, paraIdx) => {
      // Split bold markers **
      const parts = para.split(/\*\*([\s\S]*?)\*\*/g);
      
      return (
        <p key={paraIdx} className="mb-2 last:mb-0 leading-relaxed">
          {parts.map((part, partIdx) => {
            // Even indexes are normal text, odd indexes were wrapped in **
            if (partIdx % 2 === 1) {
              return <strong key={partIdx} className="text-cyan-400 font-semibold">{part}</strong>;
            }
            return part;
          })}
        </p>
      );
    });
  };

  return (
    <div id="ai-chat-double" className="flex flex-col border border-gray-850 rounded-2xl overflow-hidden bg-gray-950/40 backdrop-blur-xl h-[560px] shadow-[0_4px_30px_rgba(0,0,0,0.4)]">
      {/* Header bar */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-850 bg-gray-950/70">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-600 to-cyan-500 flex items-center justify-center border border-white/10 text-white">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="text-sm font-sans font-semibold text-white">Antara's AI Double</h4>
              <span className="px-1.5 py-0.5 text-[9px] font-mono leading-none bg-cyan-950 border border-cyan-800 text-cyan-400 rounded">Avatar</span>
            </div>
            <p className="text-[10px] text-gray-500 font-mono">Powered by Gemini 3.5 Flash</p>
          </div>
        </div>

        <button 
          onClick={() => {
            setMessages([
              {
                id: Math.random().toString(),
                sender: "ai",
                text: "Session flushed. Ask me anything new about Antara's intersection of charcoal sketchpads and deep learning systems!",
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              }
            ]);
          }}
          title="Reset conversation"
          className="p-2 border border-gray-850 rounded-lg hover:border-gray-700 text-gray-500 hover:text-gray-300 transition"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto px-5 py-6 space-y-4 scrollbar-thin scrollbar-thumb-gray-800">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={`flex items-start gap-3.5 ${
                msg.sender === "user" ? "flex-row-reverse" : ""
              }`}
            >
              {/* Profile logo initials inside messages */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border text-xs shrink-0 ${
                msg.sender === "user" 
                  ? "bg-cyan-950/60 border-cyan-800 text-cyan-400" 
                  : "bg-purple-950/60 border-purple-800 text-purple-400"
              }`}>
                {msg.sender === "user" ? <User className="w-4 h-4" /> : <MessageSquare className="w-4 h-4" />}
              </div>

              {/* Message contents */}
              <div className="flex flex-col max-w-[80%]">
                <div className={`px-4 py-3 rounded-2xl text-xs font-mono border ${
                  msg.sender === "user"
                    ? "bg-cyan-950/20 border-cyan-900/60 text-cyan-50 rounded-tr-none"
                    : "bg-gray-900/40 border-gray-800/80 text-gray-200 rounded-tl-none"
                }`}>
                  {formatMarkdown(msg.text)}
                </div>
                <span className={`text-[9px] text-gray-600 font-mono mt-1 ${
                  msg.sender === "user" ? "text-right" : ""
                }`}>
                  {msg.timestamp}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-start gap-3.5"
          >
            <div className="w-8 h-8 rounded-full bg-purple-950/60 border border-purple-800 text-purple-400 flex items-center justify-center text-xs shrink-0 animate-pulse">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="flex flex-col max-w-[80%]">
              <div className="px-4 py-3 rounded-2xl bg-gray-900/30 border border-gray-850 text-gray-500 font-mono text-xs flex items-center gap-2 rounded-tl-none">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.4s]" />
                <span className="text-[10px] uppercase tracking-wide">Blending pixels and neural weights...</span>
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Preset prompt buttons for instant conversation triggers */}
      <div className="px-5 py-3.5 border-t border-gray-850 bg-gray-950/40">
        <span className="text-[9px] text-gray-500 font-mono uppercase tracking-widest block mb-2">Interrogator Hotline (Presets):</span>
        <div className="grid grid-cols-2 gap-2">
          {PRESET_PROMPTS.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(p.text)}
              className="px-3 py-2 border border-gray-850 hover:border-cyan-600/30 hover:bg-cyan-950/10 text-left font-mono text-[10px] text-gray-400 hover:text-cyan-300 rounded-lg transition overflow-hidden text-ellipsis whitespace-nowrap"
            >
              • {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chat input box */}
      <form onSubmit={handleInputSubmit} className="p-4 border-t border-gray-850 bg-gray-950/70 flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Antara's AI Double about PyTorch, her diploma, internships..."
          className="flex-1 px-4 py-3 border border-gray-850 bg-gray-900/30 font-mono text-xs text-white placeholder-gray-650 rounded-xl focus:outline-none focus:border-cyan-500/50 transition"
        />
        <button
          type="submit"
          className="p-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-xl transition flex items-center justify-center shrink-0 disabled:opacity-50"
          disabled={!input.trim() || loading}
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
