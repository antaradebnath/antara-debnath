import React, { useState } from "react";
import { Mail, Linkedin, MapPin, Github, Send, CheckCircle, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "Junior Software Engineer",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setSubmitting(true);
    // Simulate API pipeline latency
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      // Reset form
      setFormData({
        name: "",
        email: "",
        company: "",
        role: "Junior Software Engineer",
        message: "",
      });
    }, 1200);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start text-left">
      {/* Contact Details Column */}
      <div className="lg:col-span-5 space-y-6">
        <div className="space-y-2">
          <span className="text-[11px] font-mono tracking-widest text-cyan-400 uppercase">Let's Connect</span>
          <h2 className="text-3xl font-sans font-extrabold text-white tracking-tight">
            Initiate Collaboration
          </h2>
          <p className="text-sm font-mono text-gray-400 leading-relaxed">
            I am actively seeking Junior Software Engineer, Frontend Engineer, and Machine Learning internships/opportunities. If you are a recruiter, tech lead, or open-source collaborator, let's explore synergies!
          </p>
        </div>

        <div className="space-y-4 pt-6">
          <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-950 bg-gray-950/10">
            <div className="p-2.5 rounded bg-cyan-950/40 border border-cyan-900 text-cyan-400">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest block">Direct Hotline</span>
              <a href="mailto:antaradebnath250@gmail.com" className="text-sm font-mono font-medium text-white hover:text-cyan-400 transition">
                antaradebnath250@gmail.com
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 rounded-xl border border-gray-950 bg-gray-950/10">
              <div className="p-2.5 rounded bg-purple-950/40 border border-purple-900 text-purple-400">
                <Linkedin className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest block">LinkedIn</span>
                <span className="text-xs font-mono font-medium text-gray-300">Antara Dev Nath</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-xl border border-gray-950 bg-[#121214]/10">
              <div className="p-2.5 rounded bg-amber-950/40 border border-amber-900 text-amber-500">
                <Github className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest block">GitHub</span>
                <span className="text-xs font-mono font-medium text-gray-300">@antara-dev-nath</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-950 bg-gray-950/10">
            <div className="p-2.5 rounded bg-indigo-950/40 border border-indigo-900 text-indigo-400">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest block">Base Coordinates</span>
              <span className="text-sm font-mono font-medium text-white">
                West Bengal, India (Open to Relocation / Remote)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recruiter Submission Form */}
      <div className="lg:col-span-7">
        <div className="p-6 rounded-2xl border border-gray-850 bg-gray-950/30 backdrop-blur-md relative overflow-hidden">
          {/* Subtle grid background */}
          <div className="absolute inset-0 bg-grid-zinc-900 opacity-20 pointer-events-none" />

          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="contact-form"
                onSubmit={handleSubmit}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6 relative z-10"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name field */}
                  <div className="space-y-2">
                    <label className="text-[10px] text-gray-500 font-mono uppercase tracking-widest block">
                      Recruiter Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Jane Doe"
                      className="w-full px-4 py-3 rounded-xl border border-gray-850 bg-gray-950/50 text-xs font-mono text-white placeholder-gray-650 focus:outline-none focus:border-cyan-500 transition"
                    />
                  </div>

                  {/* Email field */}
                  <div className="space-y-2">
                    <label className="text-[10px] text-gray-500 font-mono uppercase tracking-widest block">
                      Professional Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. jane@company.com"
                      className="w-full px-4 py-3 rounded-xl border border-gray-850 bg-gray-950/50 text-xs font-mono text-white placeholder-gray-650 focus:outline-none focus:border-cyan-500 transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Company field */}
                  <div className="space-y-2">
                    <label className="text-[10px] text-gray-500 font-mono uppercase tracking-widest block">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Google DeepMind"
                      className="w-full px-4 py-3 rounded-xl border border-gray-850 bg-gray-950/50 text-xs font-mono text-white placeholder-gray-650 focus:outline-none focus:border-cyan-500 transition"
                    />
                  </div>

                  {/* Desired role field */}
                  <div className="space-y-2">
                    <label className="text-[10px] text-gray-500 font-mono uppercase tracking-widest block">
                      Target Placement Role
                    </label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-850 bg-[#0c0c0e]/90 text-xs font-mono text-gray-300 focus:outline-none focus:border-cyan-500 transition cursor-pointer"
                    >
                      <option value="Junior Software Engineer">Junior Software Engineer</option>
                      <option value="Associate Frontend Developer">Associate Frontend Developer</option>
                      <option value="Machine Learning / AI Intern">Machine Learning / AI Intern</option>
                      <option value="Open-Source Collaborator">Open-Source Collaborator</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>
                </div>

                {/* Message field */}
                <div className="space-y-2">
                  <label className="text-[10px] text-gray-500 font-mono uppercase tracking-widest block">
                    Message Narrative *
                    </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="We love your Fine Arts + Machine Learning background! Let's arrange a brief call..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-850 bg-gray-950/50 text-xs font-mono text-white placeholder-gray-650 focus:outline-none focus:border-cyan-500 transition resize-none"
                  />
                </div>

                {/* Send Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 bg-gradient-to-r from-cyan-500 via-purple-600 to-indigo-700 hover:from-cyan-400 hover:to-indigo-600 text-white font-mono text-xs font-semibold tracking-wide rounded-xl shadow-[0_0_15px_rgba(34,211,238,0.2)] hover:shadow-[0_0_20px_rgba(168,85,247,0.35)] disabled:opacity-50 transition flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                      Broadcasting Coordinates...
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      Initialize Proposal Mappings
                    </>
                  )}
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="form-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 flex flex-col items-center justify-center text-center space-y-4"
              >
                <div className="w-14 h-14 rounded-full bg-emerald-950/40 border border-emerald-500 flex items-center justify-center text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)] animate-pulse">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-sans font-bold text-white tracking-tight">Proposal Successfully Synced</h4>
                  <p className="text-xs text-gray-400 font-mono mt-1 max-w-sm leading-relaxed">
                    Thank you! Your hiring coordinates have been validated and mapped to Antara's primary node. She will respond shortly.
                  </p>
                </div>
                
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 border border-gray-850 hover:border-gray-700 rounded-lg text-[11px] font-mono hover:bg-gray-900 transition text-gray-500 hover:text-gray-300"
                >
                  Send another coordinate mapping
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
