export const groupTickets = (tickets, grouping) => {
  return tickets.reduce((acc, ticket) => {
    const key =
      grouping === "user"
        ? ticket.userId
        : grouping === "priority"
        ? ticket.priority
        : ticket.status;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(ticket);
    return acc;
  }, {});
};

export const sortTickets = (groupedTickets, sorting) => {
  const sortFunction =
    sorting === "priority"
      ? (a, b) => b.priority - a.priority
      : (a, b) => a.title.localeCompare(b.title);

  return Object.entries(groupedTickets).reduce((acc, [group, tickets]) => {
    acc[group] = tickets.sort(sortFunction);
    return acc;
  }, {});
};
