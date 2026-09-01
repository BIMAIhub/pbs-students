import React, { useState, useEffect } from 'react';
import { 
  Users, 
  BookOpen, 
  Briefcase, 
  IndianRupee, 
  MessageSquare, 
  TrendingUp, 
  ShieldCheck, 
  Plus, 
  Search, 
  Filter, 
  KeyRound, 
  Video, 
  FileSpreadsheet, 
  LogOut, 
  ExternalLink, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ChevronRight, 
  Edit, 
  Trash2, 
  Send, 
  Play, 
  Sparkles, 
  Award, 
  Lock, 
  Eye, 
  Download, 
  UserCheck, 
  Building2, 
  GraduationCap, 
  RefreshCw,
  FolderArchive,
  Cloud,
  Layers,
  Phone,
  Mail,
  Calendar,
  QrCode,
  CheckCircle,
  XCircle,
  CreditCard
} from 'lucide-react';
import { 
  pbsAdminStore, 
  ManagedStudent, 
  AdminCourse, 
  AdminVideoLesson,
  EnrollmentRequest 
} from '../../utils/pbsAdminStore';
import { studentAuthUtil } from '../../utils/studentAuth';
import { soundFx } from '../../utils/soundEffects';

// Child Modals
import { AdminAddStudentModal } from './AdminAddStudentModal';
import { AdminAddCourseModal } from './AdminAddCourseModal';
import { AdminAddVideoModal } from './AdminAddVideoModal';
import { AdminAiCourseCreatorModal } from './AdminAiCourseCreatorModal';
import { AdminStudentPasswordModal } from './AdminStudentPasswordModal';
import { AdminPlacementModal } from './AdminPlacementModal';
import { AdminRecordFeeModal } from './AdminRecordFeeModal';
import { AdminPaymentHistoryModal } from './AdminPaymentHistoryModal';
import { AdminStudentGrowthModal } from './AdminStudentGrowthModal';
import { AdminMessageStudentModal } from './AdminMessageStudentModal';
import { AdminDatabaseBackupModal } from './AdminDatabaseBackupModal';

