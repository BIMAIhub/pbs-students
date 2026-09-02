import React, { useState, useEffect } from 'react';
import { 
  X, 
  Download, 
  Table, 
  FileSpreadsheet, 
  ShieldCheck, 
  Check, 
  Copy, 
  Search, 
  CheckCircle2, 
  RefreshCw,
  Lock, 
  UserCheck 
} from 'lucide-react';
import { studentAuthUtil } from '../../utils/studentAuth';
import { pbsAdminStore, ManagedStudent } from '../../utils/pbsAdminStore';
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
  const [searchQuery, setSearchQuery] = useState('');
  const [students, setStudents] = useState<ManagedStudent[]>(() => pbsAdminStore.getStudents());
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    const refresh = () => {
      setStudents(pbsAdminStore.getStudents());
    };

    refresh();
    window.addEventListener('pbs_store_updated', refresh);
    window.addEventListener('storage', refresh);
    window.addEventListener('focus', refresh);

    return () => {
      window.removeEventListener('pbs_store_updated', refresh);
      window.removeEventListener('storage', refresh);
      window.removeEventListener('focus', refresh);
    };
  }, []);

  if (!isOpen) return null;

  const handleSyncNow = async () => {
    soundFx.playClick();
    setIsSyncing(true);
    await pbsAdminStore.syncWithCloudServer(true);
    setStudents(pbsAdminStore.getStudents());
    setIsSyncing(false);
  };

  const handleDownload = () => {
    soundFx.playClick();
    const csvContent = pbsAdminStore.exportStudentsToCSV();
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `PBS_Institutional_Student_Master_Registry_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3500);
  };

  const handleCopy = () => {
    soundFx.playClick();
    const headers = ['Student ID', 'Roll No', 'Name', 'Email', 'Personal Email', 'Phone', 'Specialization', 'Paid', 'Pending', 'Attendance'];
    const rows = students.map(s => [
      s.studentId,
      s.rollNumber,
      s.name,
      s.email,
      s.personalEmail || s.email,
      s.phone,
      s.specialization,
      `₹${s.paidAmount || 0}`,
      `₹${s.pendingBalance || 0}`,
      `${s.attendancePercent || 100}%`
    ]);
    const tsvData = [headers.join('\t'), ...rows.map(r => r.join('\t'))].join('\n');
    
    navigator.clipboard.writeText(tsvData).then(() => {
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 3000);
    });
  };

  const filteredStudents = students.filter(s => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      s.name?.toLowerCase().includes(q) ||
      s.email?.toLowerCase().includes(q) ||
      s.studentId?.toLowerCase().includes(q) ||
      s.rollNumber?.toLowerCase().includes(q) ||
      s.specialization?.toLowerCase().includes(q) ||
      s.phone?.includes(q)
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-5xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-slate-900 to-emerald-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold tracking-tight">PBS Central Student Excel Registry</h3>
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-500/30">
                  Live Cloud Database Sync
                </span>
              </div>
              <p className="text-xs text-slate-300">Synchronized master student roster across all connected PCs and devices</p>
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
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search student, email, ID..."
                className="pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 w-56 text-slate-800"
              />
            </div>
            <span className="text-xs font-bold text-slate-700">
              {filteredStudents.length} of {students.length} Students Loaded
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSyncNow}
              disabled={isSyncing}
              className="px-3 py-1.5 rounded-xl border border-slate-300 hover:bg-white text-slate-700 text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-1.5 shadow-2xs disabled:opacity-50"
              title="Force sync with live cloud server"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-slate-500 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Syncing...' : 'Sync Cloud'}</span>
            </button>

            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-xl border border-slate-300 hover:bg-white text-slate-700 text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-1.5 shadow-2xs"
            >
              {copiedToast ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
              <span>{copiedToast ? 'Copied TSV' : 'Copy Table'}</span>
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
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          
          {downloadSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2 font-bold animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Full student roster CSV downloaded! Ready for Microsoft Excel, Google Sheets, or Apple Numbers.</span>
            </div>
          )}

          {/* Excel Spreadsheet Table */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
            <div className="bg-slate-100 px-4 py-2 text-[11px] font-bold text-slate-700 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Table className="w-4 h-4 text-emerald-700" />
                <span>SHEET 1: PBS_STUDENT_CENTRAL_REGISTRY ({filteredStudents.length} Records)</span>
              </div>
              <span className="font-mono text-[10px] text-slate-500">AUTONOMOUS SYNC • ISO 19650 LMS</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-600 font-bold">
                    <th className="py-2.5 px-3 border-r border-slate-200">Student ID</th>
                    <th className="py-2.5 px-3 border-r border-slate-200">Roll No</th>
                    <th className="py-2.5 px-4 border-r border-slate-200">Student Name</th>
                    <th className="py-2.5 px-4 border-r border-slate-200">Institutional Email</th>
                    <th className="py-2.5 px-3 border-r border-slate-200">Phone</th>
                    <th className="py-2.5 px-4 border-r border-slate-200">Specialization</th>
                    <th className="py-2.5 px-3 border-r border-slate-200">Fees Paid</th>
                    <th className="py-2.5 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-800 font-medium">
                  {filteredStudents.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-8 text-center text-slate-500">
                        No students matching "{searchQuery}"
                      </td>
                    </tr>
                  ) : (
                    filteredStudents.map((s, idx) => (
                      <tr key={s.studentId || idx} className="hover:bg-slate-50 transition-colors">
                        <td className="py-2.5 px-3 font-mono font-bold text-slate-900 border-r border-slate-100 bg-slate-50/40">{s.studentId}</td>
                        <td className="py-2.5 px-3 font-mono text-slate-700 border-r border-slate-100">{s.rollNumber}</td>
                        <td className="py-2.5 px-4 font-bold text-slate-900 border-r border-slate-100 flex items-center gap-2">
                          <img src={s.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(s.name)}`} alt={s.name} className="w-6 h-6 rounded-full object-cover border border-slate-200" />
                          <span>{s.name}</span>
                        </td>
                        <td className="py-2.5 px-4 font-mono text-emerald-800 font-semibold border-r border-slate-100">{s.email}</td>
                        <td className="py-2.5 px-3 text-slate-600 font-mono border-r border-slate-100">{s.phone}</td>
                        <td className="py-2.5 px-4 text-slate-700 font-medium border-r border-slate-100 max-w-xs truncate" title={s.specialization}>{s.specialization}</td>
                        <td className="py-2.5 px-3 font-semibold text-emerald-700 border-r border-slate-100">₹{(s.paidAmount || 0).toLocaleString('en-IN')}</td>
                        <td className="py-2.5 px-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            s.paymentStatus === 'Full Paid' ? 'bg-emerald-100 text-emerald-800' :
                            s.paymentStatus === 'Part Paid' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                          }`}>
                            {s.paymentStatus || 'Active'}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Access Instructions */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
            <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Real-Time Cloud Synchronization</span>
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              This master registry reflects the real-time database state across all browsers and devices. Any student added or updated in the Admin Suite is synchronized via the central server.
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <div className="text-[11px] text-slate-500">
            Export standard: RFC 4180 CSV • UTF-8 with BOM
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
