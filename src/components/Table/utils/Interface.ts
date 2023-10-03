import {
  MenuCheckedValueChangeData,
  MenuCheckedValueChangeEvent,
} from "@fluentui/react-components";

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
  resizable?: boolean;
  rearrangeColumnEnabled?: boolean;
  selectionMode?: "single" | "multiselect";
  subtleSelection?: boolean;
  settingShowColumnEnabled?: boolean;
  loading?: boolean;
}
