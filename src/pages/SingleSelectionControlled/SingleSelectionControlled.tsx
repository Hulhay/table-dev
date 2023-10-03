import React, { useState } from "react";
import { Header, TableV2 } from "../../components";
import { columnsDummy, dataSourceDummy } from "../../data/basic";
import { ITableV2Column } from "../../components/Table/utils/Interface";
import { Text } from "@fluentui/react-components";

const SingleSelectionControlled: React.FC = () => {
  const [columns] = useState<ITableV2Column[]>(columnsDummy);
  const [dataSource] = useState(dataSourceDummy);
  const [selectedRowsIndex, setSelectedRowsIndex] = useState<number[]>([4]);

  const onSelectedRowsIndexChange = (rowIndex?: number[]) => {
    console.log(`index ${rowIndex} selected`)
    rowIndex && setSelectedRowsIndex(rowIndex)
  }

  return (
    <div style={{ margin: "0 15px" }}>
      <Header title="Single Selection Controlled" />
      <Text>
        We controlled the data will be selected at <strong>index 4</strong> for
        the default. <br />
        Please see the console (Ctrl + Shift + I)
      </Text>
      <TableV2
        columns={columns}
        dataSource={dataSource}
        resizable={false}
        selectionMode="single"
        subtleSelection={true}
        selectedRowsIndex={selectedRowsIndex}
        onSelectedRowsIndexChange={onSelectedRowsIndexChange}
      />
    </div>
  );
};

export default SingleSelectionControlled;
