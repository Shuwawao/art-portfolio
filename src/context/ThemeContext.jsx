import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({
  theme: "paper",
  isDark: false,
  toggleTheme: () => {}
});

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("juswa_art_theme");
      if (saved) return saved;
      if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return "exhibition";
      }
    }
    return "paper"; // Default to warm archival sketchbook paper
  });

  const isDark = theme === "exhibition";

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "exhibition") {
      root.classList.add("theme-exhibition");
      root.classList.remove("theme-paper");
    } else {
      root.classList.add("theme-paper");
      root.classList.remove("theme-exhibition");
    }
    localStorage.setItem("juswa_art_theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "paper" ? "exhibition" : "paper"));
  };

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
