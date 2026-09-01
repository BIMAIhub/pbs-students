import React, { useState } from 'react';
import { 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  Award, 
  ChevronRight, 
  Sparkles, 
  CreditCard, 
  Download, 
  ExternalLink,
  Layers,
  GraduationCap,
  PlayCircle,
  ShieldCheck,
  PlusCircle,
  QrCode,
  ArrowUpRight
} from 'lucide-react';
import { EnrolledCourseItem } from './types';
import { pbsAdminStore, AdminCourse } from '../../utils/pbsAdminStore';

interface EnrolledCoursesTabProps {
  enrolledCourses: EnrolledCourseItem[];
  activeCourseId: string;
  onSelectActiveCourse: (courseId: string) => void;
  onOpenVideoClassroom: () => void;
  onOpenCertificateModal: () => void;
  onOpenFeeTab: () => void;
  onOpenDownloadSyllabus: (courseTitle: string) => void;
  onOpenUpiEnrollModal?: (course: AdminCourse) => void;
}

export const EnrolledCoursesTab: React.FC<EnrolledCoursesTabProps> = ({
  enrolledCourses,
  activeCourseId,
  onSelectActiveCourse,
  onOpenVideoClassroom,
  onOpenCertificateModal,
  onOpenFeeTab,
  onOpenDownloadSyllabus,
  onOpenUpiEnrollModal
}) => {
  const activeCourse = enrolledCourses.find((c) => c.courseId === activeCourseId) || enrolledCourses[0];
  const completedCount = enrolledCourses.filter(c => c.status === 'Completed').length;
  const activeCount = enrolledCourses.filter(c => c.status === 'Active').length;
  const totalEarnedCertificates = enrolledCourses.filter(c => c.certificateEarned).length;
  
  // Available Published Courses from Admin Store
  const catalogCourses = pbsAdminStore.getCourses();

  return (
    <div id="enrolled-courses-tab-container" className="space-y-8 pb-16">
      
      {/* Top Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xl">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-semibold">Total Enrolled Programs</p>
            <h3 className="text-2xl font-black text-slate-900">{enrolledCourses.length} Courses</h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-xl">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-semibold">Active In-Training</p>
            <h3 className="text-2xl font-black text-slate-900">{activeCount} Tracks</h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xl">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-semibold">Completed & Certified</p>
            <h3 className="text-2xl font-black text-slate-900">{completedCount} Masterclasses</h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xl">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-semibold">ISO 19650 Credentials</p>
            <h3 className="text-2xl font-black text-slate-900">{totalEarnedCertificates} Verified</h3>
          </div>
        </div>
      </div>

      {/* Current Active Workspace Highlight Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-900/50 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-emerald-500 text-slate-950 font-black text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full">
                Active Learning Context
              </span>
              <span className="bg-white/10 text-emerald-300 font-semibold text-xs px-2.5 py-0.5 rounded-full">
                {activeCourse.category} • {activeCourse.level}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              {activeCourse.courseTitle}
            </h2>

            <p className="text-xs sm:text-sm text-slate-300">
              Instructor: <strong className="text-white">{activeCourse.instructor}</strong> • {activeCourse.batchMode}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-400" />
                <span>{activeCourse.batchSchedule}</span>
              </div>
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-400" />
                <span>{activeCourse.completedModules} / {activeCourse.totalModules} Modules Done</span>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-72 bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 space-y-4 shrink-0">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-200">Course Progress</span>
              <span className="text-xl font-black text-emerald-400">{activeCourse.progressPercent}%</span>
            </div>

            <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
                style={{ width: `${activeCourse.progressPercent}%` }}
              ></div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={onOpenVideoClassroom}
                className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <PlayCircle className="w-4 h-4" />
                <span>Resume Lecture</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Enrolled Courses Grid */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">Your Enrolled Masterclasses & Programs</h3>
            <p className="text-xs text-slate-500">Switch workspace context or review module syllabus and fee records for each course.</p>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
            Showing all {enrolledCourses.length} active enrollments
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrolledCourses.map((course) => {
            const isCurrent = course.courseId === activeCourseId;

            return (
              <div 
                key={course.id}
                className={`bg-white rounded-2xl border transition-all duration-300 flex flex-col overflow-hidden shadow-sm hover:shadow-md ${
                  isCurrent 
                    ? 'border-2 border-emerald-500 ring-4 ring-emerald-500/10' 
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                {/* Course Image Header */}
                <div className="relative h-40 overflow-hidden bg-slate-900">
                  <img 
                    src={course.image} 
                    alt={course.courseTitle} 
                    className="w-full h-full object-cover opacity-80" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="bg-emerald-600 text-white font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full shadow">
                      {course.category}
                    </span>
                    <span className="bg-slate-900/90 text-slate-200 font-semibold text-[10px] px-2 py-0.5 rounded-md border border-slate-700">
                      {course.level}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                    <span className="font-bold flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-emerald-400" />
                      {course.batchMode}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      course.status === 'Completed' ? 'bg-emerald-500 text-slate-950' : 'bg-sky-500 text-slate-950'
                    }`}>
                      {course.status}
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-bold text-slate-900 text-sm leading-snug line-clamp-2">
                      {course.courseTitle}
                    </h4>
                    <p className="text-xs text-slate-500">
                      Instructor: <span className="font-semibold text-slate-700">{course.instructor}</span>
                    </p>
                  </div>

                  {/* Progress & Modules count */}
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-medium">Completion Rate</span>
                      <span className="font-bold text-slate-900">{course.progressPercent}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-emerald-500 rounded-full" 
                        style={{ width: `${course.progressPercent}%` }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                      <span>{course.completedModules} of {course.totalModules} Modules</span>
                      <span>Enrolled: {course.enrolledDate}</span>
                    </div>
                  </div>

                  {/* Fee & Certificate Badges */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Fee Status</span>
                      <span className={`font-bold ${
                        course.pendingBalance === 0 ? 'text-emerald-600' : 'text-amber-600'
                      }`}>
                        {course.pendingBalance === 0 ? '₹' + course.totalFee + ' (Full Paid)' : '₹' + course.paidAmount + ' Paid / ₹' + course.pendingBalance + ' Due'}
                      </span>
                    </div>

                    {course.certificateEarned && (
                      <button
                        onClick={onOpenCertificateModal}
                        className="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg transition-colors cursor-pointer"
                        title="Download Certificate"
                      >
                        <Award className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 flex items-center gap-2">
                    {isCurrent ? (
                      <button
                        onClick={onOpenVideoClassroom}
                        className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <PlayCircle className="w-4 h-4" />
                        <span>Active (Open Class)</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => onSelectActiveCourse(course.courseId)}
                        className="w-full py-2.5 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-700 font-bold text-xs rounded-xl border border-slate-200 hover:border-emerald-300 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>Switch Workspace</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    )}

                    <button
                      onClick={() => onOpenDownloadSyllabus(course.courseTitle)}
                      className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition-colors cursor-pointer shrink-0"
                      title="Download Course Syllabus"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* ================= NEW COURSE LAUNCHES & INSTANT UPI ENROLLMENT ================= */}
      <div className="space-y-4 pt-6 border-t border-slate-200">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-300">
                New 2026 Course Launches
              </span>
              <span className="text-xs text-amber-700 font-bold flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> 24-Hour Admin Verification SLA
              </span>
            </div>
            <h3 className="text-lg font-black text-slate-900 mt-1">
              Explore More Masterclasses & Elective Specializations
            </h3>
            <p className="text-xs text-slate-600">
              Select any newly launched BIM course, scan the instant UPI QR code via GPay / PhonePe (<code className="text-slate-900 font-bold bg-slate-100 px-1 py-0.5 rounded">pravinsyadavpsy99-03@oksbi</code>), and submit your transaction UTR number to enroll.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {catalogCourses.map((c) => {
            const isAlreadyEnrolled = enrolledCourses.some(e => e.courseId === c.id || e.courseTitle === c.title);
            const totalLessons = c.modules?.reduce((acc, m) => acc + (m.lessons?.length || 0), 0) || 0;

            return (
              <div
                key={c.id}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Card Thumbnail */}
                  <div className="h-40 relative overflow-hidden bg-slate-900">
                    <img
                      src={c.thumbnail}
                      alt={c.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4 justify-between">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500 text-slate-950">
                        {c.category} • {c.level}
                      </span>
                      <span className="text-xs font-black text-white bg-slate-900/80 px-2 py-0.5 rounded-md border border-white/20">
                        {c.modules?.length || 10} Modules
                      </span>
                    </div>
                  </div>

                  {/* Card Details */}
                  <div className="p-5 space-y-3">
                    <h4 className="font-extrabold text-slate-900 text-sm leading-snug line-clamp-2">
                      {c.title}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {c.description}
                    </p>

                    <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs">
                      <div className="flex justify-between text-slate-600">
                        <span>Instructor:</span>
                        <span className="font-bold text-slate-800">{c.instructor}</span>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>Curriculum:</span>
                        <span className="font-bold text-indigo-700">{totalLessons} Lessons + BIM Datasets</span>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>Fee:</span>
                        <span className="font-black text-emerald-700 text-sm">₹{c.totalFee.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enroll CTA */}
                <div className="p-5 pt-0">
                  {isAlreadyEnrolled ? (
                    <div className="w-full py-2.5 bg-emerald-50 text-emerald-800 font-bold text-xs rounded-2xl text-center border border-emerald-200 flex items-center justify-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Already In Your LMS</span>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onOpenUpiEnrollModal && onOpenUpiEnrollModal(c)}
                      className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-xs rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer group-hover:shadow-emerald-600/30"
                    >
                      <QrCode className="w-4 h-4 text-amber-300" />
                      <span>Enroll with UPI QR (₹{c.totalFee.toLocaleString('en-IN')})</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
