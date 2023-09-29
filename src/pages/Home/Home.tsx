import { Stack } from "@fluentui/react";
import { Header } from "../../components";

const Home: React.FC = () => {
  return (
    <Stack
      horizontalAlign="center"
      verticalAlign="center"
      styles={{ root: { height: "100vh" } }}
    >
      <Header title="Welcome to Table Dev" />
    </Stack>
  );
};

export default Home;
