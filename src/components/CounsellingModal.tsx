import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/pbsData';
import { 
  X, 
  Sparkles, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  UserCheck, 
  MessageCircle, 
  ShieldCheck,
  Building
} from 'lucide-react';

import { LeadEnquiry } from '../types';

interface CounsellingModalProps {
  onClose: () => void;
  onSubmitLead?: (lead: LeadEnquiry) => void;
}

export const CounsellingModal: React.FC<CounsellingModalProps> = ({ onClose, onSubmitLead }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    profession: 'Architect',
    interest: 'Revit (AR/ST/MEP)',
    preferredDate: '',
    preferredTime: 'Evening (6 PM - 8 PM)'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmitLead && formData.name) {
      onSubmitLead({
        id: `LEAD-${Date.now()}`,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        type: 'Counselling',
        courseOrService: formData.interest,
        message: `Profession: ${formData.profession}, Preferred Slot: ${formData.preferredDate} ${formData.preferredTime}`,
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
        status: 'New'
      });
    }
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative my-6">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4 animate-fadeIn">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-slate-900">1:1 Counselling Session Booked!</h3>
            <p className="text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
              Thank you <span className="font-bold">{formData.name}</span>. Our Lead BIM Advisor will contact you on <span className="font-bold">{formData.phone}</span> to confirm your session on <span className="font-bold">{formData.preferredDate || 'your selected slot'}</span>.
            </p>
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-800 font-medium">
              Want immediate answers? Chat directly on WhatsApp:
              <div className="pt-2">
                <a
                  href={`https://wa.me/918208918726?text=Hi%20PBS,%20I%20just%20booked%20a%20counselling%20session%20for%20${encodeURIComponent(formData.interest)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-emerald-600 text-white font-bold px-4 py-2 rounded-xl text-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Open WhatsApp (+91 8208918726)</span>
                </a>
              </div>
            </div>
            <button
              onClick={onClose}
              className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-6 py-2.5 rounded-xl mt-2"
            >
              Done
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>100% Free • No Obligation</span>
              </div>
              <h2 className="text-2xl font-black text-slate-900">
                Book a 1:1 Free BIM Career Counselling Session
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Get personalized guidance from BIM Experts with 15+ years of industry experience. Learn how to transition your career or upskill for GCC & European AEC roles.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pravin Yadav"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:border-emerald-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Email</label>
                  <input
                    type="email"
                    required
                    placeholder="pravin@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:border-emerald-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Phone / WhatsApp</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 8208918726"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:border-emerald-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Profession</label>
                  <select
                    value={formData.profession}
                    onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:border-emerald-500 outline-none bg-white"
                  >
                    <option value="Architect">Architect</option>
                    <option value="Civil Engineer">Civil Engineer</option>
                    <option value="Mechanical Engineer">Mechanical / HVAC Engineer</option>
                    <option value="Electrical Engineer">Electrical Engineer</option>
                    <option value="Student">Architecture / Engineering Student</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Primary Learning Goal</label>
                  <select
                    value={formData.interest}
                    onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:border-emerald-500 outline-none bg-white"
                  >
                    <option value="Revit (AR/ST/MEP)">Revit (AR / ST / MEP)</option>
                    <option value="Navisworks Manage">Navisworks Manage & Clash Detection</option>
                    <option value="Dynamo Automation">Dynamo BIM Automation</option>
                    <option value="Civil 3D">Civil 3D Infrastructure</option>
                    <option value="Career Transition">Career Transition Guidance</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Preferred Date</label>
                  <input
                    type="date"
                    required
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:border-emerald-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Preferred Time Slot</label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:border-emerald-500 outline-none bg-white"
                  >
                    <option value="Morning (10 AM - 1 PM)">Morning (10 AM - 1 PM)</option>
                    <option value="Afternoon (2 PM - 5 PM)">Afternoon (2 PM - 5 PM)</option>
                    <option value="Evening (6 PM - 8 PM)">Evening (6 PM - 8 PM)</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-extrabold text-sm py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Confirm Free Counselling Slot</span>
              </button>
            </form>

          </div>
        )}

      </div>
    </div>
  );
};
