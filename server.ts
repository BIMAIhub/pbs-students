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

// Default initial state to guarantee rich data on startup
const DEFAULT_INITIAL_STUDENTS = [
  {
    id: 'user-student-pravin',
    studentId: 'PBS-STU-2026-8492',
    rollNumber: 'PBS/2026/BIM-084',
    name: 'Pravin Yadav',
    email: 'pravin.yadav@pbs.com',
    password: 'pravinyadav@123',
    phone: '+91 8208918726',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    specialization: 'Autodesk Revit MEP Masterclass (LOD 300 - 500)',
    batch: '09/2026 (Sept 2026 Weekend Batch)',
    enrolledCourseIds: ['c1', 'c2', 'c3', 'c4'],
    enrolledCourseTitles: [
      'Autodesk Revit MEP Masterclass (LOD 300 to 500)',
      'Navisworks Manage & Multi-Disciplinary Clash Detection',
      'Computational BIM with Dynamo Visual Scripting',
      'ISO 19650 Global BIM Project Delivery Framework'
    ],
    attendancePercent: 100,
    totalFee: 41997,
    paidAmount: 34498,
    pendingBalance: 7499,
    paymentStatus: 'Part Paid',
    capstoneStatus: 'Stage 0: Strategic Definition in Progress',
    capstoneGrade: 'In Progress (Module 1 Active)',
    growthScore: 15,
    registrationDate: 'Sept 01, 2026',
    placement: {
      studentId: 'PBS-STU-2026-8492',
      targetRole: 'Senior BIM Coordinator / Digital Delivery Lead',
      targetLocations: ['Dubai / UAE', 'Riyadh / Saudi Arabia (NEOM)', 'United Kingdom', 'Pune / Bangalore'],
      expectedSalary: '₹14.5 - ₹18.0 LPA / AED 18,000 - 22,000 pm',
      portfolioUrl: 'https://pravinyadav-bim.portfolio.site',
      resumeStatus: 'Verified',
      mockInterviewScore: 96,
      mockInterviewFeedback: 'Strong background and enthusiasm for ISO 19650 BEP workflows and MEP engineering. Starting Module 1 of the cohort.',
      mockInterviewDate: 'Sept 01, 2026',
      readinessStatus: 'In Training',
      referredCompanies: [
        {
          companyName: 'AtkinsRéalis (Dubai / UK Infrastructure)',
          role: 'BIM Coordinator - MEP Systems',
          location: 'Dubai Design District, UAE',
          status: 'Shortlisted'
        },
        {
          companyName: 'WSP Middle East',
          role: 'Senior BIM MEP Specialist',
          location: 'Riyadh, KSA',
          status: 'Shortlisted'
        },
        {
          companyName: 'Jacobs Engineering',
          role: 'Digital Delivery Engineer',
          location: 'Pune / London',
          status: 'Shortlisted'
        }
      ]
    },
    messages: [
      {
        id: 'msg-1',
        sender: 'admin',
        senderName: 'PBS Academic Director',
        timestamp: 'Sept 01, 2026 10:00 AM',
        subject: 'Welcome to BIM Professional Cohort 2026 - Module 1 Active',
        message: 'Welcome to your PBS BIM masterclass cohort! Your curriculum is active starting from Module 01. Please join the live orientation and begin Module 1 video lessons & BIM central datasets.',
        isRead: true
      }
    ]
  }
];

function readCentralDb(): Record<string, any> {
  try {
    if (fs.existsSync(DB_FILE)) {
      const raw = fs.readFileSync(DB_FILE, "utf-8");
      if (raw && raw.trim().length > 0) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object') {
          // Ensure students exist
          if (!Array.isArray(parsed.students) || parsed.students.length === 0) {
            parsed.students = DEFAULT_INITIAL_STUDENTS;
          }
          return parsed;
        }
      }
    }
  } catch (e) {
    console.warn("Could not read central DB:", e);
  }
  
  const initial = {
    students: DEFAULT_INITIAL_STUDENTS,
    courses: [],
    enrollments: [],
    receipts: [],
    activityLogs: [],
    exams: {},
    certConfigs: {},
    progress: {},
    portfolios: {},
    studentCustomPasswords: {},
    settings: {},
    _lastUpdated: Date.now()
  };
  writeCentralDb(initial);
  return initial;
}

