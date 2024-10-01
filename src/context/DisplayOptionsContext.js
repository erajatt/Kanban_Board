import React, { createContext, useState, useContext, useEffect } from "react";

const DisplayOptionsContext = createContext();

export const DisplayOptionsProvider = ({ children }) => {
  const [displayOptions, setDisplayOptions] = useState(() => {
    const savedOptions = localStorage.getItem("displayOptions");
    return savedOptions
      ? JSON.parse(savedOptions)
      : { grouping: "status", sorting: "priority" };
  });

  useEffect(() => {
    localStorage.setItem("displayOptions", JSON.stringify(displayOptions));
  }, [displayOptions]);

  const updateDisplayOptions = (newOptions) => {
    setDisplayOptions((prevOptions) => ({ ...prevOptions, ...newOptions }));
  };

  return (
    <DisplayOptionsContext.Provider
      value={{ displayOptions, updateDisplayOptions }}
    >
      {children}
    </DisplayOptionsContext.Provider>
  );
};

export const useDisplayOptions = () => useContext(DisplayOptionsContext);
