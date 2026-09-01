import React, { useState } from 'react';
import { 
  X, 
  Flag, 
  Target, 
  Briefcase, 
  Building2, 
  TrendingUp, 
  CheckCircle2, 
  DollarSign, 
  Globe, 
  Award,
  Sparkles
} from 'lucide-react';

interface CareerGoalModalProps {
  onClose: () => void;
}

export const CareerGoalModal: React.FC<CareerGoalModalProps> = ({ onClose }) => {
  const [targetRole, setTargetRole] = useState('Senior BIM Coordinator / BIM Manager');
  const [targetLocation, setTargetLocation] = useState('Dubai / UK / Singapore / India');
  const [targetSalary, setTargetSalary] = useState('$85,000 - $120,000 / ₹18 - 25 LPA');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const careerChecklist = [
    { title: 'ISO 19650 Part 1 & 2 Workflow Certification', completed: true },
    { title: 'Revit Architecture, Structure & MEP LOD 400 Modeling', completed: true },
    { title: 'Navisworks Clash Detective & BCF Resolution Process', completed: true },
    { title: 'Dynamo Visual Scripting & Python Revit API Automation', completed: true },
    { title: '4D Construction Scheduling (TimeLiner) & 5D Cost QTO', completed: true },
    { title: '45-Storey Tower Capstone Portfolio Reviewed by Angel Mentor', completed: true },
    { title: 'Live Mock Technical Interview with Industry BIM Director', completed: true },
  ];

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] flex flex-col border border-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-inner">
              <Flag className="w-5 h-5 text-emerald-600 fill-emerald-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Career Goal Tracker</h3>
              <p className="text-xs text-slate-500">Track and align your BIM milestones with global AEC opportunities</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Goal Form Inputs */}
        <div className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Target Job Role</label>
            <div className="relative">
              <Briefcase className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Preferred Location</label>
              <div className="relative">
                <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={targetLocation}
                  onChange={(e) => setTargetLocation(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Target Compensation</label>
              <div className="relative">
                <TrendingUp className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={targetSalary}
                  onChange={(e) => setTargetSalary(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Milestone Readiness Checklist */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-700 uppercase tracking-wider">Placement Readiness Score</span>
            <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">100% Ready</span>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 space-y-2">
            {careerChecklist.map((item, i) => (
              <div key={i} className="flex items-center gap-2.5 text-xs text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-medium">{item.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">PBS Placement Cell active support</span>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer transition-colors"
            >
              {savedSuccess ? 'Saved ✓' : 'Save Goal'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
