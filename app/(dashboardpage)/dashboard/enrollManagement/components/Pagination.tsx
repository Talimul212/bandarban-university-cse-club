/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Table } from "@tanstack/react-table";

const Pagination = ({ table }: { table: Table<any> }) => {
  return (
    <div className="px-6 py-4 border-t border-green-100 flex flex-col sm:flex-row items-center justify-between gap-3">
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <span>Rows per page:</span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => table.setPageSize(Number(e.target.value))}
          className="border border-green-200 rounded-lg px-2 py-1 text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          {[5, 10, 20, 50].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-1">
        <span className="text-sm text-gray-500 mr-2">
          Page{" "}
          <span className="font-semibold text-gray-700">
            {table.getState().pagination.pageIndex + 1}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-gray-700">
            {table.getPageCount()}
          </span>
        </span>
        {[
          {
            icon: ChevronsLeft,
            action: () => table.setPageIndex(0),
            disabled: !table.getCanPreviousPage(),
            title: "First",
          },
          {
            icon: ChevronLeft,
            action: () => table.previousPage(),
            disabled: !table.getCanPreviousPage(),
            title: "Previous",
          },
          {
            icon: ChevronRight,
            action: () => table.nextPage(),
            disabled: !table.getCanNextPage(),
            title: "Next",
          },
          {
            icon: ChevronsRight,
            action: () => table.setPageIndex(table.getPageCount() - 1),
            disabled: !table.getCanNextPage(),
            title: "Last",
          },
        ].map(({ icon: Icon, action, disabled, title }) => (
          <button
            key={title}
            onClick={action}
            disabled={disabled}
            title={title}
            className="p-1.5 rounded-lg text-gray-500 hover:text-green-700 hover:bg-green-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <Icon size={16} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Pagination;
