import React, { useMemo, useState } from "react";
import { ITableV2, ITableV2Column } from "./utils/Interface";
import {
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuProps,
  MenuTrigger,
  Table,
  TableBody,
  TableCell,
  TableColumnId,
  TableHeader,
  TableHeaderCell,
  TableRow,
  TableSelectionCell,
  useTableColumnSizing_unstable,
  useTableFeatures,
  useTableSelection,
  useTableSort,
} from "@fluentui/react-components";
import {
  CreateColumnHeader,
  GetColumnKeyHidden,
  GetColumnKeyShow,
  GetTableColumnSizingOptions,
  Reorder,
  SetDisplayColumns,
} from "./utils/Helper";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import HeaderCell from "./HeaderCell";
import ShowHideColumn from "./ShowHideColumn";
import LoadingState from "./LoadingState";

const TableV2: React.FC<ITableV2> = (props) => {
  const defaultDisplayColumn = props.defaultColumns
    ? props.defaultColumns.map((obj) => obj.key)
    : props.columns
    ? props.columns.map((obj) => obj.key)
    : [];

  const [defaultColumns, setDefaultColumns] = useState<ITableV2Column[]>(
    props.defaultColumns || []
  );
  const columnsData = props.columns || defaultColumns;

  const [defaultDataSource] = useState(
    props.defaultDataSource || props.dataSource || []
  );

  const [columnSizingOptions] = useState(
    GetTableColumnSizingOptions(columnsData)
  );

  const sortableColumns = columnsData.filter(
    (col) => col.compare !== undefined
  );

  const {
    tableRef,
    getRows,
    columnSizing_unstable,
    sort: { getSortDirection, toggleColumnSort, sort },
    selection: {
      toggleRow,
      isRowSelected,
      allRowsSelected,
      someRowsSelected,
      toggleAllRows,
    },
  } = useTableFeatures(
    {
      columns: CreateColumnHeader(columnsData),
      items: defaultDataSource,
    },
    [
      useTableColumnSizing_unstable({ columnSizingOptions }),
      useTableSort({
        defaultSortState:
          props.sort === undefined
            ? {
                sortColumn:
                  sortableColumns.length > 0
                    ? sortableColumns[0].key
                    : undefined,
                sortDirection: "ascending",
              }
            : undefined,
        sortState: props.sort
          ? {
              sortColumn: props.sort?.sortColumn,
              sortDirection:
                props.sort?.sortDirection === "ascending"
                  ? "ascending"
                  : "descending",
            }
          : undefined,
        onSortChange: props.onSortChange
          ? (_, nextSortState) =>
              props.onSortChange?.({
                sortColumn: nextSortState.sortColumn as string,
                sortDirection: nextSortState.sortDirection,
              })
          : undefined,
      }),
      useTableSelection({
        selectionMode:
          props.selectionMode !== undefined ? props.selectionMode : "single",
        selectedItems:
          props.selectedRowsIndex && new Set(props.selectedRowsIndex),
        onSelectionChange: props.onSelectedRowsIndexChange
          ? (_, data) => {
              const rowIndex = Array.from(data.selectedItems).map((item) =>
                parseInt(item.toString())
              );
              props.onSelectedRowsIndexChange?.(rowIndex);
            }
          : undefined,
      }),
    ]
  );

  const headerSortProps = (columnId: TableColumnId) => ({
    onClick: (e: React.MouseEvent) => {
      toggleColumnSort(e, columnId);
    },
    sortDirection: getSortDirection(columnId),
  });

  const rows = sort(
    getRows((row) => {
      const selected = isRowSelected(row.rowId);
      return {
        ...row,
        onClick: (e: React.MouseEvent) => toggleRow(e, row.rowId),
        selected,
        appearance:
          selected && props.selectionMode
            ? ("brand" as const)
            : ("none" as const),
      };
    })
  );

  const moveColumn = (sourceIndex: number, destinationIndex: number) => {
    const newOrderHeader = Reorder(columnsData, sourceIndex, destinationIndex);

    props.defaultColumns && setDefaultColumns(newOrderHeader);
    props.columns &&
      props.onRearrangeColumn?.(
        newOrderHeader,
        columnsData[sourceIndex].key,
        sourceIndex,
        destinationIndex
      );
  };

  const columnsShow = useMemo(
    () => GetColumnKeyShow(columnsData),
    [columnsData]
  );
  const columnsHidden = useMemo(
    () => GetColumnKeyHidden(columnsShow, defaultDataSource),
    []
  );

  const [checkedValues, setCheckedValues] = useState<Record<string, string[]>>({
    show: columnsShow,
  });
  const [unCheckedValues, setUncheckedValues] = useState<
    Record<string, string[]>
  >({
    hidden: columnsHidden,
  });
  const onCheckedValueChange: MenuProps["onCheckedValueChange"] = (
    _,
    { name, checkedItems }
  ) => {
    const { show } = checkedValues;
    const { hidden } = unCheckedValues;

    if (name === "show") {
      const checked = show.filter((item) => checkedItems.includes(item));
      const unchecked = show.filter((item) => !checkedItems.includes(item));

      hidden.push(...unchecked);

      setCheckedValues({ show: checked });
      setUncheckedValues((prev) => {
        return prev ? { ...prev, ["hidden"]: hidden } : { ["hidden"]: hidden };
      });

      const newColumns = columnsData.filter((item) =>
        checked.includes(item.key)
      );
      setDefaultColumns(newColumns);

      return;
    }

    if (name === "hidden") {
      show.push(...checkedItems);
      const newUncheckedValues = hidden.filter(
        (item) => !checkedItems.includes(item)
      );

      setUncheckedValues({ hidden: newUncheckedValues });
      setCheckedValues((prev) => {
        return prev ? { ...prev, ["show"]: show } : { ["show"]: show };
      });

      const newDisplayColumns = SetDisplayColumns(
        columnsData,
        checkedItems[0],
        defaultDisplayColumn,
        props.defaultColumns || props.columns
      );
      setDefaultColumns(newDisplayColumns);

      return;
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {props.settingShowColumnEnabled && (
        <ShowHideColumn
          checkedValues={checkedValues}
          uncheckedValues={unCheckedValues}
          onCheckedValueChange={onCheckedValueChange}
        />
      )}
      <DndProvider backend={HTML5Backend}>
        <Table
          ref={props.resizable === false ? undefined : tableRef}
          {...columnSizing_unstable.getTableProps()}
        >
          {/* Table Header */}
          <TableHeader>
            <TableRow style={{ backgroundColor: "#eeeeee" }}>
              {props.selectionMode && (
                <TableSelectionCell
                  type={props.selectionMode === "single" ? "radio" : "checkbox"}
                  checked={
                    allRowsSelected ? true : someRowsSelected ? "mixed" : false
                  }
                  hidden={props.selectionMode !== "multiselect"}
                  onClick={toggleAllRows}
                />
              )}
              {columnsData.map((column: ITableV2Column, index: number) => {
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
            {props.loading ? (
              <LoadingState
                colspan={
                  props.selectionMode
                    ? columnsData.length + 1
                    : columnsData.length
                }
              />
            ) : (
              <>
                {rows.map(({ item, selected, onClick, appearance }, index) => {
                  return (
                    <TableRow
                      key={index}
                      tabIndex={index}
                      onClick={onClick}
                      appearance={appearance}
                    >
                      {props.selectionMode && (
                        <TableSelectionCell
                          subtle={props.subtleSelection}
                          type={
                            props.selectionMode === "single"
                              ? "radio"
                              : "checkbox"
                          }
                          checked={selected}
                        />
                      )}
                      {columnsData.map((column: ITableV2Column) => {
                        return (
                          <TableCell
                            key={item[column.dataIndex || column.key]}
                            {...columnSizing_unstable.getTableCellProps(
                              column.key
                            )}
                          >
                            {column.onRenderDataSource
                              ? column.onRenderDataSource(item)
                              : item[column.dataIndex || ""]}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </>
            )}
          </TableBody>
        </Table>
      </DndProvider>
    </div>
  );
};

export default TableV2;
