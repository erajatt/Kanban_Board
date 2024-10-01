import React, { useState } from "react";
import "./DisplayOptions.css";

function DisplayOptions({ onDisplayChange }) {
  const [grouping, setGrouping] = useState("status");
  const [sorting, setSorting] = useState("priority");

  const handleGroupingChange = (e) => {
    setGrouping(e.target.value);
    onDisplayChange(e.target.value, sorting);
  };

  const handleSortingChange = (e) => {
    setSorting(e.target.value);
    onDisplayChange(grouping, e.target.value);
  };

  return (
    <div className="display-options">
      <div className="option">
        <label>Grouping</label>
        <select value={grouping} onChange={handleGroupingChange}>
          <option value="status">Status</option>
          <option value="user">User</option>
          <option value="priority">Priority</option>
        </select>
      </div>
      <div className="option">
        <label>Ordering</label>
        <select value={sorting} onChange={handleSortingChange}>
          <option value="priority">Priority</option>
          <option value="title">Title</option>
        </select>
      </div>
    </div>
  );
}

export default DisplayOptions;
