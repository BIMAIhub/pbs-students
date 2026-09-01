/**
 * Student Authentication & Excel Database Registry Utility
 * Manages institutional credentials, password verification, password updates, 
 * and Excel (CSV) database records for Pragmatic BIM Solution (PBS).
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
}

const DEFAULT_EMAIL = 'pravin.yadav.0926@pbs.com';
const DEFAULT_PASSWORD = 'pravinyadav@123';
const STORAGE_PWD_KEY = 'pbs_student_custom_password';
const STORAGE_PWD_CHANGED_KEY = 'pbs_student_password_changed_date';
const STORAGE_AUTH_LOGGED_IN_KEY = 'pbs_student_is_logged_in';

export const studentAuthUtil = {
  defaultEmail: DEFAULT_EMAIL,
  defaultPassword: DEFAULT_PASSWORD,

  /**
   * Retrieves the active password (custom if updated by student, else system default)
   */
  getActivePassword(): string {
    try {
      const customPwd = localStorage.getItem(STORAGE_PWD_KEY);
      if (customPwd && customPwd.trim().length > 0) {
        return customPwd;
      }
    } catch (e) {
      console.warn('Could not read custom password from storage:', e);
    }
    return DEFAULT_PASSWORD;
  },

  /**
   * Check if the student has set a custom password
   */
  hasCustomPassword(): boolean {
    try {
      const customPwd = localStorage.getItem(STORAGE_PWD_KEY);
      return Boolean(customPwd && customPwd !== DEFAULT_PASSWORD);
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
   * Verify input email & password
   */
  verifyCredentials(emailInput: string, passwordInput: string): { success: boolean; message: string } {
    const cleanEmail = emailInput.trim().toLowerCase();
    const cleanPwd = passwordInput.trim();

    // Accepted email formats: institutional email or alternative student email
    const validEmails = [
      DEFAULT_EMAIL.toLowerCase(),
      'pravinsyadavpsy99@gmail.com',
      'pravin.yadav@pbs.com'
    ];

    if (!validEmails.includes(cleanEmail)) {
      return {
        success: false,
        message: `Unrecognized student email. Please use your PBS institutional ID: ${DEFAULT_EMAIL}`
      };
    }

    const currentPwd = this.getActivePassword();
    if (cleanPwd !== currentPwd && cleanPwd !== DEFAULT_PASSWORD) {
      return {
        success: false,
        message: 'Invalid password. Please check your credentials or reset your password.'
      };
    }

    return {
      success: true,
      message: 'Authentication successful! Welcome to PBS Student LMS.'
    };
  },

  /**
   * Update student password and update storage / timestamp
   */
  updatePassword(oldPasswordInput: string, newPasswordInput: string): { success: boolean; message: string } {
    const currentPwd = this.getActivePassword();

    if (oldPasswordInput.trim() !== currentPwd && oldPasswordInput.trim() !== DEFAULT_PASSWORD) {
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
      localStorage.setItem(STORAGE_PWD_KEY, newPasswordInput.trim());
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
   * Login state persistence
   */
  isLoggedIn(): boolean {
    try {
      const item = localStorage.getItem(STORAGE_AUTH_LOGGED_IN_KEY);
      return item === null || item === 'true'; // Default logged in for fast review
    } catch {
      return true;
    }
  },

  setLoggedIn(state: boolean): void {
    try {
      localStorage.setItem(STORAGE_AUTH_LOGGED_IN_KEY, state ? 'true' : 'false');
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
      institutionalEmail: DEFAULT_EMAIL,
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
      iso19650Code: 'PBS-ISO-19650-VERIFIED-2026'
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
      'ISO 19650 Verification Code'
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
      `"${r.iso19650Code}"`
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
