import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  Check, 
  CheckCircle2, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  MessageSquare, 
  FileText, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  AlertTriangle, 
  Clock, 
  ThumbsUp, 
  Send,
  Sparkles,
  Layers,
  BookOpen,
  ShieldCheck,
  Lock,
  ExternalLink,
  Video,
  RotateCcw,
  RotateCw,
  MonitorPlay,
  Tv,
  HelpCircle
} from 'lucide-react';
import { COURSE_MODULES_DATA } from './dashboardData';
import { pbsAdminStore, AdminCourse, VideoLesson } from '../../utils/pbsAdminStore';
import { soundFx } from '../../utils/soundEffects';

interface ClassroomVideoModalProps {
  onClose: () => void;
  initialCourseId?: string;
}

export const ClassroomVideoModal: React.FC<ClassroomVideoModalProps> = ({ 
  onClose,
  initialCourseId
}) => {
  const [activeTab, setActiveTab] = useState<'content' | 'forum'>('content');
  const [expandedModuleId, setExpandedModuleId] = useState<string>('mod-0');
  
  // Fetch courses and videos from admin store
  const adminCourses = pbsAdminStore.getCourses();
  const currentCourse = adminCourses.find(c => c.id === initialCourseId) || adminCourses[0];

  const firstModule = currentCourse?.modules?.[0];
  const firstLesson = firstModule?.lessons?.[0];

  const [currentLesson, setCurrentLesson] = useState<{
    moduleTitle: string;
    lessonTitle: string;
    duration: string;
    isDone: boolean;
    videoUrl?: string;
    videoType?: string;
  }>({
    moduleTitle: firstModule?.title || 'Introduction to Oneistox & PBS BIM Course',
    lessonTitle: firstLesson?.title || 'Welcome to the BIM Professional Cohort',
    duration: firstLesson?.duration || '10 min',
    isDone: false,
    videoUrl: firstLesson?.videoUrl || 'https://drive.google.com/file/d/1BimRevitMEP_ClassroomLecture_2026/preview',
    videoType: firstLesson?.videoType || 'google-drive'
  });

  // Track playback view mode: 'embed' or 'simulation'
  const [playerMode, setPlayerMode] = useState<'embed' | 'simulation'>('embed');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isCompleted, setIsCompleted] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);
  const [simProgress, setSimProgress] = useState(15);
  const [simTimeSeconds, setSimTimeSeconds] = useState(180);

  // Initialize or update lesson when course changes
  useEffect(() => {
    if (currentCourse && currentCourse.modules && currentCourse.modules.length > 0) {
      const mod = currentCourse.modules[0];
      setExpandedModuleId(mod.id);
      if (mod.lessons && mod.lessons.length > 0) {
        const les = mod.lessons[0];
        setCurrentLesson({
          moduleTitle: mod.title,
          lessonTitle: les.title,
          duration: les.duration,
          isDone: !!les.isCompleted,
          videoUrl: les.videoUrl,
          videoType: les.videoType
        });
      }
    }
  }, [initialCourseId]);

  // Simulation timer when playing
  useEffect(() => {
    let timer: any;
    if (isPlaying && playerMode === 'simulation') {
      timer = setInterval(() => {
        setSimProgress(prev => (prev >= 100 ? 0 : prev + 1));
        setSimTimeSeconds(prev => prev + 1);
      }, 1000 / playbackSpeed);
    }
    return () => clearInterval(timer);
  }, [isPlaying, playerMode, playbackSpeed]);

  const toggleLessonComplete = () => {
    soundFx.playSuccess();
    const nextCompleted = !isCompleted;
    setIsCompleted(nextCompleted);
    const activeId = currentLesson.lessonTitle;
    if (nextCompleted) {
      setCompletedLessonIds(prev => prev.includes(activeId) ? prev : [...prev, activeId]);
    } else {
      setCompletedLessonIds(prev => prev.filter(id => id !== activeId));
    }
  };
  const [issueSubmitted, setIssueSubmitted] = useState(false);
  const [issueText, setIssueText] = useState('');

  // Discussion state
  const [forumPosts, setForumPosts] = useState([
    {
      id: 'p1',
      author: 'Pravin Yadav',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      role: 'Student (PBS)',
      time: '1 day ago',
      title: 'Default Project Template (.rte) location in Revit 2026',
      content: 'When starting a new project in metric units, make sure to set the English Metric template folder in Options -> File Locations.',
      likes: 12,
      hasLiked: false,
    },
    {
      id: 'p2',
      author: 'BIM Instructor (Pravin Yadav)',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      role: 'Faculty',
      time: '2 days ago',
      title: 'Pro-tip: Auto-save and Worksharing Sync intervals',
      content: 'Keep auto-reminder to 30 mins to avoid performance lags during heavy 3D rendering or clash runs.',
      likes: 24,
      hasLiked: true,
    }
  ]);
  const [newComment, setNewComment] = useState('');

  const handlePostComment = () => {
    if (!newComment.trim()) return;
    soundFx.playClick();
    setForumPosts([
      {
        id: `p-${Date.now()}`,
        author: 'Pravin Yadav',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        role: 'Student',
        time: 'Just now',
        title: `Question on ${currentLesson.lessonTitle}`,
        content: newComment.trim(),
        likes: 1,
        hasLiked: true,
      },
      ...forumPosts,
    ]);
    setNewComment('');
  };

  const rawVideoUrl = currentLesson.videoUrl || '';
  const formattedEmbedUrl = rawVideoUrl 
    ? pbsAdminStore.formatEmbedVideoUrl(rawVideoUrl)
    : '';

  const isDirectVideo = rawVideoUrl.endsWith('.mp4') || rawVideoUrl.endsWith('.webm') || rawVideoUrl.endsWith('.ogg');

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins}:${rem < 10 ? '0' : ''}${rem}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#121212] text-white flex flex-col overflow-hidden font-sans select-none">
      
      {/* Top Bar */}
      <header className="h-14 bg-[#1e1e1e] border-b border-[#2d2d2d] px-4 sm:px-6 flex items-center justify-between shrink-0">
        {/* Left: Brand / Breadcrumbs */}
        <div className="flex items-center gap-4 min-w-0">
          <div className="flex items-center gap-2 font-bold text-sm sm:text-base tracking-tight shrink-0">
            <span className="text-white font-extrabold">PRAGMATIC</span>
            <span className="text-emerald-400">BIM</span>
          </div>

          <span className="text-slate-500 text-sm hidden sm:inline">/</span>

          {/* Breadcrumb Title */}
          <div className="text-xs sm:text-sm text-slate-300 truncate">
            <span className="text-slate-400 font-medium">{currentCourse?.title || 'BIM & Revit Professional Course'}</span>
            <span className="text-slate-500 mx-2">/</span>
            <span className="text-emerald-400 font-semibold">{currentLesson.lessonTitle}</span>
          </div>
        </div>

        {/* Right Actions: Protection Badge | COURSE CONTENT | DISCUSSION FORUM | Close */}
        <div className="flex items-center gap-3 sm:gap-6">
          
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[10px] font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Protected DRM Stream</span>
          </div>

          <button
            id="classroom-tab-content"
            onClick={() => setActiveTab('content')}
            className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'content' ? 'text-emerald-400' : 'text-slate-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">COURSE CONTENT</span>
          </button>

          <button
            id="classroom-tab-forum"
            onClick={() => setActiveTab('forum')}
            className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'forum' ? 'text-emerald-400' : 'text-slate-400 hover:text-white'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">DISCUSSION FORUM</span>
          </button>

          {/* User Avatar */}
          <div className="w-8 h-8 rounded-full bg-emerald-600 border border-emerald-400/50 flex items-center justify-center text-xs font-bold text-white shrink-0 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" 
              alt="Pravin Yadav" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Exit Classroom Studio */}
          <button
            id="btn-close-classroom"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="Exit Classroom Studio"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Studio Split Body */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* Left Section: Video Player Theater */}
        <div className="flex-1 flex flex-col bg-black justify-between overflow-y-auto">
          
          {/* Player Mode Switcher Toolbar */}
          <div className="bg-[#141414] border-b border-[#252525] px-4 py-2 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Stream Mode:</span>
              <div className="flex items-center bg-[#202020] rounded-xl p-0.5 border border-[#333]">
                <button
                  type="button"
                  onClick={() => {
                    soundFx.playClick();
                    setPlayerMode('embed');
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    playerMode === 'embed'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <MonitorPlay className="w-3.5 h-3.5" />
                  <span>HD Stream Player</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    soundFx.playClick();
                    setPlayerMode('simulation');
                    setIsPlaying(true);
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    playerMode === 'simulation'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Tv className="w-3.5 h-3.5" />
                  <span>Interactive BIM Studio Mode</span>
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {rawVideoUrl && (
                <a
                  href={rawVideoUrl.startsWith('http') ? rawVideoUrl : `https://${rawVideoUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded-lg bg-[#222] hover:bg-[#2c2c2c] text-slate-300 hover:text-white text-[11px] font-semibold border border-[#383838] flex items-center gap-1.5 transition-colors"
                  title="Open video in external player window"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Popout Player</span>
                </a>
              )}
            </div>
          </div>

          {/* Video Player Display Container */}
          <div className="relative flex-1 flex items-center justify-center p-4 sm:p-6 bg-[#0a0a0a] min-h-[380px]">
            <div className="relative w-full max-w-5xl aspect-video bg-[#181818] rounded-2xl overflow-hidden shadow-2xl border border-[#2a2a2a] group flex flex-col justify-between">
              
              {/* Option A: Direct HTML5 Video Player */}
              {isDirectVideo && playerMode === 'embed' ? (
                <div className="w-full h-full relative bg-black flex items-center justify-center">
                  <video
                    src={rawVideoUrl}
                    controls
                    className="w-full h-full object-contain"
                    playsInline
                  />
                  <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10 text-[10px] font-mono text-emerald-400 flex items-center gap-1.5 pointer-events-none">
                    <Lock className="w-3 h-3 text-emerald-400" />
                    <span>Protected Student ID: PBS-STU-2026-8492</span>
                  </div>
                </div>
              ) : formattedEmbedUrl && playerMode === 'embed' ? (
                /* Option B: Embedded Video Frame (YouTube, Google Drive, OneDrive) */
                <div className="w-full h-full relative">
                  <iframe
                    src={formattedEmbedUrl}
                    title={currentLesson.lessonTitle}
                    className="w-full h-full border-0 pointer-events-auto"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                  {/* Anti-Download Protection Overlay & Security Watermark */}
                  <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10 text-[10px] font-mono text-emerald-400 flex items-center gap-1.5 pointer-events-none">
                    <Lock className="w-3 h-3 text-emerald-400" />
                    <span>Protected Student ID: PBS-STU-2026-8492</span>
                  </div>
                </div>
              ) : (
                /* Option C: High-Fidelity Interactive BIM Simulation Studio */
                <div className="absolute inset-0 bg-slate-900 flex flex-col justify-between overflow-hidden select-none">
                  {/* Background Mock Visual (Revit / Navisworks UI Simulation) */}
                  <div className="absolute inset-0 z-0">
                    <img
                      src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80"
                      alt="Revit Autodesk Simulation"
                      className="w-full h-full object-cover opacity-50 group-hover:opacity-65 transition-opacity"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/60" />
                  </div>

                  {/* Simulation Header Overlay */}
                  <div className="relative z-10 p-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-500 text-slate-950 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> Live Studio Simulation
                      </span>
                      <span className="text-xs font-mono text-slate-300 bg-black/60 px-2 py-0.5 rounded border border-white/10">
                        {currentLesson.lessonTitle}
                      </span>
                    </div>

                    <div className="bg-black/70 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10 text-[10px] font-mono text-emerald-400 flex items-center gap-1.5">
                      <Lock className="w-3 h-3 text-emerald-400" />
                      <span>Protected PBS Masterclass</span>
                    </div>
                  </div>

                  {/* Centered Play Button & Voiceover Visualizer */}
                  <div className="relative z-10 flex flex-col items-center justify-center gap-4 px-4 text-center">
                    <button
                      id="btn-theater-play-toggle"
                      onClick={() => {
                        soundFx.playClick();
                        setIsPlaying(!isPlaying);
                      }}
                      className="w-20 h-20 rounded-full bg-emerald-500/90 hover:bg-emerald-400 backdrop-blur-md border-2 border-white/40 text-slate-950 flex items-center justify-center hover:scale-110 transition-transform cursor-pointer shadow-2xl"
                    >
                      {isPlaying ? (
                        <Pause className="w-10 h-10 fill-current" />
                      ) : (
                        <Play className="w-10 h-10 ml-1 fill-current" />
                      )}
                    </button>

                    <div className="max-w-xl">
                      <span className="bg-black/80 backdrop-blur-sm text-slate-200 text-xs sm:text-sm font-medium px-4 py-2 rounded-xl inline-block border border-white/10 shadow-lg">
                        {isPlaying ? (
                          `▶ Step-by-Step BIM Workflow: Demonstration of ${currentLesson.lessonTitle} in progress...`
                        ) : (
                          `Click Play to start Interactive BIM Studio Video Lesson (${currentLesson.duration})`
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Simulation Custom Playback Timeline Bar */}
                  <div className="relative z-10 bg-slate-950/90 backdrop-blur-md p-3 border-t border-white/10 space-y-2">
                    {/* Scrub bar */}
                    <div 
                      className="w-full h-2 bg-slate-800 rounded-full overflow-hidden cursor-pointer relative"
                      onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const pos = (e.clientX - rect.left) / rect.width;
                        setSimProgress(Math.round(pos * 100));
                      }}
                    >
                      <div 
                        className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all"
                        style={{ width: `${simProgress}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-300">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setIsPlaying(!isPlaying)}
                          className="hover:text-emerald-400 cursor-pointer"
                        >
                          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </button>
                        <button
                          type="button"
                          onClick={() => setSimProgress(prev => Math.max(0, prev - 5))}
                          className="hover:text-emerald-400 cursor-pointer"
                          title="Rewind 10s"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setSimProgress(prev => Math.min(100, prev + 5))}
                          className="hover:text-emerald-400 cursor-pointer"
                          title="Forward 10s"
                        >
                          <RotateCw className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-mono text-[11px] text-slate-400">
                          {formatTime(simTimeSeconds)} / {currentLesson.duration}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        {/* Speed Selector */}
                        <div className="flex items-center gap-1 bg-slate-900 px-2 py-0.5 rounded border border-slate-800 text-[10px]">
                          {[0.75, 1, 1.25, 1.5, 2].map((spd) => (
                            <button
                              key={spd}
                              type="button"
                              onClick={() => setPlaybackSpeed(spd)}
                              className={`px-1 py-0.5 rounded ${playbackSpeed === spd ? 'bg-emerald-600 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
                            >
                              {spd}x
                            </button>
                          ))}
                        </div>

                        <button
                          type="button"
                          onClick={() => setIsMuted(!isMuted)}
                          className="hover:text-emerald-400 cursor-pointer"
                        >
                          {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Bottom Bar: Report Issue & Mark Done */}
          <div className="h-16 bg-[#161616] border-t border-[#262626] px-6 flex items-center justify-between shrink-0">
            <button
              id="btn-report-issue"
              onClick={() => setShowIssueModal(true)}
              className="text-xs font-semibold text-slate-400 hover:text-rose-400 flex items-center gap-2 cursor-pointer transition-colors"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>REPORT ISSUE</span>
            </button>

            <div className="flex items-center gap-3">
              <span className="text-[11px] text-slate-400 hidden sm:inline">
                Lesson: <strong className="text-white">{currentLesson.lessonTitle}</strong> ({currentLesson.duration})
              </span>
              
              <button
                id="btn-mark-done"
                onClick={toggleLessonComplete}
                className={`px-6 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer ${
                  isCompleted 
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20' 
                    : 'bg-emerald-500 hover:bg-emerald-600 text-white'
                }`}
              >
                <Check className="w-4 h-4 stroke-[3]" />
                <span>{isCompleted ? 'COMPLETED' : 'MARK DONE'}</span>
              </button>
            </div>
          </div>

        </div>

        {/* Right Section: Course Content Drawer / Forum */}
        <div className="w-full lg:w-96 bg-[#1a1a1a] border-l border-[#2d2d2d] flex flex-col h-full overflow-hidden shrink-0">
          {activeTab === 'content' ? (
            <>
              {/* Content Drawer Header */}
              <div className="p-4 border-b border-[#2d2d2d] space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white">Course Video Lessons</h3>
                    <p className="text-[11px] text-slate-400">{currentCourse?.title || 'PBS BIM Masterclass'}</p>
                  </div>
                  <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded font-mono">
                    {currentCourse?.modules.length || COURSE_MODULES_DATA.length} Modules
                  </span>
                </div>

                {/* Search course content */}
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search video lectures..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#242424] text-white placeholder-slate-500 border border-[#333] rounded-lg focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Accordion Modules List */}
              <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
                {/* 1. Admin Dynamic Course Modules */}
                {currentCourse && currentCourse.modules && currentCourse.modules.length > 0 ? (
                  currentCourse.modules.map((m) => {
                    const isExpanded = expandedModuleId === m.id;
                    const isModDone = m.lessons.length > 0 && m.lessons.every(l => completedLessonIds.includes(l.title) || l.isCompleted);

                    return (
                      <div
                        key={m.id}
                        className="bg-[#222222] border border-[#2e2e2e] rounded-xl overflow-hidden"
                      >
                        <button
                          onClick={() => setExpandedModuleId(isExpanded ? '' : m.id)}
                          className="w-full p-3 flex items-center justify-between text-left hover:bg-[#2a2a2a] transition-colors cursor-pointer"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            {isModDone ? (
                              <div className="w-5 h-5 rounded bg-emerald-600 text-white flex items-center justify-center shrink-0">
                                <Check className="w-3 h-3 stroke-[3]" />
                              </div>
                            ) : (
                              <div className="w-5 h-5 rounded bg-slate-800 text-emerald-400 border border-slate-700 flex items-center justify-center shrink-0">
                                <Play className="w-2.5 h-2.5 fill-current" />
                              </div>
                            )}
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-white">{m.moduleCode}</span>
                                <span className="text-[10px] bg-slate-800 text-emerald-400 px-1.5 py-0.2 rounded font-mono">
                                  {m.duration}
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-300 truncate mt-0.5">{m.title}</p>
                            </div>
                          </div>
                          <div className="text-slate-400 ml-2 shrink-0">
                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </div>
                        </button>

                        {isExpanded && (
                          <div className="px-3 pb-3 pt-1 space-y-1.5 bg-[#1c1c1c] border-t border-[#2a2a2a]">
                            {m.lessons.map((les) => {
                              const isActive = currentLesson.lessonTitle === les.title;
                              const isLesDone = completedLessonIds.includes(les.title) || les.isCompleted || (isActive && isCompleted);
                              return (
                                <button
                                  key={les.id}
                                  onClick={() => {
                                    soundFx.playClick();
                                    setCurrentLesson({
                                      moduleTitle: m.title,
                                      lessonTitle: les.title,
                                      duration: les.duration,
                                      isDone: isLesDone,
                                      videoUrl: les.videoUrl,
                                      videoType: les.videoType
                                    });
                                    setIsCompleted(isLesDone);
                                  }}
                                  className={`w-full text-left p-2.5 rounded-xl flex items-center justify-between gap-2 text-xs transition-colors cursor-pointer ${
                                    isActive
                                      ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-600/50 font-semibold'
                                      : 'text-slate-300 hover:bg-[#282828] hover:text-white'
                                  }`}
                                >
                                  <div className="flex items-center gap-2 min-w-0">
                                    {isLesDone ? (
                                      <Check className="w-3.5 h-3.5 shrink-0 text-emerald-400 stroke-[2.5]" />
                                    ) : (
                                      <Video className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-emerald-400' : 'text-slate-500'}`} />
                                    )}
                                    <span className="truncate">{les.title}</span>
                                  </div>
                                  <span className="text-[10px] font-mono text-emerald-400 shrink-0">
                                    {les.duration}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })
                ) : (
                  /* 2. Default Standard Curriculum */
                  COURSE_MODULES_DATA.map((module) => {
                    const isExpanded = expandedModuleId === module.id;
                    const allLessons = module.subSections.flatMap(s => s.lessons);
                    const isModDone = module.isCompleted || (allLessons.length > 0 && allLessons.every(l => completedLessonIds.includes(l.title) || l.isCompleted));

                    return (
                      <div
                        key={module.id}
                        className="bg-[#222222] border border-[#2e2e2e] rounded-xl overflow-hidden"
                      >
                        <button
                          onClick={() => setExpandedModuleId(isExpanded ? '' : module.id)}
                          className="w-full p-3 flex items-center justify-between text-left hover:bg-[#2a2a2a] transition-colors cursor-pointer"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            {isModDone ? (
                              <div className="w-5 h-5 rounded bg-emerald-600 text-white flex items-center justify-center shrink-0">
                                <Check className="w-3 h-3 stroke-[3]" />
                              </div>
                            ) : (
                              <div className="w-5 h-5 rounded bg-slate-800 text-emerald-400 border border-slate-700 flex items-center justify-center shrink-0 font-bold text-[10px]">
                                <Play className="w-2.5 h-2.5 fill-current" />
                              </div>
                            )}

                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-white">
                                  {module.moduleCode}
                                </span>
                                <span className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.2 rounded border border-slate-700">
                                  {isModDone ? 'Completed' : 'In Progress'}
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-400 truncate mt-0.5">
                                {module.title}
                              </p>
                            </div>
                          </div>

                          <div className="text-slate-400 ml-2 shrink-0">
                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </div>
                        </button>

                        {isExpanded && (
                          <div className="px-3 pb-3 pt-1 space-y-3 bg-[#1c1c1c] border-t border-[#2a2a2a]">
                            {module.subSections.map((sec, sIdx) => (
                              <div key={sIdx} className="space-y-1.5 pt-1">
                                <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2">
                                  <span>{sec.sectionTitle}</span>
                                  {sec.duration && <span className="text-slate-500 font-normal">{sec.duration}</span>}
                                </div>

                                <div className="space-y-1">
                                  {sec.lessons.map((lesson) => {
                                    const isActiveLesson = currentLesson.lessonTitle === lesson.title;
                                    const isLesDone = completedLessonIds.includes(lesson.title) || lesson.isCompleted || (isActiveLesson && isCompleted);

                                    return (
                                      <button
                                        key={lesson.id}
                                        onClick={() => {
                                          soundFx.playClick();
                                          setCurrentLesson({
                                            moduleTitle: module.title,
                                            lessonTitle: lesson.title,
                                            duration: lesson.duration,
                                            isDone: isLesDone,
                                            videoUrl: 'https://drive.google.com/file/d/1BimRevitMEP_ClassroomLecture_2026/preview'
                                          });
                                          setIsCompleted(isLesDone);
                                        }}
                                        className={`w-full text-left p-2 rounded-lg flex items-center justify-between gap-2 text-xs transition-colors cursor-pointer ${
                                          isActiveLesson
                                            ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-600/50 font-semibold'
                                            : 'text-slate-300 hover:bg-[#282828] hover:text-white'
                                        }`}
                                      >
                                        <div className="flex items-center gap-2 min-w-0">
                                          {isLesDone ? (
                                            <Check className="w-3.5 h-3.5 shrink-0 text-emerald-400 stroke-[2.5]" />
                                          ) : (
                                            <Play className={`w-3.5 h-3.5 shrink-0 ${isActiveLesson ? 'text-emerald-400 fill-current' : 'text-slate-500'}`} />
                                          )}
                                          <span className="truncate">{lesson.title}</span>
                                        </div>
                                        <span className="text-[10px] text-slate-500 shrink-0 font-mono">
                                          {lesson.duration}
                                        </span>
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </>
          ) : (
            /* Discussion Forum Tab */
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="p-4 border-b border-[#2d2d2d] flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">Lesson Discussion</h3>
                  <p className="text-[11px] text-slate-400">Ask doubts, share BIM shortcuts & tips</p>
                </div>
                <span className="text-xs bg-[#242424] text-emerald-400 px-2 py-0.5 rounded font-bold">
                  {forumPosts.length} Threads
                </span>
              </div>

              {/* Forum Messages Feed */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {forumPosts.map((post) => (
                  <div key={post.id} className="bg-[#242424] p-3.5 rounded-xl border border-[#333] space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img src={post.avatar} alt={post.author} className="w-6 h-6 rounded-full object-cover" />
                        <div>
                          <div className="text-xs font-bold text-white flex items-center gap-1.5">
                            <span>{post.author}</span>
                            <span className="text-[9px] bg-emerald-950 text-emerald-300 px-1 py-0.2 rounded border border-emerald-800">
                              {post.role}
                            </span>
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-500">{post.time}</span>
                    </div>

                    <h4 className="text-xs font-semibold text-emerald-300">{post.title}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">{post.content}</p>

                    <div className="pt-2 border-t border-[#333] flex items-center justify-between text-[11px] text-slate-400">
                      <button
                        type="button"
                        onClick={() => {
                          soundFx.playClick();
                          setForumPosts(forumPosts.map(p => {
                            if (p.id === post.id) {
                              return {
                                ...p,
                                likes: p.hasLiked ? p.likes - 1 : p.likes + 1,
                                hasLiked: !p.hasLiked
                              };
                            }
                            return p;
                          }));
                        }}
                        className={`flex items-center gap-1 hover:text-emerald-400 cursor-pointer ${post.hasLiked ? 'text-emerald-400 font-bold' : ''}`}
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span>{post.likes} Helpful</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Forum Input Box */}
              <div className="p-3 bg-[#202020] border-t border-[#2d2d2d]">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Write a doubt or contribution..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handlePostComment()}
                    className="flex-1 px-3 py-2 text-xs bg-[#181818] text-white placeholder-slate-500 border border-[#333] rounded-xl focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    type="button"
                    onClick={handlePostComment}
                    className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Report Issue Modal */}
      {showIssueModal && (
        <div className="fixed inset-0 z-60 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#1e1e1e] border border-[#333] rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <span>Report Video or Curriculum Issue</span>
              </h3>
              <button
                onClick={() => {
                  setShowIssueModal(false);
                  setIssueSubmitted(false);
                }}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {issueSubmitted ? (
              <div className="p-4 bg-emerald-950/60 border border-emerald-700/50 rounded-xl text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <h4 className="text-xs font-bold text-emerald-300">Ticket Dispatched to Admin</h4>
                <p className="text-[11px] text-slate-300">
                  Pravin Yadav and the PBS Academic team have received your report and will resolve it promptly.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">
                  Lesson: <strong className="text-white">{currentLesson.lessonTitle}</strong>
                </p>
                <textarea
                  rows={4}
                  value={issueText}
                  onChange={(e) => setIssueText(e.target.value)}
                  placeholder="Describe the issue (e.g. video playback error, missing dataset link, audio glitch, question timestamp)..."
                  className="w-full p-3 bg-[#141414] border border-[#333] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowIssueModal(false)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (!issueText.trim()) return;
                      soundFx.playSuccess();
                      setIssueSubmitted(true);
                    }}
                    className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl"
                  >
                    Submit Report
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
