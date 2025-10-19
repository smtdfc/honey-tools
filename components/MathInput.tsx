import React from "react";
import dynamic from "next/dynamic";

const MathKeyboard = dynamic(() => import("@/components/MathKeyboard"), {
  ssr: false,
});

type MathInputProps = {
  label: string;
  value?: string;
  onChange?: (value: any) => void;
};

export default function MathInput({ onChange, label, value }: MathInputProps) {
  return (
    <div className="form-math-group">
      <label className="block font-semibold mb-2">{label}</label>
      <MathKeyboard onChange={onChange} />
    </div>
  );
}
