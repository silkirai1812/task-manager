"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <nav
      className="px-4 py-3"
      style={{
        background: "rgba(255,255,255,0.6)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(0,0,0,0.05)",
      }}
    >
      <div className="d-flex justify-content-between align-items-center">

        <span
          role="button"
          className="fw-bold fs-4"
          style={{ color: "#4f46e5" }}
          onClick={() => router.push("/")}
        >
          Task Manager
        </span>

        <button
          className="btn d-md-none"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

        <div className="d-none d-md-flex gap-3">
          <button
            className="btn nav-btn"
            onClick={() => router.push("/dashboard")}
          >
            Dashboard
          </button>

          <button
            className="btn nav-btn"
            onClick={() => router.push("/analytics")}
          >
            Analytics
          </button>

          <button
            className="btn nav-btn"
            onClick={() => router.push("/profile")}
          >
            Profile
          </button>

          <button
            className="btn btn-danger"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>

      {open && (
        <div className="d-flex flex-column mt-3 gap-2 d-md-none">
          <button
            className="btn nav-btn w-100"
            onClick={() => {
              router.push("/dashboard");
              setOpen(false);
            }}
          >
            Dashboard
          </button>

          <button
            className="btn nav-btn w-100"
            onClick={() => {
              router.push("/analytics");
              setOpen(false);
            }}
          >
            Analytics
          </button>

          <button
            className="btn nav-btn w-100"
            onClick={() => {
              router.push("/profile");
              setOpen(false);
            }}
          >
            Profile
          </button>

          <button
            className="btn btn-danger w-100"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}