import React, { useState } from 'react';
import { 
  X, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  GraduationCap, 
  Briefcase, 
  Globe, 
  Linkedin, 
  Github, 
  Sparkles, 
  Check, 
  ShieldCheck, 
  Lock, 
  Sliders, 
  Bell, 
  CreditCard, 
  Download, 
  Award, 
  FileText,
  Camera,
  CheckCircle2,
  ExternalLink,
  KeyRound,
  AlertCircle
} from 'lucide-react';
import { StudentProfileData } from './types';
import { studentAuthUtil } from '../../utils/studentAuth';
import { soundFx } from '../../utils/soundEffects';

interface ProfileSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  profileData: StudentProfileData;
  onSaveProfile: (updated: StudentProfileData) => void;
  onOpenStudentIDCard: () => void;
  onOpenBonafideLetter: () => void;
}

export const ProfileSettingsModal: React.FC<ProfileSettingsModalProps> = ({
  isOpen,
  onClose,
  profileData,
  onSaveProfile,
  onOpenStudentIDCard,
  onOpenBonafideLetter
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'personal' | 'skills' | 'career' | 'preferences' | 'security'>('personal');
  const [formData, setFormData] = useState<StudentProfileData>(profileData);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isEditingPhoto, setIsEditingPhoto] = useState(false);
  const [photoUrlInput, setPhotoUrlInput] = useState(profileData?.avatarUrl || '');

  // Security password fields state
  const [currentPwdInput, setCurrentPwdInput] = useState('');
  const [newPwdInput, setNewPwdInput] = useState('');
  const [pwdError, setPwdError] = useState<string | null>(null);
  const [pwdSuccess, setPwdSuccess] = useState<string | null>(null);

  React.useEffect(() => {
    if (profileData) {
      setFormData(profileData);
      setPhotoUrlInput(profileData.avatarUrl || '');
    }
  }, [profileData]);

  if (!isOpen) return null;

  const handleInputChange = (field: keyof StudentProfileData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePreferenceToggle = (prefKey: keyof StudentProfileData['preferences']) => {
    setFormData((prev) => ({
      ...prev,
      preferences: {
        ...(prev.preferences || {}),
        [prefKey]: !prev.preferences?.[prefKey]
      }
    }));
  };

  const handleSkillProficiencyChange = (index: number, newProficiency: number) => {
    const updatedSkills = [...(formData.skillsProficiency || [])];
    if (updatedSkills[index]) {
      updatedSkills[index] = {
        ...updatedSkills[index],
        proficiency: newProficiency
      };
      setFormData((prev) => ({
        ...prev,
        skillsProficiency: updatedSkills
      }));
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(formData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 w-full max-w-5xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 px-6 py-5 text-white flex items-center justify-between border-b border-emerald-900/40 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight">Student Profile & Academic Settings</h2>
              <p className="text-xs text-slate-300">
                Manage your AEC credentials, BIM skill ratings, career targets, and student credentials.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Credentials & Action Bar */}
        <div className="bg-emerald-50/60 border-b border-emerald-100 px-6 py-3 flex flex-wrap items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-4 text-xs">
            <span className="font-bold text-slate-700">
              Student ID: <span className="text-emerald-800 font-mono bg-white px-2 py-0.5 rounded border border-emerald-200 font-bold">{formData.studentId}</span>
            </span>
            <span className="font-bold text-slate-700 hidden sm:inline">
              Roll No: <span className="text-slate-900 font-mono bg-white px-2 py-0.5 rounded border border-slate-200">{formData.rollNumber}</span>
            </span>
            <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-100 font-bold px-2.5 py-0.5 rounded-full text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5" /> Verified BIM Student
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenStudentIDCard}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-emerald-50 text-emerald-800 border border-emerald-300 rounded-lg text-xs font-bold transition-all shadow-2xs hover:shadow cursor-pointer"
            >
              <CreditCard className="w-3.5 h-3.5 text-emerald-600" />
              <span>Digital Student ID</span>
            </button>
            <button
              onClick={onOpenBonafideLetter}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-lg text-xs font-bold transition-all shadow-2xs hover:shadow cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-slate-500" />
              <span>Bonafide Certificate</span>
            </button>
          </div>
        </div>

        {/* Modal Layout: Sidebar Tabs + Content Area */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          
          {/* Navigation Sidebar */}
          <div className="w-full md:w-64 bg-slate-50 border-r border-slate-200 p-4 shrink-0 flex md:flex-col gap-1.5 overflow-x-auto md:overflow-x-visible">
            <button
              onClick={() => setActiveSubTab('personal')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left whitespace-nowrap cursor-pointer ${
                activeSubTab === 'personal'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-200/60 hover:text-slate-900'
              }`}
            >
              <User className="w-4 h-4 shrink-0" />
              <span>Personal & Academic</span>
            </button>

            <button
              onClick={() => setActiveSubTab('skills')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left whitespace-nowrap cursor-pointer ${
                activeSubTab === 'skills'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-200/60 hover:text-slate-900'
              }`}
            >
              <Sliders className="w-4 h-4 shrink-0" />
              <span>BIM Skills Matrix (8)</span>
            </button>

            <button
              onClick={() => setActiveSubTab('career')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left whitespace-nowrap cursor-pointer ${
                activeSubTab === 'career'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-200/60 hover:text-slate-900'
              }`}
            >
              <Briefcase className="w-4 h-4 shrink-0" />
              <span>Career & Portfolio</span>
            </button>

            <button
              onClick={() => setActiveSubTab('preferences')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left whitespace-nowrap cursor-pointer ${
                activeSubTab === 'preferences'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-200/60 hover:text-slate-900'
              }`}
            >
              <Bell className="w-4 h-4 shrink-0" />
              <span>Alerts & Timezone</span>
            </button>

            <button
              onClick={() => setActiveSubTab('security')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left whitespace-nowrap cursor-pointer ${
                activeSubTab === 'security'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-200/60 hover:text-slate-900'
              }`}
            >
              <Lock className="w-4 h-4 shrink-0" />
              <span>Security & Password</span>
            </button>

            {/* Student Mini Card in Sidebar */}
            <div className="hidden md:block mt-auto pt-4 border-t border-slate-200/80">
              <div className="bg-white p-3 rounded-xl border border-slate-200 text-center space-y-2">
                <div className="relative w-16 h-16 mx-auto rounded-full overflow-hidden border-2 border-emerald-500 shadow-sm">
                  <img 
                    src={formData.avatarUrl} 
                    alt={formData.fullName} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-xs truncate">{formData.fullName}</h4>
                  <p className="text-[10px] text-slate-500 truncate">{formData.educationDegree}</p>
                </div>
                <div className="bg-emerald-50 text-emerald-800 text-[10px] font-bold py-1 px-2 rounded-lg">
                  Rank #1 • 98.2% GPA
                </div>
              </div>
            </div>
          </div>

          {/* Form Content Area */}
          <div className="flex-1 p-6 sm:p-8 overflow-y-auto bg-white">
            <form onSubmit={handleSave} className="space-y-6">
              
              {/* TAB 1: Personal & Academic */}
              {activeSubTab === 'personal' && (
                <div className="space-y-6 animate-fadeIn">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Personal & Academic Information</h3>
                    <p className="text-xs text-slate-500">Your registered official details used on certificates and verification records.</p>
                  </div>

                  {/* Avatar upload / preview */}
                  <div className="flex items-center gap-5 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                    <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-emerald-500 shadow-sm shrink-0 bg-slate-200">
                      <img 
                        src={formData.avatarUrl} 
                        alt={formData.fullName} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-slate-700">Profile Photo</label>
                        <button
                          type="button"
                          onClick={() => setIsEditingPhoto(!isEditingPhoto)}
                          className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 cursor-pointer"
                        >
                          {isEditingPhoto ? 'Done' : 'Change Image URL'}
                        </button>
                      </div>
                      {isEditingPhoto ? (
                        <input
                          type="text"
                          value={formData.avatarUrl}
                          onChange={(e) => handleInputChange('avatarUrl', e.target.value)}
                          placeholder="Paste image URL..."
                          className="w-full text-xs px-3 py-1.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                        />
                      ) : (
                        <p className="text-xs text-slate-500">
                          Displays across PBS LMS Classroom, Leaderboard, and Digital Student ID.
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number (with Country Code)</label>
                      <input
                        type="text"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Date of Birth</label>
                      <input
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">Address & Location</label>
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        placeholder="Street Address, Area"
                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">City, State</label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Country</label>
                      <input
                        type="text"
                        value={formData.country}
                        onChange={(e) => handleInputChange('country', e.target.value)}
                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold"
                      />
                    </div>
                  </div>

                  <div className="border-t border-slate-200 pt-4 space-y-4">
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Academic Background</h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Degree / Qualification</label>
                        <input
                          type="text"
                          value={formData.educationDegree}
                          onChange={(e) => handleInputChange('educationDegree', e.target.value)}
                          placeholder="e.g. B.Tech Civil / B.Arch / Diploma"
                          className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">College / University</label>
                        <input
                          type="text"
                          value={formData.collegeUniversity}
                          onChange={(e) => handleInputChange('collegeUniversity', e.target.value)}
                          placeholder="e.g. COEP, VJTI, CEPT"
                          className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Graduation Year</label>
                        <input
                          type="text"
                          value={formData.graduationYear}
                          onChange={(e) => handleInputChange('graduationYear', e.target.value)}
                          className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">AEC Experience Level</label>
                        <input
                          type="text"
                          value={formData.experienceLevel}
                          onChange={(e) => handleInputChange('experienceLevel', e.target.value)}
                          placeholder="e.g. 3+ Years in BIM / Fresher"
                          className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: Skills Matrix */}
              {activeSubTab === 'skills' && (
                <div className="space-y-6 animate-fadeIn">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">BIM & Computational Skills Matrix</h3>
                    <p className="text-xs text-slate-500">
                      Adjust your self-assessment score or view your verified PBS instructor evaluation radar.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {(formData.skillsProficiency || []).map((skill, idx) => (
                      <div key={skill.skillName || idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <div>
                            <span className="font-bold text-slate-900">{skill.skillName}</span>
                            <span className="ml-2 text-[10px] font-semibold text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-200">
                              {skill.category}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-emerald-700 text-sm font-mono">{skill.proficiency}%</span>
                            <span className="text-[10px] text-slate-400">
                              {skill.proficiency >= 90 ? 'Master' : skill.proficiency >= 75 ? 'Advanced' : 'Intermediate'}
                            </span>
                          </div>
                        </div>

                        {/* Slider */}
                        <div className="flex items-center gap-3">
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={skill.proficiency}
                            onChange={(e) => handleSkillProficiencyChange(idx, parseInt(e.target.value))}
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div className="text-xs text-emerald-900 space-y-1">
                      <p className="font-bold">PBS Verified Assessment</p>
                      <p className="text-emerald-700">
                        Scores above 85% in Revit & Navisworks automatically unlock the PBS International Placement fast-track for Tier-1 consulting firms in Dubai & Saudi Arabia.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: Career & Portfolio */}
              {activeSubTab === 'career' && (
                <div className="space-y-6 animate-fadeIn">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Career Targets & Digital Portfolio Links</h3>
                    <p className="text-xs text-slate-500">Shared with hiring partners during placement drives and resume audits.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Current Job Role / Status</label>
                      <input
                        type="text"
                        value={formData.currentCompanyRole}
                        onChange={(e) => handleInputChange('currentCompanyRole', e.target.value)}
                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Target Job Role</label>
                      <input
                        type="text"
                        value={formData.targetCareerRole}
                        onChange={(e) => handleInputChange('targetCareerRole', e.target.value)}
                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Expected CTC / Salary Range</label>
                      <input
                        type="text"
                        value={formData.expectedSalary}
                        onChange={(e) => handleInputChange('expectedSalary', e.target.value)}
                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Target Locations</label>
                      <input
                        type="text"
                        value={Array.isArray(formData.targetLocations) ? formData.targetLocations.join(', ') : (formData.targetLocations || '')}
                        onChange={(e) => handleInputChange('targetLocations', e.target.value.split(',').map(s => s.trim()))}
                        placeholder="Dubai, Riyadh, UK, Pune"
                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">Professional Bio</label>
                      <textarea
                        rows={3}
                        value={formData.bio}
                        onChange={(e) => handleInputChange('bio', e.target.value)}
                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold"
                      />
                    </div>
                  </div>

                  <div className="border-t border-slate-200 pt-4 space-y-4">
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Social & Portfolio URLs</h4>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                          <Globe className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Personal BIM Portfolio Website</span>
                        </label>
                        <input
                          type="url"
                          value={formData.portfolioUrl}
                          onChange={(e) => handleInputChange('portfolioUrl', e.target.value)}
                          className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono text-slate-800"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                          <Linkedin className="w-3.5 h-3.5 text-sky-600" />
                          <span>LinkedIn Profile URL</span>
                        </label>
                        <input
                          type="url"
                          value={formData.linkedinUrl}
                          onChange={(e) => handleInputChange('linkedinUrl', e.target.value)}
                          className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono text-slate-800"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                          <Github className="w-3.5 h-3.5 text-slate-800" />
                          <span>GitHub / Dynamo Scripts Repository</span>
                        </label>
                        <input
                          type="url"
                          value={formData.githubUrl}
                          onChange={(e) => handleInputChange('githubUrl', e.target.value)}
                          className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono text-slate-800"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: Preferences & Alerts */}
              {activeSubTab === 'preferences' && (
                <div className="space-y-6 animate-fadeIn">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Notification & Study Preferences</h3>
                    <p className="text-xs text-slate-500">Configure how you receive live class links, mentor feedback alerts, and assignment due dates.</p>
                  </div>

                  <div className="space-y-3">
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                      <div className="space-y-0.5">
                        <h4 className="text-xs font-bold text-slate-900">WhatsApp Class Reminders</h4>
                        <p className="text-[11px] text-slate-500">Receive Zoom live session links 15 minutes before batch kickoff.</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handlePreferenceToggle('whatsappReminders')}
                        className={`w-12 h-6 rounded-full transition-colors p-1 cursor-pointer flex items-center ${
                          formData.preferences.whatsappReminders ? 'bg-emerald-600 justify-end' : 'bg-slate-300 justify-start'
                        }`}
                      >
                        <span className="w-4 h-4 rounded-full bg-white shadow-sm"></span>
                      </button>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                      <div className="space-y-0.5">
                        <h4 className="text-xs font-bold text-slate-900">Email Mentor Digest</h4>
                        <p className="text-[11px] text-slate-500">Weekly report card on task evaluations, grades, and capstone progress.</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handlePreferenceToggle('emailDigest')}
                        className={`w-12 h-6 rounded-full transition-colors p-1 cursor-pointer flex items-center ${
                          formData.preferences.emailDigest ? 'bg-emerald-600 justify-end' : 'bg-slate-300 justify-start'
                        }`}
                      >
                        <span className="w-4 h-4 rounded-full bg-white shadow-sm"></span>
                      </button>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                      <div className="space-y-0.5">
                        <h4 className="text-xs font-bold text-slate-900">Google Calendar / Outlook Sync</h4>
                        <p className="text-[11px] text-slate-500">Auto-add all 50 live sessions and 1-on-1 mentor reviews to your phone calendar.</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handlePreferenceToggle('calendarSync')}
                        className={`w-12 h-6 rounded-full transition-colors p-1 cursor-pointer flex items-center ${
                          formData.preferences.calendarSync ? 'bg-emerald-600 justify-end' : 'bg-slate-300 justify-start'
                        }`}
                      >
                        <span className="w-4 h-4 rounded-full bg-white shadow-sm"></span>
                      </button>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Timezone</label>
                        <select
                          value={formData.preferences.timezone}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            preferences: { ...prev.preferences, timezone: e.target.value }
                          }))}
                          className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 font-semibold"
                        >
                          <option value="Asia/Kolkata (IST +5:30)">Asia/Kolkata (IST +5:30)</option>
                          <option value="Asia/Dubai (GST +4:00)">Asia/Dubai (GST +4:00)</option>
                          <option value="Asia/Riyadh (AST +3:00)">Asia/Riyadh (AST +3:00)</option>
                          <option value="Europe/London (BST +1:00)">Europe/London (BST +1:00)</option>
                          <option value="America/New_York (EST -5:00)">America/New_York (EST -5:00)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Preferred Language</label>
                        <select
                          value={formData.preferences.language}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            preferences: { ...prev.preferences, language: e.target.value }
                          }))}
                          className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 font-semibold"
                        >
                          <option value="English">English (Technical BIM Standard)</option>
                          <option value="English + Hindi">English + Hindi (Bilingual Live Support)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: Security */}
              {activeSubTab === 'security' && (
                <div className="space-y-6 animate-fadeIn">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Security & Access Credentials</h3>
                    <p className="text-xs text-slate-500">Protect your PBS LMS learning access, payment receipts, and capstone repository.</p>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                          <KeyRound className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Change Student Password</span>
                        </h4>
                        <button
                          type="button"
                          onClick={() => {
                            setCurrentPwdInput(studentAuthUtil.getActivePassword());
                          }}
                          className="text-[10px] text-emerald-600 hover:text-emerald-800 font-bold cursor-pointer"
                        >
                          Auto-fill current pwd
                        </button>
                      </div>

                      {pwdError && (
                        <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-1.5 font-medium">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{pwdError}</span>
                        </div>
                      )}

                      {pwdSuccess && (
                        <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-1.5 font-bold">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{pwdSuccess}</span>
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="password"
                          value={currentPwdInput}
                          onChange={(e) => setCurrentPwdInput(e.target.value)}
                          placeholder="Current Password (e.g. pravinyadav@123)"
                          className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500"
                        />
                        <input
                          type="password"
                          value={newPwdInput}
                          onChange={(e) => setNewPwdInput(e.target.value)}
                          placeholder="New Password (min 6 chars)"
                          className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-slate-400">
                          Last Updated: {studentAuthUtil.getLastPasswordChangeDate()}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setPwdError(null);
                            setPwdSuccess(null);
                            const res = studentAuthUtil.updatePassword(currentPwdInput, newPwdInput);
                            if (res.success) {
                              soundFx.playSuccess();
                              setPwdSuccess(res.message);
                              setCurrentPwdInput('');
                              setNewPwdInput('');
                              setTimeout(() => setPwdSuccess(null), 3500);
                            } else {
                              soundFx.playClick();
                              setPwdError(res.message);
                            }
                          }}
                          className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition-colors cursor-pointer shadow-2xs"
                        >
                          Update Password
                        </button>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                      <div className="space-y-0.5">
                        <h4 className="text-xs font-bold text-slate-900">Two-Factor Authentication (2FA)</h4>
                        <p className="text-[11px] text-slate-500">Require an OTP sent to your registered email during portal login.</p>
                      </div>
                      <span className="bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-full text-[10px]">
                        Enabled (Email OTP)
                      </span>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                      <h4 className="text-xs font-bold text-slate-900">Active Login Sessions</h4>
                      <div className="flex items-center justify-between text-xs p-2 bg-white rounded-lg border border-slate-200">
                        <div>
                          <p className="font-semibold text-slate-800">Chrome on Windows (Current Device)</p>
                          <p className="text-[10px] text-slate-400">Pune, India • IP 103.21.24.89</p>
                        </div>
                        <span className="text-emerald-600 font-bold text-[11px]">Active Now</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom Action / Submit buttons */}
              <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                {saveSuccess ? (
                  <div className="inline-flex items-center gap-2 text-emerald-700 text-xs font-bold bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Profile settings successfully saved & updated!</span>
                  </div>
                ) : (
                  <p className="text-xs text-slate-400">Changes update immediately across your student dashboard.</p>
                )}

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm hover:shadow transition-all cursor-pointer inline-flex items-center justify-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>

            </form>
          </div>
        </div>

      </div>
    </div>
  );
};
