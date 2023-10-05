import {
  MenuCheckedValueChangeData,
  MenuCheckedValueChangeEvent,
} from "@fluentui/react-components";

export interface LoadingStateTableProps {
  colspan: number;
}

export interface TableGroupHeaderCellProps {
  colspan: number;
  label: string
}

export interface HeaderTableCellProps {
  column: ITableV2Column;
  index: number;
  moveColumn: (dragIndex: number, hoverIndex: number) => void;
  rearrangeColumnEnabled: boolean;
  onRenderHeaderCell?: (column?: ITableV2Column) => JSX.Element;
  onHeaderCellClick?: (event: React.MouseEvent, column?: ITableV2Column) => void;
}

export interface SettingTableButtonProps {
  menuShowColumnEnabled?: boolean;
  showColumnTableProps: MenuShowColumnTableProps;

  menuGroupDataSourceEnabled?: boolean;
  groupByTableProps: MenuGroupByTableProps;
}

export interface MenuShowColumnTableProps {
  checkedValues: Record<string, string[]>;
  uncheckedValues: Record<string, string[]>;
  onCheckedValueChange: (
    e: MenuCheckedValueChangeEvent,
    data: MenuCheckedValueChangeData
  ) => void;
}

export interface MenuGroupByTableProps {
  groupByList: string[];
  groupBy: Record<string, string[]>;
  onGroupByChange: (
    e: MenuCheckedValueChangeEvent,
    data: MenuCheckedValueChangeData
  ) => void;
}

export interface ISort {
  sortDirection?: "ascending" | "descending";
  sortColumn?: string;
}

export interface ITableV2Column {
  key: string;
  label: string;
  dataIndex?: string;
  minWidth?: number;
  compare?: (a: any, b: any) => number;
  onRenderHeaderCell?: () => JSX.Element;
  onRenderDataSource?: (data?: any) => any;
}

export interface ITableV2 {
  defaultColumns?: ITableV2Column[];
  defaultDataSource?: any[];
  columns?: ITableV2Column[];
  dataSource?: any[];

  sort?: ISort;
  onSortChange?: (sort?: ISort) => void;

  resizable?: boolean; // default true
  onResizeColumn?: (columnKey?: string, width?: number) => void;

  rearrangeColumnEnabled?: boolean; // default false
  onRearrangeColumn?: (
    newColumns?: ITableV2Column[],
    columnKey?: string,
    sourceIndex?: number,
    destinationIndex?: number
  ) => void;

  selectionMode?: "single" | "multiselect"; // default undefined
  subtleSelection?: boolean;
  selectedRowsIndex?: number[];
  onSelectedRowsIndexChange?: (rowsIndex?: number[]) => void;

  menuShowColumnEnabled?: boolean; // default false
  menuGroupDataSourceEnabled?: boolean; // default false

  loading?: boolean;

  onRowClick?: (row?: any) => void;
  onHeaderCellClick?: (column?: ITableV2Column) => void;
}
