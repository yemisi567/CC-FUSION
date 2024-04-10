import * as React from "react";
import {
  useReactTable,
  flexRender,
  ColumnDef,
  Row,
  RowSelectionState,
  getCoreRowModel,
  OnChangeFn,
  VisibilityState,
  ExpandedState,
  getExpandedRowModel,
} from "@tanstack/react-table";
import { cn } from "../../utils/helpers";

interface SortConfigProps {
  key: string;
  direction: string;
}

enum SortOrder {
  ASC = "ASC",
  DESC = "DESC",
}

interface TableProps<TData> {
  /** Table data */
  data: TData[];
  /** Defines table columns and their values */
  columns: ColumnDef<TData>[];
  /** Table title */
  title?: string;
  /** Customizable table header */
  tableHeader?: React.ReactNode;
  /** Additional classname for styling */
  className?: string;
  /** Row selected state */
  rowSelection?: RowSelectionState;
  /** row expanded state returns a boolean object containing the index of the rows expanded. */
  expandedRows?: ExpandedState;
  /** Set selected rows state */
  setRowSelection?: OnChangeFn<RowSelectionState> | undefined;
  /** Set expanded rows state */
  setExpandedRows?: OnChangeFn<ExpandedState> | undefined;
  /** Click handler for each table row */
  handleRowClick?: (row: Row<TData>) => void;
  /**  Function that handles adding styling to each table row */
  handleRowStyle?: (row: Row<TData>) => Record<string, string>;
  /** Determines visibility of a column */
  isColumnVisible?: VisibilityState;
  /** Is the table header fixed */
  isHeaderFixed?: boolean;
  /** Sets selected rows state */
  setGetSelectedData?: (row: Row<TData>[]) => void;
  /** this is a component that contains the columns to be rendered when a row is expanded */
  renderRowSubComponent?: (props: { row: Row<TData> }) => JSX.Element;
  /** Sets configuration for sorting direction state */
  setSortConfig?: (value: React.SetStateAction<SortConfigProps>) => void;
  /** Sort configuration of a column */
  sortConfig?: { key: string; direction: string };
  /** Array of sortable table columns */
  sortableColumns?: string[];
  /** Pagination prop of table */
  pagination?: React.ReactElement;
}

export function Table<TData>({
  data,
  columns,
  title,
  tableHeader,
  className,
  rowSelection,
  expandedRows,
  setExpandedRows,
  setRowSelection,
  handleRowClick,
  handleRowStyle,
  isColumnVisible,
  isHeaderFixed,
  setGetSelectedData,
  renderRowSubComponent,
  setSortConfig,
  sortConfig,
  sortableColumns,
  pagination,
}: TableProps<TData>) {
  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection: rowSelection || {},
      columnVisibility: isColumnVisible || {},
      expanded: expandedRows,
    },
    onExpandedChange: setExpandedRows,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    enableHiding: true,
  });

  const handleSort = (key: string) => {
    let direction: SortOrder = SortOrder.ASC;

    if (
      sortConfig?.key === key &&
      sortableColumns?.includes(key) &&
      sortConfig?.direction === SortOrder.ASC
    ) {
      direction = SortOrder.DESC;
    }

    if (setSortConfig) {
      setSortConfig({ key, direction });
    }
  };

  React.useEffect(() => {
    if (setGetSelectedData) {
      const ids = table
        .getSelectedRowModel()
        .flatRows.filter((row) => row.original);
      setGetSelectedData(ids);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowSelection]);

  return (
    <>
      {title && (
        <h3 className="block font-medium text-sm mb-32 uppercase ml-8">
          {title}
        </h3>
      )}
      {tableHeader || null}
      <div
        className={cn(
          "w-full overflow-x-auto flex flex-col border border-strokelight rounded-r8",
          { "max-h-[70vh] overflow-y-auto": isHeaderFixed }
        )}
      >
        <table className={cn("w-full border-collapse", className)}>
          <thead
            className={cn({
              "top-0 sticky bg-white": isHeaderFixed,
            })}
          >
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="p-24">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className={cn(
                      "text-left text-[12px] uppercase font-medium text-gray p-12 border-b border-strokelight",
                      {
                        "cursor-default": sortableColumns?.includes(
                          header.column.id
                        ),
                      }
                    )}
                    onClick={() => {
                      if (sortableColumns?.includes(header.column.id)) {
                        handleSort(header.column.id);
                      }
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    <span className="ml-10">
                      {sortConfig?.key === header.column.id &&
                        sortableColumns?.includes(sortConfig.key) && (
                          <span className="text-xss">
                            {sortConfig?.direction === SortOrder.ASC
                              ? "▲"
                              : "▼"}
                          </span>
                        )}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="align-middle">
            {table.getRowModel().rows.map((row) => (
              <>
                <tr
                  key={row.id}
                  onClick={
                    handleRowClick ? () => handleRowClick(row) : undefined
                  }
                  style={handleRowStyle && handleRowStyle(row)}
                  className={cn({
                    "cursor-default hover:bg-secondary-light": handleRowClick,
                  })}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className={cn(
                        "p-12 text-sm font-normal border-b border-strokelight"
                      )}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
                {row.getIsExpanded() && (
                  <tr>
                    <td
                      colSpan={row.getVisibleCells().length}
                      className="pl-10 bg-secondary-light"
                    >
                      {renderRowSubComponent &&
                        renderRowSubComponent({
                          row,
                        })}
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
        {pagination ? (
          <div className="px-24 py-[14px]">{pagination}</div>
        ) : null}
      </div>
    </>
  );
}
