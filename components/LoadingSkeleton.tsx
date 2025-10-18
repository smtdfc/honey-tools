// components/LoadingSkeleton.tsx
import React from "react";

export default function LoadingSkeleton({
  width = "100%",
  height = "1.5rem",
  count = 3,
}: {
  width?: string | string[];
  height?: string;
  count?: number;
}) {
  const items = Array.from({ length: count });

  return (
    <div
      className="skeleton-wrapper"
      style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}
    >
      {items.map((_, idx) => (
        <div
          key={idx}
          className="skeleton"
          style={{
            width: Array.isArray(width) ? width[idx] || "100%" : width,
            height,
          }}
        />
      ))}
    </div>
  );
}
