import React from "react";
import { Sparkles, Code, PenTool, ArrowRight, Github } from "lucide-react";
import { motion } from "motion/react";

export default function Hero() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-12 overflow-hidden">
      <div className="relative max-w-5xl mx-auto px-6 z-10 text-center">
        {/* Subtle Pill Banner */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 bg-purple-950/30 border border-purple-800/40 rounded-full text-[11px] font-mono tracking-wider text-purple-300 uppercase mb-8"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Fusing classical fine arts & machine learning</span>
        </motion.div>

        {/* Display Typography pair */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-4xl sm:text-6xl md:text-7xl font-sans font-extrabold tracking-tight text-white mb-6 leading-[1.1]"
        >
          Synthesizing <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-indigo-500">Fine Arts</span> & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-amber-500">Neural Space</span>
        </motion.h1>

        {/* Narrative tagline */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-base sm:text-lg text-gray-400 font-mono max-w-3xl mx-auto leading-relaxed mb-10"
        >
          Hi, we are building software. I am <strong className="text-white font-semibold">Antara Dev Nath</strong>, a Junior Software Engineer & AI/ML Developer. I translate visual composition intuition, line weights, and classical sketch details into deep learning vision architectures and responsive web systems.
        </motion.p>

        {/* Call to action panel */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
        >
          <button
            onClick={() => scrollToSection("interactive-demos")}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-purple-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-mono text-sm font-semibold tracking-wide shadow-[0_0_20px_rgba(34,211,238,0.25)] hover:shadow-[0_0_25px_rgba(168,85,247,0.4)] transition flex items-center justify-center gap-2"
          >
            Play with CV Sketch Analyzer
            <ArrowRight className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => scrollToSection("ai-companion")}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-gray-800 bg-gray-950/40 hover:bg-gray-900 hover:border-gray-700 text-gray-300 font-mono text-sm transition flex items-center justify-center gap-2"
          >
            Interview My AI Avatar
          </button>
        </motion.div>

        {/* Core dynamic stats grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 border-t border-gray-900/60"
        >
          {[
            { metric: "6-Year", label: "Arts Honors Diploma", icon: PenTool, color: "text-amber-500" },
            { metric: "AI / ML", label: "Specialization Core", icon: Sparkles, color: "text-purple-400" },
            { metric: "React/TS", label: "Frontend Toolkit", icon: Code, color: "text-cyan-400" },
            { metric: "CSE", label: "B.Tech expected '26", label2: "", icon: Code, color: "text-indigo-400" },
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="flex flex-col items-center p-4 rounded-xl border border-gray-950 bg-gray-950/15 backdrop-blur-xs">
                <Icon className={`w-5 h-5 mb-2 ${stat.color}`} />
                <span className="text-xl sm:text-2xl font-sans font-bold text-white tracking-tight">{stat.metric}</span>
                <span className="text-[10px] text-gray-500 font-mono uppercase tracking-wide mt-1 text-center">{stat.label}</span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
