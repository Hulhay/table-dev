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
        name: "Sorting",
        url: "/sorting",
        key: "sorting",
      },
      {
        name: "Resize",
        url: "/resize",
        key: "resize",
      },
      {
        name: "Rearrange Column",
        url: "/rearrange-column",
        key: "rearrange-column",
      },
      {
        name: "Single Selection Uncontrolled",
        url: "/single-selection",
        key: "single-selection",
      },
      {
        name: "Multiple Selection Uncontrolled",
        url: "/multiple-selection",
        key: "multiple-selection",
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
