import React from "react";
import { Client } from "../lib/types";
import { Badge } from "./ui/badge";

interface ClientTableProps {
  clients: Client[];
}

const ClientTable: React.FC<ClientTableProps> = ({ clients }) => {
  return (
    <table className="w-full border-collapse text-sm">
      <thead>
        <tr className="bg-gray-100 text-left">
          <th className="px-4 py-2">Client ID</th>
          <th className="px-4 py-2">Client Name</th>
          <th className="px-4 py-2">Client Type</th>
          <th className="px-4 py-2">Email</th>
          <th className="px-4 py-2">Status</th>
          <th className="px-4 py-2">Created At</th>
          <th className="px-4 py-2">Updated At</th>
          <th className="px-4 py-2">Updated By</th>
        </tr>
      </thead>
      <tbody>
        {clients.map((client) => (
          <tr key={client.id} className="border-b hover:bg-gray-50">
            <td className="px-4 py-2 text-blue-600 cursor-pointer">
              {client.id}
            </td>
            <td className="px-4 py-2">{client.name}</td>
            <td className="px-4 py-2">{client.type}</td>
            <td className="px-4 py-2">{client.email}</td>
            <td className="px-4 py-2">
              <Badge
                variant={client.status === "Active" ? "default" : "destructive"}
              >
                {client.status}
              </Badge>
            </td>
            <td className="px-4 py-2">{client.createdAt}</td>
            <td className="px-4 py-2">{client.updatedAt}</td>
            <td className="px-4 py-2">{client.updatedBy}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ClientTable;
