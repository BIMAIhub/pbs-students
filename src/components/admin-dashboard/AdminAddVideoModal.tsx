import React, { useState } from 'react';
import { 
  X, 
  Video, 
  Play, 
  Link as LinkIcon, 
  ShieldCheck, 
  CheckCircle2, 
  Save, 
  Sparkles, 
  Lock, 
  Eye, 
  Clock,
  Layers,
  FolderArchive,
  Cloud,
  FileCode
} from 'lucide-react';
import { AdminCourse, pbsAdminStore, ManagedStudent } from '../../utils/pbsAdminStore';
import { soundFx } from '../../utils/soundEffects';

interface AdminAddVideoModalProps {
  coursesList: AdminCourse[];
  studentsList: ManagedStudent[];
  initialCourseId?: string;
  onClose: () => void;
  onSaved: () => void;
}

export const AdminAddVideoModal: React.FC<AdminAddVideoModalProps> = ({
  coursesList,
  studentsList,
  initialCourseId,
  onClose,
  onSaved
}) => {
  const [selectedCourseId, setSelectedCourseId] = useState<string>(
    initialCourseId || (coursesList[0]?.id ?? 'c1')
  );
  
  const currentCourse = coursesList.find(c => c.id === selectedCourseId) || coursesList[0];
  const currentModules = currentCourse?.modules || [];

  const [selectedModuleId, setSelectedModuleId] = useState<string>(
    currentModules[0]?.id || 'mod-new'
  );
  const [lessonTitle, setLessonTitle] = useState('');
  const [duration, setDuration] = useState('35 min');
  const [videoType, setVideoType] = useState<'microsoft-drive' | 'google-drive' | 'youtube' | 'direct' | 'pbs-secure'>('microsoft-drive');
  const [videoUrl, setVideoUrl] = useState('');
  const [cloudDriveFolderUrl, setCloudDriveFolderUrl] = useState('');
  const [description, setDescription] = useState('');
  const [assignedStudentId, setAssignedStudentId] = useState<string>('all');

  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [previewEmbedUrl, setPreviewEmbedUrl] = useState<string>('');

  const handleUrlChange = (val: string) => {
    setVideoUrl(val);
    const formatted = pbsAdminStore.formatEmbedVideoUrl(val);
    setPreviewEmbedUrl(formatted);
  };

  const handleApplySampleMicrosoftDrive = () => {
    soundFx.playClick();
    const sampleMsDrive = 'https://onedrive.live.com/embed?cid=PBS2026&resid=PBS2026!104&authkey=!APBSMEP2026';
    handleUrlChange(sampleMsDrive);
    setVideoType('microsoft-drive');
    setCloudDriveFolderUrl('https://onedrive.live.com/?authkey=%21APBSMEP2026Data&id=PBS_Revit_MEP_Central_Dataset');
  };

  const handleApplySampleGoogleDrive = () => {
    soundFx.playClick();
    const sampleDriveUrl = 'https://drive.google.com/file/d/1BimRevitMEP_ClassroomLecture_2026/view?usp=sharing';
    handleUrlChange(sampleDriveUrl);
    setVideoType('google-drive');
    setCloudDriveFolderUrl('https://drive.google.com/drive/folders/1BimRevitMEP_ClassroomLecture_2026');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lessonTitle.trim() || !videoUrl.trim()) return;

    setIsSaving(true);
    setTimeout(() => {
      const success = pbsAdminStore.addVideoLessonToCourse(
        selectedCourseId,
        selectedModuleId,
        {
          title: lessonTitle.trim(),
          duration: duration.trim() || '30 min',
          videoType,
          videoUrl: videoUrl.trim(),
          assignedStudentId,
          addedBy: 'PBS Admin Team',
          description: description.trim(),
          cloudDriveFolderUrl: cloudDriveFolderUrl.trim() || undefined
        }
      );

      if (success) {
        soundFx.playSuccess();
        setIsSaving(false);
        setSavedSuccess(true);
        setTimeout(() => {
          onSaved();
          onClose();
        }, 1200);
      } else {
        setIsSaving(false);
      }
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-emerald-100 overflow-hidden animate-fadeIn max-h-[94vh] flex flex-col">
        
        {/* Header with Green & White Theme */}
        <div className="px-6 py-4 bg-gradient-to-r from-emerald-800 via-teal-900 to-emerald-950 text-white flex items-center justify-between shrink-0 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 font-bold">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-white">Add Video Lesson & Cloud Drive Link</h3>
              <p className="text-xs text-emerald-200">Microsoft Drive / Google Drive • Protected Anti-Download DRM</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1 text-slate-800">
          
          {savedSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Video lesson added successfully! Students can stream immediately without download permissions.</span>
            </div>
          )}

          {/* Target Course & Module */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Target Course</label>
              <select
                value={selectedCourseId}
                onChange={(e) => {
                  setSelectedCourseId(e.target.value);
                  const c = coursesList.find(c => c.id === e.target.value);
                  if (c && c.modules.length > 0) {
                    setSelectedModuleId(c.modules[0].id);
                  }
                }}
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold text-slate-800"
              >
                {coursesList.map((c) => (
                  <option key={c.id} value={c.id}>{c.title}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Course Module / Section</label>
              <select
                value={selectedModuleId}
                onChange={(e) => setSelectedModuleId(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium text-slate-800"
              >
                {currentModules.map((m) => (
                  <option key={m.id} value={m.id}>{m.moduleCode}: {m.title}</option>
                ))}
                <option value="mod-new">+ Create New Module / Section</option>
              </select>
            </div>
          </div>

          {/* Lesson Title & Duration */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2 space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Video Lesson Title</label>
              <input
                type="text"
                value={lessonTitle}
                onChange={(e) => setLessonTitle(e.target.value)}
                placeholder="e.g. Revit MEP LOD 400 Plant Room Routing & Central Model Syncing"
                required
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold text-slate-800"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Duration</label>
              <div className="relative">
                <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="e.g. 45 min"
                  required
                  className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium text-slate-800"
                />
              </div>
            </div>
          </div>

          {/* Video Link & Cloud Platform Selector */}
          <div className="p-4 bg-emerald-50/50 border border-emerald-100 rounded-2xl space-y-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-900">Video Source Provider</span>
                <span className="text-[10px] bg-emerald-600 text-white font-bold px-2 py-0.5 rounded-full">
                  Microsoft Drive & Google Drive Ready
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleApplySampleMicrosoftDrive}
                  className="text-[11px] text-emerald-700 hover:text-emerald-900 bg-white border border-emerald-200 px-2 py-1 rounded-lg font-bold cursor-pointer transition-colors shadow-2xs"
                >
                  + Sample Microsoft Drive
                </button>
                <button
                  type="button"
                  onClick={handleApplySampleGoogleDrive}
                  className="text-[11px] text-emerald-700 hover:text-emerald-900 bg-white border border-emerald-200 px-2 py-1 rounded-lg font-bold cursor-pointer transition-colors shadow-2xs"
                >
                  + Sample Google Drive
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {[
                { id: 'microsoft-drive', label: 'Microsoft Drive / OneDrive' },
                { id: 'google-drive', label: 'Google Drive' },
                { id: 'youtube', label: 'YouTube Embed' },
                { id: 'pbs-secure', label: 'PBS CDN Direct' }
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setVideoType(opt.id as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    videoType === opt.id
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            <div className="relative">
              <LinkIcon className="w-4 h-4 text-emerald-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="url"
                value={videoUrl}
                onChange={(e) => handleUrlChange(e.target.value)}
                placeholder={
                  videoType === 'microsoft-drive'
                    ? 'Paste Microsoft OneDrive/SharePoint embed or view link (e.g. https://onedrive.live.com/...)'
                    : 'Paste Google Drive preview link (e.g. https://drive.google.com/file/d/.../view)'
                }
                required
                className="w-full pl-10 pr-4 py-2.5 text-xs font-mono bg-white border border-emerald-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium text-slate-800 shadow-2xs"
              />
            </div>

            {/* Cloud Drive Dataset / Project Models Folder Link */}
            <div className="space-y-1 pt-1">
              <label className="text-[11px] font-bold text-slate-700 flex items-center gap-1.5">
                <FolderArchive className="w-3.5 h-3.5 text-emerald-600" />
                <span>Associated Microsoft Drive / Cloud Dataset Folder (Optional)</span>
              </label>
              <input
                type="url"
                value={cloudDriveFolderUrl}
                onChange={(e) => setCloudDriveFolderUrl(e.target.value)}
                placeholder="e.g. https://onedrive.live.com/?id=PBS_Revit_MEP_Central_Dataset"
                className="w-full px-3.5 py-2 text-xs font-mono bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium text-slate-800"
              />
            </div>

            {/* Anti-Download Protection Guarantee Banner */}
            <div className="p-3 bg-amber-50/80 border border-amber-200/80 rounded-xl flex items-start gap-2.5 text-xs text-amber-950">
              <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <div className="font-bold">PBS Anti-Download Player Security Activated</div>
                <div className="text-[11px] text-amber-800 leading-relaxed">
                  Students can stream this video in full high definition, pause, seek, and mark it complete, but <strong>cannot download the raw video file</strong>. Right-click context menus and direct download links are disabled.
                </div>
              </div>
            </div>

            {/* Formatted Embed URL Preview */}
            {previewEmbedUrl && (
              <div className="p-2.5 bg-slate-900 text-slate-300 rounded-xl text-[11px] font-mono flex items-center justify-between">
                <span className="truncate">Auto-formatted Embed: {previewEmbedUrl}</span>
                <span className="text-emerald-400 font-bold ml-2 shrink-0">Ready</span>
              </div>
            )}
          </div>

          {/* Student Target Audience Option */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Assign Video Access</label>
            <select
              value={assignedStudentId}
              onChange={(e) => setAssignedStudentId(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold text-slate-800"
            >
              <option value="all">Apply to All Students Enrolled in This Course</option>
              {studentsList.map((s) => (
                <option key={s.studentId} value={s.studentId}>
                  Specific Student Only: {s.name} ({s.studentId})
                </option>
              ))}
            </select>
          </div>

          {/* Lesson Description */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Lesson Description & Key Objectives</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              placeholder="What students will learn in this video session (e.g. ISO 19650 naming rules, pipe slope calculations)..."
              className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium text-slate-800"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-md shadow-emerald-600/20"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? 'Adding Video...' : 'Add Video to Course'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
