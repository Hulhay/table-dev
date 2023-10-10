import { Header, TableV2 } from "../../components";
import { columnsDummy, dataSourceDummy } from "../../data/basic";

const RearrangeColumn: React.FC = () => {
  return (
    <div style={{ margin: "0 15px" }}>
      <Header title="Rearrange Column" />
      <TableV2
        defaultColumns={columnsDummy}
        defaultDataSource={dataSourceDummy}
        resizable={true}
        reorderColumnEnabled={true}
      />
    </div>
  );
};

export default RearrangeColumn;
