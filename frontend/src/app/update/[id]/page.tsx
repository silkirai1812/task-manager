"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import API from "@/services/api";

export default function UpdateTask() {
  const { id } = useParams();
  const router = useRouter();

  const [task, setTask] = useState<any>({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const fetchTask = async () => {
      const res = await API.get(`/tasks/${id}`);
      setTask(res.data);
    };

    fetchTask();
  }, []);

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      await API.put(`/tasks/${id}`, {
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        dueDate: task.dueDate
      });

      router.push("/dashboard");
    } catch (error) {
      console.error("Update failed:", error);
      alert("Update failed, check console");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow-lg" style={{ width: "500px" }}>
        <h4 className="fw-bold mb-3">Update Task</h4>

        <div className="row">
          <div className="col-md-12 mb-3">
            <label className="form-label">Title</label>
            <input
              className="form-control"
              value={task.title || ""}
              onChange={(e) =>
                setTask({ ...task, title: e.target.value })
              }
            />
          </div>

          <div className="col-md-12 mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              rows={3}
              value={task.description || ""}
              onChange={(e) =>
                setTask({ ...task, description: e.target.value })
              }
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Status</label>
            <select
              className="form-control"
              value={task.status || ""}
              onChange={(e) =>
                setTask({ ...task, status: e.target.value })
              }
            >
              <option value="todo">Todo</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Priority</label>
            <select
              className="form-control"
              value={task.priority || ""}
              onChange={(e) =>
                setTask({ ...task, priority: e.target.value })
              }
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="col-md-12 mb-3">
            <label className="form-label">Due Date</label>
            <input
              type="date"
              className="form-control"
              value={task.dueDate ? task.dueDate.slice(0, 10) : ""}
              onChange={(e) =>
                setTask({ ...task, dueDate: e.target.value })
              }
            />
          </div>
        </div>

        <div className="d-flex gap-2">
          <button
            className="btn btn-success w-100"
            onClick={handleUpdate}
          >
            Update Task
          </button>

          <button
            className="btn btn-outline-secondary w-100"
            onClick={() => router.push("/dashboard")}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}