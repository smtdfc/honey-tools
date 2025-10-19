import React from "react";
import { BlockMath } from "react-katex";

type MathDisplayProps = {
  label: string;
  expr: string;
  fallback?: string;
};

export default function MathDisplay({
  label,
  expr,
  fallback,
}: MathDisplayProps) {
  return (
    <>
      <label className="block font-semibold mt-6">{label}</label>
      <div className="mt-2">
        {expr ? (
          <BlockMath math={expr} />
        ) : (
          <i className="sub-text">{fallback}</i>
        )}
      </div>
    </>
  );
}
