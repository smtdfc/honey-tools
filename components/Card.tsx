import React from "react";

type CardProps = {
  title: string;
  subtitle?: string;
  iconType: "img" | "class";
  icon: string;
  children: React.ReactNode;
  onClick?: () => void;
};

export default function Card({
  title,
  icon,
  iconType,
  children,
  subtitle,
  onClick,
}: CardProps) {
  return (
    <div className="card card-hover" onClick={onClick}>
      <div className="card-header">
        {iconType == "img" ? (
          <img src={icon} alt={title} className="card-icon-img" />
        ) : (
          <i className="material-symbols-outlined">{icon}</i>
        )}
        <div className="card-title">
          <h3>{title}</h3>
          <span>{subtitle}</span>
        </div>
      </div>
      <div className="card-body">{children}</div>
    </div>
  );
}
