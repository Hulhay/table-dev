import { Text } from "@fluentui/react";
import { Header, TableV2 } from "../../components";
import { columnsSortingDummy, dataSourceDummy } from "../../data/basic";

const Sorting: React.FC = () => {
  return (
    <div style={{ margin: "0 15px" }}>
      <Header title="Sorting Uncontrolled" />
      <Text>
        The columns that can be sorted are the columns that have an icon to the
        left of them.
      </Text>
      <TableV2
        defaultColumns={columnsSortingDummy}
        defaultDataSource={dataSourceDummy}
        resizable={false}
      />
    </div>
  );
};

export default Sorting;
