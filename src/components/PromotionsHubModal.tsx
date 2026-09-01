import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { 
  X, 
  Sparkles, 
  Tag, 
  Check, 
  Copy, 
  Gift, 
  Flame, 
  Percent, 
  ArrowRight, 
  Clock, 
  Award, 
  Users, 
  Zap, 
  CheckCircle2,
  HelpCircle,
  Share2
} from 'lucide-react';
import { PROMOTIONS_DATA, COURSES_DATA } from '../data/pbsData';
import { Course } from '../types';

interface PromotionsHubModalProps {
  onClose: () => void;
  onSelectCouponAndEnroll: (couponCode: string, course?: Course) => void;
}

export const PromotionsHubModal: React.FC<PromotionsHubModalProps> = ({
  onClose,
  onSelectCouponAndEnroll
}) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'coupons' | 'spin' | 'batches' | 'referral'>('coupons');
  
  // Interactive Spin / Mystery Box
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinResult, setSpinResult] = useState<{
    code: string;
    title: string;
    discountText: string;
  } | null>(null);

  const [referralCopied, setReferralCopied] = useState(false);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const handleSpinWheel = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setSpinResult(null);

    setTimeout(() => {
      setIsSpinning(false);
      const rewards = [
        { code: 'BIMPRO2026', title: 'Grand Scholarship Winner!', discountText: '40% OFF All Courses' },
        { code: 'EARLYBIRD40', title: 'Instant Cash Rebate!', discountText: '₹4,000 Flat Off on Full Fee' },
        { code: 'PRAVINVIP', title: 'VIP Mentor Direct Pass!', discountText: '50% Lifetime VIP Grant' },
        { code: 'ISO19650', title: 'ISO 19650 Certification Pass!', discountText: 'Free ISO Exam Voucher' }
      ];
      const randomReward = rewards[Math.floor(Math.random() * rewards.length)];
      setSpinResult(randomReward);

      confetti({
        particleCount: 180,
        spread: 100,
        origin: { y: 0.6 }
      });
    }, 1800);
  };

  const handleCopyReferral = () => {
    navigator.clipboard.writeText('https://pragmaticbim.com/ref/BIM-PRAVIN-2026');
    setReferralCopied(true);
    setTimeout(() => setReferralCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="bg-white text-slate-900 rounded-3xl max-w-3xl w-full my-6 border-2 border-emerald-500 shadow-2xl overflow-hidden relative"
      >
        {/* Modal Top Header */}
        <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-slate-900 text-white p-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98115_1px,transparent_1px),linear-gradient(to_bottom,#10b98115_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
          <div className="absolute right-0 top-0 w-60 h-60 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex items-start justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-amber-400 text-slate-950 text-[10px] font-black px-3 py-0.5 rounded-full uppercase tracking-wider mb-2 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-slate-950" />
                <span>PBS 2026 Academic Promotion Engine</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                Scholarships, Coupons & Rewards Hub
              </h2>
              <p className="text-xs text-emerald-200 mt-1 max-w-xl">
                Unlock exclusive institutional grants, early registration fee discounts, and merit scholarships for all multi-disciplinary BIM programs.
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-emerald-200 hover:text-white hover:bg-white/10 rounded-full transition-colors flex-shrink-0"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 mt-5 border-t border-emerald-700/50 pt-3 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab('coupons')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 flex-shrink-0 ${
                activeTab === 'coupons'
                  ? 'bg-emerald-500 text-slate-950 shadow-md font-black'
                  : 'text-emerald-200 hover:text-white hover:bg-white/10'
              }`}
            >
              <Tag className="w-3.5 h-3.5" />
              <span>Discount Vouchers</span>
            </button>

            <button
              onClick={() => setActiveTab('spin')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 flex-shrink-0 ${
                activeTab === 'spin'
                  ? 'bg-emerald-500 text-slate-950 shadow-md font-black'
                  : 'text-emerald-200 hover:text-white hover:bg-white/10'
              }`}
            >
              <Gift className="w-3.5 h-3.5" />
              <span>Scholarship Mystery Reveal</span>
            </button>

            <button
              onClick={() => setActiveTab('batches')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 flex-shrink-0 ${
                activeTab === 'batches'
                  ? 'bg-emerald-500 text-slate-950 shadow-md font-black'
                  : 'text-emerald-200 hover:text-white hover:bg-white/10'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Live Batch Seats</span>
            </button>

            <button
              onClick={() => setActiveTab('referral')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 flex-shrink-0 ${
                activeTab === 'referral'
                  ? 'bg-emerald-500 text-slate-950 shadow-md font-black'
                  : 'text-emerald-200 hover:text-white hover:bg-white/10'
              }`}
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Referral Program (₹2,000)</span>
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-5 sm:p-7 max-h-[65vh] overflow-y-auto">
          {/* TAB 1: COUPONS */}
          {activeTab === 'coupons' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                  <Flame className="w-4 h-4 text-amber-500" />
                  Active Promotional Coupons for 2026 Batches
                </h3>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  {PROMOTIONS_DATA.length} Verified Offers Available
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {PROMOTIONS_DATA.map((promo) => {
                  const isCopied = copiedCode === promo.code;
                  return (
                    <div
                      key={promo.code}
                      className="bg-slate-50 hover:bg-white rounded-2xl border-2 border-slate-200 hover:border-emerald-500 p-4 transition-all duration-200 shadow-xs hover:shadow-md flex flex-col justify-between group relative overflow-hidden"
                    >
                      {promo.badge && (
                        <span className="absolute top-0 right-0 bg-gradient-to-l from-emerald-600 to-green-600 text-white text-[10px] font-black px-3 py-0.5 rounded-bl-xl shadow-xs">
                          {promo.badge}
                        </span>
                      )}

                      <div className="space-y-1.5 pr-14">
                        <div className="font-extrabold text-sm text-slate-900 leading-tight">
                          {promo.title}
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {promo.description}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between gap-2">
                        {/* Promo Code Box */}
                        <div className="inline-flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-dashed border-emerald-400 font-mono font-black text-xs text-emerald-800">
                          <Tag className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{promo.code}</span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleCopy(promo.code)}
                            className="p-1.5 text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg border border-slate-200 transition-colors"
                            title="Copy coupon"
                          >
                            {isCopied ? (
                              <Check className="w-4 h-4 text-emerald-600" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>

                          <button
                            onClick={() => {
                              onSelectCouponAndEnroll(promo.code);
                              onClose();
                            }}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-3 py-1.5 rounded-xl transition-all flex items-center gap-1 shadow-xs hover:scale-105"
                          >
                            <span>Apply</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Instant Auto-Apply Suggestion Box */}
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-4 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold flex-shrink-0">
                    <Zap className="w-5 h-5 text-amber-300" />
                  </div>
                  <div>
                    <div className="font-extrabold text-emerald-900 text-sm">
                      Need help selecting the best scholarship?
                    </div>
                    <div className="text-slate-600">
                      Our Lead BIM Coordinators evaluate previous academic/work experience for up to 50% fee waivers.
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onSelectCouponAndEnroll('BIMPRO2026');
                    onClose();
                  }}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-black px-4 py-2 rounded-xl transition-all whitespace-nowrap shadow-xs"
                >
                  Apply BIMPRO2026 Now
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: SCHOLARSHIP MYSTERY REVEAL */}
          {activeTab === 'spin' && (
            <div className="text-center py-4 space-y-6">
              <div className="max-w-md mx-auto space-y-2">
                <div className="inline-flex items-center gap-1 bg-amber-100 text-amber-900 px-3 py-0.5 rounded-full text-xs font-black">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>AI Scholarship Merit Matcher</span>
                </div>
                <h3 className="text-xl font-black text-slate-900">
                  Spin for Instant Fee Discount
                </h3>
                <p className="text-xs text-slate-600">
                  Click below to trigger our 2026 random merit grant selector. Guaranteed minimum 25% to 50% discount voucher!
                </p>
              </div>

              {/* Visual Spin Centerpiece */}
              <div className="relative max-w-xs mx-auto p-6 rounded-3xl bg-gradient-to-b from-slate-900 to-emerald-950 text-white border-2 border-emerald-500 shadow-xl overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(#10b98125_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
                
                <div className="py-6 flex flex-col items-center justify-center space-y-4 relative z-10">
                  <motion.div
                    animate={isSpinning ? { rotate: 720, scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 1.8, ease: "easeInOut" }}
                    className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-amber-400 to-emerald-400 p-1 shadow-2xl flex items-center justify-center"
                  >
                    <div className="w-full h-full bg-slate-950 rounded-xl flex items-center justify-center">
                      <Gift className={`w-12 h-12 ${isSpinning ? 'text-amber-400 animate-bounce' : 'text-emerald-400'}`} />
                    </div>
                  </motion.div>

                  <div>
                    <div className="text-xs text-emerald-300 font-mono font-bold uppercase tracking-widest">
                      {isSpinning ? 'CALCULATING SCHOLARSHIP...' : 'READY TO REVEAL'}
                    </div>
                    <div className="text-lg font-black text-white mt-1">
                      {spinResult ? spinResult.discountText : 'Up to 50% Fee Grant'}
                    </div>
                  </div>

                  <button
                    onClick={handleSpinWheel}
                    disabled={isSpinning}
                    className="w-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:from-amber-300 hover:to-amber-200 text-slate-950 font-black text-sm py-3 px-6 rounded-xl shadow-lg transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
                  >
                    {isSpinning ? 'Spinning...' : 'Spin & Claim Scholarship'}
                  </button>
                </div>
              </div>

              {spinResult && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-emerald-50 border-2 border-emerald-500 rounded-2xl p-5 max-w-md mx-auto text-center space-y-3"
                >
                  <div className="text-emerald-800 font-black text-sm">
                    🎉 Congratulations! You unlocked coupon:
                  </div>
                  <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-emerald-400 text-emerald-900 font-mono font-black text-lg shadow-xs">
                    <Tag className="w-5 h-5 text-emerald-600" />
                    <span>{spinResult.code}</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    {spinResult.title} — Valid for 2026 Academic Batch enrollment.
                  </p>
                  <button
                    onClick={() => {
                      onSelectCouponAndEnroll(spinResult.code);
                      onClose();
                    }}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs py-2.5 px-6 rounded-xl transition-all shadow-md hover:scale-105"
                  >
                    Apply Coupon & Enroll Now
                  </button>
                </motion.div>
              )}
            </div>
          )}

          {/* TAB 3: LIVE BATCH SEATS */}
          {activeTab === 'batches' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-600" />
                  Upcoming 2026 Batch Schedule & Seat Availability
                </h3>
                <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                  Fast Filling Batches
                </span>
              </div>

              <div className="space-y-3">
                {COURSES_DATA.map((course, idx) => {
                  const seatsRemaining = [3, 5, 2, 4, 6][idx % 5];
                  return (
                    <div
                      key={course.id}
                      className="bg-slate-50 hover:bg-white rounded-2xl border border-slate-200 hover:border-emerald-500 p-4 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                            {course.category}
                          </span>
                          <span className="text-xs text-slate-500 font-medium">
                            {course.duration} | {course.batchType}
                          </span>
                        </div>
                        <h4 className="font-extrabold text-sm text-slate-900">
                          {course.title}
                        </h4>
                        <div className="text-xs text-slate-600 flex items-center gap-2">
                          <span>Next Batch Starts: <strong className="text-slate-800">{course.upcomingBatch}</strong></span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 self-end sm:self-center">
                        <div className="text-right">
                          <div className="text-xs font-black text-amber-700 bg-amber-100/80 px-2.5 py-0.5 rounded-full inline-block">
                            {seatsRemaining} Seats Left
                          </div>
                          <div className="text-[11px] text-slate-500 mt-0.5">
                            ₹{course.discountedPrice.toLocaleString()} (After 40% OFF)
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            onSelectCouponAndEnroll('BIMPRO2026', course);
                            onClose();
                          }}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-3.5 py-2 rounded-xl transition-all shadow-xs hover:scale-105"
                        >
                          Book Seat
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: REFERRAL PROGRAM */}
          {activeTab === 'referral' && (
            <div className="space-y-5 py-2">
              <div className="bg-gradient-to-br from-emerald-900 to-slate-900 text-white p-6 rounded-3xl border border-emerald-500 relative overflow-hidden space-y-4">
                <div className="inline-flex items-center gap-1.5 bg-amber-400 text-slate-950 text-[10px] font-black px-3 py-0.5 rounded-full uppercase tracking-wider">
                  <Award className="w-3.5 h-3.5 text-slate-950" />
                  <span>Student & Alumni Referral Program</span>
                </div>

                <div>
                  <h3 className="text-xl font-black text-white">
                    Refer a Colleague, Earn ₹2,000 Cashback
                  </h3>
                  <p className="text-xs text-emerald-200 mt-1 max-w-lg leading-relaxed">
                    Share your unique referral link with civil engineering batchmates, architects, and MEP designers. When they enroll, they get an extra ₹1,000 scholarship, and you receive ₹2,000 direct bank reward!
                  </p>
                </div>

                <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-emerald-500/40 flex items-center justify-between gap-3">
                  <div className="font-mono text-xs text-emerald-300 truncate">
                    https://pragmaticbim.com/ref/BIM-PRAVIN-2026
                  </div>
                  <button
                    onClick={handleCopyReferral}
                    className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 flex-shrink-0"
                  >
                    {referralCopied ? (
                      <>
                        <Check className="w-4 h-4 text-slate-950" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-slate-950" />
                        <span>Copy Link</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 font-black text-xs flex items-center justify-center mx-auto mb-2">
                    1
                  </div>
                  <div className="font-extrabold text-xs text-slate-900">Share Link</div>
                  <div className="text-[11px] text-slate-500 mt-1">Send your invite link to peers</div>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 font-black text-xs flex items-center justify-center mx-auto mb-2">
                    2
                  </div>
                  <div className="font-extrabold text-xs text-slate-900">Friend Enrolls</div>
                  <div className="text-[11px] text-slate-500 mt-1">They get ₹1,000 fee grant</div>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 font-black text-xs flex items-center justify-center mx-auto mb-2">
                    3
                  </div>
                  <div className="font-extrabold text-xs text-slate-900">Get Rewarded</div>
                  <div className="text-[11px] text-slate-500 mt-1">Instant ₹2,000 cash transfer</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-100 p-4 px-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-600 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Coupons valid for all Online & Offline Weekend Batches</span>
          </div>

          <button
            onClick={onClose}
            className="text-slate-600 hover:text-slate-900 font-bold px-4 py-2 rounded-xl hover:bg-slate-200 transition-colors"
          >
            Close Hub
          </button>
        </div>
      </motion.div>
    </div>
  );
};
