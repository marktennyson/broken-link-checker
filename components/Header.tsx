import React, { useState } from "react";
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
  const [currentTheme, setCurrentTheme] = useState<string | undefined>(
    undefined
  );
  const bgColor = currentTheme === "light" ? "bg-black/90" : "bg-transparent";
  const logoTextColor = currentTheme === "light" ? "text-white" : "text-black";
  return (
    <Navbar className={bgColor}>
      <NavbarBrand className="justify-left">
        <Logo />
        <p className={`${logoTextColor} font-bold text-inherit pl-4`}>
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
