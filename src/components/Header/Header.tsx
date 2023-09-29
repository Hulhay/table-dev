import { FontSizes } from "@fluentui/react";

import { headerStyle } from "./HeaderStyle";

interface IHeader {
  title: string;
}

const Header: React.FC<IHeader> = (props) => {
  return (
    <div style={headerStyle}>
      <h1 style={{ fontSize: FontSizes.size28, lineHeight: "1.2em" }}>
        {props.title}
      </h1>
    </div>
  );
};

export default Header;
