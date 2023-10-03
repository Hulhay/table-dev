import React, { useState } from "react";
import { Header, TableV2 } from "../../components";
import { columnsSortingDummy, dataSourceDummy } from "../../data/basic";
import { ISort, ITableV2Column } from "../../components/Table/utils/Interface";
import { Text } from "@fluentui/react-components";

const SortingControlled: React.FC = () => {
  const [columns] = useState<ITableV2Column[]>(columnsSortingDummy);
  const [dataSource] = useState(dataSourceDummy);
  const [sort, setSort] = useState<ISort>({
    sortDirection: "ascending",
    sortColumn: "priority",
  });

  const onSortChange = (sort?: ISort) => {
    console.log(`sorting by ${sort?.sortColumn} ${sort?.sortDirection}`);
    setSort({
      sortColumn: sort?.sortColumn,
      sortDirection: sort?.sortDirection,
    });
  };

  return (
    <div style={{ margin: "0 15px" }}>
      <Header title="Sorting Controlled" />
      <Text>
        We controlled the data will be sorted by <strong>Priority</strong> for
        the default. <br />
        Please see the console (Ctrl + Shift + I)
      </Text>
      <TableV2
        columns={columns}
        dataSource={dataSource}
        resizable={false}
        sort={sort}
        onSortChange={onSortChange}
      />
    </div>
  );
};

export default SortingControlled;
