import React from "react";
import "./Card.css";

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

const priorityIcons = {
  4: UrgentIcon,
  3: HighIcon,
  2: MediumIcon,
  1: LowIcon,
  0: NoPriorityIcon,
};

const statusIcons = {
  Todo: TodoIcon,
  "In progress": InProgressIcon,
  Done: DoneIcon,
  Cancelled: CancelledIcon,
  Backlog: BacklogIcon,
};

function Card({ ticket, user, grouping }) {
  const PriorityIcon = priorityIcons[ticket.priority];
  const StatusIcon = statusIcons[ticket.status];

  return (
    <div className="card">
      <div className="card-header">
        <span className="ticket-id">{ticket.id}</span>
        {grouping !== "user" && (
          <div
            className="user-avatar"
            style={{ backgroundColor: getUserColor(user.name) }}
          >
            {user.name[0].toUpperCase()}
            <span
              className={`availability-indicator ${
                user.available ? "available" : ""
              }`}
            ></span>
          </div>
        )}
      </div>
      <div className="card-title">
        {grouping !== "status" && <StatusIcon className="status-icon" />}
        <h3>{ticket.title}</h3>
      </div>
      <div className="card-footer">
        {grouping !== "priority" && <PriorityIcon className="priority-icon" />}
        <div className="card-tags">
          {ticket.tag.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
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

export default Card;
