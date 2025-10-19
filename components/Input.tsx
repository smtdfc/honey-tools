import React from "react";

type InputProps = {
  type: string;
  label: string;
  value: string;
  onChange?: (value: any) => void;
};

export default function Input({ type, label, value, onChange }: InputProps) {
  return (
    <div className="form-group">
      <label>{label}</label>
      <input
        type={type}
        maxLength={10}
        onChange={(e) => onChange?.(e.target.value)}
        value={value}
      />
    </div>
  );
}
