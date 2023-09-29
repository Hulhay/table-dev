import { Text } from "@fluentui/react";
import { Header, TableV2 } from "../../components";
import { columnsWidthDummy, dataSourceDummy } from "../../data/basic";

const Sorting: React.FC = () => {
  return (
    <div style={{ margin: "0 15px" }}>
      <Header title="Resize" />
      <Text>
        By default, table is resizable.
        <br /> We can set the{" "}
        <strong>
          <em>minWidth</em>
        </strong>{" "}
        for each column.
      </Text>
      <TableV2
        defaultColumns={columnsWidthDummy}
        defaultDataSource={dataSourceDummy}
        resizable={true}
      />
    </div>
  );
};

export default Sorting;
