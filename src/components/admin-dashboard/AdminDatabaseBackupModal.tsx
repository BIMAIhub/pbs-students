import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Upload, 
  FileJson, 
  FileSpreadsheet, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  ShieldCheck, 
  Database, 
  Copy, 
  Check, 
  FolderArchive,
  Layers,
  Sparkles,
  Server
} from 'lucide-react';
import { pbsAdminStore } from '../../utils/pbsAdminStore';
import { soundFx } from '../../utils/soundEffects';

interface AdminDatabaseBackupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDataRestored: () => void;
}

export const AdminDatabaseBackupModal: React.FC<AdminDatabaseBackupModalProps> = ({
  isOpen,
  onClose,
  onDataRestored
}) => {
  const [activeTab, setActiveTab] = useState<'export' | 'import' | 'rawJson'>('export');
  const [jsonInput, setJsonInput] = useState('');
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const students = pbsAdminStore.getStudents();
  const courses = pbsAdminStore.getCourses();

  const handleExportFullJSON = () => {
    soundFx.playClick();
    const jsonStr = pbsAdminStore.exportDatabaseJSON();
    const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const dateStr = new Date().toISOString().split('T')[0];
    link.download = `PBS_Complete_System_Backup_${dateStr}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    soundFx.playSuccess();
    setStatusMessage({
      type: 'success',
      text: `Full JSON Database backup successfully downloaded (${students.length} students, ${courses.length} courses).`
    });
  };

  const handleExportCSV = () => {
    soundFx.playClick();
    const csvContent = pbsAdminStore.exportStudentsToCSV();
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const dateStr = new Date().toISOString().split('T')[0];
    link.download = `PBS_Students_Roster_${dateStr}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    soundFx.playSuccess();
    setStatusMessage({
      type: 'success',
      text: 'Student roster CSV file exported successfully.'
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        processRestore(content);
      }
    };
    reader.readAsText(file);
  };

  const processRestore = (jsonStr: string) => {
    soundFx.playClick();
    const result = pbsAdminStore.importDatabaseJSON(jsonStr);
    if (result.success) {
      soundFx.playSuccess();
      setStatusMessage({ type: 'success', text: result.message });
      onDataRestored();
    } else {
      soundFx.playLevelUp();
      setStatusMessage({ type: 'error', text: result.message });
    }
  };

  const handleCopyCurrentJSON = () => {
    soundFx.playClick();
    const jsonStr = pbsAdminStore.exportDatabaseJSON();
    navigator.clipboard.writeText(jsonStr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full border border-emerald-100 shadow-2xl overflow-hidden animate-scaleIn">
        
        {/* Header (Green & White Theme) */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white text-emerald-800 flex items-center justify-center font-black text-lg shadow-md">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-base tracking-tight flex items-center gap-2">
                <span>PBS System Backup & JSON Data Vault</span>
                <span className="bg-emerald-500/30 text-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-400/30">
                  ISO 19650
                </span>
              </h2>
              <p className="text-xs text-emerald-200/90 font-medium">
                Full Database Export, JSON Student Dossiers, and Instant Restore Manager
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-100 bg-slate-50 px-5 pt-3 gap-2">
          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab('export');
            }}
            className={`px-4 py-2 text-xs font-bold rounded-t-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'export'
                ? 'bg-white text-emerald-800 border-t-2 border-emerald-600 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Backup (JSON/CSV)</span>
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab('import');
            }}
            className={`px-4 py-2 text-xs font-bold rounded-t-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'import'
                ? 'bg-white text-emerald-800 border-t-2 border-emerald-600 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Restore / Upload JSON</span>
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab('rawJson');
            }}
            className={`px-4 py-2 text-xs font-bold rounded-t-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'rawJson'
                ? 'bg-white text-emerald-800 border-t-2 border-emerald-600 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <FileJson className="w-3.5 h-3.5" />
            <span>Direct JSON Editor</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          
          {/* Status Message Notification */}
          {statusMessage && (
            <div className={`p-3.5 rounded-2xl text-xs font-bold flex items-center gap-2.5 border ${
              statusMessage.type === 'success'
                ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                : 'bg-rose-50 border-rose-300 text-rose-800'
            }`}>
              {statusMessage.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              )}
              <span>{statusMessage.text}</span>
            </div>
          )}

          {/* Database Summary Box */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 grid grid-cols-3 gap-3 text-center">
            <div className="p-2 bg-white rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Students Enrolled</span>
              <span className="text-base font-black text-emerald-700 mt-0.5 block">{students.length} Records</span>
            </div>
            <div className="p-2 bg-white rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Courses Active</span>
              <span className="text-base font-black text-slate-900 mt-0.5 block">{courses.length} Tracks</span>
            </div>
            <div className="p-2 bg-white rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Database State</span>
              <span className="text-base font-black text-emerald-700 mt-0.5 block flex items-center justify-center gap-1">
                <ShieldCheck className="w-4 h-4" />
                <span>Synced</span>
              </span>
            </div>
          </div>

          {/* TAB 1: EXPORT */}
          {activeTab === 'export' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-600 leading-relaxed">
                Download a complete, self-contained JSON snapshot of all student enrollments, fee accounting ledgers, video lessons with Microsoft & Google Drive links, and placement pipelines.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Full JSON Export Button */}
                <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200 flex flex-col justify-between space-y-3">
                  <div className="space-y-1">
                    <div className="font-extrabold text-xs text-emerald-900 flex items-center gap-1.5">
                      <FileJson className="w-4 h-4 text-emerald-700" />
                      <span>Full System Backup (.json)</span>
                    </div>
                    <p className="text-[11px] text-emerald-800 leading-snug">
                      Complete snapshot with metadata, student passwords, fees, Capstone XP, and DRM video links.
                    </p>
                  </div>

                  <button
                    onClick={handleExportFullJSON}
                    className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-700/20 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download JSON Backup</span>
                  </button>
                </div>

                {/* CSV Roster Export Button */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-3">
                  <div className="space-y-1">
                    <div className="font-extrabold text-xs text-slate-900 flex items-center gap-1.5">
                      <FileSpreadsheet className="w-4 h-4 text-emerald-700" />
                      <span>Excel & Sheets Table (.csv)</span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-snug">
                      Tabular spreadsheet containing student contact info, fee balances, grades, and company shortlists.
                    </p>
                  </div>

                  <button
                    onClick={handleExportCSV}
                    className="w-full py-2.5 bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-2xs"
                  >
                    <Download className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Export CSV Spreadsheet</span>
                  </button>
                </div>

              </div>

              {/* Copy Raw JSON Quick Action */}
              <div className="pt-2 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100">
                <span>Need quick clipboard copy?</span>
                <button
                  onClick={handleCopyCurrentJSON}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'JSON Copied!' : 'Copy Database JSON'}</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: IMPORT / RESTORE */}
          {activeTab === 'import' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-600 leading-relaxed">
                Restore student records, course catalogs, or an entire system snapshot from a previously exported PBS JSON file.
              </p>

              <label className="border-2 border-dashed border-emerald-300 hover:border-emerald-500 bg-emerald-50/50 hover:bg-emerald-50/80 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all">
                <Upload className="w-10 h-10 text-emerald-600 mb-2 animate-bounce" />
                <span className="text-xs font-extrabold text-slate-800">
                  Click to Browse or Drop PBS Backup JSON File
                </span>
                <span className="text-[11px] text-slate-500 mt-1">
                  Accepts .json backup files or single student dossier exports
                </span>
                <input
                  type="file"
                  accept=".json,application/json"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-[11px] font-medium flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
                <span>Restoring from a backup will merge and update existing student records and course curriculum.</span>
              </div>
            </div>
          )}

          {/* TAB 3: DIRECT JSON EDITOR */}
          {activeTab === 'rawJson' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-600">
                Paste JSON data directly into the editor below to import or update records:
              </p>

              <textarea
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                placeholder="Paste { ... } or [ ... ] JSON data here..."
                rows={7}
                className="w-full p-3 font-mono text-[11px] bg-slate-900 text-emerald-300 rounded-xl border border-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />

              <div className="flex items-center justify-between">
                <button
                  onClick={() => setJsonInput(pbsAdminStore.exportDatabaseJSON())}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                >
                  Load Current Database JSON
                </button>

                <button
                  onClick={() => {
                    if (jsonInput.trim()) {
                      processRestore(jsonInput);
                    }
                  }}
                  disabled={!jsonInput.trim()}
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Apply & Restore JSON</span>
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
            <Server className="w-3.5 h-3.5 text-emerald-700" />
            <span>Local Vault Synchronization Active</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
