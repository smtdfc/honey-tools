"use client";
import "mathlive";
import React, { useRef, useEffect, useState } from "react";

const MathField = "math-field" as any;

export default function MathKeyboard({
  onChange,
  value: initialValue = "",
}: {
  onChange?: (value: string) => void;
  value?: string;
}) {
  const [value, setValue] = useState(initialValue);
  const mathfieldRef = useRef<any>(null);

  useEffect(() => {
    const mf = mathfieldRef.current;
    const handleInput = () => {
      const latex = mf.getValue();
      setValue(latex);
      onChange?.(latex);
    };
    mf.addEventListener("input", handleInput);
    return () => mf.removeEventListener("input", handleInput);
  }, []);

  return (
    <>
      <div style={{ margin: "0.5rem" }}>
        <MathField ref={mathfieldRef} style={{ width: "100%" }}>
          {value}
        </MathField>
      </div>
      <p className="text-gray-500 text-sm mt-2">Latex: {value}</p>
    </>
  );
}
