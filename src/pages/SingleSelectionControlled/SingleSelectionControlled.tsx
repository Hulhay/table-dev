import React, { useState } from "react";
import { Header, TableV2 } from "../../components";
import { columnsSortingDummy, dataSourceDummy } from "../../data/basic";
import { ISort, ITableV2Column } from "../../components/Table/utils/Interface";
import { Text } from "@fluentui/react-components";

const SingleSelectionControlled: React.FC = () => {
  const [columns] = useState<ITableV2Column[]>(columnsSortingDummy);
  const [dataSource] = useState(dataSourceDummy);
  const [selectedRowsIndex, setSelectedRowsIndex] = useState<number[]>([4]);
  const [sort, setSort] = useState<ISort>({
    sortDirection: "ascending",
    sortColumn: "status",
  });

  const onSortChange = (sort?: ISort) => {
    console.log(`sorting by ${sort?.sortColumn} ${sort?.sortDirection}`);
    setSort({
      sortColumn: sort?.sortColumn,
      sortDirection: sort?.sortDirection,
    });
  };

  const onSelectedRowsIndexChange = (rowIndex?: number[]) => {
    console.log(`index ${rowIndex} selected`);
    rowIndex && setSelectedRowsIndex(rowIndex);
  };

  return (
    <div style={{ margin: "0 15px" }}>
      <Header title="Single Selection Controlled" />
      <Text>
        We controlled the data will be selected at <strong>index 4</strong> for
        the default. <br />
        And we controlled the data will be sorted by <strong>status</strong> for
        the default. <br />
        Please see the console (Ctrl + Shift + I)
      </Text>
      <TableV2
        columns={columns}
        dataSource={dataSource}
        resizable={false}
        sort={sort}
        selectionMode="single"
        subtleSelection={true}
        selectedRowsIndex={selectedRowsIndex}
        onSortChange={onSortChange}
        onSelectedRowsIndexChange={onSelectedRowsIndexChange}
      />
    </div>
  );
};

export default SingleSelectionControlled;
