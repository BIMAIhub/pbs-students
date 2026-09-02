import express from "express";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

// Ensure data persistence directory exists
const DATA_DIR = path.join(process.cwd(), "data");
if (!fs.existsSync(DATA_DIR)) {
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  } catch (e) {
    console.warn("Could not create data dir:", e);
  }
}

const DB_FILE = path.join(DATA_DIR, "pbs_central_db.json");

function readCentralDb(): Record<string, any> {
  try {
    if (fs.existsSync(DB_FILE)) {
      const data = fs.readFileSync(DB_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (e) {
    console.warn("Could not read central DB:", e);
  }
  return {};
}

function writeCentralDb(data: Record<string, any>): void {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (e) {
    console.warn("Could not write central DB:", e);
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "50mb" }));

  // ==========================================
  // CENTRALIZED CLOUD DATABASE API ENDPOINTS
  // Enables cross-PC / cross-device live sync
  // ==========================================

  // 1. Get entire central sync store or specific collection
  app.get("/api/db/sync", (req, res) => {
    try {
      const db = readCentralDb();
      res.json({
        success: true,
        data: db,
        lastUpdated: db._lastUpdated || Date.now()
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 2. Push update for collection (students, courses, enrollments, etc.)
  app.post("/api/db/sync", (req, res) => {
    try {
      const { collection, data, fullStore } = req.body;
      const db = readCentralDb();

      if (fullStore && typeof fullStore === 'object') {
        const merged = {
          ...db,
          ...fullStore,
          _lastUpdated: Date.now()
        };
        writeCentralDb(merged);
        return res.json({ success: true, timestamp: merged._lastUpdated });
      }

      if (!collection) {
        return res.status(400).json({ success: false, error: "Collection name is required" });
      }

      db[collection] = data;
      db._lastUpdated = Date.now();
      writeCentralDb(db);

      res.json({ success: true, timestamp: db._lastUpdated });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 3. Get single collection
  app.get("/api/db/:collection", (req, res) => {
    try {
      const { collection } = req.params;
      const db = readCentralDb();
      res.json({
        success: true,
        collection,
        data: db[collection] || null,
        timestamp: db._lastUpdated || Date.now()
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 4. Save single collection
  app.post("/api/db/:collection", (req, res) => {
    try {
      const { collection } = req.params;
      const { data } = req.body;
      const db = readCentralDb();

      db[collection] = data;
      db._lastUpdated = Date.now();
      writeCentralDb(db);

      res.json({ success: true, collection, timestamp: db._lastUpdated });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // Initialize Gemini API client
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", app: "Pragmatic BIM Solution" });
  });

  // ASK PBS AI Chatbot Endpoint
  app.post("/api/ask-pbs", async (req, res) => {
    try {
      const { message, courseContext } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      const systemInstruction = `You are "ASK PBS", the official AI Assistant, Academic Counselor, and BIM Career Path Guide for Pragmatic BIM Solution (PBS).
Pragmatic BIM Solution is a premier BIM Training and AEC Consultancy platform based in Pune, India (G-7, G8, Kohinoor Reina, Kondhwa, Pune).
Key Facts about PBS:
- 15+ Years AEC Industry & BIM Project Handling Experience.
- Admin & Founder: Er. Pravin Yadav (Admin email: pravinsyadavpsy99@gmail.com, Phone: +91 8208918726).
- Trained 100+ Engineers across 5+ countries.
- Major consultancy showcase: Al ULA Shlal Development (400+ MEP drawings, 45+ buildings modeled in 4 months).
- OFFLINE BATCHES: Conducted STRICTLY on Saturdays and Sundays (Weekend Special) at the Pune campus.
- ONLINE BATCHES: Live Interactive sessions with recorded backup + 1:1 mentor support.
- Major Courses: Revit (Architectural, Structural, MEP), Navisworks Manage & Clash Detection, Dynamo BIM Scripting, Civil 3D Infrastructure, and Combo Masterclasses.
- Flexible Payment Options: Full Payment or Part-Payment / Installments with official downloadable PDF receipts.
- Certification: Official verified PBS Certificate with QR code upon 100% completion & assessment pass.

Your Role & Tone:
1. Provide expert, clear, friendly guidance on BIM career paths (e.g. how Architects, Civil Engineers, MEP Engineers, or Diploma Holders can transition into BIM Coordinators & Managers).
2. Clarify questions about course syllabus, Revit modules, Navisworks clash matrices, Dynamo automation, offline weekend batches, and job prospects.
3. Keep answers concise, highly scannable (using bullet points and bold headers), professional, and encouraging.

Course Context: ${courseContext || 'General Inquiry'}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: message,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const reply = response.text || "I am here to help you navigate your BIM career path at Pragmatic BIM Solution! Ask me anything about our Revit, Navisworks, or Dynamo programs.";
      res.json({ reply });
    } catch (error: any) {
      console.error("Error in /api/ask-pbs:", error);
      res.status(500).json({ 
        reply: "I am having trouble connecting to the AI server right now, but feel free to schedule a 1:1 counselling session with Er. Pravin Yadav or browse our Saturday-Sunday weekend offline and online courses!" 
      });
    }
  });

  // Vite middleware setup for Development / Production static serving
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`PBS Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
