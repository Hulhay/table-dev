import React, { useState } from "react";
import { ITableV2Column } from "../../components/Table/utils/Interface";
import { columnsDummyAddRowSpesificGroup, dataSourceDummy } from "../../data/basic";
import { IDataSourceBasic } from "../../data/interface";
import { Header, TableV2 } from "../../components";
import { Text } from "@fluentui/react-components";

const AddRowInSpesificGroup: React.FC = () => {
  const [columns, setColumns] =
    useState<ITableV2Column[]>(columnsDummyAddRowSpesificGroup);
  const [dataSource, setDataSource] =
    useState<IDataSourceBasic[]>(dataSourceDummy);

  const onRearrangeColumn = (newColumns?: ITableV2Column[]) => {
    newColumns && setColumns(newColumns);
  };

  const onAddRowClick = (_: any, __: any, groupItem?: string) => {
    const title = prompt("Title : ");
    const assignee = prompt("Assignee : ");
    if (title && assignee ) {
      const newData: IDataSourceBasic = {
        id: Math.random().toString(16).slice(2),
        title: title,
        assignee: assignee,
        priority: groupItem || "",
        status: "todo",
        createdBy: "Admin",
        domain: "Other",
      };
      console.log(`Row ${newData.id} created`);
      console.log(newData);
      setDataSource((prev) => [...prev, newData]);
    }
  };

  return (
    <div style={{ margin: "0 15px" }}>
      <Header title="Add New Row in Spesific Group" />
      <Text>
        We controlled the data will group by <strong>priority</strong>. <br />
        Please see the console (Ctrl + Shift + I)
      </Text>
      <TableV2
        columns={columns}
        dataSource={dataSource}
        groupBy="priority"
        resizable={false}
        selectionMode="multiselect"
        rearrangeColumnEnabled={true}
        onRearrangeColumn={onRearrangeColumn}
        addRowEnabled={true}
        onAddRowClick={onAddRowClick}
      />
    </div>
  );
};

export default AddRowInSpesificGroup;
