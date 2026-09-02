import React, { useState, useEffect } from 'react';
import { 
  X, 
  Activity, 
  Clock, 
  Download, 
  FileText, 
  Award, 
  CheckCircle2, 
  Calendar, 
  Sparkles, 
  Eye, 
  KeyRound, 
  MessageSquare,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { pbsAdminStore, StudentActivityLog, ManagedStudent } from '../../utils/pbsAdminStore';
import { soundFx } from '../../utils/soundEffects';

interface AdminStudentActivityModalProps {
  student: ManagedStudent;
  onClose: () => void;
}

export const AdminStudentActivityModal: React.FC<AdminStudentActivityModalProps> = ({
  student,
  onClose
}) => {
  const [logs, setLogs] = useState<StudentActivityLog[]>([]);

  useEffect(() => {
    const studentLogs = pbsAdminStore.getActivityLogs(student.studentId);
    setLogs(studentLogs);
  }, [student.studentId]);

  const getActivityIcon = (type: StudentActivityLog['actionType']) => {
    switch (type) {
      case 'login':
        return <KeyRound className="w-4 h-4 text-blue-500" />;
      case 'module_completed':
        return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
      case 'task_submitted':
        return <FileText className="w-4 h-4 text-purple-500" />;
      case 'mcq_attempted':
      case 'certificate_unlocked':
        return <Award className="w-4 h-4 text-amber-500" />;
      case 'asset_downloaded':
        return <Download className="w-4 h-4 text-teal-500" />;
      case 'portfolio_updated':
        return <Sparkles className="w-4 h-4 text-indigo-500" />;
      default:
        return <Activity className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-5 sm:p-7 shadow-2xl space-y-5 max-h-[90vh] flex flex-col border border-slate-100">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-inner">
              <Activity className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Live Activity Timeline & Telemetry
              </h3>
              <p className="text-xs text-slate-500">
                Student: <strong className="text-slate-900">{student.name}</strong> • Roll: {student.rollNumber} • ID: {student.studentId}
              </p>
            </div>
          </div>

          <button 
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Metrics Bar */}
        <div className="grid grid-cols-3 gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 text-center">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Active Time</span>
            <span className="text-sm font-black text-slate-800">{student.activeTimeMinutes || 340} Mins</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Tasks Submitted</span>
            <span className="text-sm font-black text-emerald-700">{student.tasksSubmitted || 0} / 87</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Credits Scored</span>
            <span className="text-sm font-black text-purple-700">{student.creditsEarned || 0} / 1200</span>
          </div>
        </div>

        {/* Timeline Stream */}
        <div className="flex-1 overflow-y-auto p-1 space-y-3">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Real-Time Activity Audit Trail ({logs.length} events recorded)
          </h4>

          {logs.length === 0 ? (
            <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-xs text-slate-400">
              No recent activity recorded for this student yet.
            </div>
          ) : (
            <div className="space-y-2.5">
              {logs.map((log) => (
                <div 
                  key={log.id}
                  className="p-3 bg-white border border-slate-200/80 rounded-2xl shadow-2xs hover:border-slate-300 transition-all flex items-start gap-3"
                >
                  <div className="p-2 bg-slate-50 rounded-xl border border-slate-100 shrink-0 mt-0.5">
                    {getActivityIcon(log.actionType)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-slate-800 truncate">
                        {log.details || 'Activity logged'}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono shrink-0">
                        {log.timestamp || ''}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[9px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                        {(log.actionType || 'activity').replace(/_/g, ' ')}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
          <span className="text-[11px] text-slate-400">
            Telemetry is streamed automatically from the student LMS session.
          </span>
          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="px-4 py-2 font-bold bg-slate-900 text-white rounded-xl hover:bg-slate-800 cursor-pointer"
          >
            Close Timeline
          </button>
        </div>
      </div>
    </div>
  );
};
