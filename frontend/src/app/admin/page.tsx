"use client";
import { useEffect, useState } from "react";
import API from "@/services/api";
import Navbar from "@/components/Navbar";

export default function Admin() {
  const [users, setUsers] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    fetchData();
  }, []);

  const fetchData = async () => {
    const usersRes = await API.get("/admin/users");
    const tasksRes = await API.get("/admin/tasks");

    setUsers(usersRes.data);
    setTasks(tasksRes.data);
  };

  const getUserTaskCount = (userId: string) => {
    return tasks.filter((t) => t.user?._id === userId).length;
  };

  const getPriorityColor = (priority: string) => {
    if (priority === "high") return "danger";
    if (priority === "medium") return "warning";
    return "success";
  };

  const getStatusColor = (status: string) => {
    if (status === "done") return "success";
    if (status === "in-progress") return "primary";
    return "secondary";
  };

  return (
    <>
      <Navbar />

      <div className="container py-4">
        <h2 className="text-center fw-bold mb-4">Admin Dashboard</h2>
        <div className="row mb-4 text-center">
          <div className="col-4 mb-2">
            <div className="card p-3 shadow-sm">
              <h6>Total Users</h6>
              <h3>{users.length}</h3>
            </div>
          </div>

          <div className="col-4 mb-2">
            <div className="card p-3 shadow-sm">
              <h6>Total Tasks</h6>
              <h3>{tasks.length}</h3>
            </div>
          </div>

          <div className="col-4 mb-2">
            <div className="card p-3 shadow-sm">
              <h6>Completed Tasks</h6>
              <h3 className="text-success">
                {tasks.filter(t => t.status === "done").length}
              </h3>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-5">
            <h5 className="mb-3">Users</h5>

            {users.map((u) => (
              <div key={u._id} className="card shadow-sm p-3 mb-3">
                <div >
                  <div className="d-flex justify-content-between">
                    <h6 className="mb-1">{u.name || "No Name"}</h6>
                    <span className="badge bg-dark">
                    {u.role || "user"}
                  </span>
                  </div>
                  <small className="text-muted">{u.email}</small>
                </div>

                <div className="mt-2 d-flex justify-content-between">
                  <small className="text-muted">
                    Tasks Assigned
                  </small>

                  <span className="badge bg-primary">
                    {getUserTaskCount(u._id)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="col-md-7">
            <h5 className="mb-3">Tasks</h5>

            {tasks.map((t) => (
              <div key={t._id} className="card shadow-sm p-3 mb-3">
                <div className="d-flex justify-content-between align-items-center">
                  <h6 className="mb-0">{t.title}</h6>

                  <div className="d-flex gap-2">
                    <span className={`badge bg-${getStatusColor(t.status)}`}>
                      {t.status}
                    </span>

                    <span className={`badge bg-${getPriorityColor(t.priority)}`}>
                      {t.priority}
                    </span>
                  </div>
                </div>

                <p className="text-muted mt-2 mb-2">
                  {t.description}
                </p>

                <div className="d-flex justify-content-between flex-wrap">
                  <small className="text-muted">
                    👤 {t.user?.name || "Unknown"} ({t.user?.email || "N/A"})
                  </small>

                  <small className="text-muted">
                    DueDate: {t.dueDate
                      ? new Date(t.dueDate).toLocaleDateString()
                      : "No deadline"}
                  </small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}