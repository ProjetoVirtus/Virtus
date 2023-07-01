import { useTheme } from "next-themes";

import { MdOutlineLightMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";

export default function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex">
      <button
        className={`w-9 h-9 grid place-content-center rounded ${
          theme === "light" ? "bg-blue-500" : "bg-transparent"
        }`}
        aria-label="Tema claro"
        onClick={() => setTheme("light")}
      >
        <MdOutlineLightMode fill={"white"} />
      </button>

      <button
        className={`w-9 h-9 grid place-content-center rounded ${
          theme === "dark" ? "bg-blue-500" : "bg-transparent"
        }`}
        aria-label="Tema escuro"
        onClick={() => setTheme("dark")}
      >
        <MdOutlineDarkMode fill={theme === "dark" && "white" || undefined} />
      </button>
    </div>
  );
}
