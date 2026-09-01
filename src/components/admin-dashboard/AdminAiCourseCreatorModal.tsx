import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Bot, 
  Send, 
  Layers, 
  Plus, 
  Trash2, 
  Video, 
  Link as LinkIcon, 
  FolderOpen, 
  CheckCircle2, 
  Rocket, 
  BookOpen, 
  DollarSign, 
  User, 
  Calendar, 
  Clock, 
  Upload, 
  FileText, 
  Play, 
  Info,
  ChevronDown,
  ChevronUp,
  Cpu
} from 'lucide-react';
import { AdminCourse, AdminCourseModule, AdminVideoLesson, pbsAdminStore } from '../../utils/pbsAdminStore';

interface AdminAiCourseCreatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCourseCreated: (newCourse: AdminCourse) => void;
}

interface ChatMessage {
  id: string;
  sender: 'ai' | 'admin';
  text: string;
  timestamp: string;
  generatedCoursePreview?: Partial<AdminCourse>;
}

export const AdminAiCourseCreatorModal: React.FC<AdminAiCourseCreatorModalProps> = ({
  isOpen,
  onClose,
  onCourseCreated
}) => {
  if (!isOpen) return null;

  const [activeMode, setActiveMode] = useState<'ai-chat' | 'manual-studio'>('ai-chat');

  // Course Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'Revit' | 'Navisworks' | 'Dynamo' | 'ISO 19650' | 'Civil 3D' | 'BIM Management'>('Revit');
  const [level, setLevel] = useState<'Foundational' | 'Professional' | 'Advanced Masterclass' | 'Executive'>('Advanced Masterclass');
  const [badge, setBadge] = useState('New 2026 Cohort Track');
  const [batchSchedule, setBatchSchedule] = useState('Saturdays & Sundays (06:00 PM - 09:30 PM IST)');
  const [batchMode, setBatchMode] = useState<'Online Interactive Live' | 'Offline Weekend (Sat-Sun)' | 'Hybrid Cohort'>('Offline Weekend (Sat-Sun)');
  const [instructor, setInstructor] = useState('Pravin Yadav (BIM Director)');
  const [totalFee, setTotalFee] = useState<number>(14999);
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState('https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=80');
  const [accentColor, setAccentColor] = useState('#10b981');
  const [microsoftDriveUrl, setMicrosoftDriveUrl] = useState('');
  const [googleDriveUrl, setGoogleDriveUrl] = useState('');
  const [rawVideoLinks, setRawVideoLinks] = useState('');

  // 10 Modules List
  const [modules, setModules] = useState<AdminCourseModule[]>([]);
  const [expandedModuleId, setExpandedModuleId] = useState<string | null>(null);

  // AI Chat Assistant State
  const [chatPrompt, setChatPrompt] = useState('');
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'ai',
      text: "👋 Hello Admin! I am your AI BIM Course Architect. You can drop YouTube video links, OneDrive/SharePoint links, or describe any BIM curriculum. I will automatically parse the video links, structure a full 10-module syllabus with lesson titles, durations, and BIM dataset resource tags.",
      timestamp: 'Just now'
    }
  ]);

  // Handle AI Course Generation from prompt / pasted video links
  const handleSendAiPrompt = () => {
    if (!chatPrompt.trim()) return;

    const userText = chatPrompt.trim();
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'admin',
      text: userText,
      timestamp: 'Just now'
    };

    setChatMessages(prev => [...prev, newMsg]);
    setChatPrompt('');
    setIsAiThinking(true);

    setTimeout(() => {
      // Extract links from prompt
      const linkRegex = /(https?:\/\/[^\s]+)/g;
      const foundLinks = userText.match(linkRegex) || [];

      // Auto-detect course title
      let generatedTitle = 'Advanced BIM & Digital Engineering Masterclass';
      if (userText.toLowerCase().includes('revit') && userText.toLowerCase().includes('mep')) {
        generatedTitle = 'Autodesk Revit MEP Comprehensive Masterclass (LOD 300 - 500)';
      } else if (userText.toLowerCase().includes('dynamo')) {
        generatedTitle = 'Computational BIM with Dynamo & Python Scripting';
      } else if (userText.toLowerCase().includes('navisworks')) {
        generatedTitle = 'Navisworks Manage Clash Detection & 4D TimeLiner';
      } else if (userText.toLowerCase().includes('iso 19650')) {
        generatedTitle = 'ISO 19650 Global BIM Project Delivery & BEP Framework';
      } else if (userText.toLowerCase().includes('architecture') || userText.toLowerCase().includes('structure')) {
        generatedTitle = 'Autodesk Revit Architecture & Structural Modeling Masterclass';
      } else if (foundLinks.length > 0) {
        generatedTitle = `BIM Professional Masterclass (10 Modules)`;
      }

      // Generate 10 Modules
      const generatedModules = pbsAdminStore.generate10ModuleCurriculum(
        generatedTitle,
        category,
        foundLinks,
        microsoftDriveUrl || 'https://onedrive.live.com/?id=PBS_Central_Datasets'
      );

      // Populate Form State
      setTitle(generatedTitle);
      setDescription(`Master standard industrial workflows for ${generatedTitle} divided across 10 specialized modules with high-definition video lessons, Revit families (.rfa), and ISO 19650 templates.`);
      setModules(generatedModules);
      if (generatedModules.length > 0) {
        setExpandedModuleId(generatedModules[0].id);
      }

      const aiResponse: ChatMessage = {
        id: `msg-ai-${Date.now()}`,
        sender: 'ai',
        text: `✨ I have analyzed your input and constructed a complete 10-Module curriculum for "${generatedTitle}". Found ${foundLinks.length} video source links (YouTube/OneDrive/Drive) and mapped them into 30 structured lessons with downloadable BIM datasets. You can review the breakdown below and click 'Publish & Launch Course' to immediately make it live for students!`,
        timestamp: 'Just now',
        generatedCoursePreview: {
          title: generatedTitle,
          category,
          totalFee,
          modules: generatedModules
        }
      };

      setChatMessages(prev => [...prev, aiResponse]);
      setIsAiThinking(false);
    }, 900);
  };

  // Helper to auto-generate 10 modules from manual input
  const handleAutoGenerate10Modules = () => {
    const lines = rawVideoLinks
      .split('\n')
      .map(l => l.trim())
      .filter(l => l.startsWith('http'));

    const gen = pbsAdminStore.generate10ModuleCurriculum(
      title || 'BIM Professional Masterclass',
      category,
      lines,
      microsoftDriveUrl
    );
    setModules(gen);
    if (gen.length > 0) {
      setExpandedModuleId(gen[0].id);
    }
  };

  const handlePublishCourse = () => {
    if (!title.trim()) {
      alert('Please enter a course title.');
      return;
    }

    let finalModules = modules;
    if (finalModules.length === 0) {
      finalModules = pbsAdminStore.generate10ModuleCurriculum(title, category, [], microsoftDriveUrl);
    }

    const created = pbsAdminStore.addCourse({
      title: title.trim(),
      category,
      level,
      badge: badge || 'New Course Launch',
      batchSchedule,
      batchMode,
      instructor: instructor || 'Pravin Yadav (BIM Director)',
      totalFee: Number(totalFee) || 14999,
      description: description || `Comprehensive 10-module masterclass on ${title}.`,
      thumbnail,
      accentColor,
      assignedTo: 'all',
      isPublished: true,
      microsoftDriveUrl: microsoftDriveUrl || undefined,
      googleDriveUrl: googleDriveUrl || undefined,
      modules: finalModules
    });

    onCourseCreated(created);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6 flex flex-col max-h-[92vh]">
        
        {/* Top Header */}
        <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-950 px-6 py-5 text-white flex items-center justify-between border-b border-indigo-900/40 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-indigo-500/20 border border-indigo-400/40 flex items-center justify-center text-indigo-300">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-indigo-500 text-white">
                  Admin AI Course Architect
                </span>
                <span className="text-xs text-indigo-300 font-mono">10-Module Builder</span>
              </div>
              <h2 className="text-lg font-black text-white mt-0.5">
                AI Course Studio & Video Link Dispatcher
              </h2>
            </div>
          </div>

          {/* Mode Switcher & Close Button */}
          <div className="flex items-center gap-3">
            <div className="flex items-center p-1 bg-white/10 rounded-xl border border-white/10 text-xs font-bold">
              <button
                type="button"
                onClick={() => setActiveMode('ai-chat')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeMode === 'ai-chat'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Bot className="w-3.5 h-3.5" />
                <span>AI Chatbot Architect</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveMode('manual-studio')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeMode === 'manual-studio'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Curriculum Studio ({modules.length} Modules)</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeMode === 'ai-chat' ? (
            /* AI CHATBOT MODE */
            <div className="space-y-6">
              
              {/* Quick Prompt Suggestions */}
              <div className="bg-indigo-50/70 border border-indigo-100 rounded-2xl p-4">
                <div className="text-xs font-bold text-indigo-900 flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  <span>Try Quick AI Course Creation Prompts:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setChatPrompt("Create a 10-Module Autodesk Revit MEP Masterclass (LOD 300 to 500) with YouTube video links: https://youtube.com/watch?v=dQw4w9WgXcQ, https://youtu.be/sample2, and Microsoft OneDrive Central Dataset folder https://onedrive.live.com/pbs_data")}
                    className="text-[11px] bg-white hover:bg-indigo-100 text-indigo-800 font-semibold px-3 py-1.5 rounded-xl border border-indigo-200 transition-colors text-left"
                  >
                    🚀 Revit MEP Masterclass (10 Modules + YT Links)
                  </button>

                  <button
                    type="button"
                    onClick={() => setChatPrompt("Generate a 10-Module Computational BIM course with Dynamo & Python visual scripting, parametric families, and Microsoft OneDrive scripts folder.")}
                    className="text-[11px] bg-white hover:bg-indigo-100 text-indigo-800 font-semibold px-3 py-1.5 rounded-xl border border-indigo-200 transition-colors text-left"
                  >
                    ⚡ Dynamo & Python Automation (10 Modules)
                  </button>

                  <button
                    type="button"
                    onClick={() => setChatPrompt("Create an Executive ISO 19650 Global BIM Project Delivery Course with BEP templates, CDE workflows, and Navisworks 4D TimeLiner.")}
                    className="text-[11px] bg-white hover:bg-indigo-100 text-indigo-800 font-semibold px-3 py-1.5 rounded-xl border border-indigo-200 transition-colors text-left"
                  >
                    🌐 ISO 19650 BIM Information Management
                  </button>
                </div>
              </div>

              {/* Chat Dialogue Stream */}
              <div className="space-y-4 min-h-[220px]">
                {chatMessages.map(msg => (
                  <div
                    key={msg.id}
                    className={`flex gap-3 ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.sender === 'ai' && (
                      <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
                        <Bot className="w-4 h-4" />
                      </div>
                    )}

                    <div
                      className={`max-w-2xl rounded-2xl p-4 text-xs leading-relaxed ${
                        msg.sender === 'admin'
                          ? 'bg-slate-900 text-white rounded-br-none'
                          : 'bg-slate-100 text-slate-800 border border-slate-200 rounded-bl-none'
                      }`}
                    >
                      <p>{msg.text}</p>

                      {/* Course Preview Pill inside AI message */}
                      {msg.generatedCoursePreview && (
                        <div className="mt-3 p-3 bg-white rounded-xl border border-indigo-200 text-slate-900 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-extrabold text-sm text-indigo-900">
                              {msg.generatedCoursePreview.title}
                            </span>
                            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full">
                              10 Modules Built
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-600">
                            Fee: <strong>₹{msg.generatedCoursePreview.totalFee?.toLocaleString('en-IN')}</strong> • Category: <strong>{msg.generatedCoursePreview.category}</strong>
                          </div>
                          <div className="flex items-center gap-2 pt-1">
                            <button
                              type="button"
                              onClick={() => setActiveMode('manual-studio')}
                              className="px-3 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold rounded-lg text-[11px] transition-colors"
                            >
                              Inspect & Edit 10 Modules ➔
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {isAiThinking && (
                  <div className="flex items-center gap-3 text-xs text-indigo-600 font-semibold p-3 bg-indigo-50/50 rounded-2xl animate-pulse">
                    <Bot className="w-4 h-4 animate-spin" />
                    <span>AI BIM Architect is organizing 10 modular lectures, video embeds & datasets...</span>
                  </div>
                )}
              </div>

              {/* Chat Input Bar */}
              <div className="flex items-center gap-2 p-2 bg-slate-50 border border-slate-300 rounded-2xl shadow-inner">
                <input
                  type="text"
                  value={chatPrompt}
                  onChange={(e) => setChatPrompt(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendAiPrompt()}
                  placeholder="Drop video links, syllabus details, or describe your BIM course idea here..."
                  className="flex-1 px-3 py-2 text-xs bg-transparent border-0 focus:outline-none text-slate-900"
                />
                <button
                  type="button"
                  onClick={handleSendAiPrompt}
                  disabled={!chatPrompt.trim() || isAiThinking}
                  className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md transition-all cursor-pointer disabled:opacity-40"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Generate Course</span>
                </button>
              </div>
            </div>
          ) : (
            /* MANUAL / ADVANCED CURRICULUM STUDIO */
            <div className="space-y-6">
              
              {/* Course Meta Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">Course Title *</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Autodesk Revit MEP Masterclass (LOD 300 to 500)"
                    className="w-full px-3 py-2 text-xs font-bold border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    <option value="Revit">Revit MEP / Architecture</option>
                    <option value="Navisworks">Navisworks Coordination</option>
                    <option value="Dynamo">Computational BIM & Dynamo</option>
                    <option value="ISO 19650">ISO 19650 Framework</option>
                    <option value="Civil 3D">Civil 3D Infrastructure</option>
                    <option value="BIM Management">BIM Management & VDC</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">Total Fee (₹ INR) *</label>
                  <input
                    type="number"
                    value={totalFee}
                    onChange={(e) => setTotalFee(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs font-bold border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">Level</label>
                  <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    <option value="Foundational">Foundational</option>
                    <option value="Professional">Professional</option>
                    <option value="Advanced Masterclass">Advanced Masterclass</option>
                    <option value="Executive">Executive</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">Instructor</label>
                  <input
                    type="text"
                    value={instructor}
                    onChange={(e) => setInstructor(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">Batch Mode</label>
                  <select
                    value={batchMode}
                    onChange={(e) => setBatchMode(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    <option value="Offline Weekend (Sat-Sun)">Offline Weekend (Sat-Sun)</option>
                    <option value="Online Interactive Live">Online Interactive Live</option>
                    <option value="Hybrid Cohort">Hybrid Cohort</option>
                  </select>
                </div>
              </div>

              {/* Cloud Drive & Video Links Ingestion */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FolderOpen className="w-4 h-4 text-indigo-600" />
                    <span className="text-xs font-bold text-slate-800">
                      Cloud Dataset Folders & Video Links Ingestion
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleAutoGenerate10Modules}
                    className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-[11px] font-bold flex items-center gap-1 shadow-sm transition-colors cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Auto-Split into 10 Modules</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-slate-600 font-semibold mb-1">
                      Microsoft OneDrive / SharePoint Central Dataset Folder URL
                    </label>
                    <input
                      type="url"
                      value={microsoftDriveUrl}
                      onChange={(e) => setMicrosoftDriveUrl(e.target.value)}
                      placeholder="https://onedrive.live.com/?authkey=..."
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-600 font-semibold mb-1">
                      Google Drive Folder / Backup Resource URL
                    </label>
                    <input
                      type="url"
                      value={googleDriveUrl}
                      onChange={(e) => setGoogleDriveUrl(e.target.value)}
                      placeholder="https://drive.google.com/drive/folders/..."
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-slate-600 font-semibold mb-1">
                    Paste Video Links (YouTube / OneDrive Embed / Google Drive / MP4) - 1 per line:
                  </label>
                  <textarea
                    rows={3}
                    value={rawVideoLinks}
                    onChange={(e) => setRawVideoLinks(e.target.value)}
                    placeholder="https://youtu.be/xxx&#10;https://onedrive.live.com/embed?...&#10;https://drive.google.com/file/d/.../view"
                    className="w-full px-3 py-2 text-xs font-mono border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* 10 Modular Curriculum Breakdown Accordion */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-700">
                    Course Curriculum ({modules.length} Modules)
                  </span>
                  <span className="text-[11px] text-indigo-600 font-semibold">
                    Each module contains structured video lessons and attached BIM datasets
                  </span>
                </div>

                <div className="space-y-2">
                  {modules.map((mod, idx) => {
                    const isExpanded = expandedModuleId === mod.id;
                    return (
                      <div
                        key={mod.id}
                        className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-xs"
                      >
                        <button
                          type="button"
                          onClick={() => setExpandedModuleId(isExpanded ? null : mod.id)}
                          className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100/80 flex items-center justify-between text-left transition-colors cursor-pointer"
                        >
                          <div className="flex items-center gap-3">
                            <span className="px-2 py-0.5 bg-slate-900 text-white rounded-md text-[10px] font-mono font-bold">
                              {mod.moduleCode}
                            </span>
                            <span className="text-xs font-bold text-slate-900">{mod.title}</span>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="text-[11px] text-slate-500 font-medium">
                              {mod.lessons?.length || 0} Lessons • {mod.duration}
                            </span>
                            {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                          </div>
                        </button>

                        {isExpanded && (
                          <div className="p-4 space-y-3 bg-white border-t border-slate-100">
                            {mod.lessons.map((les, lIdx) => (
                              <div
                                key={les.id}
                                className="p-3 rounded-xl bg-slate-50/70 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2"
                              >
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-700">
                                      {les.videoType}
                                    </span>
                                    <span className="text-xs font-bold text-slate-800">{les.title}</span>
                                    <span className="text-[10px] text-slate-400">({les.duration})</span>
                                  </div>
                                  <div className="text-[11px] text-slate-500 font-mono truncate max-w-lg">
                                    {les.videoUrl ? '🔒 Protected Stream Ready' : 'Auto-embedded via PBS Stream'}
                                  </div>
                                </div>

                                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-200">
                                  BIM Dataset Linked
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between shrink-0">
          <div className="text-xs text-slate-500">
            {modules.length > 0 ? (
              <span>Curriculum ready: <strong className="text-slate-900">{modules.length} Modules</strong> ({modules.reduce((acc, m) => acc + (m.lessons?.length || 0), 0)} Lessons)</span>
            ) : (
              <span>Click "Auto-Split into 10 Modules" or type in AI Chat to build curriculum.</span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handlePublishCourse}
              className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl text-xs font-extrabold flex items-center gap-2 shadow-lg transition-all cursor-pointer"
            >
              <Rocket className="w-4 h-4 text-amber-300" />
              <span>Publish & Launch Course to Students</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
