import React from "react";

export type SortField = "name" | "createdAt" | "updatedAt" | "id";

export type SortOption = {
  field: SortField;
  direction: "asc" | "desc";
};

interface SortPanelProps {
  onToggleSort: (field: SortField, direction: "asc" | "desc") => void;
}

const SortPanel: React.FC<SortPanelProps> = ({ onToggleSort }) => {
  return (
    <div className="mb-6 p-4 border rounded-lg bg-gray-50 shadow-sm">
      <h3 className="font-semibold mb-3">Sort By</h3>
      <div className="space-y-2">
        <div>
          <span className="mr-2">Client Name:</span>
          <button
            onClick={() => onToggleSort("name", "asc")}
            className="px-2 py-1 border rounded mr-2"
          >
            A-Z
          </button>
          <button
            onClick={() => onToggleSort("name", "desc")}
            className="px-2 py-1 border rounded"
          >
            Z-A
          </button>
        </div>
        <div>
          <span className="mr-2">Client ID:</span>
          <button
            onClick={() => onToggleSort("id", "asc")}
            className="px-2 py-1 border rounded mr-2"
          >
            Asc
          </button>
          <button
            onClick={() => onToggleSort("id", "desc")}
            className="px-2 py-1 border rounded"
          >
            Desc
          </button>
        </div>
        <div>
          <span className="mr-2">Created At:</span>
          <button
            onClick={() => onToggleSort("createdAt", "desc")}
            className="px-2 py-1 border rounded mr-2"
          >
            Newest
          </button>
          <button
            onClick={() => onToggleSort("createdAt", "asc")}
            className="px-2 py-1 border rounded"
          >
            Oldest
          </button>
        </div>
        <div>
          <span className="mr-2">Updated At:</span>
          <button
            onClick={() => onToggleSort("updatedAt", "desc")}
            className="px-2 py-1 border rounded mr-2"
          >
            Newest
          </button>
          <button
            onClick={() => onToggleSort("updatedAt", "asc")}
            className="px-2 py-1 border rounded"
          >
            Oldest
          </button>
        </div>
      </div>
    </div>
  );
};

export default SortPanel;
