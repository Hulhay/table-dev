import React, { useEffect, useState } from "react";
import { Header, TableV2 } from "../../components";
import {
  ITableV2Column,
  ShowHideMode,
} from "../../components/Table/utils/Interface";
import { columnsDummyAll, dataSourceDummy } from "../../data/basic";
import { IDataSourceBasic } from "../../data/interface";
import { Text } from "@fluentui/react-components";

const AddColumnControlled: React.FC = () => {
  const [columns, setColumns] = useState<ITableV2Column[]>(columnsDummyAll);
  const [dataSource, setDataSource] =
    useState<IDataSourceBasic[]>(dataSourceDummy);

  const onReorderColumn = (newColumns?: ITableV2Column[]) => {
    newColumns && setColumns(newColumns);
  };

  const onRowClick = (row?: IDataSourceBasic) => {
    console.log(row);
  };

  const onAddColumnClick = () => {
    const label = prompt("New column :");
    const defaultValue = prompt("Default value :");
    if (label && defaultValue) {
      const newColumn: ITableV2Column = {
        key: label,
        label: label,
        dataIndex: label,
      };
      setColumns((prev) => [...prev, newColumn]);

      const updatedDataSource = dataSource.map((ds) => ({
        ...ds,
        [label]: defaultValue,
      }));
      setDataSource(updatedDataSource);
    }
  };

  const onShowHideColumn = (newColumns?: ITableV2Column[], column?: ITableV2Column, mode?: ShowHideMode) => {
    console.log(`${mode} column ${column?.label}`);
    newColumns && setColumns(newColumns);
  };

  useEffect(() => {
    console.log(columns)
  }, [columns])

  return (
    <div style={{ margin: "0 15px" }}>
      <Header title="Add Column Controlled" />
      <Text>
        Provide{" "}
        <strong>
          <em>onRowClick</em>
        </strong>{" "}
        Callback. <br />
        Please see the console (Ctrl + Shift + I)
      </Text>
      <TableV2
        columns={columns}
        dataSource={dataSource}
        resizable={true}
        reorderColumnEnabled={true}
        menuShowColumnEnabled={true}
        menuAddColumnEnabled={true}
        onRowClick={onRowClick}
        onAddColumnClick={onAddColumnClick}
        onReorderColumn={onReorderColumn}
        onShowHideColumn={onShowHideColumn}
      />
    </div>
  );
};

export default AddColumnControlled;
