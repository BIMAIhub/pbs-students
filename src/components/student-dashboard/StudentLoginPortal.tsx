import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  AlertCircle, 
  KeyRound, 
  ShieldCheck, 
  GraduationCap, 
  ArrowRight, 
  Sparkles,
  FileSpreadsheet,
  Shield,
  Search,
  UserCheck,
  BookOpen,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  PhoneCall
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { studentAuthUtil, ActiveSessionUser } from '../../utils/studentAuth';
import { pbsAdminStore, ManagedStudent, AdminCourse } from '../../utils/pbsAdminStore';
import { soundFx } from '../../utils/soundEffects';
import { ChangePasswordModal } from './ChangePasswordModal';
import { StudentExcelRegistryModal } from './StudentExcelRegistryModal';
import { CheckEnrollmentModal } from './CheckEnrollmentModal';
import { CourseUpiEnrollModal } from './CourseUpiEnrollModal';

interface StudentLoginPortalProps {
  onSuccessLogin: (user: ActiveSessionUser) => void;
}

export const StudentLoginPortal: React.FC<StudentLoginPortalProps> = ({
  onSuccessLogin
}) => {
  const [selectedRole, setSelectedRole] = useState<'student' | 'admin'>('student');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showChangePwdModal, setShowChangePwdModal] = useState(false);
  const [showExcelModal, setShowExcelModal] = useState(false);
  const [showCheckEnrollmentModal, setShowCheckEnrollmentModal] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [selectedCourseForApply, setSelectedCourseForApply] = useState<AdminCourse | null>(null);
  const [showEnrolledDirectory, setShowEnrolledDirectory] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [enrolledStudents, setEnrolledStudents] = useState<ManagedStudent[]>([]);

  useEffect(() => {
    const students = pbsAdminStore.getStudents();
    setEnrolledStudents(students);
  }, []);

  const handleSwitchToStudent = () => {
    soundFx.playClick();
    setSelectedRole('student');
    setEmailInput('');
    setPasswordInput('');
    setErrorMsg(null);
  };

  const handleSwitchToAdmin = () => {
    soundFx.playClick();
    setSelectedRole('admin');
    setEmailInput('');
    setPasswordInput('');
    setErrorMsg(null);
  };

  const handleSelectPreFill = (email: string, pwd?: string) => {
    soundFx.playClick();
    setEmailInput(email);
    setPasswordInput(pwd || 'pravinyadav@123');
    setErrorMsg(null);
    setToastMsg(`Filled credentials for ${email}`);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleOpenAdmission = () => {
    const courses = pbsAdminStore.getCourses();
    setSelectedCourseForApply(courses[0] || null);
    setShowApplyModal(true);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!emailInput.trim() || !passwordInput.trim()) {
      setErrorMsg('Please enter both your registered institutional email (or roll number) and password.');
      return;
    }

    setIsLoggingIn(true);

    try {
      const res = await studentAuthUtil.verifyCredentialsAsync(emailInput, passwordInput);
      setIsLoggingIn(false);

      if (res.success && res.user) {
        soundFx.playSuccess();
        studentAuthUtil.setLoggedIn(true);
        onSuccessLogin(res.user);
      } else {
        soundFx.playClick();
        setErrorMsg(res.message);
      }
    } catch (err: any) {
      setIsLoggingIn(false);
      setErrorMsg(err.message || 'Login verification failed');
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] flex flex-col justify-between antialiased selection:bg-emerald-500 selection:text-white p-4 sm:p-6 md:p-8 relative overflow-hidden font-sans">
      
      {/* Background Tech Orbs & Grid */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-600/10 rounded-full blur-[100px]"></div>
        <div className="absolute top-[40%] -right-40 w-96 h-96 bg-teal-600/10 rounded-full blur-[100px]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      <div className="relative z-10 w-full flex-1 flex flex-col justify-between">
      {/* Modals */}
      {showChangePwdModal && (
        <ChangePasswordModal
          isOpen={showChangePwdModal}
          onClose={() => setShowChangePwdModal(false)}
          onPasswordChanged={(newPwd) => {
            setPasswordInput(newPwd);
            setToastMsg('Password successfully updated! You can now sign in with your new password.');
            setTimeout(() => setToastMsg(null), 4000);
          }}
        />
      )}

      {showExcelModal && (
        <StudentExcelRegistryModal
          isOpen={showExcelModal}
          onClose={() => setShowExcelModal(false)}
        />
      )}

      {showCheckEnrollmentModal && (
        <CheckEnrollmentModal
          isOpen={showCheckEnrollmentModal}
          onClose={() => setShowCheckEnrollmentModal(false)}
          onSelectStudent={(s) => {
            setEmailInput(s.email);
            setPasswordInput('pravinyadav@123');
            setToastMsg(`Loaded verified student: ${s.name}`);
            setTimeout(() => setToastMsg(null), 3500);
          }}
          onOpenEnrollment={handleOpenAdmission}
        />
      )}

      {showApplyModal && selectedCourseForApply && (
        <CourseUpiEnrollModal
          course={selectedCourseForApply}
          isOpen={showApplyModal}
          onClose={() => setShowApplyModal(false)}
          currentUser={{
            fullName: emailInput.split('@')[0] || '',
            email: emailInput.includes('@') ? emailInput : '',
            phone: '+91 8208918726'
          }}
          onEnrollmentSuccess={(req) => {
            setToastMsg(`Enrollment request submitted for ${req.studentName}! Admin will approve shortly.`);
            setTimeout(() => setToastMsg(null), 6000);
          }}
        />
      )}

      {/* Top Brand Bar */}
      <header className="max-w-6xl mx-auto w-full flex items-center justify-between py-2">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white font-black text-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] border border-white/20 font-display tracking-tight">
            PBS
          </div>
          <div>
            <h1 className="font-display font-extrabold text-lg sm:text-xl tracking-tight text-white flex items-center gap-2">
              <span>Pragmatic BIM Solution</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-500/30 uppercase tracking-widest font-sans">
                Institutional LMS
              </span>
            </h1>
            <p className="text-[11px] text-slate-400 font-medium tracking-wide">ISO 19650 Certified Academic Portal • 2026 Batch</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowCheckEnrollmentModal(true)}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold transition-all cursor-pointer"
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Verify Enrollment</span>
            <span className="sm:hidden">Verify</span>
          </button>

          <button
            onClick={() => setShowExcelModal(true)}
            className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-bold transition-colors cursor-pointer"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
            <span>Excel Registry</span>
          </button>
        </div>
      </header>

      {/* Main Login Card Area */}
      <motion.main 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-md w-full mx-auto my-6"
      >
        
        {/* Toast Alert */}
        {toastMsg && (
          <div className="mb-4 p-3 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs rounded-2xl flex items-center gap-2 font-semibold animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{toastMsg}</span>
          </div>
        )}

        <div className="bg-white/95 backdrop-blur-xl text-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100/20 space-y-6">
          
          {/* Role Selector Tabs (Student vs Admin) */}
          <div className="grid grid-cols-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200">
            <button
              type="button"
              onClick={handleSwitchToStudent}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedRole === 'student'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <GraduationCap className="w-4 h-4 text-emerald-600" />
              <span>Student Portal</span>
            </button>

            <button
              type="button"
              onClick={handleSwitchToAdmin}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedRole === 'admin'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Shield className="w-4 h-4 text-amber-400" />
              <span>Admin Portal</span>
            </button>
          </div>

          {/* Header Description */}
          <div className="text-center space-y-1">
            <h2 className="text-xl font-extrabold tracking-tight text-slate-900">
              {selectedRole === 'admin' ? 'PBS Management Center' : 'Student LMS Sign In'}
            </h2>
            <p className="text-xs text-slate-500">
              {selectedRole === 'admin' 
                ? 'Sign in with administrator credentials to manage cohorts, fees, and curriculum'
                : 'Enter your registered student email or roll number to access your masterclass'}
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            
            {/* Error Message with Contextual Help */}
            {errorMsg && (
              <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-2xl space-y-2 animate-fadeIn font-medium">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                  <span>{errorMsg}</span>
                </div>

                {errorMsg.includes('Not Enrolled') && (
                  <div className="pt-2 border-t border-rose-200/60 flex items-center justify-between text-[11px]">
                    <button
                      type="button"
                      onClick={() => setShowCheckEnrollmentModal(true)}
                      className="text-rose-700 underline hover:text-rose-900 font-bold cursor-pointer"
                    >
                      Check Enrollment Status
                    </button>
                    <button
                      type="button"
                      onClick={handleOpenAdmission}
                      className="px-2.5 py-1 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 cursor-pointer transition-colors"
                    >
                      Apply to Enroll
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Email / Roll Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 block">
                  {selectedRole === 'admin' ? 'Administrator Email' : 'Student Email, Roll No., or Student ID'}
                </label>
                {selectedRole === 'student' && (
                  <button
                    type="button"
                    onClick={() => setShowCheckEnrollmentModal(true)}
                    className="text-[11px] text-emerald-600 hover:text-emerald-700 font-semibold cursor-pointer"
                  >
                    Lookup ID?
                  </button>
                )}
              </div>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder={selectedRole === 'admin' ? 'admin@pbs.com' : 'e.g. pravin.yadav@pbs.com'}
                  required
                  className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium text-slate-900"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700">Password</label>
                {selectedRole === 'student' && (
                  <button
                    type="button"
                    onClick={() => setShowChangePwdModal(true)}
                    className="text-[11px] text-emerald-600 hover:text-emerald-700 font-semibold cursor-pointer"
                  >
                    Change Password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full pl-10 pr-10 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium text-slate-900"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300"
                />
                <span>Remember session</span>
              </label>

              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>SSL Encrypted</span>
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoggingIn}
              className={`w-full py-3 rounded-xl text-xs font-bold tracking-wide transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                selectedRole === 'admin'
                  ? 'bg-slate-900 hover:bg-slate-800 text-white shadow-slate-900/20'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20'
              }`}
            >
              {isLoggingIn ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>
                    {selectedRole === 'admin' ? 'Access Admin Control Center' : 'Sign In to Student LMS'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Enrolled Accounts Helper / Directory */}
          <div className="pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setShowEnrolledDirectory(!showEnrolledDirectory)}
              className="w-full flex items-center justify-between text-xs text-slate-600 hover:text-slate-900 py-1.5 font-bold cursor-pointer"
            >
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified Enrolled Student Accounts ({enrolledStudents.length})</span>
              </div>
              {showEnrolledDirectory ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            <AnimatePresence>
              {showEnrolledDirectory && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-2 space-y-1.5 overflow-hidden"
                >
                  <p className="text-[11px] text-slate-500">
                    Click any verified student below to test login instantly:
                  </p>
                  <div className="max-h-48 overflow-y-auto space-y-1 pr-1">
                    {enrolledStudents.map((s) => (
                      <button
                        key={s.studentId}
                        type="button"
                        onClick={() => handleSelectPreFill(s.email, s.password || 'pravinyadav@123')}
                        className="w-full text-left p-2 rounded-xl bg-slate-50 hover:bg-emerald-50/80 border border-slate-200/80 hover:border-emerald-300 transition-all flex items-center justify-between group cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <img
                            src={s.avatar}
                            alt={s.name}
                            className="w-7 h-7 rounded-lg object-cover border border-slate-200"
                          />
                          <div>
                            <div className="text-xs font-bold text-slate-800 group-hover:text-emerald-900">{s.name}</div>
                            <div className="text-[10px] text-slate-500 font-mono">{s.email}</div>
                          </div>
                        </div>
                        <span className="text-[10px] bg-slate-200 group-hover:bg-emerald-600 group-hover:text-white text-slate-700 px-2 py-0.5 rounded-md font-semibold transition-colors">
                          Select
                        </span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Quick Action Links */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <button
              type="button"
              onClick={handleOpenAdmission}
              className="text-emerald-600 hover:text-emerald-700 font-bold hover:underline cursor-pointer flex items-center gap-1"
            >
              <BookOpen className="w-3 h-3" />
              <span>Apply for Course Admission</span>
            </button>
            <button
              type="button"
              onClick={() => setShowCheckEnrollmentModal(true)}
              className="text-slate-600 hover:text-slate-900 font-bold hover:underline cursor-pointer flex items-center gap-1"
            >
              <UserCheck className="w-3 h-3" />
              <span>Verify Registration</span>
            </button>
          </div>

        </div>

      </motion.main>

      {/* Bottom Info Bar */}
      <footer className="max-w-4xl mx-auto w-full text-center py-4 text-xs text-slate-400 space-y-1">
        <p className="flex items-center justify-center gap-2">
          <span>Pragmatic BIM Solution (PBS)</span>
          <span>•</span>
          <span>ISO 19650 Academic Delivery Standard</span>
          <span>•</span>
          <span className="text-emerald-400">All Rights Reserved © 2026</span>
        </p>
        <p className="text-[11px] text-slate-500">
          Admissions Helpline: +91 8208918726 • Email: admin@pragmaticbim.com
        </p>
      </footer>
      </div>

    </div>
  );
};

