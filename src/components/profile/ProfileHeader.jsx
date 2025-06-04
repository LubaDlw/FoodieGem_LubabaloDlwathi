import React from 'react';
import { User } from 'lucide-react';

const ProfileHeader = ({ user }) => {
  return (
    <div className="profile-header">
      <div className="profile-avatar">
        <User size={40} />
      </div>
      <div className="profile-info">
        <h2>{user?.name || 'Food Explorer'}</h2>
        <p>{user?.email || ''}</p>
      </div>
    </div>
  );
};

export default ProfileHeader;