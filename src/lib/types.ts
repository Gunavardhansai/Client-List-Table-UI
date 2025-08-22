export type SortField = "name" | "createdAt" | "updatedAt" | "id";

export type SortOption = {
  id: string; // unique id for dnd
  field: SortField;
  direction: "asc" | "desc";
};

export type Client = {
  id: number;
  name: string;
  type: "Individual" | "Company";
  email: string;
  status: "Active" | "Inactive";
  createdAt: string;
  updatedAt: string;
  updatedBy: string;
};
