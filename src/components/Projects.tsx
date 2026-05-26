import React, { useState } from "react";
import { Github, ExternalLink, Cpu, Sparkles, Layers, Sliders } from "lucide-react";
import { Project } from "../types";
import { motion } from "motion/react";

export default function Projects() {
  const [blendValue, setBlendValue] = useState<number>(40);
  const [activeProject, setActiveProject] = useState<string>("init");

  const PROJECTS: Project[] = [
    {
      id: "gen-style",
      title: "Generative Neural Style & Sketches",
      subtitle: "charcoal style weights blending tracker",
      category: "Creative Tech",
      description: "Optimizes custom neural style transformations specifically tuned for physical black & white charcoal pencil weights, exporting latent space composites.",
      tags: ["PyTorch", "Style-Matrices", "Latent Vectors", "Pencil Shaders"],
      image: "",
      interactive: true
    },
    {
      id: "finitude-depth",
      title: "Finitude Deep Depth Prediction",
      subtitle: "3D outline coordinates mapping model",
      category: "AI/ML",
      description: "A specialized computer vision regression network estimating 3D dense depth files from simple 2D sketch borders, optimizing 3D CAD meshes directly from paper sketches.",
      tags: ["Supervised CNNs", "TensorFlow", "Edge-Mapping", "OBJ Export"],
      image: "",
      interactive: true
    }
  ];

  return (
    <div className="space-y-12 text-left">
      <div>
        <span className="text-[11px] font-mono tracking-widest text-cyan-400 uppercase">My Creations</span>
        <h2 className="text-3xl font-sans font-extrabold text-white tracking-tight mt-1">
          Interactive Technical Projects
        </h2>
        <p className="text-xs text-gray-450 font-mono mt-1">
          Adjust parameters or run the simulations directly on these card overlays
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
        {/* Project 1 Card: Style Weights Blending Slider */}
        <div className="p-6 rounded-2xl border border-gray-850 bg-gray-950/20 backdrop-blur-md flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded bg-purple-950/40 border border-purple-800 text-purple-400 font-mono text-[10px] tracking-wide uppercase">
                Creative Tech Integration
              </span>
              <div className="flex gap-2">
                <a href="#github" className="p-1 px-2 border border-gray-850 hover:border-gray-700 font-mono text-[10px] text-gray-400 hover:text-white rounded transition flex items-center gap-1">
                  <Github className="w-3 h-3" /> Source
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-base font-sans font-bold text-white tracking-tight">
                Generative Neural Style & Sketches
              </h3>
              <p className="text-[10px] text-gray-500 font-mono uppercase mt-0.5">
                Model: Latent Charcoal Style Transform weight mappings
              </p>
            </div>

            <p className="text-xs font-mono text-gray-400 leading-relaxed">
              Traces shading density grids of fine art sketchpads using modern convolutional weight tensors. You can use the slider below to simulate blending classic sketch lines into digital neural light projections!
            </p>

            {/* Interactive blending slider mockup */}
            <div className="p-4 border border-gray-850/80 rounded-xl bg-gray-950/50 space-y-4">
              <div className="flex items-center justify-between font-mono text-[10px]">
                <span className="text-amber-500">Charcoal Pencil Outlines (Traditional)</span>
                <span className="text-cyan-400">glowing neural layers (ML Style)</span>
              </div>

              {/* Visual simulated canvas blends dynamically based on slider */}
              <div className="h-28 rounded-lg overflow-hidden relative border border-gray-900 bg-[#0c0c0e] flex items-center justify-center">
                
                {/* 1. Underlying traditional sketched shape */}
                <div className="absolute inset-0 flex items-center justify-center transition-opacity" style={{ opacity: `${(100 - blendValue) / 100}` }}>
                  <svg className="w-20 h-20 text-gray-650" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
                    {/* Sketched concentric circles with jagged pencil lines */}
                    <circle cx="50" cy="50" r="30" strokeDasharray="3 3" />
                    <circle cx="50" cy="50" r="20" />
                    {/* Charcoal scribbles */}
                    <path d="M40,35 Q50,45 60,35" strokeWidth="0.8" />
                    <path d="M35,63 Q50,48 65,63" strokeWidth="0.8" />
                    <path d="M48,50 L52,52 L50,55" strokeWidth="1" />
                  </svg>
                </div>

                {/* 2. Overlaid neural network shape that glows (fades in as blend increases) */}
                <div className="absolute inset-0 flex items-center justify-center transition-opacity" style={{ opacity: `${blendValue / 100}` }}>
                  <svg className="w-20 h-20 text-cyan-400 filter drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
                    {/* Glowing nodes and links mapping */}
                    <circle cx="50" cy="5)0" r="25" />
                    <circle cx="50" cy="50" r="10" />
                    <path d="M25,50 L50,25 L75,50 L50,75 Z" strokeWidth="1" />
                    {/* Connector dots */}
                    <circle cx="25" cy="50" r="2" fill="currentColor" />
                    <circle cx="50" cy="25" r="2" fill="currentColor" />
                    <circle cx="75" cy="50" r="2" fill="currentColor" />
                    <circle cx="50" cy="75" r="2" fill="currentColor" />
                  </svg>
                </div>

                {/* Status Indicator text overlay */}
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/60 font-mono text-[9px] border border-white/5 text-gray-400">
                  Style Blend Ratio: <span className="text-white font-semibold font-mono">{blendValue}%</span>
                </div>
              </div>

              {/* Slider Controller */}
              <div className="flex items-center gap-3">
                <Sliders className="w-4 h-4 text-cyan-400 shrink-0" />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={blendValue}
                  onChange={(e) => setBlendValue(Number(e.target.value))}
                  className="flex-1 accent-cyan-400 h-1 bg-gray-900 rounded"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-900/40">
            {["PyTorch", "Style Transform", "Convolution Mappings", "Linear Weightings"].map((tag) => (
              <span key={tag} className="px-2 py-0.5 text-[9px] font-mono border border-gray-850/80 rounded bg-gray-950/10 text-gray-500">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Project 2 Card: Finitude 3D Depth Estimator Model */}
        <div className="p-6 rounded-2xl border border-gray-850 bg-gray-950/20 backdrop-blur-md flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded bg-indigo-950/40 border border-indigo-800 text-indigo-400 font-mono text-[10px] tracking-wide uppercase">
                Machine Learning core
              </span>
              <div className="flex gap-2">
                <a href="#github" className="p-1 px-2 border border-gray-850 hover:border-gray-700 font-mono text-[10px] text-gray-400 hover:text-white rounded transition flex items-center gap-1">
                  <Github className="w-3 h-3" /> Source
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-base font-sans font-bold text-white tracking-tight">
                Finitude Classical Outline Depth Estimator
              </h3>
              <p className="text-[10px] text-gray-500 font-mono uppercase mt-0.5">
                Architecture: Supervised Dense Outlines Regression CNN
              </p>
            </div>

            <p className="text-xs font-mono text-gray-400 leading-relaxed">
              Predicts high-fiedity 3D coordinates files from classical 2D pencil sketching lines in the browser. Interactive visualization captures estimated node coordinate rotations of outlines. Click below to randomize training seeds!
            </p>

            {/* Interactive 3D point cloud simulation */}
            <div className="p-4 border border-gray-850/80 rounded-xl bg-gray-950/50 space-y-4">
              <div className="flex items-center justify-between font-mono text-[10px]">
                <span className="text-gray-400">estimated coordinate grid maps</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Model Active
                </span>
              </div>

              {/* Coordinate point grid that spins/rotates subtly */}
              <div className="h-28 rounded-lg overflow-hidden border border-gray-900 bg-[#0c0c0e] relative flex items-center justify-center">
                <svg className="w-full h-full text-indigo-500/30" viewBox="0 0 200 100">
                  {/* Perspective grid lines */}
                  <line x1="20" y1="80" x2="180" y2="80" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
                  <line x1="50" y1="20" x2="20" y2="80" stroke="currentColor" strokeWidth="0.5" />
                  <line x1="150" y1="20" x2="180" y2="80" stroke="currentColor" strokeWidth="0.5" />
                  <line x1="100" y1="10" x2="100" y2="90" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />

                  {/* Estimated sketched outlines transformed to 3D Nodes */}
                  <g className="animate-pulse">
                    {[
                      { x: 100, y: 30, depth: "+12.4" },
                      { x: 74, y: 55, depth: "-5.2" },
                      { x: 126, y: 55, depth: "+8.9" },
                      { x: 60, y: 45, depth: "-22.1" },
                      { x: 140, y: 45, depth: "+30.5" },
                      { x: 100, y: 75, depth: "+0.1" },
                    ].map((pt, i) => (
                      <g key={i}>
                        <circle cx={pt.x} cy={pt.y} r="3" fill="#6366f1" />
                        <text x={pt.x + 6} y={pt.y + 3} fill="#a5b4fc" className="text-[6px] font-mono">{pt.depth}</text>
                        {/* Connecting estimated 3D links */}
                        <line x1="100" y1="30" x2={pt.x} y2={pt.y} stroke="#6366f1" strokeWidth="0.3" opacity="0.5" />
                        <line x1="100" y1="75" x2={pt.x} y2={pt.y} stroke="#6366f1" strokeWidth="0.3" opacity="0.5" />
                      </g>
                    ))}
                  </g>
                </svg>

                {/* Controls inside the simulator */}
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/60 font-mono text-[9px] border border-white/5 text-gray-400">
                  Mesh Output Seed: <span className="text-indigo-400 font-mono">0x7F4A</span>
                </div>
              </div>

              <div className="flex justify-end">
                <button 
                  onClick={() => {}}
                  className="py-1 px-3 border border-gray-850 hover:border-indigo-600/50 rounded bg-indigo-950/10 font-mono text-[10px] text-indigo-400 transition"
                >
                  Regenerate Mesh Coordinates
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-900/40">
            {["TensorFlow", "Depth Mesh Outlines", "Convolution Depth Maps", "CAD Mesh Export"].map((tag) => (
              <span key={tag} className="px-2 py-0.5 text-[9px] font-mono border border-gray-850/80 rounded bg-gray-950/10 text-gray-500">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
