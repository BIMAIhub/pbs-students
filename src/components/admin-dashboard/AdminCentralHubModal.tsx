import React, { useState, useEffect } from 'react';
import { 
  X, 
  HardDrive, 
  FileSpreadsheet, 
  ExternalLink, 
  Copy, 
  Check, 
  RefreshCw, 
  ShieldCheck, 
  FolderPlus, 
  Share2, 
  CheckCircle2, 
  Database,
  Cloud,
  FileText,
  Users,
  Video,
  Key
} from 'lucide-react';
import { pbsAdminStore, ManagedStudent } from '../../utils/pbsAdminStore';
import { soundFx } from '../../utils/soundEffects';

interface AdminCentralHubModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminCentralHubModal: React.FC<AdminCentralHubModalProps> = ({
  isOpen,
  onClose
}) => {
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [googleDriveUrl, setGoogleDriveUrl] = useState(() => {
    return localStorage.getItem('pbs_admin_gdrive_folder') || 'https://drive.google.com/drive/folders/1PBS_BIM_ACADEMY_MASTER_HUB_2026';
  });
  const [googleSheetUrl, setGoogleSheetUrl] = useState(() => {
    return localStorage.getItem('pbs_admin_gsheet_url') || 'https://docs.google.com/spreadsheets/d/1PBS_Student_Master_Registry_2026_Live';
  });
  const [students, setStudents] = useState<ManagedStudent[]>(() => pbsAdminStore.getStudents());
  const [isSaved, setIsSaved] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setStudents(pbsAdminStore.getStudents());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSaveUrls = () => {
    soundFx.playClick();
    localStorage.setItem('pbs_admin_gdrive_folder', googleDriveUrl);
    localStorage.setItem('pbs_admin_gsheet_url', googleSheetUrl);
    setIsSaved(true);
    soundFx.playSuccess();
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleCopy = (text: string, id: string) => {
    soundFx.playClick();
    navigator.clipboard.writeText(text);
    setCopiedUrl(id);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const handleSyncCloud = async () => {
    soundFx.playClick();
    setIsSyncing(true);
    await pbsAdminStore.syncWithCloudServer(true);
    setStudents(pbsAdminStore.getStudents());
    setIsSyncing(false);
    soundFx.playSuccess();
  };

  const handleExportCSV = () => {
    soundFx.playClick();
    const csvContent = pbsAdminStore.exportStudentsToCSV();
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const dateStr = new Date().toISOString().split('T')[0];
    link.download = `PBS_Google_Drive_Import_Students_${dateStr}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    soundFx.playSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400 shadow-inner">
              <HardDrive className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold tracking-tight">PBS Central Data & Google Drive Hub</h3>
                <span className="bg-emerald-500/30 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-400/30">
                  Cloud Synchronized
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Hybrid Cloud Architecture: High-speed server auth + Google Drive & Google Sheets media hub
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-slate-50/50">
          
          {/* Architecture Visual Explainer */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm">
                <Database className="w-4 h-4 text-emerald-600" />
                <span>Pragmatic BIM Solution Data Topology</span>
              </div>
              <button
                onClick={handleSyncCloud}
                disabled={isSyncing}
                className="px-3 py-1 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200 flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                <span>{isSyncing ? 'Syncing...' : 'Force Live Sync'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Cloud Database Box */}
              <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    Central Cloud Database (Server)
                  </span>
                  <span className="text-[10px] bg-emerald-200/60 text-emerald-900 px-2 py-0.5 rounded font-mono font-bold">
                    Active
                  </span>
                </div>
                <p className="text-xs text-emerald-800/80 leading-relaxed">
                  Stores secure student credentials, passwords, fee receipts, live attendance, and capstone grades with instant sub-millisecond login verification.
                </p>
                <div className="pt-1 text-[11px] font-bold text-emerald-900 flex items-center gap-2">
                  <Users className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{students.length} Registered Students Synchronized</span>
                </div>
              </div>

              {/* Google Drive / Sheets Box */}
              <div className="p-4 rounded-xl bg-sky-50/60 border border-sky-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-sky-900 flex items-center gap-1.5">
                    <Cloud className="w-4 h-4 text-sky-600" />
                    Google Drive & Sheets Hub
                  </span>
                  <span className="text-[10px] bg-sky-200/60 text-sky-900 px-2 py-0.5 rounded font-mono font-bold">
                    Linked
                  </span>
                </div>
                <p className="text-xs text-sky-800/80 leading-relaxed">
                  Hosts master video lectures, Revit families (`.rfa`), sample project models (`.rvt`), Dynamo packages, and Google Sheets student master exports.
                </p>
                <div className="pt-1 flex items-center gap-2">
                  <button
                    onClick={handleExportCSV}
                    className="text-[11px] font-bold text-sky-700 hover:text-sky-900 underline flex items-center gap-1 cursor-pointer"
                  >
                    <FileSpreadsheet className="w-3.5 h-3.5" />
                    <span>Download CSV for Google Sheets</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Drive Configuration Inputs */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Key className="w-4 h-4 text-emerald-600" />
              <span>Connect Your Academic Drive & Sheets Folders</span>
            </h4>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  1. Master Google Drive Video & Revit Asset Folder URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={googleDriveUrl}
                    onChange={(e) => setGoogleDriveUrl(e.target.value)}
                    placeholder="https://drive.google.com/drive/folders/..."
                    className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono text-slate-800"
                  />
                  <a
                    href={googleDriveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl flex items-center gap-1.5 border border-slate-300 cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Open</span>
                  </a>
                </div>
                <span className="text-[11px] text-slate-500">
                  Shared folder where recorded masterclasses, BEP templates, and Revit datasets are accessible to students.
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  2. Master Google Sheet / Excel Student Records URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={googleSheetUrl}
                    onChange={(e) => setGoogleSheetUrl(e.target.value)}
                    placeholder="https://docs.google.com/spreadsheets/d/..."
                    className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono text-slate-800"
                  />
                  <a
                    href={googleSheetUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl flex items-center gap-1.5 border border-slate-300 cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Open</span>
                  </a>
                </div>
                <span className="text-[11px] text-slate-500">
                  Direct spreadsheet link to view student admissions, batch distribution, and fee ledgers on mobile or web.
                </span>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  onClick={handleSaveUrls}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-xs flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Save Drive Links</span>
                </button>

                {isSaved && (
                  <span className="text-xs font-bold text-emerald-700 animate-fadeIn">
                    ✓ Google Drive & Sheet URLs updated successfully!
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Quick Roster Copy Table */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-emerald-600" />
                <span>Active Student Directory ({students.length} Records)</span>
              </h4>
              <button
                onClick={handleExportCSV}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl border border-slate-300 flex items-center gap-1.5 cursor-pointer"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-700" />
                <span>Export to Google Drive CSV</span>
              </button>
            </div>

            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-700 border-b border-slate-200 font-bold">
                  <tr>
                    <th className="py-2 px-3">Student ID</th>
                    <th className="py-2 px-3">Name</th>
                    <th className="py-2 px-3">Login Email</th>
                    <th className="py-2 px-3">Contact</th>
                    <th className="py-2 px-3">Specialization</th>
                    <th className="py-2 px-3">Fee Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-800">
                  {students.map((s, idx) => (
                    <tr key={s.studentId || idx} className="hover:bg-slate-50/80">
                      <td className="py-2 px-3 font-mono font-bold text-slate-900">{s.studentId}</td>
                      <td className="py-2 px-3 font-bold">{s.name}</td>
                      <td className="py-2 px-3 font-mono text-emerald-800">{s.email}</td>
                      <td className="py-2 px-3 font-mono text-slate-600">{s.phone}</td>
                      <td className="py-2 px-3 max-w-xs truncate">{s.specialization}</td>
                      <td className="py-2 px-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          s.paymentStatus === 'Full Paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {s.paymentStatus || 'Active'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-white border-t border-slate-200 flex items-center justify-between">
          <div className="text-[11px] text-slate-500 font-medium">
            Pragmatic BIM Solution Academy • Live Central Hub Architecture
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
