import {
  MenuCheckedValueChangeData,
  MenuCheckedValueChangeEvent,
  SortDirection,
  TableColumnId,
  TableFeaturesState,
  TableRowId,
} from "@fluentui/react-components";

export interface LoadingStateTableProps {
  colspan: number;
}

export interface AddRowTableProps {
  colspan: number;
  onAddRowClick?: (
    e?: React.MouseEvent,
    newRows?: any[],
    newRow?: any,
    groupItem?: string
  ) => void;
}

export interface TableGroupHeaderCellProps {
  colspan: number;
  label: string;
}

export interface HeaderRowProps {
  columnsData: ITableV2Column[];
  selectionMode?: "single" | "multiselect";
  checked: boolean | "mixed";
  onColumnMove: (dragIndex: number, hoverIndex: number) => void;
  columnSizing_unstable: TableFeaturesState<any>["columnSizing_unstable"];
  rearrangeColumnEnabled: boolean;
  headerSortProps: (columnId: TableColumnId) => {
    onClick: (e: React.MouseEvent) => void;
    sortDirection: SortDirection | undefined;
  };
  onHeaderCellClick?: (
    event?: React.MouseEvent,
    column?: ITableV2Column
  ) => void;
  toggleAllRows: (e: React.MouseEvent) => void;
}

export interface HeaderTableCellProps {
  column: ITableV2Column;
  index: number;
  onColumnMove: (dragIndex: number, hoverIndex: number) => void;
  rearrangeColumnEnabled: boolean;
  onRenderHeaderCell?: (column?: ITableV2Column) => JSX.Element;
  onHeaderCellClick?: (
    event?: React.MouseEvent,
    column?: ITableV2Column
  ) => void;
}

export interface HeaderCellWrapperProps {
  column: ITableV2Column;
  index: number;
  onColumnMove: (dragIndex: number, hoverIndex: number) => void;
  columnSizing_unstable: TableFeaturesState<any>["columnSizing_unstable"];
  rearrangeColumnEnabled: boolean;
  headerSortProps: (columnId: TableColumnId) => {
    onClick: (e: React.MouseEvent) => void;
    sortDirection: SortDirection | undefined;
  };
  onHeaderCellClick?: (
    event?: React.MouseEvent,
    column?: ITableV2Column
  ) => void;
}

export interface BodyRowProps {
  item: any;
  index: number;
  selected: boolean;
  appearance: "none" | "brand";
  columnsData: ITableV2Column[];
  selectionMode?: "single" | "multiselect";
  subtleSelection?: boolean;
  columnSizing_unstable: TableFeaturesState<any>["columnSizing_unstable"];
  rowId: TableRowId;
  onRowClick: (e: React.MouseEvent, rowId: TableRowId, item: any) => void;
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

export type ShowHideMode = "show" | "hide";

export interface ISort {
  sortDirection?: "ascending" | "descending";
  sortColumn?: string;
}

export interface ITableV2Column {
  key: string;
  label: string;
  dataIndex?: string;
  hidden?: boolean;
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

  groupBy?: string;
  onGroupByChange?: (prevGroupBy?: string, newGroupBy?: string) => void;

  resizable?: boolean; // default true
  onResizeColumn?: (columnKey?: string, width?: number) => void;

  rearrangeColumnEnabled?: boolean; // default false
  onRearrangeColumn?: (
    newColumns?: ITableV2Column[],
    columnKey?: string,
    sourceIndex?: number,
    destinationIndex?: number
  ) => void;

  onShowHideColumn?: (
    column?: ITableV2Column,
    mode?: ShowHideMode
  ) => void;

  selectionMode?: "single" | "multiselect"; // default undefined
  subtleSelection?: boolean;
  selectedRowsIndex?: number[];
  onSelectedRowsIndexChange?: (rowsIndex?: number[]) => void;

  menuShowColumnEnabled?: boolean; // default false
  menuGroupDataSourceEnabled?: boolean; // default false

  loading?: boolean; // default false

  addRowEnabled?: boolean; // default false
  onAddRowClick?: (newRows?: any[], newRow?: any, groupItem?: string) => void;

  onRowClick?: (row?: any) => void;
  onHeaderCellClick?: (column?: ITableV2Column) => void;
}
