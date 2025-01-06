import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { ReactNode, useState } from "react";

type SortDirection = "asc" | "desc";

export type SortableTableOpts<T> = {
  collapse?: string;
  render?:
    | ((item: T) => ReactNode)
    | ((item: T, column: Column<T>) => ReactNode);
};

export type Column<T> = {
  label: string;
  key: string;
  sortable: boolean;
  options?: SortableTableOpts<T>;
};

type SortableTableProps<T> = {
  columns: Column<T>[];
  data: T[];
  defaultSortKey?: keyof T;
  defaultSortDirection?: SortDirection;
  name: string;
  handleEditEntity: (entity: T | null) => void;
};

export default function SortableTable<T>({
  columns,
  data,
  defaultSortKey,
  defaultSortDirection = "asc",
  name,
  handleEditEntity,
}: SortableTableProps<T>) {
  const [sortKey, setSortKey] = useState<keyof T | undefined>(defaultSortKey);
  const [sortDirection, setSortDirection] =
    useState<SortDirection>(defaultSortDirection);

  const handleSort = (key: keyof T) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  function getValue<T>(obj: T, path: string): unknown {
    let value = path.split(".").reduce((acc: unknown, part: string) => {
      if (acc && typeof acc === "object" && part in acc) {
        return (acc as Record<string, unknown>)[part];
      }
      return "undefined";
    }, obj);

    if (Array.isArray(value)) {
      value = value[0];
    }
    return value;
  }

  const sortedData = [...data].sort((a, b) => {
    if (!sortKey) return 0;

    const aValue = getValue(a, sortKey as string) as string;
    const bValue = getValue(b, sortKey as string) as string;

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  function getSortIcon(field: keyof T) {
    const baseClasses =
      "flex justify-center items-center h-4 w-4 ml-2 rounded bg-slate-200 border border-slate-300";
    const iconClasses = "h-4 w-4";

    if (sortKey === field) {
      return (
        <span className={`${baseClasses}`}>
          {sortDirection === "asc" ? (
            <ChevronUpIcon className={iconClasses} aria-hidden="true" />
          ) : (
            <ChevronDownIcon className={iconClasses} aria-hidden="true" />
          )}
        </span>
      );
    } else {
      return (
        <span className={baseClasses}>
          <ChevronDownIcon className={iconClasses} aria-hidden="true" />
        </span>
      );
    }
  }

  return (
    <table className="w-full border-spacing-0 overflow-y-auto">
      <thead>
        <tr>
          {columns.map((column) => (
            <th
              key={`${name}-${String(column.key)}`}
              scope="col"
              onClick={() =>
                column?.sortable && handleSort(column.key as keyof T)
              }
              className={`sticky top-0 z-2 border-b border-gray-300 bg-opacity-75 py-3.5 pl-2 pr-3 text-left text-sm font-semibold text-foreground ${
                column?.sortable ? "cursor-pointer" : ""
              } ${column?.options?.collapse || ""}`}
            >
              {column.sortable ? (
                <a
                  href=""
                  className="inline-flex justify-center align-middle group"
                  onClick={(e) => {
                    e.preventDefault();
                    column.sortable && handleSort(column.key as keyof T);
                  }}
                >
                  <div className="flex items-center">
                    <span>{column.label}</span>
                    {getSortIcon(column.key as keyof T)}
                  </div>
                </a>
              ) : (
                column.label
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((item, index) => (
          <tr
            key={`${name}-${index}`}
            id={`${name}-${index}`}
            className="py-1 cursor-pointer hover:bg-background-hover"
            onClick={() => {
              handleEditEntity(item);
            }}
          >
            {columns.map((column) => {
              return column?.options?.render ? (
                column.options.render(item, column)
              ) : (
                <td
                  key={`${String(column.key)}-${index}`}
                  id={`${String(column.key)}-${index}`}
                  className={`admin-table-element whitespace-nowrap ${column?.options?.collapse || ""}`}
                >
                  {getValue(item, column.key as string) as ReactNode}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
