import React, { useState, useEffect } from "react";
import Header from "./components/header/Header";
import KanbanBoard from "./components/kanban_board/KanbanBoard";
import { DisplayOptionsProvider } from "./context/DisplayOptionsContext";
import "./App.css";

function App() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    const response = await fetch(
      "https://api.quicksell.co/v1/internal/frontend-assignment"
    );
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      const data = await fetchData();
      setTickets(data.tickets);
      setUsers(data.users);
    };
    fetchDataFromAPI();
  }, []);

  return (
    <div className="app">
      <DisplayOptionsProvider>
        <Header />
        <KanbanBoard tickets={tickets} users={users} />
      </DisplayOptionsProvider>
    </div>
  );
}

export default App;
