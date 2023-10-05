import { Icon } from "@fluentui/react";
import { Status } from "../components";
import { ITableV2Column } from "../components/Table/utils/Interface";
import { titleCase } from "../helper";
import { IDataSourceBasic } from "./interface";
import CustomHeadercell from "./CustomHeadercell";

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

export const columnsCustomHeaderDummy: ITableV2Column[] = [
  {
    key: "title",
    label: "Title",
    dataIndex: "title",
    onRenderHeaderCell: () => {
      return <CustomHeadercell label="Title" center />;
    },
  },
  {
    key: "assignee",
    label: "Assignee",
    dataIndex: "assignee",
    onRenderHeaderCell: () => {
      return <CustomHeadercell label="Assignee" personIcon center />;
    },
  },
  {
    key: "priority",
    label: "Priority",
    dataIndex: "priority",
    onRenderHeaderCell: () => {
      return <CustomHeadercell label="Priority" center />;
    },
    onRenderDataSource: (data: IDataSourceBasic) => titleCase(data.priority),
  },
  {
    key: "status",
    label: "Status",
    dataIndex: "status",
    onRenderHeaderCell: () => {
      return <CustomHeadercell label="Status" center />;
    },
    onRenderDataSource: (data: IDataSourceBasic) => {
      return <Status status={data.status} />;
    },
  },
  {
    key: "action",
    label: "Action",
    onRenderHeaderCell: () => {
      return <CustomHeadercell label="Action" center />;
    },
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

export const columnsSortingDummy: ITableV2Column[] = [
  {
    key: "title",
    label: "Title",
    dataIndex: "title",
  },
  {
    key: "assignee",
    label: "Assignee",
    dataIndex: "assignee",
    compare: (a: IDataSourceBasic, b: IDataSourceBasic) => {
      return a.assignee.localeCompare(b.assignee);
    },
    onRenderHeaderCell: () => {
      return <CustomHeadercell label="Assignee" personIcon />;
    },
  },
  {
    key: "priority",
    label: "Priority",
    dataIndex: "priority",
    compare: (a: IDataSourceBasic, b: IDataSourceBasic) => {
      return a.priority.localeCompare(b.priority);
    },
    onRenderDataSource: (data: IDataSourceBasic) => titleCase(data.priority),
  },
  {
    key: "status",
    label: "Status",
    dataIndex: "status",
    compare: (a: IDataSourceBasic, b: IDataSourceBasic) => {
      return a.status.localeCompare(b.status);
    },
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

export const columnsWidthDummy: ITableV2Column[] = [
  {
    key: "title",
    label: "Title",
    dataIndex: "title",
    minWidth: 350,
  },
  {
    key: "assignee",
    label: "Assignee",
    dataIndex: "assignee",
    minWidth: 200,
    compare: (a: IDataSourceBasic, b: IDataSourceBasic) => {
      return a.assignee.localeCompare(b.assignee);
    },
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

export const columnsDummyNoAction: ITableV2Column[] = [
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
    compare: (a: IDataSourceBasic, b: IDataSourceBasic) => {
      return a.priority.localeCompare(b.priority);
    },
    onRenderDataSource: (data: IDataSourceBasic) => titleCase(data.priority),
  },
  {
    key: "status",
    label: "Status",
    dataIndex: "status",
    compare: (a: IDataSourceBasic, b: IDataSourceBasic) => {
      return a.status.localeCompare(b.status);
    },
    onRenderDataSource: (data: IDataSourceBasic) => {
      return <Status status={data.status} />;
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
    createdBy: "Admin",
    domain: "BE",
  },
  {
    id: "task-2",
    status: "todo",
    title: "Task 2",
    priority: "low",
    assignee: "Sandra",
    createdBy: "PM",
    domain: "BE",
  },
  {
    id: "task-3",
    status: "inprogress",
    title: "Task 3",
    priority: "medium",
    assignee: "Poy",
    createdBy: "Admin",
    domain: "BE",
  },
  {
    id: "task-4",
    status: "todo",
    title: "Task 4",
    priority: "high",
    assignee: "Poy",
    createdBy: "Tech Lead",
    domain: "FE",
  },
  {
    id: "task-5",
    status: "inprogress",
    title: "Task 5",
    priority: "low",
    assignee: "Abe",
    createdBy: "Admin",
    domain: "BE",
  },
  {
    id: "task-6",
    status: "completed",
    title: "Task 6",
    priority: "low",
    assignee: "Poy",
    createdBy: "Tech Lead",
    domain: "FE",
  },
  {
    id: "task-7",
    status: "inprogress",
    title: "Task 7",
    priority: "high",
    assignee: "Abe",
    createdBy: "Admin",
    domain: "BE",
  },
];
