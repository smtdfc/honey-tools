"use client";
import React, { Suspense } from "react";
import "@/styles/layouts/tool.css";
import { useAppData } from "@/hooks/useAppData";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import LoadingSkeleton from "@/components/LoadingSkeleton";

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
      <Suspense fallback={<LoadingSkeleton />}>
        <div className="tool-layout-body">{children}</div>
      </Suspense>
    </div>
  );
}
