import type { GlobalProvider } from "@ladle/react";
import React, { useLayoutEffect } from "react";
import ComponentsProvider from "../src/Provider";
import { useThemeStore } from "../src/stores";

import "../src/styles/index.css";
import "./ladle.css";

export const Provider: GlobalProvider = ({ children, globalState }) => {
  const theme = globalState.theme;
  const { theme: componentsTheme, toggleTheme } = useThemeStore.getState();

  useLayoutEffect(() => {
    if (componentsTheme !== theme) {
      toggleTheme();
    }

    const root = window.document.documentElement;

    if (theme === "dark") {
      root.classList.remove("light");
      root.classList.add("dark");
    } else if (theme === "light") {
      root.classList.remove("dark");
      root.classList.add("light");
    }
  }, [theme]);

  return <ComponentsProvider>{children}</ComponentsProvider>;
};
