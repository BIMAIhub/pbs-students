import React, { useState } from 'react';
import { 
  X, 
  CreditCard, 
  ShieldCheck, 
  CheckCircle2, 
  Smartphone, 
  Building, 
  Sparkles, 
  Lock,
  ArrowRight,
  Receipt
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface PayFeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseTitle: string;
  courseId: string;
  pendingBalance: number;
  onPaymentSuccess: (paidAmount: number, receiptData: any) => void;
}

export const PayFeeModal: React.FC<PayFeeModalProps> = ({
  isOpen,
  onClose,
  courseTitle,
  courseId,
  pendingBalance,
  onPaymentSuccess
}) => {
  const [paymentMode, setPaymentMode] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [paymentAmount, setPaymentAmount] = useState<number>(pendingBalance);
  const [isCustomAmount, setIsCustomAmount] = useState<boolean>(false);
  const [upiId, setUpiId] = useState('pravinsyadav@okaxis');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 9821');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [newReceipt, setNewReceipt] = useState<any>(null);

  if (!isOpen) return null;

  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (paymentAmount <= 0) {
      alert('Please enter a valid payment amount.');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);

      const generatedReceipt = {
        receiptId: `PBS-REC-${Math.floor(100000 + Math.random() * 900000)}`,
        invoiceNumber: `INV/PBS/2026-27/${Math.floor(500 + Math.random() * 500)}`,
        courseId: courseId,
        courseTitle: courseTitle,
        amount: paymentAmount,
        paymentMethod: paymentMode === 'upi' ? `UPI (${upiId})` : paymentMode === 'card' ? 'Visa Platinum Card' : 'NetBanking Instant',
        transactionId: `TXN-${Date.now().toString().slice(-8)}`,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
        paymentType: paymentAmount >= pendingBalance ? 'Full Payment' : 'Installment Settlement',
        status: 'Paid',
        taxGst: Math.round(paymentAmount * 0.18)
      };

      setNewReceipt(generatedReceipt);
      onPaymentSuccess(paymentAmount, generatedReceipt);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        console.warn('Confetti trigger error:', err);
      }
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 to-emerald-950 px-6 py-5 text-white flex items-center justify-between border-b border-emerald-900/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-400/30">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base">Pay Course Fee Balance</h3>
              <p className="text-xs text-slate-300">Official PBS Instant Fee Settlement & Tax Receipt</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isSuccess ? (
          /* Payment Successful View */
          <div className="p-8 text-center space-y-6 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-black text-slate-900">Payment Successful!</h3>
              <p className="text-xs text-slate-600 max-w-sm mx-auto">
                Your payment of <strong className="text-emerald-700 font-bold">₹{paymentAmount.toLocaleString('en-IN')}</strong> has been received and verified.
              </p>
            </div>

            {newReceipt && (
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left text-xs space-y-2 font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-500 font-sans">Receipt ID:</span>
                  <span className="font-bold text-slate-900">{newReceipt.receiptId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-sans">Transaction Ref:</span>
                  <span className="font-bold text-emerald-700">{newReceipt.transactionId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-sans">Payment Method:</span>
                  <span className="text-slate-800 font-sans">{newReceipt.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-sans">Remaining Due:</span>
                  <span className="font-bold text-emerald-600">
                    ₹{Math.max(0, pendingBalance - paymentAmount).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            )}

            <button
              onClick={onClose}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow transition-all cursor-pointer"
            >
              Done & Return to Dashboard
            </button>
          </div>
        ) : (
          /* Payment Form View */
          <form onSubmit={handleProcessPayment} className="p-6 space-y-6">
            {/* Course & Balance Info */}
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200/80 space-y-1.5">
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">Enrolled Masterclass</span>
              <h4 className="font-bold text-sm text-slate-900">{courseTitle}</h4>
              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-slate-600">Total Pending Balance:</span>
                <span className="text-base font-black text-emerald-700 font-mono">
                  ₹{pendingBalance.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Choose Amount */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700">Payment Amount</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsCustomAmount(false);
                    setPaymentAmount(pendingBalance);
                  }}
                  className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                    !isCustomAmount 
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-800 shadow-2xs' 
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Pay Full Balance (₹{pendingBalance})
                </button>

                <button
                  type="button"
                  onClick={() => setIsCustomAmount(true)}
                  className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                    isCustomAmount 
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-800 shadow-2xs' 
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Custom Installment
                </button>
              </div>

              {isCustomAmount && (
                <div className="pt-2">
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">₹</span>
                    <input
                      type="number"
                      min="500"
                      max={pendingBalance}
                      value={paymentAmount}
                      onChange={(e) => setPaymentAmount(parseInt(e.target.value) || 0)}
                      className="w-full pl-8 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 font-bold font-mono"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Choose Payment Method */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700">Select Payment Method</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMode('upi')}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    paymentMode === 'upi'
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-800 font-bold shadow-2xs'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Smartphone className="w-5 h-5 mx-auto mb-1 text-emerald-600" />
                  <span className="text-[11px] block">UPI / GPay</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMode('card')}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    paymentMode === 'card'
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-800 font-bold shadow-2xs'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <CreditCard className="w-5 h-5 mx-auto mb-1 text-sky-600" />
                  <span className="text-[11px] block">Credit / Debit</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMode('netbanking')}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    paymentMode === 'netbanking'
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-800 font-bold shadow-2xs'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Building className="w-5 h-5 mx-auto mb-1 text-indigo-600" />
                  <span className="text-[11px] block">NetBanking</span>
                </button>
              </div>

              {paymentMode === 'upi' && (
                <div className="pt-2">
                  <label className="block text-[11px] text-slate-500 mb-1">UPI ID / Mobile (GPay / PhonePe / Paytm)</label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 font-mono"
                    required
                  />
                </div>
              )}

              {paymentMode === 'card' && (
                <div className="pt-2 space-y-2">
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="Card Number"
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 font-mono"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="MM / YY"
                      defaultValue="08/29"
                      className="px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 font-mono"
                    />
                    <input
                      type="password"
                      placeholder="CVV"
                      defaultValue="•••"
                      className="px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 font-mono"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Security Guarantee */}
            <div className="flex items-center gap-2 text-[11px] text-slate-500 justify-center">
              <Lock className="w-3.5 h-3.5 text-emerald-600" />
              <span>256-Bit SSL Encrypted & Official GST Tax Receipt Generated</span>
            </div>

            {/* Pay Button */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Verifying Transaction with Gateway...</span>
                </>
              ) : (
                <>
                  <span>Authorize & Pay ₹{paymentAmount.toLocaleString('en-IN')}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
