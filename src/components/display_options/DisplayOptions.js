import React from "react";
import "./DisplayOptions.css";
import { useDisplayOptions } from "../../context/DisplayOptionsContext";

function DisplayOptions() {
  const { displayOptions, updateDisplayOptions } = useDisplayOptions();

  const handleGroupingChange = (e) => {
    updateDisplayOptions({ grouping: e.target.value });
  };

  const handleSortingChange = (e) => {
    updateDisplayOptions({ sorting: e.target.value });
  };

  return (
    <div className="display-options">
      <div className="option">
        <label>Grouping</label>
        <select value={displayOptions.grouping} onChange={handleGroupingChange}>
          <option value="status">Status</option>
          <option value="user">User</option>
          <option value="priority">Priority</option>
        </select>
      </div>
      <div className="option">
        <label>Ordering</label>
        <select value={displayOptions.sorting} onChange={handleSortingChange}>
          <option value="priority">Priority</option>
          <option value="title">Title</option>
        </select>
      </div>
    </div>
  );
}

export default DisplayOptions;
