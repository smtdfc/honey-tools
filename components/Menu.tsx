"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface MenuProps {
  children:
    | React.ReactElement<MenuItemProps>[]
    | React.ReactElement<MenuItemProps>;
}

interface MenuItemProps {
  children?: React.ReactNode;
  title: string;
  link: string;
  onClick?: () => void;
}

export function MenuItem({ children, link, title, onClick }: MenuItemProps) {
  const pathname = usePathname();
  const isActive = pathname === link;

  return (
    <li>
      <Link href={link} className={isActive ? "active" : ""}>
        {title}
      </Link>
      {children ? <ul>{children}</ul> : null}
    </li>
  );
}

export default function Menu({ children }: MenuProps) {
  return (
    <div className="menu">
      <ul>{children}</ul>
    </div>
  );
}
