import {
  TableColumnDefinition,
  TableColumnSizingOptions,
  createTableColumn,
} from "@fluentui/react-components";
import { ITableV2Column } from "./Interface";
import { useMemo } from "react";

export const CreateColumnHeader = (defaultColumns: ITableV2Column[]) =>
  useMemo(() => {
    const columns: TableColumnDefinition<any>[] = [];

    defaultColumns.forEach((column: ITableV2Column) => {
      columns.push(
        createTableColumn({
          columnId: column.key,
          compare: column.compare,
        })
      );
    });

    return columns;
  }, [defaultColumns]);

export const GetTableColumnSizingOptions = (
  columns: ITableV2Column[]
): TableColumnSizingOptions => {
  const columnSizingOptions: TableColumnSizingOptions = {};
  columns.forEach((column) => {
    if (column.minWidth) {
      columnSizingOptions[column.key] = {
        minWidth: column.minWidth,
      };
    }
  });

  return columnSizingOptions;
};

export const Reorder = (
  list: any[],
  sourceIndex: number,
  destinationIndex: number
) => {
  const result = [...list];
  const [removed] = result.splice(sourceIndex, 1);
  result.splice(destinationIndex, 0, removed);

  return result;
};

export const TitleCase = (
  str: string,
  charJoin?: string,
  splitChar?: string
) => {
  const strSlice = str.toLowerCase().split(splitChar || " ");
  const stringJoin = charJoin || " ";

  const final = [];

  for (const word of strSlice) {
    final.push(word.charAt(0).toUpperCase() + word.slice(1));
  }

  return final.join(stringJoin);
};

export const GetColumnKeyShow = (column: ITableV2Column[]): string[] => {
  return column.map((obj) => obj.key);
};

export const GetColumnKeyHidden = (
  columnShow: string[],
  dataSource: any[]
): string[] => {
  const columnHidden: string[] = [];
  Object.keys(dataSource[0]).forEach((field) => {
    if (!columnShow.includes(field)) {
      columnHidden.push(field);
    }
  });
  return columnHidden;
};
