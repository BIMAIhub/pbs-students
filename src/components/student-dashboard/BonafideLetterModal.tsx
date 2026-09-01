import React, { useRef } from 'react';
import { 
  X, 
  Download, 
  Printer, 
  ShieldCheck, 
  FileText, 
  Building, 
  Award,
  CheckCircle2
} from 'lucide-react';
import { StudentProfileData } from './types';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface BonafideLetterModalProps {
  isOpen: boolean;
  onClose: () => void;
  profileData: StudentProfileData;
}

export const BonafideLetterModal: React.FC<BonafideLetterModalProps> = ({
  isOpen,
  onClose,
  profileData
}) => {
  const letterRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handleDownloadPDF = async () => {
    if (!letterRef.current) return;
    try {
      const canvas = await html2canvas(letterRef.current, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('portrait', 'mm', 'a4');
      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 10, 15, imgWidth, imgHeight);
      pdf.save(`PBS_Bonafide_Certificate_${profileData.studentId}.pdf`);
    } catch (err) {
      console.error('PDF error:', err);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-3xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="bg-slate-900 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm">Official Bonafide & Enrollment Certificate</h3>
              <p className="text-[11px] text-slate-400">Institutional verification letter with authorized signature & QR validity</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Printable Document Body */}
        <div className="p-6 sm:p-10 bg-slate-100 overflow-y-auto flex items-center justify-center">
          <div 
            ref={letterRef}
            className="w-full bg-white p-8 sm:p-12 rounded-xl shadow-lg border border-slate-300 text-slate-800 space-y-6 relative"
          >
            {/* Watermark */}
            <div className="absolute inset-0 flex items-center justify-center opacity-4 pointer-events-none">
              <div className="text-[120px] font-black text-slate-900 rotate-[-30deg] tracking-widest">PBS</div>
            </div>

            {/* Letterhead Header */}
            <div className="border-b-2 border-emerald-600 pb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-700 to-teal-600 flex items-center justify-center text-white font-black text-xl shadow">
                  PBS
                </div>
                <div>
                  <h2 className="font-black text-lg text-slate-900 tracking-tight">PRAGMATIC BIM SOLUTION</h2>
                  <p className="text-xs text-slate-500 font-medium">BIM Training & AEC Consultancy Services • ISO 19650 Certified</p>
                  <p className="text-[10px] text-slate-400">Head Office: Hinjawadi Phase 1, Pune, Maharashtra 411057 • contact@pragmaticbim.com</p>
                </div>
              </div>

              <div className="text-right text-[11px] text-slate-500 font-mono">
                <p><span className="font-bold text-slate-700">Ref:</span> PBS/VERIF/2026/084</p>
                <p><span className="font-bold text-slate-700">Date:</span> August 20, 2026</p>
              </div>
            </div>

            {/* Certificate Title */}
            <div className="text-center pt-2 pb-2">
              <span className="inline-block uppercase tracking-widest text-xs font-black text-emerald-800 bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-200">
                BONAFIDE ENROLLMENT CERTIFICATE
              </span>
            </div>

            {/* Body text */}
            <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-slate-700">
              <p>
                <strong>TO WHOMSOEVER IT MAY CONCERN,</strong>
              </p>

              <p>
                This is to officially certify that <strong>Mr. {profileData.fullName}</strong>, 
                holding PBS Student Identification Number <strong>{profileData.studentId}</strong> and 
                Roll Number <strong>{profileData.rollNumber}</strong>, is a registered bonafide student 
                enrolled in the <strong>BIM Professional Cohort Masterclass (Autodesk Revit MEP, Navisworks Manage & Dynamo Specialization)</strong> at 
                Pragmatic BIM Solution for the academic term 2026.
              </p>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-500 block">Candidate Name:</span>
                  <strong className="text-slate-900">{profileData.fullName}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Student ID:</span>
                  <strong className="text-emerald-700 font-mono">{profileData.studentId}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Academic Qualification:</span>
                  <strong className="text-slate-900">{profileData.educationDegree}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Current Cumulative Standing:</span>
                  <strong className="text-emerald-700">Top 1% (98.2% Average Score)</strong>
                </div>
              </div>

              <p>
                During this training program, the student has actively engaged in comprehensive 3D BIM parametric authoring (LOD 300 - 500), 
                Navisworks clash detection, ISO 19650 information management, and 4D/5D VDC simulation on real-world commercial tower datasets.
              </p>

              <p>
                This certificate is issued on the student's request for verification of academic standing, professional credentials, and corporate placement requirements.
              </p>
            </div>

            {/* Signature & Seal Footer */}
            <div className="pt-8 border-t border-slate-200 flex items-end justify-between">
              <div className="space-y-1">
                <div className="w-20 h-20 rounded-full border-2 border-dashed border-emerald-600/60 flex items-center justify-center p-1 text-center bg-emerald-50/50">
                  <span className="text-[9px] font-black text-emerald-800 uppercase tracking-tighter">
                    OFFICIAL PBS SEAL<br/>★ VERIFIED ★
                  </span>
                </div>
              </div>

              <div className="text-right space-y-1">
                <div className="font-serif italic text-base text-slate-800 font-bold">
                  Pravin Yadav
                </div>
                <div className="border-t border-slate-400 pt-1">
                  <p className="font-bold text-xs text-slate-900">Pravin Yadav</p>
                  <p className="text-[10px] text-slate-500 font-medium">BIM Director & Head of Academic Council</p>
                  <p className="text-[9px] text-emerald-700 font-semibold">Pragmatic BIM Solution</p>
                </div>
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
            <span>Download Official PDF Letter</span>
          </button>
        </div>

      </div>
    </div>
  );
};
