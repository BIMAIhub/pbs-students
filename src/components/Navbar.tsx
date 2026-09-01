import React, { useState } from 'react';
import { COMPANY_INFO, PRELOADED_USERS } from '../data/pbsData';
import { AuthUser } from '../types';
import { 
  Phone, 
  MessageCircle, 
  GraduationCap, 
  Search, 
  Menu, 
  X, 
  ChevronRight,
  Sparkles, 
  BookOpen, 
  Building2, 
  Calendar, 
  Layers, 
  ShieldCheck,
  User,
  LogOut,
  ChevronDown,
  Gift,
  Settings,
  Flame,
  Award,
  Zap
} from 'lucide-react';

interface NavbarProps {
  currentUser: AuthUser | null;
  onOpenLms: () => void;
  onOpenCounselling: () => void;
  onOpenConsultancy: () => void;
  onOpenAdmin: () => void;
  onOpenPromotions: () => void;
  onOpenAuth: (mode?: 'signin' | 'signup') => void;
  onSignOut: () => void;
  onSearch: (term: string) => void;
  onQuickStudentLogin?: (user: AuthUser) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  onOpenLms,
  onOpenCounselling,
  onOpenConsultancy,
  onOpenAdmin,
  onOpenPromotions,
  onOpenAuth,
  onSignOut,
  onSearch,
  onQuickStudentLogin
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
      const coursesEl = document.getElementById('courses-section');
      if (coursesEl) {
        coursesEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const isAdmin = currentUser?.role === 'admin' || currentUser?.email.toLowerCase() === 'pravinsyadavpsy99@gmail.com';

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Bar Announcement: High-Tech Jet Black & Emerald */}
      <div className="bg-[#050811] text-white text-xs py-2 px-3 sm:px-4 border-b border-emerald-500/20">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-2 font-medium">
            <span className="bg-emerald-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider">
              15+ Yrs AEC Exp
            </span>
            <span className="hidden sm:inline text-slate-300">
              High-Tech BIM Training Platform for Architects, Civil & MEP Engineers
            </span>
            <span className="sm:hidden font-bold text-emerald-400">Pragmatic BIM Solution</span>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-4 text-xs">
            <button 
              onClick={onOpenPromotions}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-3 py-0.5 rounded-full flex items-center gap-1 transition-all shadow-xs hover:scale-105"
            >
              <Gift className="w-3 h-3 text-slate-950" />
              <span>40% Scholarships Active</span>
            </button>

            <button 
              onClick={onOpenCounselling}
              className="hidden md:flex items-center gap-1 text-emerald-300 hover:text-white transition-colors"
            >
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>Free 1:1 Counselling</span>
            </button>

