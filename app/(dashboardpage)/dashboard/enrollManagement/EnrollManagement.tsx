"use client";

import { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  ColumnDef,
  SortingState,
  ColumnFiltersState,
} from "@tanstack/react-table";
import {
  Eye,
  Trash2,
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  Search,
  X,
  GraduationCap,
  Users,
  CalendarDays,
  BadgeCheck,
} from "lucide-react";
import { Enrollment } from "@/utils/types";
import StatCard from "./components/StatCard";
import DetailModal from "./components/DetailModal";
import DeleteConfirmModal from "./components/DeleteConfirmModal";
import Pagination from "./components/Pagination";

export default function EnrollManagement({
  data = [],
}: {
  data?: Enrollment[];
}) {
  const safeData: Enrollment[] = Array.isArray(data) ? data : [];

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [selectedEnrollment, setSelectedEnrollment] =
    useState<Enrollment | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Enrollment | null>(null);

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/enrollments/${id}`, { method: "DELETE" });
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setDeleteTarget(null);
    }
  };

  const columns = useMemo<ColumnDef<Enrollment>[]>(
    () => [
      {
        id: "serial",
        header: "#",
        size: 48,
        cell: ({ row }) => (
          <span className="text-gray-400 text-xs font-mono">
            {row.index + 1}
          </span>
        ),
        enableSorting: false,
      },
      {
        accessorKey: "firstName",
        header: "Name",
        cell: ({ row }) => (
          <div>
            <p className="font-semibold text-gray-800 text-sm leading-tight">
              {row.original.firstName} {row.original.lastName}
            </p>
            <p className="text-xs text-gray-400">{row.original.email}</p>
          </div>
        ),
      },
      {
        accessorKey: "phone",
        header: "Phone",
        cell: ({ getValue }) => (
          <span className="text-sm text-gray-600 font-mono">
            {getValue() as string}
          </span>
        ),
      },
      {
        accessorKey: "gender",
        header: "Gender",
        cell: ({ getValue }) => {
          const val = getValue() as string;
          return (
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                val === "Male"
                  ? "bg-blue-50 text-blue-600 border border-blue-100"
                  : val === "Female"
                    ? "bg-pink-50 text-pink-600 border border-pink-100"
                    : "bg-gray-100 text-gray-500 border border-gray-200"
              }`}
            >
              {val}
            </span>
          );
        },
      },
      {
        id: "education",
        header: "Education",
        cell: ({ row }) => {
          const edu = row.original.educationList[0];
          return edu ? (
            <div>
              <p className="text-xs font-semibold text-gray-700 leading-tight">
                {edu.degree}
              </p>
              <p className="text-[11px] text-gray-400">{edu.institutionName}</p>
            </div>
          ) : (
            <span className="text-gray-300 text-xs">—</span>
          );
        },
        enableSorting: false,
      },
      {
        accessorKey: "paymentMethod",
        header: "Payment",
        cell: ({ getValue }) => (
          <span className="text-xs text-green-700 bg-green-50 border border-green-200 px-2 py-1 rounded-lg font-medium">
            {(getValue() as string).replace("Mobile Banking ", "")}
          </span>
        ),
      },
      {
        accessorKey: "createdAt",
        header: "Submitted",
        cell: ({ getValue }) => (
          <span className="text-xs text-gray-400">
            {new Date(getValue() as string).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </span>
        ),
      },
      {
        id: "actions",
        header: "Actions",
        size: 100,
        enableSorting: false,
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedEnrollment(row.original)}
              className="p-1.5 rounded-lg text-green-600 hover:bg-green-50 hover:text-green-700 transition-colors"
              title="View Details"
            >
              <Eye size={16} />
            </button>
            <button
              onClick={() => setDeleteTarget(row.original)}
              className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors"
              title="Delete"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ),
      },
    ],
    [],
  );

  const table = useReactTable({
    data: safeData,
    columns,
    state: { sorting, columnFilters, globalFilter },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } },
  });

  const totalRows = table.getFilteredRowModel().rows.length;

  const maleCount = safeData.filter(
    (d) => d.gender?.toLowerCase() === "male",
  ).length;
  const femaleCount = safeData.filter(
    (d) => d.gender?.toLowerCase() === "female",
  ).length;
  const otherCount = safeData.filter(
    (d) => !["male", "female"].includes(d.gender?.toLowerCase() ?? ""),
  ).length;
  const thisMonth = safeData.filter((d) => {
    const date = new Date(d.createdAt);
    const now = new Date();
    return (
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    );
  }).length;

  return (
    <div className="min-h-screen bg-green-50/50 font-sans">
      {/* Page Header */}
      <div className="relative bg-linear-to-br from-green-800 to-green-600 px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-9 h-9 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center">
              <GraduationCap size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">
                BU CSE Club
              </h1>
              <p className="text-green-200 text-xs">
                Enrollment Management Dashboard
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            icon={Users}
            label="Total Enrollments"
            value={safeData.length}
            accent="bg-green-600"
          />
          <StatCard
            icon={BadgeCheck}
            label="This Month"
            value={thisMonth}
            accent="bg-emerald-500"
          />
          <StatCard
            icon={Users}
            label="Male"
            value={maleCount}
            accent="bg-blue-500"
          />
          <StatCard
            icon={CalendarDays}
            label="Female / Other"
            value={`${femaleCount} / ${otherCount}`}
            accent="bg-pink-400"
          />
        </div>

        {/* Table Card */}
        <div className="bg-white border border-green-100 rounded-3xl shadow-sm overflow-hidden">
          {/* Toolbar */}
          <div className="px-6 py-4 border-b border-green-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h2 className="font-bold text-gray-800 text-base">
                All Enrollments
              </h2>
              <p className="text-xs text-gray-400">
                {totalRows} record{totalRows !== 1 ? "s" : ""} found
              </p>
            </div>
            <div className="relative w-full sm:w-72">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                placeholder="Search name, email, phone…"
                className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-green-200 bg-green-50/50 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent text-gray-700 placeholder-gray-400 transition"
              />
              {globalFilter && (
                <button
                  onClick={() => setGlobalFilter("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={13} />
                </button>
              )}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr
                    key={headerGroup.id}
                    className="bg-green-50/70 border-b border-green-100"
                  >
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-green-700 whitespace-nowrap select-none"
                        style={{ width: header.getSize() }}
                      >
                        {header.isPlaceholder ? null : (
                          <div
                            className={`flex items-center gap-1 ${
                              header.column.getCanSort()
                                ? "cursor-pointer hover:text-green-900 transition-colors"
                                : ""
                            }`}
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                            {header.column.getCanSort() &&
                              ({
                                asc: <ChevronUp size={12} />,
                                desc: <ChevronDown size={12} />,
                              }[header.column.getIsSorted() as string] ?? (
                                <ChevronsUpDown
                                  size={12}
                                  className="opacity-40"
                                />
                              ))}
                          </div>
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.length === 0 ? (
                  <tr>
                    <td
                      colSpan={columns.length}
                      className="py-16 text-center text-gray-400 text-sm"
                    >
                      No enrollments found.
                    </td>
                  </tr>
                ) : (
                  table.getRowModel().rows.map((row, i) => (
                    <tr
                      key={row.id}
                      className={`border-t border-gray-50 hover:bg-green-50/40 transition-colors ${
                        i % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                      }`}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="px-5 py-3.5">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <Pagination table={table} />
        </div>
      </div>

      {/* Modals */}
      {selectedEnrollment && (
        <DetailModal
          enrollment={selectedEnrollment}
          onClose={() => setSelectedEnrollment(null)}
        />
      )}

      {deleteTarget && (
        <DeleteConfirmModal
          name={`${deleteTarget.firstName} ${deleteTarget.lastName}`}
          onConfirm={() => handleDelete(deleteTarget._id)}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
