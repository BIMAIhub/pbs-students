import React, { useState } from 'react';
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
  Cloud
} from 'lucide-react';
import { AdminCourse, pbsAdminStore, ManagedStudent } from '../../utils/pbsAdminStore';
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

  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSaving(true);
    setTimeout(() => {
      if (isEditing && courseToEdit) {
        pbsAdminStore.updateCourse(courseToEdit.id, {
          title: title.trim(),
          category,
          level,
          badge,
          batchMode,
          batchSchedule,
          instructor,
          totalFee: Number(totalFee),
          description,
          thumbnail,
          accentColor,
          assignedTo,
          microsoftDriveUrl: microsoftDriveUrl.trim() || undefined,
          googleDriveUrl: googleDriveUrl.trim() || undefined
        });
      } else {
        pbsAdminStore.addCourse({
          title: title.trim(),
          category,
          level,
          badge,
          batchMode,
          batchSchedule,
          instructor,
          totalFee: Number(totalFee),
          description,
          thumbnail,
          accentColor,
          assignedTo,
          microsoftDriveUrl: microsoftDriveUrl.trim() || undefined,
          googleDriveUrl: googleDriveUrl.trim() || undefined,
          isPublished: true,
          modules: [
            {
              id: `mod-${Date.now()}-1`,
              moduleCode: 'MOD-01',
              title: 'Module 01: Foundational BIM Workflows & Project Setup',
              duration: '3.5 Hours',
              lessons: []
            }
          ]
        });
      }

      soundFx.playSuccess();
      setIsSaving(false);
      setSavedSuccess(true);
      setTimeout(() => {
        onSaved();
        onClose();
      }, 1000);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-emerald-100 overflow-hidden animate-fadeIn max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-emerald-800 via-teal-900 to-emerald-950 text-white flex items-center justify-between shrink-0 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 font-bold">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-white">
                {isEditing ? 'Modify Course Curriculum & Cloud Datasets' : 'Add New BIM Masterclass Course'}
              </h3>
              <p className="text-xs text-emerald-200">Admin curriculum, fee structure & enrollment manager</p>
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
              <span>{isEditing ? 'Course updated successfully!' : 'New course created and published to LMS!'}</span>
            </div>
          )}

          {/* Course Title */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Course Full Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Autodesk Revit MEP Masterclass (LOD 300 - 500)"
              required
              className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold text-slate-900"
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
              <label className="text-xs font-bold text-slate-700">Total Course Fee (₹ INR)</label>
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
                <label className="text-[11px] font-bold text-slate-700">Microsoft Drive / OneDrive Shared Project Folder</label>
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
              <span>{isSaving ? 'Saving Course...' : (isEditing ? 'Save Changes' : 'Publish Course')}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
