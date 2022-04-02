import React from "react";

const BaseIconCircle = props => {
  const { className = "flex-grow-1", icon, backgroundColor, color = "white", size, fs } = props;
  return (
    <div className={`${className}  d-flex align-items-center `}>
      <div
        className={`circle d-flex justify-content-center align-items-center ${fs}`}
        style={{
          height: `${size}rem`,
          width: `${size}rem`,
          backgroundColor: `var(--${backgroundColor})`,
          color: color
        }}
      >
        {icon}
      </div>
    </div>
  );
};

export default BaseIconCircle;
