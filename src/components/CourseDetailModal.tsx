import React, { useState } from 'react';
import { Course } from '../types';
import { 
  X, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  Award, 
  FileText, 
  BookOpen, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  UserCheck, 
  Lock, 
  CreditCard,
  MessageCircle,
  Download
} from 'lucide-react';

interface CourseDetailModalProps {
  course: Course | null;
  onClose: () => void;
  onDownloadSyllabus: (course: Course) => void;
  onRegisterAndPay?: (course: Course) => void;
}

export const CourseDetailModal: React.FC<CourseDetailModalProps> = ({
  course,
  onClose,
  onDownloadSyllabus,
  onRegisterAndPay
}) => {
  if (!course) return null;

  const [expandedModule, setExpandedModule] = useState<number | null>(0);
  const [enrolledSuccess, setEnrolledSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    experience: 'Working Professional',
    preferredBatch: course.upcomingBatch
  });

  const handleSubmitEnrollment = (e: React.FormEvent) => {
    e.preventDefault();
    setEnrolledSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 relative my-8">
        
        {/* Sticky Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-slate-100 hover:bg-slate-200 text-slate-700 p-2 rounded-full transition-colors"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header Banner */}
        <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-green-800 text-white p-6 sm:p-8 rounded-t-3xl relative overflow-hidden">
          <div className="max-w-2xl space-y-3 relative z-10">
            
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-emerald-500/30 text-emerald-200 border border-emerald-400/40 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {course.category} {course.discipline ? `(${course.discipline})` : ''}
              </span>
              <span className="bg-amber-400 text-slate-950 text-xs font-black px-2.5 py-1 rounded-full uppercase">
                {course.badge || 'Professional Training'}
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              {course.title}
            </h2>

            <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
              {course.subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-emerald-200 pt-2">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-emerald-400" />
                {course.duration} ({course.hours})
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-emerald-400" />
                {course.upcomingBatch}
              </span>
              <span className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-400" />
                Verified PBS BIM Certificate
              </span>
            </div>

          </div>
        </div>

        {/* Modal Content Body */}
        <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column - Overview & Curriculum */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Description */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Program Overview</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {course.description}
              </p>
            </div>

            {/* Key Highlights */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">Key Takeaways & Benefits</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {course.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-700 bg-emerald-50/60 p-2.5 rounded-xl border border-emerald-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Curriculum Modules Accordion */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-slate-900">Curriculum & Module Breakdown</h3>
                <span className="text-xs text-emerald-700 font-semibold">{course.curriculum.length} Modules</span>
              </div>

              <div className="space-y-3">
                {course.curriculum.map((mod, index) => {
                  const isOpen = expandedModule === index;
                  return (
                    <div key={index} className="border border-slate-200 rounded-xl overflow-hidden">
                      <button
                        onClick={() => setExpandedModule(isOpen ? null : index)}
                        className="w-full bg-slate-50 hover:bg-slate-100 p-3.5 text-left flex items-center justify-between transition-colors font-bold text-sm text-slate-900"
                      >
                        <span className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-emerald-600" />
                          {mod.moduleTitle}
                        </span>
                        {isOpen ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                      </button>

                      {isOpen && (
                        <div className="p-4 bg-white border-t border-slate-200 space-y-2">
                          {mod.lessons.map((lesson, lIdx) => (
                            <div key={lIdx} className="flex items-center gap-2 text-xs text-slate-600 pl-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              <span>{lesson}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Software Covered */}
            <div>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Software Tools Included</h3>
              <div className="flex flex-wrap gap-2">
                {course.softwareCovered.map((s, i) => (
                  <span key={i} className="px-3 py-1 bg-slate-100 text-slate-800 text-xs font-semibold rounded-lg border border-slate-200">
                    {s}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column - Pricing & Enrollment Card */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-slate-50 rounded-2xl p-6 border-2 border-emerald-500/40 shadow-sm space-y-5">
              
              {/* Pricing Header */}
              <div className="space-y-1">
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-md uppercase">
                  Limited Seats Offer
                </span>
                <div className="flex items-baseline gap-3 pt-2">
                  <span className="text-3xl font-black text-slate-900">₹{course.discountedPrice.toLocaleString('en-IN')}</span>
                  <span className="text-sm text-slate-400 line-through">₹{course.originalPrice.toLocaleString('en-IN')}</span>
                </div>
                {course.installmentPrice && (
                  <div className="text-xs text-emerald-700 font-semibold">
                    Flexible Installments: {course.installmentPrice}
                  </div>
                )}
              </div>

              {/* Online Payment & Instant Seat Booking */}
              {onRegisterAndPay && (
                <button
                  onClick={() => {
                    onClose();
                    onRegisterAndPay(course);
                  }}
                  className="w-full bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs py-3 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all transform hover:scale-[1.01]"
                >
                  <CreditCard className="w-4 h-4 text-slate-950" />
                  <span>Register & Pay Online (Part Payment Available)</span>
                </button>
              )}

              {/* Brochure Download Trigger */}
              <button
                onClick={() => onDownloadSyllabus(course)}
                className="w-full bg-white hover:bg-slate-100 text-slate-800 font-bold text-xs py-2.5 rounded-xl border border-slate-300 flex items-center justify-center gap-2 transition-colors"
              >
                <Download className="w-4 h-4 text-emerald-600" />
                <span>Download Detailed Syllabus (PDF)</span>
              </button>

              <hr className="border-slate-200" />

              {/* Enrollment Form or Success View */}
              {enrolledSuccess ? (
                <div className="bg-emerald-100/80 p-5 rounded-xl border border-emerald-300 text-center space-y-3 animate-fadeIn">
                  <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="text-base font-bold text-emerald-950">Enrollment Request Received!</h4>
                  <p className="text-xs text-emerald-800 leading-relaxed">
                    Thank you <span className="font-bold">{formData.fullName}</span>. Our team will contact you on <span className="font-bold">{formData.phone}</span> with your batch confirmation and login credentials.
                  </p>
                  <button
                    onClick={() => setEnrolledSuccess(false)}
                    className="text-xs font-bold text-emerald-800 underline hover:text-emerald-950"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitEnrollment} className="space-y-3">
                  <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    Instant Batch Reservation
                  </h4>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Pravin Yadav"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g., pravin@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Phone / WhatsApp Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g., +91 8208918726"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Experience Level</label>
                    <select
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none bg-white"
                    >
                      <option value="Working Professional">Working Professional (Architect / Engineer)</option>
                      <option value="Final Year Student">Final Year Student (Civil / Mech / Arch)</option>
                      <option value="BIM Coordinator">BIM Modeler / Coordinator</option>
                      <option value="Corporate / Team">Corporate Team Inquiry</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-extrabold text-sm py-3 rounded-xl shadow-md hover:shadow-emerald-200 transition-all flex items-center justify-center gap-2"
                  >
                    <UserCheck className="w-4 h-4" />
                    <span>Confirm Batch Enrollment</span>
                  </button>

                  <p className="text-[10px] text-slate-500 text-center flex items-center justify-center gap-1">
                    <Lock className="w-3 h-3 text-slate-400" />
                    <span>Your details are 100% safe. No spam guaranteed.</span>
                  </p>
                </form>
              )}

              {/* Direct WhatsApp Option */}
              <div className="text-center pt-2">
                <a
                  href={`https://wa.me/918208918726?text=Hi%20Pragmatic%20BIM%20Solution,%20I%20want%20to%20enroll%20in%20${encodeURIComponent(course.title)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-emerald-700 font-bold hover:underline"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Prefer WhatsApp Inquiry? Click here</span>
                </a>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
