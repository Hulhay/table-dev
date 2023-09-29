import React from "react";
import { ITableV2, ITableV2Column } from "./utils/Interface";
import {
  Table,
  TableBody,
  TableCell,
  TableColumnDefinition,
  TableColumnId,
  TableHeader,
  TableHeaderCell,
  TableRow,
  TableRowData,
  useTableFeatures,
  useTableSort,
} from "@fluentui/react-components";
import { CreateColumnHeader } from "./utils/Helper";

const TableV2: React.FC<ITableV2> = (props) => {
  const defaultColumns = props.defaultColumns || props.defaultColumns || [];
  const defaultDataSource = props.defaultDataSource || props.dataSource || [];
  const sortableCols = defaultColumns.filter(
    (col) => col.compare !== undefined
  );

  const {
    getRows,
    columns,
    sort: { getSortDirection, toggleColumnSort, sort },
  } = useTableFeatures(
    {
      columns: CreateColumnHeader(defaultColumns),
      items: defaultDataSource,
    },
    sortableCols.length > 0
      ? [
          // eslint-disable-next-line react-hooks/rules-of-hooks
          useTableSort({
            defaultSortState: {
              sortColumn: sortableCols[0].key,
              sortDirection: "ascending",
            },
          }),
        ]
      : []
  );

  const headerSortProps = (columnId: TableColumnId) => ({
    onClick: (e: React.MouseEvent) => {
      const column = columns.find((column) => column.columnId === columnId);
      column?.compare && toggleColumnSort(e, columnId);
    },
    sortDirection: getSortDirection(columnId),
  });

  const rows = sort(getRows());

  return (
    <Table>
      {/* Table Header */}
      <TableHeader>
        <TableRow>
          {columns.map((column: TableColumnDefinition<any>, index: number) => {
            return (
              <TableHeaderCell
                key={column.columnId}
                tabIndex={index}
                {...(column.compare.length > 0 &&
                  headerSortProps(column.columnId))}
                style={{ backgroundColor: "#eeeeee" }}
              >
                {column.renderHeaderCell()}
              </TableHeaderCell>
            );
          })}
        </TableRow>
      </TableHeader>

      {/* Table Body */}
      <TableBody>
        {rows.map((row: TableRowData<any>, index: number) => {
          return (
            <TableRow key={index} tabIndex={index}>
              {defaultColumns.map((column: ITableV2Column) => {
                return (
                  <TableCell key={row.item[column.dataIndex || column.key]}>
                    {column.onRenderDataSource
                      ? column.onRenderDataSource(row.item)
                      : row.item[column.dataIndex || ""]}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default TableV2;
