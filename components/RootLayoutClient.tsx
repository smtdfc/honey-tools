"use client";
import { useContext, useState } from "react";
import Navbar from "./Navbar";
import Offcanvas from "./Offcanvas";
import Menu, { MenuItem } from "./Menu";
import { useAppData } from "@/hooks/useAppData";
import { AppContext } from "@/context/app";
import { useRouter } from "next/navigation";

export default function () {
  const [isOpenOffcanvas, setIsOpenOffcanvas] = useState(false);
  const { setThemeMode, themeMode } = useContext(AppContext);
  const allTools = useAppData().tools;
  const router = useRouter();

  const handleThemeChange = () => {
    let newTheme = themeMode === "light" ? "dark" : "light";
    setThemeMode(newTheme);
  };

  return (
    <>
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
