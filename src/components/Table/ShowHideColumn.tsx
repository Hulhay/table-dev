import {
  Menu,
  MenuDivider,
  MenuGroup,
  MenuGroupHeader,
  MenuItem,
  MenuItemCheckbox,
  MenuList,
  MenuPopover,
  MenuTrigger,
} from "@fluentui/react-components";
import React from "react";
import { ShowColumnTableProps } from "./utils/Interface";
import { TitleCase } from "./utils/Helper";

const ShowHideColumn: React.FC<ShowColumnTableProps> = (props) => {
  return (
    <div style={{ minWidth: 100, alignSelf: "end" }}>
      <Menu
        checkedValues={props.checkedValues}
        onCheckedValueChange={props.onCheckedValueChange}
      >
        <MenuTrigger disableButtonEnhancement>
          <MenuItem>Show Column</MenuItem>
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuGroup>
              <MenuGroupHeader>SHOW FIELDS</MenuGroupHeader>
              {props.checkedValues["show"].map((checkedValue) => {
                return (
                  <MenuItemCheckbox name="show" value={checkedValue}>
                    {TitleCase(checkedValue)}
                  </MenuItemCheckbox>
                );
              })}
            </MenuGroup>
            <MenuDivider />
            <MenuGroup>
              <MenuGroupHeader>FIELDS IN THE LIST</MenuGroupHeader>
              {props.uncheckedValues["hidden"].map((uncheckedValue) => {
                return (
                  <MenuItemCheckbox name="hidden" value={uncheckedValue}>
                    {TitleCase(uncheckedValue)}
                  </MenuItemCheckbox>
                );
              })}
            </MenuGroup>
          </MenuList>
        </MenuPopover>
      </Menu>
    </div>
  );
};

export default ShowHideColumn;
