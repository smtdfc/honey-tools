"use client";
import { useEffect, useState } from "react";
import { AppContext } from "@/context/app";
import type { Tool } from "@/entities/tool";

export default function AppContainer({
  children,
  tools,
}: {
  children: React.ReactNode;
  tools: Tool[];
}) {
  const [themeMode, setThemeMode] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "light";
    setThemeMode(saved);
    document.body.classList.add(saved);
  }, []);

  useEffect(() => {
    if (themeMode) {
      localStorage.setItem("theme", themeMode);
      document.body.classList.remove("light", "dark");
      document.body.classList.add(themeMode);
    }
  }, [themeMode]);
  if (!themeMode) return <div style={{ opacity: 0 }}>{children}</div>; // chờ load theme

  return (
    <AppContext.Provider value={{ tools, themeMode, setThemeMode }}>
      {children}
    </AppContext.Provider>
  );
}
