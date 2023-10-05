import React, { useState } from "react";
import { Person12Regular } from "@fluentui/react-icons";

interface CustomHeader {
  personIcon?: boolean;
  label: string;
  center?: boolean
}

const CustomHeadercell: React.FC<CustomHeader> = (props) => {
  const [letterSpacing, setLetterSpacing] = useState("normal");
  const onMouseEnter = () => setLetterSpacing("1px");
  const onMouseLeave = () => setLetterSpacing("normal");
  return (
    <div
      style={{
        width: "100%",
        textAlign: "center",
        letterSpacing: letterSpacing,
        display: "flex",
        gap: 5,
        justifyContent: props.center === true ? "center" : "start",
        alignItems: "center",
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {props.personIcon && <Person12Regular />}
      {props.label}
    </div>
  );
};

export default CustomHeadercell;
