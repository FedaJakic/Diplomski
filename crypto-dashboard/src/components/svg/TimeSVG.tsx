import React from 'react';

const TimeSVG: React.FC = () => {
  return (
    <div className="text-center">
      <svg
        width="50px"
        height="50px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 8V12L15 15"
          stroke="#000000"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="12" cy="12" r="9" stroke="#000000" strokeWidth="2" />
      </svg>
    </div>
  );
};

export default TimeSVG;
