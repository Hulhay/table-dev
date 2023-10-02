import { createBrowserRouter } from "react-router-dom";

import {
  BasicUncontrolled,
  Home,
  NotFound,
  RearrangeColumn,
  Resize,
  Sorting,
} from "../pages";
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
      {
        path: "basic-uncontrolled",
        element: <BasicUncontrolled />,
      },
      {
        path: "sorting",
        element: <Sorting />,
      },
      {
        path: "resize",
        element: <Resize />,
      },
      {
        path: "rearrange-column",
        element: <RearrangeColumn />,
      },
    ],
  },
]);

export default Navigations;
