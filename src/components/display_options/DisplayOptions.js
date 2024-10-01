import React from "react";
import "./DisplayOptions.css";

// useContext (Display Options is the global state)
import { useDisplayOptions } from "../../context/DisplayOptionsContext";

function DisplayOptions() {
  const { displayOptions, updateDisplayOptions } = useDisplayOptions();

  // Arrays for grouping and sorting options
  const groupingOptions = ["status", "user", "priority"];
  const sortingOptions = ["priority", "title"];

  // Handled changes for grouping
  const handleGroupingChange = (e) => {
    updateDisplayOptions({ grouping: e.target.value });
  };

  // Handled changes for sorting
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
