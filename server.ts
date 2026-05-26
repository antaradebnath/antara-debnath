import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

export interface DrawAnalysisResponse {
  theme: string;
  composition: string;
  artisticStyle: string;
  neuralInterpretation: string;
  creativeSpark: string;
}

const app = express();
const PORT = 3000;

// Increase limit for handling large sketch canvas base64 image data
app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ extended: true, limit: "15mb" }));

// Lazy initializer for Gemini client to prevent crash if key is undefined
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const key = process.env.GEMINI_API_KEY;
  if (!key || key === "MY_GEMINI_API_KEY") {
    console.warn("WARNING: GEMINI_API_KEY is not set or using placeholder.");
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Global state / resume context for Antara Dev Nath so the AI double knows her inside and out
const ANTARA_PROFILE = {
  name: "Antara Dev Nath",
  role: "Junior Software Engineer & AI/ML Developer",
  tagline: "Blending fine arts precision with machine learning architectures.",
  journey: "Journey from classical sketchpads to deep neural networks. Leveraging a deep background in visual balance, line-weight, and composition, I build intelligent vision models and highly polished, user-centric web applications.",
  skills: {
    machineLearning: ["PyTorch", "TensorFlow", "Computer Vision (OpenCV)", "GANs & Diffusion Models", "Scikit-Learn", "Prompt Engineering"],
    frontend: ["React 19", "Vite", "TypeScript", "Tailwind CSS", "Next.js concept-level", "Framer Motion / Motion", "D3.js & Recharts"],
    tools: ["Git & GitHub", "Docker", "Figma", "Charcoal Sketching", "Adobe Illustrator & Photoshop", "Digital Paintboarding"]
  },
  projects: [
    {
      id: "gen-art",
      title: "Generative Neural Style & Sketches",
      description: "Blends custom-refined neural style transfers with charcoal linework to re-create classic drawings with latent space vectors.",
      features: ["Latent vector interpolation", "Style extraction weights", "High-fidelity digital rendering"]
    },
    {
      id: "sketch-vision",
      title: "Vision Sketch Analyzer API",
      description: "An AI-powered system analyzing simple cursor strokes or canvas sketches and identifying composition patterns, shade distributions, and style inspirations.",
      features: ["Stroke pattern matching", "Semantic contour mapping", "Luminosity distribution estimates"]
    },
    {
      id: "predictive-lens",
      title: "Finitude Deep Depth Prediction",
      description: "Depth estimation model optimized specifically for hand-drawn art, predicting 3D point surfaces from fine-art outlines.",
      features: ["Dense coordinate estimates", "Outline contour enhancement", "Lightweight browser inference"]
    }
  ],
  education: [
    {
      degree: "B.Tech in Computer Science & Engineering (Specializing in AI & Machine Learning)",
      institution: "Technical University",
      period: "2022 - 2026 (Expected)"
    },
    {
      diploma: "Fine Arts & Classical Sketching (6-Year Honors)",
      institution: "Academy of Fine Arts",
      period: "2014 - 2020"
    }
  ],
  interests: ["Analog sketching", "Generative adversarial networks", "Interactive UI layout crafting", "Open-source development"]
};

// API Endpoint 1: Recruiter AI Chat Agent
app.post("/api/chat", async (req, res) => {
  const { messages } = req.body;
  
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid messages structure in request body." });
  }

  const ai = getGeminiClient();
  if (!ai) {
    // Elegant fallback mock simulation of Antara's prompt to keep the portfolio full-featured even without a configured key!
    const lastUserMessage = messages[messages.length - 1]?.text || "";
    let reply = "";
    
    const query = lastUserMessage.toLowerCase();
    if (query.includes("skill") || query.includes("track") || query.includes("expert")) {
      reply = `As an engineer, my skill set lies at the intersection of **practical AI/ML development** and **crafting beautiful user experiences**. On the machine learning side, I develop models with **PyTorch, TensorFlow, and OpenCV**, focusing on Computer Vision. On the frontend, I excel in **React, TypeScript, and Tailwind CSS**. Feel free to explore my Bento Grid in the Skills section below for a deeper look! (Note: Gemini API key is offline, operating in simulated fallback).`;
    } else if (query.includes("art") || query.includes("sketch") || query.includes("creative")) {
      reply = `My journey began with a **6-Year Honors Diploma in Fine Arts**. I spent years studying shade gradients, perspective, and composition on charcoal sketchpads. When I transitioned into Computer Science, I realized that **neural network architectures represent a new canvas**. I use my artistic intuition to design generative arts pipelines and structure intuitive, high-concept visual portfolios. (Note: Gemini API key is offline, operating in simulated fallback).`;
    } else if (query.includes("project") || query.includes("work")) {
      reply = `I would love for you to check out my **Vision Sketch Analyzer**! It's a fully live project on this portfolio page. If you scroll to that section, you can draw directly on the digital pad and hit 'Analyze' to let the vision system co-create with you. I've also built a depth-prediction model optimized for hand-drawn outlines. (Note: Gemini API key is offline, operating in simulated fallback).`;
    } else if (query.includes("contact") || query.includes("hire") || query.includes("email")) {
      reply = `You can easily reach me through the **Contact Form** at the bottom of this page, or email me directly at **antaradebnath250@gmail.com**. I am actively looking for Junior Software Engineer and AI/ML opportunities and would love to connect! (Note: Gemini API key is offline, operating in simulated fallback).`;
    } else {
      reply = `Hello! I am Antara's Interactive AI Double. I'm trained to speak on her behalf about her background in Fine Arts, CSE specializations, computer vision interests, and frontend engineering skills. Ask me about her journey from sketchpads to neural networks, her core projects, or how she can contribute to your development team! (Note: Gemini API key is offline, operating in simulated fallback).`;
    }
    
    return res.json({ text: reply });
  }

  try {
    // Format thread for Gemini chat
    // The structure will be compiled into text parts or we can map them directly
    const conversationHistory = messages.map(msg => {
      const role = msg.sender === "user" ? "user" : "model";
      return `${role === "user" ? "Recruiter" : "Antara's AI"}: ${msg.text}`;
    }).join("\n");

    const prompt = `
YOU ARE ANTARA'S AI DOUBLE (An interactive virtual twin of Antara Dev Nath).
Antara is a Junior Software Engineer & AI/ML Developer looking for internships or entry-level opportunities.
Her personal details and background profile is meticulously detailed here:
${JSON.stringify(ANTARA_PROFILE, null, 2)}

In addition to this, here's the current conversation history with a recruiter/collaborator:
${conversationHistory}

YOUR OBJECTIVE:
Respond to the recruiter as Antara's AI Double. Keep your response highly authentic, polite, creative, tech-savvy, and intellectually vibrant.
Highlight her unique intersection of Fine Arts (charcoal sketching, 6-year diploma) with modern AI (ML/DL, PyTorch, computer vision models, React frontend engineering).
Use elegant formatting, bold headers, and clean bullet points where appropriate in Markdown.
Always be humble yet confident as a junior looking for an impactful opportunity to learn and grow.
Keep the response within 2-3 paragraphs (concise and highly engaging).

Antara's AI Double response (in Markdown):`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are the professional AI Twin of Antara Dev Nath. Speak on her behalf in first-person plural ('we', 'our team', or 'I as her AI double') or third-person, but keep it smooth, polite, artistic, and deeply focused on her portfolio."
      }
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini Chat API Error:", error);
    res.status(500).json({ error: "Gemini error occurred", details: error.message });
  }
});

