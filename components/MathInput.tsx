import React from "react";
import dynamic from "next/dynamic";
import { MathJSON } from "@/types/math/mathjson";

const MathKeyboard = dynamic(() => import("@/components/MathKeyboard"), {
  ssr: false,
});

type MathInputProps = {
  label: string;
  value?: MathJSON;
  onChange?: (value: MathJSON) => void;
};

export default function MathInput({ onChange, label }: MathInputProps) {
  return (
    <div className="form-math-group">
      <label className="block font-semibold mb-2">{label}</label>
      <MathKeyboard onChange={onChange} />
    </div>
  );
}
