import React, { useState } from "react";
import DisplayOptions from "../display_options/DisplayOptions";
import { ReactComponent as DisplayIcon } from "../../assets/icons_FEtask/Display.svg";
import { ReactComponent as DownIcon } from "../../assets/icons_FEtask/down.svg";

import "./Header.css";

function Header({ onDisplayChange }) {
  const [showOptions, setShowOptions] = useState(false);

  const handleDisplayClick = () => {
    setShowOptions(!showOptions);
  };

  return (
    <header className="header">
      <button className="display-button" onClick={handleDisplayClick}>
        <span className="icon">
          <DisplayIcon />
        </span>
        Display
        <span className="icon">
          <DownIcon />
        </span>
      </button>

      {/* Add transition for smooth opening */}
      <div className={`options-container ${showOptions ? "open" : ""}`}>
        {showOptions && <DisplayOptions onDisplayChange={onDisplayChange} />}
      </div>
    </header>
  );
}

export default Header;
