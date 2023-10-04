import React, { useState } from "react";
import { Header, TableV2 } from "../../components";
import { Label, Text } from "@fluentui/react-components";
import { columnsWidthDummy, dataSourceDummy } from "../../data/basic";
import { ITableV2Column } from "../../components/Table/utils/Interface";

const ResizeControlled: React.FC = () => {
  const [columns] = useState<ITableV2Column[]>(columnsWidthDummy);
  const [dataSource] = useState(dataSourceDummy);
  const [columnChanged, setColumnChanged] = useState<string>();
  const [width, setWidth] = useState<number>();

  const onResizeColumn = (columnKey?: string, width?: number) => {
    setColumnChanged(columnKey);
    setWidth(width);
  };

  return (
    <div style={{ margin: "0 15px" }}>
      <Header title="Event onResizeColumn" />
      <Label>COLUMN : </Label>
      <Text>{columnChanged}</Text>
      <br />
      <Label>WIDTH : </Label>
      <Text>{width}</Text>
      <TableV2
        columns={columns}
        dataSource={dataSource}
        resizable={true}
        onResizeColumn={onResizeColumn}
      />
    </div>
  );
};

export default ResizeControlled;
