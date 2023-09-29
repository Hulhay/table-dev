import { Label, PrimaryButton, Stack } from "@fluentui/react";
import { useNavigate } from "react-router-dom";

import { Header } from "../../components";
import { buttonStyle, stackStyle } from "./NotFoundStyle";

const NotFound = () => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate("/");
  };

  return (
    <Stack horizontalAlign="center" verticalAlign="center" styles={stackStyle}>
      <Header title="404 - Not Found" />
      <Label>The page you are looking for is not available</Label>
      <PrimaryButton styles={buttonStyle} onClick={onClick}>
        Back to Home
      </PrimaryButton>
    </Stack>
  );
};

export default NotFound;
