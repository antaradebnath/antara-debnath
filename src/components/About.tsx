import React from "react";
import { Award, BookOpen, GraduationCap, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

export default function About() {
  const imagePath = "/src/assets/images/antara_portrait_1779812013740.png";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      {/* Visual Portrait Container */}
      <div className="lg:col-span-5 relative flex justify-center">
        <div className="relative w-full max-w-[340px] aspect-square rounded-2xl overflow-hidden border border-gray-800/80 shadow-[0_10px_40px_rgba(0,0,0,0.6)] group">
          {/* Neon framing effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition duration-500" />
          
          <img
            src={imagePath}
            alt="Antara Dev Nath Portrait Drawing"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover grayscale brightness-95 group-hover:scale-105 transition duration-700"
          />

          <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur border border-white/5 p-3 rounded-xl">
            <span className="text-[10px] font-mono tracking-widest text-cyan-400 block uppercase mb-1">Artist Profile v2.5</span>
            <span className="text-xs font-mono font-medium text-white block">"Art is pre-compiled design. Code is design initialized."</span>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-purple-500/40 rounded-tl-xl pointer-events-none" />
        <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-cyan-500/40 rounded-br-xl pointer-events-none" />
      </div>

      {/* Narrative Biography Block */}
      <div className="lg:col-span-7 flex flex-col space-y-6 text-left">
        <div className="space-y-2">
          <span className="text-[11px] font-mono tracking-widest text-cyan-400 uppercase">My Journey</span>
          <h2 className="text-3xl sm:text-4xl font-sans font-extrabold tracking-tight text-white">
            From Sketchpad outlines to Neural Latent Spaces
          </h2>
        </div>

        <p className="text-sm text-gray-400 font-mono leading-relaxed">
          I started my creative path traditionally, completing a <strong className="text-gray-200">6-Year Honors Diploma in Fine Arts Specializing in Charcoal Sketching</strong>. For years, my canvas was physical: understanding raw stroke pressure, continuous negative space balance, and composition density.
        </p>
        
        <p className="text-sm text-gray-400 font-mono leading-relaxed">
          When I stepped into Computer Science, I saw that deep neural network node layers are essentially multi-dimensional charcoal sketch blocks. Tracing visual contours with Convolutional Filters runs on the exact same aesthetic parameters as squinting an eye to block values! This intuition drives me to build smarter machine learning platforms, optimize vision networks, and formulate sleek, premium client-side portfolios.
        </p>

        {/* Chronological mini-milestones */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-900/40">
          <div className="p-4 rounded-xl border border-gray-900 bg-gray-950/20 backdrop-blur-xs flex items-start gap-3">
            <div className="p-2 rounded bg-purple-950/40 border border-purple-900 text-purple-400 mt-0.5">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-mono font-semibold text-white">B.Tech in CSE (AI/ML)</h4>
              <p className="text-[10px] text-gray-500 font-mono mt-0.5">Specializing in intelligent computer vision frameworks. Expected 2026.</p>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-gray-900 bg-gray-950/20 backdrop-blur-xs flex items-start gap-3">
            <div className="p-2 rounded bg-amber-950/40 border border-amber-900 text-amber-500 mt-0.5">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-mono font-semibold text-white">Fine Arts Honors</h4>
              <p className="text-[10px] text-gray-500 font-mono mt-0.5">Classical sketching honors. Academy of Fine Arts (6-Year Honors Diploma).</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
