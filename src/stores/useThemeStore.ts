import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type Theme = "light" | "dark";

type State = {
  theme: Theme;
};

type Actions = {
  toggleTheme: () => void;
};

type StoredThemeObject = State & {
  version: number;
};

const DEFAULT_THEME: StoredThemeObject = {
  theme: "dark",
  version: 0,
};

let savedTheme = localStorage.getItem("theme") as unknown as StoredThemeObject;
if (!savedTheme) {
  localStorage.setItem("theme", JSON.stringify(DEFAULT_THEME));
  savedTheme = DEFAULT_THEME;
}

const useThemeStore = create(
  immer(
    persist<State & Actions>(
      (set) => ({
        theme: savedTheme.theme,
        toggleTheme: () =>
          set((state) => {
            state.theme = state.theme === "light" ? "dark" : "light";
            return state;
          }),
      }),
      {
        name: "theme",
      },
    ),
  ),
);

export default useThemeStore;
