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
        name: "Add Row Using External Button",
        url: "/add-row-external-button",
        key: "add-row-external-button",
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
        name: "Menu Show Column Controlled",
        url: "/setting-show-column-controlled",
        key: "setting-show-column-controlled",
      },
      {
        name: "Menu Group Data Uncontrolled",
        url: "/setting-group-data",
        key: "setting-group-data",
      },
      {
        name: "Menu Group Data Controlled",
        url: "/setting-group-data-controlled",
        key: "setting-group-data-controlled",
      },
      {
        name: "Add Column Uncontrolled",
        url: "/add-column",
        key: "add-column",
      },
      {
        name: "Add Column Controlled",
        url: "/add-column-controlled",
        key: "add-column-controlled",
      },
      {
        name: "Add Row In Spesific Group",
        url: "/add-row-in-spesific-group",
        key: "add-row-in-spesific-group",
      },
      {
        name: "Loading State",
        url: "/loading-state",
        key: "loading-state",
      },
      {
        name: "Put It All",
        url: "/put-it-all",
        key: "put-it-all",
      },
      {
        name: "Cell Input",
        url: "/cell-input",
        key: "cell-input",
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
