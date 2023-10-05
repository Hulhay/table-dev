import React, { useState } from "react";
import { ITableV2Column } from "../../components/Table/utils/Interface";
import { columnsDummy, dataSourceDummy } from "../../data/basic";
import { IDataSourceBasic } from "../../data/interface";
import { Header, TableV2 } from "../../components";
import { Text } from "@fluentui/react-components";

const AddRow: React.FC = () => {
  const [columns] = useState<ITableV2Column[]>(columnsDummy);
  const [dataSource, setDataSource] = useState<IDataSourceBasic[]>(dataSourceDummy);

  const onRowClick = (row?: IDataSourceBasic) => {
    console.log(`${row?.id} clicked`);
  };

  const onHeaderCellClick = (headerColumn?: ITableV2Column) => {
    console.log(`column ${headerColumn?.key} clicked`);
  };

  const onAddRowClick = () => {
    const title = prompt("Title : ");
    const assignee = prompt("Assignee : ");
    const priority = prompt("Priority (low, medium, high) : ");
    const status = prompt("Status (todo, inprogress, completed) : ");
    const domain = prompt("Domain (FE, BE) : ")
    if (title && assignee && priority && status && domain) {
      const newData: IDataSourceBasic = {
        id: Math.random().toString(16).slice(2),
        title: title,
        assignee: assignee,
        priority: priority,
        status: status,
        createdBy: "Admin",
        domain: domain,
      };
      console.log(`Row ${newData.id} created`)
      console.log(newData)
      setDataSource((prev) => [...prev, newData])
    }
  };

  return (
    <div style={{ margin: "0 15px" }}>
      <Header title="Add Row Controlled" />
      <Text>
        Provide{" "}
        <strong>
          <em>onRowClick</em>
        </strong>{" "}
        and{" "}
        <strong>
          <em>onHeaderCellClick</em>
        </strong>{" "}
        Callback. <br />
        Please see the console (Ctrl + Shift + I)
      </Text>
      <TableV2
        columns={columns}
        dataSource={dataSource}
        resizable={false}
        onRowClick={onRowClick}
        onHeaderCellClick={onHeaderCellClick}
        onAddRowClick={onAddRowClick}
        addRowEnabled={true}
      />
    </div>
  );
};

export default AddRow;
