import React, { useState } from "react";
import ClientTable from "./ClientTable";
import SortPanel from "./SortPanel";
import { Client, SortOption } from "../lib/types";
import { Search, ArrowUpDown, Filter } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

// Dummy client data
const initialClients: Client[] = [
  { id: 101, name: "Alice Johnson", type: "Individual", email: "alice.j@example.com", status: "Active", createdAt: "2024-02-15 09:30:00", updatedAt: "2024-02-20 14:10:00", updatedBy: "admin" },
  { id: 102, name: "Beta Corp", type: "Company", email: "info@betacorp.com", status: "Inactive", createdAt: "2024-01-10 10:45:00", updatedAt: "2024-02-05 16:20:00", updatedBy: "manager" },
  { id: 103, name: "Chris Evans", type: "Individual", email: "chris.evans@example.com", status: "Active", createdAt: "2024-03-01 11:15:00", updatedAt: "2024-03-10 12:00:00", updatedBy: "admin" },
  { id: 104, name: "Delta Solutions", type: "Company", email: "contact@delta.com", status: "Active", createdAt: "2024-01-25 08:50:00", updatedAt: "2024-02-18 09:30:00", updatedBy: "manager" },
  { id: 105, name: "Evelyn Smith", type: "Individual", email: "evelyn.smith@gmail.com", status: "Inactive", createdAt: "2024-02-05 14:00:00", updatedAt: "2024-02-25 15:45:00", updatedBy: "admin" },
];

const ClientTableMultiSort: React.FC = () => {
  const [clients] = useState<Client[]>(initialClients);
  const [sortOptions, setSortOptions] = useState<SortOption[]>([]);
  const [showSort, setShowSort] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Sorting logic
  const applySorting = (data: Client[]) => {
    return [...data].sort((a, b) => {
      for (const { field, direction } of sortOptions) {
        let comp = 0;
        if (field === "name") comp = a.name.localeCompare(b.name);
        else if (field === "id") comp = a.id - b.id;
        else if (field === "createdAt") comp = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        else if (field === "updatedAt") comp = new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
        if (comp !== 0) return direction === "asc" ? comp : -comp;
      }
      return 0;
    });
  };

  // Filter + sort
  const filteredClients = clients.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const sortedClients = applySorting(filteredClients);

  return (
    <div className="p-6">
      {/* Toolbar */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Clients</h2>
        <div className="flex gap-4 items-center">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-2 top-2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search clients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
          </div>

          {/* Sort button with badge */}
          <div className="relative">
            <ArrowUpDown
              className="w-5 h-5 cursor-pointer"
              onClick={() => setShowSort((s) => !s)}
            />
            {sortOptions.length > 0 && (
              <Badge className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2">
                {sortOptions.length}
              </Badge>
            )}
          </div>

          {/* Filter button (not wired yet) */}
          <Filter className="w-5 h-5 cursor-pointer" />

          <Button>Add Client</Button>
        </div>
      </div>

      {/* Table */}
      <div className="relative">
        <ClientTable clients={sortedClients} />
        {showSort && (
          <div className="absolute top-0 right-0 z-10">
            <SortPanel
              sortOptions={sortOptions}
              setSortOptions={setSortOptions}
              onApply={() => setShowSort(false)}
              onClear={() => setSortOptions([])}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientTableMultiSort;
