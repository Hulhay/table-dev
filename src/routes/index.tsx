import { createBrowserRouter } from "react-router-dom";

import { Home, NotFound } from "../pages";
import Layout from "./Layout";

const Navigations = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
]);

export default Navigations;
