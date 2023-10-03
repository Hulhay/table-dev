import React, { useState } from "react";
import { Header, TableV2 } from "../../components";
import { ITableV2Column } from "../../components/Table/utils/Interface";
import { columnsDummy, dataSourceDummy } from "../../data/basic";
import { Text } from "@fluentui/react-components";

const RearrangeColumnControlled: React.FC = () => {
  const [columns, setColumns] = useState<ITableV2Column[]>(columnsDummy);
  const [dataSource] = useState(dataSourceDummy);

  const onRearrangeColumn = (
    newColumns?: ITableV2Column[],
    columnKey?: string,
    sourceIndex?: number,
    destinationIndex?: number
  ) => {
    console.log(
      `move ${columnKey} from index ${sourceIndex} to index ${destinationIndex}`
    );
    newColumns && setColumns(newColumns);
  };

  return (
    <div style={{ margin: "0 15px" }}>
      <Header title="Rearrange Column Controlled" />
      <Text>Please see the console (Ctrl + Shift + I)</Text>
      <TableV2
        columns={columns}
        dataSource={dataSource}
        resizable={true}
        rearrangeColumnEnabled={true}
        onRearrangeColumn={onRearrangeColumn}
      />
    </div>
  );
};

export default RearrangeColumnControlled;
