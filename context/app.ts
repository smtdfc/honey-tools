"use client";
import { createContext } from "react";
import { Tool } from "@/entities/tool";

interface IAppContext {
  tools: Tool[];
  themeMode: string;
  setThemeMode: (mode: string) => void;
}

export const AppContext = createContext<IAppContext>({
  tools: [],
  themeMode: "light",
  setThemeMode: (mode: string) => {},
});
