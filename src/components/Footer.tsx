import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/pbsData';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  MessageCircle, 
  Award, 
  Send, 
  CheckCircle2, 
  ArrowUp,
  Heart
} from 'lucide-react';

interface FooterProps {
  onOpenCounselling: () => void;
  onOpenConsultancy: () => void;
  onOpenLms: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenCounselling,
  onOpenConsultancy,
  onOpenLms
}) => {
  const [subscribedEmail, setSubscribedEmail] = useState('');
  const [subscribeSuccess, setSubscribeSuccess] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (subscribedEmail) {
      setSubscribeSuccess(true);
      setTimeout(() => setSubscribeSuccess(false), 5000);
      setSubscribedEmail('');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Top Newsletter / Brochure Banner */}
        <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-green-950 rounded-3xl p-8 border border-emerald-700/60 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center lg:text-left">
            <span className="text-emerald-300 text-xs font-bold uppercase tracking-widest bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/30">
              FREE AEC CAREER GUIDE & SYLLABUS
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Get the Complete 2026 BIM Training Brochure & Project Assets
            </h3>
            <p className="text-emerald-100 text-xs sm:text-sm">
              Enter your email to receive instant PDF download links for Revit, Navisworks, & Dynamo course syllabi.
            </p>
          </div>

          <div className="w-full lg:w-auto min-w-[320px]">
            {subscribeSuccess ? (
              <div className="bg-emerald-800/80 p-3.5 rounded-xl border border-emerald-400 text-xs font-bold text-emerald-100 flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-amber-300" />
                <span>Brochure sent to your email address!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={subscribedEmail}
                  onChange={(e) => setSubscribedEmail(e.target.value)}
                  className="bg-slate-900/90 text-white text-xs px-4 py-3 rounded-xl border border-emerald-500/50 outline-none focus:border-amber-400 flex-1 min-w-0"
                />
                <button
                  type="submit"
                  className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs px-5 py-3 rounded-xl flex items-center gap-1.5 transition-colors flex-shrink-0"
                >
                  <span>Get PDF</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Main Footer Links & Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pt-4">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-green-600 flex items-center justify-center text-white font-black text-xl shadow-md">
                P
              </div>
              <div>
                <span className="font-black text-white text-lg tracking-tight block">
                  Pragmatic BIM Solution
                </span>
                <span className="text-emerald-400 text-xs italic font-serif">
                  "{COMPANY_INFO.slogan}"
                </span>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Providing top-tier BIM software training (Revit, Navisworks, Dynamo, Civil 3D) and AEC project outsourcing services. Backed by 15 years of industry experience and trusted by 100+ engineers across 5 countries.
            </p>

            <div className="flex items-center gap-3 pt-1">
              <a
                href={COMPANY_INFO.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white rounded-xl flex items-center justify-center transition-colors border border-emerald-500/30"
                title="WhatsApp Direct Chat"
              >
                <MessageCircle className="w-4 h-4" />
              </a>

              <a
                href={`tel:${COMPANY_INFO.phonePrimary}`}
                className="w-9 h-9 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl flex items-center justify-center transition-colors border border-slate-700"
                title="Call Office"
              >
                <Phone className="w-4 h-4" />
              </a>

              <a
                href={`mailto:${COMPANY_INFO.emailPrimary}`}
                className="w-9 h-9 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl flex items-center justify-center transition-colors border border-slate-700"
                title="Email Support"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">Quick Navigation</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a href="#courses-section" className="hover:text-emerald-400 transition-colors">Course Catalog</a>
              </li>
              <li>
                <a href="#services-section" className="hover:text-emerald-400 transition-colors">BIM Services & Projects</a>
              </li>
              <li>
                <a href="#why-pbs-section" className="hover:text-emerald-400 transition-colors">Why Pragmatic BIM Solution</a>
              </li>
              <li>
                <a href="#testimonials-section" className="hover:text-emerald-400 transition-colors">Alumni Success Stories</a>
              </li>
              <li>
                <a href="#faq-section" className="hover:text-emerald-400 transition-colors">FAQ & Support</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Programs & Portals */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">Programs & LMS</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={onOpenCounselling} className="hover:text-emerald-400 transition-colors text-left">
                  1:1 Free Career Counselling
                </button>
              </li>
              <li>
                <button onClick={onOpenConsultancy} className="hover:text-emerald-400 transition-colors text-left">
                  BIM Project Outsource RFP
                </button>
              </li>
              <li>
                <button onClick={onOpenLms} className="hover:text-emerald-400 transition-colors text-left text-amber-300 font-bold">
                  Student LMS & Certificate Portal
                </button>
              </li>
              <li>
                <span className="text-slate-500">ISO 19650 BEP Guidelines</span>
              </li>
              <li>
                <span className="text-slate-500">Al ULA Case Study (45+ Bldgs)</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Pune Head Office Address */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">Headquarters</h4>
            <div className="space-y-2 text-xs text-slate-400 leading-relaxed">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.address.street}, {COMPANY_INFO.address.city}, {COMPANY_INFO.address.state} - {COMPANY_INFO.address.pincode}</span>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <Phone className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <a href={`tel:${COMPANY_INFO.phonePrimary}`} className="hover:text-white font-mono">
                  {COMPANY_INFO.phonePrimary}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <a href={`mailto:${COMPANY_INFO.emailPrimary}`} className="hover:text-white font-mono">
                  {COMPANY_INFO.emailPrimary}
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar & Back to top */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Pragmatic BIM Solution. All rights reserved. Registered BIM Training & AEC Consultancy in Pune, India.
          </div>

          <button
            onClick={scrollToTop}
            className="bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white p-2.5 rounded-xl border border-slate-800 flex items-center gap-1.5 transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
