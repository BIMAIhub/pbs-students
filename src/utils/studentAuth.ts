/**
 * Student & Admin Authentication Registry Utility
 * Manages institutional credentials, role detection (Admin vs Student),
 * password verification, password updates, and persistent state.
 */

export interface StudentAuthRecord {
  studentId: string;
  rollNumber: string;
  fullName: string;
  institutionalEmail: string;
  personalEmail: string;
  phone: string;
  defaultPasswordHint: string;
  hasCustomPassword: boolean;
  lastPasswordChanged: string;
  specializationTrack: string;
  batchMonthYear: string; // e.g. "09/2026"
  attendancePercent: number;
  capstoneStatus: string;
  totalFee: number;
  paidFee: number;
  pendingFee: number;
  iso19650Code: string;
  placementStatus?: string;
  interviewReadiness?: string;
}

export type UserRole = 'student' | 'admin';

export interface ActiveSessionUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  phone?: string;
  studentId?: string;
  rollNumber?: string;
  specialization?: string;
  batch?: string;
  googleEmailId?: string;
}

const DEFAULT_STUDENT_EMAIL = 'pravin.yadav@pbs.com';
const DEFAULT_STUDENT_PASSWORD = 'pravinyadav@123';

const DEFAULT_ADMIN_EMAIL = 'admin@pbs.com';
const DEFAULT_ADMIN_PASSWORD = 'admin@123';

const STORAGE_STUDENT_PWD_KEY = 'pbs_student_custom_password';
const STORAGE_ADMIN_PWD_KEY = 'pbs_admin_custom_password';
const STORAGE_PWD_CHANGED_KEY = 'pbs_student_password_changed_date';
const STORAGE_AUTH_USER_KEY = 'pbs_active_authenticated_user';
const STORAGE_AUTH_LOGGED_IN_KEY = 'pbs_is_logged_in_state';

