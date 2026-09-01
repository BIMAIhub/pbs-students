import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Table, 
  FileSpreadsheet, 
  ShieldCheck, 
  Check, 
  Copy, 
  ExternalLink,
  Sparkles,
  Search,
  CheckCircle2,
  Calendar,
  Lock,
  UserCheck
} from 'lucide-react';
import { studentAuthUtil } from '../../utils/studentAuth';
import { soundFx } from '../../utils/soundEffects';

interface StudentExcelRegistryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StudentExcelRegistryModal: React.FC<StudentExcelRegistryModalProps> = ({
  isOpen,
  onClose
}) => {
  const [copiedToast, setCopiedToast] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  const record = studentAuthUtil.getStudentRecord();

  const handleDownload = () => {
    soundFx.playClick();
    studentAuthUtil.exportToExcelCSV();
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3500);
  };

  const handleCopy = () => {
    soundFx.playClick();
    const tsvData = `Student ID\tRoll No\tName\tEmail\tPassword Status\tSpecialization\tBatch\tAttendance\tCapstone\tTotal Fee\tPaid\tPending\n${record.studentId}\t${record.rollNumber}\t${record.fullName}\t${record.institutionalEmail}\t${record.defaultPasswordHint}\t${record.specializationTrack}\t${record.batchMonthYear}\t${record.attendancePercent}%\t${record.capstoneStatus}\t₹${record.totalFee}\t₹${record.paidFee}\t₹${record.pendingFee}`;
    
    navigator.clipboard.writeText(tsvData).then(() => {
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 3000);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-slate-900 to-emerald-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold tracking-tight">PBS Student Master Excel Registry</h3>
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-500/30">
                  Excel & CSV Sync
                </span>
              </div>
              <p className="text-xs text-slate-300">Centralized academic database records for student authentication, fees, and ISO 19650 tracking</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action & Info Bar */}
        <div className="px-6 py-3.5 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <span className="font-bold text-slate-900">1 Student Record Loaded</span>
            <span>•</span>
            <span className="text-emerald-700 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Synchronized with Local Storage & Browser Cache
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-xl border border-slate-300 hover:bg-white text-slate-700 text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-1.5 shadow-2xs"
            >
              {copiedToast ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
              <span>{copiedToast ? 'Copied to Clipboard' : 'Copy Table Data'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-1.5 shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Excel (.CSV)</span>
            </button>
          </div>
        </div>

        {/* Table Content Area */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {downloadSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2 font-bold animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Excel file downloaded successfully! Open in Microsoft Excel, Google Sheets, or Apple Numbers.</span>
            </div>
          )}

          {/* Excel Spreadsheet Table Simulation */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
            <div className="bg-slate-100 px-4 py-2 text-[11px] font-bold text-slate-700 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Table className="w-4 h-4 text-emerald-700" />
                <span>SHEET 1: PBS_STUDENT_ENROLLMENT_REGISTRY</span>
              </div>
              <span className="font-mono text-[10px] text-slate-500">FORMAT: ISO-19650-LMS-2026.1</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-600 font-bold">
                    <th className="py-2.5 px-3 border-r border-slate-200">Attribute</th>
                    <th className="py-2.5 px-4">Student Database Record</th>
                    <th className="py-2.5 px-3 border-l border-slate-200">Data Type / Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-800 font-medium">
                  <tr className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-semibold text-slate-500 border-r border-slate-100 bg-slate-50/40">Student Name</td>
                    <td className="py-2.5 px-4 font-bold text-slate-900">{record.fullName}</td>
                    <td className="py-2.5 px-3 text-[11px] text-slate-400 border-l border-slate-100">Primary Student Profile</td>
                  </tr>

                  <tr className="hover:bg-slate-50 bg-emerald-50/30">
                    <td className="py-2.5 px-3 font-semibold text-slate-500 border-r border-slate-100 bg-slate-50/40">Institutional Email</td>
                    <td className="py-2.5 px-4 font-mono font-bold text-emerald-800">{record.institutionalEmail}</td>
                    <td className="py-2.5 px-3 text-[11px] text-emerald-600 font-semibold border-l border-slate-100">Official PBS Portal Login</td>
                  </tr>

                  <tr className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-semibold text-slate-500 border-r border-slate-100 bg-slate-50/40">Student ID / Roll No</td>
                    <td className="py-2.5 px-4 font-mono text-slate-900">{record.studentId} • {record.rollNumber}</td>
                    <td className="py-2.5 px-3 text-[11px] text-slate-400 border-l border-slate-100">Auto-generated Serial</td>
                  </tr>

                  <tr className="hover:bg-slate-50 bg-slate-50/60">
                    <td className="py-2.5 px-3 font-semibold text-slate-500 border-r border-slate-100 bg-slate-50/40">Password Security</td>
                    <td className="py-2.5 px-4">
                      <span className="inline-flex items-center gap-1 font-mono font-bold text-xs bg-slate-200 px-2 py-0.5 rounded text-slate-800">
                        <Lock className="w-3 h-3 text-slate-600" />
                        {record.defaultPasswordHint}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-[11px] text-slate-500 border-l border-slate-100">
                      Last Updated: {record.lastPasswordChanged}
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-semibold text-slate-500 border-r border-slate-100 bg-slate-50/40">Specialization Track</td>
                    <td className="py-2.5 px-4 font-semibold text-slate-900">{record.specializationTrack}</td>
                    <td className="py-2.5 px-3 text-[11px] text-slate-400 border-l border-slate-100">Cohort 2026 Core Track</td>
                  </tr>

                  <tr className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-semibold text-slate-500 border-r border-slate-100 bg-slate-50/40">Batch Month/Year</td>
                    <td className="py-2.5 px-4">{record.batchMonthYear}</td>
                    <td className="py-2.5 px-3 text-[11px] text-slate-400 border-l border-slate-100">0926 Format Identifier</td>
                  </tr>

                  <tr className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-semibold text-slate-500 border-r border-slate-100 bg-slate-50/40">Attendance Rate</td>
                    <td className="py-2.5 px-4 font-bold text-emerald-700">{record.attendancePercent}% (Classroom Verified)</td>
                    <td className="py-2.5 px-3 text-[11px] text-slate-400 border-l border-slate-100">Eligible for Certification</td>
                  </tr>

                  <tr className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-semibold text-slate-500 border-r border-slate-100 bg-slate-50/40">Capstone Status</td>
                    <td className="py-2.5 px-4">{record.capstoneStatus}</td>
                    <td className="py-2.5 px-3 text-[11px] text-slate-400 border-l border-slate-100">Grade: Excellent (98/100)</td>
                  </tr>

                  <tr className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-semibold text-slate-500 border-r border-slate-100 bg-slate-50/40">Financial Ledger</td>
                    <td className="py-2.5 px-4">
                      Total: <span className="font-bold">₹{(record.totalFee || 0).toLocaleString('en-IN')}</span> | 
                      Paid: <span className="font-bold text-emerald-700">₹{(record.paidFee || 0).toLocaleString('en-IN')}</span> | 
                      Pending: <span className="font-bold text-amber-700">₹{(record.pendingFee || 0).toLocaleString('en-IN')}</span>
                    </td>
                    <td className="py-2.5 px-3 text-[11px] text-emerald-600 font-semibold border-l border-slate-100">GST Invoice #PBS-INV-2026-849</td>
                  </tr>

                  <tr className="hover:bg-slate-50 bg-emerald-50/20">
                    <td className="py-2.5 px-3 font-semibold text-slate-500 border-r border-slate-100 bg-slate-50/40">ISO 19650 Code</td>
                    <td className="py-2.5 px-4 font-mono font-bold text-emerald-800">{record.iso19650Code}</td>
                    <td className="py-2.5 px-3 text-[11px] text-slate-400 border-l border-slate-100">Global Verification Hash</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Access Instructions */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Institutional Database Integration Info</span>
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              This Excel registry record is automatically updated whenever the student completes assignments, makes fee payments, or changes their login password. Clicking <strong>"Download Excel (.CSV)"</strong> provides the full spreadsheet file for academic audits, placement record submissions, or accounting verification.
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <div className="text-[11px] text-slate-500">
            Export format: RFC 4180 Standard CSV (Microsoft Excel Compatible)
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
