import React, { useState, useEffect } from 'react';
import { 
  X, 
  Award, 
  Sparkles, 
  Palette, 
  CheckCircle2, 
  ShieldCheck, 
  FileText, 
  HelpCircle, 
  Plus, 
  Trash2, 
  Save, 
  Eye, 
  Layers,
  BrainCircuit,
  Wand2,
  Copy,
  Clock,
  Check,
  Search,
  Filter,
  ArrowUp,
  ArrowDown,
  AlertCircle
} from 'lucide-react';
import { 
  pbsAdminStore, 
  CourseCertificateConfig, 
  CourseMcqExam,
  McqQuestion 
} from '../../utils/pbsAdminStore';
import { soundFx } from '../../utils/soundEffects';
import { AI_MCQ_TOPICS, generateAiMcqQuestions } from '../../utils/aiMcqGenerator';

interface AdminCertificateCustomizerModalProps {
  courseId: string;
  courseTitle: string;
  initialTab?: 'certificate' | 'mcq_exam';
  onClose: () => void;
  onSaved?: () => void;
}

export const AdminCertificateCustomizerModal: React.FC<AdminCertificateCustomizerModalProps> = ({
  courseId,
  courseTitle,
  initialTab = 'mcq_exam',
  onClose,
  onSaved
}) => {
  const [activeTab, setActiveTab] = useState<'certificate' | 'mcq_exam'>(initialTab);
  
  // Certificate state
  const [config, setConfig] = useState<CourseCertificateConfig>({
    courseId,
    theme: 'emerald',
    certificateTitle: 'Certificate of Excellence & Professional BIM Mastery',
    subtitle: 'Global AEC BIM Accreditation Program (ISO 19650 Standard)',
    institutionName: 'PRAGMATIC BIM SOLUTION ACADEMY',
    accreditationText: 'ISO 19650 & Autodesk Certified Curriculum Standards • Verified on Blockchain',
    signatureName1: 'Pravin Yadav',
    signatureTitle1: 'Founder & Principal BIM Specialist',
    signatureName2: 'Dr. K. S. Raman',
    signatureTitle2: 'Academic Dean & Council Head',
    customLogoUrl: ''
  });

  // MCQ state
  const [passingScore, setPassingScore] = useState(70);
  const [timeLimitMinutes, setTimeLimitMinutes] = useState(15);
  const [questions, setQuestions] = useState<McqQuestion[]>([]);
  const [searchFilter, setSearchFilter] = useState('');
  const [previewMode, setPreviewMode] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [aiGenerating, setAiGenerating] = useState(false);
  const [showAiStudioPanel, setShowAiStudioPanel] = useState(false);

  // AI MCQ Generator Config
  const [aiTopic, setAiTopic] = useState(AI_MCQ_TOPICS[0]);
  const [aiDifficulty, setAiDifficulty] = useState<'foundation' | 'intermediate' | 'advanced_specialist'>('advanced_specialist');
  const [aiCount, setAiCount] = useState(3);
  const [aiGenNotice, setAiGenNotice] = useState<string | null>(null);

  useEffect(() => {
    const loadedConfig = pbsAdminStore.getCourseCertificateConfig(courseId);
    const loadedMcq = pbsAdminStore.getCourseMcq(courseId);
    setConfig(loadedConfig);
    setPassingScore(loadedMcq.passingScorePercent || 70);
    setTimeLimitMinutes(loadedMcq.timeLimitMinutes || 15);
    setQuestions(loadedMcq.questions || []);
  }, [courseId]);

  const handleSaveCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playSuccess();
    pbsAdminStore.saveCourseCertificateConfig(courseId, config);
    setSaveSuccess(true);
    onSaved?.();
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleSaveMcq = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    soundFx.playSuccess();
    const exam: CourseMcqExam = {
      courseId,
      title: `${courseTitle} Final Certification Assessment`,
      description: `Official comprehensive MCQ assessment for ${courseTitle}. Passing requirement: ${passingScore}%`,
      passingScorePercent: passingScore,
      timeLimitMinutes,
      questions
    };
    pbsAdminStore.saveCourseMcq(courseId, exam);
    setSaveSuccess(true);
    onSaved?.();
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleAiGenerateCertificate = () => {
    soundFx.playClick();
    setAiGenerating(true);
    setTimeout(() => {
      setConfig(prev => ({
        ...prev,
        certificateTitle: `Official Post-Graduate Certification in ${courseTitle}`,
        subtitle: `Authorized AEC Computational & BIM Management Accreditation • Class of 2026`,
        accreditationText: `Compliant with British Standards PAS 1192-2 & ISO 19650-1/2 Information Management Protocols`,
        theme: prev.theme === 'emerald' ? 'gold' : prev.theme === 'gold' ? 'cyber-blue' : 'emerald'
      }));
      setAiGenerating(false);
      soundFx.playSuccess();
    }, 800);
  };

  const handleTriggerAiMcqGeneration = () => {
    soundFx.playClick();
    setAiGenerating(true);

    setTimeout(() => {
      const generated = generateAiMcqQuestions({
        courseTitle,
        topic: aiTopic,
        difficulty: aiDifficulty,
        questionCount: aiCount
      });

      setQuestions(prev => [...generated, ...prev]);
      setAiGenerating(false);
      soundFx.playSuccess();
      setAiGenNotice(`Generated & appended ${generated.length} technical BIM questions to the bank!`);
      setTimeout(() => setAiGenNotice(null), 4000);
    }, 1000);
  };

  const handleAddQuestion = () => {
    soundFx.playClick();
    const newQ: McqQuestion = {
      id: `q_custom_${Date.now()}`,
      question: 'New technical BIM assessment question prompt...',
      options: [
        'Option A: Recommended ISO 19650 technical answer',
        'Option B: Alternative configuration method',
        'Option C: Non-standard manual workflow',
        'Option D: Deprecated 2D CAD drafting practice'
      ],
      correctOptionIndex: 0,
      explanation: 'Technical explanation: Option A adheres directly to ISO 19650 Information Management protocols and Autodesk best practices.'
    };
    setQuestions([newQ, ...questions]);
  };

  const handleDuplicateQuestion = (idx: number) => {
    soundFx.playClick();
    const target = questions[idx];
    const duplicated: McqQuestion = {
      ...target,
      id: `q_custom_${Date.now()}`,
      question: `${target.question} (Copy)`
    };
    const updated = [...questions];
    updated.splice(idx + 1, 0, duplicated);
    setQuestions(updated);
  };

  const handleMoveQuestion = (idx: number, direction: 'up' | 'down') => {
    soundFx.playClick();
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= questions.length) return;
    const updated = [...questions];
    const temp = updated[idx];
    updated[idx] = updated[targetIdx];
    updated[targetIdx] = temp;
    setQuestions(updated);
  };

  const handleRemoveQuestion = (idx: number) => {
    soundFx.playClick();
    setQuestions(questions.filter((_, i) => i !== idx));
  };

  const filteredQuestions = questions.filter(q => 
    q.question.toLowerCase().includes(searchFilter.toLowerCase()) ||
    q.explanation?.toLowerCase().includes(searchFilter.toLowerCase()) ||
    q.options.some(opt => opt.toLowerCase().includes(searchFilter.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-5xl w-full p-5 sm:p-8 shadow-2xl space-y-6 max-h-[94vh] flex flex-col border border-slate-100">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-md">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-black text-slate-900">
                  MCQ Exam Studio & Certificate Control
                </h3>
                <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                  Admin Master Control
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                {courseTitle} • Manage Assessment Question Bank & Certificate Themes
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
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

        {/* Tab Selector */}
        <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-1 flex-wrap">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                soundFx.playClick();
                setActiveTab('mcq_exam');
              }}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'mcq_exam'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <BrainCircuit className="w-4 h-4" />
              <span>MCQ Exam Studio & Question Bank ({questions.length})</span>
            </button>

            <button
              type="button"
              onClick={() => {
                soundFx.playClick();
                setActiveTab('certificate');
              }}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'certificate'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Palette className="w-4 h-4" />
              <span>Certificate Theme & Signatures</span>
            </button>
          </div>

          {activeTab === 'mcq_exam' && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  soundFx.playClick();
                  setShowAiStudioPanel(!showAiStudioPanel);
                }}
                className="px-3 py-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl text-xs font-black flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>{showAiStudioPanel ? 'Hide AI Studio' : '✨ AI MCQ Generator'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundFx.playClick();
                  setPreviewMode(!previewMode);
                }}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{previewMode ? 'Exit Student View' : 'Student Preview'}</span>
              </button>
            </div>
          )}

          {activeTab === 'certificate' && (
            <button
              type="button"
              onClick={handleAiGenerateCertificate}
              disabled={aiGenerating}
              className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Wand2 className={`w-3.5 h-3.5 text-amber-600 ${aiGenerating ? 'animate-spin' : ''}`} />
              <span>{aiGenerating ? 'Generating AI Titles...' : 'AI Auto-Style Certificate'}</span>
            </button>
          )}
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto pr-1 flex-1 space-y-6">
          
          {/* ==================================================== */}
          {/* TAB 1: MCQ EXAM STUDIO & QUESTION BANK */}
          {/* ==================================================== */}
          {activeTab === 'mcq_exam' && (
            <div className="space-y-6">
              
              {/* AI MCQ Generator Drawer / Panel */}
              {showAiStudioPanel && (
                <div className="p-5 bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 text-white rounded-3xl border border-indigo-500/30 shadow-xl space-y-4 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center border border-indigo-500/30">
                        <Sparkles className="w-4 h-4 text-amber-300" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">
                          AI Question Bank Studio (AEC Standards)
                        </h4>
                        <p className="text-[11px] text-indigo-200/80">
                          Instantly synthesize verified ISO 19650, Autodesk Revit, and Navisworks examination items.
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider bg-indigo-500/30 text-indigo-200 px-2.5 py-1 rounded-full border border-indigo-400/30">
                      AI Powered Engine
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-indigo-200 mb-1">Target AEC BIM Topic</label>
                      <select
                        value={aiTopic}
                        onChange={(e) => setAiTopic(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-slate-900 border border-indigo-500/40 rounded-xl text-white font-medium focus:ring-2 focus:ring-indigo-400"
                      >
                        {AI_MCQ_TOPICS.map((topic, idx) => (
                          <option key={idx} value={topic} className="bg-slate-900 text-white">
                            {topic}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-indigo-200 mb-1">Complexity & LOD Benchmark</label>
                      <select
                        value={aiDifficulty}
                        onChange={(e) => setAiDifficulty(e.target.value as any)}
                        className="w-full px-3 py-2 text-xs bg-slate-900 border border-indigo-500/40 rounded-xl text-white font-medium focus:ring-2 focus:ring-indigo-400"
                      >
                        <option value="foundation">Foundation (LOD 200 Basics)</option>
                        <option value="intermediate">Intermediate (LOD 300 Coordination)</option>
                        <option value="advanced_specialist">Advanced (LOD 400 Lead Specialist)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-indigo-200 mb-1">Quantity to Synthesize</label>
                      <select
                        value={aiCount}
                        onChange={(e) => setAiCount(Number(e.target.value))}
                        className="w-full px-3 py-2 text-xs bg-slate-900 border border-indigo-500/40 rounded-xl text-white font-medium focus:ring-2 focus:ring-indigo-400"
                      >
                        <option value={2}>2 Questions</option>
                        <option value={3}>3 Questions (Standard)</option>
                        <option value={5}>5 Questions (Comprehensive)</option>
                        <option value={8}>8 Questions (Full Masterclass Bank)</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    {aiGenNotice ? (
                      <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 animate-fadeIn">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        {aiGenNotice}
                      </span>
                    ) : (
                      <span className="text-[11px] text-indigo-300/80">
                        Generated questions include 4 options, exact correct answers, and industry explanations.
                      </span>
                    )}

                    <button
                      type="button"
                      onClick={handleTriggerAiMcqGeneration}
                      disabled={aiGenerating}
                      className="px-5 py-2 bg-gradient-to-r from-amber-500 to-emerald-500 hover:from-amber-600 hover:to-emerald-600 text-slate-950 font-black text-xs rounded-xl shadow-lg flex items-center gap-2 cursor-pointer transition-all disabled:opacity-50"
                    >
                      <Sparkles className={`w-4 h-4 ${aiGenerating ? 'animate-spin' : ''}`} />
                      <span>{aiGenerating ? 'Generating Technical MCQs...' : 'Synthesize & Add to Bank'}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Exam Benchmarks & Policy Configuration */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-emerald-600" />
                    Passing Benchmark Score (%)
                  </label>
                  <input
                    type="number"
                    min={40}
                    max={100}
                    value={passingScore}
                    onChange={(e) => setPassingScore(Number(e.target.value))}
                    className="w-full px-3.5 py-2 text-xs bg-white border border-slate-200 rounded-xl font-bold text-emerald-700 focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                  <p className="text-[10px] text-slate-500 mt-1">
                    Minimum score required to automatically unlock certificate.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-600" />
                    Time Limit (Minutes)
                  </label>
                  <input
                    type="number"
                    min={5}
                    max={120}
                    value={timeLimitMinutes}
                    onChange={(e) => setTimeLimitMinutes(Number(e.target.value))}
                    className="w-full px-3.5 py-2 text-xs bg-white border border-slate-200 rounded-xl font-bold text-slate-800 focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                  <p className="text-[10px] text-slate-500 mt-1">
                    Strict timer enforced in student exam room.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                    Certificate Unlock Trigger
                  </label>
                  <div className="px-3.5 py-2 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-xl text-xs font-bold flex items-center justify-between">
                    <span>Auto-Unlock on Pass</span>
                    <span className="text-[10px] bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-md">
                      Active
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1">
                    Certificates unblur instantly once students score ≥{passingScore}%.
                  </p>
                </div>
              </div>

              {/* Questions Answer Bank Header & Search */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-2 rounded-2xl">
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">
                      Assessment Question & Answer Bank ({questions.length} Items)
                    </h4>
                    <span className="text-[11px] text-slate-400">
                      • {Math.ceil((questions.length * passingScore) / 100)} correct answers needed to pass
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Search question bank..."
                        value={searchFilter}
                        onChange={(e) => setSearchFilter(e.target.value)}
                        className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl w-44 sm:w-56"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={handleAddQuestion}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-sm cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>+ Add Question</span>
                    </button>
                  </div>
                </div>

                {/* Questions List */}
                {filteredQuestions.length === 0 ? (
                  <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-300 space-y-3">
                    <HelpCircle className="w-8 h-8 text-slate-400 mx-auto" />
                    <p className="text-xs font-semibold text-slate-600">
                      No questions found matching your filter.
                    </p>
                    <button
                      type="button"
                      onClick={handleAddQuestion}
                      className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold cursor-pointer"
                    >
                      + Add First Technical Question
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredQuestions.map((q, filteredIndex) => {
                      const realIndex = questions.findIndex(item => item.id === q.id);
                      const qIndex = realIndex !== -1 ? realIndex : filteredIndex;

                      return (
                        <div 
                          key={q.id || qIndex} 
                          className={`p-4 bg-white rounded-2xl border transition-all space-y-3 ${
                            previewMode 
                              ? 'border-indigo-200 shadow-sm bg-indigo-50/10' 
                              : 'border-slate-200 hover:border-slate-300 shadow-2xs'
                          }`}
                        >
                          {/* Question Prompt Bar */}
                          <div className="flex items-start justify-between gap-3">
                            <span className="w-7 h-7 rounded-xl bg-slate-900 text-white font-black text-xs flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
                              {qIndex + 1}
                            </span>
                            
                            <div className="flex-1 min-w-0">
                              <textarea
                                value={q.question}
                                rows={2}
                                onChange={(e) => {
                                  const updated = [...questions];
                                  updated[qIndex].question = e.target.value;
                                  setQuestions(updated);
                                }}
                                placeholder="Enter Technical Question Prompt (e.g., In Revit MEP, what parameter controls...)"
                                className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 resize-y focus:bg-white focus:ring-2 focus:ring-emerald-500"
                                required
                              />
                            </div>

                            {/* Question Action Controls */}
                            <div className="flex items-center gap-1 shrink-0">
                              <button
                                type="button"
                                onClick={() => handleMoveQuestion(qIndex, 'up')}
                                disabled={qIndex === 0}
                                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg disabled:opacity-30 cursor-pointer"
                                title="Move Question Up"
                              >
                                <ArrowUp className="w-3.5 h-3.5" />
                              </button>

                              <button
                                type="button"
                                onClick={() => handleMoveQuestion(qIndex, 'down')}
                                disabled={qIndex === questions.length - 1}
                                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg disabled:opacity-30 cursor-pointer"
                                title="Move Question Down"
                              >
                                <ArrowDown className="w-3.5 h-3.5" />
                              </button>

                              <button
                                type="button"
                                onClick={() => handleDuplicateQuestion(qIndex)}
                                className="p-1.5 text-indigo-500 hover:bg-indigo-50 rounded-lg cursor-pointer"
                                title="Duplicate Question"
                              >
                                <Copy className="w-3.5 h-3.5" />
                              </button>

                              <button
                                type="button"
                                onClick={() => handleRemoveQuestion(qIndex)}
                                className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg cursor-pointer"
                                title="Delete Question from Bank"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          {/* 4 Options Grid with Correct Answer Selection */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pl-10">
                            {q.options.map((opt, optIndex) => {
                              const isCorrect = q.correctOptionIndex === optIndex;

                              return (
                                <div 
                                  key={optIndex} 
                                  className={`flex items-center gap-2 p-2 rounded-xl border transition-all ${
                                    isCorrect 
                                      ? 'bg-emerald-50/90 border-emerald-300 ring-1 ring-emerald-400' 
                                      : 'bg-slate-50 border-slate-200'
                                  }`}
                                >
                                  <label className="flex items-center gap-1.5 cursor-pointer shrink-0">
                                    <input
                                      type="radio"
                                      name={`correct_${q.id || qIndex}`}
                                      checked={isCorrect}
                                      onChange={() => {
                                        const updated = [...questions];
                                        updated[qIndex].correctOptionIndex = optIndex;
                                        setQuestions(updated);
                                      }}
                                      className="accent-emerald-600 w-4 h-4 cursor-pointer"
                                    />
                                    <span className={`text-[10px] font-black px-1.5 py-0.5 rounded ${
                                      isCorrect ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                                    }`}>
                                      {String.fromCharCode(65 + optIndex)}
                                    </span>
                                  </label>

                                  <input
                                    type="text"
                                    value={opt}
                                    onChange={(e) => {
                                      const updated = [...questions];
                                      updated[qIndex].options[optIndex] = e.target.value;
                                      setQuestions(updated);
                                    }}
                                    placeholder={`Option ${String.fromCharCode(65 + optIndex)} text...`}
                                    className={`w-full px-2 py-1 text-xs rounded-lg border-0 bg-transparent focus:outline-none focus:ring-1 focus:ring-emerald-500 ${
                                      isCorrect ? 'font-bold text-emerald-950' : 'text-slate-700 font-medium'
                                    }`}
                                    required
                                  />
                                </div>
                              );
                            })}
                          </div>

                          {/* Technical Explanation / Post-Exam Learning */}
                          <div className="pl-10">
                            <div className="flex items-center gap-2">
                              <HelpCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                              <input
                                type="text"
                                value={q.explanation || ''}
                                onChange={(e) => {
                                  const updated = [...questions];
                                  updated[qIndex].explanation = e.target.value;
                                  setQuestions(updated);
                                }}
                                placeholder="Technical explanation shown to student during exam result review..."
                                className="w-full px-3 py-1.5 text-[11px] bg-amber-50/50 border border-amber-200 rounded-xl text-amber-900 placeholder:text-amber-700/60 focus:bg-white focus:ring-1 focus:ring-amber-500"
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Save & Broadcast Action */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <span className="text-xs text-slate-500">
                  {questions.length} Questions active in this course certification assessment.
                </span>

                <button
                  type="button"
                  onClick={() => handleSaveMcq()}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer flex items-center gap-2 transition-all hover:scale-102"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Assessment Question Bank & Sync Live</span>
                </button>
              </div>
            </div>
          )}

          {/* ==================================================== */}
          {/* TAB 2: CERTIFICATE THEME & SIGNATURES */}
          {/* ==================================================== */}
          {activeTab === 'certificate' && (
            <form onSubmit={handleSaveCertificate} className="space-y-6">
              
              {/* Palette Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Select Visual Certificate Accreditation Palette
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: 'emerald', label: 'Emerald Prestige (BIM Certified)', color: 'bg-emerald-600' },
                    { id: 'gold', label: 'Imperial Gold (Honor Roll)', color: 'bg-amber-500' },
                    { id: 'cyber-blue', label: 'Cyber Tech Blue (Computational)', color: 'bg-cyan-600' },
                    { id: 'academic', label: 'Oxford Academic (Institutional)', color: 'bg-indigo-900' }
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => {
                        soundFx.playClick();
                        setConfig({ ...config, theme: t.id as any });
                      }}
                      className={`p-3 rounded-2xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                        config.theme === t.id 
                          ? 'border-emerald-600 ring-2 ring-emerald-600/30 bg-emerald-50/50 font-bold text-emerald-900' 
                          : 'border-slate-200 hover:bg-slate-50 text-slate-700 font-medium'
                      }`}
                    >
                      <span className={`w-4 h-4 rounded-full ${t.color} shrink-0`} />
                      <span className="text-xs">{t.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Title & Subtitle */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Certificate Header Title</label>
                  <input
                    type="text"
                    value={config.certificateTitle}
                    onChange={(e) => setConfig({ ...config, certificateTitle: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-bold"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Sub-Heading / Program Track</label>
                  <input
                    type="text"
                    value={config.subtitle}
                    onChange={(e) => setConfig({ ...config, subtitle: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-bold"
                    required
                  />
                </div>
              </div>

              {/* Accreditation & Blockchain Notice */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Accreditation Standards & Verifier Text</label>
                <input
                  type="text"
                  value={config.accreditationText}
                  onChange={(e) => setConfig({ ...config, accreditationText: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-bold"
                  required
                />
              </div>

              {/* Signatures */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-900">Primary Signatory (BIM Lead / Founder)</h4>
                  <div>
                    <label className="block text-[11px] text-slate-500 mb-0.5">Signer Full Name</label>
                    <input
                      type="text"
                      value={config.signatureName1}
                      onChange={(e) => setConfig({ ...config, signatureName1: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg font-bold"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-500 mb-0.5">Professional Title</label>
                    <input
                      type="text"
                      value={config.signatureTitle1}
                      onChange={(e) => setConfig({ ...config, signatureTitle1: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-900">Secondary Signatory (Academic Head)</h4>
                  <div>
                    <label className="block text-[11px] text-slate-500 mb-0.5">Signer Full Name</label>
                    <input
                      type="text"
                      value={config.signatureName2}
                      onChange={(e) => setConfig({ ...config, signatureName2: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg font-bold"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-500 mb-0.5">Professional Title</label>
                    <input
                      type="text"
                      value={config.signatureTitle2}
                      onChange={(e) => setConfig({ ...config, signatureTitle2: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Certificate Preview Box */}
              <div className="p-4 bg-slate-900 text-white rounded-2xl space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>LIVE CERTIFICATE TEMPLATE PREVIEW</span>
                  <span className="text-emerald-400 font-bold">{config.theme.toUpperCase()} PALETTE</span>
                </div>
                <div className="p-4 rounded-xl border border-white/10 text-center space-y-2 bg-white/5">
                  <div className="text-[10px] tracking-widest text-emerald-300 uppercase font-black">
                    {config.institutionName}
                  </div>
                  <h5 className="text-sm font-black text-amber-200">
                    {config.certificateTitle}
                  </h5>
                  <p className="text-[11px] text-slate-300 italic">
                    "{config.subtitle}"
                  </p>
                  <div className="text-[10px] text-slate-400 pt-2 border-t border-white/10 flex justify-around">
                    <span>{config.signatureName1} ({config.signatureTitle1})</span>
                    <span>•</span>
                    <span>{config.signatureName2} ({config.signatureTitle2})</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Certificate Template</span>
                </button>
              </div>
            </form>
          )}

        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
          {saveSuccess ? (
            <span className="font-bold text-emerald-600 flex items-center gap-1 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4" />
              Settings & Question Bank Saved & Broadcasted to Students!
            </span>
          ) : (
            <span className="text-slate-400">
              All question items & benchmarks sync instantly with the Student Portal.
            </span>
          )}

          <button
            type="button"
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="px-5 py-2 font-bold bg-slate-900 hover:bg-slate-800 text-white rounded-xl cursor-pointer transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
