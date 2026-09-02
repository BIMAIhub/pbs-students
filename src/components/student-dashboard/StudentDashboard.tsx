import React, { useState, useEffect } from 'react';
import { 
  Flag, 
  Bell, 
  User, 
  LogOut, 
  ExternalLink, 
  BookOpen, 
  Award, 
  Calendar, 
  FileText, 
  Sparkles,
  ArrowLeft,
  ChevronDown,
  LayoutDashboard,
  CreditCard,
  Download,
  FolderArchive,
  Layers,
  ShieldCheck,
  CheckCircle2,
  Sliders,
  UserCheck,
  Box,
  Clock,
  Flame,
  Bot,
  UploadCloud,
  Volume2,
  VolumeX,
  Zap,
  Users,
  Radio,
  Share2,
  KeyRound,
  FileSpreadsheet,
  Lock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CourseOverviewTab } from './CourseOverviewTab';
import { LiveLearningTab } from './LiveLearningTab';
import { CapstoneProjectTab } from './CapstoneProjectTab';
import { ReportsFeedbackTab } from './ReportsFeedbackTab';
import { EnrolledCoursesTab } from './EnrolledCoursesTab';
import { FeeFinancialsTab } from './FeeFinancialsTab';
import { DownloadsVaultTab } from './DownloadsVaultTab';
import { ProfileSettingsModal } from './ProfileSettingsModal';
import { StudentIDCardModal } from './StudentIDCardModal';
import { BonafideLetterModal } from './BonafideLetterModal';
import { PayFeeModal } from './PayFeeModal';
import { ClassroomVideoModal } from './ClassroomVideoModal';
import { CohortLeaderboardModal } from './CohortLeaderboardModal';
import { CareerGoalModal } from './CareerGoalModal';
import { CodeOfConductModal } from './CodeOfConductModal';
import { CertificateGeneratorModal } from './CertificateGeneratorModal';
import { PolicyModal } from './PolicyModal';
import { LiveSessionDetailModal } from './LiveSessionDetailModal';
import { Bim3DModelViewerModal } from './Bim3DModelViewerModal';
import { BimStudyTimerModal } from './BimStudyTimerModal';
import { BimAiCopilotDrawer } from './BimAiCopilotDrawer';
import { TaskSubmissionModal } from './TaskSubmissionModal';
import { ChangePasswordModal } from './ChangePasswordModal';
import { StudentExcelRegistryModal } from './StudentExcelRegistryModal';
import { CourseUpiEnrollModal } from './CourseUpiEnrollModal';
import { StudentPortfolioModal } from './StudentPortfolioModal';
import { CourseMcqModal } from './CourseMcqModal';
import { LiveSession, StudentProfileData, EnrolledCourseItem, FeeReceiptItem, DownloadableAsset } from './types';
import { 
  STUDENT_PROFILE_DEFAULT, 
  ENROLLED_COURSES_DATA, 
  FEE_RECEIPTS_DATA, 
  DOWNLOADABLE_ASSETS_DATA 
} from './dashboardData';
import { studentAuthUtil } from '../../utils/studentAuth';
import { pbsAdminStore, ManagedStudent, AdminCourse } from '../../utils/pbsAdminStore';
import { soundFx } from '../../utils/soundEffects';

interface StudentDashboardProps {
  user?: any;
  onLogout?: () => void;
  onBackToHome?: () => void;
}

