import React, { useRef } from 'react';
import { 
  X, 
  Download, 
  Printer, 
  ShieldCheck, 
  QrCode, 
  Sparkles, 
  CheckCircle2, 
  Building2, 
  Calendar, 
  UserCheck 
} from 'lucide-react';
import { StudentProfileData } from './types';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface StudentIDCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  profileData: StudentProfileData;
}

export const StudentIDCardModal: React.FC<StudentIDCardModalProps> = ({
  isOpen,
  onClose,
  profileData
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handleDownloadPDF = async () => {
    if (!cardRef.current) return;
    try {
      const canvas = await html2canvas(cardRef.current, { scale: 3, useCORS: true });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('portrait', 'mm', 'a4');
      const imgWidth = 100;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const x = (210 - imgWidth) / 2;
      const y = 40;
      
      pdf.setFontSize(16);
      pdf.setTextColor(15, 23, 42);
      pdf.text('PRAGMATIC BIM SOLUTION - OFFICIAL DIGITAL STUDENT ID', 105, 25, { align: 'center' });
      pdf.setFontSize(10);
      pdf.setTextColor(100, 116, 139);
      pdf.text('ISO 19650 Certified BIM Academy & AEC Consultancy', 105, 31, { align: 'center' });
      
      pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);
      
      pdf.setFontSize(8);
      pdf.text(`Student ID: ${profileData.studentId} • Valid for 2026 Academic Cohorts • Scan QR code to verify credential authenticity.`, 105, y + imgHeight + 15, { align: 'center' });
      
      pdf.save(`PBS_Student_ID_${profileData.studentId}.pdf`);
    } catch (err) {
      console.error('PDF export failed:', err);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="bg-slate-900 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <UserCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm">Official PBS Digital Student ID</h3>
              <p className="text-[11px] text-slate-400">Valid across PBS Labs, BIM Software Licenses & Placement Drives</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Printable / Renderable ID Card Body */}
        <div className="p-6 sm:p-8 bg-slate-100 flex items-center justify-center">
          <div 
            ref={cardRef}
            className="w-full max-w-sm bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 rounded-2xl shadow-xl overflow-hidden border-2 border-emerald-500/80 relative text-white"
          >
            {/* Hologram stripe top */}
            <div className="h-2 bg-gradient-to-r from-emerald-400 via-teal-300 via-amber-300 to-emerald-400"></div>

            <div className="p-5 space-y-4">
              {/* Institution Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-950 font-black text-xs">
                    PBS
                  </div>
                  <div>
                    <h4 className="font-black text-xs tracking-wider text-emerald-400">PRAGMATIC BIM SOLUTION</h4>
                    <p className="text-[9px] text-slate-400 uppercase tracking-widest font-semibold">Institute of AEC & BIM</p>
                  </div>
                </div>
                <span className="text-[9px] font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-700/60 px-2 py-0.5 rounded">
                  2026-27
                </span>
              </div>

              {/* Photo + Core Details */}
              <div className="flex gap-4 items-center">
                <div className="relative shrink-0">
                  <div className="w-20 h-24 rounded-xl overflow-hidden border-2 border-emerald-400 bg-slate-800 shadow-md">
                    <img 
                      src={profileData.avatarUrl} 
                      alt={profileData.fullName} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="absolute -bottom-1.5 -right-1.5 bg-emerald-500 text-slate-950 p-0.5 rounded-full shadow">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div className="space-y-1 flex-1 min-w-0">
                  <h3 className="font-bold text-sm text-white truncate">{profileData.fullName}</h3>
                  <p className="text-[10px] text-emerald-400 font-semibold truncate">{profileData.educationDegree}</p>
                  
                  <div className="pt-1 space-y-0.5 text-[10px] text-slate-300 font-mono">
                    <p><span className="text-slate-500">ID:</span> <span className="font-bold text-white">{profileData.studentId}</span></p>
                    <p><span className="text-slate-500">ROLL:</span> {profileData.rollNumber}</p>
                    <p><span className="text-slate-500">COHORT:</span> BIM Masterclass #08</p>
                  </div>
                </div>
              </div>

              {/* QR Verification + Barcode Area */}
              <div className="bg-slate-900/90 rounded-xl p-3 border border-slate-800 flex items-center justify-between gap-3">
                <div className="space-y-0.5 text-[9px] text-slate-400">
                  <p className="font-bold text-slate-200 uppercase tracking-wider">Status: Active Student</p>
                  <p>Issue Date: Aug 2026</p>
                  <p>Validity: Lifetime Alumni Access</p>
                </div>

                {/* Styled SVG QR representation */}
                <div className="w-12 h-12 bg-white p-1 rounded-lg shrink-0 flex items-center justify-center">
                  <svg className="w-full h-full text-slate-950" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm10-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm12 0h2v2h-2v-2zm4 0h2v4h-4v-2h2v-2zm-4 4h2v2h-2v-2zm-2-4h2v2h-2v-2zm0 4h2v2h-2v-2z"/>
                  </svg>
                </div>
              </div>

              {/* Bottom Official Signatory Footer */}
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[8px] text-slate-500">
                <span>ISO 19650 BIM COMPLIANT</span>
                <span className="font-semibold text-emerald-400">Authorized Signature • PBS Director</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-end gap-3">
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print</span>
          </button>

          <button
            onClick={handleDownloadPDF}
            className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Official PDF Card</span>
          </button>
        </div>

      </div>
    </div>
  );
};
