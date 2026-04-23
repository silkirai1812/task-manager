// "use client";
// import { useEffect, useState } from "react";
// import API from "@/services/api";
// import Navbar from "@/components/Navbar";
// import { useRouter } from "next/navigation";

// export default function Dashboard() {
//   const router = useRouter();

//   const [tasks, setTasks] = useState<any[]>([]);
//   const [analytics, setAnalytics] = useState<any>(null);

//   const [message, setMessage] = useState(""); 

//   const [task, setTask] = useState({
//     title: "",
//     description: "",
//     status: "todo",
//     priority: "low",
//     dueDate: ""
//   });

//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       router.push("/login");
//       return;
//     }

//     API.defaults.headers.common["Authorization"] = `Bearer ${token}`;

//     fetchTasks();
//     fetchAnalytics();
//   }, []);

//   const showMessage = (msg: string) => {
//     setMessage(msg);
//     setTimeout(() => setMessage(""), 3000);
//   };

//   const fetchTasks = async () => {
//     try {
//       const res = await API.get("/tasks");
//       setTasks(res.data);
//     } catch {
//       showMessage("Error fetching tasks");
//     }
//   };

//   const fetchAnalytics = async () => {
//     try {
//       const res = await API.get("/analytics/tasks");
//       setAnalytics(res.data);
//     } catch {
//       console.log("Analytics error");
//     }
//   };

//   const createTask = async () => {
//     try {
//       await API.post("/tasks", task);

//       setTask({
//         title: "",
//         description: "",
//         status: "todo",
//         priority: "low",
//         dueDate: ""
//       });

//       showMessage("Task added successfully"); 

//       fetchTasks();
//       fetchAnalytics();
//     } catch {
//       showMessage("Error creating task");
//     }
//   };

//   const deleteTask = async (id: string) => {
//     await API.delete(`/tasks/${id}`);
//     showMessage("Task deleted ");
//     fetchTasks();
//     fetchAnalytics();
//   };

//   const markDone = async (id: string) => {
//     await API.put(`/tasks/${id}`, { status: "done" });
//     showMessage("Task marked as done");
//     fetchTasks();
//     fetchAnalytics();
//   };

//   return (
//     <>
//       <Navbar />

//       <div className="container py-4">
//         <h2 className="text-center mb-4 fw-bold">Dashboard</h2>

//         {message && (
//           <div className="alert alert-info text-center py-2">
//             {message}
//           </div>
//         )}
//         {analytics && (
//           <div className="row mb-4 text-center">
//             <div className="col-4 mb-2">
//               <div className="card p-3 shadow-sm">
//                 <small className="text-muted">Total Tasks</small>
//                 <h3 className="fw-bold">{analytics.totalTasks}</h3>
//               </div>
//             </div>

//             <div className="col-4 mb-2">
//               <div className="card p-3 shadow-sm">
//                 <small className="text-muted">Completed</small>
//                 <h3 className="fw-bold text-success">
//                   {tasks.filter(t => t.status === "done").length}
//                 </h3>
//               </div>
//             </div>

//             <div className="col-4 mb-2">
//               <div className="card p-3 shadow-sm">
//                 <small className="text-muted">Pending</small>
//                 <h3 className="fw-bold text-danger">
//                   {tasks.filter(t => t.status !== "done").length}
//                 </h3>
//               </div>
//             </div>
//           </div>
//         )}
//         <div className="card p-4 mb-4 shadow-sm">
//           <h5 className="fw-semibold mb-3">Create Task</h5>

//           <div className="row g-2">
//             <div className="col-md-6">
//               <input
//                 className="form-control"
//                 placeholder="Task Title"
//                 value={task.title}
//                 onChange={(e) =>
//                   setTask({ ...task, title: e.target.value })
//                 }
//               />
//             </div>

//             <div className="col-md-6">
//               <input
//                 type="date"
//                 className="form-control"
//                 value={task.dueDate}
//                 onChange={(e) =>
//                   setTask({ ...task, dueDate: e.target.value })
//                 }
//               />
//             </div>

//             <div className="col-md-12">
//               <textarea
//                 className="form-control"
//                 placeholder="Task Description"
//                 rows={2}
//                 value={task.description}
//                 onChange={(e) =>
//                   setTask({ ...task, description: e.target.value })
//                 }
//               />
//             </div>

