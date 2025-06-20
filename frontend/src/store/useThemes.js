import { create } from "zustand";

export const useThemes = create((set) => ({
  theme: localStorage.getItem("yooChat-theme") || "business",
  setTheme: (theme) => {
    localStorage.setItem("yooChat-theme", theme);
    set({ theme });
  },
}));
