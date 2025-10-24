import React, { CSSProperties } from "react";
import dynamic from "next/dynamic";
import { MathJSON } from "@/types/math/mathjson";

const MathKeyboard = dynamic(() => import("@/components/MathKeyboard"), {
  ssr: false,
});

type MathInputProps = {
  label: string;
  value?: MathJSON;
  onChange?: (value: MathJSON) => void;
  styles?: CSSProperties;
};

export default function MathInput({ styles, onChange, label }: MathInputProps) {
  return (
    <div className="form-math-group" style={styles}>
      <label className="block font-semibold mb-2">{label}</label>
      <MathKeyboard onChange={onChange} />
    </div>
  );
}
