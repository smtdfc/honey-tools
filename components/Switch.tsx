import React, { CSSProperties } from "react";

type SwitchProps = {
  value: boolean;
  label?: string;
  onChange: (value: boolean, e?: React.ChangeEvent<HTMLInputElement>) => void;
  styles?: CSSProperties;
};

export default function Switch({
  value,
  label,
  onChange,
  styles,
}: SwitchProps) {
  return (
    <label
      className="switch-wrapper"
      style={{
        marginTop: "10px",
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        ...styles,
      }}
    >
      <div className="switch">
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => onChange(e.target.checked, e)}
        />
        <span className="slider"></span>
      </div>
      {label && <span>{label}</span>}
    </label>
  );
}
