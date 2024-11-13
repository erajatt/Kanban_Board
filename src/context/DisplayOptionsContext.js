import React, { createContext, useState, useContext, useEffect } from "react";

const DisplayOptionsContext = createContext();

export const DisplayOptionsProvider = ({ children }) => {
  // Initialize state for display options, checking if options are stored in localStorage
  const [displayOptions, setDisplayOptions] = useState(() => {
    const savedOptions = localStorage.getItem("displayOptions");
    return savedOptions
      ? JSON.parse(savedOptions)
      : { grouping: "status", sorting: "priority" }; // Default options if none exist
  });

  // Update display options in localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("displayOptions", JSON.stringify(displayOptions));
  }, [displayOptions]);

  // Function to update display options by merging with new options
  const updateDisplayOptions = (newOptions) => {
    setDisplayOptions((prevOptions) => ({ ...prevOptions, ...newOptions }));
  };

  return (
    // Provide the current display options and the update function to children components
    <DisplayOptionsContext.Provider
      value={{ displayOptions, updateDisplayOptions }}
    >
      {children}
    </DisplayOptionsContext.Provider>
  );
};

// Custom hook to access the display options context
export const useDisplayOptions = () => useContext(DisplayOptionsContext);
