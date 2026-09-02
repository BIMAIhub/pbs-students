import React, { useState, useEffect } from 'react';
import {
  X,
  Share2,
  Copy,
  Check,
  Globe,
  Edit3,
  Eye,
  ExternalLink,
  Plus,
  Trash2,
  Linkedin,
  Github,
  Mail,
  Phone,
  MapPin,
  Award,
  Sparkles,
  Layers,
  Code,
  Building,
  CheckCircle2,
  FileCheck,
  QrCode
} from 'lucide-react';
import { pbsAdminStore, StudentPortfolioProfile } from '../../utils/pbsAdminStore';
import { soundFx } from '../../utils/soundEffects';

interface StudentPortfolioModalProps {
  studentId: string;
  studentName: string;
  onClose: () => void;
  initialMode?: 'view' | 'edit';
}

export const StudentPortfolioModal: React.FC<StudentPortfolioModalProps> = ({
  studentId,
  studentName,
  onClose,
  initialMode = 'view'
}) => {
  const [mode, setMode] = useState<'view' | 'edit'>(initialMode);
  const [portfolio, setPortfolio] = useState<StudentPortfolioProfile | null>(null);
  const [copied, setCopied] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Form states for editing
  const [headline, setHeadline] = useState('');
  const [bio, setBio] = useState('');
  const [skills, setSkills] = useState<{ name: string; level: number; category: string }[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [socialLinks, setSocialLinks] = useState({
    linkedin: '',
    github: '',
    portfolio: '',
    email: '',
    phone: '',
    location: ''
  });

  useEffect(() => {
    const data = pbsAdminStore.getStudentPortfolio(studentId);
    setPortfolio(data);
    setHeadline(data.headline || '');
    setBio(data.bio || '');
    setSkills(data.skills || []);
    setProjects(data.featuredProjects || []);
    setSocialLinks(data.socialLinks || {
      linkedin: '',
      github: '',
      portfolio: '',
      email: '',
      phone: '',
      location: ''
    });
  }, [studentId]);

  if (!portfolio) return null;

  const portfolioUrl = `${window.location.origin}/portfolio/${studentId.toLowerCase()}`;

  const handleCopyLink = () => {
    soundFx.playClick();
    navigator.clipboard.writeText(portfolioUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSavePortfolio = () => {
    soundFx.playSuccess();
    const updated: StudentPortfolioProfile = {
      studentId,
      isPublic: true,
      headline,
      bio,
      skills,
      featuredProjects: projects,
      socialLinks
    };
    pbsAdminStore.saveStudentPortfolio(studentId, updated);
    setPortfolio(updated);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      setMode('view');
    }, 1200);
  };

  const handleAddSkill = () => {
    setSkills(prev => [...prev, { name: 'New BIM Skill', level: 90, category: 'Authoring' }]);
  };

  const handleRemoveSkill = (index: number) => {
    setSkills(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddProject = () => {
    setProjects(prev => [
      ...prev,
      {
        id: `proj-${Date.now()}`,
        title: 'New BIM Infrastructure Project',
        category: 'Commercial MEP / Coordination',
        description: 'Detailed description of the BIM modeling, clash resolution, and LOD deliverables.',
        lodLevel: 'LOD 400',
        softwareUsed: ['Revit 2026', 'Navisworks'],
        imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80',
        projectUrl: 'https://github.com'
      }
    ]);
  };

  const handleRemoveProject = (index: number) => {
    setProjects(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-4xl w-full p-5 sm:p-8 shadow-2xl space-y-6 max-h-[92vh] flex flex-col border border-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center shadow-inner">
              <Globe className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">Student Public BIM Portfolio</h3>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full uppercase">
                  Publicly Shareable Link
                </span>
              </div>
              <p className="text-xs text-slate-500">Live verified credentials, project showcase, and BIM specializations</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* View / Edit Mode Switch */}
            <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 border border-slate-200">
              <button
                onClick={() => {
                  soundFx.playClick();
                  setMode('view');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  mode === 'view' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                Live Showcase
              </button>
              <button
                onClick={() => {
                  soundFx.playClick();
                  setMode('edit');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  mode === 'edit' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <Edit3 className="w-3.5 h-3.5" />
                Edit Profile
              </button>
            </div>

            <button
              onClick={() => {
                soundFx.playClick();
                onClose();
              }}
              className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Shareable Link Bar */}
        <div className="bg-gradient-to-r from-indigo-50 via-slate-50 to-emerald-50 p-3.5 sm:p-4 rounded-2xl border border-indigo-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0 w-full sm:w-auto">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
              <Share2 className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] uppercase font-bold text-indigo-700">Public Access Portfolio URL</span>
              <p className="text-xs font-mono text-slate-700 truncate font-semibold">{portfolioUrl}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end flex-wrap">
            <a
              href={portfolioUrl}
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
              title="Open standalone public portfolio page in a new window"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Open Public URL</span>
            </a>

            <button
              onClick={handleCopyLink}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs ${
                copied ? 'bg-emerald-600 text-white' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Link Copied!' : 'Copy Share URL'}
            </button>

            <a
              href={`https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(portfolioUrl)}`}
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-2 bg-[#0077B5] hover:bg-[#006097] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5" />
              Share
            </a>
          </div>
        </div>

        {/* Modal Main Body */}
        <div className="flex-1 overflow-y-auto pr-1">
          {mode === 'view' ? (
            /* ================= LIVE SHOWCASE VIEW ================= */
            <div className="space-y-6">
              {/* Profile Card */}
              <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 rounded-3xl relative overflow-hidden shadow-lg border border-slate-800">
                <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-indigo-400/50 shadow-xl shrink-0 bg-slate-800">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
                      alt={studentName}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h3 className="text-2xl font-black tracking-tight">{studentName}</h3>
                      <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Verified BIM Specialist
                      </span>
                    </div>

                    <p className="text-sm font-semibold text-indigo-200">{portfolio.headline}</p>

                    <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">{portfolio.bio}</p>

                    {/* Social Meta */}
                    <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-300">
                      {portfolio.socialLinks?.location && (
                        <div className="flex items-center gap-1 text-slate-300">
                          <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                          <span>{portfolio.socialLinks.location}</span>
                        </div>
                      )}
                      {portfolio.socialLinks?.email && (
                        <a href={`mailto:${portfolio.socialLinks.email}`} className="flex items-center gap-1 hover:text-white transition-colors">
                          <Mail className="w-3.5 h-3.5 text-indigo-400" />
                          <span>{portfolio.socialLinks.email}</span>
                        </a>
                      )}
                      {portfolio.socialLinks?.linkedin && (
                        <a href={portfolio.socialLinks.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-indigo-300 hover:text-white transition-colors font-semibold">
                          <Linkedin className="w-3.5 h-3.5" />
                          <span>LinkedIn</span>
                        </a>
                      )}
                      {portfolio.socialLinks?.github && (
                        <a href={portfolio.socialLinks.github} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors">
                          <Github className="w-3.5 h-3.5" />
                          <span>GitHub</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills Matrix */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-600" />
                    Verified Technical BIM Capabilities
                  </h4>
                  <span className="text-[11px] text-slate-400">Evaluated on LMS Capstones</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {portfolio.skills.map((s, idx) => (
                    <div key={idx} className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-900">{s.name}</span>
                        <span className="font-mono font-bold text-indigo-600">{s.level}%</span>
                      </div>
                      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                          style={{ width: `${s.level}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-slate-400 uppercase font-semibold">{s.category}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Featured Projects */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Building className="w-4 h-4 text-indigo-600" />
                  Featured Industry Deliverables & Capstones
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {portfolio.featuredProjects.map((p, pIdx) => (
                    <div
                      key={p.id || pIdx}
                      className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col"
                    >
                      <div className="h-40 bg-slate-100 relative overflow-hidden">
                        <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover" />
                        <span className="absolute top-2.5 right-2.5 bg-slate-900/85 text-white text-[10px] font-bold px-2 py-0.5 rounded-lg backdrop-blur-xs">
                          {p.lodLevel}
                        </span>
                      </div>

                      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-indigo-600 tracking-wider">
                            {p.category}
                          </span>
                          <h5 className="font-bold text-slate-900 text-sm mt-0.5">{p.title}</h5>
                          <p className="text-xs text-slate-600 mt-1 leading-relaxed">{p.description}</p>
                        </div>

                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                          <div className="flex flex-wrap gap-1">
                            {p.softwareUsed?.map((sw: string, sIdx: number) => (
                              <span
                                key={sIdx}
                                className="bg-slate-100 text-slate-700 text-[10px] px-2 py-0.5 rounded-md font-medium"
                              >
                                {sw}
                              </span>
                            ))}
                          </div>

                          {p.projectUrl && (
                            <a
                              href={p.projectUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-xs text-indigo-600 font-bold flex items-center gap-1 hover:underline"
                            >
                              Details
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* ================= EDIT MODE ================= */
            <div className="space-y-6">
              {/* Basic Details */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                <h4 className="text-sm font-bold text-slate-900">Headline & Professional Bio</h4>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Headline</label>
                    <input
                      type="text"
                      value={headline}
                      onChange={e => setHeadline(e.target.value)}
                      placeholder="e.g. Senior BIM Coordinator & MEP Specialist"
                      className="w-full px-3.5 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Professional Summary / Bio</label>
                    <textarea
                      rows={3}
                      value={bio}
                      onChange={e => setBio(e.target.value)}
                      placeholder="Summary of experience, BIM engineering capabilities, and project delivery goals..."
                      className="w-full px-3.5 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Social Links & Contact */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                <h4 className="text-sm font-bold text-slate-900">Contact & Social Profiles</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">LinkedIn Profile</label>
                    <input
                      type="text"
                      value={socialLinks.linkedin}
                      onChange={e => setSocialLinks({ ...socialLinks, linkedin: e.target.value })}
                      placeholder="https://linkedin.com/in/..."
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">GitHub / BIM Repo</label>
                    <input
                      type="text"
                      value={socialLinks.github}
                      onChange={e => setSocialLinks({ ...socialLinks, github: e.target.value })}
                      placeholder="https://github.com/..."
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={socialLinks.email}
                      onChange={e => setSocialLinks({ ...socialLinks, email: e.target.value })}
                      placeholder="pravin.yadav@pbs.com"
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Location</label>
                    <input
                      type="text"
                      value={socialLinks.location}
                      onChange={e => setSocialLinks({ ...socialLinks, location: e.target.value })}
                      placeholder="Pune / Bangalore & Dubai"
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Skills Editor */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900">Technical Skills Matrix</h4>
                  <button
                    onClick={handleAddSkill}
                    className="px-3 py-1 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-lg text-xs font-bold flex items-center gap-1 hover:bg-indigo-100 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add Skill
                  </button>
                </div>

                <div className="space-y-2">
                  {skills.map((s, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-slate-200">
                      <input
                        type="text"
                        value={s.name}
                        onChange={e => {
                          const copy = [...skills];
                          copy[idx].name = e.target.value;
                          setSkills(copy);
                        }}
                        className="flex-1 px-2.5 py-1 text-xs border border-slate-200 rounded-lg"
                        placeholder="Skill Name"
                      />
                      <input
                        type="number"
                        min="1"
                        max="100"
                        value={s.level}
                        onChange={e => {
                          const copy = [...skills];
                          copy[idx].level = Number(e.target.value);
                          setSkills(copy);
                        }}
                        className="w-16 px-2 py-1 text-xs border border-slate-200 rounded-lg font-mono text-center"
                      />
                      <span className="text-xs text-slate-400 font-bold">%</span>
                      <button
                        onClick={() => handleRemoveSkill(idx)}
                        className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Projects Editor */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900">Featured BIM Deliverables & Capstones</h4>
                  <button
                    onClick={handleAddProject}
                    className="px-3 py-1 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-lg text-xs font-bold flex items-center gap-1 hover:bg-indigo-100 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add Project
                  </button>
                </div>

                <div className="space-y-3">
                  {projects.map((p, idx) => (
                    <div key={p.id || idx} className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <input
                          type="text"
                          value={p.title}
                          onChange={e => {
                            const copy = [...projects];
                            copy[idx].title = e.target.value;
                            setProjects(copy);
                          }}
                          className="flex-1 font-bold text-xs border border-slate-200 rounded-lg p-1.5"
                          placeholder="Project Title"
                        />
                        <button
                          onClick={() => handleRemoveProject(idx)}
                          className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <input
                          type="text"
                          value={p.category}
                          onChange={e => {
                            const copy = [...projects];
                            copy[idx].category = e.target.value;
                            setProjects(copy);
                          }}
                          className="border border-slate-200 rounded-lg p-1.5"
                          placeholder="Category (e.g. HVAC Plant Room)"
                        />
                        <input
                          type="text"
                          value={p.lodLevel}
                          onChange={e => {
                            const copy = [...projects];
                            copy[idx].lodLevel = e.target.value;
                            setProjects(copy);
                          }}
                          className="border border-slate-200 rounded-lg p-1.5"
                          placeholder="LOD Level (e.g. LOD 400)"
                        />
                      </div>

                      <textarea
                        rows={2}
                        value={p.description}
                        onChange={e => {
                          const copy = [...projects];
                          copy[idx].description = e.target.value;
                          setProjects(copy);
                        }}
                        className="w-full text-xs border border-slate-200 rounded-lg p-1.5"
                        placeholder="Detailed project summary..."
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {saveSuccess && (
              <span className="text-xs text-emerald-600 font-bold flex items-center gap-1 animate-pulse">
                <CheckCircle2 className="w-4 h-4" />
                Saved & Synchronized to Live Portfolio!
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {mode === 'edit' ? (
              <button
                onClick={handleSavePortfolio}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-md cursor-pointer transition-colors"
              >
                <CheckCircle2 className="w-4 h-4" />
                Save & Update Portfolio
              </button>
            ) : (
              <button
                onClick={() => {
                  soundFx.playClick();
                  onClose();
                }}
                className="px-6 py-2.5 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold cursor-pointer transition-colors"
              >
                Close Showcase
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
