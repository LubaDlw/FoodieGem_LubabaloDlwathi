import { useCallback } from 'react';

export const useProfileNavigation = ({ logout, navigate }) => {
  const handleLogout = useCallback(() => {
    logout();
    navigate('/login');
  }, [logout, navigate]);

  const handleSubmitGem = useCallback(() => {
    navigate('/submit-gem');
  }, [navigate]);

  return { handleLogout, handleSubmitGem };
};