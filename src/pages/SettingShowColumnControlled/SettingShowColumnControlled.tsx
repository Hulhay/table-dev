import React, { useState } from "react";
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

  const onRearrangeColumn = (newColumns?: ITableV2Column[]) => {
    newColumns && setColumns(newColumns);
  };

  const onShowHideColumn = (column?: ITableV2Column, mode?: ShowHideMode) => {
    console.log(`${mode} column ${column?.label}`);
    const newColumns = [...columns];
    const columnIndex = newColumns.findIndex((col) => col.key === column?.key);
    if (columnIndex !== -1) {
      newColumns[columnIndex].hidden = mode === "hide" ? true : false;
      setColumns(newColumns);
    }
  };

  return (
    <div style={{ margin: "0 15px" }}>
      <Header title="Menu Show Column Controlled" />
      <Text>Please see the console (Ctrl + Shift + I)</Text>
      <TableV2
        columns={columns}
        dataSource={dataSource}
        resizable={true}
        rearrangeColumnEnabled={true}
        menuShowColumnEnabled={true}
        onRearrangeColumn={onRearrangeColumn}
        onShowHideColumn={onShowHideColumn}
      />
    </div>
  );
};

export default SettingShowColumnControlled;
