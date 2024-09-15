import React from "react";
import { Button } from "@nextui-org/react";
import { useTheme } from "next-themes";
import Moon from "./Logos/Moon";
import Sun from "./Logos/Sun";

interface ThemeSwitcherProps {
  setCurrentTheme: (theme: string | undefined) => void;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ setCurrentTheme }) => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("light");
    }
    setCurrentTheme(theme);
  };
  return (
    <div>
      <Button isIconOnly onClick={toggleTheme}>
        {theme === "light" ? <Moon /> : <Sun />}
      </Button>
    </div>
  );
};

export default ThemeSwitcher;
