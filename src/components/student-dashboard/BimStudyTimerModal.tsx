import React, { useState, useEffect } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  RotateCcw, 
  Flame, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Award,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { soundFx } from '../../utils/soundEffects';

interface BimStudyTimerModalProps {
  onClose: () => void;
  streakCount: number;
  onClaimDailyXp?: (xp: number) => void;
}

export const BimStudyTimerModal: React.FC<BimStudyTimerModalProps> = ({
  onClose,
  streakCount,
  onClaimDailyXp,
}) => {
  const [sessionType, setSessionType] = useState<'pomodoro' | 'deepWork' | 'break'>('pomodoro');
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 mins in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isAmbientSoundOn, setIsAmbientSoundOn] = useState(false);
  const [claimedToday, setClaimedToday] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(3);
  
  const [studyTasks, setStudyTasks] = useState([
    { id: 1, title: 'Model HVAC Plant Room LOD 400 Chiller Headers', done: true },
    { id: 2, title: 'Dynamo Script: Auto-Number 140 MEP Sheets', done: true },
    { id: 3, title: 'Review ISO 19650 BEP Section 4.2 CDE Folders', done: false },
    { id: 4, title: 'Resolve 3 Navisworks Hard Clashes on Level 2', done: false },
  ]);

  // Set initial duration when mode changes
  const switchMode = (mode: 'pomodoro' | 'deepWork' | 'break') => {
    soundFx.playClick();
    setSessionType(mode);
    setIsRunning(false);
    if (mode === 'pomodoro') setTimeLeft(25 * 60);
    if (mode === 'deepWork') setTimeLeft(50 * 60);
    if (mode === 'break') setTimeLeft(5 * 60);
  };

  // Timer Tick
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      soundFx.playLevelUp();
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
      setCompletedSessions(prev => prev + 1);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  // Ambient sound synthesizer loop (Pink noise / soft focus hum)
  useEffect(() => {
    let audioCtx: AudioContext | null = null;
    let osc: OscillatorNode | null = null;
    let gain: GainNode | null = null;

    if (isAmbientSoundOn) {
      try {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtx = new AudioContextClass();
        osc = audioCtx.createOscillator();
        gain = audioCtx.createGain();

        // 174 Hz Solfeggio frequency for deep focus & tension relief
        osc.type = 'sine';
        osc.frequency.setValueAtTime(174, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.04, audioCtx.currentTime);

        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
      } catch (e) {
        console.warn('Focus ambient sound error:', e);
      }
    }

    return () => {
      if (osc) {
        try { osc.stop(); } catch (e) { /* ignore */ }
      }
      if (audioCtx) {
        try { audioCtx.close(); } catch (e) { /* ignore */ }
      }
    };
  }, [isAmbientSoundOn]);

  const toggleTask = (id: number) => {
    soundFx.playClick();
    setStudyTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const handleClaimXp = () => {
    if (claimedToday) return;
    soundFx.playLevelUp();
    setClaimedToday(true);
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.5 }
    });
    if (onClaimDailyXp) {
      onClaimDailyXp(150);
    }
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const totalDuration = sessionType === 'pomodoro' ? 25 * 60 : sessionType === 'deepWork' ? 50 * 60 : 5 * 60;
  const progressPercent = ((totalDuration - timeLeft) / totalDuration) * 100;

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
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base">BIM Deep Work & Study Timer</h3>
              <p className="text-xs text-emerald-100 font-medium">Focus sprints for Autodesk Revit & Dynamo mastery</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Ambient Sound Toggle */}
            <button
              onClick={() => {
                soundFx.playClick();
                setIsAmbientSoundOn(!isAmbientSoundOn);
              }}
              className={`p-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                isAmbientSoundOn ? 'bg-white text-emerald-800 shadow' : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
              title="Toggle 174Hz Focus Sound"
            >
              {isAmbientSoundOn ? <Volume2 className="w-4 h-4 text-emerald-700" /> : <VolumeX className="w-4 h-4" />}
              <span className="hidden sm:inline">{isAmbientSoundOn ? 'Focus Tone ON' : 'Sound Off'}</span>
            </button>

            <button
              onClick={() => {
                soundFx.playClick();
                onClose();
              }}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Top Streak & XP Badge Banner */}
          <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border border-amber-200/80 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md animate-pulse">
                <Flame className="w-6 h-6 fill-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-extrabold text-slate-900">{streakCount} Days Active Streak</span>
                  <span className="bg-amber-200/80 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    Top 1% Consistency
                  </span>
                </div>
                <p className="text-xs text-amber-800">You've completed {completedSessions} study focus blocks today!</p>
              </div>
            </div>

            <button
              onClick={handleClaimXp}
              disabled={claimedToday}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer ${
                claimedToday 
                  ? 'bg-slate-200 text-slate-500 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow hover:scale-105'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{claimedToday ? '✓ Claimed 150 XP' : 'Claim +150 XP'}</span>
            </button>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center justify-center gap-2 p-1.5 bg-slate-100 rounded-2xl max-w-md mx-auto">
            {[
              { key: 'pomodoro', label: '25m Pomodoro', sub: 'Standard' },
              { key: 'deepWork', label: '50m Deep BIM', sub: 'LOD 400 sprint' },
              { key: 'break', label: '5m Short Rest', sub: 'Hydrate' },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => switchMode(tab.key as any)}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all text-center cursor-pointer ${
                  sessionType === tab.key
                    ? 'bg-white text-emerald-800 shadow-md scale-102'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <div>{tab.label}</div>
              </button>
            ))}
          </div>

          {/* Large Animated Circular Progress Clock */}
          <div className="flex flex-col items-center justify-center py-2 relative">
            <div className="relative w-60 h-60 flex items-center justify-center">
              
              {/* SVG Ring */}
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="120"
                  cy="120"
                  r="100"
                  className="stroke-slate-100"
                  strokeWidth="12"
                  fill="transparent"
                />
                <circle
                  cx="120"
                  cy="120"
                  r="100"
                  className="stroke-emerald-600 transition-all duration-500"
                  strokeWidth="12"
                  strokeDasharray={2 * Math.PI * 100}
                  strokeDashoffset={2 * Math.PI * 100 * (1 - progressPercent / 100)}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>

              {/* Central Digits */}
              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-5xl font-black font-mono tracking-tight text-slate-900">
                  {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 mt-1">
                  {isRunning ? 'Focused Deep Modeling' : 'Timer Paused'}
                </span>
                <span className="text-[10px] text-slate-400 font-medium">
                  {sessionType === 'pomodoro' ? 'Standard 25m Sprint' : sessionType === 'deepWork' ? '50m Advanced LOD Sprint' : '5m Rest Interval'}
                </span>
              </div>
            </div>

            {/* Timer Controls (Start/Pause/Reset) */}
            <div className="flex items-center gap-4 mt-6">
              <button
                onClick={() => {
                  soundFx.playClick();
                  setIsRunning(!isRunning);
                }}
                className={`px-8 py-3.5 rounded-2xl text-sm font-extrabold flex items-center gap-2 shadow-lg transition-all duration-200 cursor-pointer ${
                  isRunning
                    ? 'bg-amber-500 hover:bg-amber-600 text-white'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white hover:scale-105'
                }`}
              >
                {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                <span>{isRunning ? 'Pause Sprint' : 'Start Focus Sprint'}</span>
              </button>

              <button
                onClick={() => {
                  soundFx.playClick();
                  setIsRunning(false);
                  if (sessionType === 'pomodoro') setTimeLeft(25 * 60);
                  if (sessionType === 'deepWork') setTimeLeft(50 * 60);
                  if (sessionType === 'break') setTimeLeft(5 * 60);
                }}
                className="p-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                title="Reset Timer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Study Objectives Checklist */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-emerald-600" />
                <span>Today's BIM Study Targets</span>
              </h4>
              <span className="text-[11px] font-bold text-emerald-700">
                {studyTasks.filter(t => t.done).length} / {studyTasks.length} Done
              </span>
            </div>

            <div className="space-y-2">
              {studyTasks.map(task => (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={`p-2.5 rounded-xl border flex items-center justify-between text-xs transition-all cursor-pointer ${
                    task.done
                      ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900 line-through opacity-75'
                      : 'bg-white border-slate-200 text-slate-800 hover:border-emerald-300'
                  }`}
                >
                  <span className="font-medium">{task.title}</span>
                  <div className={`w-5 h-5 rounded-lg flex items-center justify-center ${
                    task.done ? 'bg-emerald-600 text-white' : 'border border-slate-300'
                  }`}>
                    {task.done && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
};
