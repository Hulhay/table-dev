import React, { useState } from "react";
import { ITableV2Column } from "../../components/Table/utils/Interface";
import { columnsDummy, dataSourceDummy } from "../../data/basic";
import { Header, TableV2 } from "../../components";
import { Text } from "@fluentui/react-components";

const MultipleSelectionControlled: React.FC = () => {
  const [columns] = useState<ITableV2Column[]>(columnsDummy);
  const [dataSource] = useState(dataSourceDummy);
  const [selectedRowsIndex, setSelectedRowsIndex] = useState<number[]>([2, 4]);

  const onSelectedRowsIndexChange = (rowIndex?: number[]) => {
    console.log(`index ${rowIndex} selected`);
    rowIndex && setSelectedRowsIndex(rowIndex);
  };

  return (
    <div style={{ margin: "0 15px" }}>
      <Header title="Multiple Selection Controlled" />
      <Text>
        We controlled the data will be selected at <strong>index 2</strong> and{" "}
        <strong>index 4</strong> for the default. <br />
        Please see the console (Ctrl + Shift + I)
      </Text>
      <TableV2
        columns={columns}
        dataSource={dataSource}
        resizable={false}
        selectionMode="multiselect"
        selectedRowsIndex={selectedRowsIndex}
        onSelectedRowsIndexChange={onSelectedRowsIndexChange}
      />
    </div>
  );
};

export default MultipleSelectionControlled;