//             <div className="col-md-6">
//               <select
//                 className="form-control"
//                 value={task.status}
//                 onChange={(e) =>
//                   setTask({ ...task, status: e.target.value })
//                 }
//               >
//                 <option value="todo">Todo</option>
//                 <option value="in-progress">In Progress</option>
//                 <option value="done">Done</option>
//               </select>
//             </div>

//             <div className="col-md-6">
//               <select
//                 className="form-control"
//                 value={task.priority}
//                 onChange={(e) =>
//                   setTask({ ...task, priority: e.target.value })
//                 }
//               >
//                 <option value="low">Low Priority</option>
//                 <option value="medium">Medium Priority</option>
//                 <option value="high">High Priority</option>
//               </select>
//             </div>
//           </div>

//           <button
//             className="btn btn-primary w-100 mt-3"
//             onClick={createTask}
//           >
//             + Add Task
//           </button>
//         </div>
//         {tasks.length === 0 && (
//           <p className="text-center text-muted">No tasks yet</p>
//         )}
//         <div className="row">
//           {tasks.map((t) => (
//             <div className="col-md-6 col-lg-4 mb-3" key={t._id}>
//               <div className="card p-3 h-100 shadow-sm">

//                 <div className="d-flex justify-content-between">
//                   <h6 className="fw-semibold">{t.title}</h6>

//                   <span className={`badge ${
//                     t.status === "done"
//                       ? "bg-success"
//                       : t.status === "in-progress"
//                       ? "bg-primary"
//                       : "bg-secondary"
//                   }`}>
//                     {t.status}
//                   </span>
//                 </div>

//                 <p className="text-muted small mt-2">
//                   {t.description}
//                 </p>

//                 {/* ai summary */}
//                 {t.summary && (
//                   <p className="text-muted small fst-italic">
//                     <span className="text-decoration-underline">AI summary:</span> {t.summary}
//                   </p>
//                 )}

//                 <div className="d-flex justify-content-between flex-wrap mt-2">
//                   <span className={`badge ${
//                     t.priority === "high"
//                       ? "bg-danger"
//                       : t.priority === "medium"
//                       ? "bg-warning"
//                       : "bg-success"
//                   }`}>
//                     {t.priority}
//                   </span>

//                   {t.dueDate && (
//                     <small className="text-muted">
//                       Due: {t.dueDate.slice(0, 10)}
//                     </small>
//                   )}
//                 </div>

//                 <div className="mt-auto d-flex gap-2 justify-content-end">
//                   <button
//                     className="btn btn-sm btn-success"
//                     onClick={() => markDone(t._id)}
//                   >
//                     Done
//                   </button>

//                   <button
//                     className="btn btn-sm btn-outline-primary"
//                     onClick={() =>
//                       router.push(`/update/${t._id}`)
//                     }
//                   >
//                     Edit
//                   </button>

//                   <button
//                     className="btn btn-sm btn-outline-danger"
//                     onClick={() => deleteTask(t._id)}
//                   >
//                     Delete
//                   </button>
//                 </div>

//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }

