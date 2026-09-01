import React, { useState } from 'react';
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
  Shield
} from 'lucide-react';
import { studentAuthUtil, ActiveSessionUser } from '../../utils/studentAuth';
import { soundFx } from '../../utils/soundEffects';
import { ChangePasswordModal } from './ChangePasswordModal';
import { StudentExcelRegistryModal } from './StudentExcelRegistryModal';

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
  const [toastMsg, setToastMsg] = useState<string | null>(null);

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

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!emailInput.trim() || !passwordInput.trim()) {
      setErrorMsg('Please enter both institutional email (or roll number) and password.');
      return;
    }

    setIsLoggingIn(true);

    setTimeout(() => {
      setIsLoggingIn(false);
      const res = studentAuthUtil.verifyCredentials(emailInput, passwordInput);

      if (res.success && res.user) {
        soundFx.playSuccess();
        studentAuthUtil.setLoggedIn(true);
        onSuccessLogin(res.user);
      } else {
        soundFx.playClick();
        setErrorMsg(res.message);
      }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-slate-100 flex flex-col justify-between antialiased selection:bg-emerald-500 selection:text-white p-4 sm:p-6 md:p-8">
      
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

      {/* Top Brand Bar */}
      <header className="max-w-6xl mx-auto w-full flex items-center justify-between py-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-extrabold text-base shadow-lg shadow-emerald-500/20 border border-emerald-400/30">
            PBS
          </div>
          <div>
            <h1 className="font-extrabold text-sm sm:text-base tracking-tight text-white flex items-center gap-1.5">
              <span>Pragmatic BIM Solution</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                Institutional Portal
              </span>
            </h1>
            <p className="text-[11px] text-slate-400">ISO 19650 Certified BIM Academy & Management System</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowExcelModal(true)}
            className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-bold transition-colors cursor-pointer"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
            <span>Excel Registry (.csv)</span>
          </button>
        </div>
      </header>

      {/* Main Login Card Area */}
      <main className="max-w-md w-full mx-auto my-8">
        
        {/* Toast Alert */}
        {toastMsg && (
          <div className="mb-4 p-3 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs rounded-2xl flex items-center gap-2 font-semibold animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{toastMsg}</span>
          </div>
        )}

        <div className="bg-white text-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100/10 space-y-6">
          
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
              <span>Student LMS</span>
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
              {selectedRole === 'admin' ? 'PBS Admin Control Center' : 'Student Portal Sign In'}
            </h2>
            <p className="text-xs text-slate-500">
              {selectedRole === 'admin' 
                ? 'Sign in with administrator credentials to manage cohorts, fees, curriculum & placements'
                : 'Enter your institutional email or roll number to access your LMS dashboard'}
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            
            {/* Error Message */}
            {errorMsg && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-start gap-2 animate-fadeIn font-medium">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">
                {selectedRole === 'admin' ? 'Administrator Email' : 'Institutional Email or Roll Number'}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder={selectedRole === 'admin' ? 'admin@pbs.com' : 'e.g. yourname.0926@pbs.com or PBS/2026/...'}
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

        </div>

      </main>

      {/* Bottom Info Bar */}
      <footer className="max-w-4xl mx-auto w-full text-center py-4 text-xs text-slate-400 space-y-1">
        <p className="flex items-center justify-center gap-2">
          <span>Pragmatic BIM Solution (PBS)</span>
          <span>•</span>
          <span>ISO 19650 Academic Delivery Standard</span>
          <span>•</span>
          <span className="text-emerald-400">All Rights Reserved © 2026</span>
        </p>
      </footer>

    </div>
  );
};
