import { createBrowserRouter } from "react-router-dom";

import {
  BasicUncontrolled,
  Home,
  MultipleSelection,
  NotFound,
  RearrangeColumn,
  Resize,
  SettingShowColumn,
  SingleSelection,
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
      {
        path: "single-selection",
        element: <SingleSelection />,
      },
      {
        path: "multiple-selection",
        element: <MultipleSelection />,
      },
      {
        path: "setting-show-column",
        element: <SettingShowColumn />,
      },
    ],
  },
]);

export default Navigations;
