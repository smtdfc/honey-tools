import React, { useContext } from "react";

interface NavbarProps {
  title: string;
  onToggleBtnClick?: () => void;
  items?: React.ReactNode;
}

export default function Navbar({
  title,
  onToggleBtnClick,
  items,
}: NavbarProps) {
  return (
    <div className="navbar">
      <div className="navbar-header">
        <button
          onClick={onToggleBtnClick}
          className="navbar-toggle-btn material-symbols-outlined"
        >
          menu
        </button>
        <h3 className="navbar-title">{title}</h3>
      </div>
      <div className="navbar-items">{items}</div>
    </div>
  );
}
