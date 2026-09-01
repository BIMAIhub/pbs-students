import React, { useState } from 'react';
import { 
  X, 
  IndianRupee, 
  CreditCard, 
  CheckCircle2, 
  FileText, 
  Clock, 
  Sparkles, 
  ArrowRight 
} from 'lucide-react';
import { ManagedStudent, pbsAdminStore } from '../../utils/pbsAdminStore';
import { soundFx } from '../../utils/soundEffects';

interface AdminRecordFeeModalProps {
  student: ManagedStudent;
  onClose: () => void;
  onUpdated: () => void;
}

export const AdminRecordFeeModal: React.FC<AdminRecordFeeModalProps> = ({
  student,
  onClose,
  onUpdated
}) => {
  const [paymentAmount, setPaymentAmount] = useState<number>(
    student.pendingBalance > 0 ? student.pendingBalance : 5000
  );
  const [paymentMethod, setPaymentMethod] = useState('GPay / UPI Payment');
  const [txnRef, setTxnRef] = useState(`TXN-ADMIN-${Math.floor(100000 + Math.random() * 900000)}`);
  const [notes, setNotes] = useState('Official Term Fee Installment clearance recorded by Admin');

  const [isProcessing, setIsProcessing] = useState(false);
  const [receiptGenerated, setReceiptGenerated] = useState(false);

  const handleRecordPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (paymentAmount <= 0) return;

    setIsProcessing(true);
    setTimeout(() => {
      pbsAdminStore.recordFeePayment(student.studentId, Number(paymentAmount), paymentMethod, txnRef);
      soundFx.playSuccess();
      setIsProcessing(false);
      setReceiptGenerated(true);
      setTimeout(() => {
        onUpdated();
        onClose();
      }, 1500);
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-emerald-100 overflow-hidden animate-fadeIn text-slate-800">
        
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-emerald-800 via-teal-900 to-emerald-950 text-white flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 font-bold">
              <IndianRupee className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-white">Record Fee Installment</h3>
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

        {/* Form Body */}
        <form onSubmit={handleRecordPayment} className="p-6 space-y-4">
          
          {receiptGenerated ? (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs font-bold space-y-1">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Payment of ₹{paymentAmount.toLocaleString('en-IN')} Recorded Successfully!</span>
              </div>
              <p className="text-[11px] text-emerald-700 font-normal">
                Receipt #{txnRef} logged to student ledger.
              </p>
            </div>
          ) : (
            <>
              {/* Fee Financial Summary Box */}
              <div className="p-4 bg-emerald-50/50 border border-emerald-100 rounded-2xl grid grid-cols-3 gap-2 text-center text-xs">
                <div>
                  <div className="text-[10px] text-slate-500 font-medium">Total Fee</div>
                  <div className="font-extrabold text-slate-900 mt-0.5">₹{(student.totalFee || 0).toLocaleString('en-IN')}</div>
                </div>
                <div>
                  <div className="text-[10px] text-emerald-700 font-medium">Paid Fee</div>
                  <div className="font-extrabold text-emerald-700 mt-0.5">₹{(student.paidAmount || 0).toLocaleString('en-IN')}</div>
                </div>
                <div>
                  <div className="text-[10px] text-rose-600 font-medium">Pending</div>
                  <div className="font-extrabold text-rose-600 mt-0.5">₹{(student.pendingBalance || 0).toLocaleString('en-IN')}</div>
                </div>
              </div>

              {/* Amount to Record */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Installment Amount to Credit (₹ INR)</label>
                <div className="relative">
                  <IndianRupee className="w-4 h-4 text-emerald-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="number"
                    min="1"
                    max={student.pendingBalance > 0 ? student.pendingBalance : 100000}
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(Number(e.target.value))}
                    required
                    className="w-full pl-10 pr-4 py-2.5 text-xs font-bold font-mono bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-emerald-700"
                  />
                </div>
              </div>

              {/* Payment Mode */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Payment Mode</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium text-slate-800"
                >
                  <option value="GPay / UPI Payment">Google Pay / PhonePe / BHIM UPI</option>
                  <option value="NEFT / RTGS Bank Transfer">NEFT / RTGS Direct Bank Transfer</option>
                  <option value="Debit / Credit Card">Debit / Credit Card (POS / Gateway)</option>
                  <option value="Cash / Cheque (Pune Office)">Cash / Cheque Deposit (Pune Head Office)</option>
                </select>
              </div>

              {/* Reference Transaction Id */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Transaction Reference / UTR Number</label>
                <input
                  type="text"
                  value={txnRef}
                  onChange={(e) => setTxnRef(e.target.value)}
                  required
                  className="w-full px-3.5 py-2 text-xs font-mono bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800"
                />
              </div>

              {/* Notes */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Remarks / Receipt Note</label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-md shadow-emerald-600/20"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>{isProcessing ? 'Recording...' : 'Confirm & Generate Receipt'}</span>
                </button>
              </div>
            </>
          )}

        </form>

      </div>
    </div>
  );
};
