import React from 'react';

const HashSVG: React.FC = () => {
  return (
    <div className="text-center ">
      <svg
        width="50px"
        height="50px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13 21L17 3"
          stroke="#323232"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7 21L11 3"
          stroke="#323232"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20 9L4 9"
          stroke="#323232"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4 15L20 15"
          stroke="#323232"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default HashSVG;
