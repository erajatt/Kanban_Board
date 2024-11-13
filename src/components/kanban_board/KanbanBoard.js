import React from "react";
import Column from "../column/Column";

//Styles Import
import "./KanbanBoard.css";

//Context import
import { useDisplayOptions } from "../../context/DisplayOptionsContext";

function KanbanBoard({ tickets, users }) {
  const { displayOptions } = useDisplayOptions();
  const { grouping, sorting } = displayOptions;

  const GROUP_ORDERS = {
    status: ["Backlog", "Todo", "In progress", "Done", "Cancelled"],
    priority: ["No priority", "Urgent", "High", "Medium", "Low"],
    user: users.map((user) => user.id),
  };

  const PRIORITIES = {
    4: "Urgent",
    3: "High",
    2: "Medium",
    1: "Low",
    0: "No priority",
  };

  const getGroupedAndSortedTickets = () => {
    const grouped = {};

    // Group tickets based on the current grouping option
    tickets.forEach((ticket) => {
      let key;
      if (grouping === "status") {
        key = ticket.status;
      } else if (grouping === "priority") {
        key = PRIORITIES[ticket.priority];
      } else if (grouping === "user") {
        key = ticket.userId;
      }

      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(ticket);
    });

    // Sort tickets in each group based on the sorting option
    Object.values(grouped).forEach((group) => {
      group.sort((a, b) =>
        sorting === "priority"
          ? b.priority - a.priority
          : a.title.localeCompare(b.title)
      );
    });

    return grouped;
  };

  const groupedTickets = getGroupedAndSortedTickets();
  const sortedKeys = GROUP_ORDERS[grouping];

  return (
    <div className="kanban-board">
      {sortedKeys.map((key) => (
        <Column
          key={key}
          title={key}
          tickets={groupedTickets[key] || []}
          users={users}
        />
      ))}
    </div>
  );
}

export default KanbanBoard;
