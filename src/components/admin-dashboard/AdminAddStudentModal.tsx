import React, { useState } from 'react';
import { 
  X, 
  UserPlus, 
  Mail, 
  Phone, 
  BookOpen, 
  IndianRupee, 
  KeyRound, 
  Sparkles, 
  CheckCircle2,
  Lock,
  Save
} from 'lucide-react';
import { pbsAdminStore, ManagedStudent } from '../../utils/pbsAdminStore';
import { soundFx } from '../../utils/soundEffects';

interface AdminAddStudentModalProps {
  onClose: () => void;
  onStudentAdded: () => void;
}

export const AdminAddStudentModal: React.FC<AdminAddStudentModalProps> = ({
  onClose,
  onStudentAdded
}) => {
  const [fullName, setFullName] = useState('');
  const [personalEmail, setPersonalEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [specialization, setSpecialization] = useState('Autodesk Revit MEP Masterclass (LOD 300 - 500)');
  const [batchMonthYear, setBatchMonthYear] = useState('09/2026');
  const [totalFee, setTotalFee] = useState<number>(14999);
  const [paidAmount, setPaidAmount] = useState<number>(7500);

  // Auto generated preview
  const generatedEmail = fullName ? pbsAdminStore.generateStudentEmail(fullName) : 'student.name@pbs.com';
  const generatedPassword = fullName ? pbsAdminStore.generateStudentDefaultPassword(fullName) : 'student@123';

  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) return;

    setIsSaving(true);
    setTimeout(() => {
      const studentIdNum = Math.floor(1000 + Math.random() * 9000);
      const studentId = `PBS-STU-2026-${studentIdNum}`;
      const rollNumber = `PBS/2026/BIM-${Math.floor(100 + Math.random() * 900)}`;

      const pending = Math.max(0, totalFee - paidAmount);
      const pStatus = pending === 0 ? 'Full Paid' : paidAmount > 0 ? 'Part Paid' : 'Pending';

      const newStudent = {
        studentId,
        rollNumber,
        name: fullName.trim(),
        email: generatedEmail,
        personalEmail: personalEmail.trim() || undefined,
        googleEmailId: personalEmail.trim() || undefined,
        password: generatedPassword,
        phone: phone.trim() || '+91 9800000000',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        specialization,
        batch: `${batchMonthYear} Weekend Cohort`,
        enrolledCourseIds: ['c1'],
        enrolledCourseTitles: [specialization],
        attendancePercent: 100,
        totalFee: Number(totalFee),
        paidAmount: Number(paidAmount),
        pendingBalance: pending,
        paymentStatus: pStatus as any,
        capstoneStatus: 'Stage 1: Revit Project Setup Initialized',
        capstoneGrade: 'In Progress',
        growthScore: 85,
        registrationDate: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
        placement: {
          studentId,
          targetRole: 'BIM Engineer',
          targetLocations: ['Pune / Dubai'],
          expectedSalary: '₹12.0 LPA',
          portfolioUrl: '',
          resumeStatus: 'Under Review' as any,
          mockInterviewScore: 80,
          mockInterviewFeedback: 'Initial enrollment complete. Capstone pending.',
          mockInterviewDate: '',
          readinessStatus: 'In Training' as any,
          referredCompanies: []
        },
        messages: [
          {
            id: `msg-welcome-${Date.now()}`,
            sender: 'admin' as const,
            senderName: 'PBS Academic Director',
            timestamp: 'Just now',
            subject: 'Welcome to Pragmatic BIM Solution Academy!',
            message: `Welcome ${fullName}! Your institutional account has been provisioned. Access your live masterclasses, Microsoft Drive & Google Drive video lectures under Enrolled Courses.`,
            isRead: false
          }
        ]
      };

      pbsAdminStore.addStudent(newStudent);
      pbsAdminStore.syncWithCloudServer(true);
      soundFx.playSuccess();
      setIsSaving(false);
      setSavedSuccess(true);
      setTimeout(() => {
        onStudentAdded();
        onClose();
      }, 1200);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-emerald-100 overflow-hidden animate-fadeIn max-h-[92vh] flex flex-col text-slate-800">
        
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-emerald-800 via-teal-900 to-emerald-950 text-white flex items-center justify-between shrink-0 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 font-bold">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-white">Enroll New Student to Cohort</h3>
              <p className="text-xs text-emerald-200">Provision PBS email, password, and course allocation</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
          
          {savedSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Student provisioned successfully! Credentials logged into PBS directory.</span>
            </div>
          )}

          {/* Student Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Pravin Yadav"
                required
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold text-slate-900"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Phone Number (WhatsApp)</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98220 12345"
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium text-slate-800"
              />
            </div>
          </div>

          {/* Auto Generated Credentials Preview */}
          <div className="p-4 bg-emerald-50/50 border border-emerald-100 rounded-2xl space-y-2">
            <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Auto-Provisioned PBS Login Credentials</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 bg-white rounded-xl border border-emerald-100">
                <div className="text-[10px] text-slate-500 font-bold uppercase">PBS Institutional Email</div>
                <div className="font-mono text-emerald-700 font-bold mt-0.5 truncate">{generatedEmail}</div>
              </div>

              <div className="p-2.5 bg-white rounded-xl border border-emerald-100">
                <div className="text-[10px] text-slate-500 font-bold uppercase">Default Access Password</div>
                <div className="font-mono text-slate-900 font-bold mt-0.5">{generatedPassword}</div>
              </div>
            </div>
          </div>

          {/* Specialization Course */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Enrolled BIM Specialization Track</label>
            <select
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold text-slate-800"
            >
              <option value="Autodesk Revit MEP Masterclass (LOD 300 - 500)">Autodesk Revit MEP Masterclass (LOD 300 - 500)</option>
              <option value="Autodesk Revit Architecture & Structural Modeling">Autodesk Revit Architecture & Structural Modeling</option>
              <option value="Navisworks Manage 4D/5D Simulation & Clash Matrix">Navisworks Manage 4D/5D Simulation & Clash Matrix</option>
              <option value="Computational Dynamo BIM & Python Automation">Computational Dynamo BIM & Python Automation</option>
              <option value="ISO 19650 Global BIM Management & BEP">ISO 19650 Global BIM Management & BEP</option>
            </select>
          </div>

          {/* Fee Accounting */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Total Agreed Course Fee (₹)</label>
              <div className="relative">
                <IndianRupee className="w-4 h-4 text-emerald-600 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="number"
                  value={totalFee}
                  onChange={(e) => setTotalFee(Number(e.target.value))}
                  required
                  className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-bold text-slate-800"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Initial Paid Amount (₹)</label>
              <div className="relative">
                <IndianRupee className="w-4 h-4 text-emerald-600 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="number"
                  value={paidAmount}
                  onChange={(e) => setPaidAmount(Number(e.target.value))}
                  required
                  className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-bold text-emerald-700"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-md shadow-emerald-600/20"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? 'Enrolling...' : 'Enroll Student & Generate Access'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
