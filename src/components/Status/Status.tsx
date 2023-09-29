import { Icon, Stack } from "@fluentui/react";
import { titleCase } from "../../helper";

interface IStatus {
  status: string;
}

const Status: React.FC<IStatus> = (props) => {
  const colorStatus = (status: string) => {
    switch (status) {
      case "todo":
        return "lightblue";
      case "inprogress":
        return "yellow";
      case "completed":
        return "green";
    }
  };
  return (
    <Stack horizontal tokens={{ childrenGap: 5 }} verticalAlign="center">
      <Icon
        iconName="CircleShapeSolid"
        styles={{ root: { color: colorStatus(props.status) } }}
      />
      <p>{titleCase(props.status)}</p>
    </Stack>
  );
};

export default Status;
