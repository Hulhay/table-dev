import { Header, TableV2 } from "../../components";
import { columnsDummy, dataSourceDummy } from "../../data/basic";

const BasicUncontrolled = () => {
  return (
    <div style={{ margin: "0 15px" }}>
      <Header title="Table Basic Uncontrolled" />
      <TableV2
        defaultColumns={columnsDummy}
        defaultDataSource={dataSourceDummy}
      />
    </div>
  );
};

export default BasicUncontrolled;
