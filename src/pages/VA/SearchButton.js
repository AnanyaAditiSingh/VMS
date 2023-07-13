import React from "react";

const SearchButton = ({ isInteractive, onClick }) => {
  return (
    <button
      className={`search-button ${isInteractive ? "interactive" : ""}`}
      onClick={onClick}
      disabled={!isInteractive}
    >
      Search
    </button>
  );
};

export default SearchButton;