function writeCentralDb(data: Record<string, any>): void {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (e) {
    console.warn("Could not write central DB:", e);
  }
}

// Intelligent item merger by ID
function mergeArrayById<T extends { id?: string; studentId?: string; receiptId?: string }>(
  existing: T[] = [],
  incoming: T[] = [],
  idKey: 'id' | 'studentId' | 'receiptId' = 'id'
): T[] {
  if (!Array.isArray(incoming) || incoming.length === 0) return existing;
  if (!Array.isArray(existing) || existing.length === 0) return incoming;

  const map = new Map<string, T>();
  for (const item of existing) {
    const key = (item as any)[idKey] || (item as any).id || (item as any).studentId || JSON.stringify(item);
    map.set(key, item);
  }

  for (const item of incoming) {
    const key = (item as any)[idKey] || (item as any).id || (item as any).studentId || JSON.stringify(item);
    const prev = map.get(key);
    map.set(key, prev ? { ...prev, ...item } : item);
  }

  return Array.from(map.values());
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
  app.get(["/api/db/sync", "/api/db/sync-all"], (req, res) => {
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

  // 2. Push update for collection or full store with intelligent merging
  app.post(["/api/db/sync", "/api/db/sync-all"], (req, res) => {
    try {
      const { collection, data, fullStore } = req.body;
      const db = readCentralDb();

      if (fullStore && typeof fullStore === 'object') {
        const merged = {
          ...db,
          ...fullStore,
          students: mergeArrayById(db.students || [], fullStore.students || [], 'studentId'),
          courses: mergeArrayById(db.courses || [], fullStore.courses || [], 'id'),
          enrollments: mergeArrayById(db.enrollments || [], fullStore.enrollments || [], 'id'),
          receipts: mergeArrayById(db.receipts || [], fullStore.receipts || [], 'receiptId'),
          activityLogs: mergeArrayById(db.activityLogs || [], fullStore.activityLogs || [], 'id'),
          exams: { ...(db.exams || {}), ...(fullStore.exams || {}) },
          certConfigs: { ...(db.certConfigs || {}), ...(fullStore.certConfigs || {}) },
          progress: { ...(db.progress || {}), ...(fullStore.progress || {}) },
          portfolios: { ...(db.portfolios || {}), ...(fullStore.portfolios || {}) },
          studentCustomPasswords: { ...(db.studentCustomPasswords || {}), ...(fullStore.studentCustomPasswords || {}) },
          settings: { ...(db.settings || {}), ...(fullStore.settings || {}) },
          _lastUpdated: Date.now()
        };
        writeCentralDb(merged);
        return res.json({ success: true, timestamp: merged._lastUpdated, data: merged });
      }

      if (!collection) {
        return res.status(400).json({ success: false, error: "Collection name is required" });
      }

      if (collection === 'students' && Array.isArray(data)) {
        db.students = mergeArrayById(db.students || [], data, 'studentId');
      } else if (collection === 'courses' && Array.isArray(data)) {
        db.courses = mergeArrayById(db.courses || [], data, 'id');
      } else if (collection === 'enrollments' && Array.isArray(data)) {
        db.enrollments = mergeArrayById(db.enrollments || [], data, 'id');
      } else if (collection === 'receipts' && Array.isArray(data)) {
        db.receipts = mergeArrayById(db.receipts || [], data, 'receiptId');
      } else if (collection === 'activityLogs' && Array.isArray(data)) {
        db.activityLogs = mergeArrayById(db.activityLogs || [], data, 'id');
      } else if (['exams', 'certConfigs', 'progress', 'portfolios', 'studentCustomPasswords', 'settings'].includes(collection)) {
        db[collection] = { ...(db[collection] || {}), ...(data || {}) };
      } else {
        db[collection] = data;
      }

      db._lastUpdated = Date.now();
      writeCentralDb(db);

      res.json({ success: true, timestamp: db._lastUpdated, data: db[collection] });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 3. Direct verification endpoint for student accounts across devices (Must be declared before :collection)
  app.post("/api/db/verify-student", (req, res) => {
    try {
      const { emailOrRoll, password } = req.body;
      if (!emailOrRoll) {
        return res.status(400).json({ success: false, message: "Missing email or roll number" });
      }

      const db = readCentralDb();
      const cleanQuery = String(emailOrRoll).trim().toLowerCase();
      const cleanPhoneDigits = cleanQuery.replace(/[^0-9]/g, '');
      const emailPrefix = cleanQuery.replace(/@.*$/, '');

      const match = (db.students || []).find((s: any) => {
        if (!s) return false;
        const sEmail = (s.email || '').toLowerCase();
        const sPersonal = (s.personalEmail || '').toLowerCase();
        const sGoogle = (s.googleEmailId || '').toLowerCase();
        const sRoll = (s.rollNumber || '').toLowerCase();
        const sId = (s.studentId || '').toLowerCase();
        const sName = (s.name || '').toLowerCase();
        const sPhone = (s.phone || '').replace(/[^0-9]/g, '');

        return (
          sEmail === cleanQuery ||
          sPersonal === cleanQuery ||
          sGoogle === cleanQuery ||
          sRoll === cleanQuery ||
          sId === cleanQuery ||
          (cleanPhoneDigits.length >= 10 && sPhone.includes(cleanPhoneDigits))
        );
      });

      if (match) {
        return res.json({
          success: true,
          found: true,
          student: match
        });
      }

      const enrMatch = (db.enrollments || []).find((e: any) =>
        e.studentEmail?.toLowerCase() === cleanQuery ||
        e.studentId?.toLowerCase() === cleanQuery ||
        (cleanPhoneDigits.length >= 10 && e.studentPhone?.replace(/[^0-9]/g, '').includes(cleanPhoneDigits))
      );

      if (enrMatch) {
        return res.json({
          success: true,
          found: true,
          student: {
            id: enrMatch.id || enrMatch.studentId,
            studentId: enrMatch.studentId,
            rollNumber: `PBS/2026/BIM-${enrMatch.studentId.slice(-3)}`,
            name: enrMatch.studentName,
            email: enrMatch.studentEmail,
            role: 'student',
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(enrMatch.studentName)}`,
            phone: enrMatch.studentPhone,
            specialization: enrMatch.courseTitle
          }
        });
      }

      return res.json({ 
        success: false, 
        found: false, 
        message: "No active enrollment found in PBS Student Registry. Please enroll via Admissions or the Admin Portal." 
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 4. Get single collection
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

  // 5. Save single collection
  app.post("/api/db/:collection", (req, res) => {
    try {
      const { collection } = req.params;
      const { data } = req.body;
      const db = readCentralDb();

      if (collection === 'students' && Array.isArray(data)) {
        db.students = mergeArrayById(db.students || [], data, 'studentId');
      } else if (collection === 'courses' && Array.isArray(data)) {
        db.courses = mergeArrayById(db.courses || [], data, 'id');
      } else if (collection === 'enrollments' && Array.isArray(data)) {
        db.enrollments = mergeArrayById(db.enrollments || [], data, 'id');
      } else if (collection === 'receipts' && Array.isArray(data)) {
        db.receipts = mergeArrayById(db.receipts || [], data, 'receiptId');
      } else if (['exams', 'certConfigs', 'progress', 'portfolios', 'studentCustomPasswords', 'settings'].includes(collection)) {
        db[collection] = { ...(db[collection] || {}), ...(data || {}) };
      } else {
        db[collection] = data;
      }

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
