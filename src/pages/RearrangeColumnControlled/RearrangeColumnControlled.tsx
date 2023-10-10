import React, { useState } from "react";
import { Header, TableV2 } from "../../components";
import { ITableV2Column } from "../../components/Table/utils/Interface";
import { columnsDummy, dataSourceDummy } from "../../data/basic";
import { Text } from "@fluentui/react-components";

const RearrangeColumnControlled: React.FC = () => {
  const [columns, setColumns] = useState<ITableV2Column[]>(columnsDummy);
  const [dataSource] = useState(dataSourceDummy);

  const onReorderColumn = (
    newColumns?: ITableV2Column[],
    column?: ITableV2Column,
  ) => {
    console.log(
      `move ${column?.label} moved`
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
        reorderColumnEnabled={true}
        onReorderColumn={onReorderColumn}
      />
    </div>
  );
};

export default RearrangeColumnControlled;