export type DashboardTabType = 
  | 'course_overview' 
  | 'enrolled_courses'
  | 'live_learning' 
  | 'capstone_project' 
  | 'reports_feedback'
  | 'fee_financials'
  | 'downloads_vault';

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  user,
  onLogout,
  onBackToHome,
}) => {
  const [activeTab, setActiveTab] = useState<DashboardTabType>('course_overview');
  
  // Persistent Student Data States
  const [profileData, setProfileData] = useState<StudentProfileData>(STUDENT_PROFILE_DEFAULT);
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourseItem[]>(ENROLLED_COURSES_DATA);
  const [feeReceipts, setFeeReceipts] = useState<FeeReceiptItem[]>(() => {
    try {
      const stored = localStorage.getItem('pbs_student_receipts');
      if (stored) return JSON.parse(stored);
    } catch {}
    return FEE_RECEIPTS_DATA;
  });

  useEffect(() => {
    localStorage.setItem('pbs_student_receipts', JSON.stringify(feeReceipts));
  }, [feeReceipts]);
  const [downloadableAssets, setDownloadableAssets] = useState<DownloadableAsset[]>(DOWNLOADABLE_ASSETS_DATA);
  const [activeCourseId, setActiveCourseId] = useState<string>('revit-mep-pro');

  // Gamification states
  const [studentXp, setStudentXp] = useState(4850);
  const [streakCount, setStreakCount] = useState(18);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Modals state
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showStudentIDCardModal, setShowStudentIDCardModal] = useState(false);
  const [showBonafideModal, setShowBonafideModal] = useState(false);
  const [showPayFeeModal, setShowPayFeeModal] = useState(false);
  const [payFeeTarget, setPayFeeTarget] = useState<{ title: string; courseId: string; balance: number }>({
    title: 'Autodesk Revit MEP Masterclass (LOD 300 - 500)',
    courseId: 'revit-mep-pro',
    balance: 7499
  });

  // Advanced New Modals
  const [show3dModelModal, setShow3dModelModal] = useState(false);
  const [showStudyTimerModal, setShowStudyTimerModal] = useState(false);
  const [showAiCopilotDrawer, setShowAiCopilotDrawer] = useState(false);
  const [showTaskSubmissionModal, setShowTaskSubmissionModal] = useState(false);

  // Portfolio & MCQ Assessment Modals
  const [showPortfolioModal, setShowPortfolioModal] = useState(false);
  const [portfolioModalMode, setPortfolioModalMode] = useState<'view' | 'edit'>('edit');
  const [showCourseMcqModal, setShowCourseMcqModal] = useState(false);
  const [selectedCourseForMcq, setSelectedCourseForMcq] = useState<{ id: string; title: string }>({
    id: 'c1',
    title: 'Advanced BIM Coordination & Clash Detection with Navisworks & Revit'
  });

  const [showClassroomModal, setShowClassroomModal] = useState(false);
  const [showLeaderboardModal, setShowLeaderboardModal] = useState(false);
  const [showCareerGoalModal, setShowCareerGoalModal] = useState(false);
  const [showCodeOfConductModal, setShowCodeOfConductModal] = useState(false);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showExcelRegistryModal, setShowExcelRegistryModal] = useState(false);
  const [showCourseUpiEnrollModal, setShowCourseUpiEnrollModal] = useState(false);
  const [selectedCourseForUpiEnroll, setSelectedCourseForUpiEnroll] = useState<AdminCourse | null>(null);
  const [policyModalType, setPolicyModalType] = useState<'placement' | 'faq' | 'certification' | null>(null);
  const [selectedLiveSession, setSelectedLiveSession] = useState<LiveSession | null>(null);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [notificationAlert, setNotificationAlert] = useState<string | null>(null);

  // Live session countdown timer (hours, mins, secs)
  const [countdown, setCountdown] = useState({ hours: 2, minutes: 14, seconds: 45 });

  // Session activity logger and active time tracker
  useEffect(() => {
    const sId = profileData.studentId || 'PBS-STU-2026-8492';
    // Log LMS Login Event
    pbsAdminStore.logStudentActivity(
      sId, 
      'login', 
      `Student ${profileData.fullName || 'Pravin Yadav'} logged into LMS Session.`
    );

    // Track study minutes incrementally
    const interval = setInterval(() => {
      pbsAdminStore.recordStudentActiveTime(sId, activeCourseId, 1);
    }, 60000);

    return () => clearInterval(interval);
  }, [profileData.studentId, activeCourseId]);

  // Dynamically resolve student profile from database
  useEffect(() => {
    const syncStudentData = () => {
      const studentQuery = user?.email || user?.studentId || user?.rollNumber || user?.id || studentAuthUtil.getActiveUser()?.email;
      const match = studentQuery ? pbsAdminStore.getStudentByQuery(studentQuery) : null;

      if (match) {
        setProfileData(prev => ({
          ...prev,
          studentId: match.studentId || prev.studentId,
          rollNumber: match.rollNumber || prev.rollNumber,
          fullName: match.name || prev.fullName,
          email: match.email || prev.email,
          phone: match.phone || prev.phone,
          googleEmailId: match.googleEmailId || prev.googleEmailId,
          avatarUrl: match.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(match.name)}`,
          currentCompanyRole: match.specialization || prev.currentCompanyRole,
          specializationTrack: match.specialization || prev.specializationTrack,
          targetCareerRole: match.placement?.targetRole || prev.targetCareerRole,
          expectedSalary: match.placement?.expectedSalary || prev.expectedSalary,
          bio: `Enrolled BIM student in ${match.specialization || 'Revit MEP'} cohort with ${match.attendancePercent || 92}% verified attendance record.`
        }));

        if (match.growthScore) {
          setStudentXp(match.growthScore);
        }

        // Map dynamic courses
        const allCatalogCourses = pbsAdminStore.getCourses();
        const matchingCatalogCourses = allCatalogCourses.filter(c => 
          match.enrolledCourseIds?.includes(c.id) || 
          (match.specialization && c.title.toLowerCase().includes(match.specialization.toLowerCase()))
        );

        if (matchingCatalogCourses.length > 0) {
          const dynamicEnrolled: EnrolledCourseItem[] = matchingCatalogCourses.map((c, idx) => ({
            id: `enr-dyn-${idx}`,
            courseId: c.id,
            courseTitle: c.title,
            category: c.category || 'Revit',
            level: 'Cohort Core Track',
            badge: idx === 0 ? 'Primary Specialization' : 'Elective Track',
            batchMode: match.batch || 'Offline Weekend (Sat-Sun, 4 hrs/day)',
            batchSchedule: 'Saturdays & Sundays (06:00 PM - 09:30 PM IST)',
            progressPercent: 0,
            completedModules: 0,
            totalModules: c.modules?.length || 10,
            enrolledDate: 'Sept 2026',
            status: 'Active',
            instructor: 'Pravin Yadav (15+ Yrs Industry Exp)',
            totalFee: match.totalFee ?? 14999,
            paidAmount: match.paidAmount ?? 7500,
            pendingBalance: match.pendingBalance ?? 7499,
            certificateEarned: match.capstoneStatus === 'Approved & Certified',
            image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=80',
            accentColor: '#10b981'
          }));
          setEnrolledCourses(dynamicEnrolled);
          setActiveCourseId(matchingCatalogCourses[0].id);
        } else {
          setEnrolledCourses(prev => prev.map((c, i) => i === 0 ? {
            ...c,
            courseTitle: match.specialization || c.courseTitle,
            totalFee: match.totalFee ?? c.totalFee,
            paidAmount: match.paidAmount ?? c.paidAmount,
            pendingBalance: match.pendingBalance ?? c.pendingBalance,
            progressPercent: 0,
            completedModules: 0,
            certificateEarned: false,
            status: 'Active'
          } : {
            ...c,
            progressPercent: 0,
            completedModules: 0,
            certificateEarned: false,
            status: 'Active'
          }));
        }

        // Generate dynamic fee receipt if none exist
        setFeeReceipts(prev => {
          if (prev.length > 0) return prev;
          if (match.paidAmount > 0) {
            return [
              {
                receiptId: `PBS-REC-${(match.studentId || '2026').replace('PBS-STU-', '')}-01`,
                invoiceNumber: `INV/PBS/2026-27/0${(match.rollNumber || '8492').slice(-3)}`,
                courseId: match.enrolledCourseIds?.[0] || 'revit-mep-pro',
                courseTitle: match.specialization || 'Autodesk Revit MEP Masterclass (LOD 300 - 500)',
                amount: match.paidAmount || 0,
                paymentMethod: 'Instant NetBanking / UPI Verified',
                transactionId: `UPI/PBS/${(match.rollNumber || '8492').replace(/[^a-zA-Z0-9]/g, '')}/TXN99`,
                date: 'Aug 2026',
                paymentType: (match.pendingBalance ?? 0) === 0 ? 'Full Payment' : 'Installment #1',
                status: 'Paid',
                taxGst: Math.round((match.paidAmount || 0) * 0.18),
                downloadUrl: '#'
              }
            ];
          }
          return prev;
        });
      } else if (user?.name) {
        setProfileData(prev => ({
          ...prev,
          fullName: user.name,
          email: user.email || prev.email,
          studentId: user.studentId || prev.studentId,
          rollNumber: user.rollNumber || prev.rollNumber,
          phone: user.phone || prev.phone,
          googleEmailId: user.googleEmailId || prev.googleEmailId,
          avatarUrl: user.avatar || prev.avatarUrl
        }));
      }
    };

    syncStudentData();

    window.addEventListener('pbs_store_updated', syncStudentData);
    window.addEventListener('storage', syncStudentData);
    document.addEventListener('visibilitychange', syncStudentData);

    return () => {
      window.removeEventListener('pbs_store_updated', syncStudentData);
      window.removeEventListener('storage', syncStudentData);
      document.removeEventListener('visibilitychange', syncStudentData);
    };
  }, [user]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 2, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const userName = profileData.fullName || user?.name || 'Student';
  const userAvatar = profileData.avatarUrl || user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(userName)}`;

  const handleExportStudentJSON = () => {
    soundFx.playClick();
    const jsonStr = pbsAdminStore.exportStudentDossierJSON(profileData.studentId || profileData.email) || JSON.stringify({ student: profileData }, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `PBS_Student_Academic_Dossier_${(profileData.fullName || 'Student').replace(/\s+/g, '_')}_${profileData.studentId || 'ID'}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    soundFx.playSuccess();
    setNotificationAlert(`Academic Dossier (.json) downloaded for ${profileData.fullName}!`);
    setTimeout(() => setNotificationAlert(null), 5000);
  };

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundFx.enabled = next;
    if (next) soundFx.playClick();
  };

  const handleTabSwitch = (tab: DashboardTabType) => {
    soundFx.playClick();
    setActiveTab(tab);
  };

  // Handle payment receipt & balance settlement
  const handlePaymentSuccess = (paidAmount: number, newReceipt: FeeReceiptItem) => {
    soundFx.playLevelUp();
    setFeeReceipts(prev => [newReceipt, ...prev]);

    setEnrolledCourses(prev => prev.map(course => {
      if (course.courseId === newReceipt.courseId) {
        const newPaid = course.paidAmount + paidAmount;
        const newPending = Math.max(0, course.totalFee - newPaid);
        return {
          ...course,
          paidAmount: newPaid,
          pendingBalance: newPending,
          status: newPending === 0 ? 'Active' : course.status
        };
      }
      return course;
    }));

    // Record fee payment in central admin store if this is a logged in student
    if (profileData.studentId) {
      pbsAdminStore.recordFeePayment(profileData.studentId, paidAmount);
    }

    setNotificationAlert(`Payment of ₹${paidAmount.toLocaleString('en-IN')} successfully verified! Receipt: ${newReceipt.receiptId}`);
    setTimeout(() => setNotificationAlert(null), 5000);
  };

  const handleOpenPayModal = (title: string, courseId: string, balance: number) => {
    soundFx.playClick();
    setPayFeeTarget({ title, courseId, balance });
    setShowPayFeeModal(true);
  };

  const handleDownloadAsset = (asset: DownloadableAsset) => {
    soundFx.playClick();
    const blob = new Blob([
      `PRAGMATIC BIM SOLUTION - STUDENT RESOURCE FILE\n\nTitle: ${asset.title}\nFormat: ${asset.fileFormat}\nSize: ${asset.fileSize}\nVersion: ${asset.version}\nStudent: ${profileData.fullName} (${profileData.studentId})\n\nResource Description:\n${asset.description}\n\nDownloaded from PBS Student LMS Vault.`
    ], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${asset.title.replace(/[^a-zA-Z0-9]/g, '_')}.${asset.fileFormat}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setNotificationAlert(`Downloaded: ${asset.title}`);
    setTimeout(() => setNotificationAlert(null), 4000);
  };

  const handleDownloadSyllabus = (courseTitle: string) => {
    soundFx.playClick();
    const blob = new Blob([
      `PRAGMATIC BIM SOLUTION - COMPLETE SYLLABUS & MODULE BLUEPRINT\n\nCourse: ${courseTitle}\nAccreditation: ISO 19650 BIM Information Management\nDirector & Head Instructor: Pravin Yadav\n\nModule Breakdown:\n1. 3D Parametric Modeling (LOD 300 - 500)\n2. Navisworks Clash Detection & Coordination Matrix\n3. Dynamo Visual Scripting & Computational Automation\n4. ISO 19650 CDE & BIM Execution Plan (BEP)\n5. 4D Time Scheduling & 5D Cost Takeoffs\n\nFor queries, contact academic@pragmaticbim.com`
    ], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${courseTitle.replace(/[^a-zA-Z0-9]/g, '_')}_Syllabus.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setNotificationAlert(`Syllabus downloaded for ${courseTitle}`);
    setTimeout(() => setNotificationAlert(null), 4000);
  };

  return (
    <div id="pbs-student-dashboard" className="min-h-screen bg-[#FDFCFE] text-slate-900 font-sans flex flex-col antialiased selection:bg-emerald-500 selection:text-white">
      
      {/* Top Banner Notification Alert */}
      <AnimatePresence>
        {notificationAlert && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-emerald-600 text-white px-4 py-2.5 text-xs font-bold flex items-center justify-between z-50 sticky top-0 shadow-md"
          >
            <div className="flex items-center gap-2 max-w-7xl mx-auto w-full">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{notificationAlert}</span>
            </div>
            <button onClick={() => setNotificationAlert(null)} className="text-white hover:text-emerald-200 cursor-pointer">✕</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Header & Live Academic Bar */}
      <header className="bg-white/85 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-40 shadow-sm transition-all duration-300">
        
        {/* Sub-header: Live Countdown, Streak & Quick Tools Bar */}
        <div className="bg-slate-900 text-white px-4 sm:px-8 py-2 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          
          {/* Left: Next Live Class Pulsating Indicator */}
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 font-bold text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="tracking-wide uppercase text-[10px]">Next Live Studio:</span>
            </span>
            <span className="font-mono font-bold bg-slate-800 px-2 py-0.5 rounded text-emerald-300">
              {String(countdown.hours).padStart(2, '0')}h : {String(countdown.minutes).padStart(2, '0')}m : {String(countdown.seconds).padStart(2, '0')}s
            </span>
            <span className="hidden md:inline text-slate-400 text-[11px]">
              • Topic: <strong className="text-white">LOD 400 Chilled Water Plant Room & Dynamo Scripting</strong> (with Pravin Yadav)
            </span>
          </div>

          {/* Right: Gamification Badges & Tools */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Streak Trigger */}
            <button
              onClick={() => {
                soundFx.playClick();
                setShowStudyTimerModal(true);
              }}
              className="flex items-center gap-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 px-2.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer group"
              title="Open Focus Study Timer & Claim Daily Streak XP"
            >
              <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400 group-hover:scale-110 transition-transform" />
              <span>{streakCount} Days Streak</span>
            </button>

            {/* XP Progress Bar */}
            <div className="hidden sm:flex items-center gap-2 bg-slate-800/80 px-2.5 py-1 rounded-full border border-slate-700">
              <Sparkles className="w-3 h-3 text-emerald-400" />
              <span className="text-[11px] font-bold text-slate-300">Lvl 4 Specialist</span>
              <div className="w-16 bg-slate-700 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full"
                  style={{ width: `${(studentXp / 5000) * 100}%` }}
                />
              </div>
              <span className="font-mono text-[10px] text-emerald-400 font-bold">{studentXp} XP</span>
            </div>

            {/* Sound FX Toggle */}
            <button
              onClick={toggleSound}
              className="p-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title={soundEnabled ? 'Disable UI Sound Effects' : 'Enable UI Sound Effects'}
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-emerald-400" /> : <VolumeX className="w-3.5 h-3.5 text-slate-500" />}
            </button>
          </div>
        </div>

        {/* Main Branding & Navigation Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
            
            {/* Left: PBS Logo */}
            <div className="flex items-center gap-4 sm:gap-6">
              <div 
                onClick={onBackToHome}
                className="flex items-center gap-2 cursor-pointer group"
                title="Pragmatic BIM Solution Academic Portal"
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-black text-lg tracking-tight shadow-[0_0_15px_rgba(16,185,129,0.3)] border border-emerald-400/30 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.5)] group-hover:scale-105 transition-all font-display">
                  PBS
                </div>
                <div>
                  <div className="flex items-center gap-1.5 font-display">
                    <span className="font-extrabold text-sm sm:text-lg tracking-tight text-slate-900">PRAGMATIC</span>
                    <span className="font-black text-sm sm:text-lg tracking-tight text-emerald-600">BIM</span>
                    <span className="bg-emerald-100/80 text-emerald-800 border border-emerald-200/50 text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest hidden sm:inline ml-1 font-sans shadow-sm">
                      LMS Portal
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 block -mt-0.5 font-semibold uppercase tracking-wider font-sans">
                    ISO 19650 Accredited Hub
                  </span>
                </div>
              </div>
            </div>

            {/* Center / Right: Interactive Quick Studio Tools */}
            <div className="flex items-center gap-2 sm:gap-3">
              
              {/* Shareable BIM Portfolio Trigger */}
              <button
                id="btn-open-portfolio"
                onClick={() => {
                  soundFx.playClick();
                  setPortfolioModalMode('edit');
                  setShowPortfolioModal(true);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all cursor-pointer shadow-md hover:scale-102"
                title="Manage and Share your verified Public BIM Portfolio URL"
              >
                <Sparkles className="w-3.5 h-3.5 text-indigo-200" />
                <span className="hidden sm:inline">My Portfolio</span>
              </button>


              {/* BIM AI Co-Pilot Trigger */}
              <button
                id="btn-open-ai-copilot"
                onClick={() => {
                  soundFx.playClick();
                  setShowAiCopilotDrawer(true);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold transition-all cursor-pointer shadow-md hover:scale-102"
                title="Open AI Academic BIM Assistant"
              >
                <Bot className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">BIM Co-Pilot</span>
              </button>

              {/* Submit Assignment Trigger */}
              <button
                id="btn-submit-task"
                onClick={() => {
                  soundFx.playClick();
                  setShowTaskSubmissionModal(true);
                }}
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold transition-all cursor-pointer shadow-2xs"
                title="Submit Assignment for Pre-flight Audit"
              >
                <UploadCloud className="w-3.5 h-3.5 text-emerald-600" />
                <span>Submit Task</span>
              </button>

              {/* Excel Master Registry Button */}
              <button
                id="btn-open-excel-registry"
                onClick={() => {
                  soundFx.playClick();
                  setShowExcelRegistryModal(true);
                }}
                className="hidden lg:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all cursor-pointer border border-slate-200 shadow-2xs"
                title="View & Download PBS Student Excel Registry (.CSV)"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                <span>Excel Data</span>
              </button>

              {/* Video Classroom */}
              <button
                id="btn-open-classroom-studio"
                onClick={() => {
                  soundFx.playClick();
                  setShowClassroomModal(true);
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-all duration-200 cursor-pointer shadow-sm hover:shadow"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Classroom</span>
              </button>

              {/* User Dropdown with Multi-Student Switcher */}
              <div className="relative">
                <button
                  id="user-profile-toggle"
                  onClick={() => {
                    soundFx.playClick();
                    setShowUserDropdown(!showUserDropdown);
                  }}
                  className="flex items-center gap-2 p-1.5 pl-2.5 pr-2 rounded-2xl hover:bg-slate-100 transition-colors cursor-pointer border border-slate-200 bg-slate-50/80 shadow-2xs"
                >
                  <div className="text-left hidden sm:block">
                    <span className="text-xs font-extrabold text-slate-800 block leading-tight">{userName}</span>
                    <span className="text-[10px] text-emerald-700 font-bold block">{profileData.studentId}</span>
                  </div>
                  <div className="w-8 h-8 rounded-xl overflow-hidden bg-emerald-600 text-white flex items-center justify-center font-bold text-xs border border-emerald-300 shadow-inner">
                    <img 
                      src={userAvatar} 
                      alt={userName} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                <AnimatePresence>
                  {showUserDropdown && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 10 }}
                      className="absolute right-0 mt-2 w-72 bg-white border border-slate-200 rounded-3xl shadow-2xl py-3 z-50 text-xs"
                    >
                      <div className="px-5 py-3 border-b border-slate-100 space-y-1 bg-slate-50/60 rounded-t-3xl">
                        <div className="flex items-center justify-between">
                          <p className="font-extrabold text-sm text-slate-900">{userName}</p>
                          <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[10px]">
                            Student Portal
                          </span>
                        </div>
                        <p className="text-emerald-800 font-mono text-[11px] font-bold">{profileData.email || 'pravin.yadav@pbs.com'}</p>
                        <p className="text-slate-500 text-[10px] font-mono">{profileData.studentId} • {profileData.rollNumber}</p>
                        <p className="text-[11px] text-emerald-700 font-semibold">{profileData.specializationTrack}</p>
                      </div>

                      <div className="py-1">
                        {/* Shareable Public BIM Portfolio */}
                        <button
                          onClick={() => {
                            setShowUserDropdown(false);
                            setPortfolioModalMode('edit');
                            setShowPortfolioModal(true);
                          }}
                          className="w-full px-5 py-2 text-left text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 flex items-center gap-2.5 cursor-pointer font-semibold"
                        >
                          <Sparkles className="w-4 h-4 text-indigo-600" />
                          <span>My Public BIM Portfolio (Share Link)</span>
                        </button>

                        {/* Change Password Modal Trigger */}
                        <button
                          onClick={() => {
                            setShowUserDropdown(false);
                            setShowChangePasswordModal(true);
                          }}
                          className="w-full px-5 py-2 text-left text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 flex items-center gap-2.5 cursor-pointer font-semibold"
                        >
                          <KeyRound className="w-4 h-4 text-emerald-600" />
                          <span>Change Password & Security</span>
                        </button>

                        {/* Excel Student Database */}
                        <button
                          onClick={() => {
                            setShowUserDropdown(false);
                            setShowExcelRegistryModal(true);
                          }}
                          className="w-full px-5 py-2 text-left text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 flex items-center gap-2.5 cursor-pointer font-semibold"
                        >
                          <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                          <span>Student Excel Registry (.csv)</span>
                        </button>

                        <button
                          onClick={() => {
                            setShowUserDropdown(false);
                            setShowProfileModal(true);
                          }}
                          className="w-full px-5 py-2 text-left text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 flex items-center gap-2.5 cursor-pointer font-semibold"
                        >
                          <Sliders className="w-4 h-4 text-emerald-600" />
                          <span>Profile & Academic Settings</span>
                        </button>

                        <button
                          onClick={() => {
                            setShowUserDropdown(false);
                            setShowStudentIDCardModal(true);
                          }}
                          className="w-full px-5 py-2 text-left text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 flex items-center gap-2.5 cursor-pointer font-semibold"
                        >
                          <UserCheck className="w-4 h-4 text-emerald-600" />
                          <span>Digital Student ID Card</span>
                        </button>

                        <button
                          onClick={() => {
                            setShowUserDropdown(false);
                            setShowBonafideModal(true);
                          }}
                          className="w-full px-5 py-2 text-left text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 flex items-center gap-2.5 cursor-pointer font-semibold"
                        >
                          <FileText className="w-4 h-4 text-emerald-600" />
                          <span>Bonafide Certificate Letter</span>
                        </button>

                        <button
                          onClick={() => {
                            setShowUserDropdown(false);
                            setShowCertificateModal(true);
                          }}
                          className="w-full px-5 py-2 text-left text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 flex items-center gap-2.5 cursor-pointer font-semibold"
                        >
                          <Award className="w-4 h-4 text-emerald-600" />
                          <span>Official Course Certificate</span>
                        </button>

                        <button
                          onClick={() => {
                            setShowUserDropdown(false);
                            setShowLeaderboardModal(true);
                          }}
                          className="w-full px-5 py-2 text-left text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 flex items-center gap-2.5 cursor-pointer font-semibold"
                        >
                          <Sparkles className="w-4 h-4 text-emerald-600" />
                          <span>Cohort Leaderboard</span>
                        </button>
                      </div>

                      <div className="border-t border-slate-100 my-1"></div>

                      {onLogout && (
                        <button
                          onClick={() => {
                            setShowUserDropdown(false);
                            onLogout();
                          }}
                          className="w-full px-5 py-2 text-left text-rose-600 hover:bg-rose-50 flex items-center gap-2 font-semibold cursor-pointer"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Navigation 7 Rich Tabs Bar with Animated Layout Motion Indicator */}
          <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar pt-1 border-t border-slate-100">
            {[
              { id: 'course_overview', label: 'COURSE OVERVIEW', icon: LayoutDashboard },
              { id: 'enrolled_courses', label: `ENROLLED COURSES (${enrolledCourses.length})`, icon: BookOpen },
              { id: 'fee_financials', label: 'FEES & INVOICES', icon: CreditCard },
              { id: 'downloads_vault', label: `DOWNLOADS VAULT (${downloadableAssets.length})`, icon: FolderArchive },
              { id: 'live_learning', label: 'LIVE SESSIONS', icon: Calendar },
              { id: 'capstone_project', label: 'CAPSTONE PROJECT', icon: Layers },
              { id: 'reports_feedback', label: 'FEEDBACK & REVIEWS', icon: FileText },
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`tab-${tab.id}`}
                  onClick={() => handleTabSwitch(tab.id as DashboardTabType)}
                  className={`pb-3.5 pt-2 px-2.5 text-xs font-extrabold tracking-wider uppercase whitespace-nowrap cursor-pointer relative flex items-center gap-1.5 transition-colors ${
                    isActive ? 'text-emerald-700' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTabUnderline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main Content Area with Motion Fade Transitions */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16">
        
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {/* TAB 1: Course Overview */}
            {activeTab === 'course_overview' && (
              <CourseOverviewTab
                onOpenCohortLeaderboard={() => setShowLeaderboardModal(true)}
                onOpenVideoClassroom={() => setShowClassroomModal(true)}
                onOpenCodeOfConduct={() => setShowCodeOfConductModal(true)}
                onOpenCertificate={() => setShowCertificateModal(true)}
                onOpenFaq={() => setPolicyModalType('faq')}
                onOpenPlacementPolicy={() => setPolicyModalType('placement')}
                onOpenCertificationPolicy={() => setPolicyModalType('certification')}
                onOpenPortfolio={() => {
                  setPortfolioModalMode('edit');
                  setShowPortfolioModal(true);
                }}
                onOpenMcqExam={() => {
                  setSelectedCourseForMcq({
                    id: activeCourseId || 'c1',
                    title: enrolledCourses.find(c => c.courseId === activeCourseId)?.courseTitle || 'Advanced BIM Coordination & Clash Detection'
                  });
                  setShowCourseMcqModal(true);
                }}
              />
            )}

            {/* TAB 2: Enrolled Courses */}
            {activeTab === 'enrolled_courses' && (
              <EnrolledCoursesTab
                enrolledCourses={enrolledCourses}
                activeCourseId={activeCourseId}
                onSelectActiveCourse={(id) => {
                  soundFx.playClick();
                  setActiveCourseId(id);
                  setNotificationAlert(`Switched active workspace to: ${enrolledCourses.find(c => c.courseId === id)?.courseTitle}`);
                  setTimeout(() => setNotificationAlert(null), 4000);
                }}
                onOpenVideoClassroom={() => setShowClassroomModal(true)}
                onOpenCertificateModal={() => setShowCertificateModal(true)}
                onOpenFeeTab={() => setActiveTab('fee_financials')}
                onOpenDownloadSyllabus={handleDownloadSyllabus}
                onOpenUpiEnrollModal={(course) => {
                  soundFx.playClick();
                  setSelectedCourseForUpiEnroll(course);
                  setShowCourseUpiEnrollModal(true);
                }}
              />
            )}

            {/* TAB 3: Fees & Invoices */}
            {activeTab === 'fee_financials' && (
              <FeeFinancialsTab
                enrolledCourses={enrolledCourses}
                feeReceipts={feeReceipts}
                onOpenPayFeeModal={handleOpenPayModal}
              />
            )}

            {/* TAB 4: Downloads Vault */}
            {activeTab === 'downloads_vault' && (
              <DownloadsVaultTab
                assets={downloadableAssets}
                onDownloadAsset={handleDownloadAsset}
              />
            )}

            {/* TAB 5: Live Learning */}
            {activeTab === 'live_learning' && (
              <LiveLearningTab
                onSelectSession={(session) => {
                  soundFx.playClick();
                  setSelectedLiveSession(session);
                }}
              />
            )}

            {/* TAB 6: Capstone Project */}
            {activeTab === 'capstone_project' && (
              <CapstoneProjectTab />
            )}

            {/* TAB 7: Reports & Feedback */}
            {activeTab === 'reports_feedback' && (
              <ReportsFeedbackTab />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Profile Settings Modal */}
      <ProfileSettingsModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        profileData={profileData}
        onSaveProfile={(updated) => {
          soundFx.playSuccess();
          setProfileData(updated);
          // Sync with student store & current user
          if (updated.studentId) {
            pbsAdminStore.updateStudent(updated.studentId, {
              name: updated.fullName,
              email: updated.email,
              phone: updated.phone,
              avatar: updated.avatarUrl,
              googleEmailId: updated.googleEmailId
            });
            studentAuthUtil.updateCurrentUser({
              name: updated.fullName,
              email: updated.email,
              phone: updated.phone,
              avatar: updated.avatarUrl,
              googleEmailId: updated.googleEmailId
            });
          }
        }}
        onOpenStudentIDCard={() => {
          setShowProfileModal(false);
          setShowStudentIDCardModal(true);
        }}
        onOpenBonafideLetter={() => {
          setShowProfileModal(false);
          setShowBonafideModal(true);
        }}
      />

      {/* Digital Student ID Card Modal */}
      <StudentIDCardModal
        isOpen={showStudentIDCardModal}
        onClose={() => setShowStudentIDCardModal(false)}
        profileData={profileData}
      />

      {/* Bonafide Certificate Modal */}
      <BonafideLetterModal
        isOpen={showBonafideModal}
        onClose={() => setShowBonafideModal(false)}
        profileData={profileData}
      />

      {/* Pay Fee Balance Modal */}
      <PayFeeModal
        isOpen={showPayFeeModal}
        onClose={() => setShowPayFeeModal(false)}
        courseTitle={payFeeTarget.title}
        courseId={payFeeTarget.courseId}
        pendingBalance={payFeeTarget.balance}
        onPaymentSuccess={handlePaymentSuccess}
      />

      {/* Interactive 3D BIM Model Inspector Modal */}
      {show3dModelModal && (
        <Bim3DModelViewerModal onClose={() => setShow3dModelModal(false)} />
      )}

      {/* Focus Study Timer & Pomodoro Modal */}
      {showStudyTimerModal && (
        <BimStudyTimerModal
          onClose={() => setShowStudyTimerModal(false)}
          streakCount={streakCount}
          onClaimDailyXp={(xp) => setStudentXp(prev => prev + xp)}
        />
      )}

      {/* AI BIM Co-Pilot Drawer */}
      <BimAiCopilotDrawer
        isOpen={showAiCopilotDrawer}
        onClose={() => setShowAiCopilotDrawer(false)}
        studentName={userName}
      />

      {/* Task Submission Modal */}
      {showTaskSubmissionModal && (
        <TaskSubmissionModal
          onClose={() => setShowTaskSubmissionModal(false)}
          onSubmitSuccess={(taskData) => {
            setStudentXp(prev => prev + 250);
            setNotificationAlert(`Task evaluated: ${taskData.taskName} (Score: ${taskData.score}/100) • +250 XP`);
            setTimeout(() => setNotificationAlert(null), 5000);
          }}
        />
      )}

      {/* Change Password Modal */}
      {showChangePasswordModal && (
        <ChangePasswordModal
          isOpen={showChangePasswordModal}
          onClose={() => setShowChangePasswordModal(false)}
          onPasswordChanged={() => {
            setNotificationAlert('Your password has been successfully updated and saved!');
            setTimeout(() => setNotificationAlert(null), 4000);
          }}
        />
      )}

      {/* Student Excel Registry Modal */}
      {showExcelRegistryModal && (
        <StudentExcelRegistryModal
          isOpen={showExcelRegistryModal}
          onClose={() => setShowExcelRegistryModal(false)}
        />
      )}

      {/* Supporting Interactive Modals */}
      {showClassroomModal && (
        <ClassroomVideoModal 
          onClose={() => setShowClassroomModal(false)} 
          initialCourseId={activeCourseId}
          studentProfile={profileData}
          onOpenMcqExam={() => {
            setShowClassroomModal(false);
            setSelectedCourseForMcq({
              id: activeCourseId || 'c1',
              title: enrolledCourses.find(c => c.courseId === activeCourseId)?.courseTitle || 'Advanced BIM Coordination & Clash Detection'
            });
            setShowCourseMcqModal(true);
          }}
        />
      )}

      {showLeaderboardModal && (
        <CohortLeaderboardModal onClose={() => setShowLeaderboardModal(false)} />
      )}

      {showCareerGoalModal && (
        <CareerGoalModal onClose={() => setShowCareerGoalModal(false)} />
      )}

      {showCodeOfConductModal && (
        <CodeOfConductModal onClose={() => setShowCodeOfConductModal(false)} />
      )}

      {showCertificateModal && (
        <CertificateGeneratorModal 
          userName={userName}
          onClose={() => setShowCertificateModal(false)}
          courseId={activeCourseId || 'c1'}
          studentId={profileData.studentId}
          onOpenMcqExam={() => {
            setShowCertificateModal(false);
            setSelectedCourseForMcq({
              id: activeCourseId || 'c1',
              title: enrolledCourses.find(c => c.courseId === activeCourseId)?.courseTitle || 'Advanced BIM Coordination & Clash Detection'
            });
            setShowCourseMcqModal(true);
          }}
          onOpenTaskModal={() => {
            setShowCertificateModal(false);
            setShowTaskSubmissionModal(true);
          }}
        />
      )}

      {/* Shareable Student BIM Portfolio Modal */}
      {showPortfolioModal && (
        <StudentPortfolioModal
          studentId={profileData.studentId || 'PBS-STU-2026-8492'}
          studentName={profileData.fullName || 'Pravin Yadav'}
          mode={portfolioModalMode}
          onClose={() => setShowPortfolioModal(false)}
        />
      )}

      {/* Course MCQ Final Certification Exam Modal */}
      {showCourseMcqModal && (
        <CourseMcqModal
          courseId={selectedCourseForMcq.id}
          courseTitle={selectedCourseForMcq.title}
          studentId={profileData.studentId || 'PBS-STU-2026-8492'}
          studentName={profileData.fullName || 'Pravin Yadav'}
          onClose={() => setShowCourseMcqModal(false)}
          onOpenCertificate={() => {
            setShowCourseMcqModal(false);
            setShowCertificateModal(true);
          }}
          onOpenClassroom={() => {
            setShowCourseMcqModal(false);
            setShowClassroomModal(true);
          }}
          onExamPassed={(_score) => {
            soundFx.playSuccess();
            setNotificationAlert('Congratulations! You passed the MCQ Exam. Your official certificate is now unlocked!');
            setTimeout(() => setNotificationAlert(null), 6000);
            setShowCertificateModal(true);
          }}
        />
      )}

      {policyModalType && (
        <PolicyModal
          type={policyModalType}
          onClose={() => setPolicyModalType(null)}
        />
      )}

      {selectedLiveSession && (
        <LiveSessionDetailModal
          session={selectedLiveSession}
          onClose={() => setSelectedLiveSession(null)}
          onOpenClassroom={() => {
            setSelectedLiveSession(null);
            setShowClassroomModal(true);
          }}
        />
      )}

      {showCourseUpiEnrollModal && (
        <CourseUpiEnrollModal
          isOpen={showCourseUpiEnrollModal}
          course={selectedCourseForUpiEnroll}
          currentUser={user}
          onClose={() => {
            setShowCourseUpiEnrollModal(false);
            setSelectedCourseForUpiEnroll(null);
          }}
          onEnrollmentSuccess={(_req) => {
            soundFx.playSuccess();
            setNotificationAlert(
              `Payment UTR submitted! Your enrollment request has been sent to Admin Pravin Yadav. Once verified within 24 hours, the course will automatically appear in your LMS.`
            );
            setTimeout(() => setNotificationAlert(null), 7000);
          }}
        />
      )}
    </div>
  );
};
