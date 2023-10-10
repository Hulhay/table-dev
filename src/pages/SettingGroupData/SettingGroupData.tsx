import React from "react";
import { Header, TableV2 } from "../../components";
import { columnsDummyNoAction, dataSourceDummy } from "../../data/basic";

const SettingGroupData: React.FC = () => {
  return (
    <div style={{ margin: "0 15px" }}>
      <Header title="Menu Group Data Uncontrolled" />
      <TableV2
        defaultColumns={columnsDummyNoAction}
        defaultDataSource={dataSourceDummy}
        resizable={false}
        selectionMode="multiselect"
        reorderColumnEnabled={true}
        menuShowColumnEnabled={true}
        menuGroupDataSourceEnabled={true}
      />
    </div>
  );
};

export default SettingGroupData;
