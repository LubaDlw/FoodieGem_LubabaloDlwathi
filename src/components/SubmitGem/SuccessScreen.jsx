import React from 'react';
import { Check, Loader2 } from 'lucide-react';
import Header from '../Header';

const SuccessScreen = () => (
  <div className="submit-gem-page">
    <Header title="Gem Submitted!" />
    <div className="success-container">
      <div className="success-icon">
        <Check size={48} />
      </div>
      <h2>Restaurant Submitted Successfully!</h2>
      <p>Thank you for sharing your gem with the community!</p>
      <p>You've earned 50 points and your gem count has been updated!</p>
      <p><strong>Note:</strong> To view your submitted gem, you'll need to refresh the page.</p>
      <div className="success-loader">
        <Loader2 className="spinner" size={24} />
        <span>Redirecting to profile...</span>
      </div>
    </div>
  </div>
);

export default SuccessScreen;