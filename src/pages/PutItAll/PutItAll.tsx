import {
  Button,
  Checkbox,
  CheckboxProps,
  Dropdown,
  Option,
} from "@fluentui/react-components";
import React, { useState } from "react";
import { Header, TableV2 } from "../../components";
import { columnsDummyAll, dataSourceDummy } from "../../data/basic";
import { ITableV2Column } from "../../components/Table/utils/Interface";
import { IDataSourceBasic } from "../../data/interface";

const groupByOptions = [
  {
    label: "None",
    value: "none",
  },
  {
    label: "Assignee",
    value: "assignee",
  },
  {
    label: "Status",
    value: "status",
  },
  {
    label: "Priority",
    value: "priority",
  },
  {
    label: "Domain",
    value: "domain",
  },
];

const showHideOptions = [
  {
    label: "ID",
    value: "id",
  },
  {
    label: "Title",
    value: "title",
  },
  {
    label: "Assignee",
    value: "assignee",
  },
  {
    label: "Priority",
    value: "priority",
  },
  {
    label: "Status",
    value: "status",
  },
  {
    label: "Created By",
    value: "createdby",
  },
  {
    label: "Domain",
    value: "domain",
  },
];

const PutItAll: React.FC = () => {
  const [columns, setColumns] = useState<ITableV2Column[]>(columnsDummyAll);
  const [dataSource, setDataSource] =
    useState<IDataSourceBasic[]>(dataSourceDummy);
  const [isLoading, setIsLoading] = useState<CheckboxProps["checked"]>(false);
  const [groupBy, setGroupBy] = useState("none");
  const [selectedGroupBy, setSelectedGroupBy] = React.useState<string[]>([
    "none",
  ]);

  const defaultShowColumn = columns.reduce(
    (result: string[], item: ITableV2Column) => {
      if (!item.hidden) {
        result.push(item.key);
      }
      return result;
    },
    []
  );

  const onRearrangeColumn = (newColumns?: ITableV2Column[]) => {
    newColumns && setColumns(newColumns);
  };

  const onGroupByOptionSelect = (_: any, data: any) => {
    setSelectedGroupBy(data.optionText || "");
    setGroupBy(data.optionValue);
  };

  const onShowOptionSelect = (_: any, data: any) => {
    const selected = data.selectedOptions as string[];
    const newColumns = [...columns];
    const updatedColumns: ITableV2Column[] = newColumns.map((column) => ({
      ...column,
      hidden: !selected.includes(column.key),
    }));
    setColumns(updatedColumns);
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

  const onAddRowClick = () => {
    const title = prompt("Title : ");
    const assignee = prompt("Assignee : ");
    const priority = prompt("Priority (low, medium, high) : ");
    const status = prompt("Status (todo, inprogress, completed) : ");
    const domain = prompt("Domain (FE, BE) : ");
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
      setDataSource((prev) => [...prev, newData]);
    }
  };

  return (
    <div style={{ margin: "0 15px", paddingBottom: 200 }}>
      <Header title="Put It All (Controlled)" />
      <Checkbox
        label="Set Loading"
        checked={isLoading}
        onChange={(_, data) => setIsLoading(data.checked)}
      />
      <div
        style={{
          gap: 5,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Button
          onClick={onAddColumnClick}
          style={{ margin: "5px 0", flexGrow: 1 }}
        >
          Add New Column
        </Button>
        <Button
          onClick={onAddRowClick}
          style={{ margin: "5px 0", flexGrow: 1 }}
        >
          Add New Row
        </Button>
        <Dropdown
          placeholder="Group by"
          style={{ flexGrow: 1 }}
          onOptionSelect={onGroupByOptionSelect}
          defaultSelectedOptions={selectedGroupBy}
        >
          {groupByOptions.map((opt) => (
            <Option key={opt.value} value={opt.value}>
              {opt.label}
            </Option>
          ))}
        </Dropdown>
        <Dropdown
          multiselect
          placeholder="Show"
          style={{ flexGrow: 1 }}
          defaultSelectedOptions={defaultShowColumn}
          onOptionSelect={onShowOptionSelect}
        >
          {showHideOptions.map((opt) => (
            <Option key={opt.value} value={opt.value}>
              {opt.label}
            </Option>
          ))}
        </Dropdown>
      </div>
      <TableV2
        groupBy={groupBy}
        columns={columns}
        dataSource={dataSource}
        loading={isLoading as boolean}
        resizable
        subtleSelection
        rearrangeColumnEnabled
        selectionMode="multiselect"
        onAddRowClick={onAddRowClick}
        onAddColumnClick={onAddColumnClick}
        onRearrangeColumn={onRearrangeColumn}
      />
    </div>
  );
};

export default PutItAll;
