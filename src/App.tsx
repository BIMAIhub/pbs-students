import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { StudentDashboard } from './components/student-dashboard/StudentDashboard';
import { StudentLoginPortal } from './components/student-dashboard/StudentLoginPortal';
import { AdminPortal } from './components/admin-dashboard/AdminPortal';
import { PublicPortfolioPage } from './components/PublicPortfolioPage';
import { CourseRegistrationModal } from './components/CourseRegistrationModal';
import { Course, StudentRegistration, AuthUser } from './types';
import { PRELOADED_USERS } from './data/pbsData';
import { studentAuthUtil, ActiveSessionUser } from './utils/studentAuth';
import { CheckCircle2, X } from 'lucide-react';

export default function App() {
  // Authentication State
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => studentAuthUtil.isLoggedIn());
  const [activeSessionUser, setActiveSessionUser] = useState<ActiveSessionUser>(() => studentAuthUtil.getActiveUser());
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(PRELOADED_USERS[0]);

  // Standalone Public Portfolio Routing State
  const [publicPortfolioStudentId, setPublicPortfolioStudentId] = useState<string | null>(() => {
    try {
      const path = window.location.pathname;
      const search = new URLSearchParams(window.location.search);
      const hash = window.location.hash;

      // 1. Path format: /portfolio/pbs-stu-2026-8492
      if (path.startsWith('/portfolio/')) {
        const id = path.replace('/portfolio/', '').trim();
        if (id) return id;
      }
      if (path === '/portfolio') {
        return 'PBS-STU-2026-8492';
      }

      // 2. Query param format: ?portfolio=pbs-stu-2026-8492
      if (search.get('portfolio')) {
        return search.get('portfolio');
      }

      // 3. Hash format: #/portfolio/pbs-stu-2026-8492
      if (hash.includes('/portfolio/')) {
        const id = hash.split('/portfolio/')[1]?.trim();
        if (id) return id;
      }
      if (hash === '#/portfolio') {
        return 'PBS-STU-2026-8492';
      }
    } catch {}
    return null;
  });

  // Modal states
  const [registerCourse, setRegisterCourse] = useState<Course | null>(null);
  const [selectedCouponCode, setSelectedCouponCode] = useState<string | null>('BIMPRO2026');
  const [showRegisterModal, setShowRegisterModal] = useState<boolean>(false);
  const [brochureCourse, setBrochureCourse] = useState<Course | null>(null);

  const handleSuccessRegistration = (_newReg: StudentRegistration) => {
    // Registered
  };

  const handleLogout = () => {
    studentAuthUtil.setLoggedIn(false);
    setIsLoggedIn(false);
  };

  const handleLoginSuccess = (user: ActiveSessionUser) => {
    studentAuthUtil.setLoggedIn(true);
    setActiveSessionUser(user);
    setIsLoggedIn(true);
  };

  useEffect(() => {
    const handleUrlChange = () => {
      try {
        const path = window.location.pathname;
        const search = new URLSearchParams(window.location.search);
        const hash = window.location.hash;

        if (path.startsWith('/portfolio/')) {
          const id = path.replace('/portfolio/', '').trim();
          if (id) {
            setPublicPortfolioStudentId(id);
            return;
          }
        }
        if (path === '/portfolio') {
          setPublicPortfolioStudentId('PBS-STU-2026-8492');
          return;
        }

        if (search.get('portfolio')) {
          setPublicPortfolioStudentId(search.get('portfolio'));
          return;
        }

        if (hash.includes('/portfolio/')) {
          const id = hash.split('/portfolio/')[1]?.trim();
          if (id) {
            setPublicPortfolioStudentId(id);
            return;
          }
        }
        if (hash === '#/portfolio') {
          setPublicPortfolioStudentId('PBS-STU-2026-8492');
          return;
        }

        // If not on portfolio URL, clear state
        if (!path.startsWith('/portfolio') && !search.get('portfolio') && !hash.includes('/portfolio')) {
          setPublicPortfolioStudentId(null);
        }
      } catch {}
    };

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);

    const checkAuthStatus = () => {
      const isActuallyLoggedIn = studentAuthUtil.isLoggedIn();
      
      if (!isActuallyLoggedIn && isLoggedIn) {
        setIsLoggedIn(false);
      } else if (isActuallyLoggedIn && !isLoggedIn) {
        setIsLoggedIn(true);
        setActiveSessionUser(studentAuthUtil.getActiveUser());
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        checkAuthStatus();
      }
    };

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'pbs_is_logged_in_state') {
        checkAuthStatus();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('storage', handleStorageChange);
    
    checkAuthStatus();

    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [isLoggedIn]);

  // 1. If viewing a Standalone Public Portfolio URL (No login required)
  if (publicPortfolioStudentId) {
    return (
      <PublicPortfolioPage
        studentId={publicPortfolioStudentId}
        onNavigateHome={() => {
          // Clear query/path and return to app home
          try {
            window.history.pushState({}, '', '/');
          } catch {}
          setPublicPortfolioStudentId(null);
        }}
      />
    );
  }

  return (
    <AnimatePresence mode="wait">
      {!isLoggedIn ? (
        <motion.div
          key="login"
          initial={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full"
        >
          <StudentLoginPortal onSuccessLogin={handleLoginSuccess} />
        </motion.div>
      ) : activeSessionUser?.role === 'admin' ? (
        <motion.div
          key="admin"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full"
        >
          <AdminPortal
            user={activeSessionUser}
            onLogout={handleLogout}
            onSwitchToStudentView={(student) => {
              if (student) {
                const stuUser: ActiveSessionUser = {
                  id: student.studentId || student.id,
                  studentId: student.studentId,
                  rollNumber: student.rollNumber,
                  name: student.name,
                  email: student.email,
                  role: 'student',
                  avatar: student.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(student.name)}`,
                  phone: student.phone,
                  specialization: student.specialization,
                  batch: student.batch
                };
                setActiveSessionUser(stuUser);
              } else {
                setActiveSessionUser({
                  id: 'user-student-pravin',
                  studentId: 'PBS-STU-2026-8492',
                  rollNumber: 'PBS/2026/BIM-084',
                  name: 'Pravin Yadav',
                  email: 'pravin.yadav@pbs.com',
                  role: 'student',
                  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
                  phone: '+91 8208918726'
                });
              }
            }}
          />
        </motion.div>
      ) : (
        <motion.div
          key="student"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="min-h-screen w-full bg-[#FDFCFE] text-slate-900 font-sans antialiased selection:bg-emerald-500 selection:text-white"
        >
          {/* Student Page Rendered Directly as the Primary View */}
          <StudentDashboard
            user={activeSessionUser}
            onLogout={handleLogout}
          />

          {/* Course Registration Modal */}
          {showRegisterModal && (
            <CourseRegistrationModal
              initialCourse={registerCourse}
              initialCouponCode={selectedCouponCode}
              currentUser={currentUser}
              onClose={() => {
                setShowRegisterModal(false);
                setRegisterCourse(null);
              }}
              onSuccessRegistration={handleSuccessRegistration}
            />
          )}

          {/* Download Toast Notification */}
          {brochureCourse && (
            <div className="fixed bottom-20 right-6 z-40 bg-white text-slate-900 p-4 rounded-2xl border-2 border-emerald-500 shadow-2xl flex items-center gap-3 animate-fadeIn max-w-sm">
              <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0 text-xs">
                <div className="font-bold text-emerald-700">Syllabus Download Started!</div>
                <div className="text-slate-600 truncate font-medium">{brochureCourse.title}</div>
              </div>
              <button
                onClick={() => setBrochureCourse(null)}
                className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
