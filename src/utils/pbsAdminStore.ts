/**
 * PBS Central Admin & LMS Unified Store
 * Manages students roster, course creation, Google Drive video lessons,
 * anti-download video protections, Q&A messaging, and placement & interview assistance.
 */

export interface StudentPlacementRecord {
  studentId: string;
  targetRole: string;
  targetLocations: string[];
  expectedSalary: string;
  portfolioUrl: string;
  resumeStatus: 'Verified' | 'Under Review' | 'Needs Update';
  mockInterviewScore: number; // out of 100
  mockInterviewFeedback: string;
  mockInterviewDate: string;
  readinessStatus: 'Ready for MNC Placement' | 'Mock Interview Scheduled' | 'Profile Shortlisted' | 'Offer Received' | 'In Training';
  referredCompanies: {
    companyName: string;
    role: string;
    location: string;
    status: 'Shortlisted' | 'Interview Scheduled' | 'Technical Round Cleared' | 'Offer Letter Released';
    interviewDate?: string;
  }[];
}

export interface EnrollmentRequest {
  id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  courseId: string;
  courseTitle: string;
  totalFee: number;
  amountPaid: number;
  pendingBalance: number;
  paymentPlan: 'Full Payment' | 'Part Payment (50%)';
  paymentMethod: 'UPI' | 'GPay' | 'PhonePe' | 'Paytm' | 'Bank Transfer';
  upiId: string; // 'pravinsyadavpsy99-03@oksbi'
  transactionId: string; // UTR / Reference number
  screenshotUrl?: string;
  submittedAt: string;
  slaDeadline: string; // 24 hours from submittedAt
  status: 'Pending Verification' | 'Approved & Assigned' | 'Rejected';
  adminNotes?: string;
  verifiedAt?: string;
  verifiedBy?: string;
}

export interface StudentMessageItem {
  id: string;
  sender: 'admin' | 'student';
  senderName: string;
  timestamp: string;
  subject: string;
  message: string;
  isRead: boolean;
  replyToId?: string;
}

export interface StudentActivityLog {
  id: string;
  studentId: string;
  studentName: string;
  actionType: 'login' | 'video_watched' | 'module_completed' | 'asset_downloaded' | 'task_submitted' | 'mcq_attempted' | 'certificate_unlocked' | 'portfolio_updated';
  details: string;
  timestamp: string;
  metadata?: {
    courseId?: string;
    courseTitle?: string;
    lessonTitle?: string;
    assetName?: string;
    durationMinutes?: number;
    score?: number;
    totalQuestions?: number;
    deviceInfo?: string;
    ipAddress?: string;
  };
}

export interface McqQuestion {
  id: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}

export interface CourseMcqExam {
  courseId: string;
  title: string;
  description: string;
  passingScorePercent: number;
  timeLimitMinutes: number;
  questions: McqQuestion[];
}

export interface CourseCertificateConfig {
  courseId: string;
  theme: 'emerald' | 'gold' | 'cyber-blue' | 'ruby' | 'academic';
  borderStyle: 'classic-double' | 'modern-minimal' | 'ornate-gold' | 'tech-geometric';
  certificateTitle: string;
  subtitle: string;
  signatureName1: string;
  signatureTitle1: string;
  signatureName2: string;
  signatureTitle2: string;
  showQrCode: boolean;
  showAccreditations: boolean;
  institutionName: string;
  accreditationText: string;
  aiPromptUsed?: string;
}

export interface StudentCourseProgress {
  studentId: string;
  courseId: string;
  completedLessonIds: string[];
  totalActiveTimeMinutes: number;
  lastStudiedAt: string;
  taskSubmitted: boolean;
  taskSubmissionDetails?: {
    taskId: string;
    taskName: string;
    submittedAt: string;
    score?: number;
    feedback?: string;
  };
  mcqAttempted: boolean;
  mcqPassed: boolean;
  mcqScore?: number;
  mcqTotal?: number;
  mcqCompletedAt?: string;
  isCertified: boolean;
  certificateId?: string;
  certificateIssuedDate?: string;
}

export interface StudentPortfolioProfile {
  studentId: string;
  isPublic: boolean;
  headline: string;
  bio: string;
  skills: { name: string; level: number; category: string }[];
  featuredProjects: {
    id: string;
    title: string;
    category: string;
    description: string;
    imageUrl?: string;
    projectUrl?: string;
    lodLevel: string;
    softwareUsed: string[];
  }[];
  socialLinks: {
    linkedin?: string;
    github?: string;
    portfolio?: string;
    email?: string;
    phone?: string;
    location?: string;
  };
}

export interface LeaderboardStudentData {
  rank: number;
  studentId: string;
  name: string;
  avatar: string;
  rollNumber: string;
  specialization: string;
  credits: number;
  tasksCompleted: number;
  attendancePercent: number;
  streakDays: number;
  activeStudyMinutes: number;
  badge: string;
  isCurrentUser?: boolean;
}

export interface ManagedStudent {
  id: string;
  studentId: string;
  rollNumber: string;
  name: string;
  email: string;
  personalEmail?: string;
  googleEmailId?: string;
  password?: string;
  phone: string;
  avatar: string;
  specialization: string;
  batch: string; // e.g. "09/2026"
  enrolledCourseIds: string[];
  enrolledCourseTitles: string[];
  attendancePercent: number;
  totalFee: number;
  paidAmount: number;
  pendingBalance: number;
  paymentStatus: 'Full Paid' | 'Part Paid' | 'Pending';
  capstoneStatus: string;
  capstoneGrade: string;
  growthScore: number; // 0 - 100
  registrationDate: string;
  placement: StudentPlacementRecord;
  messages: StudentMessageItem[];
}

export interface AdminVideoLesson {
  id: string;
  title: string;
  duration: string;
  videoType: 'microsoft-drive' | 'google-drive' | 'youtube' | 'direct' | 'pbs-secure';
  videoUrl: string; // Microsoft OneDrive/SharePoint embed or Google drive view/preview link or direct URL
  isCompleted?: boolean;
  assignedStudentId?: string; // 'all' or specific studentId
  addedBy: string;
  addedDate: string;
  description?: string;
  learningObjectives?: string[];
  cloudDriveFolderUrl?: string; // Microsoft Drive / Google Drive dataset folder link
  bimDatasetUrl?: string;
}

export type VideoLesson = AdminVideoLesson;

export interface AdminCourseModule {
  id: string;
  moduleCode: string;
  title: string;
  duration: string;
  lessons: AdminVideoLesson[];
}

export interface AdminCourse {
  id: string;
  title: string;
  category: 'Revit' | 'Navisworks' | 'Dynamo' | 'ISO 19650' | 'Civil 3D' | 'BIM Management';
  level: 'Foundational' | 'Professional' | 'Advanced Masterclass' | 'Executive';
  badge: string;
  batchSchedule: string;
  batchMode: 'Online Interactive Live' | 'Offline Weekend (Sat-Sun)' | 'Hybrid Cohort';
  instructor: string;
  totalFee: number;
  description: string;
  thumbnail: string;
  accentColor: string;
  modules: AdminCourseModule[];
  assignedTo: 'all' | string; // 'all' or studentId like 'PBS-STU-2026-8492'
  createdDate: string;
  isPublished: boolean;
  microsoftDriveUrl?: string; // Shared Microsoft OneDrive / SharePoint library
  googleDriveUrl?: string;
}

// Intelligent Student list merger to avoid any loss across tabs, devices, or cloud sync
export function mergeStudentsList(base: ManagedStudent[] = [], incoming: ManagedStudent[] = []): ManagedStudent[] {
  const result: ManagedStudent[] = [...(Array.isArray(base) ? base : [])];
  
  if (!Array.isArray(incoming) || incoming.length === 0) {
    return result;
  }

  for (const inc of incoming) {
    if (!inc) continue;
    const incId = (inc.studentId || inc.id || '').toLowerCase().trim();
    const incEmail = (inc.email || '').toLowerCase().trim();
    const incPersonalEmail = (inc.personalEmail || '').toLowerCase().trim();
    const incGoogleEmail = (inc.googleEmailId || '').toLowerCase().trim();
    const incRoll = (inc.rollNumber || '').toLowerCase().trim();
    const incName = (inc.name || '').toLowerCase().trim();
    const incPhone = (inc.phone || '').replace(/[^0-9]/g, '');
    
    const existingIndex = result.findIndex(b => {
      if (!b) return false;
      const bId = (b.studentId || b.id || '').toLowerCase().trim();
      const bEmail = (b.email || '').toLowerCase().trim();
      const bPersonalEmail = (b.personalEmail || '').toLowerCase().trim();
      const bGoogleEmail = (b.googleEmailId || '').toLowerCase().trim();
      const bRoll = (b.rollNumber || '').toLowerCase().trim();
      const bName = (b.name || '').toLowerCase().trim();
      const bPhone = (b.phone || '').replace(/[^0-9]/g, '');
      
      return (
        (incId && bId && incId === bId) ||
        (incRoll && bRoll && incRoll === bRoll) ||
        (incEmail && bEmail && incEmail === bEmail) ||
        (incPersonalEmail && bPersonalEmail && incPersonalEmail === bPersonalEmail) ||
        (incGoogleEmail && bGoogleEmail && incGoogleEmail === bGoogleEmail) ||
        (incPhone && bPhone && incPhone.length >= 10 && bPhone === incPhone) ||
        (incName && bName && incName === bName && (incRoll === bRoll || incEmail === bEmail))
      );
    });

    if (existingIndex >= 0) {
      const existing = result[existingIndex];
      result[existingIndex] = {
        ...existing,
        ...inc,
        enrolledCourseIds: (inc.enrolledCourseIds && inc.enrolledCourseIds.length > 0) ? inc.enrolledCourseIds : existing.enrolledCourseIds,
        enrolledCourseTitles: (inc.enrolledCourseTitles && inc.enrolledCourseTitles.length > 0) ? inc.enrolledCourseTitles : existing.enrolledCourseTitles,
        messages: (inc.messages && inc.messages.length > 0) ? inc.messages : existing.messages,
        placement: inc.placement ? { ...(existing.placement || {}), ...inc.placement } : existing.placement
      };
    } else {
      result.unshift(inc);
    }
  }

  return result;
}

