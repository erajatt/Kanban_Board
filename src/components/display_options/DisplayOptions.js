import React from "react";

//Styles import
import "./DisplayOptions.css";

//Context import
import { useDisplayOptions } from "../../context/DisplayOptionsContext";

function DisplayOptions() {
  const { displayOptions, updateDisplayOptions } = useDisplayOptions();

  const groupingOptions = ["status", "user", "priority"];
  const sortingOptions = ["priority", "title"];

  const handleGroupingChange = (e) => {
    updateDisplayOptions({ grouping: e.target.value });
  };

  const handleSortingChange = (e) => {
    updateDisplayOptions({ sorting: e.target.value });
  };

  return (
    <div className="display-options">
      {/* Grouping options */}
      <div className="option">
        <label>Grouping</label>
        <select value={displayOptions.grouping} onChange={handleGroupingChange}>
          {groupingOptions.map((option) => (
            <option key={option} value={option}>
              {option.charAt(0).toUpperCase() + option.slice(1)}{" "}
              {/* Capitalize first letter */}
            </option>
          ))}
        </select>
      </div>

      {/* Sorting options */}
      <div className="option">
        <label>Ordering</label>
        <select value={displayOptions.sorting} onChange={handleSortingChange}>
          {sortingOptions.map((option) => (
            <option key={option} value={option}>
              {option.charAt(0).toUpperCase() + option.slice(1)}{" "}
              {/* Capitalize first letter */}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default DisplayOptions;
