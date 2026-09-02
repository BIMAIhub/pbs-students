import React, { useRef, useState, useEffect } from 'react';
import { 
  X, 
  Download, 
  ShieldCheck, 
  Printer, 
  CheckCircle2, 
  Award, 
  Share2, 
  Lock, 
  AlertTriangle,
  FileText,
  Clock,
  Sparkles,
  QrCode,
  ArrowRight
} from 'lucide-react';
import { pbsAdminStore, CourseCertificateConfig, StudentCourseProgress } from '../../utils/pbsAdminStore';
import { soundFx } from '../../utils/soundEffects';

interface CertificateGeneratorModalProps {
  userName: string;
  studentId?: string;
  courseId?: string;
  courseTitle?: string;
  onClose: () => void;
  onOpenMcqExam?: () => void;
  onOpenTaskModal?: () => void;
}

export const CertificateGeneratorModal: React.FC<CertificateGeneratorModalProps> = ({
  userName,
  studentId = 'PBS-STU-2026-8492',
  courseId = 'c1',
  courseTitle = 'Autodesk Revit MEP Masterclass',
  onClose,
  onOpenMcqExam,
  onOpenTaskModal
}) => {
  const certRef = useRef<HTMLDivElement>(null);
  const [certConfig, setCertConfig] = useState<CourseCertificateConfig | null>(null);
  const [progress, setProgress] = useState<StudentCourseProgress | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  useEffect(() => {
    const config = pbsAdminStore.getCourseCertificateConfig(courseId);
    const prog = pbsAdminStore.getStudentCourseProgress(studentId, courseId);
    setCertConfig(config);
    setProgress(prog);
  }, [courseId, studentId]);

  const isCompleted = !!progress?.isCertified;

  const handlePrint = () => {
    if (!isCompleted) return;
    soundFx.playClick();
    window.print();
  };

  const handleDownload = () => {
    if (!isCompleted) return;
    soundFx.playSuccess();
    setDownloadSuccess(true);
    pbsAdminStore.logStudentActivity(
      studentId,
      'asset_downloaded',
      `Downloaded Official Certificate PDF for ${courseTitle} (ID: ${progress?.certificateId || 'PBS-CERT'})`
    );
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  // Theme styling calculation
  const getThemeStyles = () => {
    const theme = certConfig?.theme || 'emerald';
    switch (theme) {
      case 'gold':
        return {
          wrapper: 'bg-gradient-to-br from-amber-50/50 via-yellow-50/30 to-amber-100/40 border-amber-600/40 text-amber-950',
          accent: 'text-amber-800',
          seal: 'bg-gradient-to-tr from-amber-500 to-yellow-400 border-amber-600 text-slate-900',
          border: 'border-8 border-double border-amber-500/50'
        };
      case 'cyber-blue':
        return {
          wrapper: 'bg-gradient-to-br from-cyan-50/40 via-blue-50/30 to-indigo-50/40 border-cyan-600/40 text-slate-900',
          accent: 'text-cyan-800',
          seal: 'bg-gradient-to-tr from-cyan-500 to-blue-500 border-blue-600 text-white',
          border: 'border-8 border-cyan-600/30'
        };
      case 'academic':
        return {
          wrapper: 'bg-gradient-to-br from-slate-50 via-stone-50 to-slate-100 border-slate-700/40 text-slate-900',
          accent: 'text-slate-800',
          seal: 'bg-gradient-to-tr from-slate-800 to-slate-700 border-slate-900 text-amber-300',
          border: 'border-8 border-double border-slate-600/40'
        };
      case 'emerald':
      default:
        return {
          wrapper: 'bg-gradient-to-br from-emerald-50/30 via-white to-teal-50/40 border-emerald-600/40 text-emerald-950',
          accent: 'text-emerald-800',
          seal: 'bg-gradient-to-tr from-emerald-600 to-teal-400 border-emerald-700 text-white',
          border: 'border-8 border-double border-emerald-600/30'
        };
    }
  };

  const themeStyles = getThemeStyles();

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-5 sm:p-8 shadow-2xl space-y-5 max-h-[95vh] flex flex-col border border-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-inner ${
              isCompleted ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
            }`}>
              {isCompleted ? <Award className="w-5 h-5 text-emerald-600" /> : <Lock className="w-5 h-5 text-amber-600" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                  {isCompleted ? 'Verified Certificate of Completion' : 'Certificate Locked (Course Incomplete)'}
                </h3>
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase ${
                  isCompleted ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {isCompleted ? 'Unlocked & Issued' : 'Requirements Pending'}
                </span>
              </div>
              <p className="text-xs text-slate-500">{courseTitle} • Dynamic Accreditation Theme: {certConfig?.theme || 'emerald'}</p>
            </div>
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

        {/* Certificate Display Area */}
        <div className="flex-1 overflow-y-auto p-1 relative">
          {/* If NOT certified, apply blur filter and show locked overlay */}
          <div className="relative">
            <div 
              ref={certRef}
              className={`p-6 sm:p-10 rounded-2xl shadow-md relative text-center space-y-5 overflow-hidden transition-all duration-300 ${themeStyles.border} ${themeStyles.wrapper} ${
                !isCompleted ? 'blur-xs select-none pointer-events-none opacity-50' : ''
              }`}
            >
              {/* Corner Accents */}
              <div className="absolute top-2 left-2 text-amber-700 text-xs font-serif">✦</div>
              <div className="absolute top-2 right-2 text-amber-700 text-xs font-serif">✦</div>
              <div className="absolute bottom-2 left-2 text-amber-700 text-xs font-serif">✦</div>
              <div className="absolute bottom-2 right-2 text-amber-700 text-xs font-serif">✦</div>

              {/* Institution Header */}
              <div className="space-y-1">
                <div className="text-[11px] font-bold uppercase tracking-widest text-slate-700">
                  {certConfig?.institutionName || 'PRAGMATIC BIM SOLUTION ACADEMY'}
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight">
                  {certConfig?.certificateTitle || 'Certificate of Excellence & Specialization'}
                </h2>
                <p className="text-[10px] sm:text-[11px] text-slate-600 uppercase tracking-wider font-semibold">
                  {certConfig?.subtitle || 'Global AEC BIM Accreditation Program'}
                </p>
              </div>

              {/* Recipient */}
              <div className="space-y-2 py-3 border-y border-amber-200/60 max-w-md mx-auto">
                <span className="text-xs text-slate-500 italic">This is proudly presented to</span>
                <h3 className={`text-2xl sm:text-3xl font-bold font-serif ${themeStyles.accent}`}>
                  {userName || 'Pravin Yadav'}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  for demonstrating exceptional practical proficiency, passing the final masterclass examination, and meeting all competency benchmarks in
                  <strong> {courseTitle}</strong>.
                </p>
              </div>

              {/* Signatures & Seal */}
              <div className="pt-3 flex items-center justify-between px-2 sm:px-10 text-xs">
                <div className="text-center space-y-1">
                  <div className="font-serif italic font-bold text-slate-800 text-sm border-b border-slate-300 pb-1">
                    {certConfig?.signatureName1 || 'Pravin Yadav'}
                  </div>
                  <p className="text-[9px] text-slate-500 uppercase tracking-wider font-semibold">
                    {certConfig?.signatureTitle1 || 'Founder & Principal BIM Specialist'}
                  </p>
                </div>

                {/* Seal */}
                <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 text-slate-900 shadow-md flex flex-col items-center justify-center p-1 font-bold ${themeStyles.seal}`}>
                  <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span className="text-[7px] uppercase tracking-tighter font-extrabold">VERIFIED</span>
                </div>

                <div className="text-center space-y-1">
                  <div className="font-serif italic font-bold text-slate-800 text-sm border-b border-slate-300 pb-1">
                    {certConfig?.signatureName2 || 'Dr. K. S. Raman'}
                  </div>
                  <p className="text-[9px] text-slate-500 uppercase tracking-wider font-semibold">
                    {certConfig?.signatureTitle2 || 'Academic Dean'}
                  </p>
                </div>
              </div>

              {/* Verification & Accreditation Info */}
              <div className="text-[10px] text-slate-400 font-mono pt-2 border-t border-slate-100/50 flex flex-col sm:flex-row items-center justify-between gap-1">
                <span>Credential ID: {progress?.certificateId || 'PBS-CERT-2026-PENDING'}</span>
                <span>{certConfig?.accreditationText || 'ISO 19650 & Autodesk Certified Curriculum Standards'}</span>
              </div>
            </div>

            {/* LOCKED OVERLAY CARD (shown when course is incomplete) */}
            {!isCompleted && (
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <div className="bg-white/95 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-amber-200 text-center space-y-4 backdrop-blur-md">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto shadow-inner">
                    <Lock className="w-6 h-6 text-amber-600" />
                  </div>

                  <div>
                    <h4 className="text-lg font-black text-slate-900">Certificate Currently Locked</h4>
                    <p className="text-xs text-slate-600 mt-1">
                      To unblur and unlock your official verifiable certificate, please complete the remaining course requirements below:
                    </p>
                  </div>

                  {/* Requirements Checklist */}
                  <div className="space-y-2 text-left bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-xs">
                    {/* Step 1: Lessons */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span className="font-semibold text-slate-800">1. Course Lessons</span>
                      </div>
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">Completed</span>
                    </div>

                    {/* Step 2: Task Submission */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {progress?.taskSubmitted ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-amber-500" />
                        )}
                        <span className="font-semibold text-slate-800">2. Capstone Task Submission</span>
                      </div>
                      {progress?.taskSubmitted ? (
                        <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">Submitted (98/100)</span>
                      ) : (
                        <button
                          onClick={() => {
                            soundFx.playClick();
                            onOpenTaskModal?.();
                          }}
                          className="text-[11px] font-bold text-amber-800 bg-amber-100 hover:bg-amber-200 px-2 py-0.5 rounded-full cursor-pointer"
                        >
                          Submit Task →
                        </button>
                      )}
                    </div>

                    {/* Step 3: MCQ Exam */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {progress?.mcqPassed ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-amber-500" />
                        )}
                        <span className="font-semibold text-slate-800">3. Final Certification MCQ Exam</span>
                      </div>
                      {progress?.mcqPassed ? (
                        <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                          Passed ({progress.mcqScore}/{progress.mcqTotal})
                        </span>
                      ) : (
                        <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">Pending (70%+ to pass)</span>
                      )}
                    </div>
                  </div>

                  {/* Primary CTA */}
                  <button
                    onClick={() => {
                      soundFx.playClick();
                      onOpenMcqExam?.();
                    }}
                    className="w-full py-3 bg-gradient-to-r from-amber-500 to-emerald-600 hover:from-amber-600 hover:to-emerald-700 text-white rounded-2xl text-xs font-bold shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all"
                  >
                    <Award className="w-4 h-4" />
                    Take Final Course MCQ Exam Now
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Controls */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100">
          <div className="flex items-center gap-2">
            {downloadSuccess && (
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4" />
                Certificate PDF Generated & Downloaded!
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={() => {
                soundFx.playClick();
                onClose();
              }}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100 cursor-pointer"
            >
              Close
            </button>

            {isCompleted ? (
              <>
                <button
                  onClick={handlePrint}
                  className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-xl flex items-center gap-1.5 border border-slate-200 cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  Print
                </button>

                <button
                  onClick={handleDownload}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer flex items-center gap-2 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Download PDF Certificate</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  soundFx.playClick();
                  onOpenMcqExam?.();
                }}
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer flex items-center gap-2 transition-colors"
              >
                <Award className="w-4 h-4" />
                <span>Start MCQ Assessment</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

