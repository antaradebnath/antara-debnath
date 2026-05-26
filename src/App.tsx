import React from "react";
import ParticleBackground from "./components/ParticleBackground";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import SketchAnalyzer from "./components/SketchAnalyzer";
import AiChatDouble from "./components/AiChatDouble";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import { Sparkles, ArrowDown, Cpu, Layers, MessageCircle, Mail, PenTool } from "lucide-react";

export default function App() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen text-gray-100 font-sans selection:bg-cyan-500/20 selection:text-cyan-300">
      {/* 1. Canvas Constellation Backdrop */}
      <ParticleBackground />

      {/* 2. Unified Header Navigation (Desktop Grid, Touch Targets Mobile) */}
      <header className="fixed top-0 left-0 right-0 h-16 border-b border-gray-900/30 bg-[#0a0a0c]/60 backdrop-blur-md z-40 transition-colors">
        <div className="max-w-6xl mx-auto h-full px-6 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection("home")}>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-cyan-500 flex items-center justify-center border border-white/5 font-mono text-xs font-bold text-white shadow-[0_0_10px_rgba(34,211,238,0.2)]">
              AN
            </div>
            <div>
              <span className="text-xs font-sans font-bold text-white tracking-tight uppercase">Antara Dev Nath</span>
              <span className="text-[9px] font-mono block text-gray-500 uppercase tracking-widest mt-0.5">Art & ML Engineer</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 font-mono text-xs">
            <button onClick={() => scrollToSection("about")} className="text-gray-400 hover:text-white transition">About</button>
            <button onClick={() => scrollToSection("skills")} className="text-gray-400 hover:text-white transition">Skills</button>
            <button onClick={() => scrollToSection("interactive-demos")} className="text-gray-400 hover:text-white transition">CV Sketch Pad</button>
            <button onClick={() => scrollToSection("ai-companion")} className="text-gray-400 hover:text-white transition">AI Double</button>
            <button onClick={() => scrollToSection("projects")} className="text-gray-400 hover:text-white transition">Projects</button>
            <button onClick={() => scrollToSection("contact")} className="px-3.5 py-1.5 rounded-lg border border-cyan-800 bg-cyan-950/20 text-cyan-400 hover:bg-cyan-950/40 hover:border-cyan-500 transition">Contact</button>
          </nav>

          {/* Quick contact trigger for mobile viewports */}
          <button 
            onClick={() => scrollToSection("contact")}
            className="md:hidden p-2 rounded-lg border border-cyan-800 bg-cyan-950/20 text-cyan-400 hover:bg-cyan-950/40 hover:border-cyan-500 transition"
          >
            <Mail className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* 3. Main Narrative Sections */}
      <main className="relative z-10 w-full max-w-6xl mx-auto px-6 py-12 space-y-32">
        {/* Hero Anchor */}
        <section id="home">
          <Hero />
        </section>

        {/* Biography & Portrait Anchor */}
        <section id="about" className="pt-8">
          <About />
        </section>

        {/* Tech Skills Anchor */}
        <section id="skills" className="pt-8">
          <Skills />
        </section>

        {/* Interactive CV Sketch Analyzer Anchor */}
        <section id="interactive-demos" className="pt-8 scroll-mt-24">
          <div className="mb-12 text-left">
            <div className="inline-flex items-center gap-1.5 py-1 px-3 border border-cyan-900 rounded-full bg-cyan-950/10 text-cyan-400 uppercase font-mono text-[10px] tracking-widest mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              Live Computer Vision Simulator
            </div>
            <h2 className="text-3xl sm:text-4xl font-sans font-extrabold text-white tracking-tight">
              CV Sketch Analyzer API
            </h2>
            <p className="text-sm text-gray-400 font-mono mt-1.5 max-w-3xl leading-relaxed">
              Experience the fusion of art and technology live. Draw anything on the canvas or load sketch template presets. Our machine learning agent analyzes line weights, spatial contours, and shading structures, transforming pixels into co-creative AI metaphors.
            </p>
          </div>
          
          <SketchAnalyzer />
        </section>

        {/* AI Virtual Twin Chat Companion Desktop */}
        <section id="ai-companion" className="pt-8 scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-4 text-left space-y-4">
              <div className="inline-flex items-center gap-1.5 py-1 px-3 border border-purple-900 rounded-full bg-purple-950/10 text-purple-400 uppercase font-mono text-[10px] tracking-widest">
                <Sparkles className="w-3 h-3 text-purple-400" />
                Artistic AI Double
              </div>
              <h2 className="text-3xl font-sans font-extrabold text-white tracking-tight">
                AI Interview Desk
              </h2>
              <p className="text-xs font-mono text-gray-450 leading-relaxed">
                Tech recruiters can interview a virtual copy of <b>Antara Dev Nath</b>.
              </p>
              <p className="text-xs font-mono text-gray-450 leading-relaxed">
                Trained in computer science specializations and fine art sketch contours, she speaks fluently on PyTorch optimization pipelines, classical linework composition, and career goals.
              </p>
              <div className="pt-4 flex flex-col space-y-2 border-t border-gray-900/60 font-mono text-[11px] text-gray-500">
                <span>• Online: Mapped seamlessly to Antara's resume</span>
                <span>• Core Model: Gemini-3.5-Flash</span>
              </div>
            </div>

            <div className="lg:col-span-8">
              <AiChatDouble />
            </div>
          </div>
        </section>

        {/* Sliders Projects Anchor */}
        <section id="projects" className="pt-8">
          <Projects />
        </section>

        {/* Contact Anchors */}
        <section id="contact" className="pt-8 pb-16">
          <Contact />
        </section>
      </main>

      {/* 4. Elegant Minimal Footer */}
      <footer className="border-t border-gray-900/40 bg-[#08080a]/90 relative z-10 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-900 border border-gray-800 text-xs font-mono font-bold text-gray-400 flex items-center justify-center">
              AN
            </div>
            <div className="text-left font-mono text-[11px] text-gray-500">
              <span>© {new Date().getFullYear()} Antara Dev Nath. All rights reserved.</span>
            </div>
          </div>

          <div className="flex gap-6 font-mono text-[11px] text-gray-500">
            <a href="#about" className="hover:text-gray-300 transition" onClick={() => scrollToSection("about")}>About</a>
            <a href="#skills" className="hover:text-gray-300 transition" onClick={() => scrollToSection("skills")}>Skills</a>
            <a href="#interactive-demos" className="hover:text-gray-300 transition" onClick={() => scrollToSection("interactive-demos")}>Sketch Pad</a>
            <a href="mailto:antaradebnath250@gmail.com" className="hover:text-cyan-400 transition">Email</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
