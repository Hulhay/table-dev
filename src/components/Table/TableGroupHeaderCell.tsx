import { Label, TableCell, TableRow } from "@fluentui/react-components";
import React from "react";
import { TitleCase } from "./utils/Helper";
import { TableGroupHeaderCellProps } from "./utils/Interface";

const TableGroupHeaderCell: React.FC<TableGroupHeaderCellProps> = (props) => {
  return (
    <TableRow>
      <TableCell colSpan={props.colspan}>
        <Label style={{ fontWeight: "bold" }}>{TitleCase(props.label)}</Label>
      </TableCell>
    </TableRow>
  );
};

export default TableGroupHeaderCell;
