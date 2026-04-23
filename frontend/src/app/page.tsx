"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <>
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
              onClick={() => router.push("/login")}
            >
              Login / Register
            </button>

            <button
              className="btn btn-dark"
              onClick={() => router.push("/admin-login")}
            >
              Admin
            </button>
          </div>
        </div>

        {open && (
          <div className="d-flex flex-column mt-3 gap-2 d-md-none">
            <button
              className="btn nav-btn w-100"
              onClick={() => {
                router.push("/login");
                setOpen(false);
              }}
            >
              Login / Register
            </button>

            <button
              className="btn btn-dark w-100"
              onClick={() => {
                router.push("/admin-login");
                setOpen(false);
              }}
            >
              Admin
            </button>
          </div>
        )}
      </nav>

      <div className="container text-center mt-5 pt-5">
        <h1 className="fw-bold display-5">
          Manage Your Tasks{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #6366f1, #3b82f6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Efficiently
          </span>{" "}
        </h1>

        <p className="text-muted mt-3 mx-auto" style={{ maxWidth: "600px" }}>
          Organize, track, and complete your tasks with ease.  
          Stay productive and never miss deadlines.
        </p>
        <div className="mt-4 d-flex justify-content-center gap-3 flex-wrap">
          <button
            className="btn btn-primary btn-lg px-4"
            onClick={() => router.push("/register")}
          >
            Get Started
          </button>

          <button
            className="btn btn-outline-dark btn-lg px-4"
            onClick={() => router.push("/login")}
          >
            Login
          </button>
        </div>
      </div>
    </>
  );
}