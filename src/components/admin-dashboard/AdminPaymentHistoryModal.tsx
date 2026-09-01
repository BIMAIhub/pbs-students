import React, { useState, useEffect } from 'react';
import { X, IndianRupee, Download, CheckCircle2, History } from 'lucide-react';
import { ManagedStudent } from '../../utils/pbsAdminStore';
import { soundFx } from '../../utils/soundEffects';
import { FeeReceiptItem } from '../student-dashboard/types';
import jsPDF from 'jspdf';

interface AdminPaymentHistoryModalProps {
  student: ManagedStudent;
  onClose: () => void;
}

export const AdminPaymentHistoryModal: React.FC<AdminPaymentHistoryModalProps> = ({
  student,
  onClose
}) => {
  const [receipts, setReceipts] = useState<FeeReceiptItem[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('pbs_student_receipts');
      if (stored) {
        const allReceipts = JSON.parse(stored) as FeeReceiptItem[];
        setReceipts(allReceipts);
      }
    } catch {}
  }, []);

  const handleDownloadInvoicePDF = (receipt: FeeReceiptItem) => {
    soundFx.playClick();
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
    doc.text(student.name, 125, 62);
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text(`Student ID: ${student.studentId}`, 125, 68);
    doc.text(`Email: ${student.email}`, 125, 74);
    doc.text(`Phone: ${student.phone || 'N/A'}`, 125, 80);
    
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
    doc.text(`Rs ${receipt.amount.toLocaleString('en-IN')}`, 165, 118);
    
    // Summary calculation box
    doc.roundedRect(120, 135, 75, 45, 2, 2);
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text('Subtotal (Base Fee):', 125, 143);
    doc.text(`Rs ${(receipt.amount - (receipt.taxGst || 0)).toLocaleString('en-IN')}`, 175, 143);
    
    doc.text('IGST / CGST+SGST (18%):', 125, 151);
    doc.text(`Rs ${receipt.taxGst?.toLocaleString('en-IN') || 0}`, 175, 151);
    
    doc.setFontSize(10);
    doc.setTextColor(16, 185, 129);
    doc.text('TOTAL PAID:', 125, 163);
    doc.text(`Rs ${receipt.amount.toLocaleString('en-IN')}`, 175, 163);
    
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text('Status: COMPLETED (Verified by Admin)', 125, 173);
    
    // Footer notes
    doc.text('Thank you for choosing PBS! This is a system-generated invoice.', 15, 275);
    doc.text('For queries, reach out to billing@pbs.com', 15, 280);
    
    doc.save(`PBS_Receipt_${receipt.receiptId}.pdf`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-emerald-100 overflow-hidden animate-fadeIn text-slate-800">
        
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-emerald-800 via-teal-900 to-emerald-950 text-white flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 font-bold">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-white">Payment History & Receipts</h3>
              <p className="text-xs text-emerald-200">{student.name} • {student.rollNumber}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {receipts.length === 0 ? (
            <div className="text-center py-10 text-slate-500 text-sm">
              No fee receipts found for this student.
            </div>
          ) : (
            <div className="space-y-4">
              {receipts.map((receipt) => (
                <div key={receipt.receiptId} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl border border-slate-200 hover:border-emerald-200 bg-white hover:shadow-md transition-all">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                      <IndianRupee className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-slate-900">{receipt.paymentType}</h4>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Paid
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 mt-1 space-y-0.5">
                        <p><strong>Receipt:</strong> {receipt.receiptId} • <strong>Date:</strong> {receipt.date}</p>
                        <p><strong>Mode:</strong> {receipt.paymentMethod}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3">
                    <div className="text-base font-extrabold text-emerald-700">
                      ₹{receipt.amount.toLocaleString('en-IN')}
                    </div>
                    <button
                      onClick={() => handleDownloadInvoicePDF(receipt)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold rounded-lg border border-emerald-200 transition-colors cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download PDF</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
