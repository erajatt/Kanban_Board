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

// Priority Icons Mapping
const priorityIcons = {
  Urgent: UrgentIcon,
  High: HighIcon,
  Medium: MediumIcon,
  Low: LowIcon,
  "No priority": NoPriorityIcon,
};

const statusIcons = {
  Todo: TodoIcon,
  "In progress": InProgressIcon,
  Done: DoneIcon,
  Cancelled: CancelledIcon,
  Backlog: BacklogIcon,
};

function Column({ title, tickets, users, grouping }) {
  const user = grouping === "user" ? users.find((u) => u.id === title) : null;

  const getPriorityIcon = (priority) => {
    const PriorityIcon = priorityIcons[priority];
    return <PriorityIcon className="priority-icon-column" />;
  };

  const getStatusIcon = (status) => {
    const StatusIcon = statusIcons[status];
    return <StatusIcon className="status-icon-column" />;
  };

  function getInitials(name) {
    const nameParts = name.split(" ");
    const firstInitial = nameParts[0] ? nameParts[0][0].toUpperCase() : "";
    const lastInitial =
      nameParts.length > 1
        ? nameParts[nameParts.length - 1][0].toUpperCase()
        : "";
    return firstInitial + lastInitial;
  }

  return (
    <div className="column">
      <div className="column-header">
        {grouping === "priority" && priorityIcons[title] ? (
          <>
            {getPriorityIcon(title)} {/* Render the icon */}
            <h2 className="column-title">{title}</h2>
          </>
        ) : grouping === "user" && user ? (
          <>
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

            <h2 className="column-title">{user.name}</h2>
          </>
        ) : (
          <>
            {getStatusIcon(title)}
            <h2 className="column-title">{title}</h2>
          </>
        )}
        <span className="ticket-count">{tickets.length}</span>
        <div className="column-actions">
          <AddIcon className="action-icon" />
          <OptionsIcon className="action-icon" />
        </div>
      </div>
      <div className="card-container">
        {tickets.map((ticket) => (
          <Card
            key={ticket.id}
            ticket={ticket}
            user={users.find((u) => u.id === ticket.userId)}
            grouping={grouping}
          />
        ))}
      </div>
    </div>
  );
}

function getUserColor(name) {
  const colors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A", "#98D8C8"];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  hash = Math.abs(hash);
  return colors[hash % colors.length];
}

export default Column;
