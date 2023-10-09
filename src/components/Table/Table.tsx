import React, { useEffect, useState } from "react";
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
  GetGroupItems,
  GetTableColumnSizingOptions,
  Reorder,
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
  // =======
  // Columns
  // =======
  const [defaultColumns, setDefaultColumns] = useState<ITableV2Column[]>(
    props.defaultColumns || []
  );
  const columnsData = props.columns || defaultColumns;

  const [displayColumnsData, setDisplayColumnsData] = useState(
    columnsData.filter((obj) => !obj.hidden)
  );

  useEffect(() => {
    setDisplayColumnsData(columnsData.filter((obj) => !obj.hidden));
  }, [columnsData]);

  // ===========
  // Data Source
  // ===========
  const [defaultDataSource, setDefaultDataSource] = useState(
    props.defaultDataSource || []
  );
  const dataSource = props.dataSource || defaultDataSource;

  // ====================
  // Show and Hide Column
  // ====================
  const columnsShow = GetColumnKeyShow(columnsData);
  const columnsHidden = GetColumnKeyHidden(columnsData);

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

  useEffect(() => {
    setcolumnsCheckedValues({ show: columnsShow });
  }, [columnsShow]);

  // ====================
  // Grouping Data Source
  // ====================
  const [defaultGroupBy, setDefaultGroupBy] = useState<
    Record<string, string[]>
  >({
    groupby: ["none"],
  });
  const groupBy = props.groupBy ? { groupby: [props.groupBy] } : defaultGroupBy;

  // =============
  // Column Sizing
  // =============
  const [columnSizingOptions] = useState<TableColumnSizingOptions>(
    GetTableColumnSizingOptions(defaultColumns)
  );

  // ==============
  // Table Features
  // ==============
  const {
    getRows,
    tableRef,
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
      columns: CreateColumnHeader(displayColumnsData),
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
    sortDirection: getSortDirection(columnId),
    onClick: (e: React.MouseEvent) => {
      toggleColumnSort(e, columnId);
    },
  });

  const groups = GetGroupItems(dataSource, groupBy["groupby"][0]);

  const rows = sort(
    getRows((row) => {
      const selected = isRowSelected(row.rowId);
      return {
        ...row,
        selected,
        onClick: (e: React.MouseEvent) => toggleRow(e, row.rowId),
        appearance:
          selected && props.selectionMode
            ? ("brand" as const)
            : ("none" as const),
      };
    })
  );

  // ================
  // Handler Function
  // ================
  const handleOnColumnMove = (
    sourceIndex: number,
    destinationIndex: number
  ) => {
    const newOrderColumns = Reorder(
      displayColumnsData,
      sourceIndex,
      destinationIndex
    );

    props.defaultColumns && setDisplayColumnsData(newOrderColumns);
    props.onRearrangeColumn?.(
      newOrderColumns,
      displayColumnsData[sourceIndex].key,
      sourceIndex,
      destinationIndex
    );
  };

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
    const defaultNewRow = { id: `row-${defaultId}` };
    props.onAddRowClick?.(
      [...dataSource, defaultNewRow],
      defaultNewRow,
      groupItem
    );

    props.defaultDataSource &&
      setDefaultDataSource((prev) => [...prev, defaultNewRow]);
  };

  const handleOnAddColumnClick = () => {
    const defaultId = GenerateUniqueID();
    const defaultNewColumn: ITableV2Column = {
      key: `col-${defaultId}`,
      label: `Col-${defaultId}`,
    };

    props.onAddColumnClick?.(defaultNewColumn);

    if (props.defaultColumns) {
      const { show } = columnsCheckedValues;
      show.push(defaultNewColumn.label);
      setcolumnsCheckedValues((prev) => {
        return prev ? { ...prev, ["show"]: show } : { ["show"]: show };
      });

      setDefaultColumns((prev) => [...prev, defaultNewColumn]);
      setDisplayColumnsData((prev) => [...prev, defaultNewColumn]);
    }
  };

  const handleOnShowHideColumn: MenuProps["onCheckedValueChange"] = (
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

      const newColumns = displayColumnsData.filter((item) =>
        checked.includes(item.label)
      );

      const [hiddenColumn] = displayColumnsData.filter(
        (item) => !newColumns.includes(item)
      );

      props.defaultColumns && setDisplayColumnsData(newColumns);
      props.onShowHideColumn?.(hiddenColumn, "hide");

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

      const column = columnsData.find(
        (obj) => obj.label === checkedItems[0]
      ) as ITableV2Column;

      props.defaultColumns &&
        setDisplayColumnsData((prev) => [...prev, column]);
      props.onShowHideColumn?.(column, "show");

      return;
    }
  };

  const handleOnGroupByChange: MenuProps["onCheckedValueChange"] = (
    _,
    { name, checkedItems }
  ) => {
    if (props.groupBy) {
      props.onGroupByChange?.(groupBy["groupby"][0], checkedItems[0]);
    } else {
      setDefaultGroupBy((prev) => ({ ...prev, [name]: checkedItems }));
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {ShowSettingButton(props) && (
        <SettingButton
          menuAddColumnEnabled={props.menuAddColumnEnabled}
          menuShowColumnEnabled={props.menuShowColumnEnabled}
          menuGroupDataSourceEnabled={props.menuGroupDataSourceEnabled}
          addColumnProps={{ onAddColumnClick: handleOnAddColumnClick }}
          showColumnTableProps={{
            checkedValues: columnsCheckedValues,
            uncheckedValues: columnsUncheckedValues,
            onCheckedValueChange: handleOnShowHideColumn,
          }}
          groupByTableProps={{
            groupBy: groupBy,
            onGroupByChange: handleOnGroupByChange,
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
                toggleAllRows={toggleAllRows}
                columnsData={displayColumnsData}
                onColumnMove={handleOnColumnMove}
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
                      ? displayColumnsData.length + 1
                      : displayColumnsData.length
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
                                ? displayColumnsData.length + 1
                                : displayColumnsData.length
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
                                columnsData={displayColumnsData}
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
                                ? displayColumnsData.length + 1
                                : displayColumnsData.length
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
