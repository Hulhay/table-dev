import { INavLinkGroup, Nav } from "@fluentui/react";
import { useLocation } from "react-router-dom";

import { navbarStyles } from "./NavbarStyle";

const navLink: INavLinkGroup[] = [
  {
    name: "Table",
    links: [
      {
        name: "Home",
        url: "/",
        key: "home",
      },
      {
        name: "Basic Uncontrolled",
        url: "/basic-uncontrolled",
        key: "basic-uncontrolled",
      },
      {
        name: "Basic Controlled",
        url: "/basic-controlled",
        key: "basic-controlled",
      },
      {
        name: "Custom Header",
        url: "/custom-header",
        key: "custom-header",
      },
      {
        name: "Add Row",
        url: "/add-row",
        key: "add-row",
      },
      {
        name: "Sorting Uncontrolled",
        url: "/sorting",
        key: "sorting",
      },
      {
        name: "Sorting Controlled",
        url: "/sorting-controlled",
        key: "sorting-controlled",
      },
      {
        name: "Resize",
        url: "/resize",
        key: "resize",
      },
      {
        name: "Event onResizeColumn",
        url: "/resize-controlled",
        key: "resize-controlled",
      },
      {
        name: "Rearrange Column",
        url: "/rearrange-column",
        key: "rearrange-column",
      },
      {
        name: "Rearrange Column Controlled",
        url: "/rearrange-column-controlled",
        key: "rearrange-column-controlled",
      },
      {
        name: "Single Selection Uncontrolled",
        url: "/single-selection",
        key: "single-selection",
      },
      {
        name: "Single Selection Controlled",
        url: "/single-selection-controlled",
        key: "single-selection-controlled",
      },
      {
        name: "Multiple Selection Uncontrolled",
        url: "/multiple-selection",
        key: "multiple-selection",
      },
      {
        name: "Multiple Selection Controlled",
        url: "/multiple-selection-controlled",
        key: "multiple-selection-controlled",
      },
      {
        name: "Menu Show Column Uncontrolled",
        url: "/setting-show-column",
        key: "setting-show-column",
      },
      {
        name: "Menu Group Data Uncontrolled",
        url: "/setting-group-data",
        key: "setting-group-data",
      },
      {
        name: "Loading State",
        url: "/loading-state",
        key: "loading-state",
      },
    ],
  },
];

const Navbar: React.FC = () => {
  const location = useLocation();

  const selectedItem =
    navLink[0].links.find((link) => link.url === location.pathname) ||
    navLink[0].links[1];

  return (
    <Nav
      groups={navLink}
      styles={navbarStyles}
      selectedKey={selectedItem.key}
    />
  );
};

export default Navbar;
