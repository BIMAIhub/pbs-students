import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  QrCode, 
  Copy, 
  Check, 
  ShieldCheck, 
  CreditCard, 
  Clock, 
  Sparkles, 
  FileText, 
  Smartphone, 
  Upload, 
  AlertCircle,
  BookOpen,
  ArrowRight,
  Download,
  Building2,
  ExternalLink
} from 'lucide-react';
import { AdminCourse, pbsAdminStore, EnrollmentRequest } from '../../utils/pbsAdminStore';
import jsPDF from 'jspdf';

interface CourseUpiEnrollModalProps {
  course: AdminCourse | null;
  isOpen: boolean;
  onClose: () => void;
  currentUser?: {
    studentId?: string;
    fullName?: string;
    email?: string;
    phone?: string;
  };
  onEnrollmentSuccess?: (request: EnrollmentRequest) => void;
}

export const CourseUpiEnrollModal: React.FC<CourseUpiEnrollModalProps> = ({
  course,
  isOpen,
  onClose,
  currentUser,
  onEnrollmentSuccess
}) => {
  if (!isOpen || !course) return null;

  const [paymentPlan, setPaymentPlan] = useState<'full' | 'part'>('full');
  const [studentName, setStudentName] = useState(currentUser?.fullName || 'Pravin Yadav');
  const [studentEmail, setStudentEmail] = useState(currentUser?.email || 'pravin.yadav.0926@pbs.com');
  const [studentPhone, setStudentPhone] = useState(currentUser?.phone || '+91 8208918726');
  const [transactionId, setTransactionId] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'GPay' | 'PhonePe' | 'Paytm' | 'Bank Transfer'>('UPI');
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
  
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRequest, setSubmittedRequest] = useState<EnrollmentRequest | null>(null);

  const UPI_ID = 'pravinsyadavpsy99-03@oksbi';
  const PAYEE_NAME = 'Pragmatic BIM Solution';

  const totalFee = course.totalFee || 14999;
  const amountToPay = paymentPlan === 'full' ? totalFee : Math.round(totalFee / 2);
  const pendingBalance = totalFee - amountToPay;

  // Dynamic UPI Payment Link URI with auto-filled amount & note
  const upiIntentString = `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(PAYEE_NAME)}&am=${amountToPay}&cu=INR&tn=${encodeURIComponent(`PBS Enroll - ${course.title.slice(0, 20)}`)}`;

  // Quick QR Code Image generator via Google Chart QR API with fallback
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(upiIntentString)}&margin=10`;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(UPI_ID);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  const handleScreenshotUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setScreenshotPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!transactionId.trim()) {
      alert('Please enter your 12-digit UPI UTR number / Transaction Reference ID.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const newReq = pbsAdminStore.submitEnrollmentRequest({
        studentId: currentUser?.studentId || 'PBS-STU-2026-8492',
        studentName: studentName.trim(),
        studentEmail: studentEmail.trim(),
        studentPhone: studentPhone.trim(),
        courseId: course.id,
        courseTitle: course.title,
        totalFee,
        amountPaid: amountToPay,
        pendingBalance,
        paymentPlan: paymentPlan === 'full' ? 'Full Payment' : 'Part Payment (50%)',
        paymentMethod,
        upiId: UPI_ID,
        transactionId: transactionId.trim(),
        screenshotUrl: screenshotPreview || undefined
      });

      setIsSubmitting(false);
      setSubmittedRequest(newReq);
      if (onEnrollmentSuccess) {
        onEnrollmentSuccess(newReq);
      }
    }, 600);
  };

  const handleDownloadReceipt = () => {
    if (!submittedRequest) return;
    const doc = new jsPDF();

    // Institutional Header
    doc.setFillColor(16, 185, 129);
    doc.rect(0, 0, 210, 32, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('PRAGMATIC BIM SOLUTION (PBS)', 15, 15);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text('ISO 19650 International BIM Management & Academy | Official Payment Slip', 15, 24);

    // Document Info
    doc.setTextColor(51, 65, 85);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('COURSE ENROLLMENT ACKNOWLEDGMENT', 15, 45);

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text(`Request ID: ${submittedRequest.id}`, 15, 54);
    doc.text(`Submission Date: ${new Date(submittedRequest.submittedAt).toLocaleString('en-IN')}`, 15, 60);
    doc.text(`Verification SLA: 24 Hours (By ${new Date(submittedRequest.slaDeadline).toLocaleString('en-IN')})`, 15, 66);
    doc.text(`Verification Status: Pending Admin Approval & Roster Assignment`, 15, 72);

    // Student & Course Grid
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(15, 80, 180, 55, 2, 2, 'F');

    doc.setFont('helvetica', 'bold');
    doc.text('Candidate Details:', 20, 90);
    doc.setFont('helvetica', 'normal');
    doc.text(`Name: ${submittedRequest.studentName}`, 20, 97);
    doc.text(`Email: ${submittedRequest.studentEmail}`, 20, 104);
    doc.text(`Phone: ${submittedRequest.studentPhone}`, 20, 111);
    doc.text(`Student ID: ${submittedRequest.studentId}`, 20, 118);

    doc.setFont('helvetica', 'bold');
    doc.text('Course & Payment Info:', 110, 90);
    doc.setFont('helvetica', 'normal');
    doc.text(`Course: ${submittedRequest.courseTitle.slice(0, 35)}...`, 110, 97);
    doc.text(`Beneficiary UPI: ${submittedRequest.upiId}`, 110, 104);
    doc.text(`Transaction UTR: ${submittedRequest.transactionId}`, 110, 111);
    doc.text(`Payment Mode: ${submittedRequest.paymentMethod}`, 110, 118);

    // Financial Calculation Table
    doc.roundedRect(15, 145, 180, 42, 2, 2);
    doc.setFont('helvetica', 'bold');
    doc.text('Financial Summary', 20, 154);
    doc.setFont('helvetica', 'normal');
    doc.text(`Total Program Fee:`, 20, 163);
    doc.text(`₹${submittedRequest.totalFee.toLocaleString('en-IN')}`, 160, 163);

    doc.text(`Amount Paid via UPI (${submittedRequest.paymentPlan}):`, 20, 171);
    doc.setTextColor(16, 185, 129);
    doc.setFont('helvetica', 'bold');
    doc.text(`₹${submittedRequest.amountPaid.toLocaleString('en-IN')}`, 160, 171);

    doc.setTextColor(217, 119, 6);
    doc.setFont('helvetica', 'normal');
    doc.text(`Pending Balance to Clear:`, 20, 179);
    doc.text(`₹${submittedRequest.pendingBalance.toLocaleString('en-IN')}`, 160, 179);

    // Note Footer
    doc.setTextColor(100, 116, 139);
    doc.setFontSize(8);
    doc.text('Note: This is a system-generated enrollment slip. Once Admin reconciles with bank records (within 24h),', 15, 205);
    doc.text('your 10 course modules and BIM datasets will automatically unlock in your PBS Student Dashboard.', 15, 211);
    doc.text('For urgent access, contact PBS Academic Desk: pravinsyadavpsy99@gmail.com', 15, 217);

    doc.save(`PBS_Enrollment_Slip_${submittedRequest.id}.pdf`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 px-6 py-5 text-white flex items-center justify-between border-b border-emerald-900/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase font-bold">
                Instant UPI Course Enrollment
              </div>
              <h2 className="text-lg font-black text-white">{course.title}</h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        {!submittedRequest ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
            
            {/* Course Summary Pill */}
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-600 text-white">
                    {course.category}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    {course.modules?.length || 10} Modules • 30+ Video Lessons • BIM Central Datasets
                  </span>
                </div>
                <div className="text-xs text-slate-600 mt-1">
                  Instructor: <span className="font-semibold text-slate-900">{course.instructor}</span> • Batch: <span className="font-semibold text-slate-900">{course.batchMode}</span>
                </div>
              </div>

              <div className="text-right sm:border-l sm:border-emerald-200 sm:pl-4">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Total Course Fee</div>
                <div className="text-xl font-black text-slate-900">₹{totalFee.toLocaleString('en-IN')}</div>
              </div>
            </div>

            {/* Step 1: Select Payment Plan */}
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
                1. Select Fee Payment Option
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentPlan('full')}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                    paymentPlan === 'full'
                      ? 'border-emerald-500 bg-emerald-50/50 ring-2 ring-emerald-500/20 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-extrabold text-slate-900">Full Course Fee (100%)</span>
                    <span className="px-2 py-0.5 bg-emerald-600 text-white font-black text-xs rounded-full">
                      ₹{totalFee.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Complete one-time clearance. Zero pending dues.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentPlan('part')}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                    paymentPlan === 'part'
                      ? 'border-emerald-500 bg-emerald-50/50 ring-2 ring-emerald-500/20 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-extrabold text-slate-900">50% Part Payment</span>
                    <span className="px-2 py-0.5 bg-amber-500 text-white font-black text-xs rounded-full">
                      ₹{Math.round(totalFee / 2).toLocaleString('en-IN')} Now
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Pay 50% now to unlock initial 5 modules. Remaining due in 30 days.
                  </p>
                </button>
              </div>
            </div>

            {/* Step 2: Dynamic UPI QR Code & Payment Details */}
            <div className="bg-slate-900 text-white rounded-3xl p-5 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                    Official Beneficiary UPI Gateway
                  </span>
                </div>
                <span className="text-xs text-slate-400">Auto-filled Amount: <strong className="text-white">₹{amountToPay.toLocaleString('en-IN')}</strong></span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                {/* QR Code Container */}
                <div className="md:col-span-5 flex flex-col items-center justify-center p-3 bg-white rounded-2xl shadow-inner border border-slate-200">
                  <img
                    src={qrCodeUrl}
                    alt="PBS UPI Payment QR Code"
                    className="w-44 h-44 object-contain rounded-lg"
                  />
                  <div className="text-[10px] text-slate-600 font-bold mt-2 text-center flex items-center gap-1">
                    <Smartphone className="w-3 h-3 text-emerald-600" />
                    <span>Scan with GPay / PhonePe / Paytm</span>
                  </div>
                  <div className="text-[9px] text-slate-400 text-center mt-0.5">
                    Amount is preset to ₹{amountToPay.toLocaleString('en-IN')}
                  </div>
                </div>

                {/* UPI ID Details & Mobile Apps */}
                <div className="md:col-span-7 space-y-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Official PBS UPI ID</span>
                    <div className="mt-1 flex items-center gap-2 p-2.5 bg-slate-800/90 rounded-xl border border-slate-700">
                      <code className="text-xs font-mono font-bold text-emerald-300 flex-1 truncate select-all">
                        {UPI_ID}
                      </code>
                      <button
                        type="button"
                        onClick={handleCopyUpi}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1 transition-all cursor-pointer shrink-0"
                      >
                        {copiedUpi ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy UPI</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="text-xs text-slate-300 space-y-1">
                    <div>Beneficiary: <span className="font-semibold text-white">Pragmatic BIM Solution (State Bank of India)</span></div>
                    <div>Course Enrollment: <span className="font-semibold text-emerald-300">{course.title}</span></div>
                    <div>Payable Amount: <span className="font-black text-amber-300 text-sm">₹{amountToPay.toLocaleString('en-IN')}</span></div>
                  </div>

                  {/* Direct Mobile UPI Intent Buttons */}
                  <div className="pt-1">
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1.5">
                      Or Open Installed UPI App:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <a
                        href={upiIntentString}
                        className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition-colors"
                      >
                        <Smartphone className="w-3.5 h-3.5 text-blue-400" />
                        <span>Google Pay</span>
                      </a>
                      <a
                        href={upiIntentString}
                        className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition-colors"
                      >
                        <Smartphone className="w-3.5 h-3.5 text-purple-400" />
                        <span>PhonePe</span>
                      </a>
                      <a
                        href={upiIntentString}
                        className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition-colors"
                      >
                        <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Paytm / BHIM</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Enter Verification & Transaction Proof */}
            <div className="space-y-4 pt-2">
              <label className="block text-xs font-black uppercase tracking-wider text-slate-700">
                2. Enter Student Details & Transaction Reference (UTR)
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-500 font-semibold mb-1">Student Full Name *</label>
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    required
                    placeholder="Pravin Yadav"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-slate-500 font-semibold mb-1">Institutional / Personal Email *</label>
                  <input
                    type="email"
                    value={studentEmail}
                    onChange={(e) => setStudentEmail(e.target.value)}
                    required
                    placeholder="pravin.yadav.0926@pbs.com"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-slate-500 font-semibold mb-1">WhatsApp / Phone *</label>
                  <input
                    type="tel"
                    value={studentPhone}
                    onChange={(e) => setStudentPhone(e.target.value)}
                    required
                    placeholder="+91 8208918726"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-500 font-semibold mb-1">
                    12-digit UPI UTR / Transaction ID *
                  </label>
                  <input
                    type="text"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    required
                    placeholder="e.g. 424589201994 or UPI/1288301"
                    className="w-full px-3 py-2 text-xs font-mono font-bold border border-emerald-300 bg-emerald-50/30 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                  <span className="text-[10px] text-slate-400 block mt-0.5">Found in your GPay / PhonePe payment receipt</span>
                </div>

                <div>
                  <label className="block text-[11px] text-slate-500 font-semibold mb-1">
                    Optional Payment Screenshot
                  </label>
                  <div className="flex items-center gap-2">
                    <label className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-dashed border-slate-300 rounded-xl text-xs text-slate-600 hover:bg-slate-50 cursor-pointer transition-colors">
                      <Upload className="w-3.5 h-3.5 text-slate-400" />
                      <span className="truncate">{screenshotPreview ? 'Screenshot Attached' : 'Upload Receipt Screenshot'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleScreenshotUpload}
                        className="hidden"
                      />
                    </label>
                    {screenshotPreview && (
                      <div className="w-8 h-8 rounded-lg overflow-hidden border border-emerald-500 shrink-0">
                        <img src={screenshotPreview} alt="Screenshot" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* 24-Hour SLA Guarantee Notice */}
            <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-4 flex items-start gap-3">
              <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-xs text-amber-900 space-y-1">
                <div className="font-bold">24-Hour Admin Verification & Course Assignment Guarantee</div>
                <div className="text-amber-800 text-[11px] leading-relaxed">
                  Upon submitting your transaction ID, the PBS Academic Administration team reconciles the bank ledger and assigns <strong>"{course.title}"</strong> directly to your profile within <strong>24 hours</strong>. All 10 modular video sessions and BIM family libraries will unlock automatically.
                </div>
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-sm rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Registering Enrollment Request...</span>
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4 text-amber-300" />
                    <span>Submit UPI Payment Proof & Request Course Enrollment</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          /* Confirmation Success Screen */
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-wider rounded-full">
                Enrollment Request Submitted Successfully
              </span>
              <h3 className="text-2xl font-black text-slate-900">
                Payment Proof Received for Verification
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Request ID: <strong className="text-slate-900 font-mono">{submittedRequest.id}</strong> • UTR Ref: <strong className="text-slate-900 font-mono">{submittedRequest.transactionId}</strong>
              </p>
            </div>

            {/* Details Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5 text-left max-w-lg mx-auto space-y-3">
              <div className="flex justify-between text-xs pb-2 border-b border-slate-200">
                <span className="text-slate-500 font-medium">Course Requested:</span>
                <span className="font-bold text-slate-900 text-right">{submittedRequest.courseTitle}</span>
              </div>

              <div className="flex justify-between text-xs pb-2 border-b border-slate-200">
                <span className="text-slate-500 font-medium">Enrolled Candidate:</span>
                <span className="font-bold text-slate-900">{submittedRequest.studentName} ({submittedRequest.studentEmail})</span>
              </div>

              <div className="flex justify-between text-xs pb-2 border-b border-slate-200">
                <span className="text-slate-500 font-medium">Amount Submitted:</span>
                <span className="font-extrabold text-emerald-700">₹{submittedRequest.amountPaid.toLocaleString('en-IN')} ({submittedRequest.paymentPlan})</span>
              </div>

              <div className="flex justify-between text-xs pb-2 border-b border-slate-200">
                <span className="text-slate-500 font-medium">Target Turnaround SLA:</span>
                <span className="font-bold text-amber-700 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Within 24 Hours ({new Date(submittedRequest.slaDeadline).toLocaleDateString('en-IN')})</span>
                </span>
              </div>

              <div className="flex justify-between text-xs">
                <span className="text-slate-500 font-medium">Current Status:</span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-800">
                  Pending Admin Bank Reconciliation
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={handleDownloadReceipt}
                className="w-full sm:w-auto px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl text-xs font-extrabold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <Download className="w-4 h-4 text-emerald-400" />
                <span>Download Payment Slip (PDF)</span>
              </button>

              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-extrabold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <span>Return to Course Dashboard</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
