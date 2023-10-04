import {
  MenuCheckedValueChangeData,
  MenuCheckedValueChangeEvent,
} from "@fluentui/react-components";

export interface LoadingStateTableProps {
  colspan: number;
}

export interface HeaderTableCellProps {
  column: ITableV2Column;
  index: number;
  moveColumn: (dragIndex: number, hoverIndex: number) => void;
  rearrangeColumnEnabled: boolean;
}

export interface ShowColumnTableProps {
  checkedValues: Record<string, string[]>;
  uncheckedValues: Record<string, string[]>;
  onCheckedValueChange: (
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
  onRenderDataSource?: (data?: any) => any;
}

export interface ITableV2 {
  defaultColumns?: ITableV2Column[];
  defaultDataSource?: any[];
  columns?: ITableV2Column[];
  dataSource?: any[];

  sort?: ISort;
  onSortChange?: (sort?: ISort) => void;

  resizable?: boolean;
  onResizeColumn?: (columnKey?: string, width?: number) => void;

  rearrangeColumnEnabled?: boolean;
  onRearrangeColumn?: (
    newColumns?: ITableV2Column[],
    columnKey?: string,
    sourceIndex?: number,
    destinationIndex?: number
  ) => void;

  selectionMode?: "single" | "multiselect";
  subtleSelection?: boolean;
  selectedRowsIndex?: number[];
  onSelectedRowsIndexChange?: (rowsIndex?: number[]) => void;

  settingShowColumnEnabled?: boolean;
  loading?: boolean;
}
