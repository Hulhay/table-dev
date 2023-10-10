import React from "react";
import { Header, TableV2 } from "../../components";
import { columnsDummyAll, dataSourceDummy } from "../../data/basic";

const SettingShowColumn: React.FC = () => {
  return (
    <div style={{ margin: "0 15px" }}>
      <Header title="Menu Show Column Uncontrolled" />
      <TableV2
        defaultColumns={columnsDummyAll}
        defaultDataSource={dataSourceDummy}
        resizable={true}
        reorderColumnEnabled={true}
        menuShowColumnEnabled={true}
      />
    </div>
  );
};

export default SettingShowColumn;
