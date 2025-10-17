"use client";
import React, { useEffect, useState } from "react";
import { useAppData } from "@/hooks/useAppData";

interface OffcanvasProps {
  title: string;
  isOpen: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
}

export default function Offcanvas({
  title,
  isOpen,
  onClose,
  children,
}: OffcanvasProps) {
  const allTools = useAppData().tools;

  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => setShow(true));
    } else {
      setShow(false);
    }
  }, [isOpen]);

  return (
    <>
      <div className={`offcanvas ${show ? "open" : ""}`}>
        <div className="offcanvas-header">
          <h3 className="offcanvas-title">{title}</h3>
          <button
            onClick={onClose}
            className="offcanvas-toggle-btn material-symbols-outlined"
          >
            close
          </button>
        </div>
        <div className="offcanvas-body">{children}</div>
      </div>
      <div className={`offcanvas-overlay ${show ? "open" : ""}`}></div>
    </>
  );
}
