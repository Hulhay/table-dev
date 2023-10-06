import React, { useMemo, useState } from "react";
import { ITableV2, ITableV2Column } from "./utils/Interface";
import {
  MenuProps,
  SortDirection,
  Table,
  TableBody,
  TableColumnId,
  TableColumnSizingOptions,
  TableHeader,
  TableRowId,
  useTableColumnSizing_unstable,
  useTableFeatures,
  useTableSelection,
  useTableSort,
} from "@fluentui/react-components";
import {
  CreateColumnHeader,
  GenerateUniqueID,
  GetColumnKeyHidden,
  GetColumnKeyShow,
  GetTableColumnSizingOptions,
  GetUniqueFromData,
  Reorder,
  SetDisplayColumns,
  ShowSettingButton,
} from "./utils/Helper";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import LoadingState from "./LoadingState";
import SettingButton from "./SettingButton";
import TableGroupHeaderCell from "./TableGroupHeaderCell";
import AddRow from "./AddRow";
import BodyRow from "./BodyRow";
import HeaderRow from "./HeaderRow";

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

  const [defaultDataSource, setDefaultDataSource] = useState(
    props.defaultDataSource || []
  );
  const dataSource = props.dataSource || defaultDataSource;

  const [columnSizingOptions] = useState<TableColumnSizingOptions>(
    GetTableColumnSizingOptions(defaultColumns)
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
      items: dataSource,
    },
    [
      useTableColumnSizing_unstable({
        columnSizingOptions,
        onColumnResize: (_, { columnId, width }) => {
          props.resizable && props.onResizeColumn?.(columnId as string, width);
        },
      }),
      useTableSort({
        sortState: props.sort
          ? {
              sortColumn: props.sort?.sortColumn,
              sortDirection: props.sort?.sortDirection as SortDirection,
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

  const onColumnMove = (sourceIndex: number, destinationIndex: number) => {
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
    () => GetColumnKeyHidden(columnsShow, dataSource),
    []
  );

  const [columnsCheckedValues, setcolumnsCheckedValues] = useState<
    Record<string, string[]>
  >({
    show: columnsShow,
  });
  const [columnsUncheckedValues, setcolumnsUncheckedValues] = useState<
    Record<string, string[]>
  >({
    hidden: columnsHidden,
  });
  const onColumnsCheckedValueChange: MenuProps["onCheckedValueChange"] = (
    _,
    { name, checkedItems }
  ) => {
    const { show } = columnsCheckedValues;
    const { hidden } = columnsUncheckedValues;

    if (name === "show") {
      const checked = show.filter((item) => checkedItems.includes(item));
      const unchecked = show.filter((item) => !checkedItems.includes(item));

      hidden.push(...unchecked);

      setcolumnsCheckedValues({ show: checked });
      setcolumnsUncheckedValues((prev) => {
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

      setcolumnsUncheckedValues({ hidden: newUncheckedValues });
      setcolumnsCheckedValues((prev) => {
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

  const [defaultGroupBy, setDefaultGroupBy] = useState<
    Record<string, string[]>
  >({
    groupby: ["none"],
  });
  const groupBy = props.groupBy ? { groupby: [props.groupBy] } : defaultGroupBy;

  const onGroupByChange: MenuProps["onCheckedValueChange"] = (
    _,
    { name, checkedItems }
  ) => {
    if (props.groupBy) {
      props.onGroupByChange?.(groupBy["groupby"][0], checkedItems[0]);
    } else {
      setDefaultGroupBy((prev) => ({ ...prev, [name]: checkedItems }));
    }
  };

  const groups = GetUniqueFromData(dataSource, groupBy["groupby"][0]);

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

  const handleOnRowClick = (
    e: React.MouseEvent,
    rowId: TableRowId,
    row: any
  ) => {
    toggleRow(e, rowId);
    props.onRowClick?.(row);
  };

  const handleOnHeaderCellClick = (
    _?: React.MouseEvent,
    column?: ITableV2Column
  ) => {
    props.onHeaderCellClick?.(column);
  };

  const handleOnAddRowClick = (groupItem?: string) => {
    const defaultId = GenerateUniqueID();
    const defaultNewRow = {
      id: `row-${defaultId}`,
    };
    props.onAddRowClick?.(
      [...dataSource, defaultNewRow],
      defaultNewRow,
      groupItem
    );

    props.defaultDataSource &&
      setDefaultDataSource((prev) => [...prev, defaultNewRow]);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {ShowSettingButton(props) && (
        <SettingButton
          menuShowColumnEnabled={props.menuShowColumnEnabled}
          menuGroupDataSourceEnabled={props.menuGroupDataSourceEnabled}
          showColumnTableProps={{
            checkedValues: columnsCheckedValues,
            uncheckedValues: columnsUncheckedValues,
            onCheckedValueChange: onColumnsCheckedValueChange,
          }}
          groupByTableProps={{
            groupBy,
            onGroupByChange,
            groupByList: Object.keys(dataSource[0]),
          }}
        />
      )}
      <DndProvider backend={HTML5Backend}>
        <React.Fragment>
          <Table
            ref={props.resizable === false ? undefined : tableRef}
            {...columnSizing_unstable.getTableProps()}
          >
            {/* Table Header */}
            <TableHeader>
              <HeaderRow
                columnsData={columnsData}
                onColumnMove={onColumnMove}
                toggleAllRows={toggleAllRows}
                headerSortProps={headerSortProps}
                selectionMode={props.selectionMode}
                onHeaderCellClick={handleOnHeaderCellClick}
                columnSizing_unstable={columnSizing_unstable}
                checked={
                  allRowsSelected ? true : someRowsSelected ? "mixed" : false
                }
                rearrangeColumnEnabled={
                  props.rearrangeColumnEnabled === true ? true : false
                }
              />
            </TableHeader>

            {/* Table Body */}
            <TableBody>
              {props.loading ? (
                // Loading State
                <LoadingState
                  colspan={
                    props.selectionMode
                      ? columnsData.length + 1
                      : columnsData.length
                  }
                />
              ) : (
                // Data Source
                <React.Fragment>
                  {groups.map((groupItem) => {
                    return (
                      <React.Fragment>
                        {/* Group Header */}
                        {groups[0] && (
                          <TableGroupHeaderCell
                            label={groupItem}
                            colspan={
                              props.selectionMode
                                ? columnsData.length + 1
                                : columnsData.length
                            }
                          />
                        )}

                        {/* Table Row */}
                        {rows.map(
                          ({ item, selected, appearance, rowId }, index) => {
                            if (item[groupBy["groupby"][0]] !== groupItem)
                              return;
                            return (
                              <BodyRow
                                key={index}
                                item={item}
                                rowId={rowId}
                                index={index}
                                selected={selected}
                                appearance={appearance}
                                columnsData={columnsData}
                                onRowClick={handleOnRowClick}
                                selectionMode={props.selectionMode}
                                subtleSelection={props.subtleSelection}
                                columnSizing_unstable={columnSizing_unstable}
                              />
                            );
                          }
                        )}

                        {/* Add Row */}
                        {props.addRowEnabled && (
                          <AddRow
                            onAddRowClick={() => handleOnAddRowClick(groupItem)}
                            colspan={
                              props.selectionMode
                                ? columnsData.length + 1
                                : columnsData.length
                            }
                          />
                        )}
                      </React.Fragment>
                    );
                  })}
                </React.Fragment>
              )}
            </TableBody>
          </Table>
        </React.Fragment>
      </DndProvider>
    </div>
  );
};

export default TableV2;
