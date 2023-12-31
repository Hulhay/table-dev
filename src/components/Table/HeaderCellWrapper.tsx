import {
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  TableHeaderCell,
} from "@fluentui/react-components";
import React from "react";
import HeaderCell from "./HeaderCell";
import { HeaderCellWrapperProps } from "./utils/Interface";

const HeaderCellWrapper: React.FC<HeaderCellWrapperProps> = (props) => {
  return (
    <Menu openOnContext key={props.column.key}>
      <MenuTrigger>
        <TableHeaderCell
          key={props.column.key}
          tabIndex={props.index}
          {...props.columnSizing_unstable.getTableHeaderCellProps(
            props.column.key
          )}
          {...(props.column.compare && props.headerSortProps(props.column.key))}
        >
          <HeaderCell
            column={props.column}
            index={props.index}
            key={props.column.key}
            onRenderHeaderCell={props.column.onRenderDataSource}
            onHeaderCellClick={props.onHeaderCellClick}
            onColumnMove={props.onColumnMove}
            reorderColumnEnabled={props.reorderColumnEnabled}
          />
        </TableHeaderCell>
      </MenuTrigger>
      <MenuPopover>
        <MenuList>
          <MenuItem
            onClick={props.columnSizing_unstable.enableKeyboardMode(
              props.column.key
            )}
          >
            Keyboard Column Resizing
          </MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};

export default HeaderCellWrapper;
