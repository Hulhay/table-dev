import React, { useState } from "react";
import { ITableV2, ITableV2Column } from "./utils/Interface";
import {
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  Table,
  TableBody,
  TableCell,
  TableColumnDefinition,
  TableColumnId,
  TableHeader,
  TableHeaderCell,
  TableRow,
  TableRowData,
  useTableColumnSizing_unstable,
  useTableFeatures,
  useTableSort,
} from "@fluentui/react-components";
import {
  CreateColumnHeader,
  GetTableColumnSizingOptions,
} from "./utils/Helper";

const TableV2: React.FC<ITableV2> = (props) => {
  const defaultColumns = props.defaultColumns || props.defaultColumns || [];
  const defaultDataSource = props.defaultDataSource || props.dataSource || [];
  const [columnSizingOptions] = useState(
    GetTableColumnSizingOptions(defaultColumns)
  );

  const sortableCols = defaultColumns.filter(
    (col) => col.compare !== undefined
  );

  const {
    tableRef,
    getRows,
    columns,
    columnSizing_unstable,
    sort: { getSortDirection, toggleColumnSort, sort },
  } = useTableFeatures(
    {
      columns: CreateColumnHeader(defaultColumns),
      items: defaultDataSource,
    },
    [
      useTableColumnSizing_unstable({ columnSizingOptions }),
      useTableSort({
        defaultSortState: {
          sortColumn: sortableCols.length > 0 ? sortableCols[0].key : undefined,
          sortDirection: "ascending",
        },
      }),
    ]
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
    <Table
      ref={props.resizable === false ? undefined : tableRef}
      {...columnSizing_unstable.getTableProps()}
    >
      {/* Table Header */}
      <TableHeader>
        <TableRow style={{backgroundColor: "#eeeeee"}}>
          {columns.map((column: TableColumnDefinition<any>, index: number) => {
            return (
              <Menu openOnContext key={column.columnId}>
                <MenuTrigger>
                  <TableHeaderCell
                    key={column.columnId}
                    tabIndex={index}
                    {...columnSizing_unstable.getTableHeaderCellProps(
                      column.columnId
                    )}
                    {...(column.compare.length > 0 &&
                      headerSortProps(column.columnId))}
                  >
                    {column.renderHeaderCell()}
                  </TableHeaderCell>
                </MenuTrigger>
                <MenuPopover>
                  <MenuList>
                    <MenuItem
                      onClick={columnSizing_unstable.enableKeyboardMode(
                        column.columnId
                      )}
                    >
                      Keyboard Column Resizing
                    </MenuItem>
                  </MenuList>
                </MenuPopover>
              </Menu>
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
                  <TableCell
                    key={row.item[column.dataIndex || column.key]}
                    {...columnSizing_unstable.getTableCellProps(column.key)}
                  >
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
