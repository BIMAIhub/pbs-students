import React, { useRef } from 'react';
import { X, Download, ShieldCheck, Printer, CheckCircle2, Award, Share2 } from 'lucide-react';

interface CertificateGeneratorModalProps {
  userName: string;
  onClose: () => void;
}

export const CertificateGeneratorModal: React.FC<CertificateGeneratorModalProps> = ({
  userName,
  onClose
}) => {
  const certRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    alert(`Certificate for ${userName} is ready for download in high-resolution PDF format.`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl space-y-6 max-h-[95vh] flex flex-col border border-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-inner">
              <Award className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Verified Certificate of Completion</h3>
              <p className="text-xs text-slate-500">ISO 19650 BIM & Revit Professional Master Program</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Certificate Display Card */}
        <div className="flex-1 overflow-y-auto p-1">
          <div 
            ref={certRef}
            className="border-8 border-double border-amber-600/30 bg-gradient-to-br from-amber-50/20 via-white to-amber-50/30 p-8 sm:p-12 rounded-2xl shadow-lg relative text-center space-y-6 overflow-hidden"
          >
            {/* Corner Ornamental Accents */}
            <div className="absolute top-2 left-2 text-amber-700 text-xs font-serif">✦</div>
            <div className="absolute top-2 right-2 text-amber-700 text-xs font-serif">✦</div>
            <div className="absolute bottom-2 left-2 text-amber-700 text-xs font-serif">✦</div>
            <div className="absolute bottom-2 right-2 text-amber-700 text-xs font-serif">✦</div>

            {/* Institution Header */}
            <div className="space-y-1">
              <div className="text-xs font-bold uppercase tracking-widest text-emerald-700">
                PRAGMATIC BIM SOLUTION ACADEMY
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight">
                Certificate of Excellence
              </h2>
              <p className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">
                GLOBAL AEC BIM ACCREDITATION PROGRAM
              </p>
            </div>

            {/* Recipient */}
            <div className="space-y-2 py-3 border-y border-amber-200/60 max-w-md mx-auto">
              <span className="text-xs text-slate-500 italic">This is proudly presented to</span>
              <h3 className="text-2xl sm:text-3xl font-bold text-emerald-800 font-serif">
                {userName || 'Pravin Yadav'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                for successfully completing all 8 capstone stages, 87 practical assignments, and demonstrating mastery in 
                <strong> Autodesk Revit, Navisworks 4D/5D, Dynamo Automation, and ISO 19650 BIM Information Management</strong>.
              </p>
            </div>

            {/* Signatures & Seal */}
            <div className="pt-4 flex items-center justify-between px-4 sm:px-12 text-xs">
              <div className="text-center space-y-1">
                <div className="font-serif italic font-bold text-slate-800 text-sm border-b border-slate-300 pb-1">
                  Pravin Yadav
                </div>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Program Director</p>
              </div>

              {/* Gold Embossed Badge */}
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 border-2 border-amber-600 text-slate-900 shadow-md flex flex-col items-center justify-center p-1 font-bold">
                <ShieldCheck className="w-6 h-6 text-slate-900" />
                <span className="text-[7px] uppercase tracking-tighter font-extrabold">VERIFIED</span>
              </div>

              <div className="text-center space-y-1">
                <div className="font-serif italic font-bold text-slate-800 text-sm border-b border-slate-300 pb-1">
                  Dr. K. S. Raman
                </div>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Academic Dean</p>
              </div>
            </div>

            {/* Credential ID */}
            <div className="text-[10px] text-slate-400 font-mono pt-2">
              Credential ID: PBS-BIM-2026-884920 • Issued: Aug 2026 • Verified on Blockchain
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="pt-2 flex items-center justify-between border-t border-slate-100">
          <button
            onClick={handlePrint}
            className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-xl flex items-center gap-2"
          >
            <Printer className="w-4 h-4" />
            <span>Print</span>
          </button>

          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
            >
              Close
            </button>
            <button
              onClick={handleDownload}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer flex items-center gap-2 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF Certificate</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
