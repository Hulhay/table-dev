import { TableRow, TableSelectionCell } from "@fluentui/react-components";
import React from "react";
import HeaderCellWrapper from "./HeaderCellWrapper";
import { HeaderRowProps, ITableV2Column } from "./utils/Interface";

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
            key={column.key}
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
