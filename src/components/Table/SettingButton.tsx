import {
  Button,
  Menu,
  MenuList,
  MenuPopover,
  MenuTrigger,
} from "@fluentui/react-components";
import React from "react";
import { SettingTableButtonProps } from "./utils/Interface";
import MenuShowHideColumn from "./MenuShowHideColumn";

const SettingButton: React.FC<SettingTableButtonProps> = (props) => {
  return (
    <div style={{ minWidth: 100, alignSelf: "end" }}>
      <Menu>
        <MenuTrigger disableButtonEnhancement>
          <Button>Settings</Button>
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            {props.settingShowColumnEnabled && (
              <MenuShowHideColumn {...props.showColumnTableProps} />
            )}
          </MenuList>
        </MenuPopover>
      </Menu>
    </div>
  );
};

export default SettingButton;
