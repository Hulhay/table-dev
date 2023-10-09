import React, { useState } from "react";
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

  const onRearrangeColumn = (newColumns?: ITableV2Column[]) => {
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

  const onShowHideColumn = (column?: ITableV2Column, mode?: ShowHideMode) => {
    console.log(`${mode} column ${column?.label}`);
    const newColumns = [...columns];
    const columnIndex = newColumns.findIndex((col) => col.key === column?.key);
    if (columnIndex !== -1) {
      newColumns[columnIndex].hidden = mode === "hide" ? true : false;
      setColumns(newColumns);
    }
  };

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
        rearrangeColumnEnabled={true}
        menuShowColumnEnabled={true}
        menuAddColumnEnabled={true}
        onRowClick={onRowClick}
        onAddColumnClick={onAddColumnClick}
        onRearrangeColumn={onRearrangeColumn}
        onShowHideColumn={onShowHideColumn}
      />
    </div>
  );
};

export default AddColumnControlled;
