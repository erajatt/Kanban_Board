import React, { useState, useEffect } from "react";
import Header from "./components/header/Header";
import KanbanBoard from "./components/kanban_board/KanbanBoard";
import { DisplayOptionsProvider } from "./context/DisplayOptionsContext";
import { fetchData } from "./utils/api";
import "./App.css";

function App() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [grouping, setGrouping] = useState("status");
  const [sorting, setSorting] = useState("priority");

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      const data = await fetchData();
      setTickets(data.tickets);
      setUsers(data.users);
    };
    fetchDataFromAPI();
  }, []);

  const handleDisplayChange = (newGrouping, newSorting) => {
    setGrouping(newGrouping);
    setSorting(newSorting);
  };

  return (
    <div className="app">
      <DisplayOptionsProvider>
        <Header onDisplayChange={handleDisplayChange} />
        <KanbanBoard
          tickets={tickets}
          users={users}
          grouping={grouping}
          sorting={sorting}
        />
      </DisplayOptionsProvider>
    </div>
  );
}

export default App;
