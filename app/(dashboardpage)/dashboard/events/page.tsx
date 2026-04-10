"use client";

import { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import {
  Calendar,
  MapPin,
  Tag,
  Plus,
  Search,
  Edit,
  Trash2,
  ExternalLink,
} from "lucide-react";
import { events } from "@/app/(frontendpage)/events/data/eventData";

export default function EventsManagement() {
  const [globalFilter, setGlobalFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "title",
        header: "Event Info",
        cell: ({ row }) => (
          <div className="flex flex-col">
            <span className="font-bold text-gray-800 text-sm">
              {row.original.title}
            </span>
            <span className="text-[10px] text-gray-400 font-mono uppercase">
              {row.original.id}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "category",
        header: "Category",
        cell: ({ getValue }) => (
          <span className="text-[10px] font-bold px-2 py-1 rounded bg-gray-100 text-gray-600 uppercase tracking-tight">
            {getValue() as string}
          </span>
        ),
      },
      {
        accessorKey: "startDateTime",
        header: "Date & Venue",
        cell: ({ row }) => (
          <div className="text-[11px]">
            <div className="flex items-center gap-1 text-gray-700">
              <Calendar size={12} className="text-[#028237]" />
              {new Date(row.original.startDateTime).toLocaleDateString(
                "en-GB",
                { day: "2-digit", month: "short" },
              )}
            </div>
            <div className="flex items-center gap-1 text-gray-400">
              <MapPin size={12} />
              {row.original.location.venue}
            </div>
          </div>
        ),
      },
      {
        id: "regStatus",
        header: "Status",
        cell: ({ row }) => {
          const status = row.original.registration.status;
          const colors: any = {
            Open: "text-green-600 bg-green-50 border-green-200",
            Closed: "text-red-500 bg-red-50 border-red-200",
            Completed: "text-blue-500 bg-blue-50 border-blue-200",
          };
          return (
            <span
              className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border ${colors[status] || "bg-gray-50 text-gray-400"}`}
            >
              {status}
            </span>
          );
        },
      },
      {
        id: "actions",
        header: "Actions",
        cell: () => (
          <div className="flex gap-2">
            <button className="p-1.5 text-gray-400 hover:text-[#028237] transition-colors">
              <Edit size={14} />
            </button>
            <button className="p-1.5 text-gray-400 hover:text-red-500 transition-colors">
              <Trash2 size={14} />
            </button>
          </div>
        ),
      },
    ],
    [],
  );

  const table = useReactTable({
    data: events.data,
    columns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="p-6 bg-gray-50/50 min-h-screen">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            Event <span className="text-[#028237]">Vault</span>
          </h1>
          <p className="text-xs text-gray-500 font-mono uppercase tracking-widest">
            Total Events: {events.meta.total}
          </p>
        </div>
        <button className="flex items-center gap-2 bg-[#028237] text-white px-5 py-2.5 rounded-2xl font-bold text-sm shadow-lg shadow-[#028237]/20 hover:scale-[1.02] active:scale-95 transition-all">
          <Plus size={18} /> Add New Event
        </button>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={16}
          />
          <input
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search events, tags, or venues..."
            className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-[#028237]/10 transition-all"
          />
        </div>
        <select
          className="bg-gray-50 border-none rounded-2xl text-xs font-bold px-4 py-2.5 outline-none cursor-pointer"
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option>All Categories</option>
          <option>Workshops</option>
          <option>Seminars</option>
          <option>Competitions</option>
        </select>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id} className="bg-gray-50/50">
                {hg.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-50">
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-green-50/30 transition-colors"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-6 py-4">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
