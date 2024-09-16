import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  // Link,
  Button,
} from "@nextui-org/react";
import Logo from "./Logos/Logo";
import ThemeSwitcher from "./ThemeSwitcher";

const Header: React.FC = () => {
  const [, setCurrentTheme] = React.useState<string | undefined>(undefined);
  return (
    <Navbar className={"bg-black"}>
      <NavbarBrand className="justify-left">
        <Logo />
        <p className={`text-white font-bold text-inherit pl-4`}>
          Broken Link Checker
        </p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          <ThemeSwitcher setCurrentTheme={setCurrentTheme} />
        </NavbarItem>
        <NavbarItem>
          <Button variant="faded">Login</Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default Header;
