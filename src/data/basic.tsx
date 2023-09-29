import { Icon } from "@fluentui/react";
import { Status } from "../components";
import { ITableV2Column } from "../components/Table/utils/Interface";
import { titleCase } from "../helper";
import { IDataSourceBasic } from "./interface";

export const columnsDummy: ITableV2Column[] = [
  {
    key: "title",
    label: "Title",
    dataIndex: "title",
  },
  {
    key: "assignee",
    label: "Assignee",
    dataIndex: "assignee",
  },
  {
    key: "priority",
    label: "Priority",
    dataIndex: "priority",
    onRenderDataSource: (data: IDataSourceBasic) => titleCase(data.priority),
  },
  {
    key: "status",
    label: "Status",
    dataIndex: "status",
    onRenderDataSource: (data: IDataSourceBasic) => {
      return <Status status={data.status} />;
    },
  },
  {
    key: "action",
    label: "Action",
    onRenderDataSource: () => {
      return (
        <Icon
          iconName="MoreVertical"
          styles={{ root: { cursor: "pointer" } }}
        />
      );
    },
  },
];

export const dataSourceDummy: IDataSourceBasic[] = [
  {
    id: "task-1",
    status: "todo",
    title: "Task 1",
    priority: "low",
    assignee: "Sandra",
  },
  {
    id: "task-2",
    status: "todo",
    title: "Task 2",
    priority: "low",
    assignee: "Sandra",
  },
  {
    id: "task-3",
    status: "inprogress",
    title: "Task 3",
    priority: "medium",
    assignee: "Poy",
  },
  {
    id: "task-4",
    status: "todo",
    title: "Task 4",
    priority: "high",
    assignee: "Poy",
  },
  {
    id: "task-5",
    status: "inprogress",
    title: "Task 5",
    priority: "low",
    assignee: "Abe",
  },
  {
    id: "task-6",
    status: "completed",
    title: "Task 6",
    priority: "low",
    assignee: "Poy",
  },
  {
    id: "task-7",
    status: "inprogress",
    title: "Task 7",
    priority: "high",
    assignee: "Abe",
  },
];
