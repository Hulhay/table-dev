import React from "react";
import { HeaderTableCellProps } from "./utils/Interface";
import { Label } from "@fluentui/react-components";
import { useDrag, useDrop } from "react-dnd";
import { ArrowSort16Regular } from "@fluentui/react-icons";

const HeaderCell: React.FC<HeaderTableCellProps> = (props) => {
  const index = props.index;

  const [, ref] = useDrag({
    type: "COLUMN",
    item: { index },
  });

  const [, drop] = useDrop({
    accept: "COLUMN",
    hover: (draggedItem: { index: number }) => {
      if (draggedItem.index !== index) {
        props.onColumnMove(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div
      key={props.column.key}
      ref={props.rearrangeColumnEnabled ? (node) => ref(drop(node)) : null}
      style={{ width: "100%" }}
      onClick={(e) => props.onHeaderCellClick?.(e, props.column)}
    >
      <Label
        style={{
          cursor: props.rearrangeColumnEnabled ? "move" : "default",
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          gap: 3,
        }}
      >
        {props.column.onRenderHeaderCell ? (
          props.column.onRenderHeaderCell()
        ) : (
          <>
            {props.column.compare && <ArrowSort16Regular />}
            {props.column.label}
          </>
        )}
      </Label>
    </div>
  );
};

export default HeaderCell;
