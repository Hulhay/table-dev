import {
  Label,
  TableColumnDefinition,
  createTableColumn,
} from "@fluentui/react-components";
import { ITableV2Column } from "./Interface";
import { ArrowSort16Regular } from "@fluentui/react-icons";
import { useMemo } from "react";

export const CreateColumnHeader = (defaultColumns: ITableV2Column[]) =>
  useMemo(() => {
    const columns: TableColumnDefinition<any>[] = [];

    defaultColumns.forEach((column: ITableV2Column) => {
      columns.push(
        createTableColumn({
          columnId: column.key,
          compare: column.compare,
          renderHeaderCell: () => {
            return (
              <Label
                style={{
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  gap: 3,
                }}
              >
                {column.compare && <ArrowSort16Regular />}
                {column.label}
              </Label>
            );
          },
        })
      );
    });

    return columns;
  }, [defaultColumns]);
