import React, { useState } from 'react';
import { 
  X, 
  Send, 
  User, 
  Mail, 
  CheckCircle2, 
  Clock, 
  Sparkles,
  MessageSquare
} from 'lucide-react';
import { ManagedStudent, pbsAdminStore } from '../../utils/pbsAdminStore';
import { soundFx } from '../../utils/soundEffects';

interface AdminMessageStudentModalProps {
  student: ManagedStudent;
  onClose: () => void;
  onMessageSent: () => void;
}

export const AdminMessageStudentModal: React.FC<AdminMessageStudentModalProps> = ({
  student,
  onClose,
  onMessageSent
}) => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [successToast, setSuccessToast] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) return;

    setIsSending(true);
    setTimeout(() => {
      pbsAdminStore.sendMessageToStudent(student.studentId, subject.trim(), message.trim());
      soundFx.playSuccess();
      setIsSending(false);
      setSuccessToast(true);
      setTimeout(() => {
        onMessageSent();
        onClose();
      }, 1200);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-emerald-100 overflow-hidden animate-fadeIn text-slate-800">
        
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-emerald-800 via-teal-900 to-emerald-950 text-white flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 font-bold">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-white">Direct Message / Q&A Notice</h3>
              <p className="text-xs text-emerald-200">To: {student.name} ({student.email})</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Previous Message Thread Preview */}
        {student.messages && student.messages.length > 0 && (
          <div className="px-6 py-3 bg-slate-50 border-b border-slate-200 max-h-40 overflow-y-auto space-y-2 text-xs">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Conversation History</div>
            {student.messages.slice(0, 3).map((m) => (
              <div
                key={m.id}
                className={`p-2.5 rounded-xl border ${
                  m.sender === 'admin' 
                    ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950 ml-4' 
                    : 'bg-white border-slate-200 text-slate-800 mr-4'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-bold opacity-75 mb-1">
                  <span>{m.senderName} ({m.sender === 'admin' ? 'Admin' : 'Student'})</span>
                  <span>{m.timestamp}</span>
                </div>
                <div className="font-semibold text-slate-900">{m.subject}</div>
                <div className="text-[11px] text-slate-600 mt-0.5">{m.message}</div>
              </div>
            ))}
          </div>
        )}

        {/* Compose Form */}
        <form onSubmit={handleSend} className="p-6 space-y-4">
          {successToast ? (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Message dispatched to {student.name}'s Student Dashboard!</span>
            </div>
          ) : (
            <>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Subject / Notification Title</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Navisworks Clash Matrix Feedback & Placement Referral"
                  required
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold text-slate-900"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Message Content</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  placeholder="Write your academic guidance, doubt answer, or fee acknowledgment..."
                  required
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium text-slate-800"
                />
              </div>

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
                  disabled={isSending}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-md shadow-emerald-600/20"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSending ? 'Sending...' : 'Send Message'}</span>
                </button>
              </div>
            </>
          )}
        </form>

      </div>
    </div>
  );
};
