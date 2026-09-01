import React, { useState } from 'react';
import { 
  X, 
  Trophy, 
  Medal, 
  Crown, 
  Star, 
  Sparkles, 
  TrendingUp, 
  Award, 
  CheckCircle2, 
  Flame,
  Search
} from 'lucide-react';

interface CohortLeaderboardModalProps {
  onClose: () => void;
}

interface LeaderboardStudent {
  rank: number;
  name: string;
  avatar: string;
  credits: number;
  tasksCompleted: number;
  attendancePercent: number;
  streakDays: number;
  badge: string;
  isCurrentUser?: boolean;
}

export const CohortLeaderboardModal: React.FC<CohortLeaderboardModalProps> = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const cohortStudents: LeaderboardStudent[] = [
    {
      rank: 1,
      name: 'Pravin Yadav',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      credits: 650,
      tasksCompleted: 87,
      attendancePercent: 100,
      streakDays: 45,
      badge: 'Cohort Topper 🌟',
      isCurrentUser: true,
    },
    {
      rank: 2,
      name: 'Aarav Sharma',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      credits: 635,
      tasksCompleted: 86,
      attendancePercent: 98,
      streakDays: 40,
      badge: 'BIM Star ⚡',
    },
    {
      rank: 3,
      name: 'Sneha Patel',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
      credits: 620,
      tasksCompleted: 85,
      attendancePercent: 96,
      streakDays: 38,
      badge: 'Navisworks Guru 🏗️',
    },
    {
      rank: 4,
      name: 'Rohan Deshmukh',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
      credits: 610,
      tasksCompleted: 84,
      attendancePercent: 95,
      streakDays: 35,
      badge: 'Dynamo Master 💻',
    },
    {
      rank: 5,
      name: 'Ananya Roy',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
      credits: 595,
      tasksCompleted: 82,
      attendancePercent: 94,
      streakDays: 30,
      badge: 'LOD 400 Pro 📐',
    },
    {
      rank: 6,
      name: 'Karthik Nair',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80',
      credits: 580,
      tasksCompleted: 80,
      attendancePercent: 92,
      streakDays: 28,
      badge: 'Revit Specialist 🏢',
    }
  ];

  const filtered = cohortStudents.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.badge.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] flex flex-col border border-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-inner">
              <Trophy className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Cohort Performance Leaderboard</h3>
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
        <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-emerald-800 text-white rounded-2xl p-4 sm:p-5 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3.5">
            <div className="relative">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-amber-400 shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" 
                  alt="Pravin Yadav" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="absolute -top-1 -right-1 bg-amber-400 text-slate-900 rounded-full p-0.5 shadow">
                <Crown className="w-3.5 h-3.5 fill-current" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-white text-base">Pravin Yadav</h4>
                <span className="text-[10px] bg-amber-400/20 text-amber-300 border border-amber-400/40 px-2 py-0.5 rounded-full font-bold">
                  Rank #1 (You)
                </span>
              </div>
              <p className="text-xs text-emerald-200">650 Credits Earned • 100% Attendance • 87/87 Tasks</p>
            </div>
          </div>

          <div className="text-right hidden sm:block">
            <div className="text-2xl font-black text-amber-400">#1</div>
            <div className="text-[10px] text-emerald-300 font-semibold uppercase tracking-wider">Cohort Topper</div>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search cohort peers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Students Ranking Table */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100 border border-slate-200 rounded-2xl">
          {filtered.map((student) => (
            <div
              key={student.rank}
              className={`p-3.5 sm:px-5 flex items-center justify-between gap-3 transition-colors ${
                student.isCurrentUser ? 'bg-emerald-50/70 font-semibold' : 'hover:bg-slate-50'
              }`}
            >
              {/* Rank & Profile */}
              <div className="flex items-center gap-3.5 min-w-0">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                  student.rank === 1 ? 'bg-amber-400 text-slate-900' :
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
        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold cursor-pointer transition-colors"
          >
            Close Leaderboard
          </button>
        </div>
      </div>
    </div>
  );
};
