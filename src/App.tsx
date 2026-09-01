import React, { useState, useEffect } from 'react';
import { StudentDashboard } from './components/student-dashboard/StudentDashboard';
import { StudentLoginPortal } from './components/student-dashboard/StudentLoginPortal';
import { AdminPortal } from './components/admin-dashboard/AdminPortal';
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

  if (!isLoggedIn) {
    return <StudentLoginPortal onSuccessLogin={handleLoginSuccess} />;
  }

  // Render Admin Portal if signed in as Admin
  if (activeSessionUser?.role === 'admin') {
    return (
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
    );
  }

  // Render Student Dashboard if signed in as Student
  return (
    <div className="min-h-screen bg-[#FDFCFE] text-slate-900 font-sans antialiased selection:bg-emerald-500 selection:text-white">
      
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
    </div>
  );
}
