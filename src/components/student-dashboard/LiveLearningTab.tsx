import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  Coins, 
  Calendar, 
  ExternalLink, 
  Sparkles, 
  Search, 
  Filter, 
  Play, 
  FileText, 
  Video,
  ChevronRight,
  Info
} from 'lucide-react';
import { LIVE_SESSIONS_DATA } from './dashboardData';
import { LiveSession } from './types';

interface LiveLearningTabProps {
  onSelectSession: (session: LiveSession) => void;
}

export const LiveLearningTab: React.FC<LiveLearningTabProps> = ({ onSelectSession }) => {
  const [activeSubTab, setActiveSubTab] = useState<'required' | 'bonus'>('required');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'compulsory' | 'optional'>('all');

  const filteredSessions = LIVE_SESSIONS_DATA.filter(session => {
    if (activeSubTab === 'bonus' && session.isCompulsory) return false;
    if (filterType === 'compulsory' && !session.isCompulsory) return false;
    if (filterType === 'optional' && session.isCompulsory) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return (
        session.title.toLowerCase().includes(q) ||
        session.instructor?.toLowerCase().includes(q) ||
        session.dateMonth.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div id="live-learning-container" className="space-y-6 pb-12">
      {/* Top Header Row with Title & Quick Stats Pills */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Live Learning Schedule
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Masterclasses, master BIM mentoring, and live coordination workshops.
          </p>
        </div>

        {/* 3 Key Metric Badges matching screenshot 2 */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Attendance */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold shadow-2xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span><strong className="text-emerald-900 font-bold">100%</strong> Attendance</span>
          </div>

          {/* Hours Learnt */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold shadow-2xs">
            <Clock className="w-4 h-4 text-teal-600" />
            <span><strong className="text-teal-900 font-bold">95</strong> Hours learnt</span>
          </div>

          {/* Credits Earned */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold shadow-2xs">
            <Coins className="w-4 h-4 text-amber-600" />
            <span><strong className="text-amber-900 font-bold">650</strong> Credits Earned</span>
          </div>
        </div>
      </div>

      {/* "Phew! You've no live sessions scheduled for this week" Banner (matching screenshot 2) */}
      <div className="bg-emerald-50/40 border border-emerald-100 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-center sm:text-left">
        <div className="w-32 h-32 shrink-0 bg-white rounded-full p-2 border border-emerald-200 shadow-sm flex items-center justify-center">
          <img 
            src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=250&q=80" 
            alt="Relaxing Meditator" 
            className="w-full h-full object-cover rounded-full"
          />
        </div>

        <div className="space-y-1.5 max-w-xl">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-white px-3 py-1 rounded-md border border-emerald-200 shadow-2xs">
            <Calendar className="w-3.5 h-3.5 text-emerald-600" />
            <span>This week, 30 Aug'26 - 05 Sep'26</span>
          </div>
          <h3 className="text-lg font-bold text-slate-800">
            Phew! You've no live sessions scheduled for this week.
          </h3>
          <p className="text-sm text-slate-600">
            It's time to let your mind rest, catch up on module recordings, or refine your Capstone project drawings.
          </p>
        </div>
      </div>

      {/* Tabs Row: YOUR REQUIRED SESSIONS vs BONUS SESSIONS (14) */}
      <div className="border-b border-slate-200">
        <div className="flex items-center gap-8">
          <button
            id="tab-required-sessions"
            onClick={() => setActiveSubTab('required')}
            className={`pb-3 text-xs sm:text-sm font-bold tracking-wider uppercase transition-colors relative cursor-pointer ${
              activeSubTab === 'required'
                ? 'text-emerald-700 border-b-2 border-emerald-600'
                : 'text-slate-500 hover:text-emerald-800'
            }`}
          >
            YOUR REQUIRED SESSIONS
          </button>

          <button
            id="tab-bonus-sessions"
            onClick={() => setActiveSubTab('bonus')}
            className={`pb-3 text-xs sm:text-sm font-bold tracking-wider uppercase transition-colors relative cursor-pointer ${
              activeSubTab === 'bonus'
                ? 'text-emerald-700 border-b-2 border-emerald-600'
                : 'text-slate-500 hover:text-emerald-800'
            }`}
          >
            BONUS SESSIONS (14)
          </button>
        </div>
      </div>

      {/* Subtext info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-500">
        <p className="leading-relaxed">
          This is a list of all the Sessions that are part of your chosen study plan. You are required to attend all sessions listed below. 
          <span className="font-semibold text-slate-700 ml-1">Minimum 75% attendance should be maintained.</span>
        </p>

        {/* Quick Search */}
        <div className="relative min-w-[220px]">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search sessions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Complete Sessions List (matching screenshot 2 style) */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs divide-y divide-slate-100">
        {filteredSessions.map((session) => (
          <div
            key={session.id}
            id={`session-row-${session.id}`}
            onClick={() => onSelectSession(session)}
            className="p-4 sm:px-6 sm:py-4.5 hover:bg-emerald-50/40 transition-colors flex items-center justify-between gap-4 group cursor-pointer"
          >
            <div className="flex items-center gap-4 sm:gap-6 min-w-0">
              {/* Green checkmark circle */}
              <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-4 h-4 fill-emerald-600 text-white" />
              </div>

              {/* Date Box: NOV 05 style */}
              <div className="w-12 sm:w-14 text-center shrink-0">
                <div className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                  {session.dateMonth}
                </div>
                <div className="text-base sm:text-lg font-bold text-slate-800 leading-none mt-0.5">
                  {session.dateDay}
                </div>
              </div>

              {/* Session Title & Time */}
              <div className="min-w-0">
                <h4 className="text-sm sm:text-base font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors truncate">
                  {session.title}
                </h4>
                <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-2">
                  <span>{session.timeRange}</span>
                  {session.instructor && (
                    <>
                      <span className="hidden sm:inline text-slate-300">•</span>
                      <span className="hidden sm:inline text-slate-600">{session.instructor}</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Right Tag: Compulsory / Optional with arrow icon */}
            <div className="shrink-0 flex items-center gap-2">
              {session.isCompulsory ? (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-amber-50 text-amber-800 border border-amber-200 text-xs font-semibold group-hover:bg-amber-100 transition-colors">
                  <span>Compulsory</span>
                  <ExternalLink className="w-3 h-3 text-amber-700" />
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold group-hover:bg-emerald-100 transition-colors">
                  <span>Optional</span>
                  <ExternalLink className="w-3 h-3 text-emerald-700" />
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
