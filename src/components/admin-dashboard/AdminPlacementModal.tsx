import React, { useState } from 'react';
import { 
  X, 
  Briefcase, 
  Building2, 
  CheckCircle2, 
  Plus, 
  Trash2, 
  Sparkles, 
  Save, 
  Globe, 
  Calendar, 
  Award, 
  ExternalLink 
} from 'lucide-react';
import { ManagedStudent, pbsAdminStore } from '../../utils/pbsAdminStore';
import { soundFx } from '../../utils/soundEffects';

interface AdminPlacementModalProps {
  student: ManagedStudent;
  onClose: () => void;
  onUpdated: () => void;
}

export const AdminPlacementModal: React.FC<AdminPlacementModalProps> = ({
  student,
  onClose,
  onUpdated
}) => {
  const currentPlacement = student.placement || {
    studentId: student.studentId,
    targetRole: 'Senior BIM Coordinator',
    targetLocations: ['Dubai / UAE', 'Riyadh / Saudi Arabia (NEOM)', 'United Kingdom', 'Pune / Bangalore'],
    expectedSalary: '₹14.5 - ₹18.0 LPA / AED 18,000 - 22,000 pm',
    portfolioUrl: 'https://pravinyadav-bim.portfolio.site',
    resumeStatus: 'Verified',
    mockInterviewScore: 96,
    mockInterviewFeedback: 'Exceptional grasp of ISO 19650 BEP workflows, Navisworks clash tolerance, and MEP family creation.',
    mockInterviewDate: 'Aug 24, 2026',
    readinessStatus: 'Ready for MNC Placement',
    referredCompanies: [
      {
        companyName: 'AtkinsRéalis (Dubai / UK)',
        role: 'BIM Coordinator - MEP Systems',
        location: 'Dubai, UAE',
        status: 'Technical Round Cleared',
        interviewDate: 'Sept 08, 2026'
      }
    ]
  };

  const [targetRole, setTargetRole] = useState(currentPlacement.targetRole);
  const [expectedSalary, setExpectedSalary] = useState(currentPlacement.expectedSalary);
  const [resumeStatus, setResumeStatus] = useState(currentPlacement.resumeStatus);
  const [readinessStatus, setReadinessStatus] = useState(currentPlacement.readinessStatus);
  const [mockScore, setMockScore] = useState(currentPlacement.mockInterviewScore);
  const [mockFeedback, setMockFeedback] = useState(currentPlacement.mockInterviewFeedback);
  const [portfolioUrl, setPortfolioUrl] = useState(currentPlacement.portfolioUrl);
  const [companies, setCompanies] = useState(currentPlacement.referredCompanies || []);

  // Form for adding a new company referral
  const [newCompany, setNewCompany] = useState('');
  const [newRole, setNewRole] = useState('BIM Coordinator');
  const [newLocation, setNewLocation] = useState('Dubai / UAE');
  const [newStatus, setNewStatus] = useState<'Shortlisted' | 'Interview Scheduled' | 'Technical Round Cleared' | 'Offer Letter Released'>('Shortlisted');
  const [newDate, setNewDate] = useState('');

  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleAddCompany = () => {
    if (!newCompany.trim()) return;
    soundFx.playClick();
    setCompanies([
      ...companies,
      {
        companyName: newCompany.trim(),
        role: newRole.trim(),
        location: newLocation.trim(),
        status: newStatus,
        interviewDate: newDate || undefined
      }
    ]);
    setNewCompany('');
    setNewDate('');
  };

  const handleRemoveCompany = (idx: number) => {
    soundFx.playClick();
    setCompanies(companies.filter((_, i) => i !== idx));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    setTimeout(() => {
      pbsAdminStore.updateStudentPlacement(student.studentId, {
        targetRole,
        expectedSalary,
        resumeStatus,
        readinessStatus,
        mockInterviewScore: Number(mockScore),
        mockInterviewFeedback: mockFeedback,
        portfolioUrl,
        referredCompanies: companies
      });

      soundFx.playSuccess();
      setIsSaving(false);
      setSavedSuccess(true);
      setTimeout(() => {
        onUpdated();
        onClose();
      }, 1000);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-emerald-100 overflow-hidden animate-fadeIn max-h-[92vh] flex flex-col text-slate-800">
        
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-emerald-800 via-teal-900 to-emerald-950 text-white flex items-center justify-between shrink-0 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 font-bold">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-white">MNC Placement & Interview Pipeline</h3>
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

        {/* Form Body */}
        <form onSubmit={handleSave} className="p-6 space-y-5 overflow-y-auto flex-1">
          
          {savedSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Placement record and referral pipeline saved successfully!</span>
            </div>
          )}

          {/* Readiness & Target Role */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Placement Readiness Status</label>
              <select
                value={readinessStatus}
                onChange={(e) => setReadinessStatus(e.target.value as any)}
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold text-slate-800"
              >
                <option value="Ready for MNC Placement">Ready for MNC Placement (Certified)</option>
                <option value="In Training">In Training (Course Ongoing)</option>
                <option value="Portfolio Audit Complete">Portfolio Audit Complete</option>
                <option value="Mock Interview Scheduled">Mock Interview Scheduled</option>
                <option value="Offer Received">Offer Received / Placed</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Target Role in Industry</label>
              <input
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                placeholder="e.g. Senior BIM Coordinator - MEP Lead"
                required
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold text-slate-800"
              />
            </div>
          </div>

          {/* Salary & Resume Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Expected Salary Band</label>
              <input
                type="text"
                value={expectedSalary}
                onChange={(e) => setExpectedSalary(e.target.value)}
                placeholder="e.g. ₹14.5 - ₹18.0 LPA / AED 18,000 pm"
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium text-slate-800"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Resume & CV Verification</label>
              <select
                value={resumeStatus}
                onChange={(e) => setResumeStatus(e.target.value as any)}
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium text-slate-800"
              >
                <option value="Verified">Verified by PBS Lead Auditor</option>
                <option value="Under Review">Under Review</option>
                <option value="Needs Update">Needs Update</option>
              </select>
            </div>
          </div>

          {/* Technical Mock Score & Feedback */}
          <div className="p-4 bg-emerald-50/50 border border-emerald-100 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900">Technical Mock Interview Assessment</span>
              <span className="text-xs font-extrabold text-emerald-700">Score: {mockScore}/100</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-600">Mock Score (0-100)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={mockScore}
                  onChange={(e) => setMockScore(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-bold text-slate-800"
                />
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="text-[11px] font-bold text-slate-600">Portfolio Live URL</label>
                <input
                  type="url"
                  value={portfolioUrl}
                  onChange={(e) => setPortfolioUrl(e.target.value)}
                  placeholder="https://pravinyadav-bim.portfolio.site"
                  className="w-full px-3 py-2 text-xs font-mono bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-600">Interviewer Feedback & Recommendation</label>
              <textarea
                value={mockFeedback}
                onChange={(e) => setMockFeedback(e.target.value)}
                rows={2}
                placeholder="Notes on ISO 19650 knowledge, Navisworks clash handling..."
                className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800"
              />
            </div>
          </div>

          {/* Referred Companies Pipeline */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-900">
                Corporate Referral & Interview Pipeline ({companies.length})
              </label>
            </div>

            {/* List */}
            {companies.length > 0 ? (
              <div className="space-y-2">
                {companies.map((comp, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="font-bold text-slate-900 flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{comp.companyName}</span>
                      </div>
                      <div className="text-[11px] text-slate-600 mt-0.5">
                        {comp.role} • {comp.location}
                        {comp.interviewDate && ` • Interview: ${comp.interviewDate}`}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 font-bold text-[10px] rounded-full">
                        {comp.status}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveCompany(idx)}
                        className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        title="Remove Referral"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-3 bg-slate-50 border border-dashed border-slate-200 rounded-xl text-center text-xs text-slate-500">
                No company referrals added yet. Use the form below to forward candidate profile.
              </div>
            )}

            {/* Add New Referral Box */}
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2.5">
              <div className="text-xs font-bold text-slate-700">+ Add New Company Referral</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="text"
                  value={newCompany}
                  onChange={(e) => setNewCompany(e.target.value)}
                  placeholder="Company (e.g. AtkinsRéalis Dubai)"
                  className="px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <input
                  type="text"
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  placeholder="Designation (e.g. BIM Coordinator)"
                  className="px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input
                  type="text"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  placeholder="Location (e.g. Dubai / Riyadh)"
                  className="px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as any)}
                  className="px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                >
                  <option value="Shortlisted">Shortlisted</option>
                  <option value="Interview Scheduled">Interview Scheduled</option>
                  <option value="Technical Round Cleared">Technical Round Cleared</option>
                  <option value="Offer Letter Released">Offer Letter Released</option>
                </select>
                <button
                  type="button"
                  onClick={handleAddCompany}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1 cursor-pointer transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add to Pipeline</span>
                </button>
              </div>
            </div>

          </div>

          {/* Footer Actions */}
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
              <span>{isSaving ? 'Saving...' : 'Save Placement Data'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
