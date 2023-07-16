import React from "react";

const DownloadButton = ({ isInteractive, onClick }) => {
  return (
    <button
      className={`va-download-button ${isInteractive ? "interactive" : ""}`}
      onClick={onClick}
      disabled={!isInteractive}
    >
      Download
    </button>
  );
};

export default DownloadButton;
    