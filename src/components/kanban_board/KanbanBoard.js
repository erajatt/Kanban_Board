import React from "react";
import Column from "../column/Column";
import "./KanbanBoard.css";

function KanbanBoard({ tickets, users, grouping, sorting }) {
  const groupTickets = () => {
    const grouped = {};
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
          key = ticket.priority;
          break;
        default:
          key = ticket.status;
      }
      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(ticket);
    });
    return grouped;
  };

  const sortTickets = (ticketsToSort) => {
    return ticketsToSort.sort((a, b) => {
      if (sorting === "priority") {
        return b.priority - a.priority;
      } else {
        return a.title.localeCompare(b.title);
      }
    });
  };

  const groupedAndSortedTickets = groupTickets();
  Object.keys(groupedAndSortedTickets).forEach((key) => {
    groupedAndSortedTickets[key] = sortTickets(groupedAndSortedTickets[key]);
  });

  // Custom order for priority grouping
  const priorityOrder = [0, 4, 3, 2, 1]; // No priority, Urgent, High, Medium, Low

  const sortedKeys =
    grouping === "priority"
      ? Object.keys(groupedAndSortedTickets).sort((a, b) => {
          return (
            priorityOrder.indexOf(parseInt(a)) -
            priorityOrder.indexOf(parseInt(b))
          );
        })
      : Object.keys(groupedAndSortedTickets);

  return (
    <div className="kanban-board">
      {sortedKeys.map((key) => (
        <Column
          key={key}
          title={grouping === "user" ? key : getPriorityName(key)}
          tickets={groupedAndSortedTickets[key]}
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
