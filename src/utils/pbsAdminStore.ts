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

export interface ManagedStudent {
  id: string;
  studentId: string;
  rollNumber: string;
  name: string;
  email: string;
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

// Initial Default Students - ONLY REAL STUDENT PRAVIN YADAV
const INITIAL_STUDENTS: ManagedStudent[] = [
  {
    id: 'user-student-pravin',
    studentId: 'PBS-STU-2026-8492',
    rollNumber: 'PBS/2026/BIM-084',
    name: 'Pravin Yadav',
    email: 'pravin.yadav.0926@pbs.com',
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
      readinessStatus: 'Cohort Enrolled - Training Active',
      referredCompanies: [
        {
          companyName: 'AtkinsRéalis (Dubai / UK Infrastructure)',
          role: 'BIM Coordinator - MEP Systems',
          location: 'Dubai Design District, UAE',
          status: 'Target Pipeline'
        },
        {
          companyName: 'WSP Middle East',
          role: 'Senior BIM MEP Specialist',
          location: 'Riyadh, KSA',
          status: 'Target Pipeline'
        },
        {
          companyName: 'Jacobs Engineering',
          role: 'Digital Delivery Engineer',
          location: 'Pune / London',
          status: 'Target Pipeline'
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

export const pbsAdminStore = {
  /**
   * Get all students
   */
  getStudents(): ManagedStudent[] {
    try {
      const stored = localStorage.getItem(STORAGE_STUDENTS_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Could not read students from storage:', e);
    }
    return INITIAL_STUDENTS;
  },

  /**
   * Save students roster
   */
  saveStudents(students: ManagedStudent[]): void {
    try {
      localStorage.setItem(STORAGE_STUDENTS_KEY, JSON.stringify(students));
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
    this.saveStudents(updated.length > 0 ? updated : INITIAL_STUDENTS);
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
  recordFeePayment(studentId: string, paidAmountAdd: number): ManagedStudent | null {
    const student = this.getStudents().find(s => s.studentId === studentId || s.id === studentId);
    if (!student) return null;

    const newPaid = student.paidAmount + paidAmountAdd;
    const newPending = Math.max(0, student.totalFee - newPaid);
    const newStatus = newPending === 0 ? 'Full Paid' : 'Part Paid';

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
   * Generate official Institutional Student Email from Name and Batch
   * e.g., "Pravin Yadav" -> "pravin.yadav.0926@pbs.com"
   */
  generateStudentEmail(fullName: string, batchMonthYear: string = '0926'): string {
    const clean = fullName.trim().toLowerCase().replace(/[^a-z0-9\s]/g, '');
    const parts = clean.split(/\s+/).filter(Boolean);
    const slug = parts.join('.');
    const cleanBatch = batchMonthYear.replace(/[^0-9]/g, '') || '0926';
    return `${slug}.${cleanBatch}@pbs.com`;
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
   * Save courses library
   */
  saveCourses(courses: AdminCourse[]): void {
    try {
      localStorage.setItem(STORAGE_COURSES_KEY, JSON.stringify(courses));
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

    // 3. YouTube Links
    const ytMatch = trimmed.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    if (ytMatch && ytMatch[1]) {
      return `https://www.youtube.com/embed/${ytMatch[1]}?modestbranding=1&rel=0`;
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
   * Find a student by email, roll number, or ID
   */
  getStudentByQuery(query: string): ManagedStudent | null {
    if (!query) return null;
    const clean = query.toLowerCase().trim();
    const list = this.getStudents();
    return list.find(s => 
      s.email?.toLowerCase() === clean ||
      s.studentId?.toLowerCase() === clean ||
      s.rollNumber?.toLowerCase() === clean ||
      s.id?.toLowerCase() === clean ||
      s.name?.toLowerCase() === clean
    ) || null;
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
  }
};
