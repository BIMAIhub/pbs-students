import React, { useState } from 'react';
import { 
  X, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  GraduationCap, 
  BookOpen, 
  Calendar, 
  CreditCard, 
  ShieldCheck, 
  ArrowRight,
  UserCheck,
  Building2,
  Clock
} from 'lucide-react';
import { pbsAdminStore, ManagedStudent } from '../../utils/pbsAdminStore';
import { soundFx } from '../../utils/soundEffects';

interface CheckEnrollmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectStudent: (student: { email: string; name: string; studentId: string; rollNumber: string }) => void;
  onOpenEnrollment: () => void;
}

export const CheckEnrollmentModal: React.FC<CheckEnrollmentModalProps> = ({
  isOpen,
  onClose,
  onSelectStudent,
  onOpenEnrollment
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<{
    status: 'idle' | 'found' | 'not_found';
    student?: ManagedStudent;
    enrollmentReq?: any;
    message?: string;
  }>({ status: 'idle' });
  const [isSearching, setIsSearching] = useState(false);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim().toLowerCase();
    if (!query) return;

    setIsSearching(true);
    soundFx.playClick();

    setTimeout(() => {
      setIsSearching(false);
      const allStudents = pbsAdminStore.getStudents();
      const cleanDigits = query.replace(/[^0-9]/g, '');

      // 1. Check in official student roster
      const match = allStudents.find(s => {
        const sEmail = (s.email || '').toLowerCase();
        const sRoll = (s.rollNumber || '').toLowerCase();
        const sId = (s.studentId || '').toLowerCase();
        const sName = (s.name || '').toLowerCase();
        const sPhone = (s.phone || '').replace(/[^0-9]/g, '');

        return (
          sEmail === query ||
          sRoll === query ||
          sId === query ||
          sName === query ||
          (cleanDigits.length >= 10 && sPhone.includes(cleanDigits))
        );
      });

      if (match) {
        soundFx.playSuccess();
        setSearchResult({
          status: 'found',
          student: match
        });
        return;
      }

      // 2. Check in pending/approved enrollment requests
      try {
        const storedReqs = localStorage.getItem('pbs_admin_enrollment_requests');
        if (storedReqs) {
          const reqs = JSON.parse(storedReqs);
          const reqMatch = reqs.find((r: any) => 
            r.studentEmail?.toLowerCase() === query ||
            r.studentId?.toLowerCase() === query ||
            (cleanDigits.length >= 10 && r.studentPhone?.replace(/[^0-9]/g, '').includes(cleanDigits))
          );
          if (reqMatch) {
            setSearchResult({
              status: 'found',
              enrollmentReq: reqMatch
            });
            return;
          }
        }
      } catch {}

      soundFx.playClick();
      setSearchResult({
        status: 'not_found',
        message: `No active student enrollment found for "${searchQuery}". Please check the spelling or submit an admission application.`
      });
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col text-slate-100">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <span>Check Enrollment Status</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-500/30 uppercase">
                  Live Registry
                </span>
              </h3>
              <p className="text-xs text-slate-400">Verify your PBS institutional student registration</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Search Input Form */}
          <form onSubmit={handleSearch} className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">
              Enter Institutional Email, Student ID, or Roll Number
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="e.g. pravin.yadav@pbs.com or PBS-STU-2026-8316"
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <button
                type="submit"
                disabled={isSearching}
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                {isSearching ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <span>Verify</span>
                )}
              </button>
            </div>
          </form>

          {/* Result States */}
          {searchResult.status === 'found' && searchResult.student && (
            <div className="p-4 bg-emerald-950/40 border border-emerald-500/40 rounded-2xl space-y-3 animate-fadeIn">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={searchResult.student.avatar}
                    alt={searchResult.student.name}
                    className="w-12 h-12 rounded-xl object-cover border border-emerald-500/40"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-white">{searchResult.student.name}</h4>
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Active Enrolled
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 font-mono">{searchResult.student.email}</p>
                    <p className="text-[11px] text-slate-400">Roll: {searchResult.student.rollNumber} • ID: {searchResult.student.studentId}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-emerald-500/20 text-xs">
                <div className="p-2 bg-slate-900/60 rounded-xl">
                  <span className="text-[10px] text-slate-400 block">Batch Cohort</span>
                  <span className="font-semibold text-emerald-300">{searchResult.student.batch || '09/2026 Weekend'}</span>
                </div>
                <div className="p-2 bg-slate-900/60 rounded-xl">
                  <span className="text-[10px] text-slate-400 block">Payment Status</span>
                  <span className="font-semibold text-emerald-300">{searchResult.student.paymentStatus || 'Full Paid'}</span>
                </div>
              </div>

              {searchResult.student.enrolledCourseTitles && searchResult.student.enrolledCourseTitles.length > 0 && (
                <div className="space-y-1">
                  <span className="text-[11px] text-slate-400 block font-medium">Enrolled Masterclass:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {searchResult.student.enrolledCourseTitles.map((title, idx) => (
                      <span key={idx} className="text-[10px] bg-slate-800 text-slate-200 px-2.5 py-1 rounded-lg border border-slate-700 font-medium">
                        {title}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={() => {
                  if (searchResult.student) {
                    onSelectStudent({
                      email: searchResult.student.email,
                      name: searchResult.student.name,
                      studentId: searchResult.student.studentId,
                      rollNumber: searchResult.student.rollNumber
                    });
                    onClose();
                  }
                }}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>Sign In with this Student Account</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {searchResult.status === 'found' && searchResult.enrollmentReq && (
            <div className="p-4 bg-amber-950/40 border border-amber-500/40 rounded-2xl space-y-3 animate-fadeIn">
              <div className="flex items-center gap-2 text-amber-300 text-xs font-bold">
                <Clock className="w-4 h-4" />
                <span>Enrollment Request Found ({searchResult.enrollmentReq.status})</span>
              </div>
              <p className="text-xs text-slate-300">
                <strong>{searchResult.enrollmentReq.studentName}</strong> submitted an enrollment for <em>{searchResult.enrollmentReq.courseTitle}</em>.
              </p>
              <p className="text-[11px] text-slate-400">
                Transaction ID: {searchResult.enrollmentReq.transactionId || 'Pending'} • Status: {searchResult.enrollmentReq.status}
              </p>
            </div>
          )}

          {searchResult.status === 'not_found' && (
            <div className="p-4 bg-rose-950/40 border border-rose-500/40 rounded-2xl space-y-3 animate-fadeIn">
              <div className="flex items-start gap-2.5 text-rose-300 text-xs font-medium">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
                <span>{searchResult.message}</span>
              </div>

              <div className="pt-2 border-t border-rose-500/20 flex items-center justify-between">
                <span className="text-xs text-slate-400">Want to join PBS Academy?</span>
                <button
                  onClick={() => {
                    onClose();
                    onOpenEnrollment();
                  }}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                >
                  Apply for Admission
                </button>
              </div>
            </div>
          )}

          {/* Quick Info */}
          <div className="p-3 bg-slate-800/40 border border-slate-800 rounded-xl space-y-1.5 text-[11px] text-slate-400">
            <div className="flex items-center gap-1.5 text-slate-300 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Institutional Enrollment Policy</span>
            </div>
            <p>
              Only registered students assigned to 2026 cohorts can access the Student LMS. If you have completed payment, your account is activated within 2 hours.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-950/60 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
          <span>PBS Academic Office: +91 8208918726</span>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
