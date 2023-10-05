import {
  TableCell,
  TableRow,
  TableSelectionCell,
} from "@fluentui/react-components";
import React from "react";
import { BodyRowProps, ITableV2Column } from "./utils/Interface";

const BodyRow: React.FC<BodyRowProps> = (props) => {
  return (
    <TableRow
      key={props.index}
      tabIndex={props.index}
      appearance={props.appearance}
      onClick={(e) => props.onRowClick(e, props.rowId, props.item)}
    >
      {/* Selection Cell */}
      {props.selectionMode && (
        <TableSelectionCell
          checked={props.selected}
          subtle={props.subtleSelection}
          type={props.selectionMode === "single" ? "radio" : "checkbox"}
        />
      )}

      {/* Table Cell */}
      {props.columnsData.map((column: ITableV2Column) => {
        return (
          <TableCell
            key={props.item[column.dataIndex || column.key]}
            {...props.columnSizing_unstable.getTableCellProps(column.key)}
          >
            {column.onRenderDataSource
              ? column.onRenderDataSource(props.item)
              : props.item[column.dataIndex || ""]}
          </TableCell>
        );
      })}
    </TableRow>
  );
};

export default BodyRow;
