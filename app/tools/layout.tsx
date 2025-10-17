"use client";
import React from "react";
import "@/styles/layouts/tool.css";
import { useAppData } from "@/hooks/useAppData";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export default function ToolLayout() {
  const router = useRouter();
  const pathname = usePathname();
  const tools = useAppData().tools;
  const segments = pathname.split("/").filter(Boolean);
  const toolId = segments[1];

  const toolName = tools.find((v) => v.id === toolId)?.name || "Unknown tool";

  return (
    <div className="tool-layout">
      <div className="tool-layout-header">
        <button
          onClick={() => router.back()}
          className="btn-icon material-symbols-outlined"
        >
          arrow_left_alt
        </button>
        <h3>{toolName}</h3>
      </div>
    </div>
  );
}
