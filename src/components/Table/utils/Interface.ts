export interface HeaderTableCellProps {
  column: ITableV2Column;
  index: number;
  moveColumn: (dragIndex: number, hoverIndex: number) => void;
  rearrangeColumnEnabled: boolean;
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
}
