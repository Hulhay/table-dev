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
  Reorder,
} from "./utils/Helper";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import HeaderCell from "./HeaderCell";

const TableV2: React.FC<ITableV2> = (props) => {
  const [defaultColumns, setDefaultColumns] = useState<ITableV2Column[]>(
    props.defaultColumns || props.columns || []
  );

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
      const column = defaultColumns.find((column) => column.key === columnId);
      column?.compare && toggleColumnSort(e, columnId);
    },
    sortDirection: getSortDirection(columnId),
  });

  const rows = sort(getRows());

  const moveColumn = (fromIndex: number, toIndex: number) => {
    const newOrderHeader = Reorder(defaultColumns, fromIndex, toIndex);
    setDefaultColumns(newOrderHeader);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Table
        ref={props.resizable === false ? undefined : tableRef}
        {...columnSizing_unstable.getTableProps()}
      >
        {/* Table Header */}
        <TableHeader>
          <TableRow style={{ backgroundColor: "#eeeeee" }}>
            {defaultColumns.map((column: ITableV2Column, index: number) => {
              return (
                <Menu openOnContext key={column.key}>
                  <MenuTrigger>
                    <TableHeaderCell
                      key={column.key}
                      tabIndex={index}
                      {...columnSizing_unstable.getTableHeaderCellProps(
                        column.key
                      )}
                      {...(column.compare && headerSortProps(column.key))}
                    >
                      <HeaderCell
                        column={column}
                        index={index}
                        key={column.key}
                        moveColumn={moveColumn}
                        rearrangeColumnEnabled={
                          props.rearrangeColumnEnabled === true ? true : false
                        }
                      />
                    </TableHeaderCell>
                  </MenuTrigger>
                  <MenuPopover>
                    <MenuList>
                      <MenuItem
                        onClick={columnSizing_unstable.enableKeyboardMode(
                          column.key
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
    </DndProvider>
  );
};

export default TableV2;
