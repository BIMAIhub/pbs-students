import React, { useState } from 'react';
import { 
  X, 
  KeyRound, 
  Copy, 
  Check, 
  ShieldCheck, 
  Sparkles, 
  Mail, 
  Lock, 
  RefreshCw, 
  AlertCircle 
} from 'lucide-react';
import { ManagedStudent, pbsAdminStore } from '../../utils/pbsAdminStore';
import { studentAuthUtil } from '../../utils/studentAuth';
import { soundFx } from '../../utils/soundEffects';

interface AdminStudentPasswordModalProps {
  student: ManagedStudent;
  onClose: () => void;
  onPasswordUpdated: () => void;
}

export const AdminStudentPasswordModal: React.FC<AdminStudentPasswordModalProps> = ({
  student,
  onClose,
  onPasswordUpdated
}) => {
  const [newPassword, setNewPassword] = useState(student.password || studentAuthUtil.getActivePassword());
  const [copied, setCopied] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleGenerateDefault = () => {
    soundFx.playClick();
    const def = pbsAdminStore.generateStudentDefaultPassword(student.name);
    setNewPassword(def);
  };

  const handleGenerateRandom = () => {
    soundFx.playClick();
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789@#$';
    let res = '';
    for (let i = 0; i < 10; i++) {
      res += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setNewPassword(res);
  };

  const handleCopyCredentials = () => {
    soundFx.playClick();
    const text = `PBS Institutional Student Portal Login Details:\n• Student Name: ${student.name}\n• Institutional Email: ${student.email}\n• Password: ${newPassword}\n• LMS Portal: https://pragmaticbim.com/student-lms`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }

    // Save to admin student roster
    pbsAdminStore.updateStudent(student.studentId, { password: newPassword });

    // Sync to studentAuthUtil if Pravin Yadav
    if (student.studentId === 'PBS-STU-2026-8492' || student.email.includes('pravin')) {
      studentAuthUtil.setStudentPasswordByAdmin(newPassword);
    }

    soundFx.playSuccess();
    setSaveSuccess(true);
    setTimeout(() => {
      onPasswordUpdated();
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-emerald-100 overflow-hidden animate-fadeIn text-slate-800">
        
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-emerald-800 via-teal-900 to-emerald-950 text-white flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 font-bold">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-white">Student Password Manager</h3>
              <p className="text-xs text-emerald-200">{student.name} ({student.studentId})</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSave} className="p-6 space-y-4">
          
          {saveSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs font-bold flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Password updated and synced to student LMS credentials!</span>
            </div>
          )}

          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-2xl text-rose-800 text-xs font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Student Email Readonly */}
          <div className="p-3.5 bg-emerald-50/50 rounded-2xl border border-emerald-100 flex items-center gap-3">
            <Mail className="w-4 h-4 text-emerald-600 shrink-0" />
            <div className="overflow-hidden">
              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Institutional Student Email</div>
              <div className="text-xs font-mono font-bold text-slate-900 truncate">{student.email}</div>
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Set Student Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-emerald-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={newPassword}
                onChange={(e) => {
                  setErrorMsg(null);
                  setNewPassword(e.target.value);
                }}
                required
                className="w-full pl-10 pr-4 py-2.5 text-xs font-mono font-bold bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900"
              />
            </div>
          </div>

          {/* Quick Generators */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleGenerateDefault}
              className="flex-1 py-2 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              Default Password ({pbsAdminStore.generateStudentDefaultPassword(student.name)})
            </button>
            <button
              type="button"
              onClick={handleGenerateRandom}
              className="py-2 px-3 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold transition-colors cursor-pointer"
              title="Generate random secure password"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Copy Button */}
          <button
            type="button"
            onClick={handleCopyCredentials}
            className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Login Info Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-600" />
                <span>Copy Full Credentials Message</span>
              </>
            )}
          </button>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors cursor-pointer shadow-md shadow-emerald-600/20"
            >
              Save New Password
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
