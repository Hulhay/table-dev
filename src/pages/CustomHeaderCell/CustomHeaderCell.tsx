import React from "react";
import { Header, TableV2 } from "../../components";
import { columnsCustomHeaderDummy, dataSourceDummy } from "../../data/basic";

const CustomHeaderCell: React.FC = () => {
  return (
    <div style={{ margin: "0 15px" }}>
      <Header title="Custom Header" />
      <TableV2
        defaultColumns={columnsCustomHeaderDummy}
        defaultDataSource={dataSourceDummy}
        resizable={false}
      />
    </div>
  );
};

export default CustomHeaderCell;
