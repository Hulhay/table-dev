import React from "react";
import { Header, TableV2 } from "../../components";
import { columnsDummyAll, dataSourceDummy } from "../../data/basic";

const AddColumn: React.FC = () => {
  return (
    <div style={{ margin: "0 15px" }}>
      <Header title="Add Column Uncontrolled" />
      <TableV2
        defaultColumns={columnsDummyAll}
        defaultDataSource={dataSourceDummy}
        resizable={true}
        rearrangeColumnEnabled={true}
        menuShowColumnEnabled={true}
        menuAddColumnEnabled={true}
      />
    </div>
  );
};

export default AddColumn;