export const studentAuthUtil = {
  defaultEmail: DEFAULT_STUDENT_EMAIL,
  defaultPassword: DEFAULT_STUDENT_PASSWORD,
  adminEmail: DEFAULT_ADMIN_EMAIL,
  adminPassword: DEFAULT_ADMIN_PASSWORD,

  /**
   * Retrieves the active student password (custom if updated, else system default)
   */
  getActivePassword(): string {
    try {
      const customPwd = localStorage.getItem(STORAGE_STUDENT_PWD_KEY);
      if (customPwd && customPwd.trim().length > 0) {
        return customPwd;
      }
    } catch (e) {
      console.warn('Could not read custom password from storage:', e);
    }
    return DEFAULT_STUDENT_PASSWORD;
  },

  /**
   * Retrieves active admin password
   */
  getActiveAdminPassword(): string {
    try {
      const customPwd = localStorage.getItem(STORAGE_ADMIN_PWD_KEY);
      if (customPwd && customPwd.trim().length > 0) {
        return customPwd;
      }
    } catch {
      // fallback
    }
    return DEFAULT_ADMIN_PASSWORD;
  },

  /**
   * Check if the student has set a custom password
   */
  hasCustomPassword(): boolean {
    try {
      const customPwd = localStorage.getItem(STORAGE_STUDENT_PWD_KEY);
      return Boolean(customPwd && customPwd !== DEFAULT_STUDENT_PASSWORD);
    } catch {
      return false;
    }
  },

  /**
   * Returns when the password was last updated
   */
  getLastPasswordChangeDate(): string {
    try {
      const saved = localStorage.getItem(STORAGE_PWD_CHANGED_KEY);
      if (saved) return saved;
    } catch {}
    return 'Default Provisioned (Sept 01, 2026)';
  },

  /**
   * Verify input email & password for either Student or Admin
   */
  verifyCredentials(emailInput: string, passwordInput: string): { 
    success: boolean; 
    role?: UserRole; 
    user?: ActiveSessionUser; 
    message: string 
  } {
    const cleanEmail = emailInput.trim().toLowerCase();
    const cleanPwd = passwordInput.trim();

    // 1. Check for Admin Login (admin@pbs.com / admin@123)
    const adminEmails = [
      DEFAULT_ADMIN_EMAIL.toLowerCase(),
      'admin@pragmaticbim.com',
      'pravinsyadavpsy99@gmail.com' // Alternate admin access
    ];

    if (adminEmails.includes(cleanEmail)) {
      const activeAdminPwd = this.getActiveAdminPassword();
      if (cleanPwd === activeAdminPwd || cleanPwd === DEFAULT_ADMIN_PASSWORD) {
        const adminUser: ActiveSessionUser = {
          id: 'pbs-admin-super-01',
          name: 'Pravin Yadav (PBS Admin)',
          email: DEFAULT_ADMIN_EMAIL,
          role: 'admin',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
          phone: '+91 8208918726'
        };
        this.setActiveUser(adminUser);
        return {
          success: true,
          role: 'admin',
          user: adminUser,
          message: 'Admin Authentication verified! Welcome to PBS Management Center.'
        };
      }
    }

    // 2. Check for Student Login (pravin.yadav@pbs.com / pravinyadav@123 or dynamically provisioned students)
    const validStudentEmails = [
      DEFAULT_STUDENT_EMAIL.toLowerCase(),
      'pravin.yadav@pbs.com',
      'sneha.kulkarni.0826@pbs.com',
      'amit.deshmukh.0726@pbs.com'
    ];

    // 2. Check for Student Login in dynamic roster or defaults
    try {
      const storedRoster = localStorage.getItem('pbs_admin_student_roster');
      if (storedRoster) {
        const roster = JSON.parse(storedRoster);
        const match = roster.find((s: any) => 
          s.email?.toLowerCase() === cleanEmail ||
          s.rollNumber?.toLowerCase() === cleanEmail ||
          s.studentId?.toLowerCase() === cleanEmail
        );

        if (match) {
          const validPwd = match.password || this.getActivePassword() || DEFAULT_STUDENT_PASSWORD;
          if (cleanPwd === validPwd || cleanPwd === DEFAULT_STUDENT_PASSWORD || cleanPwd === this.getActivePassword()) {
            const studentUser: ActiveSessionUser = {
              id: match.id || match.studentId || 'pbs-stu-dyn',
              studentId: match.studentId || 'PBS-STU-2026-8492',
              rollNumber: match.rollNumber || 'PBS/2026/BIM-084',
              name: match.name,
              email: match.email,
              role: 'student',
              avatar: match.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(match.name)}`,
              phone: match.phone,
              specialization: match.specialization,
              batch: match.batch
            };
            this.setActiveUser(studentUser);
            return {
              success: true,
              role: 'student',
              user: studentUser,
              message: `Welcome back, ${match.name}! Signed into PBS LMS.`
            };
          } else {
            return {
              success: false,
              message: 'Invalid password. Please check your student credentials.'
            };
          }
        }
      }
    } catch (e) {
      console.warn('Error reading dynamic roster:', e);
    }

    if (!validStudentEmails.includes(cleanEmail) && !adminEmails.includes(cleanEmail)) {
      return {
        success: false,
        message: `Unrecognized student account. Please check your institutional email (${DEFAULT_STUDENT_EMAIL}) or enroll via Admin Portal.`
      };
    }

    const currentStudentPwd = this.getActivePassword();
    if (cleanPwd !== currentStudentPwd && cleanPwd !== DEFAULT_STUDENT_PASSWORD) {
      return {
        success: false,
        message: 'Invalid password. Please check your credentials.'
      };
    }

    const studentUser: ActiveSessionUser = {
      id: 'user-student-pravin',
      name: 'Pravin Yadav',
      email: cleanEmail,
      role: 'student',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      phone: '+91 8208918726'
    };
    this.setActiveUser(studentUser);

    return {
      success: true,
      role: 'student',
      user: studentUser,
      message: 'Student Authentication successful! Welcome to PBS Student LMS.'
    };
  },

  /**
   * Update student password and update storage / timestamp
   */
  updatePassword(oldPasswordInput: string, newPasswordInput: string): { success: boolean; message: string } {
    const currentPwd = this.getActivePassword();

    if (oldPasswordInput.trim() !== currentPwd && oldPasswordInput.trim() !== DEFAULT_STUDENT_PASSWORD) {
      return {
        success: false,
        message: 'Current password is incorrect. Please re-enter your existing password.'
      };
    }

    if (!newPasswordInput || newPasswordInput.length < 6) {
      return {
        success: false,
        message: 'New password must be at least 6 characters long.'
      };
    }

    try {
      localStorage.setItem(STORAGE_STUDENT_PWD_KEY, newPasswordInput.trim());
      const nowFormatted = new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
      localStorage.setItem(STORAGE_PWD_CHANGED_KEY, nowFormatted);
      return {
        success: true,
        message: 'Password changed successfully! Stored for future student login.'
      };
    } catch (e) {
      return {
        success: false,
        message: 'Failed to save updated password to local cache.'
      };
    }
  },

  /**
   * Set custom password directly for a student from admin
   */
  setStudentPasswordByAdmin(newPassword: string): boolean {
    try {
      localStorage.setItem(STORAGE_STUDENT_PWD_KEY, newPassword.trim());
      const nowFormatted = new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
      localStorage.setItem(STORAGE_PWD_CHANGED_KEY, nowFormatted);
      return true;
    } catch {
      return false;
    }
  },

  /**
   * Active User Session persistence
   */
  getActiveUser(): ActiveSessionUser {
    try {
      const stored = localStorage.getItem(STORAGE_AUTH_USER_KEY);
      if (stored) return JSON.parse(stored);
    } catch {}
    // Default to student Pravin Yadav
    return {
      id: 'user-student-pravin',
      name: 'Pravin Yadav',
      email: DEFAULT_STUDENT_EMAIL,
      role: 'student',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      phone: '+91 8208918726'
    };
  },

  updateCurrentUser(updates: Partial<ActiveSessionUser>): boolean {
    try {
      const current = this.getActiveUser();
      const updated = { ...current, ...updates };
      localStorage.setItem(STORAGE_AUTH_USER_KEY, JSON.stringify(updated));
      return true;
    } catch (e) {
      console.warn('Failed to update current user session', e);
      return false;
    }
  },

  setActiveUser(user: ActiveSessionUser): void {
    try {
      localStorage.setItem(STORAGE_AUTH_USER_KEY, JSON.stringify(user));
      localStorage.setItem(STORAGE_AUTH_LOGGED_IN_KEY, 'true');
    } catch {}
  },

  isLoggedIn(): boolean {
    try {
      const item = localStorage.getItem(STORAGE_AUTH_LOGGED_IN_KEY);
      return item === 'true';
    } catch {
      return false;
    }
  },

  setLoggedIn(state: boolean): void {
    try {
      localStorage.setItem(STORAGE_AUTH_LOGGED_IN_KEY, state ? 'true' : 'false');
      if (!state) {
        localStorage.removeItem(STORAGE_AUTH_USER_KEY);
      }
    } catch {}
  },

  /**
   * Generate student record for Excel / CSV export and in-app viewing
   */
  getStudentRecord(): StudentAuthRecord {
    const hasCustom = this.hasCustomPassword();
    return {
      studentId: 'PBS-STU-2026-8492',
      rollNumber: 'PBS/2026/BIM-084',
      fullName: 'Pravin Yadav',
      institutionalEmail: DEFAULT_STUDENT_EMAIL,
      personalEmail: 'pravinsyadavpsy99@gmail.com',
      phone: '+91 8208918726',
      defaultPasswordHint: hasCustom ? '●●●●●●●● (Custom User Updated)' : 'pravinyadav@123 (Default System)',
      hasCustomPassword: hasCustom,
      lastPasswordChanged: this.getLastPasswordChangeDate(),
      specializationTrack: 'Autodesk Revit MEP Masterclass (LOD 300 - 500)',
      batchMonthYear: '09/2026 (Sept 2026 Weekend Batch)',
      attendancePercent: 96.4,
      capstoneStatus: 'Stage 3: Navisworks Clash Matrix Submitted',
      totalFee: 41997,
      paidFee: 34498,
      pendingFee: 7499,
      iso19650Code: 'PBS-ISO-19650-VERIFIED-2026',
      placementStatus: 'Shortlisted for MNC Interview (Atkins / WSP)',
      interviewReadiness: 'Ready for Senior BIM Coordinator Role'
    };
  },

  /**
   * Export structured Student Record to Excel CSV
   */
  exportToExcelCSV(): void {
    const r = this.getStudentRecord();
    const headers = [
      'Student ID',
      'Roll Number',
      'Full Name',
      'Institutional Email',
      'Personal Email',
      'Phone Number',
      'Password Security Status',
      'Last Password Changed',
      'Specialization Track',
      'Batch Month/Year',
      'Attendance Rate',
      'Capstone Progress',
      'Total Fee (INR)',
      'Paid Fee (INR)',
      'Pending Balance (INR)',
      'ISO 19650 Verification Code',
      'Placement Assistance Status',
      'Interview Readiness'
    ];

    const row = [
      `"${r.studentId}"`,
      `"${r.rollNumber}"`,
      `"${r.fullName}"`,
      `"${r.institutionalEmail}"`,
      `"${r.personalEmail}"`,
      `"${r.phone}"`,
      `"${r.defaultPasswordHint}"`,
      `"${r.lastPasswordChanged}"`,
      `"${r.specializationTrack}"`,
      `"${r.batchMonthYear}"`,
      `"${r.attendancePercent}%"`,
      `"${r.capstoneStatus}"`,
      r.totalFee,
      r.paidFee,
      r.pendingFee,
      `"${r.iso19650Code}"`,
      `"${r.placementStatus || 'In Progress'}"`,
      `"${r.interviewReadiness || 'Level 4'}"`
    ];

    const csvContent = '\uFEFF' + [headers.join(','), row.join(',')].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `PBS_Student_Registry_${r.studentId}_${r.fullName.replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
};

function currentStudentStudentPwd(cleanPwd: string, currentStudentPwd: string): string {
  if (cleanPwd === currentStudentPwd) return cleanPwd;
  if (cleanPwd === DEFAULT_STUDENT_PASSWORD) return cleanPwd;
  return currentStudentPwd;
}
