import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Sparkles, 
  Mail, 
  Lock, 
  User, 
  Phone, 
  ShieldCheck, 
  GraduationCap, 
  Building2, 
  Check, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  AlertCircle,
  KeyRound,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';
import { AuthUser } from '../types';
import { PRELOADED_USERS } from '../data/pbsData';

interface AuthModalProps {
  isOpen: boolean;
  initialMode?: 'signin' | 'signup';
  onClose: () => void;
  onSuccessAuth: (user: AuthUser) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialMode = 'signin',
  onClose,
  onSuccessAuth
}) => {
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [showGoogleChooser, setShowGoogleChooser] = useState(false);

  // Form states - Sign In
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  // Form states - Sign Up
  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPhone, setSignUpPhone] = useState('');
  const [signUpRole, setSignUpRole] = useState<'student' | 'enterprise' | 'admin'>('student');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [adminSecretKey, setAdminSecretKey] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);

  // Error / Toast state
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Custom Google account builder in chooser
  const [customGoogleName, setCustomGoogleName] = useState('');
  const [customGoogleEmail, setCustomGoogleEmail] = useState('');
  const [showAddCustomGoogle, setShowAddCustomGoogle] = useState(false);

  if (!isOpen) return null;

  const handleSelectPreloadedGoogleUser = (user: typeof PRELOADED_USERS[0]) => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSuccessAuth(user);
      onClose();
    }, 600);
  };

  const handleCustomGoogleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customGoogleEmail || !customGoogleName) return;

    const isAdmin = customGoogleEmail.toLowerCase().trim() === 'pravinsyadavpsy99@gmail.com';
    const newUser: AuthUser = {
      id: `user-google-${Date.now()}`,
      name: customGoogleName,
      email: customGoogleEmail,
      role: isAdmin ? 'admin' : 'student',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(customGoogleName)}`,
      enrolledCourseIds: ['revit-mep-ar-st'],
      provider: 'google',
      designation: isAdmin ? 'Founder & Lead BIM Specialist' : 'BIM Student & Learner',
      joinedDate: 'Aug 2026'
    };

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSuccessAuth(newUser);
      onClose();
    }, 700);
  };

  const handleEmailSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!signInEmail.trim() || !signInPassword.trim()) {
      setErrorMsg('Please enter both email and password.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const emailLower = signInEmail.toLowerCase().trim();
      const existing = PRELOADED_USERS.find(u => u.email.toLowerCase() === emailLower);

      if (existing) {
        onSuccessAuth(existing);
        onClose();
      } else {
        const isAdmin = emailLower === 'pravinsyadavpsy99@gmail.com';
        const fallbackUser: AuthUser = {
          id: `user-email-${Date.now()}`,
          name: emailLower.split('@')[0].toUpperCase(),
          email: emailLower,
          role: isAdmin ? 'admin' : 'student',
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(emailLower)}`,
          enrolledCourseIds: ['revit-mep-ar-st'],
          provider: 'email',
          designation: isAdmin ? 'Founder & Lead Admin' : 'Certified BIM Student',
          joinedDate: 'Aug 2026'
        };
        onSuccessAuth(fallbackUser);
        onClose();
      }
    }, 800);
  };

  const handleEmailSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!signUpName.trim() || !signUpEmail.trim() || !signUpPassword.trim()) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    if (signUpRole === 'admin' && adminSecretKey.trim() !== 'pravin99' && signUpEmail.trim() !== 'pravinsyadavpsy99@gmail.com') {
      setErrorMsg('Admin key incorrect. Use "pravin99" or sign in with pravinsyadavpsy99@gmail.com.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const isAdmin = signUpRole === 'admin' || signUpEmail.toLowerCase().trim() === 'pravinsyadavpsy99@gmail.com';

      const newUser: AuthUser = {
        id: `user-reg-${Date.now()}`,
        name: signUpName,
        email: signUpEmail,
        phone: signUpPhone,
        role: isAdmin ? 'admin' : signUpRole,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(signUpName)}`,
        enrolledCourseIds: ['revit-mep-ar-st'],
        provider: 'email',
        designation: isAdmin ? 'Lead Administrator' : signUpRole === 'enterprise' ? 'Corporate BIM Lead' : 'BIM Trainee',
        joinedDate: 'Aug 2026'
      };

      onSuccessAuth(newUser);
      onClose();
    }, 900);
  };

  const handleForgotPassword = () => {
    setSuccessToast('Password reset link sent to your email address.');
    setTimeout(() => setSuccessToast(null), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="bg-white text-slate-900 rounded-3xl max-w-lg w-full my-6 border-2 border-emerald-500 shadow-2xl overflow-hidden relative"
      >
        {/* Top Gradient Banner */}
        <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-slate-900 text-white p-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98115_1px,transparent_1px),linear-gradient(to_bottom,#10b98115_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
          <div className="absolute right-0 -top-10 w-40 h-40 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex items-start justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-amber-400 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-2">
                <Sparkles className="w-3 h-3 text-slate-950" />
                <span>PBS Unified Single Sign-On</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {mode === 'signin' ? 'Welcome Back to PBS' : 'Create Your PBS Account'}
              </h2>
              <p className="text-xs text-emerald-200 mt-0.5">
                Access your Student LMS Portal, Masterclasses & Admin Dashboard
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-emerald-200 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="grid grid-cols-2 gap-2 mt-5 bg-slate-950/60 p-1 rounded-2xl border border-emerald-500/30">
            <button
              onClick={() => {
                setMode('signin');
                setErrorMsg(null);
              }}
              className={`py-2 text-xs font-black rounded-xl transition-all ${
                mode === 'signin'
                  ? 'bg-emerald-500 text-slate-950 shadow-md'
                  : 'text-emerald-200 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setMode('signup');
                setErrorMsg(null);
              }}
              className={`py-2 text-xs font-black rounded-xl transition-all ${
                mode === 'signup'
                  ? 'bg-emerald-500 text-slate-950 shadow-md'
                  : 'text-emerald-200 hover:text-white'
              }`}
            >
              Create Account
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-7 space-y-5">
          {/* Notification Toast */}
          {successToast && (
            <div className="bg-emerald-50 border border-emerald-400 text-emerald-900 p-3 rounded-xl text-xs flex items-center gap-2 font-bold animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>{successToast}</span>
            </div>
          )}

          {errorMsg && (
            <div className="bg-rose-50 border border-rose-300 text-rose-800 p-3 rounded-xl text-xs flex items-center gap-2 font-medium animate-fadeIn">
              <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Google Auth Primary Button */}
          <div className="space-y-3">
            <button
              onClick={() => setShowGoogleChooser(!showGoogleChooser)}
              className="w-full bg-white hover:bg-slate-50 text-slate-800 font-extrabold text-sm py-3 px-4 rounded-2xl border-2 border-slate-300 hover:border-emerald-500 shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-3 group relative overflow-hidden"
            >
              <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>{mode === 'signin' ? 'Sign in with Google' : 'Sign up with Google'}</span>
            </button>

            {/* Google Account Selector Dropdown Box */}
            {showGoogleChooser && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-50 border-2 border-emerald-400 rounded-2xl p-3.5 space-y-2.5 shadow-lg"
              >
                <div className="text-[11px] font-black text-emerald-900 uppercase tracking-wider flex items-center justify-between">
                  <span>Select Google Account to Authenticate</span>
                  <span className="text-slate-500 font-normal">OAuth 2.0</span>
                </div>

                <div className="space-y-1.5">
                  {PRELOADED_USERS.map((usr) => (
                    <button
                      key={usr.id}
                      onClick={() => handleSelectPreloadedGoogleUser(usr)}
                      className="w-full bg-white hover:bg-emerald-50 p-2.5 rounded-xl border border-slate-200 hover:border-emerald-500 transition-all flex items-center justify-between text-left group"
                    >
                      <div className="flex items-center gap-2.5">
                        <img
                          src={usr.avatar}
                          alt={usr.name}
                          className="w-8 h-8 rounded-full object-cover border border-slate-300"
                        />
                        <div>
                          <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                            <span>{usr.name}</span>
                            <span className={`text-[9px] font-black px-1.5 py-0.2 rounded-sm uppercase ${
                              (usr.role as string) === 'admin'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}>
                              {(usr.role as string) === 'admin' ? 'SUPER ADMIN' : 'STUDENT'}
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-500">{usr.email}</div>
                        </div>
                      </div>

                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 transition-colors" />
                    </button>
                  ))}
                </div>

                {/* Add Custom Google Account Drawer */}
                {!showAddCustomGoogle ? (
                  <button
                    onClick={() => setShowAddCustomGoogle(true)}
                    className="w-full text-center text-xs font-bold text-emerald-700 hover:text-emerald-800 py-1.5"
                  >
                    + Use another Google account
                  </button>
                ) : (
                  <form onSubmit={handleCustomGoogleSubmit} className="pt-2 border-t border-slate-200 space-y-2">
                    <input
                      type="text"
                      placeholder="Your Name (e.g. Rahul Sharma)"
                      value={customGoogleName}
                      onChange={(e) => setCustomGoogleName(e.target.value)}
                      className="w-full bg-white text-slate-800 text-xs px-3 py-2 rounded-xl border border-slate-300 outline-none focus:border-emerald-500"
                      required
                    />
                    <input
                      type="email"
                      placeholder="Google Email (e.g. rahul@gmail.com)"
                      value={customGoogleEmail}
                      onChange={(e) => setCustomGoogleEmail(e.target.value)}
                      className="w-full bg-white text-slate-800 text-xs px-3 py-2 rounded-xl border border-slate-300 outline-none focus:border-emerald-500"
                      required
                    />
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2 rounded-xl"
                      >
                        Authorize & Sign In
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowAddCustomGoogle(false)}
                        className="px-3 text-xs text-slate-600 hover:bg-slate-200 rounded-xl"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </motion.div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">or continue with email</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {/* SIGN IN FORM */}
          {mode === 'signin' && (
            <form onSubmit={handleEmailSignIn} className="space-y-4">
              <div>
                <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    placeholder="pravinsyadavpsy99@gmail.com"
                    value={signInEmail}
                    onChange={(e) => setSignInEmail(e.target.value)}
                    className="w-full bg-slate-50 focus:bg-white text-slate-900 text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-extrabold text-slate-700">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-[11px] font-bold text-emerald-600 hover:text-emerald-700"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={signInPassword}
                    onChange={(e) => setSignInPassword(e.target.value)}
                    className="w-full bg-slate-50 focus:bg-white text-slate-900 text-xs sm:text-sm pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                  />
                  <span>Remember my session</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 hover:scale-102 active:scale-98 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Authenticating...</span>
                ) : (
                  <>
                    <span>Sign In to PBS Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* SIGN UP FORM */}
          {mode === 'signup' && (
            <form onSubmit={handleEmailSignUp} className="space-y-3.5">
              <div>
                <label className="block text-xs font-extrabold text-slate-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
                  <input
                    type="text"
                    placeholder="e.g. Pravin Yadav"
                    value={signUpName}
                    onChange={(e) => setSignUpName(e.target.value)}
                    className="w-full bg-slate-50 focus:bg-white text-slate-900 text-xs pl-10 pr-4 py-2 rounded-xl border border-slate-200 focus:border-emerald-500 outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-extrabold text-slate-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
                    <input
                      type="email"
                      placeholder="name@gmail.com"
                      value={signUpEmail}
                      onChange={(e) => setSignUpEmail(e.target.value)}
                      className="w-full bg-slate-50 focus:bg-white text-slate-900 text-xs pl-10 pr-3 py-2 rounded-xl border border-slate-200 focus:border-emerald-500 outline-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-slate-700 mb-1">
                    Phone / WhatsApp
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
                    <input
                      type="tel"
                      placeholder="+91 8208918726"
                      value={signUpPhone}
                      onChange={(e) => setSignUpPhone(e.target.value)}
                      className="w-full bg-slate-50 focus:bg-white text-slate-900 text-xs pl-10 pr-3 py-2 rounded-xl border border-slate-200 focus:border-emerald-500 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Role Selection */}
              <div>
                <label className="block text-xs font-extrabold text-slate-700 mb-1">
                  Account Type & Purpose
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setSignUpRole('student')}
                    className={`p-2 rounded-xl border text-center transition-all text-xs font-bold ${
                      signUpRole === 'student'
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <GraduationCap className="w-4 h-4 mx-auto mb-1 text-emerald-600" />
                    <span>Student / Fresher</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSignUpRole('enterprise')}
                    className={`p-2 rounded-xl border text-center transition-all text-xs font-bold ${
                      signUpRole === 'enterprise'
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Building2 className="w-4 h-4 mx-auto mb-1 text-emerald-600" />
                    <span>AEC Corporate</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSignUpRole('admin')}
                    className={`p-2 rounded-xl border text-center transition-all text-xs font-bold ${
                      signUpRole === 'admin'
                        ? 'border-amber-500 bg-amber-50 text-amber-900'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4 mx-auto mb-1 text-amber-600" />
                    <span>Lead Admin</span>
                  </button>
                </div>
              </div>

              {signUpRole === 'admin' && (
                <div className="bg-amber-50 p-2.5 rounded-xl border border-amber-300 animate-fadeIn">
                  <label className="block text-[11px] font-black text-amber-900 mb-1">
                    Master Admin Passkey (Demo Key: "pravin99")
                  </label>
                  <div className="relative">
                    <KeyRound className="w-3.5 h-3.5 text-amber-600 absolute left-3 top-2.5" />
                    <input
                      type="password"
                      placeholder="Enter Admin Key"
                      value={adminSecretKey}
                      onChange={(e) => setAdminSecretKey(e.target.value)}
                      className="w-full bg-white text-xs pl-9 pr-3 py-1.5 rounded-lg border border-amber-300 outline-none"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-extrabold text-slate-700 mb-1">
                  Create Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Min 6 characters"
                    value={signUpPassword}
                    onChange={(e) => setSignUpPassword(e.target.value)}
                    className="w-full bg-slate-50 focus:bg-white text-slate-900 text-xs pl-10 pr-10 py-2 rounded-xl border border-slate-200 focus:border-emerald-500 outline-none"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-2.5 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-600 pt-1">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                  required
                />
                <span>I agree to ISO 19650 Honor Code & Academic Terms</span>
              </label>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 hover:scale-102 active:scale-98 disabled:opacity-50"
              >
                {isSubmitting ? 'Creating Profile...' : 'Complete Registration & Sign In'}
              </button>
            </form>
          )}

          {/* Quick Demo Login Bar */}
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-1.5">
            <div className="text-[10px] font-black text-slate-500 uppercase tracking-wider text-center">
              Quick 1-Click Sandbox Logins:
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => handleSelectPreloadedGoogleUser(PRELOADED_USERS[0])}
                className="bg-white hover:bg-amber-50 text-slate-800 p-2 rounded-xl border border-amber-300 font-bold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                <span>Pravin (Admin)</span>
              </button>

              <button
                type="button"
                onClick={() => handleSelectPreloadedGoogleUser(PRELOADED_USERS[1])}
                className="bg-white hover:bg-emerald-50 text-slate-800 p-2 rounded-xl border border-emerald-300 font-bold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
              >
                <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
                <span>Sneha (Student)</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
