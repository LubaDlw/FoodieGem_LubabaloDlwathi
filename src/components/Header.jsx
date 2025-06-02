import React from 'react';
import { LogOut } from 'lucide-react';
import '../styles/Header.css';
import { useAuth } from '../context/AuthContext'; // Adjust path if needed

const Header = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    // Optionally, add navigation or feedback here
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">FoodieGem</div>
        <div className="user-profile" onClick={handleLogout}>
          <LogOut size={20} />
          <span className="logout-text">Logout</span>
        </div>
      </div>
      <div className="welcome-text">
        Welcome back, {user?.displayName || user?.email || 'Guest'}
      </div>
    </header>
  );
};

export default Header;
//checking if git worked