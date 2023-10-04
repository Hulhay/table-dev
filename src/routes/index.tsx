import { createBrowserRouter } from "react-router-dom";

import {
  BasicUncontrolled,
  Home,
  LoadingState,
  MultipleSelection,
  MultipleSelectionControlled,
  NotFound,
  RearrangeColumn,
  RearrangeColumnControlled,
  Resize,
  ResizeControlled,
  SettingShowColumn,
  SingleSelection,
  SingleSelectionControlled,
  Sorting,
  SortingControlled,
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
        path: "sorting-controlled",
        element: <SortingControlled />,
      },
      {
        path: "resize",
        element: <Resize />,
      },
      {
        path: "resize-controlled",
        element: <ResizeControlled />,
      },
      {
        path: "rearrange-column",
        element: <RearrangeColumn />,
      },
      {
        path: "rearrange-column-controlled",
        element: <RearrangeColumnControlled />
      },
      {
        path: "single-selection",
        element: <SingleSelection />,
      },
      {
        path: "single-selection-controlled",
        element: <SingleSelectionControlled />,
      },
      {
        path: "multiple-selection",
        element: <MultipleSelection />,
      },
      {
        path: "multiple-selection-controlled",
        element: <MultipleSelectionControlled />,
      },
      {
        path: "setting-show-column",
        element: <SettingShowColumn />,
      },
      {
        path: "loading-state",
        element: <LoadingState />,
      },
    ],
  },
]);

export default Navigations;
