import React from "react";

export type Client = {
  id: number;
  name: string;
  type: string;
  email: string;
  status: "Active" | "Inactive";
  createdAt: string;
  updatedAt: string;
  updatedBy: string;
};

interface ClientTableProps {
  clients: Client[];
}

const ClientTable: React.FC<ClientTableProps> = ({ clients }) => {
  return (
    <table className="w-full border-collapse border rounded-lg shadow-sm">
      <thead>
        <tr className="bg-gray-100">
          <th className="border px-4 py-2">Client ID</th>
          <th className="border px-4 py-2">Client Name</th>
          <th className="border px-4 py-2">Client Type</th>
          <th className="border px-4 py-2">Email</th>
          <th className="border px-4 py-2">Status</th>
          <th className="border px-4 py-2">Created At</th>
          <th className="border px-4 py-2">Updated At</th>
          <th className="border px-4 py-2">Updated By</th>
        </tr>
      </thead>
      <tbody>
        {clients.map((client) => (
          <tr key={client.id} className="hover:bg-gray-50">
            <td className="border px-4 py-2 text-blue-600 cursor-pointer">
              {client.id}
            </td>
            <td className="border px-4 py-2">{client.name}</td>
            <td className="border px-4 py-2">{client.type}</td>
            <td className="border px-4 py-2">{client.email}</td>
            <td className="border px-4 py-2">
              <span
                className={`px-2 py-1 rounded-full text-sm ${
                  client.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {client.status}
              </span>
            </td>
            <td className="border px-4 py-2">{client.createdAt}</td>
            <td className="border px-4 py-2">{client.updatedAt}</td>
            <td className="border px-4 py-2">{client.updatedBy}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ClientTable;
