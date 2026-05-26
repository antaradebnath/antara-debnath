import React, { useState } from "react";
import { Cpu, Layout, PenTool, BrainCircuit, Terminal, Activity } from "lucide-react";
import { SkillCategory } from "../types";

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const SKILL_CATEGORIES: SkillCategory[] = [
    {
      title: "Machine Learning / Computer Vision",
      color: "border-purple-900/60 text-purple-400 bg-purple-950/5",
      items: [
        { name: "PyTorch & Deep Learning", level: 90, percentageLabel: "Advanced", iconName: "Cpu", description: "Configuring Dense networks, CNN models, and training visual classifiers." },
        { name: "Computer Vision (OpenCV)", level: 85, percentageLabel: "Pro", iconName: "BrainCircuit", description: "Edge detections, contour trackers, and light intensity distributions." },
        { name: "Generative Art (GANs/VAEs)", level: 80, percentageLabel: "Strong", iconName: "BrainCircuit", description: "Fusing style transfer matrices and latent vector interpolations." },
        { name: "Scikit-Learn & Analytics", level: 85, percentageLabel: "Pro", iconName: "Terminal", description: "Feature engineering, regression trees, and classification pipelines." }
      ]
    },
    {
      title: "Frontend Engineering",
      color: "border-cyan-900/60 text-cyan-400 bg-cyan-950/5",
      items: [
        { name: "React 19 & Vite", level: 92, percentageLabel: "Expert", iconName: "Layout", description: "Clean hooks architecture, modular splitting, and high-DPI canvases." },
        { name: "TypeScript Core", level: 88, percentageLabel: "Advanced", iconName: "Terminal", description: "Strict type integrations, dynamic generics, and model interfaces." },
        { name: "Tailwind CSS Styling", level: 95, percentageLabel: "Master", iconName: "Layout", description: "Fluid responsive scales, custom bento grids, and glassmorphism UI." },
        { name: "D3.js & Dataviz", level: 75, percentageLabel: "Competent", iconName: "Activity", description: "Plotting visual weights and deep neural node networks graphs." }
      ]
    },
    {
      title: "Creative Tools & Art",
      color: "border-amber-900/60 text-amber-500 bg-amber-950/5",
      items: [
        { name: "Charcoal Sketching", level: 95, percentageLabel: "Diploma Honors", iconName: "PenTool", description: "Raw shading, gradient projection, structural guidelines design." },
        { name: "UI/UX Modeling (Figma)", level: 85, percentageLabel: "Pro", iconName: "Layout", description: "Fidelity wireframes, elegant negative space layouts, interactive user flows." },
        { name: "Adobe Photoshop & Illustrator", level: 80, percentageLabel: "Strong", iconName: "PenTool", description: "Digital vector layering, contour paths tracing, graphic composites." },
        { name: "Git & Docker Workflows", level: 85, percentageLabel: "Pro", iconName: "Terminal", description: "Multibranch integrations, environment virtualization, and actions scripting." }
      ]
    }
  ];

  const getIcon = (name: string) => {
    switch (name) {
      case "Cpu": return <Cpu className="w-4 h-4" />;
      case "Layout": return <Layout className="w-4 h-4" />;
      case "PenTool": return <PenTool className="w-4 h-4" />;
      case "BrainCircuit": return <BrainCircuit className="w-4 h-4" />;
      case "Terminal": return <Terminal className="w-4 h-4" />;
      case "Activity": return <Activity className="w-4 h-4" />;
      default: return <Cpu className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-8 text-left">
      {/* Visual Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-900/40 pb-6">
        <div>
          <span className="text-[11px] font-mono tracking-widest text-cyan-400 uppercase">My Stack</span>
          <h2 className="text-3xl font-sans font-extrabold text-white tracking-tight mt-1">
            Bento-Box Skills Map
          </h2>
        </div>

        {/* Filter buttons to inspect sections easily */}
        <div className="flex items-center gap-1.5 border border-gray-850 p-1.5 rounded-xl bg-gray-950/30">
          {["All", "Machine Learning", "Frontend", "Creative"].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 text-xs font-mono rounded-lg transition ${
                activeCategory === cat
                  ? "bg-gray-850 text-white shadow"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid displays categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {SKILL_CATEGORIES.map((category, idx) => {
          // Quick filter classification
          if (activeCategory !== "All") {
            const normalizedTitle = category.title.toLowerCase();
            const normalizedActive = activeCategory.toLowerCase();
            if (!normalizedTitle.includes(normalizedActive)) return null;
          }

          return (
            <div
              key={idx}
              className={`p-6 border rounded-2xl flex flex-col justify-between transition h-full ${category.color}`}
            >
              <div>
                <h3 className="text-sm font-sans font-bold tracking-wider uppercase mb-5">
                  {category.title}
                </h3>
                
                <div className="space-y-4">
                  {category.items.map((skill, sIdx) => (
                    <div key={sIdx} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-400 hover:text-white transition">
                            {getIcon(skill.iconName)}
                          </span>
                          <span className="text-xs font-mono font-medium text-gray-200">
                            {skill.name}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono opacity-80 uppercase tracking-widest text-gray-400">
                          {skill.percentageLabel}
                        </span>
                      </div>

                      {/* Custom styled glow meter */}
                      <div className="w-full h-1.5 bg-gray-900/60 rounded-full overflow-hidden">
                        <div
                          style={{ width: `${skill.level}%` }}
                          className="h-full bg-current opacity-80"
                        />
                      </div>

                      <p className="text-[10px] text-gray-400 font-mono leading-relaxed pl-1">
                        {skill.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-850/40 mt-6 pt-4 text-[9px] font-mono text-gray-500 uppercase tracking-widest text-right">
                • Class integration active
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
