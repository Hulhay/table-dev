import { createBrowserRouter } from "react-router-dom";

import {
  AddRow,
  AddRowInSpesificGroup,
  BasicControlled,
  BasicUncontrolled,
  CustomHeaderCell,
  Home,
  LoadingState,
  MultipleSelection,
  MultipleSelectionControlled,
  NotFound,
  RearrangeColumn,
  RearrangeColumnControlled,
  Resize,
  ResizeControlled,
  SettingGroupData,
  SettingGroupDataControlled,
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
        path: "basic-controlled",
        element: <BasicControlled />,
      },
      {
        path: "custom-header",
        element: <CustomHeaderCell />,
      },
      {
        path: "add-row",
        element: <AddRow />,
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
        element: <RearrangeColumnControlled />,
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
        path: "setting-group-data",
        element: <SettingGroupData />,
      },
      {
        path: "setting-group-data-controlled",
        element: <SettingGroupDataControlled />,
      },
      {
        path: "add-row-in-spesific-group",
        element: <AddRowInSpesificGroup />,
      },
      {
        path: "loading-state",
        element: <LoadingState />,
      },
    ],
  },
]);

export default Navigations;
