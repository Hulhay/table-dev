import React from "react";
import { LoadingStateTableProps } from "./utils/Interface";
import { Spinner, TableCell } from "@fluentui/react-components";

const LoadingState: React.FC<LoadingStateTableProps> = (props) => {
  return (
    <TableCell colSpan={props.colspan}>
      <Spinner size="extra-small" />
    </TableCell>
  );
};

export default LoadingState;
