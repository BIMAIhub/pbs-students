import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Eye, 
  RotateCcw, 
  Search, 
  ChevronLeft, 
  ChevronRight,
  Filter,
  Download,
  Award,
  Star,
  MessageSquare,
  Send,
  Sparkles,
  UserCheck,
  Calendar,
  ThumbsUp,
  FileCheck2,
  TrendingUp
} from 'lucide-react';
import { REVIEWED_TASKS_DATA, MENTORSHIP_EVALUATIONS_DATA } from './dashboardData';
import { ReviewedTask, MentorshipEvaluation } from './types';
import { pbsAdminStore } from '../../utils/pbsAdminStore';
import jsPDF from 'jspdf';

interface ReportsFeedbackTabProps {
  studentId?: string;
  studentName?: string;
}

export const ReportsFeedbackTab: React.FC<ReportsFeedbackTabProps> = ({
  studentId = 'PBS-STU-2026-8492',
  studentName = 'Pravin Yadav'
}) => {
  const [activeFeedbackSection, setActiveFeedbackSection] = useState<'tasks' | 'mentorship' | 'student_submission'>('tasks');
  const [activeFilterTab, setActiveFilterTab] = useState<'reviewed' | 'under_review' | 'resubmission'>('reviewed');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTask, setSelectedTask] = useState<ReviewedTask | null>(null);

  // Student submission form state
  const [submittedRating, setSubmittedRating] = useState(5);
  const [selectedInstructor, setSelectedInstructor] = useState('Pravin Yadav (BIM Director)');
  const [feedbackCategory, setFeedbackCategory] = useState('Curriculum & BIM Datasets');
  const [studentComment, setStudentComment] = useState('');
  const [feedbackSuccess, setFeedbackSuccess] = useState(false);
  const [studentMessages, setStudentMessages] = useState<any[]>([]);

  // Load message logs from store
  useEffect(() => {
    const student = pbsAdminStore.getStudentByQuery(studentId);
    if (student?.messages) {
      setStudentMessages(student.messages);
    }
  }, [studentId, feedbackSuccess]);


  const itemsPerPage = 10;

  const filteredTasks = REVIEWED_TASKS_DATA.filter((task) => {
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return (
        task.taskName.toLowerCase().includes(q) ||
        task.id.toLowerCase().includes(q) ||
        task.skillsTest.toLowerCase().includes(q) ||
        task.referenceModule.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const totalPages = Math.ceil(filteredTasks.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedTasks = filteredTasks.slice(startIndex, startIndex + itemsPerPage);

  const handleDownloadFullReportPDF = () => {
    const doc = new jsPDF();
    doc.setFillColor(15, 23, 42);
    doc.rect(0, 0, 210, 35, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.text('PRAGMATIC BIM SOLUTION - ACADEMIC AUDIT & FEEDBACK REPORT', 15, 20);
    doc.setFontSize(9);
    doc.setTextColor(52, 211, 153);
    doc.text('Official Comprehensive Student Evaluation Transcript (ISO 19650 Standard)', 15, 27);

    doc.setTextColor(15, 23, 42);
    doc.setFontSize(11);
    doc.text('Student: Pravin Yadav • ID: PBS-STU-2026-8492 • Cohort: BIM Masterclass #08', 15, 48);
    doc.setFontSize(9);
    doc.setTextColor(100, 116, 139);
    doc.text('Overall Standing: 87/87 Tasks Passed (90.8% Excellent, 9.2% Good) • Cumulative GPA: 98.2%', 15, 54);

    doc.setDrawColor(16, 185, 129);
    doc.line(15, 60, 195, 60);

    doc.setFontSize(10);
    doc.setTextColor(15, 23, 42);
    doc.text('Recent Task Evaluations (Sample List):', 15, 70);

    let yPos = 80;
    REVIEWED_TASKS_DATA.slice(0, 10).forEach((t, i) => {
      doc.setFontSize(8);
      doc.setTextColor(51, 65, 85);
      doc.text(`${t.id} - ${t.taskName} (${t.referenceModule})`, 15, yPos);
      doc.setTextColor(16, 185, 129);
      doc.text(`[${t.performance.toUpperCase()}] ${t.creditsScored}/${t.creditsTotal} Credits`, 150, yPos);
      yPos += 8;
    });

    yPos += 10;
    doc.setFontSize(10);
    doc.setTextColor(15, 23, 42);
    doc.text('1-on-1 Mentorship & Viva Evaluations:', 15, yPos);
    yPos += 10;

    MENTORSHIP_EVALUATIONS_DATA.forEach((m) => {
      doc.setFontSize(8);
      doc.setTextColor(51, 65, 85);
      doc.text(`${m.stageName} - Mentor: ${m.evaluatorName} (${m.date}) - Score: ${m.technicalSkillsScore}/100`, 15, yPos);
      yPos += 5;
      doc.setFontSize(7);
      doc.setTextColor(100, 116, 139);
      doc.text(`Remarks: "${m.detailedRemarks}"`, 18, yPos);
      yPos += 9;
    });

    doc.save('PBS_Student_Full_Feedback_Report.pdf');
  };

  const handleStudentFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentComment.trim()) {
      alert('Please enter your feedback comments before submitting.');
      return;
    }
    
    // Send to store
    pbsAdminStore.sendMessageFromStudent(
      studentId,
      `[${feedbackCategory}] To ${selectedInstructor} (${submittedRating}/5 Stars)`,
      studentComment.trim()
    );

    setFeedbackSuccess(true);
    setStudentComment('');
    setTimeout(() => setFeedbackSuccess(false), 4000);
  };

  return (
    <div id="reports-feedback-container" className="space-y-8 pb-16">
      
      {/* Top Header & Summary Card */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Academic Feedback & Mentorship Reviews
            </h2>
            <p className="text-xs text-slate-500">
              Detailed performance metrics, mentor evaluation scorecards, and task feedback history.
            </p>
          </div>

          <button
            onClick={handleDownloadFullReportPDF}
            className="self-start sm:self-auto inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Export Full Evaluation PDF</span>
          </button>
        </div>

        {/* Feedback on Tasks Card matching screenshot */}
        <div className="bg-white border border-emerald-100 rounded-2xl p-6 sm:p-8 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Metrics column */}
            <div className="lg:col-span-4 space-y-4">
              {/* Tasks Reviewed */}
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-md bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="text-sm text-slate-700">
                  <strong className="text-base font-bold text-slate-900 mr-1.5">87</strong>
                  Tasks Reviewed
                </div>
              </div>

              {/* Tasks Under Review */}
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-md bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Eye className="w-4 h-4" />
                </div>
                <div className="text-sm text-slate-700">
                  <strong className="text-base font-bold text-slate-900 mr-1.5">0</strong>
                  Tasks Under review
                </div>
              </div>

              {/* Resubmission Requests */}
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-md bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <RotateCcw className="w-4 h-4" />
                </div>
                <div className="text-sm text-slate-700">
                  <strong className="text-base font-bold text-slate-900 mr-1.5">0</strong>
                  Resubmission Requests
                </div>
              </div>
            </div>

            {/* Right Progress Chart & Percentages Column */}
            <div className="lg:col-span-8 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-semibold">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                  <div>
                    <span className="text-sm font-bold text-slate-900">90.80%</span>
                    <span className="text-slate-500 ml-1.5 font-normal">79 Tasks Excellent</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                  <div>
                    <span className="text-sm font-bold text-slate-900">9.20%</span>
                    <span className="text-slate-500 ml-1.5 font-normal">8 Tasks Good</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500"></div>
                  <div>
                    <span className="text-sm font-bold text-slate-900">0.00%</span>
                    <span className="text-slate-500 ml-1.5 font-normal">0 Tasks Poor</span>
                  </div>
                </div>
              </div>

              {/* Dual-tone Progress Bar */}
              <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden flex">
                <div className="h-full bg-emerald-500" style={{ width: '90.8%' }}></div>
                <div className="h-full bg-amber-400" style={{ width: '9.2%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section Navigation Tabs */}
      <div className="border-b border-slate-200">
        <div className="flex items-center gap-4 sm:gap-8 overflow-x-auto">
          <button
            onClick={() => setActiveFeedbackSection('tasks')}
            className={`pb-3 text-xs font-bold tracking-wider uppercase transition-colors whitespace-nowrap cursor-pointer ${
              activeFeedbackSection === 'tasks'
                ? 'text-emerald-700 border-b-2 border-emerald-600'
                : 'text-slate-500 hover:text-emerald-800'
            }`}
          >
            Assignment Tasks (87)
          </button>

          <button
            onClick={() => setActiveFeedbackSection('mentorship')}
            className={`pb-3 text-xs font-bold tracking-wider uppercase transition-colors whitespace-nowrap cursor-pointer ${
              activeFeedbackSection === 'mentorship'
                ? 'text-emerald-700 border-b-2 border-emerald-600'
                : 'text-slate-500 hover:text-emerald-800'
            }`}
          >
            1-on-1 Mentorship & Viva (3)
          </button>

          <button
            onClick={() => setActiveFeedbackSection('student_submission')}
            className={`pb-3 text-xs font-bold tracking-wider uppercase transition-colors whitespace-nowrap cursor-pointer ${
              activeFeedbackSection === 'student_submission'
                ? 'text-emerald-700 border-b-2 border-emerald-600'
                : 'text-slate-500 hover:text-emerald-800'
            }`}
          >
            Submit Feedback to PBS
          </button>
        </div>
      </div>

      {/* SECTION 1: Assignment Tasks Table */}
      {activeFeedbackSection === 'tasks' && (
        <div className="space-y-4 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h3 className="text-xl font-bold text-slate-900">
              Task Evaluation Records
            </h3>

            {/* Search */}
            <div className="relative min-w-[240px]">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search by task, ID, or skill..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Filter Sub-Tabs */}
          <div className="flex items-center gap-6 text-xs font-bold">
            <button
              onClick={() => setActiveFilterTab('reviewed')}
              className={`pb-1 transition-colors cursor-pointer ${
                activeFilterTab === 'reviewed'
                  ? 'text-emerald-700 border-b-2 border-emerald-600'
                  : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              REVIEWED (87)
            </button>
            <button
              onClick={() => setActiveFilterTab('under_review')}
              className={`pb-1 transition-colors cursor-pointer ${
                activeFilterTab === 'under_review'
                  ? 'text-emerald-700 border-b-2 border-emerald-600'
                  : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              UNDER REVIEW (0)
            </button>
            <button
              onClick={() => setActiveFilterTab('resubmission')}
              className={`pb-1 transition-colors cursor-pointer ${
                activeFilterTab === 'resubmission'
                  ? 'text-emerald-700 border-b-2 border-emerald-600'
                  : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              RESUBMISSION (0)
            </button>
          </div>

          {/* Data Table */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-50/80 text-slate-500 uppercase text-[11px] font-bold tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="py-3.5 px-4 font-semibold">Id</th>
                    <th className="py-3.5 px-4 font-semibold">Task name</th>
                    <th className="py-3.5 px-4 font-semibold">Performance</th>
                    <th className="py-3.5 px-4 font-semibold">Credits</th>
                    <th className="py-3.5 px-4 font-semibold">Skills Test</th>
                    <th className="py-3.5 px-4 font-semibold">Reference Module</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {displayedTasks.map((task) => (
                    <tr 
                      key={task.id}
                      onClick={() => setSelectedTask(task)}
                      className="hover:bg-emerald-50/30 transition-colors cursor-pointer group"
                    >
                      <td className="py-3.5 px-4 font-mono text-slate-600 font-semibold group-hover:text-emerald-700">
                        {task.id}
                      </td>

                      <td className="py-3.5 px-4 font-medium text-slate-900 group-hover:text-emerald-700 transition-colors max-w-xs sm:max-w-md">
                        {task.taskName}
                      </td>

                      <td className="py-3.5 px-4">
                        {task.performance === 'excellent' ? (
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                            excellent
                          </span>
                        ) : task.performance === 'good' ? (
                          <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[11px] font-bold">
                            good
                          </span>
                        ) : (
                          <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[11px] font-bold">
                            poor
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-4 font-semibold text-slate-800">
                        {task.creditsScored}/{task.creditsTotal}
                      </td>

                      <td className="py-3.5 px-4 text-slate-600">
                        {task.skillsTest}
                      </td>

                      <td className="py-3.5 px-4 font-mono text-slate-700 font-semibold">
                        {task.referenceModule}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between text-xs text-slate-500">
              <div>
                Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredTasks.length)} of {filteredTasks.length} tasks
              </div>

              <div className="flex items-center gap-2">
                <span>{startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredTasks.length)} of {filteredTasks.length}</span>
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-1 rounded hover:bg-slate-200 text-slate-600 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-1 rounded hover:bg-slate-200 text-slate-600 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: 1-on-1 Mentorship & Viva Evaluations */}
      {activeFeedbackSection === 'mentorship' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-slate-900">
              1-on-1 Mentor Reviews & Technical Mock Interviews
            </h3>
            <p className="text-xs text-slate-500">
              Direct feedback from industry BIM Managers and Director Pravin Yadav during scheduled review sessions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MENTORSHIP_EVALUATIONS_DATA.map((evalItem) => (
              <div 
                key={evalItem.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between space-y-4 hover:border-emerald-300 transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{evalItem.placementRecommendation}</span>
                    <span className="text-sm font-black text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-200">
                      {evalItem.technicalSkillsScore} / 100
                    </span>
                  </div>

                  <h4 className="font-bold text-sm text-slate-900">{evalItem.stageName}</h4>

                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Mentor: <strong className="text-slate-800">{evalItem.evaluatorName}</strong> ({evalItem.evaluatorRole})</span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Date: {evalItem.date}</span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 italic space-y-1">
                    <span className="text-[10px] font-bold uppercase text-emerald-800 block not-italic">Mentor Remarks:</span>
                    "{evalItem.detailedRemarks}"
                  </div>

                  {/* Strengths & Improvements */}
                  <div className="space-y-1.5 pt-1 text-xs">
                    <div>
                      <span className="font-bold text-slate-700">Key Strengths: </span>
                      <span className="text-emerald-700 font-medium">{evalItem.strengths.join(', ')}</span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-700">Next Action: </span>
                      <span className="text-slate-600">{evalItem.areasOfImprovement.join(', ')}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(evalItem.overallRating || 5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="font-bold text-emerald-700">{evalItem.placementRecommendation}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 3: Student Feedback Submission Form */}
      {activeFeedbackSection === 'student_submission' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6 animate-fadeIn">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-slate-900">
              Submit Student Feedback & Doubt Requests to PBS Academic Board
            </h3>
            <p className="text-xs text-slate-500">
              Your honest feedback helps us maintain the highest teaching standards and refine BIM live datasets.
            </p>
          </div>

          {feedbackSuccess && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-emerald-900 text-xs font-bold animate-fadeIn">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Thank you! Your feedback has been logged with the PBS Academic Board and Director Pravin Yadav.</span>
            </div>
          )}

          <form onSubmit={handleStudentFeedbackSubmit} className="space-y-6 max-w-2xl">
            {/* Star Rating */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700">Overall Learning Experience Rating</label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setSubmittedRating(star)}
                    className="p-1 cursor-pointer transition-transform hover:scale-110"
                  >
                    <Star 
                      className={`w-7 h-7 ${
                        star <= submittedRating ? 'text-amber-400 fill-amber-400' : 'text-slate-300'
                      }`} 
                    />
                  </button>
                ))}
                <span className="ml-2 text-xs font-bold text-slate-700">
                  {submittedRating === 5 ? '5/5 - Outstanding Masterclass' : `${submittedRating}/5 Stars`}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Instructor / Mentor</label>
                <select
                  value={selectedInstructor}
                  onChange={(e) => setSelectedInstructor(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 font-semibold"
                >
                  <option value="Pravin Yadav (BIM Director)">Pravin Yadav (BIM Director)</option>
                  <option value="Ar. Rajesh Verma (Lead BIM Architect)">Ar. Rajesh Verma (Lead BIM Architect)</option>
                  <option value="Sunil Rao (MEP Coordinator)">Sunil Rao (MEP Coordinator)</option>
                  <option value="Academic Council / LMS Support">Academic Council / LMS Support</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Feedback Category</label>
                <select
                  value={feedbackCategory}
                  onChange={(e) => setFeedbackCategory(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 font-semibold"
                >
                  <option value="Curriculum & BIM Datasets">Curriculum & BIM Datasets</option>
                  <option value="Live Lecture Pacing">Live Lecture Pacing</option>
                  <option value="1-on-1 Doubt Clarification">1-on-1 Doubt Clarification</option>
                  <option value="Placement & Portfolio Review">Placement & Portfolio Review</option>
                  <option value="LMS Software & Speed">LMS Software & Speed</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Detailed Remarks & Suggestions</label>
              <textarea
                rows={4}
                value={studentComment}
                onChange={(e) => setStudentComment(e.target.value)}
                placeholder="Share what you liked most about the masterclass, or request specific additional Dynamo scripts / BIM LOD 500 topics..."
                className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>

            <button
              type="submit"
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm hover:shadow transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Submit Academic Feedback & Message</span>
            </button>
          </form>

          {/* Real-time Message History Thread */}
          {studentMessages.length > 0 && (
            <div className="mt-8 pt-6 border-t border-slate-100 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  Your Direct Communication Log with Admin & Faculty
                </h4>
                <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                  {studentMessages.length} Messages
                </span>
              </div>

              <div className="space-y-3">
                {studentMessages.map((msg: any) => (
                  <div 
                    key={msg.id} 
                    className={`p-4 rounded-2xl border text-xs space-y-2 ${
                      msg.sender === 'admin' 
                        ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950' 
                        : 'bg-white border-slate-200 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] uppercase ${
                          msg.sender === 'admin' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-white'
                        }`}>
                          {msg.sender === 'admin' ? 'Admin / Mentor' : 'You (Student)'}
                        </span>
                        <span className="font-bold text-slate-900">{msg.subject}</span>
                      </div>
                      <span className="text-[10px] text-slate-400">{msg.date}</span>
                    </div>
                    <p className="text-slate-700 leading-relaxed pl-1">{msg.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Task Detail Modal if selected */}
      {selectedTask && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-mono text-emerald-600 font-bold">{selectedTask.id}</span>
                <h4 className="text-base font-bold text-slate-900">{selectedTask.taskName}</h4>
              </div>
              <button 
                onClick={() => setSelectedTask(null)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex items-center justify-between">
                <span>Performance:</span>
                <span className="font-bold uppercase text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  {selectedTask.performance}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Score:</span>
                <span className="font-bold text-slate-900">{selectedTask.creditsScored} / {selectedTask.creditsTotal} Credits</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Skills Domain:</span>
                <span className="font-semibold text-slate-800">{selectedTask.skillsTest}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Evaluation Date:</span>
                <span className="text-slate-700">{selectedTask.reviewedDate || 'Recent'}</span>
              </div>
              {selectedTask.mentorNotes && (
                <div className="p-3 bg-emerald-50 rounded-lg text-slate-800 border-l-2 border-emerald-600 mt-2">
                  <div className="font-bold text-emerald-900 mb-1 flex items-center gap-1">
                    <Award className="w-3.5 h-3.5" />
                    Mentor Notes:
                  </div>
                  "{selectedTask.mentorNotes}"
                </div>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedTask(null)}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold cursor-pointer transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
