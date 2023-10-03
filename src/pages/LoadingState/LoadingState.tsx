import React, { useState } from "react";
import { Header, TableV2 } from "../../components";
import { columnsSortingDummy, dataSourceDummy } from "../../data/basic";
import { Checkbox, CheckboxProps } from "@fluentui/react-components";

const LoadingState: React.FC = () => {
  const [isLoading, setIsLoading] = useState<CheckboxProps["checked"]>(false);

  return (
    <div style={{ margin: "0 15px" }}>
      <Header title="Loading State" />
      <Checkbox
        checked={isLoading}
        label="Set Loading"
        onChange={(_, data) => setIsLoading(data.checked)}
      />
      <TableV2
        defaultColumns={columnsSortingDummy}
        defaultDataSource={dataSourceDummy}
        resizable={true}
        selectionMode="single"
        subtleSelection={true}
        loading={isLoading as boolean}
      />
    </div>
  );
};

export default LoadingState;