            <a 
              href={`https://wa.me/${COMPANY_INFO.phoneClean}?text=Hi%20Pragmatic%20BIM%20Solution,%20I%20want%20to%20inquire%20about%20BIM%20courses%20and%20services.`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-1 text-slate-300 hover:text-[#00f59b] transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp: {COMPANY_INFO.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Nav Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative p-2 rounded-2xl bg-slate-950 text-white border-2 border-emerald-500 shadow-sm group-hover:border-emerald-400 transition-all">
            <div className="text-emerald-400 font-black tracking-tight text-lg leading-none">
              PBS
            </div>
            <div className="text-[8px] font-bold text-slate-300 tracking-wider uppercase text-center mt-0.5">
              BIM
            </div>
          </div>
          <div>
            <div className="font-extrabold text-slate-950 text-lg sm:text-xl tracking-tight leading-tight flex items-center gap-1.5">
              Pragmatic <span className="text-emerald-600">BIM Solution</span>
            </div>
            <div className="text-xs text-slate-500 italic font-serif tracking-tight font-medium">
              "{COMPANY_INFO.slogan}"
            </div>
          </div>
        </a>

        {/* Search Bar - Desktop */}
        <form onSubmit={handleSearchSubmit} className="hidden lg:flex items-center relative flex-1 max-w-xs">
          <input
            type="text"
            placeholder="Search Revit, Navisworks, Dynamo..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-100 hover:bg-slate-50 focus:bg-white text-slate-900 text-xs pl-8 pr-4 py-2 rounded-full border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3" />
        </form>

        {/* Desktop Nav Links */}
        <nav className="hidden xl:flex items-center gap-5 text-xs font-bold text-slate-700">
          <a href="#courses-section" className="hover:text-emerald-600 transition-colors flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
            Courses
          </a>
          <a href="#services-section" className="hover:text-emerald-600 transition-colors flex items-center gap-1">
            <Building2 className="w-3.5 h-3.5 text-emerald-600" />
            BIM Services
          </a>
          <a href="#projects-section" className="hover:text-emerald-600 transition-colors flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-emerald-600" />
            Projects
          </a>
          <button 
            onClick={onOpenPromotions}
            className="text-amber-700 hover:text-amber-800 transition-colors flex items-center gap-1 font-extrabold"
          >
            <Flame className="w-3.5 h-3.5 text-amber-500" />
            Offers
          </button>
          <a href="#testimonials-section" className="hover:text-emerald-600 transition-colors">
            Reviews
          </a>
          <a href="#contact-section" className="hover:text-emerald-600 transition-colors">
            Contact
          </a>
        </nav>

        {/* Right Section: Authentication & Profiles */}
        <div className="hidden sm:flex items-center gap-2.5">
          {currentUser ? (
            /* Logged In User Profile with Dropdown */
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="bg-white hover:bg-emerald-50/50 border-2 border-emerald-500 p-1.5 pr-3 rounded-2xl flex items-center gap-2.5 transition-all shadow-xs hover:shadow-sm"
              >
                <div className="relative">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-xl object-cover border border-emerald-500"
                  />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white absolute -bottom-0.5 -right-0.5" />
                </div>

                <div className="text-left">
                  <div className="text-xs font-black text-slate-900 leading-tight flex items-center gap-1">
                    <span>{currentUser.name}</span>
                    <span className={`text-[9px] font-black px-1.5 py-0.2 rounded-md uppercase ${
                      isAdmin ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                    }`}>
                      {isAdmin ? 'ADMIN' : 'STUDENT'}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-500 truncate max-w-[120px]">
                    {currentUser.email}
                  </div>
                </div>

                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* Dropdown Menu */}
              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border-2 border-emerald-500 p-2 space-y-1 z-50 animate-fadeIn text-xs">
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="font-bold text-slate-900">{currentUser.name}</div>
                    <div className="text-slate-500 text-[11px] truncate">{currentUser.email}</div>
                    <div className="text-[10px] text-emerald-700 font-bold mt-1">
                      {currentUser.designation || 'Verified PBS Member'}
                    </div>
                  </div>

                  {isAdmin && (
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onOpenAdmin();
                      }}
                      className="w-full text-left p-2 hover:bg-amber-50 rounded-xl flex items-center gap-2 font-bold text-amber-900"
                    >
                      <ShieldCheck className="w-4 h-4 text-amber-600" />
                      <span>Admin Control Dashboard</span>
                    </button>
                  )}

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      onOpenLms();
                    }}
                    className="w-full text-left p-2 hover:bg-emerald-50 rounded-xl flex items-center gap-2 font-bold text-emerald-900"
                  >
                    <GraduationCap className="w-4 h-4 text-emerald-600" />
                    <span>Student LMS & Certificates</span>
                  </button>

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      onOpenPromotions();
                    }}
                    className="w-full text-left p-2 hover:bg-slate-50 rounded-xl flex items-center gap-2 font-bold text-slate-800"
                  >
                    <Gift className="w-4 h-4 text-amber-500" />
                    <span>Scholarships & Promo Codes</span>
                  </button>

                  <div className="pt-1 border-t border-slate-100">
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onSignOut();
                      }}
                      className="w-full text-left p-2 hover:bg-rose-50 text-rose-700 rounded-xl flex items-center gap-2 font-bold"
                    >
                      <LogOut className="w-4 h-4 text-rose-600" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Logged Out Buttons: Student Google Sign In + Sign Up */
            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenAuth('signin')}
                className="bg-white hover:bg-emerald-50 text-slate-900 font-extrabold text-xs px-3.5 py-2.5 rounded-xl flex items-center gap-2 border-2 border-emerald-500 shadow-2xs hover:shadow-xs transition-all hover:scale-102"
                title="Student Login by Google Account"
              >
                <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                <span>Student Google Login</span>
              </button>

              <button
                onClick={() => onOpenAuth('signup')}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl transition-all shadow-xs hover:scale-102"
              >
                Sign Up
              </button>
            </div>
          )}

          {/* Quick LMS Direct Action Button */}
          <button
            onClick={onOpenLms}
            className="bg-[#050811] hover:bg-slate-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-all shadow-xs hover:scale-102 border border-emerald-500/40"
          >
            <GraduationCap className="w-3.5 h-3.5 text-[#00f59b]" />
            <span>Student LMS</span>
          </button>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="xl:hidden p-2 text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search Revit, Navisworks, Dynamo..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-100 text-slate-800 text-xs pl-8 pr-4 py-2 rounded-xl border border-slate-200 outline-none"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          </form>

          <nav className="flex flex-col space-y-2 pt-2 text-xs font-bold text-slate-800">
            <a 
              href="#courses-section" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 hover:bg-emerald-50 rounded-xl flex items-center justify-between text-emerald-800"
            >
              <span className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-600" />
                Course Catalog
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPromotions();
              }}
              className="p-2 hover:bg-amber-50 rounded-xl flex items-center justify-between text-amber-900 text-left font-black"
            >
              <span className="flex items-center gap-2">
                <Gift className="w-4 h-4 text-amber-600" />
                2026 Scholarships & Deals (40% OFF)
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            <a 
              href="#services-section" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 hover:bg-slate-50 rounded-xl flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-emerald-600" />
                BIM Consultancy Services
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </a>

            <a 
              href="#projects-section" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 hover:bg-slate-50 rounded-xl flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-600" />
                Featured BIM Projects (Al ULA)
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </a>
          </nav>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            {currentUser ? (
              <div className="space-y-2">
                <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img src={currentUser.avatar} alt={currentUser.name} className="w-8 h-8 rounded-full" />
                    <div>
                      <div className="text-xs font-bold text-slate-900">{currentUser.name}</div>
                      <div className="text-[10px] text-slate-500">{currentUser.email}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onSignOut();
                    }}
                    className="text-xs text-rose-600 font-bold"
                  >
                    Logout
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenLms();
                    }}
                    className="w-full bg-emerald-600 text-white font-bold py-2.5 rounded-xl text-xs"
                  >
                    Student LMS
                  </button>
                  {isAdmin && (
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onOpenAdmin();
                      }}
                      className="w-full bg-slate-900 text-white font-bold py-2.5 rounded-xl text-xs"
                    >
                      Admin Panel
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('signin');
                  }}
                  className="w-full bg-white text-slate-800 font-bold py-2.5 rounded-xl border-2 border-emerald-500 text-xs flex items-center justify-center gap-1.5"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                  <span>Student Login</span>
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('signup');
                  }}
                  className="w-full bg-emerald-600 text-white font-bold py-2.5 rounded-xl text-xs"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
