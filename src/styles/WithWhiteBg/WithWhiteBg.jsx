import React, { useState } from "react";

const WithWhiteBg = ({ children, className = "", style }) => {
  return (
    <div style={style} className={`with-bg-white ${className}`}>
      {children}
    </div>
  );
};

export default WithWhiteBg;
