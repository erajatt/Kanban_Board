import React from "react";
import Column from "../column/Column";
import "./KanbanBoard.css";
import { useDisplayOptions } from "../../context/DisplayOptionsContext";

function KanbanBoard({ tickets, users }) {
  const { displayOptions } = useDisplayOptions();
  const { grouping, sorting } = displayOptions;

  const statusOrder = ["Backlog", "Todo", "In progress", "Done", "Cancelled"];
  const priorityOrder = ["No priority", "Urgent", "High", "Medium", "Low"];

  // Group tickets based on the current grouping (status, priority, or user)
  const groupTickets = () => {
    const grouped = {};

    // Initialize groups based on grouping type
    if (grouping === "status") {
      statusOrder.forEach((status) => (grouped[status] = []));
    } else if (grouping === "priority") {
      priorityOrder.forEach((priority) => (grouped[priority] = []));
    } else if (grouping === "user") {
      users.forEach((user) => (grouped[user.id] = []));
    }

    // Populate groups with tickets
    tickets.forEach((ticket) => {
      let key;
      switch (grouping) {
        case "status":
          key = ticket.status;
          break;
        case "user":
          key = ticket.userId;
          break;
        case "priority":
          key = getPriorityName(ticket.priority);
          break;
        default:
          key = ticket.status;
      }
      if (grouped[key]) {
        grouped[key].push(ticket);
      }
    });

    return grouped;
  };

  // Sort tickets based on the selected sorting option (priority or title)
  const sortTickets = (ticketsToSort) => {
    return ticketsToSort.sort((a, b) => {
      if (sorting === "priority") {
        return b.priority - a.priority; // Sort by priority (higher first)
      } else {
        return a.title.localeCompare(b.title); // Sort alphabetically by title
      }
    });
  };

  const groupedAndSortedTickets = groupTickets();
  Object.keys(groupedAndSortedTickets).forEach((key) => {
    groupedAndSortedTickets[key] = sortTickets(groupedAndSortedTickets[key]);
  });

  // Return keys in the correct order based on the current grouping
  const getSortedKeys = () => {
    switch (grouping) {
      case "status":
        return statusOrder;
      case "priority":
        return priorityOrder;
      case "user":
        return users.map((user) => user.id);
      default:
        return Object.keys(groupedAndSortedTickets);
    }
  };

  const sortedKeys = getSortedKeys();

  return (
    <div className="kanban-board">
      {sortedKeys.map((key) => (
        <Column
          key={key}
          title={key}
          tickets={groupedAndSortedTickets[key] || []}
          users={users}
          grouping={grouping}
        />
      ))}
    </div>
  );
}

function getPriorityName(priority) {
  const priorities = {
    4: "Urgent",
    3: "High",
    2: "Medium",
    1: "Low",
    0: "No priority",
  };
  return priorities[priority] || priority;
}

export default KanbanBoard;
