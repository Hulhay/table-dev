import React from "react";
import { Header, TableV2 } from "../../components";
import { columnsSortingDummy, dataSourceDummy } from "../../data/basic";
import { Text } from "@fluentui/react-components";

const MultipleSelection: React.FC = () => {
  return (
    <div style={{ margin: "0 15px" }}>
      <Header title="Multiple Selection Uncontrolled" />
      <Text>
        We can set selection mode as subtle selection.
        <br /> By default,{" "}
        <strong>
          <em>subtleSelection</em>
        </strong>{" "}
        is false
      </Text>
      <TableV2
        defaultColumns={columnsSortingDummy}
        defaultDataSource={dataSourceDummy}
        resizable={true}
        selectionMode="multiselect"
        subtleSelection={true}
      />
    </div>
  );
};

export default MultipleSelection;