"use client";
import { useEffect, useState } from "react";
import API from "@/services/api";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  const [tasks, setTasks] = useState<any[]>([]);
  const [analytics, setAnalytics] = useState<any>(null);
  const [message, setMessage] = useState("");

  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "todo",
    priority: "low",
    dueDate: ""
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    fetchTasks();
    fetchAnalytics();
  }, []);

  const showMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 3000);
  };

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch {
      showMessage("Error fetching tasks");
    }
  };

  const fetchAnalytics = async () => {
    try {
      const res = await API.get("/analytics/tasks");
      setAnalytics(res.data);
    } catch {
      console.log("Analytics error");
    }
  };

  const createTask = async () => {
    try {
      const res =await API.post("/tasks", task);
      console.log("CREATE RESPONSE:", res.data);
      setTask({
        title: "",
        description: "",
        status: "todo",
        // priority: "low",
        priority: "",
        dueDate: ""
      });

      showMessage("Task added successfully");
      fetchTasks();
      fetchAnalytics();
    } catch {
      showMessage("Error creating task");
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await API.delete(`/tasks/${id}`);
      showMessage("Task deleted");
      fetchTasks();
      fetchAnalytics();
    } catch {
      showMessage("Error deleting task");
    }
  };

  const markDone = async (id: string) => {
    try {
      await API.put(`/tasks/${id}`, { status: "done" });
      showMessage("Task marked as done");
      fetchTasks();
      fetchAnalytics();
    } catch {
      showMessage("Error updating task");
    }
  };

  return (
    <>
      <Navbar />

      <div className="container py-4">
        <h2 className="text-center mb-4 fw-bold">Dashboard</h2>

        {message && (
          <div className="alert alert-info text-center py-2">
            {message}
          </div>
        )}

        {analytics && (
          <div className="row mb-4 text-center">
            <div className="col-4 mb-2">
              <div className="card p-3 shadow-sm">
                <small className="text-muted">Total Tasks</small>
                <h3 className="fw-bold">{analytics.totalTasks}</h3>
              </div>
            </div>

            <div className="col-4 mb-2">
              <div className="card p-3 shadow-sm">
                <small className="text-muted">Completed</small>
                <h3 className="fw-bold text-success">
                  {tasks.filter(t => t.status === "done").length}
                </h3>
              </div>
            </div>

            <div className="col-4 mb-2">
              <div className="card p-3 shadow-sm">
                <small className="text-muted">Pending</small>
                <h3 className="fw-bold text-danger">
                  {tasks.filter(t => t.status !== "done").length}
                </h3>
              </div>
            </div>
          </div>
        )}

        <div className="card p-4 mb-4 shadow-sm">
          <h5 className="fw-semibold mb-3">Create Task</h5>

          <div className="row g-2">
            <div className="col-md-6">
              <input
                className="form-control"
                placeholder="Task Title"
                value={task.title}
                onChange={(e) =>
                  setTask({ ...task, title: e.target.value })
                }
              />
            </div>

            <div className="col-md-6">
              <input
                type="date"
                className="form-control"
                value={task.dueDate}
                onChange={(e) =>
                  setTask({ ...task, dueDate: e.target.value })
                }
              />
            </div>

            <div className="col-md-12">
              <textarea
                className="form-control"
                placeholder="Task Description"
                rows={2}
                value={task.description}
                onChange={(e) =>
                  setTask({ ...task, description: e.target.value })
                }
              />
            </div>

            <div className="col-md-6">
              <select
                className="form-control"
                value={task.status}
                onChange={(e) =>
                  setTask({ ...task, status: e.target.value })
                }
              >
                <option value="todo">Todo</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>

            <div className="col-md-6">
              <select
                className="form-control"
                value={task.priority}
                onChange={(e) =>
                  setTask({ ...task, priority: e.target.value })
                }
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
            </div>
          </div>

          <button
            className="btn btn-primary w-100 mt-3"
            onClick={createTask}
          >
            + Add Task
          </button>
        </div>

        {tasks.length === 0 && (
          <p className="text-center text-muted">No tasks yet</p>
        )}

        <div className="row">
          {tasks.map((t) => (
            <div className="col-md-6 col-lg-4 mb-3" key={t._id}>
              <div className="card p-3 h-100 shadow-sm">

                <div className="d-flex justify-content-between">
                  <h6 className="fw-semibold">{t.title}</h6>

                  <span className={`badge ${
                    t.status === "done"
                      ? "bg-success"
                      : t.status === "in-progress"
                      ? "bg-primary"
                      : "bg-secondary"
                  }`}>
                    {t.status}
                  </span>
                </div>

                <p className="text-muted small mt-2">
                  {t.description}
                </p>

                {t.summary && (
                  <p className="text-muted small fst-italic">
                    <span className="text-decoration-underline">AI summary:</span> {t.summary}
                  </p>
                )}

                <div className="d-flex justify-content-between flex-wrap mt-2">
                  <span className={`badge ${
                    t.priority === "high"
                      ? "bg-danger"
                      : t.priority === "medium"
                      ? "bg-warning"
                      : "bg-success"
                  }`}>
                    {t.priority}
                  </span>

                  {t.dueDate && (
                    <small className="text-muted">
                      Due: {t.dueDate.slice(0, 10)}
                    </small>
                  )}
                </div>

                <div className="mt-auto d-flex gap-2 justify-content-end">
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() => markDone(t._id)}
                  >
                    Done
                  </button>

                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => router.push(`/update/${t._id}`)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => deleteTask(t._id)}
                  >
                    Delete
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}