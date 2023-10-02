import React from "react";
import { Header, TableV2 } from "../../components";
import { columnsSortingDummy, dataSourceDummy } from "../../data/basic";

const SingleSelection: React.FC = () => {
  return (
    <div style={{ margin: "0 15px" }}>
      <Header title="Single Selection Uncontrolled" />
      <TableV2
        defaultColumns={columnsSortingDummy}
        defaultDataSource={dataSourceDummy}
        resizable={true}
        selectionMode="single"
      />
    </div>
  );
};

export default SingleSelection;
