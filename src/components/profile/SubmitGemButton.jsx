import React from 'react';
import { Gem, ChevronRight } from 'lucide-react';

const SubmitGemButton = ({ onClick }) => {
  return (
    <button className="submit-gem-btn" onClick={onClick}>
      <Gem size={24} />
      <span>SUBMIT A GEM</span>
      <ChevronRight size={20} />
    </button>
  );
};

export default SubmitGemButton;