import React, { useRef, useState, useEffect } from "react";
import { Pencil, Trash2, UploadCloud, Sparkles, AlertCircle, RefreshCw, Layers } from "lucide-react";
import { DrawAnalysisResponse } from "../types";
import { motion, AnimatePresence } from "motion/react";

export default function SketchAnalyzer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [lineWidth, setLineWidth] = useState(3);
  const [color, setColor] = useState("#22d3ee"); // cyan neon
  const [prompt, setPrompt] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<DrawAnalysisResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  // Set up high-DPI custom drawing canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set initial size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    ctx.scale(2, 2);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    
    // Set a deep dark canvas background
    ctx.fillStyle = "#121214";
    ctx.fillRect(0, 0, rect.width, rect.height);
  }, []);

  // Sync canvas size on window resize
  const resizeCanvasToDisplaySize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Save existing contents
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const tempCtx = tempCanvas.getContext("2d");
    if (tempCtx) {
      tempCtx.drawImage(canvas, 0, 0);
    }

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    ctx.scale(2, 2);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    // Restore contents
    ctx.drawImage(tempCanvas, 0, 0, tempCanvas.width / 2, tempCanvas.height / 2);
  };

  useEffect(() => {
    window.addEventListener("resize", resizeCanvasToDisplaySize);
    return () => window.removeEventListener("resize", resizeCanvasToDisplaySize);
  }, []);

  // Drawing mouse/touch handlers
  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    
    let clientX = 0;
    let clientY = 0;

    if ("touches" in e) {
      if (e.touches.length === 0) return { x: 0, y: 0 };
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    // Prevent scrolling for mobile touches
    if ("touches" in e) {
      e.preventDefault();
    }
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    if ("touches" in e) {
      e.preventDefault();
    }
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    ctx.fillStyle = "#121214";
    ctx.fillRect(0, 0, rect.width, rect.height);
    setAnalysis(null);
    setError(null);
  };

  // Convert canvas contents to file object or Base64 and run API
  const handleAnalyze = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setAnalyzing(true);
    setAnalysis(null);
    setError(null);

    // Capture canvas base64 image data (png)
    const base64Image = canvas.toDataURL("image/png");

    try {
      const response = await fetch("/api/analyze-sketch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64Image, prompt: prompt }),
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      const result: DrawAnalysisResponse = await response.json();
      setAnalysis(result);
    } catch (err: any) {
      console.error(err);
      setError(
        "Our neural vision server is taking a deep breath. Try again, or wait a few seconds."
      );
    } finally {
      setAnalyzing(false);
    }
  };

  // Handle Drag & Drop Upload
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const processImageFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please drop a valid image file (.png, .jpg or .webp)");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const rect = canvas.getBoundingClientRect();
        
        // Solid fill canvas first
        ctx.fillStyle = "#121214";
        ctx.fillRect(0, 0, rect.width, rect.height);

        // Aspect ratio calculations
        const canvasRatio = rect.width / rect.height;
        const imgRatio = img.width / img.height;
        let drawWidth = rect.width;
        let drawHeight = rect.height;
        let startX = 0;
        let startY = 0;

        if (imgRatio > canvasRatio) {
          drawHeight = rect.width / imgRatio;
          startY = (rect.height - drawHeight) / 2;
        } else {
          drawWidth = rect.height * imgRatio;
          startX = (rect.width - drawWidth) / 2;
        }

        ctx.drawImage(img, startX, startY, drawWidth, drawHeight);
      };
      if (event.target?.result) {
        img.src = event.target.result as string;
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processImageFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processImageFile(e.target.files[0]);
    }
  };

  // Preset templates to guide recruiters and show fine art connection!
  const loadPresetTemplate = (type: "neural" | "spiral" | "face") => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    ctx.fillStyle = "#121214";
    ctx.fillRect(0, 0, rect.width, rect.height);

    ctx.strokeStyle = "rgba(147, 51, 234, 0.4)"; // faint sketched guidelines
    ctx.lineWidth = 2;

    const cx = rect.width / 2;
    const cy = rect.height / 2;

    if (type === "neural") {
      // Sketched diagram of neural network structure
      ctx.beginPath();
      // Draw nodes and lines
      const nodes = [
        { x: cx - 100, y: cy - 60 },
        { x: cx - 100, y: cy + 60 },
        { x: cx, y: cy - 90 },
        { x: cx, y: cy },
        { x: cx, y: cy + 90 },
        { x: cx + 100, y: cy - 40 },
        { x: cx + 100, y: cy + 40 },
      ];
      
      // Connect nodes
      nodes.forEach((n, idx) => {
        nodes.forEach((other, oIdx) => {
          if (idx < oIdx && Math.abs(idx - oIdx) < 4) {
            ctx.moveTo(n.x, n.y);
            ctx.quadraticCurveTo((n.x + other.x) / 2 + (Math.random() - 0.5) * 10, (n.y + other.y) / 2 + (Math.random() - 0.5) * 10, other.x, other.y);
          }
        });
      });
      ctx.stroke();

      // Nodes circles
      ctx.fillStyle = "rgba(34, 211, 238, 0.45)";
      nodes.forEach(n => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, 8, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
      });
    } else if (type === "spiral") {
      // Fibonnaci swirl representing golden ratio
      ctx.beginPath();
      let r = 2;
      ctx.moveTo(cx, cy);
      for (let theta = 0; theta < 8 * Math.PI; theta += 0.05) {
        const x = cx + r * Math.cos(theta);
        const y = cy + r * Math.sin(theta);
        ctx.lineTo(x, y);
        r += 0.35;
      }
      ctx.stroke();
    } else if (type === "face") {
      // Sketched loomis head guidelines
      ctx.beginPath();
      // Head sphere
      ctx.arc(cx, cy - 20, 60, 0, 2 * Math.PI);
      // Center vertical guideline
      ctx.moveTo(cx, cy - 95);
      ctx.lineTo(cx, cy + 90);
      // Eye horizontal line
      ctx.moveTo(cx - 75, cy - 20);
      ctx.lineTo(cx + 75, cy - 20);
      // Brow line
      ctx.moveTo(cx - 70, cy - 40);
      ctx.lineTo(cx + 70, cy - 40);
      // Nose line
      ctx.moveTo(cx - 40, cy + 10);
      ctx.lineTo(cx + 40, cy + 10);
      // Jaw outlines
      ctx.moveTo(cx - 60, cy - 20);
      ctx.quadraticCurveTo(cx - 55, cy + 40, cx - 25, cy + 75);
      ctx.lineTo(cx + 25, cy + 75);
      ctx.quadraticCurveTo(cx + 55, cy + 40, cx + 60, cy - 20);
      ctx.stroke();
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Visual Canvas Block */}
      <div className="lg:col-span-7 flex flex-col space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-xl font-sans font-semibold tracking-tight text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-cyan-400" />
              Creative Drawing Pad
            </h3>
            <p className="text-xs text-gray-400 font-mono mt-0.5">
              Draw shapes, neural networks, or curves for CV analysis
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-gray-500 font-mono uppercase">Sketch templates:</span>
            <button
              onClick={() => loadPresetTemplate("neural")}
              className="px-2.5 py-1 text-[11px] font-mono border border-gray-800 rounded bg-gray-950/40 text-purple-400 hover:border-purple-600/50 hover:bg-purple-950/20 transition"
            >
              Neural Layer
            </button>
            <button
              onClick={() => loadPresetTemplate("spiral")}
              className="px-2.5 py-1 text-[11px] font-mono border border-gray-800 rounded bg-gray-950/40 text-cyan-400 hover:border-cyan-600/50 hover:bg-cyan-950/20 transition"
            >
              Fib Swirl
            </button>
            <button
              onClick={() => loadPresetTemplate("face")}
              className="px-2.5 py-1 text-[11px] font-mono border border-gray-800 rounded bg-gray-950/40 text-amber-500 hover:border-amber-600/50 hover:bg-amber-950/20 transition"
            >
              Loomis Guide
            </button>
          </div>
        </div>

        {/* Outer Drawing Box supporting file drag and drop */}
        <div
          ref={containerRef}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all duration-300 ${
            isDragOver 
              ? "border-cyan-400 bg-gray-950/60 shadow-[0_0_15px_rgba(34,211,238,0.3)]" 
              : "border-gray-800/80 bg-[#121214]"
          }`}
        >
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full cursor-crosshair active:scale-[0.995] transition-transform duration-75"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />
          
          {/* Subtle instructions layout overlay */}
          <div className="absolute top-3 left-3 pointer-events-none px-2 py-1 rounded bg-black/60 backdrop-blur border border-white/5 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-[10px] tracking-widest font-mono text-cyan-300 uppercase">CV Sketch Terminal</span>
          </div>

          <AnimatePresence>
            {isDragOver && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/80 backdrop-blur-xs flex flex-col items-center justify-center pointer-events-none text-center p-6"
              >
                <UploadCloud className="w-12 h-12 text-cyan-400 animate-bounce mb-3" />
                <p className="text-sm text-cyan-200 font-mono">Drop your classical sketches here!</p>
                <p className="text-xs text-gray-500 mt-1">Converts drawn canvas structure instantly</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Toolbar Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl border border-gray-850 bg-gray-950/40 backdrop-blur">
          <div className="flex items-center gap-4">
            {/* Color Palette selectors */}
            <div className="flex flex-col space-y-1.5">
              <span className="text-[10px] text-gray-500 font-mono uppercase">Fine-Art Charcoal Color:</span>
              <div className="flex items-center gap-2">
                {[
                  { hex: "#22d3ee", name: "Cyan Spark" },
                  { hex: "#c084fc", name: "Neural Iris" },
                  { hex: "#f59e0b", name: "Amber Sieve" },
                  { hex: "#f43f5e", name: "Cyber Red" },
                  { hex: "#ffffff", name: "Chalk Pure" },
                ].map((item) => (
                  <button
                    key={item.hex}
                    onClick={() => setColor(item.hex)}
                    style={{ backgroundColor: item.hex }}
                    title={item.name}
                    className={`w-6 h-6 rounded-full border transition-all ${
                      color === item.hex
                        ? "border-white scale-125 shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                        : "border-transparent hover:scale-110"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Brush Thickness selector */}
            <div className="flex flex-col space-y-1">
              <span className="text-[10px] text-gray-500 font-mono uppercase">Stroke Weight: {lineWidth}px</span>
              <input
                type="range"
                min="1"
                max="8"
                step="1"
                value={lineWidth}
                onChange={(e) => setLineWidth(Number(e.target.value))}
                className="w-24 accent-cyan-400 h-1 rounded bg-gray-850"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="py-2 px-3 border border-gray-800 rounded-lg hover:border-gray-600 font-mono text-xs hover:bg-gray-900 transition flex items-center gap-1.5 text-gray-300"
            >
              <UploadCloud className="w-3.5 h-3.5" />
              Upload Sketch
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept="image/*"
              className="hidden"
            />
            
            <button
              onClick={clearCanvas}
              className="py-2 px-3 border border-red-950 hover:border-red-850 hover:bg-red-950/20 text-red-400/80 rounded-lg font-mono text-xs transition flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Clear Pad
            </button>
          </div>
        </div>

        {/* Custom prompts matching co-creation details */}
        <div className="flex flex-col space-y-1.5">
          <label className="text-[10px] text-gray-500 font-mono uppercase tracking-wide">
            Prompt / Directives for Vision Analyzer:
          </label>
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. 'How is the perspective in my circle?' or 'Analyze my hand contour...'"
              className="flex-1 px-4 py-2.5 rounded-lg border border-gray-800/80 bg-gray-950/50 text-xs font-mono text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500 transition"
            />
            <button
              onClick={handleAnalyze}
              disabled={analyzing}
              className="py-2.5 px-5 rounded-lg bg-gradient-to-r from-cyan-500 via-purple-600 to-indigo-700 hover:from-cyan-400 hover:to-indigo-600 text-white font-mono text-xs font-semibold tracking-wide disabled:opacity-50 transition shadow-[0_0_15px_rgba(34,211,238,0.25)] hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] flex items-center gap-2"
            >
              {analyzing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Analyzing Edge maps...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-cyan-200" />
                  Analyze & Co-create
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Analysis Response Panel */}
      <div className="lg:col-span-5 flex flex-col space-y-4 h-full">
        <div className="h-full border border-gray-850 rounded-xl bg-gray-950/30 backdrop-blur-md p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-gray-850 pb-4 mb-4">
              <div>
                <h4 className="text-base font-sans font-semibold text-white">
                  Neural CV Studio Response
                </h4>
                <p className="text-[11px] text-gray-500 font-mono">
                  Gemini-powered contour co-creation critique
                </p>
              </div>
              <div className="p-2 rounded bg-cyan-950/30 border border-cyan-850 text-cyan-400">
                <Sparkles className="w-4 h-4" />
              </div>
            </div>

            {/* Error state displays nicely */}
            {error && (
              <div className="p-3.5 mb-4 border border-amber-900/60 bg-amber-950/20 rounded-lg text-amber-500 text-xs flex gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span className="font-mono">{error}</span>
              </div>
            )}

            <div className="space-y-5">
              {!analysis && !analyzing && (
                <div className="flex flex-col items-center justify-center text-center py-16 px-4">
                  <div className="w-12 h-12 rounded-full border border-gray-800 flex items-center justify-center text-gray-600 animate-pulse mb-3">
                    <Pencil className="w-5 h-5" />
                  </div>
                  <h5 className="text-sm font-semibold text-gray-300 font-mono">Drawing terminal listening</h5>
                  <p className="text-xs text-gray-500 max-w-xs mt-1.5">
                    Draw some strokes on the pad to the left or select a sketch preset, then trigger the <b>Analyze & Co-create</b> algorithm.
                  </p>
                </div>
              )}

              {analyzing && (
                <div className="space-y-4 py-8">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="space-y-1.5 animate-pulse">
                      <div className="h-3 w-24 bg-gray-900 rounded" />
                      <div className="h-2 w-full bg-gray-950 rounded/60" />
                      <div className="h-2 w-11/12 bg-gray-950 rounded/30" />
                    </div>
                  ))}
                  <p className="text-[10px] text-center text-gray-500 font-mono uppercase animate-pulse mt-6">
                    Feeding pixel coordinates into the neural model...
                  </p>
                </div>
              )}

              {analysis && !analyzing && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] text-cyan-400 font-mono uppercase tracking-widest block">
                      Concept Theme
                    </span>
                    <h5 className="text-sm font-semibold font-sans text-white border-l-2 border-cyan-500 pl-3 py-0.5">
                      {analysis.theme}
                    </h5>
                  </div>

                  <div className="space-y-1 py-1">
                    <span className="text-[10px] text-purple-400 font-mono uppercase tracking-widest block">
                      Composition Dynamics
                    </span>
                    <p className="text-xs text-gray-300 font-mono leading-relaxed pl-3 border-l border-gray-850">
                      {analysis.composition}
                    </p>
                  </div>

                  <div className="space-y-1 py-1">
                    <span className="text-[10px] text-amber-500 font-mono uppercase tracking-widest block">
                      Stylistic Genealogy
                    </span>
                    <p className="text-xs text-gray-300 font-mono leading-relaxed pl-3 border-l border-gray-850">
                      {analysis.artisticStyle}
                    </p>
                  </div>

                  <div className="space-y-1 py-1">
                    <span className="text-[10px] text-indigo-400 font-mono uppercase tracking-widest block">
                      Latent Space Analogy
                    </span>
                    <p className="text-xs text-indigo-200/90 font-mono leading-relaxed pl-3 border-l border-indigo-950 bg-indigo-950/10 p-3.5 rounded-lg border">
                      {analysis.neuralInterpretation}
                    </p>
                  </div>

                  <div className="space-y-1 pt-1">
                    <span className="text-[10px] text-emerald-400 font-mono uppercase tracking-widest block">
                      Co-creative Spark
                    </span>
                    <div className="p-3.5 border border-emerald-950/40 bg-emerald-950/10 rounded-lg text-xs font-mono text-emerald-200/90 leading-relaxed flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{analysis.creativeSpark}</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          <div className="border-t border-gray-850 mt-6 pt-4 text-center">
            <span className="text-[9px] text-gray-600 font-mono uppercase tracking-widest block">
              Vision contour mapping API • Latent Weights v2.5
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