interface AdminPortalProps {
  onLogout: () => void;
  onNavigateToStudentPortal?: () => void;
  onSwitchToStudentView?: (student?: ManagedStudent) => void;
  user?: any;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ 
  onLogout,
  onNavigateToStudentPortal,
  onSwitchToStudentView
}) => {
  const [activeTab, setActiveTab] = useState<'students' | 'courses' | 'enrollments' | 'placements' | 'financials' | 'qa'>('students');
  const [students, setStudents] = useState<ManagedStudent[]>([]);
  const [courses, setCourses] = useState<AdminCourse[]>([]);
  const [enrollmentRequests, setEnrollmentRequests] = useState<EnrollmentRequest[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBatch, setFilterBatch] = useState('all');
  const [filterFee, setFilterFee] = useState('all');
  const [filterEnrollmentStatus, setFilterEnrollmentStatus] = useState<string>('all');

  // Modal States
  const [showBackupModal, setShowBackupModal] = useState(false);
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [showAddCourseModal, setShowAddCourseModal] = useState(false);
  const [showAiCourseCreatorModal, setShowAiCourseCreatorModal] = useState(false);
  const [courseToEdit, setCourseToEdit] = useState<AdminCourse | null>(null);
  const [showAddVideoModal, setShowAddVideoModal] = useState(false);
  const [selectedCourseForVideo, setSelectedCourseForVideo] = useState<string | undefined>(undefined);

  const [selectedStudentForPassword, setSelectedStudentForPassword] = useState<ManagedStudent | null>(null);
  const [selectedStudentForPlacement, setSelectedStudentForPlacement] = useState<ManagedStudent | null>(null);
  const [selectedStudentForFee, setSelectedStudentForFee] = useState<ManagedStudent | null>(null);
  const [selectedStudentForHistory, setSelectedStudentForHistory] = useState<ManagedStudent | null>(null);
  const [selectedStudentForGrowth, setSelectedStudentForGrowth] = useState<ManagedStudent | null>(null);
  const [selectedStudentForMessage, setSelectedStudentForMessage] = useState<ManagedStudent | null>(null);

  const [exportNotice, setExportNotice] = useState<string | null>(null);

  // Sync state from store
  const refreshData = () => {
    const freshStudents = pbsAdminStore.getStudents();
    const freshCourses = pbsAdminStore.getCourses();
    const freshEnrollments = pbsAdminStore.getEnrollmentRequests();
    setStudents(freshStudents);
    setCourses(freshCourses);
    setEnrollmentRequests(freshEnrollments);
  };

  useEffect(() => {
    refreshData();
  }, []);

  // Filter students based on search and criteria
  const filteredStudents = students.filter((s) => {
    const matchesSearch = 
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.rollNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.specialization.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesBatch = filterBatch === 'all' || s.batch.toLowerCase().includes(filterBatch.toLowerCase());
    const matchesFee = filterFee === 'all' || s.paymentStatus === filterFee;

    return matchesSearch && matchesBatch && matchesFee;
  });

  // Aggregated KPI Stats
  const totalRevenueCollected = students.reduce((acc, s) => acc + s.paidAmount, 0);
  const totalPendingBalance = students.reduce((acc, s) => acc + s.pendingBalance, 0);
  const fullyPaidCount = students.filter(s => s.paymentStatus === 'Full Paid').length;
  const placementReadyCount = students.filter(s => s.placement?.readinessStatus === 'Ready for MNC Placement').length;
  const pendingEnrollmentsCount = enrollmentRequests.filter(r => r.status === 'Pending Verification').length;

  const handleExportCSV = () => {
    soundFx.playClick();
    const csvContent = pbsAdminStore.exportStudentsToCSV();
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `PBS_Students_Roster_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setExportNotice('Student roster exported to CSV successfully.');
    setTimeout(() => setExportNotice(null), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col selection:bg-emerald-200 selection:text-emerald-900">
      
      {/* ================= TOP INSTITUTIONAL HEADER (GREEN & WHITE THEME) ================= */}
      <header className="bg-emerald-950/90 backdrop-blur-xl text-white shadow-md sticky top-0 z-40 border-b border-emerald-800/50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row items-center justify-between gap-3">
          
          {/* Logo & Portal Badge */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-white text-emerald-800 flex items-center justify-center font-black text-xl shadow-md ring-2 ring-emerald-400/30">
                P
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-base tracking-tight text-white">PRAGMATIC BIM SOLUTION</span>
                  <span className="bg-emerald-500/30 text-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-400/30">
                    Admin Executive Suite
                  </span>
                </div>
                <div className="text-[11px] text-emerald-200/80 font-medium">
                  ISO 19650 Corporate Academy • Global Academic Controller
                </div>
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={onLogout}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors cursor-pointer"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Controls & Quick Access */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end flex-wrap">
            
            {/* JSON Database Backup & Restore Modal Trigger */}
            <button
              onClick={() => {
                soundFx.playClick();
                setShowBackupModal(true);
              }}
              className="px-3.5 py-1.5 rounded-xl bg-teal-600/80 hover:bg-teal-600 text-white text-xs font-bold flex items-center gap-1.5 transition-colors border border-teal-400/40 cursor-pointer shadow-2xs"
              title="Export, Import, Backup and Restore full database in JSON format"
            >
              <FolderArchive className="w-3.5 h-3.5 text-teal-200" />
              <span>JSON Backup & Restore</span>
            </button>

            {onSwitchToStudentView && (
              <button
                onClick={() => {
                  soundFx.playClick();
                  onSwitchToStudentView();
                }}
                className="px-3.5 py-1.5 rounded-xl bg-emerald-600/60 hover:bg-emerald-600 text-emerald-100 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-colors border border-emerald-500/40 cursor-pointer shadow-2xs"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>View Student LMS</span>
              </button>
            )}

            <button
              onClick={handleExportCSV}
              className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-emerald-100 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-colors border border-white/20 cursor-pointer shadow-2xs"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-300" />
              <span>Export CSV</span>
            </button>

            <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-emerald-700/60">
              <div className="text-right">
                <div className="text-xs font-bold text-white">Super Administrator</div>
                <div className="text-[10px] text-emerald-200/80">admin@pbs.com</div>
              </div>
              <div className="w-8 h-8 rounded-full bg-white text-emerald-800 font-bold text-xs flex items-center justify-center border-2 border-emerald-400">
                SA
              </div>
            </div>

            <button
              onClick={() => {
                soundFx.playClick();
                onLogout();
              }}
              className="hidden md:flex px-3 py-1.5 rounded-xl bg-rose-600/80 hover:bg-rose-600 text-white text-xs font-bold items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>

          </div>

        </div>

        {/* Global Navigation Tabs (Clean Green & White Navigation) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1 overflow-x-auto no-scrollbar border-t border-emerald-700/40 pt-1 pb-1">
          {[
            { id: 'students', label: 'Students Roster & Control', icon: Users, count: students.length },
            { id: 'courses', label: 'Course Curriculum & Videos', icon: BookOpen, count: courses.length },
            { 
              id: 'enrollments', 
              label: 'UPI Enrollments & Approvals', 
              icon: CreditCard, 
              badge: pendingEnrollmentsCount > 0 ? `${pendingEnrollmentsCount} Pending (24h SLA)` : undefined,
              count: enrollmentRequests.length
            },
            { id: 'placements', label: 'MNC Placements & Interviews', icon: Briefcase, count: placementReadyCount },
            { id: 'financials', label: 'Fee Accounting & Dues', icon: IndianRupee, badge: `₹${(totalPendingBalance / 1000).toFixed(0)}k Due` },
            { id: 'qa', label: 'Q&A & Student Messaging', icon: MessageSquare, count: 1 }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  soundFx.playClick();
                  setActiveTab(tab.id as any);
                }}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-white text-emerald-800 shadow-md font-extrabold'
                    : 'text-emerald-100/90 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-700' : 'text-emerald-300'}`} />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-emerald-950/60 text-emerald-200'
                  }`}>
                    {tab.count}
                  </span>
                )}
                {tab.badge && (
                  <span className="text-[10px] bg-amber-400 text-amber-950 font-black px-1.5 py-0.2 rounded-full">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </header>

      {/* ================= MAIN CONTAINER ================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full space-y-6">
        
        {/* Export Toast Notification */}
        {exportNotice && (
          <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-sm animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{exportNotice}</span>
          </div>
        )}

        {/* ================= TAB 1: STUDENT ROSTER & CONTROLS ================= */}
        {activeTab === 'students' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Top KPI Cards (Green & White Theme) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              <div className="bg-white p-5 rounded-3xl border border-emerald-100 shadow-sm flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Active Students</div>
                  <div className="text-2xl font-black text-slate-900 mt-1">{students.length} Enrolled</div>
                  <div className="text-[11px] text-emerald-700 font-semibold mt-0.5">Pravin Yadav Active</div>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold border border-emerald-200">
                  <Users className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-emerald-100 shadow-sm flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Fee Collection</div>
                  <div className="text-2xl font-black text-emerald-700 mt-1">
                    ₹{totalRevenueCollected.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[11px] text-slate-500 font-semibold mt-0.5">
                    {fullyPaidCount} of {students.length} Students Fully Paid
                  </div>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold border border-emerald-200">
                  <IndianRupee className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-rose-100 shadow-sm flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Pending Dues</div>
                  <div className="text-2xl font-black text-rose-600 mt-1">
                    ₹{totalPendingBalance.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[11px] text-rose-500 font-semibold mt-0.5">Balance across cohorts</div>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold border border-rose-200">
                  <AlertCircle className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-emerald-100 shadow-sm flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Placement Pipeline</div>
                  <div className="text-2xl font-black text-amber-600 mt-1">
                    {placementReadyCount} Candidates
                  </div>
                  <div className="text-[11px] text-amber-700 font-semibold mt-0.5">MNC Shortlists & Interviews</div>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold border border-amber-200">
                  <Briefcase className="w-6 h-6" />
                </div>
              </div>

            </div>

            {/* Action Bar & Search Filters */}
            <div className="bg-white p-4 rounded-3xl border border-emerald-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
              
              <div className="flex flex-1 items-center gap-3 w-full md:w-auto">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by student name, roll no, email, or course..."
                    className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800"
                  />
                </div>

                <select
                  value={filterFee}
                  onChange={(e) => setFilterFee(e.target.value)}
                  className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-700 font-medium"
                >
                  <option value="all">All Payment Statuses</option>
                  <option value="Full Paid">Full Paid</option>
                  <option value="Part Paid">Part Paid</option>
                  <option value="Pending">Pending Dues</option>
                </select>
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                <button
                  onClick={() => setShowAddCourseModal(true)}
                  className="px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <BookOpen className="w-4 h-4 text-emerald-700" />
                  <span>+ Add New Course</span>
                </button>

                <button
                  onClick={() => setShowAddStudentModal(true)}
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-emerald-700/20 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Enroll New Student</span>
                </button>
              </div>

            </div>

            {/* Students Roster Grid */}
            <div className="grid grid-cols-1 gap-4">
              {filteredStudents.map((s) => (
                <div
                  key={s.studentId}
                  className="bg-white border border-emerald-100 rounded-3xl p-5 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all space-y-4"
                >
                  {/* Top Bar with Avatar, Basic Info, and Quick Action Badges */}
                  <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                    
                    <div className="flex items-center gap-4">
                      <img
                        src={s.avatar}
                        alt={s.name}
                        className="w-14 h-14 rounded-2xl object-cover border-2 border-emerald-200 shadow-xs"
                      />
                      <div>
                        <div className="flex items-center gap-2.5">
                          <h3 className="text-base font-extrabold text-slate-900">{s.name}</h3>
                          <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full text-[10px] font-bold">
                            {s.rollNumber}
                          </span>
                          <span className="px-2.5 py-0.5 bg-slate-100 text-slate-700 rounded-full text-[10px] font-semibold">
                            {s.batch}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1">
                          <span className="font-mono text-emerald-700 font-bold">{s.email}</span>
                          <span>•</span>
                          <span>{s.phone}</span>
                          <span>•</span>
                          <span className="text-slate-700 font-semibold">{s.specialization}</span>
                        </div>
                      </div>
                    </div>

                    {/* Password & Security Quick Actions */}
                    <div className="flex flex-wrap items-center gap-2">
                      
                      {onSwitchToStudentView && (
                        <button
                          onClick={() => {
                            soundFx.playClick();
                            onSwitchToStudentView(s);
                          }}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                          title="Open LMS View for this student"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View LMS</span>
                        </button>
                      )}

                      <button
                        onClick={() => {
                          soundFx.playClick();
                          const jsonStr = pbsAdminStore.exportStudentDossierJSON(s.studentId);
                          if (jsonStr) {
                            const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8;' });
                            const url = URL.createObjectURL(blob);
                            const link = document.createElement('a');
                            link.href = url;
                            link.download = `PBS_Student_Dossier_${s.name.replace(/\s+/g, '_')}_${s.studentId}.json`;
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                            URL.revokeObjectURL(url);
                            setExportNotice(`Exported complete JSON dossier for ${s.name}`);
                            setTimeout(() => setExportNotice(null), 4000);
                          }
                        }}
                        className="px-3 py-1.5 bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                        title="Download entire academic profile & records in JSON format"
                      >
                        <Download className="w-3.5 h-3.5 text-teal-600" />
                        <span>JSON Dossier</span>
                      </button>

                      <button
                        onClick={() => {
                          soundFx.playClick();
                          setSelectedStudentForPassword(s);
                        }}
                        className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                      >
                        <KeyRound className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Manage Access/Pwd</span>
                      </button>

                      <button
                        onClick={() => {
                          soundFx.playClick();
                          setSelectedStudentForMessage(s);
                        }}
                        className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Send Message / Q&A</span>
                      </button>

                      <button
                        onClick={() => {
                          soundFx.playClick();
                          setSelectedStudentForGrowth(s);
                        }}
                        className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                      >
                        <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Review Growth</span>
                      </button>

                      {s.studentId !== 'PBS-STU-2026-8492' && (
                        <button
                          onClick={() => {
                            if (window.confirm(`Are you sure you want to remove student "${s.name}" (${s.rollNumber})?`)) {
                              soundFx.playClick();
                              pbsAdminStore.deleteStudent(s.studentId);
                              refreshData();
                            }
                          }}
                          className="px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer shadow-2xs"
                          title="Remove Student"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                  </div>

                  {/* 4 Multi-Control Detail Cards (Green & White Style) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                    
                    {/* 1. Fee Status Card */}
                    <div className="p-3.5 bg-slate-50/80 rounded-2xl border border-slate-200/80 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Fee Accounting</span>
                        <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                          s.paymentStatus === 'Full Paid'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {s.paymentStatus}
                        </span>
                      </div>
                      
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span className="text-slate-500">Total Fee:</span>
                          <span className="font-bold text-slate-800">₹{(s.totalFee || 0).toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Paid Amount:</span>
                          <span className="font-bold text-emerald-700">₹{(s.paidAmount || 0).toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between border-t border-slate-200 pt-1">
                          <span className="text-slate-600 font-medium">Pending Dues:</span>
                          <span className="font-extrabold text-rose-600">₹{(s.pendingBalance || 0).toLocaleString('en-IN')}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          soundFx.playClick();
                          setSelectedStudentForFee(s);
                        }}
                        className="w-full mt-2 py-1.5 bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-2xs"
                      >
                        + Record Payment
                      </button>
                    </div>

                    {/* 2. Course Enrollments Card */}
                    <div className="p-3.5 bg-slate-50/80 rounded-2xl border border-slate-200/80 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Enrolled Courses</span>
                        <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                          {s.enrolledCourseIds.length} Active
                        </span>
                      </div>

                      <div className="space-y-1.5 max-h-24 overflow-y-auto">
                        {s.enrolledCourseTitles.map((title, idx) => (
                          <div key={idx} className="text-xs text-slate-800 font-medium flex items-center gap-1.5">
                            <BookOpen className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span className="truncate">{title}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center gap-1.5 pt-1">
                        <button
                          onClick={() => {
                            setSelectedCourseForVideo('c1');
                            setShowAddVideoModal(true);
                          }}
                          className="w-full py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-xs"
                        >
                          + Add Video Lesson
                        </button>
                      </div>
                    </div>

                    {/* 3. Academic Growth & Project Audit Card */}
                    <div className="p-3.5 bg-slate-50/80 rounded-2xl border border-slate-200/80 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Growth & Capstone</span>
                        <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                          {s.growthScore} XP
                        </span>
                      </div>

                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span className="text-slate-500">Live Attendance:</span>
                          <span className="font-bold text-emerald-700">{s.attendancePercent}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Grade:</span>
                          <span className="font-bold text-slate-800">{s.capstoneGrade}</span>
                        </div>
                        <div className="text-[11px] text-slate-600 font-medium truncate pt-1 border-t border-slate-200">
                          {s.capstoneStatus}
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          soundFx.playClick();
                          setSelectedStudentForGrowth(s);
                        }}
                        className="w-full mt-2 py-1.5 bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-2xs"
                      >
                        Update Evaluation
                      </button>
                    </div>

                    {/* 4. Placement & MNC Pipeline Card */}
                    <div className="p-3.5 bg-slate-50/80 rounded-2xl border border-slate-200/80 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Placement Status</span>
                        <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full truncate max-w-[120px]">
                          {s.placement?.readinessStatus || 'In Training'}
                        </span>
                      </div>

                      <div className="space-y-1 text-xs">
                        <div className="text-slate-700 font-semibold truncate">
                          🎯 {s.placement?.targetRole || 'BIM Engineer'}
                        </div>
                        <div className="text-slate-500 text-[11px]">
                          💰 {s.placement?.expectedSalary || '₹14.5 - ₹18.0 LPA'}
                        </div>
                        <div className="text-emerald-700 font-bold text-[11px]">
                          🏢 {s.placement?.referredCompanies?.length || 0} Referred Companies
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          soundFx.playClick();
                          setSelectedStudentForPlacement(s);
                        }}
                        className="w-full mt-2 py-1.5 bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-2xs"
                      >
                        Manage MNC Pipeline
                      </button>
                    </div>

                  </div>

                </div>
              ))}
            </div>

          </div>
        )}

        {/* ================= TAB 2: COURSE CURRICULUM & VIDEOS ================= */}
        {activeTab === 'courses' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Header & Quick Action */}
            <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-emerald-700" />
                  <span>Curriculum Management & Cloud Video Stream Manager</span>
                </h2>
                <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
                  Add new BIM courses, update syllabus modules, attach <strong>Microsoft OneDrive / SharePoint</strong> and <strong>Google Drive</strong> video links. Integrated anti-download DRM ensures students stream without downloading raw MP4 files.
                </p>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => setShowAiCourseCreatorModal(true)}
                  className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-xl text-xs font-black flex items-center gap-1.5 transition-all shadow-md shadow-indigo-600/30 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
                  <span>AI Course Studio & 10-Module Builder</span>
                </button>

                <button
                  onClick={() => setShowAddVideoModal(true)}
                  className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Video className="w-4 h-4 text-emerald-700" />
                  <span>+ Attach Video Lesson</span>
                </button>

                <button
                  onClick={() => {
                    setCourseToEdit(null);
                    setShowAddCourseModal(true);
                  }}
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-emerald-700/20 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Add New Course</span>
                </button>
              </div>
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {courses.map((c) => {
                const totalVideosCount = c.modules.reduce((acc, m) => acc + m.lessons.length, 0);

                return (
                  <div
                    key={c.id}
                    className="bg-white border border-emerald-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* Course Image Header */}
                      <div className="h-44 relative overflow-hidden bg-slate-100">
                        <img
                          src={c.thumbnail}
                          alt={c.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
                          <div className="space-y-1">
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-600 text-white uppercase tracking-wider shadow-sm">
                              {c.category} • {c.level}
                            </span>
                            <div className="text-white font-extrabold text-sm drop-shadow-sm">
                              Fee: ₹{c.totalFee.toLocaleString('en-IN')}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Course Content Info */}
                      <div className="p-5 space-y-3">
                        <h3 className="font-extrabold text-base text-slate-900 leading-snug">
                          {c.title}
                        </h3>
                        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                          {c.description}
                        </p>

                        <div className="text-[11px] text-slate-600 space-y-1 pt-1 border-t border-slate-100">
                          <div className="flex items-center justify-between">
                            <span>Instructor:</span>
                            <span className="font-bold text-slate-900">{c.instructor}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Schedule:</span>
                            <span className="text-slate-800 font-medium">{c.batchSchedule}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Target Audience:</span>
                            <span className="text-emerald-700 font-bold">
                              {c.assignedTo === 'all' ? 'All Enrolled Students' : `Student ID: ${c.assignedTo}`}
                            </span>
                          </div>
                        </div>

                        {/* Video Lessons List in this Course */}
                        <div className="space-y-2 pt-2">
                          <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                            <span className="flex items-center gap-1.5">
                              <Video className="w-3.5 h-3.5 text-emerald-700" />
                              <span>Course Video Lessons ({totalVideosCount})</span>
                            </span>
                            <button
                              onClick={() => {
                                setSelectedCourseForVideo(c.id);
                                setShowAddVideoModal(true);
                              }}
                              className="text-[10px] text-emerald-700 hover:text-emerald-800 font-bold cursor-pointer"
                            >
                              + Add Video Link
                            </button>
                          </div>

                          {c.modules.length > 0 ? (
                            <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                              {c.modules.map((m) => (
                                <div key={m.id} className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                                  <div className="font-bold text-slate-800 flex items-center justify-between">
                                    <span>{m.moduleCode}: {m.title}</span>
                                    <span className="text-[10px] text-slate-500">{m.lessons.length} videos</span>
                                  </div>
                                  {m.lessons.map((les) => (
                                    <div key={les.id} className="mt-1 flex items-center justify-between text-[11px] text-slate-600 pl-2 border-l border-emerald-300">
                                      <span className="truncate pr-2">{les.title}</span>
                                      <span className="text-[10px] font-mono text-emerald-700 font-bold shrink-0">{les.duration}</span>
                                    </div>
                                  ))}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="p-3 bg-slate-50 rounded-xl border border-dashed border-slate-200 text-center text-xs text-slate-500">
                              No video lessons added yet. Click "+ Add Video Link" to attach Microsoft Drive or Google Drive links.
                            </div>
                          )}
                        </div>

                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-slate-500">Created: {c.createdDate}</span>
                      <button
                        onClick={() => {
                          setCourseToEdit(c);
                          setShowAddCourseModal(true);
                        }}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold transition-colors cursor-pointer shadow-xs"
                      >
                        Modify Course
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* ================= TAB: UPI ENROLLMENTS & COURSE APPROVALS ================= */}
        {activeTab === 'enrollments' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Header */}
            <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-300">
                    UPI Payment Gateway Sync
                  </span>
                  <span className="text-xs text-amber-700 font-bold flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> 24-Hour Verification SLA
                  </span>
                </div>
                <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2 mt-1">
                  <CreditCard className="w-5 h-5 text-emerald-700" />
                  <span>Student UPI Course Enrollments & Fee Approvals</span>
                </h2>
                <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
                  Students scan the dynamic QR code to pay fees directly to <strong className="text-slate-900 font-mono bg-slate-100 px-1.5 py-0.5 rounded border border-slate-300">pravinsyadavpsy99-03@oksbi</strong> via GPay/PhonePe/Paytm and submit their 12-digit UTR Transaction ID. Verify bank credit and assign courses to student profiles with 1 click.
                </p>
              </div>

              {/* Status Filter Badges */}
              <div className="flex items-center gap-2 flex-wrap">
                {[
                  { id: 'all', label: 'All Requests' },
                  { id: 'Pending Verification', label: `Pending (${pendingEnrollmentsCount})` },
                  { id: 'Approved & Assigned', label: 'Approved & Assigned' },
                  { id: 'Rejected', label: 'Rejected' }
                ].map((st) => (
                  <button
                    key={st.id}
                    onClick={() => setFilterEnrollmentStatus(st.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                      filterEnrollmentStatus === st.id
                        ? 'bg-emerald-800 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>
            </div>

            {/* List of Enrollment Requests */}
            {enrollmentRequests
              .filter(r => filterEnrollmentStatus === 'all' || r.status === filterEnrollmentStatus)
              .length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-xs space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
                  <CreditCard className="w-6 h-6" />
                </div>
                <div className="text-sm font-bold text-slate-800">No Enrollment Requests Found</div>
                <div className="text-xs text-slate-500 max-w-md mx-auto">
                  Students who scan the UPI QR code and submit their UTR transaction details from the course catalog will appear here immediately for admin approval.
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {enrollmentRequests
                  .filter(r => filterEnrollmentStatus === 'all' || r.status === filterEnrollmentStatus)
                  .map((req) => {
                    const isPending = req.status === 'Pending Verification';
                    const isApproved = req.status === 'Approved & Assigned';
                    const isRejected = req.status === 'Rejected';

                    return (
                      <div
                        key={req.id}
                        className={`bg-white rounded-3xl p-5 border transition-all shadow-xs hover:shadow-md flex flex-col justify-between space-y-4 ${
                          isPending
                            ? 'border-amber-300 ring-2 ring-amber-400/20'
                            : isApproved
                            ? 'border-emerald-200'
                            : 'border-slate-200 opacity-75'
                        }`}
                      >
                        <div className="space-y-3">
                          
                          {/* Request Header */}
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                                isPending
                                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                  : isApproved
                                  ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                                  : 'bg-rose-100 text-rose-900 border border-rose-300'
                              }`}>
                                {isPending ? '⏳ Awaiting 24h Verification' : isApproved ? '✅ Verified & Assigned' : '❌ Rejected'}
                              </span>
                              <h3 className="font-extrabold text-slate-900 text-sm mt-2">{req.studentName}</h3>
                              <div className="text-[11px] text-slate-500 font-mono">{req.studentEmail} • {req.studentPhone}</div>
                            </div>

                            <div className="text-right">
                              <div className="text-sm font-black text-emerald-800">
                                ₹{req.amountPaid.toLocaleString('en-IN')}
                              </div>
                              <span className="text-[10px] text-slate-500 uppercase font-semibold">
                                {req.planSelected}
                              </span>
                            </div>
                          </div>

                          {/* Course Requested */}
                          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                            <div className="text-[10px] uppercase font-bold text-slate-500">Requested Course</div>
                            <div className="text-xs font-bold text-slate-900">{req.courseTitle}</div>
                            <div className="text-[10px] text-indigo-600 font-bold">{req.category}</div>
                          </div>

                          {/* UPI & UTR Verification Details */}
                          <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-2xl space-y-1.5 text-xs">
                            <div className="flex items-center justify-between">
                              <span className="text-slate-600 text-[11px]">UPI Beneficiary:</span>
                              <span className="font-mono font-bold text-slate-900 text-[11px]">{req.upiIdUsed}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-slate-600 text-[11px]">UTR / Ref No:</span>
                              <span className="font-mono font-extrabold text-indigo-900 text-xs bg-white px-2 py-0.5 rounded border border-indigo-200">
                                {req.utrNumber}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-slate-600 text-[11px]">Submitted On:</span>
                              <span className="text-slate-700 text-[10px]">{req.submittedDate}</span>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                          {isPending ? (
                            <>
                              <button
                                type="button"
                                onClick={() => {
                                  if (window.confirm(`Approve payment of ₹${req.amountPaid} for ${req.studentName} and assign "${req.courseTitle}" to their student profile?`)) {
                                    soundFx.playClick();
                                    pbsAdminStore.approveEnrollmentRequest(req.id);
                                    refreshData();
                                    setExportNotice(`Payment verified! "${req.courseTitle}" assigned to ${req.studentName}.`);
                                    setTimeout(() => setExportNotice(null), 4000);
                                  }
                                }}
                                className="flex-1 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl text-xs font-black flex items-center justify-center gap-1.5 shadow-md shadow-emerald-700/20 transition-all cursor-pointer"
                              >
                                <CheckCircle className="w-3.5 h-3.5" />
                                <span>Approve & Assign Course</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  const reason = window.prompt('Please enter the reason for rejection (e.g. UTR not found in bank statement, amount mismatch):', 'UTR transaction could not be reconciled in bank statement.');
                                  if (reason) {
                                    soundFx.playClick();
                                    pbsAdminStore.rejectEnrollmentRequest(req.id, reason);
                                    refreshData();
                                  }
                                }}
                                className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl transition-colors cursor-pointer"
                                title="Reject Request"
                              >
                                <XCircle className="w-4 h-4" />
                              </button>
                            </>
                          ) : isApproved ? (
                            <div className="w-full py-2 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-bold text-center border border-emerald-200 flex items-center justify-center gap-1.5">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                              <span>Course Live on Student LMS</span>
                            </div>
                          ) : (
                            <div className="w-full py-2 bg-rose-50 text-rose-800 rounded-xl text-xs font-medium text-center border border-rose-200 truncate">
                              Rejected: {req.adminNotes || 'Payment not verified'}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 3: PLACEMENTS & MNC INTERVIEW PIPELINE ================= */}
        {activeTab === 'placements' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Header */}
            <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-amber-600" />
                  <span>MNC Placement & Technical Interview Assistance Hub</span>
                </h2>
                <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
                  Track students post-course completion, schedule technical mock interviews, verify portfolios for ISO 19650 standards, and dispatch candidate profiles to top engineering consultants in Dubai, UK, and India.
                </p>
              </div>

              <button
                onClick={handleExportCSV}
                className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors"
              >
                <FileSpreadsheet className="w-4 h-4 text-emerald-700" />
                <span>Export Placement Registry</span>
              </button>
            </div>

            {/* Placement Candidates Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {students.map((s) => {
                const plc = s.placement;
                return (
                  <div
                    key={s.studentId}
                    className="bg-white border border-emerald-100 rounded-3xl p-5 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      
                      {/* Candidate Header */}
                      <div className="flex items-center gap-3">
                        <img
                          src={s.avatar}
                          alt={s.name}
                          className="w-12 h-12 rounded-2xl object-cover border border-emerald-200 shadow-2xs"
                        />
                        <div>
                          <h3 className="font-extrabold text-slate-900 text-sm">{s.name}</h3>
                          <div className="text-[11px] text-emerald-700 font-mono font-bold">{s.email}</div>
                          <div className="text-[10px] text-slate-500">{s.phone}</div>
                        </div>
                      </div>

                      {/* Readiness Badge */}
                      <div className="p-2.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between text-xs">
                        <span className="text-slate-600 font-medium">Readiness:</span>
                        <span className={`font-bold px-2 py-0.5 rounded-full text-[10px] ${
                          plc?.readinessStatus === 'Ready for MNC Placement'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            : plc?.readinessStatus === 'Offer Received'
                            ? 'bg-amber-100 text-amber-800 border border-amber-200'
                            : 'bg-slate-100 text-slate-700'
                        }`}>
                          {plc?.readinessStatus || 'In Training'}
                        </span>
                      </div>

                      {/* Technical Mock Score & Target Role */}
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                          <span className="text-[10px] text-slate-500 block">Mock Interview</span>
                          <span className="font-extrabold text-amber-700 mt-0.5 block">
                            {plc?.mockInterviewScore || 85}/100 Grade
                          </span>
                        </div>
                        <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                          <span className="text-[10px] text-slate-500 block">Resume Audit</span>
                          <span className="font-extrabold text-emerald-700 mt-0.5 block">
                            {plc?.resumeStatus || 'Verified'}
                          </span>
                        </div>
                      </div>

                      {/* Target Role & Salary */}
                      <div className="text-xs space-y-1 pt-1">
                        <div className="text-slate-800 font-semibold truncate">
                          🎯 {plc?.targetRole || 'BIM Engineer'}
                        </div>
                        <div className="text-slate-500 text-[11px]">
                          💰 Expected: {plc?.expectedSalary || '₹14.5 - ₹18.0 LPA'}
                        </div>
                      </div>

                      {/* Referred Companies List */}
                      <div className="space-y-1.5 pt-2 border-t border-slate-100">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                          Company Referral Pipeline ({plc?.referredCompanies?.length || 0})
                        </span>
                        {plc?.referredCompanies && plc.referredCompanies.length > 0 ? (
                          <div className="space-y-1">
                            {plc.referredCompanies.slice(0, 2).map((comp, i) => (
                              <div
                                key={i}
                                className="p-2 bg-slate-50 rounded-xl text-[11px] flex items-center justify-between border border-slate-200"
                              >
                                <span className="font-semibold text-slate-800 truncate pr-2">{comp.companyName}</span>
                                <span className="text-[9px] font-bold text-emerald-700 shrink-0">{comp.status}</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-[10px] text-slate-400 italic">No referrals added yet</div>
                        )}
                      </div>

                    </div>

                    {/* Manage Placement Button */}
                    <button
                      onClick={() => {
                        soundFx.playClick();
                        setSelectedStudentForPlacement(s);
                      }}
                      className="w-full py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-800 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border border-slate-200 cursor-pointer shadow-2xs"
                    >
                      <Briefcase className="w-3.5 h-3.5 text-amber-600" />
                      <span>Manage Placement & Referrals</span>
                    </button>

                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* ================= TAB 4: FEE ACCOUNTING & RECEIPTS ================= */}
        {activeTab === 'financials' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Header & Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-3xl border border-emerald-100 shadow-sm">
                <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Total Billed Fees</div>
                <div className="text-2xl font-black text-slate-900 mt-1">
                  ₹{(students.reduce((acc, s) => acc + (s.totalFee || 0), 0) || 0).toLocaleString('en-IN')}
                </div>
                <div className="text-[11px] text-slate-500 mt-1">Across all registered cohorts</div>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-emerald-100 shadow-sm">
                <div className="text-xs text-emerald-700 font-bold uppercase tracking-wider">Collected Revenue</div>
                <div className="text-2xl font-black text-emerald-700 mt-1">
                  ₹{(totalRevenueCollected || 0).toLocaleString('en-IN')}
                </div>
                <div className="text-[11px] text-emerald-600 mt-1">Bank, UPI & Offline receipts</div>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-rose-100 shadow-sm">
                <div className="text-xs text-rose-600 font-bold uppercase tracking-wider">Total Pending Dues</div>
                <div className="text-2xl font-black text-rose-600 mt-1">
                  ₹{(totalPendingBalance || 0).toLocaleString('en-IN')}
                </div>
                <div className="text-[11px] text-rose-500 mt-1">Installment balance to collect</div>
              </div>
            </div>

            {/* Financial Ledger Table */}
            <div className="bg-white border border-emerald-100 rounded-3xl overflow-hidden shadow-sm">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                  <IndianRupee className="w-4 h-4 text-emerald-700" />
                  <span>Student Fee Accounting Ledger</span>
                </h3>
                <button
                  onClick={handleExportCSV}
                  className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Export Spreadsheet</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] tracking-wider font-extrabold border-b border-slate-200">
                    <tr>
                      <th className="px-5 py-3.5">Student Name</th>
                      <th className="px-4 py-3.5">Course Specialization</th>
                      <th className="px-4 py-3.5">Total Fee</th>
                      <th className="px-4 py-3.5">Paid Amount</th>
                      <th className="px-4 py-3.5">Pending Dues</th>
                      <th className="px-4 py-3.5">Status</th>
                      <th className="px-5 py-3.5 text-right">Record Payment</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {students.map((s) => (
                      <tr key={s.studentId} className="hover:bg-slate-50/80 transition-colors">
                        <td className="px-5 py-4">
                          <div className="font-bold text-slate-900">{s.name}</div>
                          <div className="font-mono text-[10px] text-slate-500">{s.email}</div>
                        </td>
                        <td className="px-4 py-4 text-slate-700 font-medium">
                          {s.specialization}
                        </td>
                        <td className="px-4 py-4 font-bold text-slate-800">
                          ₹{(s.totalFee || 0).toLocaleString('en-IN')}
                        </td>
                        <td className="px-4 py-4 font-bold text-emerald-700">
                          ₹{(s.paidAmount || 0).toLocaleString('en-IN')}
                        </td>
                        <td className="px-4 py-4 font-black text-rose-600">
                          ₹{(s.pendingBalance || 0).toLocaleString('en-IN')}
                        </td>
                        <td className="px-4 py-4">
                          <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                            s.paymentStatus === 'Full Paid'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            {s.paymentStatus}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => {
                                soundFx.playClick();
                                setSelectedStudentForHistory(s);
                              }}
                              className="px-3 py-1.5 bg-white hover:bg-slate-50 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs"
                            >
                              History
                            </button>
                            <button
                              onClick={() => {
                                soundFx.playClick();
                                setSelectedStudentForFee(s);
                              }}
                              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs"
                            >
                              + Record Payment
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ================= TAB 5: Q&A & STUDENT COMMUNICATION ================= */}
        {activeTab === 'qa' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Header */}
            <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-sm flex items-center justify-between">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-emerald-700" />
                  <span>Student Q&A & Academic Communication Desk</span>
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  Respond to student queries, assignment doubts, and broadcast announcements directly to student dashboards.
                </p>
              </div>
            </div>

            {/* Student Message Threads Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {students.map((s) => (
                <div
                  key={s.studentId}
                  className="bg-white border border-emerald-100 rounded-3xl p-5 shadow-sm space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={s.avatar}
                        alt={s.name}
                        className="w-10 h-10 rounded-2xl object-cover border border-emerald-200"
                      />
                      <div>
                        <div className="font-extrabold text-slate-900 text-sm">{s.name}</div>
                        <div className="text-[10px] text-emerald-700 font-mono font-bold">{s.email}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        soundFx.playClick();
                        setSelectedStudentForMessage(s);
                      }}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Reply / Message</span>
                    </button>
                  </div>

                  {/* Messages History List */}
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {s.messages && s.messages.length > 0 ? (
                      s.messages.map((m) => (
                        <div
                          key={m.id}
                          className={`p-3 rounded-2xl text-xs border ${
                            m.sender === 'admin'
                              ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950 ml-4'
                              : 'bg-slate-50 border-slate-200 text-slate-800 mr-4'
                          }`}
                        >
                          <div className="flex items-center justify-between text-[10px] font-bold opacity-75 mb-1">
                            <span>{m.senderName} ({m.sender === 'admin' ? 'Admin' : 'Student'})</span>
                            <span>{m.timestamp}</span>
                          </div>
                          <div className="font-bold text-slate-900">{m.subject}</div>
                          <div className="text-[11px] text-slate-700 mt-1 leading-relaxed">{m.message}</div>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 bg-slate-50 rounded-2xl text-center text-xs text-slate-400 italic">
                        No previous messages. Click "Reply / Message" to start a conversation.
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

      </main>

      {/* ================= MODAL MOUNT POINTS ================= */}
      
      {showAddStudentModal && (
        <AdminAddStudentModal
          onClose={() => setShowAddStudentModal(false)}
          onStudentAdded={refreshData}
        />
      )}

      {showAddCourseModal && (
        <AdminAddCourseModal
          courseToEdit={courseToEdit}
          studentsList={students}
          onClose={() => {
            setShowAddCourseModal(false);
            setCourseToEdit(null);
          }}
          onSaved={refreshData}
        />
      )}

      {showAddVideoModal && (
        <AdminAddVideoModal
          coursesList={courses}
          studentsList={students}
          initialCourseId={selectedCourseForVideo}
          onClose={() => {
            setShowAddVideoModal(false);
            setSelectedCourseForVideo(undefined);
          }}
          onSaved={refreshData}
        />
      )}

      {selectedStudentForPassword && (
        <AdminStudentPasswordModal
          student={selectedStudentForPassword}
          onClose={() => setSelectedStudentForPassword(null)}
          onPasswordUpdated={refreshData}
        />
      )}

      {selectedStudentForPlacement && (
        <AdminPlacementModal
          student={selectedStudentForPlacement}
          onClose={() => setSelectedStudentForPlacement(null)}
          onUpdated={refreshData}
        />
      )}

      {selectedStudentForFee && (
        <AdminRecordFeeModal
          student={selectedStudentForFee}
          onClose={() => setSelectedStudentForFee(null)}
          onUpdated={refreshData}
        />
      )}

      {selectedStudentForHistory && (
        <AdminPaymentHistoryModal
          student={selectedStudentForHistory}
          onClose={() => setSelectedStudentForHistory(null)}
        />
      )}

      {selectedStudentForGrowth && (
        <AdminStudentGrowthModal
          student={selectedStudentForGrowth}
          onClose={() => setSelectedStudentForGrowth(null)}
          onUpdated={refreshData}
        />
      )}

      {selectedStudentForMessage && (
        <AdminMessageStudentModal
          student={selectedStudentForMessage}
          onClose={() => setSelectedStudentForMessage(null)}
          onMessageSent={refreshData}
        />
      )}

      {showAiCourseCreatorModal && (
        <AdminAiCourseCreatorModal
          isOpen={showAiCourseCreatorModal}
          onClose={() => setShowAiCourseCreatorModal(false)}
          onCourseCreated={() => {
            refreshData();
            setExportNotice('New course launched and published successfully!');
            setTimeout(() => setExportNotice(null), 4000);
          }}
        />
      )}

      {showBackupModal && (
        <AdminDatabaseBackupModal
          isOpen={showBackupModal}
          onClose={() => setShowBackupModal(false)}
          onDataRestored={refreshData}
        />
      )}

    </div>
  );
};
