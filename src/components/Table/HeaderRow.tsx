import {
  SortDirection,
  TableColumnId,
  TableFeaturesState,
  TableRow,
  TableSelectionCell,
} from "@fluentui/react-components";
import React from "react";
import HeaderCellWrapper from "./HeaderCellWrapper";
import { ITableV2Column } from "./utils/Interface";

export interface HeaderRowProps {
  columnsData: ITableV2Column[];
  selectionMode?: "single" | "multiselect";
  checked: boolean | "mixed";
  onColumnMove: (dragIndex: number, hoverIndex: number) => void;
  columnSizing_unstable: TableFeaturesState<any>["columnSizing_unstable"];
  rearrangeColumnEnabled: boolean;
  headerSortProps: (columnId: TableColumnId) => {
    onClick: (e: React.MouseEvent) => void;
    sortDirection: SortDirection | undefined;
  };
  onHeaderCellClick?: (
    event?: React.MouseEvent,
    column?: ITableV2Column
  ) => void;
  toggleAllRows: (e: React.MouseEvent) => void;
}

const HeaderRow: React.FC<HeaderRowProps> = (props) => {
  return (
    <TableRow style={{ backgroundColor: "#eeeeee" }}>
      {props.selectionMode && (
        <TableSelectionCell
          type={props.selectionMode === "single" ? "radio" : "checkbox"}
          checked={props.checked}
          hidden={props.selectionMode !== "multiselect"}
          onClick={props.toggleAllRows}
        />
      )}
      {props.columnsData.map((column: ITableV2Column, index: number) => {
        return (
          <HeaderCellWrapper
            index={index}
            column={column}
            onColumnMove={props.onColumnMove}
            headerSortProps={props.headerSortProps}
            onHeaderCellClick={props.onHeaderCellClick}
            columnSizing_unstable={props.columnSizing_unstable}
            rearrangeColumnEnabled={
              props.rearrangeColumnEnabled === true ? true : false
            }
          />
        );
      })}
    </TableRow>
  );
};

export default HeaderRow;
