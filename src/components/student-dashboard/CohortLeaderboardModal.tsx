import React, { useState, useEffect } from 'react';
import { 
  X, 
  Trophy, 
  Crown, 
  Search,
  Sparkles,
  Zap,
  Flame,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { pbsAdminStore, LeaderboardStudentData } from '../../utils/pbsAdminStore';
import { soundFx } from '../../utils/soundEffects';

interface CohortLeaderboardModalProps {
  onClose: () => void;
  currentStudentId?: string;
}

export const CohortLeaderboardModal: React.FC<CohortLeaderboardModalProps> = ({ 
  onClose,
  currentStudentId = 'PBS-STU-2026-8492'
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cohortStudents, setCohortStudents] = useState<LeaderboardStudentData[]>([]);

  useEffect(() => {
    const liveRankings = pbsAdminStore.getLeaderboardData(currentStudentId);
    setCohortStudents(liveRankings);
  }, [currentStudentId]);

  const currentUser = cohortStudents.find(s => s.isCurrentUser) || cohortStudents[0];

  const filtered = cohortStudents.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.badge.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] flex flex-col border border-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-inner">
              <Trophy className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-slate-900">Cohort Performance Leaderboard</h3>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Live Store Sync</span>
              </div>
              <p className="text-xs text-slate-500">Real-time cumulative evaluation rankings for BIM Cohort 2026</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current User Highlight Banner */}
        {currentUser && (
          <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-emerald-800 text-white rounded-2xl p-4 sm:p-5 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3.5">
              <div className="relative">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-amber-400 shadow-md">
                  <img 
                    src={currentUser.avatar} 
                    alt={currentUser.name} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="absolute -top-1 -right-1 bg-amber-400 text-slate-900 rounded-full p-0.5 shadow">
                  <Crown className="w-3.5 h-3.5 fill-current" />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-white text-base">{currentUser.name}</h4>
                  <span className="text-[10px] bg-amber-400/20 text-amber-300 border border-amber-400/40 px-2 py-0.5 rounded-full font-bold">
                    Rank #{currentUser.rank} (You)
                  </span>
                </div>
                <p className="text-xs text-emerald-200">
                  {currentUser.credits} Live Credits • {currentUser.attendancePercent}% Attendance • {currentUser.tasksCompleted} Tasks Verified
                </p>
              </div>
            </div>

            <div className="text-right hidden sm:block">
              <div className="text-2xl font-black text-amber-400">#{currentUser.rank}</div>
              <div className="text-[10px] text-emerald-300 font-semibold uppercase tracking-wider">{currentUser.badge}</div>
            </div>
          </div>
        )}

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search cohort peers by name, roll number, or badge..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Students Ranking Table */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100 border border-slate-200 rounded-2xl">
          {filtered.map((student) => (
            <div
              key={student.studentId || student.rank}
              className={`p-3.5 sm:px-5 flex items-center justify-between gap-3 transition-colors ${
                student.isCurrentUser ? 'bg-emerald-50/70 font-semibold' : 'hover:bg-slate-50'
              }`}
            >
              {/* Rank & Profile */}
              <div className="flex items-center gap-3.5 min-w-0">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                  student.rank === 1 ? 'bg-amber-400 text-slate-900 shadow-sm' :
                  student.rank === 2 ? 'bg-slate-200 text-slate-700' :
                  student.rank === 3 ? 'bg-amber-700 text-amber-100' : 'bg-slate-100 text-slate-500'
                }`}>
                  {student.rank}
                </div>

                <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 border border-slate-200">
                  <img src={student.avatar} alt={student.name} className="w-full h-full object-cover" />
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">{student.name}</p>
                    {student.isCurrentUser && (
                      <span className="text-[10px] text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded font-bold">You</span>
                    )}
                  </div>
                  <span className="text-[11px] text-slate-500">{student.badge}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="text-right shrink-0">
                <div className="text-xs sm:text-sm font-bold text-slate-900">{student.credits} Credits</div>
                <div className="text-[10px] text-slate-500">{student.tasksCompleted} Tasks • {student.attendancePercent}% Att.</div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-2 flex items-center justify-between">
          <span className="text-xs text-slate-400">Showing real synchronized cohort ranking data</span>
          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold cursor-pointer transition-colors"
          >
            Close Leaderboard
          </button>
        </div>
      </div>
    </div>
  );
};
