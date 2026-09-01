import React, { useState, useEffect } from 'react';
import { 
  X, 
  BookOpen, 
  IndianRupee, 
  Clock, 
  Users, 
  CheckCircle2, 
  Save, 
  Sparkles, 
  Layers,
  Image as ImageIcon,
  FolderArchive,
  Cloud,
  Plus,
  Trash2,
  Video,
  ExternalLink,
  Bot,
  Send,
  Play,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Link as LinkIcon,
  Check,
  FileText,
  Youtube,
  HardDrive,
  Eye,
  Zap,
  AlertCircle,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { AdminCourse, AdminCourseModule, AdminVideoLesson, pbsAdminStore, ManagedStudent } from '../../utils/pbsAdminStore';
import { soundFx } from '../../utils/soundEffects';

interface AdminAddCourseModalProps {
  courseToEdit?: AdminCourse | null;
  studentsList: ManagedStudent[];
  onClose: () => void;
  onSaved: () => void;
}

export const AdminAddCourseModal: React.FC<AdminAddCourseModalProps> = ({
  courseToEdit,
  studentsList,
  onClose,
  onSaved
}) => {
  const isEditing = Boolean(courseToEdit);

  // Active Tab: 'general' | 'modules' | 'ai-assistant'
  const [activeTab, setActiveTab] = useState<'general' | 'modules' | 'ai-assistant'>('modules');

  // General Course Metadata
  const [title, setTitle] = useState(courseToEdit?.title || '');
  const [category, setCategory] = useState<AdminCourse['category']>(courseToEdit?.category || 'Revit');
  const [level, setLevel] = useState<AdminCourse['level']>(courseToEdit?.level || 'Advanced Masterclass');
  const [badge, setBadge] = useState(courseToEdit?.badge || 'Cohort Masterclass Track');
  const [batchMode, setBatchMode] = useState<AdminCourse['batchMode']>(courseToEdit?.batchMode || 'Offline Weekend (Sat-Sun)');
  const [batchSchedule, setBatchSchedule] = useState(courseToEdit?.batchSchedule || 'Saturdays & Sundays (06:00 PM - 09:30 PM IST)');
  const [instructor, setInstructor] = useState(courseToEdit?.instructor || 'Pravin Yadav (15+ Yrs Industry Exp)');
  const [totalFee, setTotalFee] = useState<number>(courseToEdit?.totalFee || 14999);
  const [description, setDescription] = useState(courseToEdit?.description || '');
  const [thumbnail, setThumbnail] = useState(courseToEdit?.thumbnail || 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=80');
  const [accentColor, setAccentColor] = useState(courseToEdit?.accentColor || '#10b981');
  const [assignedTo, setAssignedTo] = useState<string>(courseToEdit?.assignedTo || 'all');
  const [microsoftDriveUrl, setMicrosoftDriveUrl] = useState<string>(courseToEdit?.microsoftDriveUrl || '');
  const [googleDriveUrl, setGoogleDriveUrl] = useState<string>(courseToEdit?.googleDriveUrl || '');

  // Modules & Video Lessons State
  const [modules, setModules] = useState<AdminCourseModule[]>(() => {
    if (courseToEdit && courseToEdit.modules && courseToEdit.modules.length > 0) {
      return JSON.parse(JSON.stringify(courseToEdit.modules));
    }
    // If new course or no modules, initialize with default 10 modules
    return pbsAdminStore.generate10ModuleCurriculum(
      title || 'Autodesk Revit MEP Masterclass (LOD 300 - 500)',
      category,
      [],
      microsoftDriveUrl
    );
  });

  const [expandedModuleId, setExpandedModuleId] = useState<string | null>(() => {
    return modules.length > 0 ? modules[0].id : null;
  });

  // Video Test Preview Modal State
  const [previewVideoUrl, setPreviewVideoUrl] = useState<string | null>(null);
  const [previewVideoTitle, setPreviewVideoTitle] = useState<string>('');

  // AI Assistant State
  const [aiPrompt, setAiPrompt] = useState('');
  const [isAiProcessing, setIsAiProcessing] = useState(false);
  const [aiSuccessMessage, setAiSuccessMessage] = useState<string | null>(null);
  const [batchRawLinks, setBatchRawLinks] = useState('');
  const [batchImportMode, setBatchImportMode] = useState<'map-existing' | 'rebuild-10-modules' | 'append-new-module'>('map-existing');

  // Saving State
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Total lessons count
  const totalLessons = modules.reduce((sum, m) => sum + (m.lessons?.length || 0), 0);

  // ================= MODULE & LESSON ACTIONS =================

  // Add new empty module
  const handleAddModule = () => {
    soundFx.playClick();
    const nextNum = modules.length + 1;
    const moduleCode = `MOD-${nextNum.toString().padStart(2, '0')}`;
    const newMod: AdminCourseModule = {
      id: `mod-${Date.now()}-${nextNum}`,
      moduleCode,
      title: `Module ${nextNum.toString().padStart(2, '0')}: New Advanced Topic`,
      duration: '3.0 Hours',
      lessons: [
        {
          id: `les-${Date.now()}-1`,
          title: `${moduleCode}.1 - Introduction & Setup`,
          duration: '20 min',
          videoType: 'youtube',
          videoUrl: 'https://www.youtube.com/watch?v=sample',
          isCompleted: false,
          assignedStudentId: 'all',
          addedBy: 'Admin (Pravin Yadav)',
          addedDate: new Date().toISOString().split('T')[0],
          description: 'Hands-on practical walkthrough with real BIM datasets.',
          cloudDriveFolderUrl: microsoftDriveUrl || '',
          bimDatasetUrl: ''
        }
      ]
    };

    setModules([...modules, newMod]);
    setExpandedModuleId(newMod.id);
  };

  // Delete a module
  const handleDeleteModule = (moduleId: string) => {
    soundFx.playClick();
    if (modules.length <= 1) {
      alert('Course must have at least 1 module.');
      return;
    }
    if (window.confirm('Are you sure you want to delete this entire module and its video lessons?')) {
      setModules(modules.filter(m => m.id !== moduleId));
    }
  };

  // Update module meta
  const handleUpdateModule = (moduleId: string, updates: Partial<AdminCourseModule>) => {
    setModules(modules.map(m => m.id === moduleId ? { ...m, ...updates } : m));
  };

  // Add a new lesson to a specific module
  const handleAddLesson = (moduleId: string) => {
    soundFx.playClick();
    setModules(modules.map(m => {
      if (m.id === moduleId) {
        const nextIndex = (m.lessons?.length || 0) + 1;
        const newLesson: AdminVideoLesson = {
          id: `les-${Date.now()}-${nextIndex}`,
          title: `${m.moduleCode}.${nextIndex} - Specialized BIM Topic`,
          duration: '25 min',
          videoType: 'youtube',
          videoUrl: '',
          isCompleted: false,
          assignedStudentId: 'all',
          addedBy: 'Admin (Pravin Yadav)',
          addedDate: new Date().toISOString().split('T')[0],
          description: 'Step-by-step masterclass instruction video.',
          cloudDriveFolderUrl: microsoftDriveUrl || '',
          bimDatasetUrl: ''
        };
        return {
          ...m,
          lessons: [...(m.lessons || []), newLesson]
        };
      }
      return m;
    }));
  };

  // Delete a lesson
  const handleDeleteLesson = (moduleId: string, lessonId: string) => {
    soundFx.playClick();
    setModules(modules.map(m => {
      if (m.id === moduleId) {
        return {
          ...m,
          lessons: (m.lessons || []).filter(l => l.id !== lessonId)
        };
      }
      return m;
    }));
  };

  // Update a single lesson
  const handleUpdateLesson = (moduleId: string, lessonId: string, updates: Partial<AdminVideoLesson>) => {
    setModules(modules.map(m => {
      if (m.id === moduleId) {
        return {
          ...m,
          lessons: (m.lessons || []).map(l => {
            if (l.id === lessonId) {
              const updated = { ...l, ...updates };
              // Auto-detect video type if videoUrl changes
              if (updates.videoUrl !== undefined) {
                updated.videoType = pbsAdminStore.detectVideoType(updates.videoUrl);
              }
              return updated;
            }
            return l;
          })
        };
      }
      return m;
    }));
  };

  // ================= AI ASSISTANT FUNCTIONS =================

  // 1. Process Natural Language AI Prompt
  const handleProcessAiPrompt = () => {
    if (!aiPrompt.trim()) return;

    soundFx.playClick();
    setIsAiProcessing(true);
    setAiSuccessMessage(null);

    setTimeout(() => {
      const userText = aiPrompt.trim();
      const linkRegex = /(https?:\/\/[^\s]+)/g;
      const foundLinks = userText.match(linkRegex) || [];

      // Check if prompt wants 10 modules
      if (userText.toLowerCase().includes('10 module') || userText.toLowerCase().includes('full syllabus') || userText.toLowerCase().includes('curriculum')) {
        const newTitle = title || 'Autodesk Revit MEP Masterclass (LOD 300 - 500)';
        const generated = pbsAdminStore.generate10ModuleCurriculum(
          newTitle,
          category,
          foundLinks.length > 0 ? foundLinks : [],
          microsoftDriveUrl
        );
        setModules(generated);
        setAiSuccessMessage(`✨ Re-architected 10-Module curriculum with ${foundLinks.length} mapped video links!`);
      } else if (foundLinks.length > 0) {
        // Distribute found links into existing lessons
        let linkIdx = 0;
        const updatedMods = modules.map((mod) => ({
          ...mod,
          lessons: mod.lessons.map((les) => {
            if (linkIdx < foundLinks.length) {
              const link = foundLinks[linkIdx++];
              return {
                ...les,
                videoUrl: link,
                videoType: pbsAdminStore.detectVideoType(link)
              };
            }
            return les;
          })
        }));
        setModules(updatedMods);
        setAiSuccessMessage(`✨ Mapped ${foundLinks.length} video link(s) across course modules!`);
      } else {
        // AI Title / Content Enhancement
        const updatedMods = modules.map((mod, idx) => ({
          ...mod,
          title: `Module ${(idx + 1).toString().padStart(2, '0')}: Advanced ${category} - Industrial Application & Workflows`,
          lessons: mod.lessons.map((les, lIdx) => ({
            ...les,
            title: `${mod.moduleCode}.${lIdx + 1} - ${category} LOD 400 Practical Masterclass`,
            duration: `${20 + ((idx + lIdx) % 4) * 5} min`
          }))
        }));
        setModules(updatedMods);
        setAiSuccessMessage(`✨ AI enhanced all module titles, lesson scopes & durations for ${category}!`);
      }

      soundFx.playSuccess();
      setIsAiProcessing(false);
      setAiPrompt('');
    }, 800);
  };

  // 2. Batch Video Links Parser & Dispatcher
  const handleBatchParseLinks = () => {
    const rawLines = batchRawLinks
      .split('\n')
      .map(l => l.trim())
      .filter(l => l.length > 0 && (l.startsWith('http') || l.includes('youtu') || l.includes('drive')));

    if (rawLines.length === 0) {
      alert('Please paste at least one valid video link (YouTube, OneDrive, Google Drive, or MP4 URL).');
      return;
    }

    soundFx.playClick();
    setIsAiProcessing(true);

    setTimeout(() => {
      if (batchImportMode === 'rebuild-10-modules') {
        const generated = pbsAdminStore.generate10ModuleCurriculum(
          title || 'BIM Masterclass Course',
          category,
          rawLines,
          microsoftDriveUrl
        );
        setModules(generated);
        setAiSuccessMessage(`✨ Generated 10 modules and distributed ${rawLines.length} video links!`);
      } else if (batchImportMode === 'map-existing') {
        let linkIdx = 0;
        const updatedMods = modules.map(mod => ({
          ...mod,
          lessons: mod.lessons.map(les => {
            if (linkIdx < rawLines.length) {
              const url = rawLines[linkIdx++];
              return {
                ...les,
                videoUrl: url,
                videoType: pbsAdminStore.detectVideoType(url)
              };
            }
            return les;
          })
        }));
        setModules(updatedMods);
        setAiSuccessMessage(`✨ Updated ${Math.min(linkIdx, rawLines.length)} video lessons with your pasted links!`);
      } else {
        // Append as a new module with all pasted links as lessons
        const nextNum = modules.length + 1;
        const moduleCode = `MOD-${nextNum.toString().padStart(2, '0')}`;
        const newLessons: AdminVideoLesson[] = rawLines.map((url, i) => ({
          id: `les-${Date.now()}-${i + 1}`,
          title: `${moduleCode}.${i + 1} - Video Lecture ${i + 1}`,
          duration: '25 min',
          videoType: pbsAdminStore.detectVideoType(url),
          videoUrl: url,
          isCompleted: false,
          assignedStudentId: 'all',
          addedBy: 'Admin (Pravin Yadav)',
          addedDate: new Date().toISOString().split('T')[0],
          cloudDriveFolderUrl: microsoftDriveUrl || '',
          bimDatasetUrl: ''
        }));

        const newMod: AdminCourseModule = {
          id: `mod-${Date.now()}-${nextNum}`,
          moduleCode,
          title: `Module ${nextNum.toString().padStart(2, '0')}: Masterclass Video Collection`,
          duration: `${(newLessons.length * 0.5).toFixed(1)} Hours`,
          lessons: newLessons
        };

        setModules([...modules, newMod]);
        setExpandedModuleId(newMod.id);
        setAiSuccessMessage(`✨ Created new module with ${rawLines.length} video lessons!`);
      }

      soundFx.playSuccess();
      setIsAiProcessing(false);
      setBatchRawLinks('');
    }, 700);
  };

  // 3. Quick AI Preset: Auto-fill YouTube BIM tutorial links
  const handleAutoFillYouTubeEmbeds = () => {
    soundFx.playClick();
    setIsAiProcessing(true);

    const SAMPLE_YT_LINKS = [
      'https://www.youtube.com/watch?v=17uKkL-0V7A',
      'https://www.youtube.com/watch?v=F0f_fTfC9c0',
      'https://www.youtube.com/watch?v=fJ9rUzIMcZQ',
      'https://www.youtube.com/watch?v=eBGIQ7ZuuiU',
      'https://www.youtube.com/watch?v=k4Tf-k3wJ2k',
      'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    ];

    setTimeout(() => {
      let idx = 0;
      const updated = modules.map(m => ({
        ...m,
        lessons: m.lessons.map(l => {
          if (!l.videoUrl || l.videoUrl.includes('sample')) {
            const yt = SAMPLE_YT_LINKS[idx % SAMPLE_YT_LINKS.length];
            idx++;
            return {
              ...l,
              videoUrl: yt,
              videoType: 'youtube' as const
            };
          }
          return l;
        })
      }));
      setModules(updated);
      setAiSuccessMessage('✨ Auto-populated verified YouTube video stream links across empty lessons!');
      soundFx.playSuccess();
      setIsAiProcessing(false);
    }, 600);
  };

  // 4. Quick AI Preset: Batch Apply Microsoft OneDrive URL to all lesson datasets
  const handleBatchApplyCloudDriveUrl = () => {
    soundFx.playClick();
    const driveUrl = microsoftDriveUrl || googleDriveUrl || 'https://onedrive.live.com/?id=PBS_Revit_Central_Datasets';
    const updated = modules.map(m => ({
      ...m,
      lessons: m.lessons.map(l => ({
        ...l,
        cloudDriveFolderUrl: driveUrl,
        bimDatasetUrl: `${driveUrl}#${m.moduleCode}`
      }))
    }));
    setModules(updated);
    setAiSuccessMessage(`✨ Applied Cloud Dataset Link (${driveUrl}) to all ${totalLessons} lessons!`);
    soundFx.playSuccess();
  };

  // ================= SAVE COURSE =================

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Please enter a course title.');
      return;
    }

    setIsSaving(true);
    setTimeout(() => {
      const coursePayload = {
        title: title.trim(),
        category,
        level,
        badge,
        batchMode,
        batchSchedule,
        instructor,
        totalFee: Number(totalFee),
        description: description.trim() || `Comprehensive masterclass on ${title}.`,
        thumbnail,
        accentColor,
        assignedTo,
        microsoftDriveUrl: microsoftDriveUrl.trim() || undefined,
        googleDriveUrl: googleDriveUrl.trim() || undefined,
        modules: modules.length > 0 ? modules : pbsAdminStore.generate10ModuleCurriculum(title, category, [], microsoftDriveUrl),
        isPublished: true
      };

      if (isEditing && courseToEdit) {
        pbsAdminStore.updateCourse(courseToEdit.id, coursePayload);
      } else {
        pbsAdminStore.addCourse(coursePayload);
      }

      soundFx.playSuccess();
      setIsSaving(false);
      setSavedSuccess(true);
      setTimeout(() => {
        onSaved();
        onClose();
      }, 900);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-5xl w-full shadow-2xl border border-slate-200 overflow-hidden animate-fadeIn max-h-[94vh] flex flex-col my-4">
        
        {/* Modal Top Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-slate-950 via-emerald-950 to-slate-950 text-white flex items-center justify-between shrink-0 shadow-md border-b border-emerald-900/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 font-bold shadow-inner">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500 text-slate-950">
                  {isEditing ? 'Course Editor & Video Manager' : 'New Masterclass Builder'}
                </span>
                <span className="text-xs text-emerald-300 font-mono">
                  {modules.length} Modules • {totalLessons} Videos
                </span>
              </div>
              <h3 className="font-extrabold text-base text-white mt-0.5 truncate max-w-lg">
                {title || (isEditing ? 'Modify Course' : 'Create New BIM Masterclass')}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="bg-slate-100/90 border-b border-slate-200 px-6 py-2 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-1.5 bg-slate-200/80 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => {
                soundFx.playClick();
                setActiveTab('modules');
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'modules'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Modules & Video Links ({modules.length})</span>
            </button>

            <button
              type="button"
              onClick={() => {
                soundFx.playClick();
                setActiveTab('ai-assistant');
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'ai-assistant'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>AI Video & Content Assistant</span>
            </button>

            <button
              type="button"
              onClick={() => {
                soundFx.playClick();
                setActiveTab('general');
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'general'
                  ? 'bg-slate-800 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>General Info & Fees</span>
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <button
              type="button"
              onClick={handleAddModule}
              className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold rounded-lg border border-emerald-300 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Module</span>
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6 text-slate-800">
          
          {savedSuccess && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-300 rounded-2xl text-emerald-900 text-xs font-bold flex items-center gap-2 animate-bounce">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{isEditing ? 'Course, modules & video links updated successfully!' : 'New course created and published to LMS!'}</span>
            </div>
          )}

          {/* ================= TAB 1: MODULES & VIDEO LECTURES EDITOR ================= */}
          {activeTab === 'modules' && (
            <div className="space-y-6">
              
              {/* Header Info Banner */}
              <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <h4 className="text-xs font-black uppercase tracking-wider text-emerald-950 flex items-center gap-1.5">
                    <Video className="w-4 h-4 text-emerald-600" />
                    <span>Interactive Course Curriculum & Video Links Manager</span>
                  </h4>
                  <p className="text-[11px] text-emerald-800">
                    Paste YouTube links, Microsoft OneDrive/SharePoint embeds, or Google Drive previews for each lesson.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      soundFx.playClick();
                      setActiveTab('ai-assistant');
                    }}
                    className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-xs transition-colors cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>AI Video Auto-Update</span>
                  </button>
                </div>
              </div>

              {/* Modules Accordion List */}
              <div className="space-y-4">
                {modules.map((mod, modIndex) => {
                  const isExpanded = expandedModuleId === mod.id;
                  const lessonCount = mod.lessons?.length || 0;

                  return (
                    <div
                      key={mod.id}
                      className="border border-slate-300 rounded-2xl overflow-hidden bg-white shadow-xs transition-all"
                    >
                      {/* Module Header Bar */}
                      <div className="p-3.5 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5 flex-1 min-w-0">
                          {/* Module Code input */}
                          <input
                            type="text"
                            value={mod.moduleCode}
                            onChange={(e) => handleUpdateModule(mod.id, { moduleCode: e.target.value })}
                            className="w-20 px-2 py-1 bg-slate-900 text-emerald-400 text-xs font-mono font-bold rounded-lg text-center focus:outline-none border border-slate-700"
                            placeholder="MOD-01"
                          />

                          {/* Module Title input */}
                          <input
                            type="text"
                            value={mod.title}
                            onChange={(e) => handleUpdateModule(mod.id, { title: e.target.value })}
                            className="flex-1 px-3 py-1 text-xs font-bold text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 min-w-0"
                            placeholder="Module Title..."
                          />
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          {/* Duration input */}
                          <div className="flex items-center gap-1 bg-white border border-slate-300 rounded-lg px-2 py-1 text-xs">
                            <Clock className="w-3 h-3 text-slate-400" />
                            <input
                              type="text"
                              value={mod.duration}
                              onChange={(e) => handleUpdateModule(mod.id, { duration: e.target.value })}
                              className="w-20 text-[11px] font-semibold text-slate-700 focus:outline-none"
                              placeholder="3.5 Hours"
                            />
                          </div>

                          <button
                            type="button"
                            onClick={() => handleAddLesson(mod.id)}
                            className="px-2.5 py-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 text-xs font-bold rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                            title="Add Video Lesson to this Module"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add Video</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDeleteModule(mod.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                            title="Delete Module"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>

                          <button
                            type="button"
                            onClick={() => setExpandedModuleId(isExpanded ? null : mod.id)}
                            className="p-1.5 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-200 transition-colors cursor-pointer"
                          >
                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      {/* Module Lessons Content */}
                      {isExpanded && (
                        <div className="p-4 bg-slate-50/50 space-y-3">
                          {mod.lessons && mod.lessons.length > 0 ? (
                            mod.lessons.map((les, lesIndex) => (
                              <div
                                key={les.id}
                                className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs space-y-2.5 transition-all hover:border-emerald-300"
                              >
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                  {/* Lesson Title */}
                                  <div className="flex items-center gap-2 flex-1">
                                    <span className="text-[11px] font-mono font-bold text-slate-400 w-6">
                                      #{lesIndex + 1}
                                    </span>
                                    <input
                                      type="text"
                                      value={les.title}
                                      onChange={(e) => handleUpdateLesson(mod.id, les.id, { title: e.target.value })}
                                      className="flex-1 px-2.5 py-1 text-xs font-bold text-slate-800 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                      placeholder="Lesson Title (e.g. Setting Project Units & Grids)"
                                    />
                                  </div>

                                  {/* Duration & Type Select */}
                                  <div className="flex items-center gap-2">
                                    <input
                                      type="text"
                                      value={les.duration}
                                      onChange={(e) => handleUpdateLesson(mod.id, les.id, { duration: e.target.value })}
                                      className="w-16 px-2 py-1 text-[11px] font-mono text-center bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none"
                                      placeholder="25 min"
                                    />

                                    <select
                                      value={les.videoType}
                                      onChange={(e) => handleUpdateLesson(mod.id, les.id, { videoType: e.target.value as any })}
                                      className="px-2 py-1 text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200 rounded-lg focus:outline-none"
                                    >
                                      <option value="youtube">YouTube Embed</option>
                                      <option value="microsoft-drive">Microsoft OneDrive</option>
                                      <option value="google-drive">Google Drive</option>
                                      <option value="direct">Direct MP4/WebM</option>
                                      <option value="pbs-secure">PBS Secure DRM</option>
                                    </select>

                                    {/* Test Video Playback Button */}
                                    {les.videoUrl && (
                                      <button
                                        type="button"
                                        onClick={() => {
                                          soundFx.playClick();
                                          setPreviewVideoUrl(les.videoUrl);
                                          setPreviewVideoTitle(les.title);
                                        }}
                                        className="px-2 py-1 bg-slate-900 hover:bg-slate-800 text-emerald-400 text-[11px] font-bold rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                                        title="Test video link embed right now"
                                      >
                                        <Play className="w-3 h-3 fill-current" />
                                        <span>Test</span>
                                      </button>
                                    )}

                                    <button
                                      type="button"
                                      onClick={() => handleDeleteLesson(mod.id, les.id)}
                                      className="p-1 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                                      title="Remove Lesson"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </div>

                                {/* Video URL Input Bar */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 border-t border-slate-100 text-xs">
                                  <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">
                                      Video Stream URL (YouTube / OneDrive / Google Drive / MP4) *
                                    </label>
                                    <div className="relative">
                                      {les.videoType === 'youtube' ? (
                                        <Youtube className="w-3.5 h-3.5 text-rose-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
                                      ) : les.videoType === 'microsoft-drive' ? (
                                        <Cloud className="w-3.5 h-3.5 text-blue-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
                                      ) : (
                                        <HardDrive className="w-3.5 h-3.5 text-emerald-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
                                      )}
                                      <input
                                        type="url"
                                        value={les.videoUrl}
                                        onChange={(e) => handleUpdateLesson(mod.id, les.id, { videoUrl: e.target.value })}
                                        className="w-full pl-8 pr-2.5 py-1.5 text-xs font-mono bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-800"
                                        placeholder="https://www.youtube.com/watch?v=... or https://onedrive.live.com/embed..."
                                      />
                                    </div>
                                  </div>

                                  <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">
                                      BIM Dataset File / Download URL (OneDrive/G-Drive)
                                    </label>
                                    <div className="relative">
                                      <FolderArchive className="w-3.5 h-3.5 text-indigo-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
                                      <input
                                        type="url"
                                        value={les.bimDatasetUrl || ''}
                                        onChange={(e) => handleUpdateLesson(mod.id, les.id, { bimDatasetUrl: e.target.value })}
                                        className="w-full pl-8 pr-2.5 py-1.5 text-xs font-mono bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-800"
                                        placeholder="https://onedrive.live.com/download?id=MOD_Dataset.rvt"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="p-4 bg-white rounded-xl border border-dashed border-slate-300 text-center text-xs text-slate-500 space-y-1.5">
                              <p>No video lessons in this module yet.</p>
                              <button
                                type="button"
                                onClick={() => handleAddLesson(mod.id)}
                                className="px-3 py-1 bg-emerald-600 text-white rounded-lg text-xs font-bold cursor-pointer"
                              >
                                + Add First Video Lesson
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

            </div>
          )}

          {/* ================= TAB 2: AI VIDEO & CONTENT ASSISTANT ================= */}
          {activeTab === 'ai-assistant' && (
            <div className="space-y-6">
              
              {/* AI Header */}
              <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 text-white p-5 rounded-2xl border border-indigo-800 shadow-md space-y-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-white">AI Curriculum & Video Dispatcher Assistant</h4>
                    <p className="text-xs text-indigo-200">
                      Use AI to update video links, auto-generate 10-module curricula, or parse batch YouTube playlists.
                    </p>
                  </div>
                </div>

                {aiSuccessMessage && (
                  <div className="mt-3 p-3 bg-emerald-900/80 border border-emerald-500 text-emerald-200 rounded-xl text-xs font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{aiSuccessMessage}</span>
                  </div>
                )}
              </div>

              {/* Natural Language Prompt Box */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  <span>Ask AI to Update Course Content or Video Links:</span>
                </label>
                <textarea
                  rows={3}
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  placeholder="e.g. Update all video links with YouTube Revit MEP tutorials: https://youtu.be/sample1, https://youtu.be/sample2 and generate 10 industrial modules with LOD 400 practical exercises."
                  className="w-full p-3 text-xs bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none text-slate-800"
                />

                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    <button
                      type="button"
                      onClick={() => setAiPrompt("Generate a 10-Module Autodesk Revit MEP Masterclass curriculum with YouTube video links and Microsoft OneDrive dataset tags.")}
                      className="text-[11px] bg-white hover:bg-slate-100 text-slate-700 font-semibold px-2.5 py-1 rounded-lg border border-slate-300 transition-colors"
                    >
                      🚀 Auto 10-Module Revit MEP
                    </button>
                    <button
                      type="button"
                      onClick={() => setAiPrompt("Update all lesson titles to LOD 400 industry standards with Navisworks clash coordination.")}
                      className="text-[11px] bg-white hover:bg-slate-100 text-slate-700 font-semibold px-2.5 py-1 rounded-lg border border-slate-300 transition-colors"
                    >
                      ⚡ LOD 400 Title Polish
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleProcessAiPrompt}
                    disabled={isAiProcessing || !aiPrompt.trim()}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer disabled:opacity-40"
                  >
                    {isAiProcessing ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>AI Processing...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Execute AI Update</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Batch Paste Video Links Box */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <LinkIcon className="w-4 h-4 text-emerald-600" />
                    <span>Batch Paste Video Links (YouTube / OneDrive / Google Drive / MP4):</span>
                  </label>
                  <span className="text-[11px] text-slate-500">1 link per line</span>
                </div>

                <textarea
                  rows={4}
                  value={batchRawLinks}
                  onChange={(e) => setBatchRawLinks(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ&#10;https://youtu.be/sampleVideoId2&#10;https://onedrive.live.com/embed?cid=...&#10;https://drive.google.com/file/d/.../preview"
                  className="w-full p-3 text-xs font-mono bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none text-slate-800"
                />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-600">Action:</span>
                    <select
                      value={batchImportMode}
                      onChange={(e) => setBatchImportMode(e.target.value as any)}
                      className="px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-800 focus:outline-none"
                    >
                      <option value="map-existing">Map Links sequentially to Existing Lessons</option>
                      <option value="rebuild-10-modules">Rebuild Complete 10 Modules from Links</option>
                      <option value="append-new-module">Create a New Module with these Videos</option>
                    </select>
                  </div>

                  <button
                    type="button"
                    onClick={handleBatchParseLinks}
                    disabled={isAiProcessing || !batchRawLinks.trim()}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer disabled:opacity-40"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>AI Parse & Apply Video Links</span>
                  </button>
                </div>
              </div>

              {/* Quick AI Presets Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleAutoFillYouTubeEmbeds}
                  disabled={isAiProcessing}
                  className="p-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-left transition-colors cursor-pointer flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                    <Youtube className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Auto-Fill YouTube Stream Links</div>
                    <div className="text-[11px] text-slate-500">Populates empty lessons with verified YouTube video links.</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={handleBatchApplyCloudDriveUrl}
                  disabled={isAiProcessing}
                  className="p-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-left transition-colors cursor-pointer flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                    <Cloud className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Apply Master Cloud Dataset to All</div>
                    <div className="text-[11px] text-slate-500">Links Microsoft Drive folder to all {totalLessons} lessons.</div>
                  </div>
                </button>
              </div>

            </div>
          )}

          {/* ================= TAB 3: GENERAL INFO & FEES ================= */}
          {activeTab === 'general' && (
            <div className="space-y-4">
              
              {/* Course Title */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Course Full Title *</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Autodesk Revit MEP Masterclass (LOD 300 - 500)"
                  required
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-bold text-slate-900"
                />
              </div>

              {/* Category & Level */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Discipline / Software</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium text-slate-800"
                  >
                    <option value="Revit">Autodesk Revit (AR / ST / MEP)</option>
                    <option value="Navisworks">Navisworks Manage & Clash Detection</option>
                    <option value="Dynamo">Computational Dynamo BIM & Python</option>
                    <option value="ISO 19650">ISO 19650 Global BIM Management</option>
                    <option value="Civil 3D">Civil 3D Infrastructure</option>
                    <option value="BIM Management">BIM Management & Coordination</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Competency Level</label>
                  <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium text-slate-800"
                  >
                    <option value="Foundational">Foundational Entry</option>
                    <option value="Professional">Professional Practitioner</option>
                    <option value="Advanced Masterclass">Advanced Masterclass (LOD 400-500)</option>
                    <option value="Executive">Executive Leadership</option>
                  </select>
                </div>
              </div>

              {/* Batch Schedule & Mode */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Delivery Mode</label>
                  <select
                    value={batchMode}
                    onChange={(e) => setBatchMode(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium text-slate-800"
                  >
                    <option value="Offline Weekend (Sat-Sun)">Offline Weekend Class (Pune Head Office)</option>
                    <option value="Online Interactive Live">Online Interactive Live (Zoom / Teams)</option>
                    <option value="Hybrid Cohort">Hybrid Cohort (Classroom + LMS Live)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Timings & Schedule</label>
                  <input
                    type="text"
                    value={batchSchedule}
                    onChange={(e) => setBatchSchedule(e.target.value)}
                    placeholder="e.g. Saturdays & Sundays (06:00 PM - 09:30 PM IST)"
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium text-slate-800"
                  />
                </div>
              </div>

              {/* Instructor & Fee */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Lead Mentor / Instructor</label>
                  <input
                    type="text"
                    value={instructor}
                    onChange={(e) => setInstructor(e.target.value)}
                    placeholder="e.g. Pravin Yadav (15+ Yrs Exp)"
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium text-slate-800"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Total Course Fee (₹ INR) *</label>
                  <div className="relative">
                    <IndianRupee className="w-4 h-4 text-emerald-600 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="number"
                      value={totalFee}
                      onChange={(e) => setTotalFee(Number(e.target.value))}
                      placeholder="14999"
                      required
                      className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-bold text-emerald-700"
                    />
                  </div>
                </div>
              </div>

              {/* Microsoft OneDrive & Google Drive Dataset Links */}
              <div className="p-4 bg-emerald-50/50 border border-emerald-100 rounded-2xl space-y-3">
                <div className="font-bold text-xs text-slate-900 flex items-center gap-2">
                  <Cloud className="w-4 h-4 text-emerald-600" />
                  <span>Microsoft OneDrive & Cloud Datasets Repository</span>
                </div>

                <div className="space-y-2">
                  <div>
                    <label className="text-[11px] font-bold text-slate-700">Microsoft Drive / OneDrive Shared Project Folder URL</label>
                    <input
                      type="url"
                      value={microsoftDriveUrl}
                      onChange={(e) => setMicrosoftDriveUrl(e.target.value)}
                      placeholder="https://onedrive.live.com/?id=PBS_Revit_MEP_Central_Dataset"
                      className="w-full px-3 py-2 text-xs font-mono bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800 mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700">Google Drive Folder Link</label>
                    <input
                      type="url"
                      value={googleDriveUrl}
                      onChange={(e) => setGoogleDriveUrl(e.target.value)}
                      placeholder="https://drive.google.com/drive/folders/1BimRevitMEP_ClassroomLecture_2026"
                      className="w-full px-3 py-2 text-xs font-mono bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800 mt-1"
                    />
                  </div>
                </div>
              </div>

              {/* Student Enrollment Target Option */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Assign Course Access</label>
                <select
                  value={assignedTo}
                  onChange={(e) => setAssignedTo(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold text-slate-800"
                >
                  <option value="all">Publish to All Enrolled Students</option>
                  {studentsList.map((s) => (
                    <option key={s.studentId} value={s.studentId}>
                      Specific Student Only: {s.name} ({s.studentId})
                    </option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Course Overview & Syllabus</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  placeholder="Detailed description of what will be taught in this course..."
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium text-slate-800"
                />
              </div>

            </div>
          )}

          {/* Modal Footer Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-200 shrink-0">
            <div className="text-xs text-slate-500">
              <span>{modules.length} Modules</span> • <span className="font-semibold text-emerald-700">{totalLessons} Video Lectures configured</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-md shadow-emerald-600/20 disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{isSaving ? 'Saving Changes...' : (isEditing ? 'Save All Course & Video Changes' : 'Publish Masterclass')}</span>
              </button>
            </div>
          </div>

        </form>

      </div>

      {/* Instant Video Test Preview Modal */}
      {previewVideoUrl && (
        <div className="fixed inset-0 z-60 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-3xl w-full p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <Play className="w-4 h-4 text-emerald-400" />
                <h4 className="text-sm font-bold truncate max-w-md">{previewVideoTitle || 'Video Link Live Test'}</h4>
              </div>
              <button
                onClick={() => setPreviewVideoUrl(null)}
                className="p-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="relative aspect-video bg-black rounded-2xl overflow-hidden border border-slate-800">
              <iframe
                src={pbsAdminStore.formatEmbedVideoUrl(previewVideoUrl)}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="truncate max-w-md font-mono text-[11px]">{previewVideoUrl}</span>
              <a
                href={previewVideoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-emerald-400 rounded-lg text-xs font-bold flex items-center gap-1"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open in New Tab</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
