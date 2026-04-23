"use client";
import { useRouter } from "next/navigation";

export default function MainNavbar() {
  const router = useRouter();

  return (
    <nav className="navbar navbar-light bg-light px-4 shadow-sm">
      <span className="navbar-brand fw-bold">Smart Task Manager</span>

      <div>
        <button
          className="btn btn-outline-primary me-2"
          onClick={() => router.push("/login")}
        >
          Login
        </button>

        <button
          className="btn btn-outline-success me-2"
          onClick={() => router.push("/register")}
        >
          Register
        </button>

        <button
          className="btn btn-dark"
          onClick={() => router.push("/admin-login")}
        >
          Admin
        </button>
      </div>
    </nav>
  );
}