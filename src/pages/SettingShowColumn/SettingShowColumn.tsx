import React from "react";
import { Header, TableV2 } from "../../components";
import { columnsDummyNoAction, dataSourceDummy } from "../../data/basic";

const SettingShowColumn: React.FC = () => {
  return (
    <div style={{ margin: "0 15px" }}>
      <Header title="Setting Show Column Uncontrolled" />
      <TableV2
        defaultColumns={columnsDummyNoAction}
        defaultDataSource={dataSourceDummy}
        resizable={false}
        rearrangeColumnEnabled={true}
        settingShowColumnEnabled={true}
      />
    </div>
  );
};

export default SettingShowColumn;