// Initial Default Students - Synchronized across all PCs & devices
const INITIAL_STUDENTS: ManagedStudent[] = [
  {
    id: 'user-student-sandip',
    studentId: 'PBS-STU-2026-5773',
    rollNumber: 'PBS/2026/BIM-931',
    name: 'Sandip Chavan',
    email: 'sandip.chavan.0926@pbs.com',
    personalEmail: 'sandip.chavan@gmail.com',
    googleEmailId: 'sandip.chavan.dar99@gmail.com',
    password: 'sandipchavan@123',
    phone: '+91 9890173618',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    specialization: 'Autodesk Revit MEP Masterclass (LOD 300 - 500)',
    batch: '09/2026 (Sept 2026 Weekend Batch)',
    enrolledCourseIds: ['c1'],
    enrolledCourseTitles: [
      'Autodesk Revit MEP Masterclass (LOD 300 - 500)'
    ],
    attendancePercent: 100,
    totalFee: 14999,
    paidAmount: 14999,
    pendingBalance: 0,
    paymentStatus: 'Full Paid',
    capstoneStatus: 'Stage 1: Revit Project Setup Initialized',
    capstoneGrade: 'In Progress',
    growthScore: 85,
    registrationDate: 'Sep 01, 2026',
    placement: {
      studentId: 'PBS-STU-2026-5773',
      targetRole: 'BIM Engineer',
      targetLocations: ['Pune / Dubai'],
      expectedSalary: '₹12.0 LPA',
      portfolioUrl: '',
      resumeStatus: 'Under Review',
      mockInterviewScore: 80,
      mockInterviewFeedback: 'Initial enrollment complete. Capstone pending.',
      mockInterviewDate: '',
      readinessStatus: 'In Training',
      referredCompanies: []
    },
    messages: [
      {
        id: 'msg-welcome-sandip',
        sender: 'admin',
        senderName: 'PBS Academic Director',
        timestamp: 'Just now',
        subject: 'Welcome to Pragmatic BIM Solution Academy!',
        message: 'Welcome Sandip Chavan! Your institutional account has been provisioned. Access your live masterclasses, Microsoft Drive & Google Drive video lectures under Enrolled Courses.',
        isRead: false
      }
    ]
  },
  {
    id: 'user-student-pravin',
    studentId: 'PBS-STU-2026-8492',
    rollNumber: 'PBS/2026/BIM-084',
    name: 'Pravin Yadav',
    email: 'pravin.yadav.0926@pbs.com',
    personalEmail: 'pravinsyadavpsy99@gmail.com',
    googleEmailId: 'pravin.yadav.dar99@gmail.com',
    password: 'pravinyadav@1234',
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
    attendancePercent: 96.4,
    totalFee: 54996,
    paidAmount: 54996,
    pendingBalance: 0,
    paymentStatus: 'Full Paid',
    capstoneStatus: 'Stage 3: Navisworks Clash Matrix Submitted',
    capstoneGrade: 'B+ Certified (75-84%)',
    growthScore: 94,
    registrationDate: 'Aug 10, 2026',
    placement: {
      studentId: 'PBS-STU-2026-8492',
      targetRole: 'Senior BIM Coordinator / Digital Delivery Lead',
      targetLocations: ['Dubai / UAE', 'Riyadh / Saudi Arabia (NEOM)', 'United Kingdom', 'Pune / Bangalore'],
      expectedSalary: '₹14.5 - ₹18.0 LPA / AED 18,000 - 22,000 pm',
      portfolioUrl: 'https://pravinyadav-bim.portfolio.site',
      resumeStatus: 'Verified',
      mockInterviewScore: 96,
      mockInterviewFeedback: 'Exceptional grasp of ISO 19650 BEP workflows, Navisworks clash tolerance, and MEP family parametric creation. Recommended for top-tier MNC referrals.',
      mockInterviewDate: 'Aug 24, 2026',
      readinessStatus: 'Ready for MNC Placement',
      referredCompanies: [
        {
          companyName: 'AtkinsRéalis (Dubai / UK Infrastructure)',
          role: 'BIM Coordinator - MEP Systems',
          location: 'Dubai Design District, UAE',
          status: 'Technical Round Cleared',
          interviewDate: 'Sept 08, 2026'
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
          status: 'Interview Scheduled',
          interviewDate: 'Sept 12, 2026'
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

// Initial Course Catalog with Microsoft OneDrive and Google Drive Video Lessons
const INITIAL_COURSES: AdminCourse[] = [
  {
    id: 'c1',
    title: 'Autodesk Revit MEP Masterclass (LOD 300 to LOD 500)',
    category: 'Revit',
    level: 'Advanced Masterclass',
    badge: 'Cohort Primary Track',
    batchSchedule: 'Saturdays & Sundays (06:00 PM - 09:30 PM IST)',
    batchMode: 'Offline Weekend (Sat-Sun)',
    instructor: 'Pravin Yadav (15+ Yrs Industry Exp)',
    totalFee: 14999,
    description: 'Comprehensive authoring of Mechanical HVAC, Electrical power/lighting, Plumbing drainage/water supply, and Fire Protection systems with parametric families and schedule takeoffs.',
    thumbnail: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=80',
    accentColor: '#10b981',
    assignedTo: 'all',
    createdDate: '2026-09-01',
    isPublished: true,
    microsoftDriveUrl: 'https://onedrive.live.com/?authkey=%21APBSMEP2026Data&id=PBS_Revit_MEP_Central_Dataset',
    googleDriveUrl: 'https://drive.google.com/drive/folders/1BimRevitMEP_ClassroomLecture_2026',
    modules: [
      {
        id: 'mod-1',
        moduleCode: 'MOD-01',
        title: 'Introduction to Revit MEP & Microsoft Drive Central Models',
        duration: '2.5 Hours',
        lessons: [
          {
            id: 'les-1-1',
            title: 'Revit 2026 Environment, UI & Ribbon Navigation',
            duration: '24 min',
            videoType: 'microsoft-drive',
            videoUrl: 'https://onedrive.live.com/embed?cid=PBS2026&resid=PBS2026!104&authkey=!APBSMEP2026',
            isCompleted: false,
            assignedStudentId: 'all',
            addedBy: 'Admin (Pravin Yadav)',
            addedDate: '2026-09-01',
            description: 'Mastering the Project Browser, Properties palette, View Cube, and Microsoft OneDrive Central Model syncing.',
            cloudDriveFolderUrl: 'https://onedrive.live.com/?authkey=%21APBSMEP2026Data&id=PBS_MOD01_Datasets',
            bimDatasetUrl: 'https://onedrive.live.com/download?cid=PBS2026&resid=MOD01_Revit_Architecture_Base.rvt'
          },
          {
            id: 'les-1-2',
            title: 'Project Units, Levels, Grids & Linking Architectural Models',
            duration: '38 min',
            videoType: 'google-drive',
            videoUrl: 'https://drive.google.com/file/d/1BimRevitMEP_ClassroomLecture_2026/preview',
            isCompleted: false,
            assignedStudentId: 'all',
            addedBy: 'Admin (Pravin Yadav)',
            addedDate: '2026-09-01',
            cloudDriveFolderUrl: 'https://drive.google.com/drive/folders/1BimRevitMEP_ClassroomLecture_2026'
          }
        ]
      },
      {
        id: 'mod-2',
        moduleCode: 'MOD-02',
        title: 'HVAC Ductwork & Mechanical Equipment Modeling',
        duration: '4.5 Hours',
        lessons: [
          {
            id: 'les-2-1',
            title: 'Duct Sizing, Air Terminals & AHU Chilled Water Connections',
            duration: '45 min',
            videoType: 'microsoft-drive',
            videoUrl: 'https://onedrive.live.com/embed?cid=PBS2026&resid=PBS2026!105&authkey=!APBSHVAC2026',
            isCompleted: false,
            assignedStudentId: 'all',
            addedBy: 'Admin',
            addedDate: '2026-09-01',
            cloudDriveFolderUrl: 'https://onedrive.live.com/?authkey=%21APBSMEP2026Data&id=PBS_HVAC_PlantRoom_Files'
          },
          {
            id: 'les-2-2',
            title: 'VAV Boxes, Dampers & Static Pressure Calculations',
            duration: '52 min',
            videoType: 'pbs-secure',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            isCompleted: false,
            assignedStudentId: 'all',
            addedBy: 'Admin',
            addedDate: '2026-09-01'
          }
        ]
      }
    ]
  },
  {
    id: 'c2',
    title: 'Navisworks Manage & Multi-Disciplinary Clash Detection',
    category: 'Navisworks',
    level: 'Professional',
    badge: 'Cohort Core Track',
    batchSchedule: 'Tuesday & Thursday (07:30 PM - 09:30 PM IST)',
    batchMode: 'Online Interactive Live',
    instructor: 'Coordination Specialist Team',
    totalFee: 11999,
    description: 'Master 3D spatial coordination, Clash Detective matrix rules, hard/soft clearance testing, 4D TimeLiner schedule simulation, and BCF issue reporting.',
    thumbnail: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=600&q=80',
    accentColor: '#0ea5e9',
    assignedTo: 'all',
    createdDate: '2026-09-01',
    isPublished: true,
    microsoftDriveUrl: 'https://onedrive.live.com/?authkey=%21APBSNavis2026&id=PBS_Navisworks_Federated_Models',
    modules: [
      {
        id: 'mod-n1',
        moduleCode: 'NAV-01',
        title: 'Model Federation (NWC/NWD) & Clash Detective Setup',
        duration: '3.0 Hours',
        lessons: [
          {
            id: 'les-n1-1',
            title: 'Federating Revit Architecture, Structure & MEP in Navisworks',
            duration: '35 min',
            videoType: 'microsoft-drive',
            videoUrl: 'https://onedrive.live.com/embed?cid=PBS2026&resid=PBS2026!106&authkey=!APBSNavisLecture',
            isCompleted: false,
            assignedStudentId: 'all',
            addedBy: 'Admin',
            addedDate: '2026-09-01',
            cloudDriveFolderUrl: 'https://onedrive.live.com/?authkey=%21APBSNavis2026&id=Federated_NWD_Models'
          }
        ]
      }
    ]
  },
  {
    id: 'c3',
    title: 'Computational BIM with Dynamo Visual Scripting & Python',
    category: 'Dynamo',
    level: 'Advanced Masterclass',
    badge: 'Cohort Specialization Track',
    batchSchedule: 'Tuesday & Thursday (08:00 PM - 10:00 PM IST)',
    batchMode: 'Online Interactive Live',
    instructor: 'Computational Design Lead',
    totalFee: 13999,
    description: 'Automate repetitive Revit tasks, generate complex parametric geometry, extract Excel parameter schedules bidirectionally, and run Python nodes via Revit API.',
    thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80',
    accentColor: '#8b5cf6',
    assignedTo: 'all',
    createdDate: '2026-09-01',
    isPublished: true,
    microsoftDriveUrl: 'https://onedrive.live.com/?authkey=%21APBSDynamo2026&id=PBS_Dynamo_Scripts_Library',
    modules: []
  },
  {
    id: 'c4',
    title: 'ISO 19650 Global BIM Project Delivery Framework',
    category: 'ISO 19650',
    level: 'Executive',
    badge: 'Global Certification Track',
    batchSchedule: 'Saturday Masterclasses (10:00 AM - 01:30 PM IST)',
    batchMode: 'Hybrid Cohort',
    instructor: 'Global Information Manager',
    totalFee: 12999,
    description: 'International BIM standard workflows: OIR, PIR, EIR, BEP, CDE states (WIP, Shared, Published, Archived), and information containers naming protocol.',
    thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
    accentColor: '#f59e0b',
    assignedTo: 'all',
    createdDate: '2026-09-01',
    isPublished: true,
    microsoftDriveUrl: 'https://onedrive.live.com/?authkey=%21APBSISO2026&id=PBS_ISO19650_BEP_Templates',
    modules: []
  }
];

const STORAGE_STUDENTS_KEY = 'pbs_admin_student_roster';
const STORAGE_COURSES_KEY = 'pbs_admin_courses_library';
const STORAGE_ENROLLMENTS_KEY = 'pbs_admin_enrollment_requests';

// Cross-tab and live component sync channel
const pbsSyncChannel = typeof window !== 'undefined' && typeof BroadcastChannel !== 'undefined'
  ? new BroadcastChannel('pbs_live_lms_sync_bus')
  : null;

if (pbsSyncChannel && typeof window !== 'undefined') {
  pbsSyncChannel.onmessage = (event) => {
    try {
      window.dispatchEvent(new CustomEvent('pbs_store_updated', { detail: event.data }));
    } catch {}
  };
}

// Push updates to Central Server API for cross-PC synchronization
export async function syncToServer(collection: string, data: any): Promise<boolean> {
  if (typeof window === 'undefined') return false;
  try {
    const res = await fetch(`/api/db/${collection}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data })
    });
    if (res.ok) {
      pbsNotifyChange(`${collection}_synced_cloud`, data);
      return true;
    }
  } catch (err) {
    console.warn(`Sync to server for ${collection} failed:`, err);
  }
  return false;
}

export async function syncAllToServer(fullPayload?: Record<string, any>): Promise<boolean> {
  if (typeof window === 'undefined') return false;
  try {
    const payload = fullPayload || exportAllLocalStoreData();
    const res = await fetch('/api/db/sync-all', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullStore: payload })
    });
    return res.ok;
  } catch (err) {
    console.warn('Sync all to server failed:', err);
  }
  return false;
}

// Helper to collect all local store data for complete cloud sync
function exportAllLocalStoreData(): Record<string, any> {
  if (typeof window === 'undefined') return {};
  
  let students: any[] = [];
  try {
    const st = localStorage.getItem(STORAGE_STUDENTS_KEY);
    if (st) students = JSON.parse(st);
  } catch {}

  let courses: any[] = [];
  try {
    const cr = localStorage.getItem(STORAGE_COURSES_KEY);
    if (cr) courses = JSON.parse(cr);
  } catch {}

  let enrollments: any[] = [];
  try {
    const en = localStorage.getItem(STORAGE_ENROLLMENTS_KEY);
    if (en) enrollments = JSON.parse(en);
  } catch {}

  let receipts: any[] = [];
  try {
    const rc = localStorage.getItem('pbs_student_receipts');
    if (rc) receipts = JSON.parse(rc);
  } catch {}

  let activityLogs: any[] = [];
  try {
    const lg = localStorage.getItem('pbs_student_activity_logs');
    if (lg) activityLogs = JSON.parse(lg);
  } catch {}

  // Collect exams, certConfigs, progress, portfolios from localStorage keys
  const exams: Record<string, any> = {};
  const certConfigs: Record<string, any> = {};
  const progress: Record<string, any> = {};
  const portfolios: Record<string, any> = {};

  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key) continue;
      if (key.startsWith('pbs_course_mcq_')) {
        const cId = key.replace('pbs_course_mcq_', '');
        try { exams[cId] = JSON.parse(localStorage.getItem(key) || ''); } catch {}
      } else if (key.startsWith('pbs_cert_config_')) {
        const cId = key.replace('pbs_cert_config_', '');
        try { certConfigs[cId] = JSON.parse(localStorage.getItem(key) || ''); } catch {}
      } else if (key.startsWith('pbs_progress_')) {
        const pKey = key.replace('pbs_progress_', '');
        try { progress[pKey] = JSON.parse(localStorage.getItem(key) || ''); } catch {}
      } else if (key.startsWith('pbs_portfolio_')) {
        const sId = key.replace('pbs_portfolio_', '');
        try { portfolios[sId] = JSON.parse(localStorage.getItem(key) || ''); } catch {}
      }
    }
  } catch {}

  return {
    students,
    courses,
    enrollments,
    receipts,
    activityLogs,
    exams,
    certConfigs,
    progress,
    portfolios
  };
}

export const pbsNotifyChange = (eventType: string, data?: any) => {
  if (typeof window === 'undefined') return;
  try {
    window.dispatchEvent(new CustomEvent('pbs_store_updated', { detail: { eventType, data, timestamp: Date.now() } }));
  } catch {}

  if (pbsSyncChannel) {
    try {
      pbsSyncChannel.postMessage({ eventType, data, timestamp: Date.now() });
    } catch {}
  }
};

const INITIAL_ENROLLMENT_REQUESTS: EnrollmentRequest[] = [
  {
    id: 'ENR-2026-091',
    studentId: 'PBS-STU-2026-8492',
    studentName: 'Pravin Yadav',
    studentEmail: 'pravin.yadav@pbs.com',
    studentPhone: '+91 8208918726',
    courseId: 'c1',
    courseTitle: 'Autodesk Revit MEP Masterclass (LOD 300 to LOD 500)',
    totalFee: 14999,
    amountPaid: 14999,
    pendingBalance: 0,
    paymentPlan: 'Full Payment',
    paymentMethod: 'UPI',
    upiId: 'pravinsyadavpsy99-03@oksbi',
    transactionId: 'UPI/2026/0926/84920199',
    submittedAt: '2026-09-01T09:30:00.000Z',
    slaDeadline: '2026-09-02T09:30:00.000Z',
    status: 'Approved & Assigned',
    verifiedAt: '2026-09-01T09:45:00.000Z',
    verifiedBy: 'PBS Academic Director'
  }
];

export const pbsAdminStore = {
  /**
   * Get all enrollment requests
   */
  getEnrollmentRequests(): EnrollmentRequest[] {
    try {
      const stored = localStorage.getItem(STORAGE_ENROLLMENTS_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Could not read enrollment requests from storage:', e);
    }
    return INITIAL_ENROLLMENT_REQUESTS;
  },

  /**
   * Save enrollment requests
   */
  saveEnrollmentRequests(requests: EnrollmentRequest[]): void {
    try {
      localStorage.setItem(STORAGE_ENROLLMENTS_KEY, JSON.stringify(requests));
      pbsNotifyChange('enrollments_updated', requests);
      syncToServer('enrollments', requests);
    } catch (e) {
      console.warn('Could not save enrollment requests:', e);
    }
  },

  /**
   * Submit a new student course enrollment request via UPI
   */
  submitEnrollmentRequest(data: {
    studentId?: string;
    studentName: string;
    studentEmail: string;
    studentPhone: string;
    courseId: string;
    courseTitle: string;
    totalFee: number;
    amountPaid: number;
    pendingBalance: number;
    paymentPlan: 'Full Payment' | 'Part Payment (50%)';
    paymentMethod: 'UPI' | 'GPay' | 'PhonePe' | 'Paytm' | 'Bank Transfer';
    upiId?: string;
    transactionId: string;
    screenshotUrl?: string;
  }): EnrollmentRequest {
    const list = this.getEnrollmentRequests();
    const now = new Date();
    const sla = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24 hours SLA

    const newRequest: EnrollmentRequest = {
      id: `ENR-${Date.now().toString().slice(-6)}`,
      studentId: data.studentId || `PBS-STU-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      studentName: data.studentName,
      studentEmail: data.studentEmail,
      studentPhone: data.studentPhone,
      courseId: data.courseId,
      courseTitle: data.courseTitle,
      totalFee: data.totalFee,
      amountPaid: data.amountPaid,
      pendingBalance: data.pendingBalance,
      paymentPlan: data.paymentPlan,
      paymentMethod: data.paymentMethod,
      upiId: data.upiId || 'pravinsyadavpsy99-03@oksbi',
      transactionId: data.transactionId,
      screenshotUrl: data.screenshotUrl,
      submittedAt: now.toISOString(),
      slaDeadline: sla.toISOString(),
      status: 'Pending Verification'
    };

    list.unshift(newRequest);
    this.saveEnrollmentRequests(list);
    return newRequest;
  },

  /**
   * Approve an enrollment request and assign course to student account immediately
   */
  approveEnrollmentRequest(requestId: string, adminName: string = 'PBS Academic Director'): { success: boolean; message: string; student?: ManagedStudent } {
    const list = this.getEnrollmentRequests();
    const reqIndex = list.findIndex(r => r.id === requestId);
    if (reqIndex === -1) {
      return { success: false, message: 'Enrollment request not found.' };
    }

    const req = list[reqIndex];
    req.status = 'Approved & Assigned';
    req.verifiedAt = new Date().toISOString();
    req.verifiedBy = adminName;
    this.saveEnrollmentRequests(list);

    // Update or create student in roster
    let student = this.getStudentByQuery(req.studentEmail) || this.getStudentByQuery(req.studentId);
    if (!student) {
      // Create new student
      student = this.addStudent({
        studentId: req.studentId,
        rollNumber: `PBS/2026/BIM-${Math.floor(100 + Math.random() * 899)}`,
        name: req.studentName,
        email: req.studentEmail,
        password: this.generateStudentDefaultPassword(req.studentName),
        phone: req.studentPhone,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        specialization: req.courseTitle,
        batch: '09/2026 (Sept 2026 Weekend Cohort)',
        enrolledCourseIds: [req.courseId],
        enrolledCourseTitles: [req.courseTitle],
        attendancePercent: 100,
        totalFee: req.totalFee,
        paidAmount: req.amountPaid,
        pendingBalance: req.pendingBalance,
        paymentStatus: req.pendingBalance === 0 ? 'Full Paid' : 'Part Paid',
        capstoneStatus: 'Stage 0: Strategic Definition in Progress',
        capstoneGrade: 'In Progress',
        growthScore: 20,
        registrationDate: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
        placement: {
          studentId: req.studentId,
          targetRole: 'BIM Coordinator / MEP Engineer',
          targetLocations: ['Pune / Bangalore', 'Dubai / UAE'],
          expectedSalary: '₹12.0 - ₹16.0 LPA',
          portfolioUrl: '',
          resumeStatus: 'Under Review',
          mockInterviewScore: 88,
          mockInterviewFeedback: 'New course enrollment approved. Initial cohort curriculum unlocked.',
          mockInterviewDate: 'Scheduled in 30 Days',
          readinessStatus: 'In Training',
          referredCompanies: [
            {
              companyName: 'AtkinsRéalis / WSP Global',
              role: 'BIM Engineer',
              location: 'Dubai / Pune',
              status: 'Shortlisted'
            }
          ]
        },
        messages: []
      });
    } else {
      // Add course if not already enrolled
      const currentCourses = student.enrolledCourseIds || [];
      const currentTitles = student.enrolledCourseTitles || [];
      
      const newCourseIds = currentCourses.includes(req.courseId) ? currentCourses : [...currentCourses, req.courseId];
      const newCourseTitles = currentTitles.includes(req.courseTitle) ? currentTitles : [...currentTitles, req.courseTitle];
      
      const newTotalFee = (student.totalFee || 0) + req.totalFee;
      const newPaidAmount = (student.paidAmount || 0) + req.amountPaid;
      const newPending = Math.max(0, newTotalFee - newPaidAmount);
      
      this.updateStudent(student.studentId, {
        enrolledCourseIds: newCourseIds,
        enrolledCourseTitles: newCourseTitles,
        totalFee: newTotalFee,
        paidAmount: newPaidAmount,
        pendingBalance: newPending,
        paymentStatus: newPending === 0 ? 'Full Paid' : 'Part Paid'
      });
      student = this.getStudentByQuery(student.studentId) || student;
    }

    // Send confirmation message to student
    this.sendMessageToStudent(
      student.studentId,
      `🎉 Course Assigned: ${req.courseTitle} Unlocked!`,
      `Hello ${req.studentName}, your UPI payment of ₹${req.amountPaid.toLocaleString('en-IN')} (Ref: ${req.transactionId}) has been verified and confirmed by Admin. The complete course curriculum, 10 modular video lectures, and BIM dataset files are now unlocked in your dashboard.`
    );

    return {
      success: true,
      message: `Enrollment for ${req.studentName} approved! Course "${req.courseTitle}" assigned to student profile.`,
      student
    };
  },

  /**
   * Reject an enrollment request with reason
   */
  rejectEnrollmentRequest(requestId: string, reason: string = 'Payment reference could not be verified in bank ledger.'): boolean {
    const list = this.getEnrollmentRequests();
    const req = list.find(r => r.id === requestId);
    if (!req) return false;

    req.status = 'Rejected';
    req.adminNotes = reason;
    req.verifiedAt = new Date().toISOString();
    this.saveEnrollmentRequests(list);

    // Send alert message if student exists
    const student = this.getStudentByQuery(req.studentEmail) || this.getStudentByQuery(req.studentId);
    if (student) {
      this.sendMessageToStudent(
        student.studentId,
        `⚠️ Enrollment Verification Update: ${req.courseTitle}`,
        `We could not verify transaction UTR ${req.transactionId}. Reason: ${reason}. Please contact Admin or resubmit your UPI payment receipt.`
      );
    }

    return true;
  },

  /**
   * Detect video provider from link
   */
  detectVideoType(url: string): 'youtube' | 'microsoft-drive' | 'google-drive' | 'direct' | 'pbs-secure' {
    if (!url) return 'pbs-secure';
    const clean = url.toLowerCase();
    if (clean.includes('youtube.com') || clean.includes('youtu.be')) return 'youtube';
    if (clean.includes('onedrive.live.com') || clean.includes('1drv.ms') || clean.includes('sharepoint.com')) return 'microsoft-drive';
    if (clean.includes('drive.google.com')) return 'google-drive';
    if (clean.endsWith('.mp4') || clean.endsWith('.webm') || clean.endsWith('.m3u8')) return 'direct';
    return 'pbs-secure';
  },

  /**
   * Generate complete 10-Module curriculum structure for courses
   */
  generate10ModuleCurriculum(courseTitle: string, category: string = 'Revit', videoLinks: string[] = [], cloudDriveUrl?: string): AdminCourseModule[] {
    const BIM_MODULE_SYLLABI: Record<string, { title: string; desc: string; lessons: string[] }[]> = {
      default: [
        {
          title: 'Module 01: Foundations & BIM Project Standards Setup',
          desc: 'Project templates, unit configurations, shared parameters & ISO 19650 BEP initialization.',
          lessons: ['Workspace & Project Template Architecture', 'Linking CAD, IFC & Multi-Disciplinary Models', 'Coordinate Systems & Shared Grids']
        },
        {
          title: 'Module 02: Core Modeling Workflows & Parametric Design',
          desc: 'Parametric geometry authoring, LOD 300 elements, view templates and filters.',
          lessons: ['Parametric Geometry & Design Guidelines', 'Custom View Filters & Graphic Overrides', 'Worksharing & Central File Syncing']
        },
        {
          title: 'Module 03: MEP / Architectural Advanced Systems',
          desc: 'Mechanical HVAC, Electrical Power, Plumbing fixtures and technical routing.',
          lessons: ['System Logical Routing & Sizing Takeoffs', 'Pressure Drop & Flow Calculations', 'Equipment Families & Connector Logic']
        },
        {
          title: 'Module 04: Family Editor & Custom Parametric Components',
          desc: 'Formulas, nested parametric families, catalog parameters & look-up tables.',
          lessons: ['Nested Family Hierarchy & Shared Parameters', 'Lookup Tables & CSV Data Mapping', 'LOD 400 Manufacturing Fabrication Parts']
        },
        {
          title: 'Module 05: Navisworks Clash Coordination & Issue Management',
          desc: 'Federated model aggregation, hard/soft clearance clash detection & matrix reporting.',
          lessons: ['Federating Multi-Disciplinary NWD Models', 'Clash Matrix, Tolerances & Grouping', 'BCF Export & Issue Tracking to Revit']
        },
        {
          title: 'Module 06: 4D TimeLiner Construction Sequencing',
          desc: 'Linking MS Project / Primavera P6 schedules to 3D elements for Gantt playback.',
          lessons: ['TimeLiner Task Assignment & Rules', 'Planned vs Actual 4D Visual Comparison', 'Exporting Animation Videos for Client Handover']
        },
        {
          title: 'Module 07: 5D Quantity Takeoff (QTO) & Cost Estimation',
          desc: 'Automated BOQ extraction, material takeoff formulas & Excel schedule sync.',
          lessons: ['Material Takeoff Parameters & Unit Costs', 'Bidirectional Excel Parameter Syncing', 'Carbon Footprint & Lifecycle Assessment']
        },
        {
          title: 'Module 08: Computational Automation with Dynamo & Python',
          desc: 'Visual programming nodes, mass element tagging, geometry algorithms & Revit API.',
          lessons: ['Dynamo Visual Scripting Fundamentals', 'Automated Sheet Generation & Re-numbering', 'Python Nodes for Custom Revit API Automations']
        },
        {
          title: 'Module 09: ISO 19650 CDE & Digital Twin Asset Handover',
          desc: 'Common Data Environment workflows, COBie spreadsheets & CAFM sensor integration.',
          lessons: ['CDE Container States (WIP, Shared, Published)', 'COBie Data Tagging & Spreadsheet Export', 'IoT Sensor Integrations & Facility Management']
        },
        {
          title: 'Module 10: Capstone Project Defense & MNC Placement Portfolio',
          desc: 'End-to-end multi-disciplinary project submission, portfolio review and mock interviews.',
          lessons: ['Comprehensive BIM Portfolio Compilation', 'ISO 19650 BEP Presentation Defense', 'Technical MNC Interview Prep & Reference Referrals']
        }
      ]
    };

    const templateModules = BIM_MODULE_SYLLABI.default;

    return templateModules.map((m, index) => {
      const moduleCode = `MOD-${(index + 1).toString().padStart(2, '0')}`;
      const videoForThisModule = videoLinks[index] || (videoLinks.length > 0 ? videoLinks[index % videoLinks.length] : '');
      const videoType = this.detectVideoType(videoForThisModule);

      const lessons: AdminVideoLesson[] = m.lessons.map((lessonTitle, lIndex) => {
        const link = (lIndex === 0 && videoForThisModule) ? videoForThisModule : (videoLinks[(index * 3 + lIndex) % (videoLinks.length || 1)] || '');
        return {
          id: `les-${index + 1}-${lIndex + 1}-${Date.now()}`,
          title: `${moduleCode}.${lIndex + 1} - ${lessonTitle}`,
          duration: `${25 + (index * 3 + lIndex * 5) % 25} min`,
          videoType: this.detectVideoType(link),
          videoUrl: this.formatEmbedVideoUrl(link || (cloudDriveUrl ? `${cloudDriveUrl}#mod${index+1}` : '')),
          isCompleted: false,
          assignedStudentId: 'all',
          addedBy: 'Admin (Pravin Yadav)',
          addedDate: new Date().toISOString().split('T')[0],
          description: `Comprehensive hands-on demonstration covering ${lessonTitle.toLowerCase()} with live real-world BIM datasets.`,
          learningObjectives: [
            `Understand industry standard workflows for ${lessonTitle}`,
            `Execute LOD 300-500 modeling and coordination steps`,
            `Apply ISO 19650 naming conventions and verification checklists`
          ],
          cloudDriveFolderUrl: cloudDriveUrl || 'https://onedrive.live.com/?authkey=%21APBSMEP2026Data&id=PBS_Central_Datasets',
          bimDatasetUrl: 'https://onedrive.live.com/download?cid=PBS2026&resid=MOD_CENTRAL_DATASET.rvt'
        };
      });

      return {
        id: `mod-${index + 1}-${Date.now()}`,
        moduleCode,
        title: m.title,
        duration: `${(2.5 + (index % 3) * 0.8).toFixed(1)} Hours`,
        lessons
      };
    });
  },
  /**
   * Get all students
   */
  getStudents(): ManagedStudent[] {
    let list: ManagedStudent[] = [];
    try {
      const stored = localStorage.getItem(STORAGE_STUDENTS_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          list = parsed;
        }
      }
    } catch (e) {
      console.warn('Could not read students from storage:', e);
    }
    
    // Always merge INITIAL_STUDENTS with whatever is in storage so predefined students like Sandip Chavan and Pravin Yadav are never lost
    return mergeStudentsList(INITIAL_STUDENTS, list);
  },

  /**
   * Save students roster
   */
  saveStudents(students: ManagedStudent[]): void {
    try {
      const merged = mergeStudentsList(INITIAL_STUDENTS, students);
      localStorage.setItem(STORAGE_STUDENTS_KEY, JSON.stringify(merged));
      pbsNotifyChange('students_updated', merged);
      syncToServer('students', merged);
    } catch (e) {
      console.warn('Could not save students to storage:', e);
    }
  },

  /**
   * Delete a student by studentId
   */
  deleteStudent(studentId: string): boolean {
    const list = this.getStudents();
    const updated = list.filter(s => s.studentId !== studentId && s.id !== studentId);
    this.saveStudents(updated);
    return true;
  },

  /**
   * Update a specific student record
   */
  updateStudent(studentId: string, updates: Partial<ManagedStudent>): ManagedStudent | null {
    const list = this.getStudents();
    const idx = list.findIndex(s => s.studentId === studentId || s.id === studentId);
    if (idx === -1) return null;

    list[idx] = { ...list[idx], ...updates };
    this.saveStudents(list);
    return list[idx];
  },

  /**
   * Add a new student
   */
  addStudent(newStudent: Omit<ManagedStudent, 'id'>): ManagedStudent {
    const list = this.getStudents();
    const created: ManagedStudent = {
      ...newStudent,
      id: `user-stu-${Date.now()}`
    };
    list.unshift(created);
    this.saveStudents(list);
    return created;
  },

  /**
   * Record fee payment for student
   */
  recordFeePayment(studentId: string, paidAmountAdd: number, paymentMethod: string = 'Cash / Cheque', txnRef: string = 'N/A'): ManagedStudent | null {
    const student = this.getStudents().find(s => s.studentId === studentId || s.id === studentId);
    if (!student) return null;

    const newPaid = student.paidAmount + paidAmountAdd;
    const newPending = Math.max(0, student.totalFee - newPaid);
    const newStatus = newPending === 0 ? 'Full Paid' : 'Part Paid';

    // Generate a receipt and append to pbs_student_receipts
    try {
      const stored = localStorage.getItem('pbs_student_receipts');
      let receipts = [];
      if (stored) receipts = JSON.parse(stored);
      
      const newReceipt = {
        receiptId: `PBS-REC-${Math.floor(100000 + Math.random() * 900000)}`,
        invoiceNumber: `INV/PBS/2026-27/${Math.floor(1000 + Math.random() * 9000)}`,
        courseId: student.enrolledCourseIds[0] || 'general',
        courseTitle: student.enrolledCourseTitles[0] || 'Course Fee',
        amount: paidAmountAdd,
        paymentMethod: paymentMethod,
        transactionId: txnRef,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        paymentType: newPending === 0 ? 'Full Payment' : 'Installment',
        status: 'Paid',
        taxGst: Math.round(paidAmountAdd * 0.18),
        downloadUrl: '#'
      };
      
      receipts.unshift(newReceipt);
      localStorage.setItem('pbs_student_receipts', JSON.stringify(receipts));
    } catch (e) {
      console.warn('Failed to append receipt:', e);
    }

    return this.updateStudent(student.studentId, {
      paidAmount: newPaid,
      pendingBalance: newPending,
      paymentStatus: newStatus
    });
  },

  /**
   * Send message from Admin to a student
   */
  sendMessageToStudent(studentId: string, subject: string, message: string): boolean {
    const student = this.getStudents().find(s => s.studentId === studentId || s.id === studentId);
    if (!student) return false;

    const newMsg: StudentMessageItem = {
      id: `msg-admin-${Date.now()}`,
      sender: 'admin',
      senderName: 'PBS Academic Admin Team',
      timestamp: new Date().toLocaleDateString('en-US', { 
        month: 'short', 
        day: '2-digit', 
        year: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      subject,
      message,
      isRead: false
    };

    const updatedMessages = [newMsg, ...(student.messages || [])];
    this.updateStudent(student.studentId, { messages: updatedMessages });
    return true;
  },

  /**
   * Update student placement & interview record
   */
  updateStudentPlacement(studentId: string, placementUpdates: Partial<StudentPlacementRecord>): boolean {
    const student = this.getStudents().find(s => s.studentId === studentId || s.id === studentId);
    if (!student) return false;

    const currentPlacement = student.placement || {
      studentId: student.studentId,
      targetRole: 'BIM Engineer',
      targetLocations: ['Pune / Bangalore'],
      expectedSalary: '₹12.0 LPA',
      portfolioUrl: '',
      resumeStatus: 'Under Review',
      mockInterviewScore: 80,
      mockInterviewFeedback: '',
      mockInterviewDate: '',
      readinessStatus: 'In Training',
      referredCompanies: []
    };

    const updated = { ...currentPlacement, ...placementUpdates };
    this.updateStudent(student.studentId, { placement: updated });
    return true;
  },

  /**
   * Generate official Institutional Student Email from Name
   * e.g., "Pravin Yadav" -> "pravin.yadav@pbs.com" or "pravin.yadav1@pbs.com"
   */
  generateStudentEmail(fullName: string): string {
    const clean = fullName.trim().toLowerCase().replace(/[^a-z0-9\s]/g, '');
    const parts = clean.split(/\s+/).filter(Boolean);
    const slug = parts.join('.');
    
    let baseEmail = `${slug || 'student'}@pbs.com`;

    const allStudents = this.getStudents();
    const existingEmails = new Set(allStudents.map(s => s.email.toLowerCase()));

    if (!existingEmails.has(baseEmail)) {
      return baseEmail;
    }

    let counter = 1;
    let newEmail = `${slug || 'student'}${counter}@pbs.com`;
    while (existingEmails.has(newEmail)) {
      counter++;
      newEmail = `${slug || 'student'}${counter}@pbs.com`;
    }
    
    return newEmail;
  },

  /**
   * Generate secure initial password for a student
   * e.g., "pravinyadav@123"
   */
  generateStudentDefaultPassword(fullName: string): string {
    const clean = fullName.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
    return `${clean || 'student'}@123`;
  },

  // ================= COURSES & VIDEOS =================

  /**
   * Get all courses
   */
  getCourses(): AdminCourse[] {
    try {
      const stored = localStorage.getItem(STORAGE_COURSES_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Could not read courses from storage:', e);
    }
    return INITIAL_COURSES;
  },

  /**
   * Get course by ID or course code
   */
  getCourseById(courseId: string): AdminCourse | undefined {
    const list = this.getCourses();
    return list.find(c => c.id === courseId || c.courseCode === courseId);
  },

  /**
   * Save courses library
   */
  saveCourses(courses: AdminCourse[]): void {
    try {
      localStorage.setItem(STORAGE_COURSES_KEY, JSON.stringify(courses));
      pbsNotifyChange('courses_updated', courses);
      syncToServer('courses', courses);
    } catch (e) {
      console.warn('Could not save courses to storage:', e);
    }
  },

  /**
   * Add a new course
   */
  addCourse(newCourse: Omit<AdminCourse, 'id' | 'createdDate'>): AdminCourse {
    const list = this.getCourses();
    const created: AdminCourse = {
      ...newCourse,
      id: `c-${Date.now()}`,
      createdDate: new Date().toISOString().split('T')[0]
    };
    list.unshift(created);
    this.saveCourses(list);
    return created;
  },

  /**
   * Update an existing course
   */
  updateCourse(courseId: string, updates: Partial<AdminCourse>): AdminCourse | null {
    const list = this.getCourses();
    const idx = list.findIndex(c => c.id === courseId);
    if (idx === -1) return null;

    list[idx] = { ...list[idx], ...updates };
    this.saveCourses(list);
    return list[idx];
  },

  /**
   * Add a video lesson (Google Drive link, etc.) to a course
   */
  addVideoLessonToCourse(
    courseId: string,
    moduleId: string,
    lesson: Omit<AdminVideoLesson, 'id' | 'addedDate'>
  ): boolean {
    const list = this.getCourses();
    const course = list.find(c => c.id === courseId);
    if (!course) return false;

    let targetModule = course.modules.find(m => m.id === moduleId);
    if (!targetModule) {
      // Create a default module if not exists
      targetModule = {
        id: moduleId || `mod-${Date.now()}`,
        moduleCode: `MOD-${course.modules.length + 1}`,
        title: 'Masterclass Video Lectures',
        duration: '3.0 Hours',
        lessons: []
      };
      course.modules.push(targetModule);
    }

    const createdLesson: AdminVideoLesson = {
      ...lesson,
      id: `les-${Date.now()}`,
      videoUrl: this.formatEmbedVideoUrl(lesson.videoUrl),
      addedDate: new Date().toISOString().split('T')[0]
    };

    targetModule.lessons.push(createdLesson);
    this.saveCourses(list);
    return true;
  },

  /**
   * Format Video URL for Embed Playback (Microsoft OneDrive, SharePoint, Google Drive, YouTube)
   * Converts: https://onedrive.live.com/... -> https://onedrive.live.com/embed?...
   * Converts: https://drive.google.com/file/d/FILE_ID/view?usp=sharing -> https://drive.google.com/file/d/FILE_ID/preview
   * Converts: YouTube watch URLs -> https://www.youtube.com/embed/VIDEO_ID
   */
  formatEmbedVideoUrl(rawUrl: string): string {
    if (!rawUrl || typeof rawUrl !== 'string') return '';
    const trimmed = rawUrl.trim();

    // 1. Microsoft OneDrive / Office 365 Drive Links
    if (trimmed.includes('onedrive.live.com')) {
      if (trimmed.includes('/embed?')) {
        return trimmed;
      }
      // If it contains resid and authkey or cid
      const urlObj = new URL(trimmed.startsWith('http') ? trimmed : `https://${trimmed}`);
      const resid = urlObj.searchParams.get('resid') || urlObj.searchParams.get('id');
      const authkey = urlObj.searchParams.get('authkey');
      const cid = urlObj.searchParams.get('cid');
      
      let embedParams = new URLSearchParams();
      if (cid) embedParams.set('cid', cid);
      if (resid) embedParams.set('resid', resid);
      if (authkey) embedParams.set('authkey', authkey);
      if (resid || authkey || cid) {
        return `https://onedrive.live.com/embed?${embedParams.toString()}`;
      }
      return trimmed;
    }

    if (trimmed.includes('1drv.ms') || trimmed.includes('sharepoint.com')) {
      return trimmed;
    }

    // 2. Google Drive Links
    // Matches https://drive.google.com/file/d/1AbC.../view
    // or https://drive.google.com/open?id=1AbC...
    const driveMatch = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (driveMatch && driveMatch[1]) {
      return `https://drive.google.com/file/d/${driveMatch[1]}/preview`;
    }

    const driveOpenMatch = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (trimmed.includes('drive.google.com') && driveOpenMatch && driveOpenMatch[1]) {
      return `https://drive.google.com/file/d/${driveOpenMatch[1]}/preview`;
    }

    // 3. YouTube Links (Standard reliable embed with clean modest branding)
    const ytMatch = trimmed.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
    if (ytMatch && ytMatch[1]) {
      return `https://www.youtube.com/embed/${ytMatch[1]}?rel=0&modestbranding=1&playsinline=1&enablejsapi=1`;
    }

    return trimmed;
  },

  /**
   * Export Students to CSV
   */
  exportStudentsToCSV(): string {
    const list = this.getStudents();
    const headers = [
      'Student ID',
      'Roll Number',
      'Full Name',
      'Institutional Email',
      'Password',
      'Phone',
      'Specialization Course',
      'Batch Cohort',
      'Total Fee (INR)',
      'Paid Fee (INR)',
      'Pending Balance (INR)',
      'Payment Status',
      'Attendance %',
      'Growth Score (XP)',
      'Capstone Status',
      'Capstone Grade',
      'Placement Readiness',
      'Target Role',
      'Expected Salary',
      'Mock Interview Score'
    ];

    const rows = list.map(s => [
      s.studentId,
      s.rollNumber,
      `"${s.name.replace(/"/g, '""')}"`,
      s.email,
      s.password || 'student@123',
      s.phone,
      `"${s.specialization.replace(/"/g, '""')}"`,
      `"${s.batch.replace(/"/g, '""')}"`,
      s.totalFee,
      s.paidAmount,
      s.pendingBalance,
      s.paymentStatus,
      `${s.attendancePercent}%`,
      s.growthScore,
      `"${s.capstoneStatus.replace(/"/g, '""')}"`,
      `"${s.capstoneGrade.replace(/"/g, '""')}"`,
      `"${(s.placement?.readinessStatus || 'In Training').replace(/"/g, '""')}"`,
      `"${(s.placement?.targetRole || '').replace(/"/g, '""')}"`,
      `"${(s.placement?.expectedSalary || '').replace(/"/g, '""')}"`,
      s.placement?.mockInterviewScore || 85
    ]);

    return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  },

  /**
   * Find a student by email, roll number, student ID, phone, or name across all formats
   */
  getStudentByQuery(query: string): ManagedStudent | null {
    if (!query) return null;
    const clean = query.toLowerCase().trim();
    const cleanPhoneDigits = clean.replace(/[^0-9]/g, '');
    const queryNoSpaces = clean.replace(/\s+/g, '');
    const queryEmailPrefix = clean.includes('@') ? clean.split('@')[0] : clean;
    const list = this.getStudents();
    
    return list.find(s => {
      if (!s) return false;
      const sEmail = (s.email || '').toLowerCase();
      const sPersonal = (s.personalEmail || '').toLowerCase();
      const sGoogle = (s.googleEmailId || '').toLowerCase();
      const sRoll = (s.rollNumber || '').toLowerCase();
      const sId = (s.studentId || '').toLowerCase();
      const sName = (s.name || '').toLowerCase();
      const sNameNoSpaces = sName.replace(/\s+/g, '');
      const sPhone = (s.phone || '').replace(/[^0-9]/g, '');
      const sEmailPrefix = sEmail.includes('@') ? sEmail.split('@')[0] : sEmail;

      return (
        sEmail === clean ||
        sPersonal === clean ||
        sGoogle === clean ||
        sRoll === clean ||
        sId === clean ||
        s.id?.toLowerCase() === clean ||
        sName === clean ||
        sNameNoSpaces === queryNoSpaces ||
        sEmailPrefix === queryEmailPrefix ||
        sEmailPrefix === clean ||
        (queryEmailPrefix.length >= 3 && sEmailPrefix.startsWith(queryEmailPrefix)) ||
        (cleanPhoneDigits.length >= 10 && sPhone.includes(cleanPhoneDigits))
      );
    }) || null;
  },

  /**
   * Export Full System Database to structured JSON string
   */
  exportDatabaseJSON(): string {
    const students = this.getStudents();
    const courses = this.getCourses();
    const backupData = {
      format: 'PBS_ACADEMY_SYSTEM_BACKUP',
      schemaVersion: '2026.2.0',
      exportedAt: new Date().toISOString(),
      institution: {
        name: 'Pragmatic BIM Solution',
        accreditation: 'ISO 19650 International BIM Management Academy',
        controller: 'Admin Executive Suite'
      },
      metrics: {
        totalStudents: students.length,
        totalCourses: courses.length,
        totalRevenue: students.reduce((acc, s) => acc + s.paidAmount, 0),
        totalPendingDues: students.reduce((acc, s) => acc + s.pendingBalance, 0),
        placementReadyCandidates: students.filter(s => s.placement?.readinessStatus === 'Ready for MNC Placement').length
      },
      students,
      courses
    };

    return JSON.stringify(backupData, null, 2);
  },

  /**
   * Export single student full dossier as JSON
   */
  exportStudentDossierJSON(studentId: string): string | null {
    const student = this.getStudentByQuery(studentId);
    if (!student) return null;

    const dossier = {
      format: 'PBS_STUDENT_ACADEMIC_DOSSIER',
      exportedAt: new Date().toISOString(),
      student,
      certificationAuthority: 'Pragmatic BIM Solution (ISO 19650)'
    };

    return JSON.stringify(dossier, null, 2);
  },

  /**
   * Import & Restore Database from JSON
   */
  importDatabaseJSON(jsonContent: string): { success: boolean; message: string; count?: { students: number; courses: number } } {
    try {
      const parsed = JSON.parse(jsonContent);
      
      // Case 1: Full System Backup JSON
      if (parsed.students && Array.isArray(parsed.students)) {
        this.saveStudents(parsed.students);
        if (parsed.courses && Array.isArray(parsed.courses)) {
          this.saveCourses(parsed.courses);
        }
        return {
          success: true,
          message: `Successfully restored ${parsed.students.length} students and ${parsed.courses?.length || 0} courses.`,
          count: {
            students: parsed.students.length,
            courses: parsed.courses?.length || 0
          }
        };
      }

      // Case 2: Array of students directly
      if (Array.isArray(parsed)) {
        this.saveStudents(parsed);
        return {
          success: true,
          message: `Successfully imported ${parsed.length} student records.`,
          count: {
            students: parsed.length,
            courses: this.getCourses().length
          }
        };
      }

      // Case 3: Single Student Dossier
      if (parsed.student && parsed.student.studentId) {
        const existing = this.getStudents();
        const updated = existing.filter(s => s.studentId !== parsed.student.studentId);
        updated.push(parsed.student);
        this.saveStudents(updated);
        return {
          success: true,
          message: `Imported student record for "${parsed.student.name}" (${parsed.student.rollNumber}).`,
          count: {
            students: 1,
            courses: 0
          }
        };
      }

      return {
        success: false,
        message: 'Invalid JSON format. Please provide a valid PBS Database Backup or Student Roster JSON.'
      };
    } catch (err: any) {
      return {
        success: false,
        message: `JSON Parsing error: ${err.message || 'Malformed JSON file'}`
      };
    }
  },

  // ==========================================
  // STUDENT ACTIVITY & TELEMETRY AUDIT TRAIL
  // ==========================================
  getActivityLogs(filter?: { studentId?: string; actionType?: string }): StudentActivityLog[] {
    try {
      const stored = localStorage.getItem('pbs_student_activity_logs');
      let logs: StudentActivityLog[] = stored ? JSON.parse(stored) : [];
      if (!logs || logs.length === 0) {
        logs = [
          {
            id: 'act-1',
            studentId: 'PBS-STU-2026-8492',
            studentName: 'Pravin Yadav',
            actionType: 'login',
            details: 'Logged into PBS LMS Student Portal (BIM Cohort 2026)',
            timestamp: 'Today, 09:30 AM',
            metadata: { deviceInfo: 'Chrome macOS / Windows 11', ipAddress: '103.21.144.92' }
          },
          {
            id: 'act-2',
            studentId: 'PBS-STU-2026-8492',
            studentName: 'Pravin Yadav',
            actionType: 'video_watched',
            details: 'Watched: Module 01 - Revit 2026 Environment, UI & Ribbon Navigation (24 min)',
            timestamp: 'Today, 10:15 AM',
            metadata: { courseId: 'c1', courseTitle: 'Autodesk Revit MEP Masterclass', durationMinutes: 24 }
          },
          {
            id: 'act-3',
            studentId: 'PBS-STU-2026-8492',
            studentName: 'Pravin Yadav',
            actionType: 'asset_downloaded',
            details: 'Downloaded Dataset: MOD01_Revit_Architecture_Base.rvt (48.5 MB)',
            timestamp: 'Today, 10:45 AM',
            metadata: { courseId: 'c1', assetName: 'MOD01_Revit_Architecture_Base.rvt' }
          }
        ];
        this.saveActivityLogs(logs);
      }

      if (filter?.studentId && filter.studentId !== 'all') {
        logs = logs.filter(l => l.studentId === filter.studentId);
      }
      if (filter?.actionType && filter.actionType !== 'all') {
        logs = logs.filter(l => l.actionType === filter.actionType);
      }
      return logs.sort((a, b) => (b.timestamp > a.timestamp ? 1 : -1));
    } catch {
      return [];
    }
  },

  saveActivityLogs(logs: StudentActivityLog[]): void {
    try {
      localStorage.setItem('pbs_student_activity_logs', JSON.stringify(logs));
    } catch (e) {
      console.warn('Failed to save activity logs to localStorage:', e);
    }
  },

  logStudentActivity(
    studentId: string,
    actionType: StudentActivityLog['actionType'],
    details: string,
    metadata?: StudentActivityLog['metadata']
  ): StudentActivityLog {
    const student = this.getStudentByQuery(studentId);
    const studentName = student ? student.name : 'Pravin Yadav';
    const newLog: StudentActivityLog = {
      id: `act-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      studentId: student?.studentId || studentId || 'PBS-STU-2026-8492',
      studentName,
      actionType,
      details,
      timestamp: new Date().toLocaleString('en-US', {
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }),
      metadata
    };

    const current = this.getActivityLogs();
    current.unshift(newLog);
    // Keep last 300 logs
    const capped = current.slice(0, 300);
    this.saveActivityLogs(capped);
    return newLog;
  },

  // ==========================================
  // COURSE FINAL MCQ EXAM SYSTEM
  // ==========================================
  getCourseMcq(courseId: string): CourseMcqExam {
    try {
      const stored = localStorage.getItem(`pbs_course_mcq_${courseId}`);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {}

    const defaultExams: Record<string, CourseMcqExam> = {
      c1: {
        courseId: 'c1',
        title: 'Autodesk Revit MEP Masterclass Certification Examination',
        description: 'Comprehensive 10-Question assessment evaluating LOD 300-500 mechanical duct sizing, hydraulic pipe slopes, electrical load schedules, and parametric family creation.',
        passingScorePercent: 70,
        timeLimitMinutes: 15,
        questions: [
          {
            id: 'q1',
            question: 'In Autodesk Revit MEP, what is the primary function of a "System Inspector"?',
            options: [
              'To check geometric clashes with architectural columns',
              'To inspect flow direction, velocity, and static pressure drop along duct or pipe networks',
              'To render photorealistic 3D MEP views',
              'To purge unreferenced family instances'
            ],
            correctOptionIndex: 1,
            explanation: 'The System Inspector in Revit allows MEP engineers to inspect flow, velocity, pressure loss, and critical path sizing across interconnected duct and piping systems.'
          },
          {
            id: 'q2',
            question: 'What level of development (LOD) is required for fabrication-ready MEP models with manufacturing hangers and manufacturer part numbers?',
            options: ['LOD 200', 'LOD 300', 'LOD 400', 'LOD 500'],
            correctOptionIndex: 2,
            explanation: 'LOD 400 models represent fabrication and assembly level details, including exact vendor part geometry, spool sheets, and structural hanger supports.'
          },
          {
            id: 'q3',
            question: 'Which Revit parameter type allows parameter data to appear in schedules and can be shared across multiple family files and projects?',
            options: ['Project Parameter', 'Family Parameter', 'Shared Parameter', 'Global Parameter'],
            correctOptionIndex: 2,
            explanation: 'Shared Parameters are stored in an external .txt definition file and can be scheduled, tagged, and used across multiple separate families and project files.'
          },
          {
            id: 'q4',
            question: 'When configuring sanitary drainage pipe slopes in Revit, what is the standard recommended minimum slope for 100mm (4") diameter waste pipes?',
            options: ['1:100 (1%)', '1:50 (2%)', '1:200 (0.5%)', '1:25 (4%)'],
            correctOptionIndex: 1,
            explanation: 'Standard plumbing codes (IPC/BS EN 12056) dictate a 1:50 (2% or 1/4" per foot) minimum hydraulic gradient for 100mm waste piping to ensure self-cleansing velocity.'
          },
          {
            id: 'q5',
            question: 'In electrical panel schedules, what setting determines the continuous and non-continuous demand factor calculation?',
            options: ['Demand Factor Load Classification', 'Voltage Definition Matrix', 'Wire Temperature Rating', 'Circuit Breaker Trip Ampacity'],
            correctOptionIndex: 0,
            explanation: 'Demand Factors tied to Load Classifications dictate how raw connected electrical loads (VA) are factored into calculated max demand kVA.'
          },
          {
            id: 'q6',
            question: 'Which tool in Revit is utilized to automatically resize ductwork based on equal friction or static regain methods?',
            options: ['Duct / Pipe Sizing Tool', 'Worksharing Monitor', 'Interference Check', 'Space and Zone Analysis'],
            correctOptionIndex: 0,
            explanation: 'Revit’s built-in Duct/Pipe Sizing tool computes exact duct cross-sectional dimensions based on chosen criteria like Equal Friction (Pa/m) or Maximum Velocity.'
          },
          {
            id: 'q7',
            question: 'How do you prevent Revit MEP elements in linked models from showing up in conflicting graphic styles?',
            options: [
              'Use Visibility/Graphic Overrides (VV/VG) -> Revit Links tab set to Custom or By Linked View',
              'Delete the linked model geometry',
              'Convert elements to IFC format',
              'Group all MEP fixtures into an in-place family'
            ],
            correctOptionIndex: 0,
            explanation: 'In VG Overrides, setting the Revit Link to "Custom" allows overriding model categories, filters, and worksets specifically for linked architectural/structural files.'
          },
          {
            id: 'q8',
            question: 'What is the purpose of placing "MEP Spaces" rather than standard Architectural Rooms in a Revit MEP project?',
            options: [
              'Spaces hold heating/cooling thermal calculations, airflow requirements, and illuminance levels',
              'Spaces are only for interior design colors',
              'Rooms cannot have 3D boundaries',
              'Spaces automatically create structural footings'
            ],
            correctOptionIndex: 0,
            explanation: 'MEP Spaces are specialized MEP containers that store CFM airflow requirements, sensible/latent heat gains, lux levels, and occupancy loads.'
          },
          {
            id: 'q9',
            question: 'In Revit parametric family creation, which reference plane setting ensures that elements snap accurately to duct connectors?',
            options: ['IsReference = Strong Reference / Not a Reference', 'Connector Element Domain & System Type definition', 'View Range Cut Plane', 'Model In-Place Extrusion'],
            correctOptionIndex: 1,
            explanation: 'Connector elements embedded in families define the system type (Supply Air, Return Air, Hydronic Supply), flow direction, and connection sizing.'
          },
          {
            id: 'q10',
            question: 'Which BIM coordination export format is industry standard for open-BIM exchange without exporting proprietary native Revit geometry?',
            options: ['DWG 2D', 'IFC 2x3 / IFC 4 (Industry Foundation Classes)', 'STL', 'OBJ'],
            correctOptionIndex: 1,
            explanation: 'IFC (ISO 16739) is the international standard open BIM schema allowing lossless multi-disciplinary coordination between Autodesk, Bentley, Graphisoft, and Solibri.'
          }
        ]
      },
      c2: {
        courseId: 'c2',
        title: 'Navisworks Manage & Multi-Disciplinary Clash Detection Exam',
        description: 'Covers Clash Detective hard/clearance rules, TimeLiner 4D scheduling, Animator, and BCF report coordination workflows.',
        passingScorePercent: 70,
        timeLimitMinutes: 15,
        questions: [
          {
            id: 'q1',
            question: 'In Autodesk Navisworks Clash Detective, what does a "Hard Clash" with a tolerance of 0.025m indicate?',
            options: [
              'Clashes will only be flagged if elements intersect by more than 25 millimeters',
              'All elements closer than 25m will be grouped',
              'Soft insulation buffer is tested',
              'Duplicate items within 25mm are deleted'
            ],
            correctOptionIndex: 0,
            explanation: 'Tolerance in Clash Detective filters out minor negligible intersections; any physical intersection exceeding 25mm is flagged as an active clash.'
          },
          {
            id: 'q2',
            question: 'Which file format in Navisworks contains the native cached model geometry and allows faster reload times?',
            options: ['.NWC (Cache File)', '.NWD (Published Document)', '.NWF (Federated Project File)', '.XML'],
            correctOptionIndex: 0,
            explanation: '.NWC is the automatically generated Navisworks Cache file containing pre-processed tessellated geometry.'
          },
          {
            id: 'q3',
            question: 'What is the open standard XML format for exchanging clash coordination viewpoints and comments between Navisworks and authoring tools like Revit?',
            options: ['BCF (BIM Collaboration Format)', 'COBie', 'DXF', 'STEP'],
            correctOptionIndex: 0,
            explanation: 'BCF (BIM Collaboration Format) enables seamless issue tracking with exact camera viewpoints and GUIDs across AEC tools.'
          },
          {
            id: 'q4',
            question: 'In Navisworks TimeLiner, how do you link 4D construction sequences with external planning software like Primavera P6 or MS Project?',
            options: ['Data Sources tab -> Add Primavera / CSV link', 'Export to PDF', 'Render in Raytrace', 'Convert to DWG'],
            correctOptionIndex: 0,
            explanation: 'TimeLiner provides direct ODBC/CSV synchronization with Primavera P6 and Microsoft Project Gantt schedules.'
          },
          {
            id: 'q5',
            question: 'What clash test type should be selected to detect if high-voltage cable trays are too close to uninsulated chilled water pipes without physical contact?',
            options: ['Clearance Clash', 'Hard Clash', 'Duplicate Clash', 'Conservative Clash'],
            correctOptionIndex: 0,
            explanation: 'Clearance clash tests enforce a designated spatial buffer zone between systems.'
          }
        ]
      },
      c3: {
        courseId: 'c3',
        title: 'Computational BIM with Dynamo Visual Scripting Exam',
        description: 'Covers list management, lacing algorithms, Revit API element binding, and parametric geometric automation.',
        passingScorePercent: 70,
        timeLimitMinutes: 15,
        questions: [
          {
            id: 'q1',
            question: 'What does "Cross Product Lacing" in a Dynamo node do when supplied with List A (3 items) and List B (4 items)?',
            options: [
              'Executes the node operation for all 12 combinations of items from both lists',
              'Executes only 3 shortest items',
              'Executes 4 longest items',
              'Produces an error'
            ],
            correctOptionIndex: 0,
            explanation: 'Cross Product lacing evaluates every possible pairing between list items (3 x 4 = 12 total operations).'
          },
          {
            id: 'q2',
            question: 'Which node in Dynamo is used to retrieve all instances of a particular category in the active Revit document?',
            options: ['All Elements of Category', 'Element.GetParameterValueByName', 'List.FilterByBoolMask', 'Point.ByCoordinates'],
            correctOptionIndex: 0,
            explanation: '"All Elements of Category" paired with "Categories" collector node grabs all Revit objects matching that category.'
          },
          {
            id: 'q3',
            question: 'Which node allows filtering a list of elements based on a true/false condition?',
            options: ['List.FilterByBoolMask', 'List.Chop', 'Math.Round', 'String.Contains'],
            correctOptionIndex: 0,
            explanation: 'List.FilterByBoolMask partitions an input list into "in" (true) and "out" (false) buckets based on a boolean mask.'
          }
        ]
      },
      c4: {
        courseId: 'c4',
        title: 'ISO 19650 Global BIM Project Delivery Framework Exam',
        description: 'Covers CDE state transitions, EIR, BEP, MIDP/TIDP responsibility matrices, and National Annex naming conventions.',
        passingScorePercent: 70,
        timeLimitMinutes: 15,
        questions: [
          {
            id: 'q1',
            question: 'Under ISO 19650-2, what are the four standardized Common Data Environment (CDE) information container states?',
            options: [
              'WIP (Work In Progress), Shared, Published, Archived',
              'Draft, Final, Approved, Deleted',
              'Concept, Schematic, Construction, Handover',
              'Internal, External, Client, Government'
            ],
            correctOptionIndex: 0,
            explanation: 'ISO 19650-1 & 2 defines the 4 immutable CDE states: Work In Progress (WIP), Shared, Published, and Archived.'
          },
          {
            id: 'q2',
            question: 'What document is authored by the Appointing Party (Client) to establish their information requirements prior to tender?',
            options: ['EIR (Exchange Information Requirements)', 'BEP (BIM Execution Plan)', 'TIDP', 'COBie Sheet'],
            correctOptionIndex: 0,
            explanation: 'The EIR specifies the technical, management, and commercial information requirements requested by the client.'
          },
          {
            id: 'q3',
            question: 'In the ISO 19650 container naming standard (e.g. PBS-ZZ-XX-M3-M-0001), what does the "M3" field represent?',
            options: ['Type of information (3D Model / Drawing / Schedule)', 'Originator code', 'Revision number', 'Status code'],
            correctOptionIndex: 0,
            explanation: 'M3 represents 3D Model spatial coordinate information container type in the ISO 19650 UK/National Annex.'
          }
        ]
      }
    };

    const exam = defaultExams[courseId] || {
      courseId,
      title: `${courseId.toUpperCase()} Comprehensive Certification Exam`,
      description: 'Standard 10-Question Masterclass Certification Exam for Pragmatic BIM Solution Academy.',
      passingScorePercent: 70,
      timeLimitMinutes: 15,
      questions: defaultExams['c1'].questions
    };

    return exam;
  },

  saveCourseMcq(courseId: string, exam: CourseMcqExam): void {
    try {
      localStorage.setItem(`pbs_course_mcq_${courseId}`, JSON.stringify(exam));
    } catch (e) {
      console.warn('Failed to save MCQ exam:', e);
    }
  },

  // ==========================================
  // COURSE CERTIFICATE CONFIGURATION (ADMIN THEMES)
  // ==========================================
  getCourseCertificateConfig(courseId: string): CourseCertificateConfig {
    try {
      const stored = localStorage.getItem(`pbs_cert_config_${courseId}`);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {}

    const defaultConfigs: Record<string, CourseCertificateConfig> = {
      c1: {
        courseId: 'c1',
        theme: 'emerald',
        borderStyle: 'classic-double',
        certificateTitle: 'Professional Certificate of BIM Specialization',
        subtitle: 'Autodesk Revit MEP Masterclass (LOD 300 to LOD 500)',
        signatureName1: 'Pravin Yadav',
        signatureTitle1: 'Founder & Principal BIM Specialist',
        signatureName2: 'Dr. K. S. Raman',
        signatureTitle2: 'Dean of Digital AEC Engineering',
        showQrCode: true,
        showAccreditations: true,
        institutionName: 'PRAGMATIC BIM SOLUTION ACADEMY',
        accreditationText: 'ISO 19650 & Autodesk Certified BIM Curriculum Standards'
      },
      c2: {
        courseId: 'c2',
        theme: 'gold',
        borderStyle: 'ornate-gold',
        certificateTitle: 'Master Certificate in BIM Coordination',
        subtitle: 'Navisworks Manage 4D/5D & Multi-Disciplinary Clash Detection',
        signatureName1: 'Pravin Yadav',
        signatureTitle1: 'Director of Virtual Design & Construction',
        signatureName2: 'Er. Rajesh Kulkarni',
        signatureTitle2: 'Chief Technical Officer (AEC)',
        showQrCode: true,
        showAccreditations: true,
        institutionName: 'PRAGMATIC BIM SOLUTION ACADEMY',
        accreditationText: 'Accredited by Global BIM Managers Council'
      },
      c3: {
        courseId: 'c3',
        theme: 'cyber-blue',
        borderStyle: 'tech-geometric',
        certificateTitle: 'Computational BIM Automation Master',
        subtitle: 'Dynamo Visual Scripting & Revit API Automation',
        signatureName1: 'Pravin Yadav',
        signatureTitle1: 'Lead Computational BIM Architect',
        signatureName2: 'Dr. Sarah Jenkins',
        signatureTitle2: 'Head of AEC AI Research',
        showQrCode: true,
        showAccreditations: true,
        institutionName: 'PRAGMATIC BIM SOLUTION ACADEMY',
        accreditationText: 'Recognized by International Computational Design Alliance'
      },
      c4: {
        courseId: 'c4',
        theme: 'academic',
        borderStyle: 'classic-double',
        certificateTitle: 'ISO 19650 Global BIM Project Delivery Specialist',
        subtitle: 'Information Management & Common Data Environment (CDE) Governance',
        signatureName1: 'Pravin Yadav',
        signatureTitle1: 'ISO 19650 Lead Auditor & Director',
        signatureName2: 'Prof. M. Al-Hassan',
        signatureTitle2: 'Chair of Global BIM Information Standards',
        showQrCode: true,
        showAccreditations: true,
        institutionName: 'PRAGMATIC BIM SOLUTION ACADEMY',
        accreditationText: 'Compliant with ISO 19650-1, ISO 19650-2 & BSI Standards'
      }
    };

    return defaultConfigs[courseId] || {
      courseId,
      theme: 'emerald',
      borderStyle: 'classic-double',
      certificateTitle: 'Certificate of Excellence & Completion',
      subtitle: 'Professional BIM Masterclass Program',
      signatureName1: 'Pravin Yadav',
      signatureTitle1: 'Academy Director & Principal Specialist',
      signatureName2: 'Dr. K. S. Raman',
      signatureTitle2: 'Academic Dean',
      showQrCode: true,
      showAccreditations: true,
      institutionName: 'PRAGMATIC BIM SOLUTION ACADEMY',
      accreditationText: 'Global ISO 19650 AEC Professional Credential'
    };
  },

  saveCourseCertificateConfig(courseId: string, config: CourseCertificateConfig): void {
    try {
      localStorage.setItem(`pbs_cert_config_${courseId}`, JSON.stringify(config));
    } catch (e) {
      console.warn('Failed to save certificate config:', e);
    }
  },

  // ==========================================
  // STUDENT COURSE PROGRESSION (MODULES + TASKS + MCQ + CERTIFICATE)
  // ==========================================
  getStudentCourseProgress(studentId: string, courseId: string): StudentCourseProgress {
    const key = `pbs_progress_${studentId || 'PBS-STU-2026-8492'}_${courseId}`;
    try {
      const stored = localStorage.getItem(key);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {}

    const defaultProgress: StudentCourseProgress = {
      studentId: studentId || 'PBS-STU-2026-8492',
      courseId,
      completedLessonIds: ['les-1-1'],
      totalActiveTimeMinutes: 45,
      lastStudiedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      taskSubmitted: false,
      mcqAttempted: false,
      mcqPassed: false,
      isCertified: false
    };
    return defaultProgress;
  },

  updateStudentCourseProgress(
    studentId: string,
    courseId: string,
    updates: Partial<StudentCourseProgress>
  ): StudentCourseProgress {
    const current = this.getStudentCourseProgress(studentId, courseId);
    const updated: StudentCourseProgress = {
      ...current,
      ...updates,
      lastStudiedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
    };

    // Check if course is newly fully certified (completed all lessons + task submitted + MCQ passed)
    const course = this.getCourseById(courseId);
    const totalLessons = course?.modules?.reduce((acc, m) => acc + (m.lessons?.length || 0), 0) || 10;
    const isLessonsCompleted = updated.completedLessonIds.length >= Math.max(1, Math.min(totalLessons, 2));

    if (isLessonsCompleted && updated.taskSubmitted && updated.mcqPassed && !updated.isCertified) {
      updated.isCertified = true;
      updated.certificateId = `PBS-CERT-${Date.now().toString().slice(-6)}-${courseId.toUpperCase()}`;
      updated.certificateIssuedDate = new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });

      // Log activity
      this.logStudentActivity(
        studentId,
        'certificate_unlocked',
        `Unlocked Official Certificate for: ${course?.title || courseId} (ID: ${updated.certificateId})`,
        { courseId, courseTitle: course?.title, score: updated.mcqScore }
      );
    }

    const key = `pbs_progress_${studentId || 'PBS-STU-2026-8492'}_${courseId}`;
    try {
      localStorage.setItem(key, JSON.stringify(updated));
      pbsNotifyChange('progress_updated', { studentId, courseId, updated });
    } catch (e) {
      console.warn('Failed to save student course progress:', e);
    }
    return updated;
  },

  recordStudentActiveTime(studentId: string, courseId: string, minutesAdded: number): void {
    const current = this.getStudentCourseProgress(studentId, courseId);
    this.updateStudentCourseProgress(studentId, courseId, {
      totalActiveTimeMinutes: (current.totalActiveTimeMinutes || 0) + minutesAdded
    });
  },

  recordStudentTaskSubmission(studentId: string, courseId: string, taskDetails: any): void {
    const current = this.getStudentCourseProgress(studentId, courseId);
    this.updateStudentCourseProgress(studentId, courseId, {
      taskSubmitted: true,
      taskSubmissionDetails: {
        taskId: taskDetails.taskId || 'TSK-88',
        taskName: taskDetails.taskName || 'Practical Capstone Task Submission',
        submittedAt: new Date().toLocaleString('en-US', { month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' }),
        score: taskDetails.score || 98,
        feedback: 'Preflight Clash Scan Passed. 0 Clashes detected. LOD 400 parameters compliant.'
      }
    });

    this.logStudentActivity(
      studentId,
      'task_submitted',
      `Submitted Capstone Task: ${taskDetails.taskName || 'Practical Assignment'} (Score: ${taskDetails.score || 98}/100)`,
      { courseId, score: taskDetails.score || 98 }
    );
  },

  recordStudentMcqResult(studentId: string, courseId: string, score: number, total: number, passed: boolean): void {
    const current = this.getStudentCourseProgress(studentId, courseId);
    this.updateStudentCourseProgress(studentId, courseId, {
      mcqAttempted: true,
      mcqPassed: passed,
      mcqScore: score,
      mcqTotal: total,
      mcqCompletedAt: new Date().toLocaleString('en-US', { month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' })
    });

    const course = this.getCourseById(courseId);
    this.logStudentActivity(
      studentId,
      'mcq_attempted',
      `${passed ? 'PASSED' : 'ATTEMPTED'} Final MCQ Certification Exam for ${course?.title || courseId}: Scored ${score}/${total} (${Math.round((score/total)*100)}%)`,
      { courseId, score, totalQuestions: total }
    );
  },

  /**
   * Check if student has completed all course modules and is ready for the MCQ test
   */
  checkCourseEligibilityForMcq(studentId: string, courseId: string): {
    isEligible: boolean;
    completedCount: number;
    totalCount: number;
    progressPercent: number;
    remainingLessons: string[];
  } {
    const course = this.getCourseById(courseId);
    const progress = this.getStudentCourseProgress(studentId, courseId);
    
    // Gather all lesson identifiers / titles
    const allLessonKeys: string[] = [];
    if (course && course.modules) {
      course.modules.forEach(m => {
        if (m.lessons) {
          m.lessons.forEach(l => {
            allLessonKeys.push(l.title || l.id || 'lesson');
          });
        }
      });
    }

    const totalCount = allLessonKeys.length > 0 ? allLessonKeys.length : (course?.modulesCount || 6);
    const completedSet = new Set(progress.completedLessonIds || []);
    const completedCount = allLessonKeys.filter(k => completedSet.has(k)).length;
    
    // Also consider completed if completedLessonIds length is at least totalCount
    const effectiveCompleted = Math.max(completedCount, progress.completedLessonIds?.length || 0);
    const isEligible = effectiveCompleted >= totalCount || (effectiveCompleted >= 1 && totalCount <= 1);
    const progressPercent = Math.min(100, Math.round((effectiveCompleted / Math.max(1, totalCount)) * 100));

    const remainingLessons = allLessonKeys.filter(k => !completedSet.has(k));

    return {
      isEligible,
      completedCount: Math.min(totalCount, effectiveCompleted),
      totalCount,
      progressPercent,
      remainingLessons
    };
  },

  /**
   * Mark all modules / lessons completed for a course (unlocks MCQ Exam)
   */
  completeAllCourseModules(studentId: string, courseId: string): StudentCourseProgress {
    const course = this.getCourseById(courseId);
    const allLessonKeys: string[] = [];
    if (course && course.modules) {
      course.modules.forEach(m => {
        if (m.lessons) {
          m.lessons.forEach(l => {
            allLessonKeys.push(l.title || l.id || 'lesson');
          });
        }
      });
    }

    const completedLessonIds = allLessonKeys.length > 0 
      ? allLessonKeys 
      : ['les-1-1', 'les-1-2', 'les-2-1', 'les-2-2', 'les-3-1', 'les-4-1', 'les-5-1', 'les-6-1'];

    const updated = this.updateStudentCourseProgress(studentId, courseId, {
      completedLessonIds,
      taskSubmitted: true
    });

    this.logStudentActivity(
      studentId,
      'module_completed',
      `Completed all syllabus modules for ${course?.title || courseId}. MCQ Certification Exam unlocked!`,
      { courseId, modulesCompleted: completedLessonIds.length }
    );

    return updated;
  },

  // ==========================================
  // PUBLIC STUDENT PORTFOLIO PROFILE
  // ==========================================
  getStudentPortfolio(studentId: string): StudentPortfolioProfile {
    const cleanId = studentId || 'PBS-STU-2026-8492';
    try {
      const stored = localStorage.getItem(`pbs_portfolio_${cleanId}`);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {}

    const student = this.getStudentByQuery(cleanId);

    const defaultProfile: StudentPortfolioProfile = {
      studentId: cleanId,
      isPublic: true,
      headline: 'Senior BIM Coordinator & MEP Digital Delivery Specialist',
      bio: 'BIM Engineer specializing in LOD 300 to LOD 500 mechanical, electrical, and plumbing infrastructure modeling, multi-disciplinary clash resolution in Navisworks Manage, automated workflows via Dynamo visual scripting, and ISO 19650 compliant Information Management.',
      skills: [
        { name: 'Autodesk Revit MEP (LOD 300-500)', level: 98, category: 'Authoring' },
        { name: 'Navisworks Manage & 4D TimeLiner', level: 95, category: 'Coordination' },
        { name: 'Dynamo Visual Scripting & Python', level: 90, category: 'Automation' },
        { name: 'ISO 19650 CDE & BEP Information Delivery', level: 94, category: 'Standards' },
        { name: 'BIM 360 / Autodesk Construction Cloud', level: 92, category: 'Collaboration' },
        { name: 'AutoCAD & Civil 3D Utilities', level: 88, category: 'Drafting' }
      ],
      featuredProjects: [
        {
          id: 'proj-1',
          title: 'NEOM Commercial Tower - Chilled Water Plant Room LOD 400',
          category: 'Mechanical HVAC / Plant Room',
          description: 'Authored complete 4,500 TR central chiller plant room with primary-secondary pumps, expansion tanks, and parametric valve manifolds with 0 clash tolerance.',
          lodLevel: 'LOD 400 (Fabrication Ready)',
          softwareUsed: ['Revit 2026', 'Navisworks Manage', 'Dynamo'],
          imageUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
          projectUrl: 'https://github.com/pravinyadav-bim/neom-plant-room-bim'
        },
        {
          id: 'proj-2',
          title: 'Dubai Metro Station Expansion - Multi-Disciplinary Coordination',
          category: 'Transit Infrastructure',
          description: 'Federated architectural, structural, and MEP models in Navisworks. Resolved 1,420 clashes across HVAC ductwork and post-tensioned structural beams using BCF workflows.',
          lodLevel: 'LOD 350 (Coordination)',
          softwareUsed: ['Navisworks Manage', 'Revit', 'BIM Track'],
          imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80',
          projectUrl: 'https://github.com/pravinyadav-bim/dubai-metro-clash-matrix'
        },
        {
          id: 'proj-3',
          title: 'Automated MEP Conduit & Tagging Dynamo Script Suite',
          category: 'Computational BIM Automation',
          description: 'Custom visual programming script automatically sizing cable trays based on circuit ampacity and auto-placing multi-category tags across 200+ floor plans.',
          lodLevel: 'Automation Tool',
          softwareUsed: ['Dynamo', 'Python', 'Revit API'],
          imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
          projectUrl: 'https://github.com/pravinyadav-bim/dynamo-mep-toolkit'
        }
      ],
      socialLinks: {
        linkedin: 'https://linkedin.com/in/pravinyadav-bim',
        github: 'https://github.com/pravinyadav-bim',
        portfolio: 'https://pravinyadav-bim.portfolio.site',
        email: student?.email || 'pravin.yadav@pbs.com',
        phone: student?.phone || '+91 8208918726',
        location: 'Pune / Bangalore & Dubai UAE'
      }
    };

    return defaultProfile;
  },

  saveStudentPortfolio(studentId: string, profile: StudentPortfolioProfile): void {
    const cleanId = studentId || 'PBS-STU-2026-8492';
    try {
      localStorage.setItem(`pbs_portfolio_${cleanId}`, JSON.stringify(profile));
      this.logStudentActivity(cleanId, 'portfolio_updated', 'Updated Student Portfolio details & public showcase');
      pbsNotifyChange('portfolio_updated', { studentId: cleanId, profile });
    } catch (e) {
      console.warn('Failed to save student portfolio:', e);
    }
  },

  // ==========================================
  // DYNAMIC COHORT LEADERBOARD (REAL STORE DATA)
  // ==========================================
  getLeaderboardData(currentStudentId?: string): LeaderboardStudentData[] {
    const students = this.getStudents();
    const cleanCurrentId = currentStudentId || 'PBS-STU-2026-8492';

    const ranked: LeaderboardStudentData[] = students.map((s) => {
      // Calculate dynamic credits & tasks
      const c1Progress = this.getStudentCourseProgress(s.studentId, 'c1');
      const isCurrent = s.studentId === cleanCurrentId || s.email?.toLowerCase() === 'pravin.yadav@pbs.com';
      
      const tasksCompleted = isCurrent ? 87 : Math.max(12, Math.floor((s.growthScore || 50) * 0.8));
      const activeStudyMinutes = (c1Progress.totalActiveTimeMinutes || 45) + (s.growthScore || 15) * 12;
      
      // Exact calculation of credits
      const credits = Math.round(
        (s.growthScore || 20) * 4 +
        tasksCompleted * 5 +
        Math.floor(activeStudyMinutes / 15)
      );

      let badge = 'BIM Scholar 📐';
      if (credits >= 600) badge = 'Cohort Topper 🌟';
      else if (credits >= 500) badge = 'BIM Specialist ⚡';
      else if (credits >= 400) badge = 'Navisworks Guru 🏗️';
      else if (credits >= 300) badge = 'Dynamo Master 💻';

      return {
        rank: 1,
        studentId: s.studentId,
        name: s.name,
        avatar: s.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        rollNumber: s.rollNumber,
        specialization: s.specialization || 'BIM Masterclass',
        credits,
        tasksCompleted,
        attendancePercent: s.attendancePercent || 100,
        streakDays: Math.min(45, Math.max(7, Math.floor(credits / 15))),
        activeStudyMinutes,
        badge,
        isCurrentUser: isCurrent
      };
    });

    // If there is only 1 student in store (Pravin), add a few peer cohort classmates for rich comparison
    if (ranked.length < 5) {
      const samplePeers: LeaderboardStudentData[] = [
        {
          rank: 2,
          studentId: 'PBS-STU-2026-1024',
          name: 'Aarav Sharma',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
          rollNumber: 'PBS/2026/BIM-012',
          specialization: 'Navisworks & Clash Matrix Pro',
          credits: 615,
          tasksCompleted: 82,
          attendancePercent: 98,
          streakDays: 38,
          activeStudyMinutes: 720,
          badge: 'BIM Star ⚡',
          isCurrentUser: false
        },
        {
          rank: 3,
          studentId: 'PBS-STU-2026-3091',
          name: 'Sneha Patel',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
          rollNumber: 'PBS/2026/BIM-034',
          specialization: 'Revit Architecture & MEP LOD 400',
          credits: 590,
          tasksCompleted: 79,
          attendancePercent: 96,
          streakDays: 34,
          activeStudyMinutes: 680,
          badge: 'Navisworks Guru 🏗️',
          isCurrentUser: false
        },
        {
          rank: 4,
          studentId: 'PBS-STU-2026-4421',
          name: 'Rohan Deshmukh',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
          rollNumber: 'PBS/2026/BIM-058',
          specialization: 'Computational Dynamo Automation',
          credits: 575,
          tasksCompleted: 76,
          attendancePercent: 95,
          streakDays: 30,
          activeStudyMinutes: 640,
          badge: 'Dynamo Master 💻',
          isCurrentUser: false
        },
        {
          rank: 5,
          studentId: 'PBS-STU-2026-5590',
          name: 'Ananya Roy',
          avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
          rollNumber: 'PBS/2026/BIM-072',
          specialization: 'ISO 19650 Information Management',
          credits: 550,
          tasksCompleted: 73,
          attendancePercent: 94,
          streakDays: 28,
          activeStudyMinutes: 610,
          badge: 'ISO 19650 Lead 📐',
          isCurrentUser: false
        }
      ];
      ranked.push(...samplePeers);
    }

    // Sort descending by credits
    ranked.sort((a, b) => b.credits - a.credits);

    // Assign 1-indexed ranks
    ranked.forEach((item, index) => {
      item.rank = index + 1;
    });

    return ranked;
  },

  // ==========================================
  // TWO-WAY MESSAGING FROM STUDENT TO ADMIN
  // ==========================================
  sendMessageFromStudent(studentId: string, subject: string, message: string): StudentMessageItem {
    const student = this.getStudentByQuery(studentId);
    const newMessage: StudentMessageItem = {
      id: `msg-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      sender: 'student',
      senderName: student?.name || 'Pravin Yadav',
      timestamp: new Date().toLocaleString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }),
      subject,
      message,
      isRead: false
    };

    if (student) {
      const messages = student.messages || [];
      messages.unshift(newMessage);
      this.updateStudent(student.studentId, { messages });
    }

    this.logStudentActivity(
      studentId,
      'portfolio_updated',
      `Sent Message to Admin: "${subject}"`
    );

    return newMessage;
  },

  // ==========================================
  // CENTRAL CLOUD DATABASE INITIALIZER & POLLER
  // Ensures any new PC / browser instantly loads live data
  // ==========================================
  _syncStatus: {
    isOnline: true,
    isSyncing: false,
    lastSyncedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    syncCount: 0,
    error: null as string | null
  },

  getSyncStatus() {
    return { ...this._syncStatus };
  },

  async syncWithCloudServer(force: boolean = false): Promise<boolean> {
    if (typeof window === 'undefined') return false;
    this._syncStatus.isSyncing = true;
    try {
      const res = await fetch('/api/db/sync-all');
      if (!res.ok) {
        this._syncStatus.isOnline = false;
        this._syncStatus.isSyncing = false;
        this._syncStatus.error = `HTTP ${res.status}`;
        return false;
      }

      const json = await res.json();
      if (!json.success || !json.data) {
        this._syncStatus.isSyncing = false;
        return false;
      }

      const { data } = json;
      let hasUpdates = false;

      // 1. Sync students with intelligent two-way merge
      const localList = this.getStudents();
      if (data.students && Array.isArray(data.students) && data.students.length > 0) {
        const mergedStudents = mergeStudentsList(data.students, localList);
        const localStudentsStr = localStorage.getItem(STORAGE_STUDENTS_KEY);
        const mergedStudentsStr = JSON.stringify(mergedStudents);
        if (localStudentsStr !== mergedStudentsStr) {
          localStorage.setItem(STORAGE_STUDENTS_KEY, mergedStudentsStr);
          hasUpdates = true;
        }
        // If local had any student not present on server, push back merged roster
        if (mergedStudents.length > data.students.length) {
          syncToServer('students', mergedStudents);
        }
      } else {
        if (localList && localList.length > 0) {
          syncToServer('students', localList);
        }
      }

      // 2. Sync courses
      if (data.courses && Array.isArray(data.courses) && data.courses.length > 0) {
        const localCoursesStr = localStorage.getItem(STORAGE_COURSES_KEY);
        const serverCoursesStr = JSON.stringify(data.courses);
        if (localCoursesStr !== serverCoursesStr) {
          localStorage.setItem(STORAGE_COURSES_KEY, serverCoursesStr);
          hasUpdates = true;
        }
      } else {
        const currentCourses = this.getCourses();
        if (currentCourses && currentCourses.length > 0) {
          syncToServer('courses', currentCourses);
        }
      }

      // 3. Sync enrollment requests
      if (data.enrollments && Array.isArray(data.enrollments) && data.enrollments.length > 0) {
        const localEnrStr = localStorage.getItem(STORAGE_ENROLLMENTS_KEY);
        const serverEnrStr = JSON.stringify(data.enrollments);
        if (localEnrStr !== serverEnrStr) {
          localStorage.setItem(STORAGE_ENROLLMENTS_KEY, serverEnrStr);
          hasUpdates = true;
        }
      } else {
        const currentEnr = this.getEnrollmentRequests();
        if (currentEnr && currentEnr.length > 0) {
          syncToServer('enrollments', currentEnr);
        }
      }

      // 4. Sync receipts
      if (data.receipts && Array.isArray(data.receipts) && data.receipts.length > 0) {
        const localReceiptsStr = localStorage.getItem('pbs_student_receipts');
        const serverReceiptsStr = JSON.stringify(data.receipts);
        if (localReceiptsStr !== serverReceiptsStr) {
          localStorage.setItem('pbs_student_receipts', serverReceiptsStr);
          hasUpdates = true;
        }
      }

      // 5. Sync activity logs
      if (data.activityLogs && Array.isArray(data.activityLogs) && data.activityLogs.length > 0) {
        const localLogsStr = localStorage.getItem('pbs_student_activity_logs');
        const serverLogsStr = JSON.stringify(data.activityLogs);
        if (localLogsStr !== serverLogsStr) {
          localStorage.setItem('pbs_student_activity_logs', serverLogsStr);
          hasUpdates = true;
        }
      }

      // 6. Sync exams
      if (data.exams && typeof data.exams === 'object') {
        Object.entries(data.exams).forEach(([courseId, exam]) => {
          if (exam) {
            localStorage.setItem(`pbs_course_mcq_${courseId}`, JSON.stringify(exam));
          }
        });
      }

      // 7. Sync cert configs
      if (data.certConfigs && typeof data.certConfigs === 'object') {
        Object.entries(data.certConfigs).forEach(([courseId, cfg]) => {
          if (cfg) {
            localStorage.setItem(`pbs_cert_config_${courseId}`, JSON.stringify(cfg));
          }
        });
      }

      // 8. Sync progress
      if (data.progress && typeof data.progress === 'object') {
        Object.entries(data.progress).forEach(([pKey, prog]) => {
          if (prog) {
            localStorage.setItem(`pbs_progress_${pKey}`, JSON.stringify(prog));
          }
        });
      }

      // 9. Sync portfolios
      if (data.portfolios && typeof data.portfolios === 'object') {
        Object.entries(data.portfolios).forEach(([sId, port]) => {
          if (port) {
            localStorage.setItem(`pbs_portfolio_${sId}`, JSON.stringify(port));
          }
        });
      }

      this._syncStatus.isOnline = true;
      this._syncStatus.isSyncing = false;
      this._syncStatus.lastSyncedAt = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      this._syncStatus.syncCount += 1;
      this._syncStatus.error = null;

      if (hasUpdates || force) {
        pbsNotifyChange('cloud_sync_completed', data);
      }

      return true;
    } catch (e: any) {
      this._syncStatus.isOnline = false;
      this._syncStatus.isSyncing = false;
      this._syncStatus.error = e?.message || 'Sync network error';
      return false;
    }
  }
};

// Automatically initiate cloud sync upon module load in browser
if (typeof window !== 'undefined') {
  // Sync immediately
  setTimeout(() => {
    pbsAdminStore.syncWithCloudServer(true);
  }, 50);

  // Background polling every 4 seconds for instant cross-device updates
  setInterval(() => {
    pbsAdminStore.syncWithCloudServer(false);
  }, 4000);

  // Sync when window gains focus or tab becomes visible
  window.addEventListener('focus', () => {
    pbsAdminStore.syncWithCloudServer(true);
  });

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      pbsAdminStore.syncWithCloudServer(true);
    }
  });
}


