import React from "react";
import Card from "../card/Card";
import "./Column.css";
import { ReactComponent as AddIcon } from "../../assets/icons_FEtask/add.svg";
import { ReactComponent as OptionsIcon } from "../../assets/icons_FEtask/3 dot menu.svg";
import { ReactComponent as UrgentIcon } from "../../assets/icons_FEtask/SVG - Urgent Priority colour.svg";
import { ReactComponent as HighIcon } from "../../assets/icons_FEtask/Img - High Priority.svg";
import { ReactComponent as MediumIcon } from "../../assets/icons_FEtask/Img - Medium Priority.svg";
import { ReactComponent as LowIcon } from "../../assets/icons_FEtask/Img - Low Priority.svg";
import { ReactComponent as NoPriorityIcon } from "../../assets/icons_FEtask/No-priority.svg";
import { ReactComponent as TodoIcon } from "../../assets/icons_FEtask/To-do.svg";
import { ReactComponent as InProgressIcon } from "../../assets/icons_FEtask/in-progress.svg";
import { ReactComponent as DoneIcon } from "../../assets/icons_FEtask/Done.svg";
import { ReactComponent as CancelledIcon } from "../../assets/icons_FEtask/Cancelled.svg";
import { ReactComponent as BacklogIcon } from "../../assets/icons_FEtask/Backlog.svg";
import { useDisplayOptions } from "../../context/DisplayOptionsContext";

// Icons for priority and status
const priorityIcons = {
  Urgent: UrgentIcon,
  High: HighIcon,
  Medium: MediumIcon,
  Low: LowIcon,
  "No priority": NoPriorityIcon,
};

const statusIcons = {
  Backlog: BacklogIcon,
  Todo: TodoIcon,
  "In progress": InProgressIcon,
  Done: DoneIcon,
  Cancelled: CancelledIcon,
};

function Column({ title, tickets, users }) {
  const { displayOptions } = useDisplayOptions();
  const grouping = displayOptions.grouping;

  // Get appropriate icon based on the grouping (priority, status, user)
  const getColumnIcon = () => {
    if (grouping === "priority" && priorityIcons[title]) {
      const PriorityIcon = priorityIcons[title];
      return <PriorityIcon className="priority-icon-column" />;
    } else if (grouping === "status" && statusIcons[title]) {
      const StatusIcon = statusIcons[title];
      return <StatusIcon className="status-icon-column" />;
    } else if (grouping === "user") {
      const user = users.find((u) => u.id === title);
      if (user) {
        return (
          <div
            className="user-avatar"
            style={{ backgroundColor: getUserColor(user.name) }}
          >
            {getInitials(user.name)}
            <span
              className={`availability-indicator ${
                user.available ? "available" : ""
              }`}
            ></span>
          </div>
        );
      }
    }
    return null;
  };

  // Get title based on the grouping (name for user, otherwise use the title)
  const getColumnTitle = () => {
    if (grouping === "user") {
      const user = users.find((u) => u.id === title);
      return user ? user.name : title;
    }
    return title;
  };

  // Generate user initials from their name
  function getInitials(name) {
    const nameParts = name.split(" ");
    const firstInitial = nameParts[0] ? nameParts[0][0].toUpperCase() : "";
    const lastInitial =
      nameParts.length > 1
        ? nameParts[nameParts.length - 1][0].toUpperCase()
        : "";
    return firstInitial + lastInitial;
  }

  // Generate a color for each user based on their name
  function getUserColor(name) {
    const colors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A", "#98D8C8"];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    hash = Math.abs(hash);
    return colors[hash % colors.length];
  }

  return (
    <div className="column">
      <div className="column-header">
        {getColumnIcon()}
        <h2 className="column-title">{getColumnTitle()}</h2>
        <span className="ticket-count">{tickets.length}</span>
        <div className="column-actions">
          <AddIcon className="action-icon" />
          <OptionsIcon className="action-icon" />
        </div>
      </div>
      <div className="card-container">
        {/* Render each ticket as a Card */}
        {tickets.map((ticket) => (
          <Card
            key={ticket.id}
            ticket={ticket}
            user={users.find((u) => u.id === ticket.userId)}
          />
        ))}
      </div>
    </div>
  );
}

export default Column;
