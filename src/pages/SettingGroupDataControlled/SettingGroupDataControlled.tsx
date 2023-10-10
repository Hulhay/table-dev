import React, { useState } from "react";
import { Header, TableV2 } from "../../components";
import { columnsDummyNoAction, dataSourceDummy } from "../../data/basic";
import { ITableV2Column } from "../../components/Table/utils/Interface";
import { IDataSourceBasic } from "../../data/interface";
import { Text } from "@fluentui/react-components";

const SettingGroupDataControlled: React.FC = () => {
  const [columns, setColumns] =
    useState<ITableV2Column[]>(columnsDummyNoAction);
  const [dataSource] = useState<IDataSourceBasic[]>(dataSourceDummy);
  const [groupBy, setGroupBy] = useState("status");

  const onReorderColumn = (newColumns?: ITableV2Column[]) => {
    newColumns && setColumns(newColumns);
  };

  const onGroupByChange = (prevGroupBy?: string, newGroupBy?: string) => {
    console.log(`change group by from ${prevGroupBy} to ${newGroupBy}`);
    newGroupBy && setGroupBy(newGroupBy);
  };

  return (
    <div style={{ margin: "0 15px" }}>
      <Header title="Menu Group Data Controlled" />
      <Text>
        We controlled the data will group by <strong>status</strong> for the
        default. <br />
        Please see the console (Ctrl + Shift + I)
      </Text>
      <TableV2
        columns={columns}
        dataSource={dataSource}
        groupBy={groupBy}
        onGroupByChange={onGroupByChange}
        resizable={false}
        selectionMode="multiselect"
        reorderColumnEnabled={true}
        onReorderColumn={onReorderColumn}
        menuGroupDataSourceEnabled={true}
      />
    </div>
  );
};

export default SettingGroupDataControlled;
