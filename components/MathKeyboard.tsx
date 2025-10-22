"use client";
import { MathJSON } from "@/types/math/mathjson";
import "mathlive";
import "@cortex-js/compute-engine";
import React, { useRef, useEffect, useState } from "react";

const MathField = "math-field" as any;

export default function MathKeyboard({
  onChange,
  value: initialValue = [],
}: {
  onChange?: (value: MathJSON) => void;
  value?: MathJSON;
}) {
  const [value, setValue] = useState<MathJSON>(initialValue);
  const [latex, setLatex] = useState("");
  const mathfieldRef = useRef<any>(null);

  useEffect(() => {
    const mf = mathfieldRef.current;
    const handleInput = () => {
      const mathJson = JSON.parse(mf.getValue("math-json")) as unknown;

      const normalized = (
        typeof mathJson != "object" ? ["Number", mathJson] : mathJson
      ) as MathJSON;
      setValue(normalized);
      onChange?.(normalized);
      setLatex(mf.getValue("latex"));
    };
    mf.addEventListener("input", handleInput);
    return () => mf.removeEventListener("input", handleInput);
  }, []);

  return (
    <>
      <div style={{ margin: "0.5rem" }}>
        <MathField
          options={{
            keypressSound: null,
            plonkSound: null,
          }}
          ref={mathfieldRef}
          style={{ width: "100%" }}
        ></MathField>
      </div>
      <p className="latex">Latex: {latex}</p>
    </>
  );
}
