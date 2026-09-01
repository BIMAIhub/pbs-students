export interface LiveSession {
  id: string;
  dateMonth: string;
  dateDay: string;
  title: string;
  timeRange: string;
  isCompulsory: boolean;
  isCompleted: boolean;
  zoomUrl?: string;
  recordingUrl?: string;
  materials?: string[];
  instructor?: string;
  notes?: string;
}

export interface CapstoneStage {
  stageNumber: string; // '00', '01', etc.
  stageIndex: number;
  title: string;
  goal: string;
  status: 'Completed' | 'In Progress' | 'Upcoming';
  grade: 'Excellent' | 'Good' | 'Pending';
  dueDate: string;
  isCritical?: boolean;
  submissionFiles?: { name: string; size: string; type: string }[];
  mentorFeedback?: string;
  mentorName?: string;
  mentorScore?: number; // out of 100
}

export interface ReviewedTask {
  id: string;
  taskName: string;
  performance: 'excellent' | 'good' | 'poor';
  creditsScored: number;
  creditsTotal: number;
  skillsTest: string;
  referenceModule: string;
  reviewedDate?: string;
  mentorNotes?: string;
}

export interface CourseModuleLesson {
  id: string;
  title: string;
  duration: string;
  videoUrl?: string;
  isCompleted: boolean;
  type: 'video' | 'quiz' | 'reading' | 'assignment';
}

export interface CourseContentModule {
  id: string;
  moduleCode: string;
  title: string;
  isCompleted: boolean;
  lessonsCount: number;
  duration: string;
  subSections: {
    sectionTitle: string;
    duration?: string;
    lessons: CourseModuleLesson[];
  }[];
}

export interface EnrolledCourseItem {
  id: string;
  courseId: string;
  courseTitle: string;
  category: string;
  level: string;
  badge: string;
  batchMode: string;
  batchSchedule: string;
  progressPercent: number;
  completedModules: number;
  totalModules: number;
  enrolledDate: string;
  status: 'Active' | 'Completed' | 'Upcoming';
  instructor: string;
  totalFee: number;
  paidAmount: number;
  pendingBalance: number;
  certificateEarned: boolean;
  image: string;
  accentColor: string;
}

export interface DownloadableAsset {
  id: string;
  title: string;
  category: 'BIM Models & Datasets' | 'PBS Family Library (.rfa)' | 'Dynamo Scripts (.dyn)' | 'ISO 19650 Templates' | 'Lecture Notes & Books' | 'Certificates & Invoices';
  fileFormat: string;
  fileSize: string;
  version: string;
  downloadCount: number;
  description: string;
  moduleRef?: string;
  badge?: string;
}

export interface FeeReceiptItem {
  receiptId: string;
  invoiceNumber: string;
  courseId: string;
  courseTitle: string;
  amount: number;
  paymentMethod: string;
  transactionId: string;
  date: string;
  paymentType: 'Full Payment' | 'Installment #1' | 'Installment #2' | 'Installment #3';
  status: 'Paid' | 'Pending';
  taxGst: number;
  downloadUrl?: string;
}

export interface StudentProfileData {
  studentId: string;
  rollNumber: string;
  fullName: string;
  email: string;
  googleEmailId?: string;
  phone: string;
  avatarUrl: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  city: string;
  country: string;
  educationDegree: string;
  collegeUniversity: string;
  graduationYear: string;
  experienceLevel: string;
  currentCompanyRole: string;
  targetCareerRole: string;
  targetLocations: string[];
  expectedSalary: string;
  portfolioUrl: string;
  linkedinUrl: string;
  githubUrl: string;
  behanceUrl: string;
  bio: string;
  skillsProficiency: {
    skillName: string;
    proficiency: number; // 0 - 100
    category: string;
  }[];
  preferences: {
    whatsappReminders: boolean;
    emailDigest: boolean;
    calendarSync: boolean;
    timezone: string;
    language: string;
  };
}

export interface MentorshipEvaluation {
  id: string;
  evaluatorName: string;
  evaluatorRole: string;
  date: string;
  stageName: string;
  overallRating: number; // 1 to 5
  technicalSkillsScore: number; // /100
  coordinationScore: number; // /100
  standardsComplianceScore: number; // /100
  communicationScore: number; // /100
  strengths: string[];
  areasOfImprovement: string[];
  detailedRemarks: string;
  placementRecommendation: 'Highly Recommended' | 'Recommended' | 'Developing';
}
