import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Course, StudentRegistration, PaymentReceiptRecord, AuthUser } from '../types';
import { COURSES_DATA, COMPANY_INFO, PROMOTIONS_DATA } from '../data/pbsData';
import confetti from 'canvas-confetti';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { 
  X, 
  CheckCircle2, 
  CreditCard, 
  Download, 
  Mail, 
  Sparkles, 
  Calendar, 
  ShieldCheck, 
  Building2, 
  QrCode, 
  Printer, 
  ArrowRight,
  Clock,
  MapPin,
  Check,
  Tag,
  AlertCircle
} from 'lucide-react';

interface CourseRegistrationModalProps {
  initialCourse?: Course | null;
  initialCouponCode?: string | null;
  currentUser?: AuthUser | null;
  onClose: () => void;
  onSuccessRegistration: (reg: StudentRegistration) => void;
}

export const CourseRegistrationModal: React.FC<CourseRegistrationModalProps> = ({
  initialCourse,
  initialCouponCode,
  currentUser,
  onClose,
  onSuccessRegistration
}) => {
  const [selectedCourse, setSelectedCourse] = useState<Course>(initialCourse || COURSES_DATA[0]);
  const [batchMode, setBatchMode] = useState<'Online Interactive' | 'Offline Weekend (Sat-Sun)'>('Online Interactive');
  const [paymentPlan, setPaymentPlan] = useState<'Full Payment' | 'Part Payment (Installment)'>('Part Payment (Installment)');

  // Form Inputs
  const [studentName, setStudentName] = useState(currentUser?.name || 'Pravin Yadav');
  const [studentEmail, setStudentEmail] = useState(currentUser?.email || 'pravinsyadavpsy99@gmail.com');
  const [studentPhone, setStudentPhone] = useState(currentUser?.phone || '+91 8208918726');
  const [studentOrg, setStudentOrg] = useState(currentUser?.designation || 'Civil & Structural Engineer');
  const [paymentMethod, setPaymentMethod] = useState<'GPay / PhonePe UPI' | 'Credit / Debit Card' | 'Net Banking'>('GPay / PhonePe UPI');

  // Coupon / Promotion State
  const [couponInput, setCouponInput] = useState(initialCouponCode || 'BIMPRO2026');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(initialCouponCode || 'BIMPRO2026');
  const [couponDiscountPercent, setCouponDiscountPercent] = useState<number>(10);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [couponSuccess, setCouponSuccess] = useState<string | null>('Special 40% Promotional Scholarship Applied!');

  // Sync if initialCourse changes
  useEffect(() => {
    if (initialCourse) {
      setSelectedCourse(initialCourse);
    }
  }, [initialCourse]);

  // Sync if initialCouponCode changes
  useEffect(() => {
    if (initialCouponCode) {
      setCouponInput(initialCouponCode);
      handleApplyCoupon(initialCouponCode);
    }
  }, [initialCouponCode]);

  // Google Account Simulation
  const [isGoogleSignedIn, setIsGoogleSignedIn] = useState(!!currentUser);

  // Registration step: 'form' | 'processing' | 'receipt'
  const [step, setStep] = useState<'form' | 'processing' | 'receipt'>('form');
  const [completedRegistration, setCompletedRegistration] = useState<StudentRegistration | null>(null);
  const [latestReceipt, setLatestReceipt] = useState<PaymentReceiptRecord | null>(null);

  // Email Notification Toast State
  const [emailSentToast, setEmailSentToast] = useState(false);

  // Apply Coupon Logic
  const handleApplyCoupon = (codeToApply?: string) => {
    const code = (codeToApply || couponInput).trim().toUpperCase();
    setCouponError(null);
    setCouponSuccess(null);

    const found = PROMOTIONS_DATA.find(p => p.code.toUpperCase() === code);
    if (found) {
      setAppliedCoupon(code);
      setCouponDiscountPercent(found.discountValue);
      setCouponSuccess(`Applied: ${found.title} (${found.discountValue}% Off)`);
    } else if (code === 'BIMPRO2026') {
      setAppliedCoupon('BIMPRO2026');
      setCouponDiscountPercent(40);
      setCouponSuccess('Applied: 40% Early Bird Scholarship Voucher!');
    } else if (code === 'PRAVINVIP') {
      setAppliedCoupon('PRAVINVIP');
      setCouponDiscountPercent(50);
      setCouponSuccess('Applied: 50% VIP Mentor Direct Pass!');
    } else if (code) {
      setCouponError('Invalid or expired coupon code. Try "BIMPRO2026" or "EARLYBIRD40".');
      setAppliedCoupon(null);
      setCouponDiscountPercent(0);
    }
  };

  // Payment Calculation
  const basePrice = selectedCourse.discountedPrice;
  // Apply additional discount if coupon has special bonus
  const couponDiscountAmount = appliedCoupon === 'BIMPRO2026' ? 0 : Math.round(basePrice * (couponDiscountPercent / 100));
  const finalCalculatedFee = Math.max(1000, basePrice - (appliedCoupon && appliedCoupon !== 'BIMPRO2026' ? couponDiscountAmount : 0));

  const isPartPayment = paymentPlan === 'Part Payment (Installment)';
  const amountToPayNow = isPartPayment ? Math.round(finalCalculatedFee / 2) : finalCalculatedFee;
  const pendingBalanceAfter = finalCalculatedFee - amountToPayNow;

  const handleGoogleSignIn = () => {
    setStudentName('Pravin Yadav');
    setStudentEmail('pravinsyadavpsy99@gmail.com');
    setStudentPhone('+91 8208918726');
    setIsGoogleSignedIn(true);
  };

  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || !studentEmail.trim() || !studentPhone.trim()) {
      alert('Please fill out your name, email, and phone number.');
      return;
    }

    setStep('processing');

    setTimeout(() => {
      const receiptId = `PBS-REC-${Math.floor(100000 + Math.random() * 900000)}`;
      const txnId = `TXN-${Date.now()}`;
      const nowStr = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });

      const newReceipt: PaymentReceiptRecord = {
        receiptId,
        transactionId: txnId,
        amount: amountToPayNow,
        paymentMethod,
        date: nowStr,
        paymentType: paymentPlan,
        remainingFeeAfterPayment: pendingBalanceAfter
      };

      const newRegistration: StudentRegistration = {
        id: `STU-REG-${Math.floor(1000 + Math.random() * 9000)}`,
        studentName: studentName.trim(),
        email: studentEmail.trim(),
        phone: studentPhone.trim(),
        courseId: selectedCourse.id,
        courseTitle: selectedCourse.title,
        batchMode,
        totalFee: finalCalculatedFee,
        paidAmount: amountToPayNow,
        pendingBalance: pendingBalanceAfter,
        paymentStatus: pendingBalanceAfter === 0 ? 'Full Paid' : 'Part Paid',
        registrationDate: nowStr,
        paymentReceipts: [newReceipt]
      };

      setCompletedRegistration(newRegistration);
      setLatestReceipt(newReceipt);
      setStep('receipt');
      setEmailSentToast(true);

      onSuccessRegistration(newRegistration);

      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.5 }
      });
    }, 1800);
  };

  const handleDownloadPdfReceipt = async () => {
    try {
      const receiptEl = document.getElementById('printable-receipt');
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

      if (receiptEl) {
        try {
          const canvas = await html2canvas(receiptEl, { 
            scale: 2, 
            backgroundColor: '#ffffff',
            useCORS: true,
            logging: false
          });
          const imgData = canvas.toDataURL('image/png');
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
          pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, Math.min(pdfHeight, 290));
        } catch (canvasErr) {
          console.warn('Canvas rendering fallback to native jsPDF vector text:', canvasErr);
          generateVectorPdf(pdf);
        }
      } else {
        generateVectorPdf(pdf);
      }

      pdf.save(`PBS_Receipt_${latestReceipt?.receiptId || 'OFFICIAL'}.pdf`);
    } catch (err) {
      console.error('PDF Receipt Download Error:', err);
    }
  };

  const generateVectorPdf = (pdf: jsPDF) => {
    pdf.setFillColor(6, 78, 59); // Emerald 900
    pdf.rect(0, 0, 210, 30, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(16);
    pdf.text('PRAGMATIC BIM SOLUTION - FEE RECEIPT', 14, 18);
    pdf.setFontSize(9);
    pdf.text('ISO 19650 BIM Training Academy | Er. Pravin Yadav', 14, 25);

    pdf.setTextColor(20, 20, 20);
    pdf.setFontSize(11);
    pdf.text(`Receipt ID: ${latestReceipt?.receiptId}`, 14, 45);
    pdf.text(`Date: ${latestReceipt?.date}`, 14, 52);
    pdf.text(`Student: ${studentName}`, 14, 62);
    pdf.text(`Email: ${studentEmail}`, 14, 69);
    pdf.text(`Course: ${selectedCourse.title}`, 14, 79);
    pdf.text(`Batch Mode: ${batchMode}`, 14, 86);
    pdf.text(`Total Course Fee: INR ${(finalCalculatedFee || 0).toLocaleString()}`, 14, 98);
    pdf.text(`Amount Paid: INR ${(latestReceipt?.amount || 0).toLocaleString()}`, 14, 106);
    pdf.text(`Pending Balance: INR ${(latestReceipt?.remainingFeeAfterPayment || 0).toLocaleString()}`, 14, 114);

    pdf.setFontSize(9);
    pdf.setTextColor(100, 100, 100);
    pdf.text('Official Verified Transaction - Pragmatic BIM Solution Pune Campus', 14, 135);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="bg-white text-slate-900 rounded-3xl max-w-2xl w-full my-6 border-2 border-emerald-500 shadow-2xl overflow-hidden relative"
      >
        {/* Top Bar Header */}
        <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-slate-900 text-white p-5 sm:p-6 flex items-center justify-between relative">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-amber-400 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-1">
              <Sparkles className="w-3 h-3 text-slate-950" />
              Official Online & Weekend Registration
            </div>
            <h2 className="text-lg sm:text-xl font-black text-white">
              Course Registration & Fee Payment
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-emerald-100 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-7 space-y-5">
          
          {/* STEP 1: Registration Form */}
          {step === 'form' && (
            <form onSubmit={handleProcessPayment} className="space-y-5">
              
              {/* Course Selection Dropdown */}
              <div>
                <label className="block text-xs font-black uppercase text-slate-700 tracking-wider mb-1.5">
                  1. Select Course Program
                </label>
                <select
                  value={selectedCourse.id}
                  onChange={(e) => {
                    const c = COURSES_DATA.find((item) => item.id === e.target.value);
                    if (c) setSelectedCourse(c);
                  }}
                  className="w-full bg-slate-50 text-slate-900 text-xs sm:text-sm font-bold p-3 rounded-2xl border-2 border-slate-200 outline-none focus:border-emerald-500"
                >
                  {COURSES_DATA.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.title} (₹{course.discountedPrice.toLocaleString()} - {course.duration})
                    </option>
                  ))}
                </select>
              </div>

              {/* Batch Mode Choice */}
              <div>
                <label className="block text-xs font-black uppercase text-slate-700 tracking-wider mb-1.5">
                  2. Choose Learning Mode & Batch Schedule
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  
                  {/* Online Live Interactive */}
                  <button
                    type="button"
                    onClick={() => setBatchMode('Online Interactive')}
                    className={`p-3.5 rounded-2xl border-2 text-left transition-all ${
                      batchMode === 'Online Interactive'
                        ? 'border-emerald-600 bg-emerald-50 shadow-md'
                        : 'border-slate-200 hover:border-slate-300 bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between font-extrabold text-xs sm:text-sm text-slate-900">
                      <span>🌐 Online Interactive</span>
                      {batchMode === 'Online Interactive' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                      Live interactive weekday evening batches + recorded video repository & 1:1 doubt support.
                    </p>
                  </button>

                  {/* Offline Weekend Special (Saturday & Sunday ONLY) */}
                  <button
                    type="button"
                    onClick={() => setBatchMode('Offline Weekend (Sat-Sun)')}
                    className={`p-3.5 rounded-2xl border-2 text-left transition-all relative overflow-hidden ${
                      batchMode === 'Offline Weekend (Sat-Sun)'
                        ? 'border-amber-500 bg-amber-50 shadow-md'
                        : 'border-slate-200 hover:border-slate-300 bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between font-extrabold text-xs sm:text-sm text-slate-900">
                      <span>🏫 Offline Weekend Campus</span>
                      {batchMode === 'Offline Weekend (Sat-Sun)' && <CheckCircle2 className="w-4 h-4 text-amber-600" />}
                    </div>
                    <div className="mt-1 inline-flex items-center gap-1 bg-amber-200 text-amber-900 font-bold text-[10px] px-2 py-0.5 rounded">
                      <Calendar className="w-3 h-3 text-amber-800" />
                      Saturday & Sunday ONLY
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                      Hands-on lab at PBS Pune Campus (Kondhwa). Classes held strictly on Saturdays & Sundays.
                    </p>
                  </button>

                </div>
              </div>

              {/* Student Details with Google One-Click Autofill */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase text-slate-700 tracking-wider">
                    3. Student Account Details
                  </span>

                  <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    className="bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-300 shadow-2xs flex items-center gap-2 transition-all"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                    </svg>
                    <span>Autofill via Google</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      className="w-full bg-white text-slate-900 text-xs font-bold p-2.5 rounded-xl border border-slate-300 outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={studentEmail}
                      onChange={(e) => setStudentEmail(e.target.value)}
                      className="w-full bg-white text-slate-900 text-xs font-bold p-2.5 rounded-xl border border-slate-300 outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">WhatsApp / Phone</label>
                    <input
                      type="tel"
                      required
                      value={studentPhone}
                      onChange={(e) => setStudentPhone(e.target.value)}
                      className="w-full bg-white text-slate-900 text-xs font-bold p-2.5 rounded-xl border border-slate-300 outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Profession / College</label>
                    <input
                      type="text"
                      value={studentOrg}
                      onChange={(e) => setStudentOrg(e.target.value)}
                      className="w-full bg-white text-slate-900 text-xs font-bold p-2.5 rounded-xl border border-slate-300 outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>

              {/* Coupon / Scholarship Promotion Code Input */}
              <div className="bg-emerald-50/70 p-3.5 rounded-2xl border border-emerald-300 space-y-2">
                <div className="flex items-center justify-between text-xs font-extrabold text-emerald-950">
                  <span className="flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-emerald-700" />
                    Promotional Coupon / Scholarship Code
                  </span>
                  <span className="text-[11px] text-emerald-700 font-bold">Try: BIMPRO2026</span>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter Coupon Code (e.g. BIMPRO2026)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="flex-1 bg-white text-slate-900 font-mono font-bold text-xs uppercase px-3 py-2 rounded-xl border border-emerald-300 outline-none focus:border-emerald-600"
                  />
                  <button
                    type="button"
                    onClick={() => handleApplyCoupon()}
                    className="bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs px-4 py-2 rounded-xl transition-colors shadow-2xs"
                  >
                    Apply Code
                  </button>
                </div>

                {couponSuccess && (
                  <div className="text-[11px] font-bold text-emerald-800 flex items-center gap-1 animate-fadeIn">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{couponSuccess}</span>
                  </div>
                )}

                {couponError && (
                  <div className="text-[11px] font-bold text-rose-700 flex items-center gap-1 animate-fadeIn">
                    <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                    <span>{couponError}</span>
                  </div>
                )}
              </div>

              {/* Payment Plan Selection */}
              <div>
                <label className="block text-xs font-black uppercase text-slate-700 tracking-wider mb-1.5">
                  4. Select Fee Payment Option
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  
                  {/* Part Payment */}
                  <button
                    type="button"
                    onClick={() => setPaymentPlan('Part Payment (Installment)')}
                    className={`p-3.5 rounded-2xl border-2 text-left transition-all ${
                      paymentPlan === 'Part Payment (Installment)'
                        ? 'border-emerald-600 bg-emerald-50 shadow-md'
                        : 'border-slate-200 bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between font-extrabold text-xs sm:text-sm text-slate-900">
                      <span>🌓 Part Payment (50% Down)</span>
                      <span className="bg-emerald-600 text-white font-black text-xs px-2.5 py-0.5 rounded-full">
                        ₹{Math.round((finalCalculatedFee || 0) / 2).toLocaleString()} Now
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                      Pay 50% now to reserve seat. Remaining ₹{Math.round((finalCalculatedFee || 0) / 2).toLocaleString()} due after 30 days.
                    </p>
                  </button>

                  {/* Full Payment */}
                  <button
                    type="button"
                    onClick={() => setPaymentPlan('Full Payment')}
                    className={`p-3.5 rounded-2xl border-2 text-left transition-all ${
                      paymentPlan === 'Full Payment'
                        ? 'border-emerald-600 bg-emerald-50 shadow-md'
                        : 'border-slate-200 bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between font-extrabold text-xs sm:text-sm text-slate-900">
                      <span>💳 Full Payment (100%)</span>
                      <span className="bg-slate-900 text-white font-black text-xs px-2.5 py-0.5 rounded-full">
                        ₹{(finalCalculatedFee || 0).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                      Pay 100% full fee upfront. Zero pending balance, instant verified enrollment.
                    </p>
                  </button>

                </div>
              </div>

              {/* Payment Summary Box */}
              <div className="bg-emerald-950 text-white p-4 rounded-2xl space-y-1.5 border border-emerald-800">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-emerald-200">Total Program Fee:</span>
                  <span className="font-bold">₹{(finalCalculatedFee || 0).toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-emerald-200">Amount Payable Today:</span>
                  <span className="text-amber-300 font-black text-base">₹{(amountToPayNow || 0).toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-xs border-t border-emerald-800/80 pt-1.5 text-emerald-300 font-medium">
                  <span>Pending Fee Balance After Payment:</span>
                  <span className="font-bold text-white">₹{(pendingBalanceAfter || 0).toLocaleString()}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-extrabold text-sm sm:text-base py-3.5 rounded-2xl shadow-xl transition-transform hover:scale-[1.01] flex items-center justify-center gap-2"
              >
                <CreditCard className="w-5 h-5 text-amber-300" />
                <span>Pay ₹{(amountToPayNow || 0).toLocaleString()} & Get Instant Email Receipt</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          )}

          {/* STEP 2: Processing Animation */}
          {step === 'processing' && (
            <div className="py-14 text-center space-y-4">
              <div className="w-14 h-14 mx-auto border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
              <h3 className="text-xl font-black text-slate-900">Processing Payment...</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Connecting to payment gateway, generating official PBS PDF fee receipt, and dispatching confirmation email to <span className="font-bold text-slate-800">{studentEmail}</span>...
              </p>
            </div>
          )}

          {/* STEP 3: Receipt & Success Confirmation */}
          {step === 'receipt' && completedRegistration && latestReceipt && (
            <div className="space-y-5">
              
              {/* Success Banner */}
              <div className="bg-emerald-50 border-2 border-emerald-500 p-4 rounded-2xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-extrabold text-emerald-900 text-sm">
                    Registration & Payment Successful!
                  </div>
                  <div className="text-xs text-emerald-700">
                    Your seat is locked for <span className="font-bold">{completedRegistration.courseTitle}</span> ({completedRegistration.batchMode}).
                  </div>
                </div>
              </div>

              {/* Email Sent Toast Banner */}
              {emailSentToast && (
                <div className="bg-amber-50 border border-amber-300 p-3 rounded-xl text-xs text-amber-900 flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-amber-700 flex-shrink-0" />
                    <span>Official Fee Receipt & LMS Login link sent to: <strong>{studentEmail}</strong></span>
                  </span>
                  <span className="text-[10px] bg-amber-200 text-amber-900 px-2 py-0.5 rounded font-bold uppercase">Sent</span>
                </div>
              )}

              {/* Printable Official Receipt Component (Tailwind Standard Colors Only - No OKLCH) */}
              <div
                id="printable-receipt"
                style={{ backgroundColor: '#ffffff', color: '#0f172a' }}
                className="p-5 sm:p-7 rounded-2xl border-2 border-slate-300 shadow-md space-y-5 font-sans relative"
              >
                {/* Receipt Header */}
                <div style={{ borderBottom: '2px solid #059669' }} className="flex items-start justify-between pb-4">
                  <div>
                    <div style={{ color: '#065f46' }} className="font-black text-lg">PRAGMATIC BIM SOLUTION</div>
                    <div className="text-[11px] text-slate-500 font-medium">{COMPANY_INFO.address.full}</div>
                    <div className="text-[11px] text-slate-500">Phone: {COMPANY_INFO.phonePrimary} | Email: {COMPANY_INFO.emailPrimary}</div>
                  </div>

                  <div className="text-right">
                    <span style={{ backgroundColor: '#d1fae5', color: '#065f46', border: '1px solid #6ee7b7' }} className="font-black text-xs px-3 py-1 rounded-full uppercase inline-block mb-1">
                      OFFICIAL RECEIPT
                    </span>
                    <div className="text-xs font-bold text-slate-800">ID: {latestReceipt.receiptId}</div>
                    <div className="text-[11px] text-slate-500">Date: {latestReceipt.date}</div>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-500 font-bold block uppercase text-[10px]">Student Name</span>
                    <span className="font-extrabold text-slate-900 text-sm">{completedRegistration.studentName}</span>
                  </div>

                  <div>
                    <span className="text-slate-500 font-bold block uppercase text-[10px]">Student Email</span>
                    <span className="font-extrabold text-slate-900">{completedRegistration.email}</span>
                  </div>

                  <div>
                    <span className="text-slate-500 font-bold block uppercase text-[10px]">Enrolled Program</span>
                    <span className="font-bold text-slate-900">{completedRegistration.courseTitle}</span>
                  </div>

                  <div>
                    <span className="text-slate-500 font-bold block uppercase text-[10px]">Batch Mode</span>
                    <span style={{ color: '#047857' }} className="font-bold">{completedRegistration.batchMode}</span>
                  </div>
                </div>

                {/* Financial Table Breakdown */}
                <div style={{ backgroundColor: '#f8fafc', borderColor: '#e2e8f0' }} className="rounded-xl border overflow-hidden text-xs">
                  <div style={{ backgroundColor: '#e2e8f0', color: '#334155' }} className="px-4 py-2 font-black flex justify-between">
                    <span>DESCRIPTION</span>
                    <span>AMOUNT</span>
                  </div>
                  <div className="p-3.5 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-700 font-medium">Total Course Fee</span>
                      <span className="font-bold">₹{(completedRegistration.totalFee || 0).toLocaleString()}</span>
                    </div>
                    <div style={{ color: '#047857' }} className="flex justify-between font-extrabold">
                      <span>Paid in Current Transaction ({latestReceipt.paymentType})</span>
                      <span>₹{(latestReceipt.amount || 0).toLocaleString()}</span>
                    </div>
                    <div style={{ borderTop: '1px solid #e2e8f0', color: '#92400e' }} className="flex justify-between pt-2 font-black text-sm">
                      <span>Pending Fee Balance Due</span>
                      <span>₹{(completedRegistration.pendingBalance || 0).toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Official PBS Stamp Footer */}
                <div style={{ borderTop: '1px solid #e2e8f0' }} className="flex items-center justify-between pt-3 text-[10px] text-slate-500">
                  <div style={{ color: '#047857' }} className="flex items-center gap-1.5 font-mono font-bold">
                    <QrCode className="w-4 h-4" />
                    <span>VERIFIED PBS TRANSACTION</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-slate-800">Er. Pravin Yadav</div>
                    <div>Founder & Lead BIM Coordinator</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  onClick={handleDownloadPdfReceipt}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-5 py-3 rounded-xl shadow-md flex items-center gap-2 transition-transform hover:scale-105"
                >
                  <Download className="w-4 h-4" />
                  <span>Download PDF Receipt</span>
                </button>

                <button
                  onClick={onClose}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs px-6 py-3 rounded-xl shadow-md"
                >
                  Open Student LMS Dashboard
                </button>
              </div>

            </div>
          )}

        </div>
      </motion.div>
    </div>
  );
};