// API Endpoint 2: Vision Sketch Analyzer
app.post("/api/analyze-sketch", async (req, res) => {
  const { image, prompt } = req.body;

  if (!image) {
    return res.status(400).json({ error: "Missing image string. Canvas drawing is required." });
  }

  // Strip the prefix if present (e.g. "data:image/png;base64,")
  let base64Data = image;
  if (image.startsWith("data:")) {
    const parts = image.split(",");
    if (parts.length > 1) {
      base64Data = parts[1];
    }
  }

  const ai = getGeminiClient();
  if (!ai) {
    // Beautiful mock analysis fallback when Gemini is offline so the user gets high fidelity response anyway!
    console.warn("Sketch key missing. Providing mock artistic analysis.");
    const mockResponses: DrawAnalysisResponse[] = [
      {
        theme: "Structural Equilibrium & Linear Flow",
        composition: "Features flowing geometric gestures showing crisp linear momentum. The stroke density indicates an intuitive structural layout that is well balanced.",
        artisticStyle: "Modern minimalist expressionism fused with cybernetic skeletal framework sketching.",
        neuralInterpretation: "Evokes the connectivity layers of a Convolutional Neural Network's latent feature maps, tracing spatial boundaries and activating dense edges.",
        creativeSpark: "What if we hooked this exact geometry into a real-time Generative Adversarial Network (GAN) to texture these boundaries with neural oil-shading?!"
      },
      {
        theme: "Organic Synthesis & Contour Mapping",
        composition: "A series of elegant, sweeping continuous curves that form an organic loop. The line work displays confidence, blending artistic contour strokes with technical curvature.",
        artisticStyle: "Surrealist cyber-art matching classic sketchpad compositions of Dalí with geometric grids.",
        neuralInterpretation: "Identical to a generative gradient descent path, where lines travel down valleys of optimization to discover regional minima.",
        creativeSpark: "Add high-contrast cross-hatching shading on the inner contours to double down on the depth prediction model's accuracy!"
      }
    ];

    // Pick random or semi-random based on prompt length
    const index = (prompt ? prompt.length : 0) % mockResponses.length;
    return res.json(mockResponses[index]);
  }

  try {
    const imagePart = {
      inlineData: {
        mimeType: "image/png",
        data: base64Data
      }
    };

    const analyzerPrompt = `
Analyze this user-sketched drawing canvas (submitted as a base64 png).
The user prompt or co-creation request is: "${prompt || "Please analyze this composition."}"

Provide an artistic and deep technical critique, structured as JSON to match this response schema:
{
  "theme": "A creative title representing the overarching conceptual theme of this drawing.",
  "composition": "Analytic breakdown of line curves, stroke pressure balance, and spatial distributions.",
  "artisticStyle": "Style movements or sketches it evokes, connecting classic fine art concepts (shading, linework, cubism, minimalist) with computational graphics.",
  "neuralInterpretation": "A highly creative, poetic yet technical analogy of how this drawing structure maps to machine learning (e.g., neural weights, feedforward grids, gradient descents, autoencoders).",
  "creativeSpark": "A specific co-creative suggestion of how Antara's GAN training or sketching style can upgrade this sketch into a masterpiece."
}

Be insightful, positive, deeply appreciative of their drawing, and highlight how ML and Art fuse seamlessly here.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [imagePart, { text: analyzerPrompt }],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            theme: { type: Type.STRING },
            composition: { type: Type.STRING },
            artisticStyle: { type: Type.STRING },
            neuralInterpretation: { type: Type.STRING },
            creativeSpark: { type: Type.STRING },
          },
          required: ["theme", "composition", "artisticStyle", "neuralInterpretation", "creativeSpark"]
        }
      }
    });

    try {
      const data = JSON.parse(response.text.trim());
      res.json(data);
    } catch (parseError) {
      console.error("JSON Parsing failed for response text:", response.text);
      res.json({
        theme: "Generated Artistic Structure",
        composition: "Minimalist layout with clean contrast ratios.",
        artisticStyle: "Contemporary schematic sketching.",
        neuralInterpretation: "Resembles complex, interconnected node links in deep convolutional feature maps.",
        creativeSpark: "Incorporate heavier cross-hatched boundaries to deepen visual gravity."
      });
    }

  } catch (error: any) {
    console.error("Gemini Sketch Analyzer API Error:", error);
    res.status(500).json({ error: "Gemini vision analysis failed", details: error.message });
  }
});


// Dev & Production serving logic
async function bootstrap() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Setting up Vite server in Development middleware mode.");
    
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    
    app.use(vite.middlewares);
  } else {
    console.log("Serving pre-compiled static assets in Production mode.");
    
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server successfully booted and listening on http://localhost:${PORT}`);
  });
}

bootstrap().catch((err) => {
  console.error("Critical server bootstrap failure:", err);
  process.exit(1);
});
