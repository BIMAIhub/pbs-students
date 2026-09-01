import React, { useState } from 'react';
import { 
  CreditCard, 
  Download, 
  Receipt, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  FileText, 
  ShieldCheck, 
  ArrowUpRight, 
  Printer, 
  Search, 
  Filter, 
  DollarSign, 
  Percent,
  ExternalLink
} from 'lucide-react';
import { FeeReceiptItem, EnrolledCourseItem } from './types';
import jsPDF from 'jspdf';

interface FeeFinancialsTabProps {
  enrolledCourses: EnrolledCourseItem[];
  feeReceipts: FeeReceiptItem[];
  onOpenPayFeeModal: (courseTitle: string, courseId: string, pendingBalance: number) => void;
}

export const FeeFinancialsTab: React.FC<FeeFinancialsTabProps> = ({
  enrolledCourses = [],
  feeReceipts = [],
  onOpenPayFeeModal
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourseFilter, setSelectedCourseFilter] = useState('all');

  // Aggregate metrics
  const safeEnrolled = enrolledCourses || [];
  const safeReceipts = feeReceipts || [];

  const totalFees = safeEnrolled.reduce((acc, c) => acc + (c.totalFee || 0), 0);
  const totalPaid = safeEnrolled.reduce((acc, c) => acc + (c.paidAmount || 0), 0);
  const totalPending = safeEnrolled.reduce((acc, c) => acc + (c.pendingBalance || 0), 0);
  const totalScholarshipSaved = 12000; // PBS BIM Merit Scholarship

  // Filtered receipts
  const filteredReceipts = safeReceipts.filter((receipt) => {
    const matchesSearch = 
      (receipt.receiptId || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (receipt.invoiceNumber || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (receipt.courseTitle || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (receipt.transactionId || '').toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCourse = selectedCourseFilter === 'all' || receipt.courseId === selectedCourseFilter;
    return matchesSearch && matchesCourse;
  });

  const handleDownloadInvoicePDF = (receipt: FeeReceiptItem) => {
    const doc = new jsPDF();
    
    // Header
    doc.setFillColor(15, 23, 42); // slate-900
    doc.rect(0, 0, 210, 40, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.text('PRAGMATIC BIM SOLUTION', 15, 20);
    doc.setFontSize(9);
    doc.setTextColor(52, 211, 153); // emerald-400
    doc.text('Official Fee Receipt & Tax Invoice (GST Registered: 27AABCP1234F1Z5)', 15, 28);
    
    // Receipt meta
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(12);
    doc.text(`INVOICE: ${receipt.invoiceNumber}`, 15, 55);
    doc.setFontSize(10);
    doc.setTextColor(100, 116, 139);
    doc.text(`Receipt ID: ${receipt.receiptId}`, 15, 62);
    doc.text(`Date of Payment: ${receipt.date}`, 15, 68);
    doc.text(`Transaction Ref: ${receipt.transactionId}`, 15, 74);
    doc.text(`Payment Gateway: ${receipt.paymentMethod}`, 15, 80);
    
    // Student Info
    doc.setDrawColor(226, 232, 240);
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(120, 48, 75, 36, 3, 3, 'FD');
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(9);
    doc.text('BILLED TO:', 125, 55);
    doc.setFontSize(10);
    doc.text('Pravin Yadav', 125, 62);
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text('Student ID: PBS-STU-2026-8492', 125, 68);
    doc.text('Email: pravin.yadav@example.com', 125, 74);
    doc.text('Hinjawadi, Pune, Maharashtra', 125, 80);
    
    // Table Line
    doc.setDrawColor(16, 185, 129); // emerald-500
    doc.setLineWidth(0.5);
    doc.line(15, 95, 195, 95);
    
    // Table Header
    doc.setFontSize(9);
    doc.setTextColor(15, 23, 42);
    doc.text('Course Description / Specialization', 15, 103);
    doc.text('Type', 120, 103);
    doc.text('Amount (INR)', 165, 103);
    
    doc.line(15, 107, 195, 107);
    
    // Table Row
    doc.setFontSize(9);
    doc.setTextColor(51, 65, 85);
    doc.text(receipt.courseTitle, 15, 118);
    doc.text(receipt.paymentType || 'Installment', 120, 118);
    doc.text(`₹${(receipt.amount || 0).toLocaleString('en-IN')}`, 165, 118);
    
    // Summary calculation box
    doc.roundedRect(120, 135, 75, 45, 2, 2);
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text('Subtotal (Base Fee):', 125, 143);
    doc.text(`₹${((receipt.amount || 0) - (receipt.taxGst || 0)).toLocaleString('en-IN')}`, 175, 143);
    
    doc.text('IGST / CGST+SGST (18%):', 125, 151);
    doc.text(`₹${(receipt.taxGst || Math.round((receipt.amount || 0) * 0.18)).toLocaleString('en-IN')}`, 175, 151);
    
    doc.setFontSize(10);
    doc.setTextColor(16, 185, 129);
    doc.text('TOTAL PAID:', 125, 163);
    doc.text(`₹${(receipt.amount || 0).toLocaleString('en-IN')}`, 175, 163);
    
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text('Status: COMPLETED (Verified via PBS Payment Gateway)', 125, 173);
    
    // Footer notes
    doc.setFontSize(8);
    doc.text('Terms & Conditions:', 15, 220);
    doc.text('1. Fee receipts are computer-generated and do not require a physical signature.', 15, 226);
    doc.text('2. Fees paid cover all classroom modules, live doubt clearing, software datasets & LMS lifetime access.', 15, 232);
    doc.text('3. For tax invoice queries or company sponsorship reimbursement, contact accounts@pragmaticbim.com', 15, 238);
    
    doc.save(`${receipt.receiptId}_Invoice.pdf`);
  };

  return (
    <div id="fee-financials-tab-container" className="space-y-8 pb-16">
      
      {/* Top Financial Stats Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-semibold">Total Program Fees</span>
            <span className="p-2 rounded-xl bg-slate-100 text-slate-700">
              <DollarSign className="w-4 h-4" />
            </span>
          </div>
          <h3 className="text-2xl font-black text-slate-900 font-mono">
            ₹{totalFees.toLocaleString('en-IN')}
          </h3>
          <p className="text-[11px] text-slate-400">Sum of 3 enrolled masterclasses</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-emerald-200 shadow-sm space-y-2 bg-emerald-50/20">
          <div className="flex items-center justify-between">
            <span className="text-xs text-emerald-800 font-semibold">Total Paid Amount</span>
            <span className="p-2 rounded-xl bg-emerald-100 text-emerald-700">
              <CheckCircle2 className="w-4 h-4" />
            </span>
          </div>
          <h3 className="text-2xl font-black text-emerald-700 font-mono">
            ₹{totalPaid.toLocaleString('en-IN')}
          </h3>
          <p className="text-[11px] text-emerald-600 font-semibold">82% of overall fees settled</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-amber-200 shadow-sm space-y-2 bg-amber-50/20">
          <div className="flex items-center justify-between">
            <span className="text-xs text-amber-800 font-semibold">Pending Balance Due</span>
            <span className="p-2 rounded-xl bg-amber-100 text-amber-700">
              <Clock className="w-4 h-4" />
            </span>
          </div>
          <h3 className="text-2xl font-black text-amber-700 font-mono">
            ₹{totalPending.toLocaleString('en-IN')}
          </h3>
          <p className="text-[11px] text-amber-600 font-semibold">Revit MEP 2nd Installment</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-200 shadow-sm space-y-2 bg-purple-50/20">
          <div className="flex items-center justify-between">
            <span className="text-xs text-purple-800 font-semibold">Scholarship Grant Saved</span>
            <span className="p-2 rounded-xl bg-purple-100 text-purple-700">
              <Sparkles className="w-4 h-4" />
            </span>
          </div>
          <h3 className="text-2xl font-black text-purple-700 font-mono">
            ₹{totalScholarshipSaved.toLocaleString('en-IN')}
          </h3>
          <p className="text-[11px] text-purple-600 font-semibold">Merit BIM Grant applied</p>
        </div>
      </div>

      {/* Course-Wise Fee Breakdown Cards */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">Course-Wise Fee Settlement Status</h3>
          <p className="text-xs text-slate-500">Track tuition payments, upcoming installment schedules, and settle remaining dues directly.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(enrolledCourses || []).map((course, cIdx) => {
            const isFullPaid = course.pendingBalance === 0;

            return (
              <div 
                key={course.id || course.courseId || cIdx} 
                className={`p-5 rounded-2xl border flex flex-col justify-between space-y-4 ${
                  isFullPaid 
                    ? 'bg-emerald-50/30 border-emerald-200' 
                    : 'bg-amber-50/30 border-amber-200'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{course.category}</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      isFullPaid 
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                        : 'bg-amber-100 text-amber-800 border border-amber-200'
                    }`}>
                      {isFullPaid ? 'Full Paid' : 'Part Paid (1 Due)'}
                    </span>
                  </div>

                  <h4 className="font-bold text-sm text-slate-900 line-clamp-2">{course.courseTitle}</h4>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-200/80 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Total Fee:</span>
                    <span className="font-mono font-bold text-slate-900">₹{(course.totalFee || 0).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-emerald-700">
                    <span>Paid Amount:</span>
                    <span className="font-mono font-bold">₹{(course.paidAmount || 0).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Pending Due:</span>
                    <span className={`font-mono font-bold ${(course.pendingBalance || 0) > 0 ? 'text-amber-600' : 'text-slate-400'}`}>
                      ₹{(course.pendingBalance || 0).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  {isFullPaid ? (
                    <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-bold justify-center py-2 bg-emerald-100/60 rounded-xl">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>100% Fees Clear</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => onOpenPayFeeModal(course.courseTitle, course.courseId, course.pendingBalance || 0)}
                      className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>Pay Balance (₹{(course.pendingBalance || 0).toLocaleString('en-IN')})</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Official Payment Receipts & Tax Invoices Table */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">Payment Receipts & Tax Invoices</h3>
            <p className="text-xs text-slate-500">Download verified GST invoices for reimbursement or academic financial filing.</p>
          </div>

          {/* Search & Filter */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search receipt ID, txn..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <select
              value={selectedCourseFilter}
              onChange={(e) => setSelectedCourseFilter(e.target.value)}
              className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 font-semibold"
            >
              <option value="all">All Courses</option>
              {(enrolledCourses || []).map(c => (
                <option key={c.courseId || c.id} value={c.courseId}>{c.courseTitle?.slice(0, 20)}...</option>
              ))}
            </select>
          </div>
        </div>

        {/* Receipts Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
                <th className="pb-3 px-3">Receipt / Invoice No.</th>
                <th className="pb-3 px-3">Course</th>
                <th className="pb-3 px-3">Date</th>
                <th className="pb-3 px-3">Method & Txn ID</th>
                <th className="pb-3 px-3">Type</th>
                <th className="pb-3 px-3">Amount</th>
                <th className="pb-3 px-3 text-right">Invoice PDF</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {(filteredReceipts || []).map((receipt, rIdx) => (
                <tr key={receipt.receiptId || receipt.invoiceNumber || rIdx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-3">
                    <div className="font-mono font-bold text-slate-900">{receipt.receiptId}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{receipt.invoiceNumber}</div>
                  </td>

                  <td className="py-3.5 px-3 max-w-xs">
                    <span className="font-semibold text-slate-800 line-clamp-1">{receipt.courseTitle}</span>
                  </td>

                  <td className="py-3.5 px-3 text-slate-600 whitespace-nowrap">
                    {receipt.date}
                  </td>

                  <td className="py-3.5 px-3">
                    <div className="text-slate-800 font-medium">{receipt.paymentMethod}</div>
                    <div className="text-[10px] text-emerald-700 font-mono">{receipt.transactionId}</div>
                  </td>

                  <td className="py-3.5 px-3">
                    <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px] font-semibold whitespace-nowrap">
                      {receipt.paymentType}
                    </span>
                  </td>

                  <td className="py-3.5 px-3">
                    <span className="font-mono font-black text-slate-900 text-sm">
                      ₹{(receipt.amount || 0).toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] text-slate-400 block">+ ₹{receipt.taxGst || 0} GST (18%)</span>
                  </td>

                  <td className="py-3.5 px-3 text-right">
                    <button
                      onClick={() => handleDownloadInvoicePDF(receipt)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-lg text-xs font-bold transition-all cursor-pointer shadow-2xs hover:shadow"
                      title="Download Official Tax Invoice PDF"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredReceipts.length === 0 && (
          <div className="text-center py-8 text-slate-400 text-xs">
            No receipts found matching your search term.
          </div>
        )}
      </div>

    </div>
  );
};
