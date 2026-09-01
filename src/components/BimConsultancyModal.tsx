import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/pbsData';
import { 
  X, 
  Building2, 
  CheckCircle2, 
  Send, 
  FileText, 
  Layers, 
  MessageCircle,
  ShieldCheck
} from 'lucide-react';

import { LeadEnquiry } from '../types';

interface BimConsultancyModalProps {
  onClose: () => void;
  onSubmitLead?: (lead: LeadEnquiry) => void;
}

export const BimConsultancyModal: React.FC<BimConsultancyModalProps> = ({ onClose, onSubmitLead }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    projectType: 'Commercial High-Rise / Hospitality',
    servicesNeeded: ['3D BIM Modeling (LOD 300-500)', 'Clash Coordination'],
    estimatedBuildings: '1-5 Buildings',
    message: ''
  });

  const handleCheckbox = (service: string) => {
    if (formData.servicesNeeded.includes(service)) {
      setFormData({
        ...formData,
        servicesNeeded: formData.servicesNeeded.filter(s => s !== service)
      });
    } else {
      setFormData({
        ...formData,
        servicesNeeded: [...formData.servicesNeeded, service]
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmitLead && (formData.contactPerson || formData.companyName)) {
      onSubmitLead({
        id: `LEAD-CONS-${Date.now()}`,
        name: formData.contactPerson || formData.companyName,
        email: formData.email,
        phone: formData.phone,
        type: 'BIM Consultancy',
        courseOrService: formData.servicesNeeded.join(', ') || 'BIM Services',
        message: `Company: ${formData.companyName}, Buildings: ${formData.estimatedBuildings}. Note: ${formData.message}`,
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
        status: 'New'
      });
    }
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="bg-slate-900 text-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-700 relative my-6">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4 animate-fadeIn">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-white">BIM Outsource Request Received!</h3>
            <p className="text-xs text-slate-300 leading-relaxed max-w-md mx-auto">
              Thank you <span className="font-bold text-white">{formData.contactPerson}</span> from <span className="font-bold text-white">{formData.companyName}</span>. Our Lead BIM Engineer will review your requirements and reply with a tailored RFP / proposal within 24 hours.
            </p>
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs text-slate-300">
              Need urgent project mobilization? Call or WhatsApp directly:
              <div className="pt-2">
                <a
                  href={`https://wa.me/918208918726?text=Hi%20PBS,%20I%20represent%20${encodeURIComponent(formData.companyName)}%20and%20we%20need%20BIM%20services.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl text-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Senior Engineer (+91 8208918726)</span>
                </a>
              </div>
            </div>
            <button
              onClick={onClose}
              className="bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold px-6 py-2.5 rounded-xl"
            >
              Close
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/40">
                <Building2 className="w-3.5 h-3.5" />
                <span>PBS OUTSOURCE BIM CONSULTANCY</span>
              </div>
              <h2 className="text-2xl font-black text-white">
                Request BIM Services & Project Outsource Proposal
              </h2>
              <p className="text-xs text-slate-400">
                Outsource your 3D Modeling (AR, ST, MEP), Navisworks Clash Matrix, 2D Shop Drawings, and COBie Facility Management to our 15+ years experienced team (Track record: 45+ Buildings Modeled in Al ULA).
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">Company / Organization</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., L&T / ALEC / WSP"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full bg-slate-800 text-white px-3 py-2.5 rounded-xl border border-slate-700 outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">Contact Person</label>
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                    className="w-full bg-slate-800 text-white px-3 py-2.5 rounded-xl border border-slate-700 outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">Official Email</label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-800 text-white px-3 py-2.5 rounded-xl border border-slate-700 outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">Phone / WhatsApp</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 8208918726"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-800 text-white px-3 py-2.5 rounded-xl border border-slate-700 outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase mb-2">Services Required (Select All That Apply)</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    '3D BIM Modeling (LOD 300-500)',
                    'Clash Coordination & Matrix',
                    '2D Coordinated Shop Drawings',
                    'Facility Management (COBie 6D)',
                    'Corporate BIM Implementation (BEP)'
                  ].map((service, idx) => {
                    const isChecked = formData.servicesNeeded.includes(service);
                    return (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => handleCheckbox(service)}
                        className={`p-2.5 rounded-xl text-left font-semibold border transition-colors flex items-center justify-between ${
                          isChecked
                            ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
                            : 'bg-slate-800 border-slate-700 text-slate-400'
                        }`}
                      >
                        <span>{service}</span>
                        {isChecked && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">Project Notes / Scope Brief</label>
                <textarea
                  rows={3}
                  placeholder="Tell us about your project location, timeline, LOD requirements, and software preferences..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-slate-800 text-white px-3 py-2.5 rounded-xl border border-slate-700 outline-none focus:border-emerald-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-extrabold py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit RFP / Project Proposal Request</span>
              </button>

            </form>

          </div>
        )}

      </div>
    </div>
  );
};
