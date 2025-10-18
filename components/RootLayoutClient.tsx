"use client";
import { useContext, useState, useEffect } from "react";
import Navbar from "./Navbar";
import Offcanvas from "./Offcanvas";
import Menu, { MenuItem } from "./Menu";
import { useAppData } from "@/hooks/useAppData";
import { AppContext } from "@/context/app";
import { useRouter } from "next/navigation";

export default function () {
  const [isOpenOffcanvas, setIsOpenOffcanvas] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setThemeMode, themeMode } = useContext(AppContext);
  const allTools = useAppData().tools;

  const handleThemeChange = () => {
    let newTheme = themeMode === "light" ? "dark" : "light";
    setThemeMode(newTheme);
  };

  return (
    <>
      {loading && (
        <div className="page-loader">
          <div className="spinner" />
          <p>Loading...</p>
        </div>
      )}

      <style jsx>{`
        .page-loader {
          position: fixed;
          inset: 0;
          background: rgba(255, 255, 255, 0.85);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }
        .spinner {
          width: 50px;
          height: 50px;
          border: 5px solid #ccc;
          border-top: 5px solid #2b5cc4;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>

      <Navbar
        title="HoneyTools"
        onToggleBtnClick={() => setIsOpenOffcanvas(true)}
        items={
          <>
            <button
              onClick={() => handleThemeChange()}
              className="material-symbols-outlined btn-icon"
            >
              contrast
            </button>
          </>
        }
      />
      <Offcanvas
        title="Tools"
        isOpen={isOpenOffcanvas}
        onClose={() => setIsOpenOffcanvas(false)}
      >
        <Menu>
          {allTools.map((t: any) => {
            return (
              <MenuItem key={t.id} link={`/tools/${t.id}`} title={t.name} />
            );
          })}
        </Menu>
      </Offcanvas>
    </>
  );
}
