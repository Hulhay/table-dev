import {
  TableColumnDefinition,
  TableColumnSizingOptions,
  createTableColumn,
} from "@fluentui/react-components";
import { ITableV2, ITableV2Column } from "./Interface";
import { useMemo } from "react";

export const CreateColumnHeader = (defaultColumns: ITableV2Column[]) =>
  useMemo(() => {
    // console.log(defaultColumns)
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
    columnSizingOptions[column.key] = {
      idealWidth: column.width,
      minWidth: column.minWidth,
    };
  });

  return columnSizingOptions;
};

export const Reorder = <T>(
  list: T[],
  sourceIndex: number,
  destinationIndex: number
): T[] => {
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
  return column.filter((obj) => !obj.hidden).map((obj) => obj.label);
};

export const GetColumnKeyHidden = (column: ITableV2Column[]): string[] => {
  return column.filter((obj) => obj.hidden).map((obj) => obj.label);
};

export const ShowSettingButton = (props: ITableV2) => {
  return (
    props.menuShowColumnEnabled ||
    props.menuGroupDataSourceEnabled ||
    props.menuAddColumnEnabled
  );
};

export const GetUniqueFromData = (dataSource: any[], field: string) => {
  const uniques = dataSource.reduce((result: any[], item: any) => {
    if (!result.includes(item[field])) {
      result.push(item[field]);
    }
    return result;
  }, []);
  return uniques;
};

export const GenerateUniqueID = () => {
  return Math.random().toString(16).slice(2);
};
