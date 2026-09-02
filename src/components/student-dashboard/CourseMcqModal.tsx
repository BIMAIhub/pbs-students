import React, { useState, useEffect } from 'react';
import {
  X,
  Award,
  CheckCircle2,
  AlertCircle,
  Clock,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  Trophy,
  ShieldCheck,
  Lock,
  BookOpen,
  Check,
  CheckCheck,
  ChevronDown,
  ChevronUp,
  FileText
} from 'lucide-react';
import { pbsAdminStore, CourseMcqExam } from '../../utils/pbsAdminStore';
import { soundFx } from '../../utils/soundEffects';

interface CourseMcqModalProps {
  courseId: string;
  courseTitle: string;
  studentId: string;
  studentName: string;
  onClose: () => void;
  onExamPassed?: (score: number, total: number) => void;
  onOpenCertificate?: () => void;
  onOpenClassroom?: () => void;
}

export const CourseMcqModal: React.FC<CourseMcqModalProps> = ({
  courseId,
  courseTitle,
  studentId,
  studentName,
  onClose,
  onExamPassed,
  onOpenCertificate,
  onOpenClassroom
}) => {
  const [examData, setExamData] = useState<CourseMcqExam | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [hasPassed, setHasPassed] = useState(false);
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(15 * 60);
  const [showReviewBank, setShowReviewBank] = useState(false);
  const [eligibility, setEligibility] = useState<{
    isEligible: boolean;
    completedCount: number;
    totalCount: number;
    progressPercent: number;
  }>({ isEligible: true, completedCount: 0, totalCount: 0, progressPercent: 0 });

  const loadEligibilityAndExam = () => {
    const check = pbsAdminStore.checkCourseEligibilityForMcq(studentId, courseId);
    setEligibility(check);

    const exam = pbsAdminStore.getCourseMcq(courseId);
    setExamData(exam);
    setTimeLeftSeconds((exam.timeLimitMinutes || 15) * 60);

    // Check if already attempted previously
    const progress = pbsAdminStore.getStudentCourseProgress(studentId, courseId);
    if (progress.mcqAttempted) {
      setScore(progress.mcqScore || 0);
      setHasPassed(!!progress.mcqPassed);
      if (progress.mcqPassed) {
        setIsSubmitted(true);
      }
    }
  };

  useEffect(() => {
    loadEligibilityAndExam();
  }, [courseId, studentId]);

  // Timer countdown
  useEffect(() => {
    if (!eligibility.isEligible || isSubmitted || timeLeftSeconds <= 0) return;
    const timer = setInterval(() => {
      setTimeLeftSeconds(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [eligibility.isEligible, isSubmitted, timeLeftSeconds]);

  if (!examData) return null;

  const totalQuestions = examData.questions.length;
  const currentQ = examData.questions[currentQuestionIndex] || examData.questions[0];
  const passingScore = Math.ceil((totalQuestions * (examData.passingScorePercent || 70)) / 100);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (optionIndex: number) => {
    if (isSubmitted) return;
    soundFx.playClick();
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: optionIndex
    }));
  };

  const handleSubmitExam = () => {
    let calculatedScore = 0;
    examData.questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctOptionIndex) {
        calculatedScore += 1;
      }
    });

    const passed = calculatedScore >= passingScore;
    setScore(calculatedScore);
    setHasPassed(passed);
    setIsSubmitted(true);

    if (passed) {
      soundFx.playSuccess();
      onExamPassed?.(calculatedScore, totalQuestions);
    } else {
      soundFx.playClick();
    }

    pbsAdminStore.recordStudentMcqResult(
      studentId,
      courseId,
      calculatedScore,
      totalQuestions,
      passed
    );
  };

  const handleRetake = () => {
    soundFx.playClick();
    setSelectedAnswers({});
    setIsSubmitted(false);
    setShowReviewBank(false);
    setCurrentQuestionIndex(0);
    setTimeLeftSeconds((examData.timeLimitMinutes || 15) * 60);
  };

  const handleFastTrackCompleteModules = () => {
    soundFx.playSuccess();
    pbsAdminStore.completeAllCourseModules(studentId, courseId);
    loadEligibilityAndExam();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-5 sm:p-8 shadow-2xl space-y-6 max-h-[94vh] flex flex-col border border-slate-100">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-950 flex items-center justify-center shadow-md">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-black text-slate-900">{examData.title}</h3>
                <span className="text-[10px] bg-amber-100 text-amber-900 font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Certification Exam
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                {courseTitle} • Passing Score: {examData.passingScorePercent}% ({passingScore}/{totalQuestions} correct)
              </p>
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

        {/* ==================================================== */}
        {/* CASE 1: MODULES NOT YET COMPLETED GATE */}
        {/* ==================================================== */}
        {!eligibility.isEligible ? (
          <div className="p-6 sm:p-8 bg-slate-50 rounded-3xl border border-amber-200/80 text-center space-y-5 my-auto">
            <div className="w-14 h-14 rounded-3xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto shadow-inner">
              <Lock className="w-7 h-7 text-amber-600" />
            </div>

            <div className="space-y-2 max-w-md mx-auto">
              <h4 className="text-lg font-black text-slate-900">
                Course Modules Incomplete
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                In accordance with Pragmatic BIM Academy standards, you must finish watching all syllabus modules before unlocking the final MCQ certification assessment.
              </p>
            </div>

            {/* Module Progress Bar */}
            <div className="max-w-md mx-auto p-4 bg-white rounded-2xl border border-slate-200 space-y-2 text-left">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-emerald-600" />
                  Syllabus Completion
                </span>
                <span className="font-black text-emerald-700">
                  {eligibility.completedCount} / {eligibility.totalCount} Lessons ({eligibility.progressPercent}%)
                </span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500" 
                  style={{ width: `${eligibility.progressPercent}%` }} 
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              {onOpenClassroom && (
                <button
                  type="button"
                  onClick={() => {
                    soundFx.playClick();
                    onOpenClassroom();
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Resume Modules in Classroom</span>
                </button>
              )}

              <button
                type="button"
                onClick={handleFastTrackCompleteModules}
                className="w-full sm:w-auto px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
                title="Mark all course modules completed to immediately unlock the MCQ exam"
              >
                <Sparkles className="w-4 h-4" />
                <span>Mark All Modules Done & Unlock Exam</span>
              </button>
            </div>
          </div>
        ) : (

          /* ==================================================== */
          /* CASE 2: MODULES COMPLETED -> EXAM FLOW */
          /* ==================================================== */
          <>
            {/* Status Bar */}
            {!isSubmitted && (
              <div className="flex items-center justify-between bg-slate-50 px-4 py-3 rounded-2xl border border-slate-200 text-xs">
                <div className="flex items-center gap-2 text-slate-600 font-medium">
                  <span className="font-bold text-slate-900">Question {currentQuestionIndex + 1} of {totalQuestions}</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded-md">
                    {Object.keys(selectedAnswers).length} / {totalQuestions} Answered
                  </span>
                </div>
                <div className="flex items-center gap-1.5 font-bold text-slate-700 bg-white px-3 py-1 rounded-xl shadow-2xs border border-slate-200">
                  <Clock className="w-4 h-4 text-amber-500 animate-pulse" />
                  <span>Time Left: <span className={timeLeftSeconds < 180 ? 'text-red-600 font-mono font-black' : 'text-slate-900 font-mono'}>{formatTime(timeLeftSeconds)}</span></span>
                </div>
              </div>
            )}

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto space-y-6 pr-1">
              {!isSubmitted ? (
                <div className="space-y-6">
                  {/* Question Text */}
                  <div className="bg-slate-50/90 p-5 rounded-2xl border border-slate-200/80">
                    <div className="flex items-center gap-2 text-emerald-700 font-black text-xs uppercase tracking-wider mb-2">
                      <HelpCircle className="w-4 h-4" />
                      <span>QUESTION #{currentQuestionIndex + 1} OF {totalQuestions}</span>
                    </div>
                    <h4 className="text-base sm:text-lg font-black text-slate-900 leading-relaxed">
                      {currentQ.question}
                    </h4>
                  </div>

                  {/* Options */}
                  <div className="space-y-3">
                    {currentQ.options.map((option, optIdx) => {
                      const isSelected = selectedAnswers[currentQuestionIndex] === optIdx;
                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectOption(optIdx)}
                          className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-center justify-between cursor-pointer ${
                            isSelected
                              ? 'border-emerald-600 bg-emerald-50/80 text-emerald-950 font-bold shadow-xs'
                              : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 text-slate-800'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className={`w-7 h-7 rounded-xl flex items-center justify-center font-black text-xs shrink-0 ${
                              isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'
                            }`}>
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span className="text-xs sm:text-sm">{option}</span>
                          </div>
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            isSelected ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-slate-300'
                          }`}>
                            {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Question Navigation Bubbles */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between flex-wrap gap-2">
                    <div className="flex flex-wrap gap-1.5">
                      {examData.questions.map((_, qIdx) => {
                        const isAnswered = selectedAnswers[qIdx] !== undefined;
                        const isCurrent = currentQuestionIndex === qIdx;
                        return (
                          <button
                            key={qIdx}
                            onClick={() => {
                              soundFx.playClick();
                              setCurrentQuestionIndex(qIdx);
                            }}
                            className={`w-8 h-8 rounded-xl text-xs font-black transition-all cursor-pointer ${
                              isCurrent
                                ? 'ring-2 ring-emerald-500 bg-emerald-600 text-white shadow-xs'
                                : isAnswered
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                            }`}
                          >
                            {qIdx + 1}
                          </button>
                        );
                      })}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        disabled={currentQuestionIndex === 0}
                        onClick={() => {
                          soundFx.playClick();
                          setCurrentQuestionIndex(prev => prev - 1);
                        }}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold disabled:opacity-40 cursor-pointer"
                      >
                        <ArrowLeft className="w-3.5 h-3.5 inline mr-1" />
                        Previous
                      </button>

                      {currentQuestionIndex < totalQuestions - 1 ? (
                        <button
                          type="button"
                          onClick={() => {
                            soundFx.playClick();
                            setCurrentQuestionIndex(prev => prev + 1);
                          }}
                          className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold cursor-pointer"
                        >
                          Next
                          <ArrowRight className="w-3.5 h-3.5 inline ml-1" />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={handleSubmitExam}
                          className="px-5 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl text-xs font-black shadow-md cursor-pointer animate-pulse"
                        >
                          Submit Assessment 🎯
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                /* ==================================================== */
                /* RESULTS & CERTIFICATE UNLOCK SCREEN */
                /* ==================================================== */
                <div className="space-y-6">
                  {hasPassed ? (
                    <div className="p-6 sm:p-8 bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 text-white rounded-3xl border border-emerald-500/40 text-center space-y-4 shadow-xl">
                      <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-amber-400 to-yellow-300 text-slate-950 flex items-center justify-center mx-auto shadow-lg animate-bounce">
                        <Trophy className="w-8 h-8" />
                      </div>
                      
                      <div className="space-y-1">
                        <span className="text-[11px] font-black uppercase tracking-widest text-emerald-400">
                          Assessment Passed • Certified
                        </span>
                        <h4 className="text-2xl font-black tracking-tight text-white">
                          Congratulations, {studentName}!
                        </h4>
                        <p className="text-xs text-emerald-200/80 max-w-md mx-auto">
                          You scored <strong className="text-white font-bold">{score}/{totalQuestions} ({Math.round((score/totalQuestions)*100)}%)</strong>, exceeding the {examData.passingScorePercent}% passing standard.
                        </p>
                      </div>

                      <div className="p-3 bg-white/10 rounded-2xl max-w-sm mx-auto border border-white/10 text-xs font-semibold text-emerald-300 flex items-center justify-center gap-2">
                        <CheckCheck className="w-4 h-4 text-emerald-400" />
                        <span>Official Certificate Unlocked & Blockchain Verified</span>
                      </div>

                      <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                        {onOpenCertificate && (
                          <button
                            type="button"
                            onClick={() => {
                              soundFx.playClick();
                              onClose();
                              onOpenCertificate();
                            }}
                            className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-500 hover:to-yellow-500 text-slate-950 rounded-xl text-xs font-black shadow-lg cursor-pointer flex items-center justify-center gap-2 transition-all hover:scale-102"
                          >
                            <Award className="w-4 h-4" />
                            <span>View & Download Official Certificate 🎓</span>
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => {
                            soundFx.playClick();
                            setShowReviewBank(!showReviewBank);
                          }}
                          className="w-full sm:w-auto px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold border border-white/20 cursor-pointer flex items-center justify-center gap-1.5"
                        >
                          <FileText className="w-4 h-4" />
                          <span>{showReviewBank ? 'Hide Question Review' : 'Review Answer Explanations'}</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-6 sm:p-8 bg-rose-50 rounded-3xl border border-rose-200 text-center space-y-4">
                      <div className="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto shadow-inner">
                        <AlertCircle className="w-7 h-7" />
                      </div>
                      
                      <div className="space-y-1">
                        <h4 className="text-xl font-black text-rose-950">
                          Assessment Incomplete
                        </h4>
                        <p className="text-xs text-rose-700 max-w-md mx-auto">
                          You scored <strong>{score}/{totalQuestions} ({Math.round((score/totalQuestions)*100)}%)</strong>. The required passing score is <strong>{examData.passingScorePercent}% ({passingScore}/{totalQuestions})</strong>.
                        </p>
                      </div>

                      <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                        <button
                          type="button"
                          onClick={handleRetake}
                          className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer flex items-center justify-center gap-2"
                        >
                          <RotateCcw className="w-4 h-4" />
                          <span>Retake Assessment</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            soundFx.playClick();
                            setShowReviewBank(!showReviewBank);
                          }}
                          className="px-4 py-2.5 bg-white border border-rose-200 text-rose-800 hover:bg-rose-100 rounded-xl text-xs font-bold cursor-pointer flex items-center justify-center gap-1.5"
                        >
                          <FileText className="w-4 h-4" />
                          <span>{showReviewBank ? 'Hide Question Review' : 'Study Answer Explanations'}</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* ==================================================== */}
                  {/* QUESTION & ANSWER REVIEW WITH EXPLANATIONS */}
                  {/* ==================================================== */}
                  {showReviewBank && (
                    <div className="space-y-4 pt-2 animate-fadeIn">
                      <div className="flex items-center justify-between">
                        <h5 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-emerald-600" />
                          Detailed Question & Answer Bank Review
                        </h5>
                        <span className="text-[11px] text-slate-500">
                          {totalQuestions} Questions Examined
                        </span>
                      </div>

                      <div className="space-y-3">
                        {examData.questions.map((q, idx) => {
                          const studentAnswer = selectedAnswers[idx];
                          const isCorrect = studentAnswer === q.correctOptionIndex;

                          return (
                            <div 
                              key={idx} 
                              className={`p-4 rounded-2xl border text-xs space-y-2.5 ${
                                isCorrect 
                                  ? 'bg-emerald-50/50 border-emerald-200' 
                                  : 'bg-rose-50/40 border-rose-200'
                              }`}
                            >
                              <div className="flex items-start justify-between gap-2">
                                <span className={`font-bold ${isCorrect ? 'text-emerald-900' : 'text-rose-900'}`}>
                                  Q{idx + 1}: {q.question}
                                </span>
                                <span className={`text-[10px] font-black px-2 py-0.5 rounded-full shrink-0 ${
                                  isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                                }`}>
                                  {isCorrect ? 'Correct (+1)' : 'Incorrect (0)'}
                                </span>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                                <div className="p-2 rounded-xl bg-white border border-slate-200">
                                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Your Response:</span>
                                  <span className={isCorrect ? 'text-emerald-700 font-bold' : 'text-rose-700 font-bold'}>
                                    {studentAnswer !== undefined 
                                      ? `${String.fromCharCode(65 + studentAnswer)}. ${q.options[studentAnswer]}` 
                                      : 'Not Attempted'}
                                  </span>
                                </div>

                                <div className="p-2 rounded-xl bg-white border border-emerald-300">
                                  <span className="text-emerald-600 block text-[10px] uppercase font-bold">Verified Correct Answer:</span>
                                  <span className="text-emerald-950 font-bold">
                                    {String.fromCharCode(65 + q.correctOptionIndex)}. {q.options[q.correctOptionIndex]}
                                  </span>
                                </div>
                              </div>

                              {q.explanation && (
                                <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-[11px] leading-relaxed">
                                  <strong>Technical Explanation:</strong> {q.explanation}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        )}

      </div>
    </div>
  );
};
