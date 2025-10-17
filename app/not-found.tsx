"use client";
import Link from "next/link";
import "@/styles/not-found.css"; // import CSS

export default function NotFound() {
  return (
    <div className="notfound-container">
      <div className="notfound-content">
        <h1 className="notfound-title">404</h1>
        <p className="notfound-subtitle">Oops! Page not found</p>
        <Link href="/" className="notfound-btn">
          Return to home page
        </Link>
      </div>
    </div>
  );
}
