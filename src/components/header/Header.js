import React, { useState } from "react";
import DisplayOptions from "../display_options/DisplayOptions";
import { ReactComponent as DisplayIcon } from "../../assets/icons_FEtask/Display.svg";
import { ReactComponent as DownIcon } from "../../assets/icons_FEtask/down.svg";
import "./Header.css";

function Header() {
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

      <div className={`options-container ${showOptions ? "open" : ""}`}>
        {showOptions && <DisplayOptions />}
      </div>
    </header>
  );
}

export default Header;
