import React from 'react';
import { StudentDashboard } from './student-dashboard/StudentDashboard';
import { AuthUser } from '../types';
import { PRELOADED_USERS } from '../data/pbsData';

interface StudentLmsPortalModalProps {
  onClose: () => void;
  onOpenAdmin?: () => void;
  currentUser?: AuthUser | null;
}

export const StudentLmsPortalModal: React.FC<StudentLmsPortalModalProps> = ({
  onClose,
  currentUser
}) => {
  const activeUser = currentUser || PRELOADED_USERS[0];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-white">
      <StudentDashboard
        user={activeUser}
        onLogout={onClose}
        onBackToHome={onClose}
      />
    </div>
  );
};
