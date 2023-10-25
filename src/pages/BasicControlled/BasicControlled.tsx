import React, { useState } from "react";
import { Header } from "../../components";
import { ITableV2Column } from "../../components/Table/utils/Interface";
import { columnsDummy, dataSourceDummy } from "../../data/basic";
import { IDataSourceBasic } from "../../data/interface";
import { Text } from "@fluentui/react-components";
import { TableV9 } from "@kitameraki/teamswork-library";

const BasicControlled: React.FC = () => {
  const [columns] = useState<ITableV2Column[]>(columnsDummy);
  const [dataSource] = useState<IDataSourceBasic[]>(dataSourceDummy);

  const onRowClick = (row?: IDataSourceBasic) => {
    console.log(`${row?.id} clicked`);
  };

  const onHeaderCellClick = (headerColumn?: ITableV2Column) => {
    console.log(`column ${headerColumn?.key} clicked`);
  };

  return (
    <div style={{ margin: "0 15px" }}>
      <Header title="Table Basic Controlled" />
      <Text>
        Provide{" "}
        <strong>
          <em>onRowClick</em>
        </strong>{" "}
        and{" "}
        <strong>
          <em>onHeaderCellClick</em>
        </strong>{" "}
        Callback. <br />
        Please see the console (Ctrl + Shift + I)
      </Text>
      <TableV9
        columns={columns}
        dataSource={dataSource}
        resizable={false}
        onRowClick={onRowClick}
        onHeaderCellClick={onHeaderCellClick}
      />
    </div>
  );
};

export default BasicControlled;
