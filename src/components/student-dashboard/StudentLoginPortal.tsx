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
  Building2, 
  ArrowRight, 
  Sparkles,
  FileSpreadsheet,
  Check,
  HelpCircle
} from 'lucide-react';
import { studentAuthUtil } from '../../utils/studentAuth';
import { soundFx } from '../../utils/soundEffects';
import { ChangePasswordModal } from './ChangePasswordModal';
import { StudentExcelRegistryModal } from './StudentExcelRegistryModal';

interface StudentLoginPortalProps {
  onSuccessLogin: () => void;
}

export const StudentLoginPortal: React.FC<StudentLoginPortalProps> = ({
  onSuccessLogin
}) => {
  const [emailInput, setEmailInput] = useState('pravin.yadav.0926@pbs.com');
  const [passwordInput, setPasswordInput] = useState('pravinyadav@123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showChangePwdModal, setShowChangePwdModal] = useState(false);
  const [showExcelModal, setShowExcelModal] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const activeDefaultEmail = studentAuthUtil.defaultEmail;
  const activePassword = studentAuthUtil.getActivePassword();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!emailInput.trim() || !passwordInput.trim()) {
      setErrorMsg('Please enter both student email and password.');
      return;
    }

    setIsLoggingIn(true);

    setTimeout(() => {
      setIsLoggingIn(false);
      const res = studentAuthUtil.verifyCredentials(emailInput, passwordInput);

      if (res.success) {
        soundFx.playSuccess();
        studentAuthUtil.setLoggedIn(true);
        onSuccessLogin();
      } else {
        soundFx.playClick();
        setErrorMsg(res.message);
      }
    }, 600);
  };

  const handleQuickFill = () => {
    soundFx.playClick();
    setEmailInput(activeDefaultEmail);
    setPasswordInput(activePassword);
    setErrorMsg(null);
    setToastMsg('Filled official student credentials for Pravin Yadav');
    setTimeout(() => setToastMsg(null), 3000);
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
                Student LMS
              </span>
            </h1>
            <p className="text-[11px] text-slate-400">ISO 19650 Certified BIM Academy Portal</p>
          </div>
        </div>

        <button
          onClick={() => setShowExcelModal(true)}
          className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-bold transition-colors cursor-pointer"
        >
          <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
          <span>Excel Registry (.csv)</span>
        </button>
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
          
          {/* Header */}
          <div className="text-center space-y-1">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 mb-2">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-extrabold tracking-tight text-slate-900">Student Portal Sign In</h2>
            <p className="text-xs text-slate-500">Enter your official institutional credentials to access your courses & LMS dashboard</p>
          </div>

          {/* Quick Credential Helper Pill */}
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-bold text-slate-600 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Single Student Profile:</span>
              </span>
              <button
                type="button"
                onClick={handleQuickFill}
                className="text-emerald-700 hover:text-emerald-800 font-bold underline cursor-pointer"
              >
                1-Click Auto Fill
              </button>
            </div>
            <div className="text-[11px] font-mono text-slate-700 bg-white p-2 rounded-xl border border-slate-200/80 space-y-1">
              <div>
                <span className="text-slate-400">Email: </span>
                <strong className="text-emerald-800 font-bold">pravin.yadav.0926@pbs.com</strong>
              </div>
              <div>
                <span className="text-slate-400">Default Pwd: </span>
                <strong className="text-slate-800 font-bold">pravinyadav@123</strong>
              </div>
            </div>
          </div>

          {/* Error Alert */}
          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2 font-medium">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            
            {/* Student Institutional Email */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Student Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="pravin.yadav.0926@pbs.com"
                  required
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                />
              </div>
              <p className="text-[10px] text-slate-400 mt-1">
                Format: <code className="text-slate-600 font-mono">name.0926@pbs.com</code> (Month 09 • Year 26)
              </p>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowChangePwdModal(true)}
                  className="text-[11px] text-emerald-700 hover:text-emerald-800 font-bold cursor-pointer"
                >
                  Change Password?
                </button>
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="pravinyadav@123"
                  required
                  className="w-full pl-10 pr-10 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-slate-600 text-xs font-medium">Keep me signed in</span>
              </label>

              <button
                type="button"
                onClick={() => setShowExcelModal(true)}
                className="text-slate-500 hover:text-slate-800 text-[11px] font-semibold cursor-pointer"
              >
                View Excel Data
              </button>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/30 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {isLoggingIn ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Student Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

          </form>

          {/* Institutional Trust Footer */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-center gap-4 text-[10px] text-slate-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>256-Bit Encrypted</span>
            </span>
            <span>•</span>
            <span>ISO 19650 Academic CDE</span>
            <span>•</span>
            <span>Pune, India</span>
          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto w-full text-center text-xs text-slate-400 py-3">
        <p>© 2026 Pragmatic BIM Solution. All academic rights reserved. Direct student support: academic@pragmaticbim.com</p>
      </footer>

    </div>
  );
};
