import React, { CSSProperties } from "react";

type InputProps = {
  value: string | number | boolean;
  label: string;
  type: "text" | "number" | "checkbox" | "file";
  onChange: (value: any, e?: React.ChangeEvent<HTMLInputElement>) => void;
  accept?: string;
  styles?: CSSProperties;
};

export default function Input({
  type,
  label,
  value,
  styles,
  accept,
  onChange,
}: InputProps) {
  return (
    <div
      className={type === "checkbox" ? "form-check-group" : "form-group"}
      style={styles}
    >
      <label>{label}</label>
      <input
        type={type}
        accept={accept}
        maxLength={10}
        onChange={(e) => onChange?.(e.target.value, e)}
        value={type == "file" ? "" : value.toString()}
      />
    </div>
  );
}
