import { useContext } from "react";
import { AppContext } from "@/context/app";

export function useAppData() {
  return useContext(AppContext);
}
