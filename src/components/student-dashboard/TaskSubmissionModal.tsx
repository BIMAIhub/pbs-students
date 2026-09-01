import React, { useState } from 'react';
import { 
  X, 
  UploadCloud, 
  FileCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  Layers, 
  Cpu, 
  Award,
  ArrowRight,
  RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { soundFx } from '../../utils/soundEffects';

interface TaskSubmissionModalProps {
  onClose: () => void;
  onSubmitSuccess?: (taskData: any) => void;
}

export const TaskSubmissionModal: React.FC<TaskSubmissionModalProps> = ({
  onClose,
  onSubmitSuccess,
}) => {
  const [selectedTask, setSelectedTask] = useState('Task #88: Plant Room Chilled Water Header LOD 400');
  const [fileAttached, setFileAttached] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState<string>('');
  const [scanProgress, setScanProgress] = useState(0);
  const [scanComplete, setScanComplete] = useState(false);
  const [comments, setComments] = useState('');

  const tasksList = [
    'Task #88: Plant Room Chilled Water Header LOD 400 (Active Submittal)',
    'Task #89: Navisworks Clash Matrix Resolution Level 2',
    'Task #90: Dynamo Automated MEP Tagging Script',
    'Task #91: ISO 19650 Master Information Delivery Plan (MIDP)'
  ];

  const handleSimulateUpload = () => {
    // Mock sample file if none selected
    const mockFile = new File(['BIM_RVT_MODEL_DATA'], 'PBS_PlantRoom_CHW_LOD400_PravinYadav.rvt', { type: 'application/octet-stream' });
    setFileAttached(mockFile);
  };

  const handleStartPreflightScan = () => {
    soundFx.playClick();
    setIsScanning(true);
    setScanProgress(10);
    setScanStep('Initializing Autodesk BIM 360 / ACC API parser...');

    setTimeout(() => {
      setScanProgress(35);
      setScanStep('Auditing Parametric LOD 400 Families & MEP Connectors...');
    }, 900);

    setTimeout(() => {
      setScanProgress(70);
      setScanStep('Running Navisworks Hard Clash Interference Rules Matrix...');
    }, 1800);

    setTimeout(() => {
      setScanProgress(100);
      setScanStep('Verification Passed: 0 Critical Clashes • 100% Parameter Adherence');
      setIsScanning(false);
      setScanComplete(true);
      soundFx.playLevelUp();
      confetti({
        particleCount: 140,
        spread: 85,
        origin: { y: 0.55 }
      });
      if (onSubmitSuccess) {
        onSubmitSuccess({
          taskId: 'TSK-88',
          taskName: selectedTask,
          score: 98,
          status: 'Submitted & Evaluated'
        });
      }
    }, 2800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/80 backdrop-blur-md animate-fadeIn">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white text-slate-900 w-full max-w-2xl rounded-3xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base">Submit BIM Assignment & Live Pre-Flight Check</h3>
              <p className="text-xs text-emerald-100">Direct evaluation by Pravin Yadav & PBS Academic Board</p>
            </div>
          </div>

          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-6">
          {!scanComplete ? (
            <>
              {/* Task Selection */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Select Assignment Milestone:
                </label>
                <select
                  value={selectedTask}
                  onChange={(e) => setSelectedTask(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-800 bg-slate-50 focus:ring-2 focus:ring-emerald-500 outline-none"
                >
                  {tasksList.map((t, i) => (
                    <option key={i} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              {/* Drag and Drop File Upload Area */}
              <div
                onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                onDragLeave={() => setDragActive(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragActive(false);
                  if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                    setFileAttached(e.dataTransfer.files[0]);
                  }
                }}
                className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all ${
                  dragActive ? 'border-emerald-500 bg-emerald-50' : 'border-slate-300 bg-slate-50/50 hover:bg-slate-50'
                }`}
              >
                {fileAttached ? (
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                      <FileCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">{fileAttached.name}</h4>
                      <p className="text-xs text-slate-500">{(fileAttached.size / (1024 * 1024)).toFixed(2)} MB • Ready for Automated Scan</p>
                    </div>
                    <button
                      onClick={() => setFileAttached(null)}
                      className="text-xs text-rose-600 font-bold hover:underline cursor-pointer"
                    >
                      Remove and choose another
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <UploadCloud className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">
                        Drag and drop your Revit (<span className="text-emerald-700 font-mono">.rvt</span>), Navisworks (<span className="text-emerald-700 font-mono">.nwd</span>), or Dynamo (<span className="text-emerald-700 font-mono">.dyn</span>) file
                      </p>
                      <p className="text-xs text-slate-500 mt-1">Maximum file size: 250 MB</p>
                    </div>
                    <button
                      type="button"
                      onClick={handleSimulateUpload}
                      className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-emerald-600 hover:text-white text-slate-700 text-xs font-bold transition-all cursor-pointer"
                    >
                      Browse / Attach Sample .rvt File
                    </button>
                  </div>
                )}
              </div>

              {/* Student Project Notes / Comments */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Submission Notes for Pravin Yadav (Mentor):
                </label>
                <textarea
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  placeholder="e.g. Modeled LOD 400 Chilled water headers with flexible grooved couplings and pressure gauges..."
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              {/* Automated Scan Progress bar */}
              {isScanning && (
                <div className="space-y-3 bg-slate-900 text-white p-4 rounded-2xl border border-slate-800 animate-fadeIn">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-emerald-400 flex items-center gap-2">
                      <Cpu className="w-4 h-4 animate-spin" />
                      <span>{scanStep}</span>
                    </span>
                    <span className="font-mono font-bold text-white">{scanProgress}%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full transition-all duration-300"
                      style={{ width: `${scanProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={!fileAttached || isScanning}
                  onClick={handleStartPreflightScan}
                  className={`px-6 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all cursor-pointer ${
                    !fileAttached || isScanning
                      ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:scale-102'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{isScanning ? 'Running Pre-flight Scan...' : 'Submit & Run Pre-flight Audit'}</span>
                </button>
              </div>
            </>
          ) : (
            /* Submission Success & Result Scorecard */
            <div className="text-center space-y-6 py-4 animate-fadeIn">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Automated Pre-Flight Passed • Grade: 98/100
                </span>
                <h3 className="text-2xl font-black text-slate-900">Task Successfully Evaluated!</h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  Your Revit model passed all ISO 19650 parametric checks and Navisworks clash tolerance tests with distinction.
                </p>
              </div>

              {/* XP Awarded Card */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-4 max-w-md mx-auto flex items-center justify-between">
                <div className="flex items-center gap-3 text-left">
                  <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">+250 XP Awarded to Student Profile</span>
                    <span className="text-[11px] text-amber-800">Level 4 BIM Specialist • Rank #1</span>
                  </div>
                </div>
                <span className="font-black text-amber-600 text-base font-mono">+250 XP</span>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => {
                    setScanComplete(false);
                    setFileAttached(null);
                  }}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Submit Another Task</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold transition-all shadow-md cursor-pointer"
                >
                  Return to Dashboard
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
