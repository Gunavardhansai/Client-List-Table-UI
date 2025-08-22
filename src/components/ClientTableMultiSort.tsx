import React, { useState } from "react";
import SortPanel, { SortOption, SortField } from "./SortPanel";
import ClientTable, { Client } from "./ClientTable";

const initialClients: Client[] = [
  {
    id: 101,
    name: "Alice Johnson",
    type: "Individual",
    email: "alice.j@example.com",
    status: "Active",
    createdAt: "2024-02-15 09:30:00",
    updatedAt: "2024-02-20 14:10:00",
    updatedBy: "admin",
  },
  {
    id: 102,
    name: "Beta Corp",
    type: "Company",
    email: "info@betacorp.com",
    status: "Inactive",
    createdAt: "2024-01-10 10:45:00",
    updatedAt: "2024-02-05 16:20:00",
    updatedBy: "manager",
  },
  {
    id: 103,
    name: "Chris Evans",
    type: "Individual",
    email: "chris.evans@example.com",
    status: "Active",
    createdAt: "2024-03-01 11:15:00",
    updatedAt: "2024-03-10 12:00:00",
    updatedBy: "admin",
  },
  {
    id: 104,
    name: "Delta Solutions",
    type: "Company",
    email: "contact@delta.com",
    status: "Active",
    createdAt: "2024-01-25 08:50:00",
    updatedAt: "2024-02-18 09:30:00",
    updatedBy: "manager",
  },
  {
    id: 105,
    name: "Evelyn Smith",
    type: "Individual",
    email: "evelyn.smith@gmail.com",
    status: "Inactive",
    createdAt: "2024-02-05 14:00:00",
    updatedAt: "2024-02-25 15:45:00",
    updatedBy: "admin",
  },
];

const ClientTableMultiSort: React.FC = () => {
  const [clients] = useState<Client[]>(initialClients);
  const [sortOptions, setSortOptions] = useState<SortOption[]>([]);

  const toggleSort = (field: SortField, direction: "asc" | "desc") => {
    setSortOptions((prev) => {
      const existing = prev.find((s) => s.field === field);
      if (existing) {
        return prev.map((s) =>
          s.field === field ? { ...s, direction } : s
        );
      }
      return [...prev, { field, direction }];
    });
  };

  const applySorting = (data: Client[]) => {
    return [...data].sort((a, b) => {
      for (const { field, direction } of sortOptions) {
        let comp = 0;
        if (field === "name") comp = a.name.localeCompare(b.name);
        else if (field === "id") comp = a.id - b.id;
        else if (field === "createdAt")
          comp =
            new Date(a.createdAt).getTime() -
            new Date(b.createdAt).getTime();
        else if (field === "updatedAt")
          comp =
            new Date(a.updatedAt).getTime() -
            new Date(b.updatedAt).getTime();

        if (comp !== 0) return direction === "asc" ? comp : -comp;
      }
      return 0;
    });
  };

  const sortedClients = applySorting(clients);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Clients</h2>
      <SortPanel onToggleSort={toggleSort} />
      <ClientTable clients={sortedClients} />
    </div>
  );
};

export default ClientTableMultiSort;
