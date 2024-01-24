import React from "react";

const MiniSpinner = () => {
  return (
    <div className="text-center">
      <div className="spinner-border  text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default MiniSpinner;
