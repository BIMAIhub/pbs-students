import React, { useState, useEffect } from 'react';
import {
  Building,
  CheckCircle2,
  Sparkles,
  MapPin,
  Mail,
  Phone,
  Linkedin,
  Github,
  Globe,
  ExternalLink,
  Share2,
  Download,
  Award,
  FileCheck,
  Layers,
  ArrowLeft,
  Copy,
  Check,
  Printer,
  ShieldCheck,
  Calendar,
  Briefcase
} from 'lucide-react';
import { pbsAdminStore, StudentPortfolioProfile, ManagedStudent } from '../utils/pbsAdminStore';
import { soundFx } from '../utils/soundEffects';

interface PublicPortfolioPageProps {
  studentId?: string;
  onNavigateHome?: () => void;
}

export const PublicPortfolioPage: React.FC<PublicPortfolioPageProps> = ({
  studentId = 'PBS-STU-2026-8492',
  onNavigateHome
}) => {
  const [copied, setCopied] = useState(false);
  const [portfolio, setPortfolio] = useState<StudentPortfolioProfile | null>(null);
  const [studentInfo, setStudentInfo] = useState<ManagedStudent | null>(null);

  useEffect(() => {
    // 1. Fetch matching student from registry
    const students = pbsAdminStore.getStudents();
    const cleanSearchId = studentId.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    const matchedStudent = students.find(s => 
      s.studentId.toLowerCase().replace(/[^a-z0-9]/g, '') === cleanSearchId ||
      s.id.toLowerCase().replace(/[^a-z0-9]/g, '') === cleanSearchId ||
      s.rollNumber.toLowerCase().replace(/[^a-z0-9]/g, '') === cleanSearchId ||
      s.name.toLowerCase().replace(/[^a-z0-9]/g, '') === cleanSearchId
    ) || students[0];

    setStudentInfo(matchedStudent);

    // 2. Fetch or initialize student portfolio
    const data = pbsAdminStore.getStudentPortfolio(matchedStudent?.studentId || studentId);
    setPortfolio(data);
  }, [studentId]);

  if (!portfolio) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-semibold text-slate-400">Loading verified BIM portfolio...</p>
        </div>
      </div>
    );
  }

  const studentName = studentInfo?.name || 'Pravin Yadav';
  const studentRoll = studentInfo?.rollNumber || 'PBS/2026/BIM-084';
  const studentSpecialization = studentInfo?.specialization || 'Autodesk Revit MEP Masterclass (LOD 300 - 500)';
  const currentPublicUrl = `${window.location.origin}/portfolio/${(studentInfo?.studentId || studentId).toLowerCase()}`;

  const handleCopyLink = () => {
    soundFx.playClick();
    navigator.clipboard.writeText(currentPublicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    soundFx.playClick();
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 font-sans antialiased selection:bg-emerald-500 selection:text-white pb-20">
      {/* Top Universal Verification Banner */}
      <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3 shadow-lg">
        <div className="flex items-center gap-3">
          {onNavigateHome && (
            <button
              onClick={() => {
                soundFx.playClick();
                onNavigateHome();
              }}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-bold"
              title="Return to Pragmatic BIM Solution Platform"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to LMS Portal</span>
            </button>
          )}

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-slate-950 font-black text-xs shadow-md shadow-emerald-500/20">
              PBS
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-black tracking-tight text-white">Pragmatic BIM Solution</span>
                <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold rounded-full hidden xs:inline-flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  Official Credential Verification
                </span>
              </div>
              <p className="text-[10px] text-slate-400">Institutional Candidate Portfolio Showcase</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleCopyLink}
            className="py-1.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Link Copied' : 'Share URL'}</span>
          </button>

          <a
            href={`https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentPublicUrl)}`}
            target="_blank"
            rel="noreferrer"
            className="py-1.5 px-3 rounded-xl bg-[#0077b5] hover:bg-[#00669c] text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs"
          >
            <Linkedin className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Share on LinkedIn</span>
          </a>

          <button
            onClick={handlePrint}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer hidden md:flex items-center justify-center"
            title="Print or Save PDF"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Candidate Hero Card */}
        <section className="bg-gradient-to-br from-slate-900 via-[#0c1424] to-slate-900 rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6 lg:gap-8">
            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl overflow-hidden border-2 border-emerald-400/50 shadow-2xl bg-slate-800">
                <img
                  src={studentInfo?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"}
                  alt={studentName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-slate-950 p-1.5 rounded-xl shadow-lg" title="ISO 19650 Certified">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>

            {/* Main Info */}
            <div className="flex-1 space-y-3">
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
                  {studentName}
                </h1>
                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold rounded-full flex items-center gap-1.5 shadow-xs">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Verified BIM Specialist
                </span>
                <span className="px-2.5 py-1 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-mono font-bold rounded-full">
                  {studentRoll}
                </span>
              </div>

              <p className="text-sm sm:text-base font-semibold text-emerald-300/90">
                {portfolio.headline || 'BIM Engineer & MEP Coordinator | ISO 19650 Project Delivery'}
              </p>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl font-normal">
                {portfolio.bio || `${studentName} is a certified BIM Specialist trained in Autodesk Revit (LOD 300 to 500), Navisworks Manage Clash Detection, Dynamo computational automation, and ISO 19650 BIM execution standards at Pragmatic BIM Solution.`}
              </p>

              {/* Contact Meta Pills */}
              <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
                {portfolio.socialLinks?.location && (
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-slate-300">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{portfolio.socialLinks.location}</span>
                  </div>
                )}
                {portfolio.socialLinks?.email && (
                  <a
                    href={`mailto:${portfolio.socialLinks.email}`}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-slate-300 hover:text-white hover:border-emerald-500/50 transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{portfolio.socialLinks.email}</span>
                  </a>
                )}
                {portfolio.socialLinks?.phone && (
                  <a
                    href={`tel:${portfolio.socialLinks.phone}`}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-slate-300 hover:text-white hover:border-emerald-500/50 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{portfolio.socialLinks.phone}</span>
                  </a>
                )}
                {portfolio.socialLinks?.linkedin && (
                  <a
                    href={portfolio.socialLinks.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0077b5]/20 border border-[#0077b5]/40 text-cyan-200 hover:text-white hover:bg-[#0077b5]/40 transition-colors font-semibold"
                  >
                    <Linkedin className="w-3.5 h-3.5 text-[#38bdf8] shrink-0" />
                    <span>LinkedIn Profile</span>
                    <ExternalLink className="w-3 h-3 opacity-60" />
                  </a>
                )}
                {portfolio.socialLinks?.github && (
                  <a
                    href={portfolio.socialLinks.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-slate-300 hover:text-white hover:border-slate-500 transition-colors"
                  >
                    <Github className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                    <span>GitHub Repositories</span>
                    <ExternalLink className="w-3 h-3 opacity-60" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Quick Action Buttons for Recruiters */}
          <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Award className="w-4 h-4 text-emerald-400" />
              <span>Specialization: <strong className="text-slate-200">{studentSpecialization}</strong></span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {portfolio.socialLinks?.email && (
                <a
                  href={`mailto:${portfolio.socialLinks.email}?subject=Interview Inquiry for ${encodeURIComponent(studentName)} - BIM Specialist Candidate&body=Dear ${encodeURIComponent(studentName)},%0D%0A%0D%0AWe reviewed your verified BIM portfolio on Pragmatic BIM Solution and would like to invite you for an interview.`}
                  className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/20 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Mail className="w-4 h-4" />
                  <span>Contact Candidate</span>
                </a>
              )}
              <button
                onClick={handlePrint}
                className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Save Verified BIM CV</span>
              </button>
            </div>
          </div>
        </section>

        {/* Technical Competencies Matrix */}
        <section className="bg-slate-900/60 rounded-3xl p-6 sm:p-8 border border-slate-800/80 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2.5">
                <Sparkles className="w-5 h-5 text-emerald-400" />
                Verified Technical BIM Capabilities
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">Assessed and certified under ISO 19650 industry evaluation standards</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold self-start sm:self-auto border border-slate-700">
              Audited by PBS Academics
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {portfolio.skills.map((s, idx) => (
              <div
                key={idx}
                className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 space-y-2 hover:border-emerald-500/40 transition-colors shadow-sm"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-100">{s.name}</span>
                  <span className="font-mono font-bold text-emerald-400">{s.level}%</span>
                </div>
                <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden p-0.5">
                  <div
                    className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-700"
                    style={{ width: `${s.level}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-400 uppercase font-semibold">
                  <span>{s.category}</span>
                  <span className="text-emerald-400/80 font-bold">{s.level >= 90 ? 'Mastery Level' : 'Advanced Competency'}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Industry Deliverables & BIM Capstones */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2.5">
                <Building className="w-5 h-5 text-emerald-400" />
                Featured Industry Deliverables & Capstones
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">Multi-disciplinary MEP modeling, clash detection reports, and automated Dynamo scripts</p>
            </div>
            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-xs font-bold rounded-full self-start sm:self-auto">
              {portfolio.featuredProjects.length} Verified Projects
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {portfolio.featuredProjects.map((p, pIdx) => (
              <div
                key={p.id || pIdx}
                className="bg-slate-900/80 rounded-3xl border border-slate-800 overflow-hidden shadow-xl hover:border-slate-700 hover:shadow-2xl transition-all flex flex-col group"
              >
                <div className="h-52 bg-slate-950 relative overflow-hidden">
                  <img
                    src={p.imageUrl}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                  
                  <span className="absolute top-3 right-3 bg-slate-900/90 text-emerald-300 border border-emerald-500/30 text-xs font-black px-2.5 py-1 rounded-xl backdrop-blur-md shadow-md">
                    {p.lodLevel}
                  </span>

                  <span className="absolute top-3 left-3 bg-slate-900/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-xl backdrop-blur-md">
                    {p.category}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-bold text-white text-base sm:text-lg group-hover:text-emerald-300 transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                      {p.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-1.5">
                      {p.softwareUsed?.map((sw: string, sIdx: number) => (
                        <span
                          key={sIdx}
                          className="bg-slate-800 text-slate-300 border border-slate-700/60 text-[10px] px-2.5 py-1 rounded-lg font-medium"
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
                        className="py-1.5 px-3 rounded-xl bg-slate-800 hover:bg-emerald-600 hover:text-white text-emerald-400 text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs"
                      >
                        <span>Inspect Deliverable</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Institutional Accreditation Footer Banner */}
        <section className="bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 p-6 sm:p-8 rounded-3xl border border-emerald-500/30 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <h3 className="text-base font-black text-white">ISO 19650 Academic Credential Authority</h3>
            </div>
            <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
              This candidate portfolio is digitally stamped and verified by <strong>Pragmatic BIM Solution (PBS)</strong>, Pune, India. All project models, clash matrices, and Dynamo scripts meet international standards.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {onNavigateHome ? (
              <button
                onClick={() => {
                  soundFx.playClick();
                  onNavigateHome();
                }}
                className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black shadow-lg transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>Visit Pragmatic BIM Solution</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            ) : (
              <a
                href="/"
                className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black shadow-lg transition-all flex items-center gap-1.5"
              >
                <span>Visit Pragmatic BIM Solution</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};
