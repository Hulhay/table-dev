import React, { useEffect, useState } from "react";
import { Header, TableV2 } from "../../components";
import { columnsDummyAll, dataSourceDummy } from "../../data/basic";
import {
  ITableV2Column,
  ShowHideMode,
} from "../../components/Table/utils/Interface";
import { Text } from "@fluentui/react-components";

const SettingShowColumnControlled: React.FC = () => {
  const [columns, setColumns] = useState<ITableV2Column[]>(columnsDummyAll);
  const [dataSource] = useState(dataSourceDummy);

  const onReorderColumn = (newColumns?: ITableV2Column[]) => {
    newColumns && setColumns(newColumns);
  };

  const onShowHideColumn = (
    newColumns?: ITableV2Column[],
    column?: ITableV2Column,
    mode?: ShowHideMode
  ) => {
    console.log(`${mode} column ${column?.label}`);
    console.log(newColumns);
    newColumns && setColumns(newColumns);
  };

  useEffect(() => {
    console.log(columns);
  }, [columns]);

  return (
    <div style={{ margin: "0 15px" }}>
      <Header title="Menu Show Column Controlled" />
      <Text>Please see the console (Ctrl + Shift + I)</Text>
      <TableV2
        columns={columns}
        dataSource={dataSource}
        resizable={true}
        reorderColumnEnabled={true}
        menuShowColumnEnabled={true}
        onReorderColumn={onReorderColumn}
        onShowHideColumn={onShowHideColumn}
      />
    </div>
  );
};

export default SettingShowColumnControlled;
