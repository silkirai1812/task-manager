"use client";
import { useEffect, useState } from "react";
import API from "@/services/api";
import Navbar from "@/components/Navbar";

export default function Analytics() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await API.get("/analytics/tasks");
      setData(res.data);
    };

    fetchData();
  }, []);

  const getStatusColor = (status: string) => {
    if (status === "done") return "success";
    if (status === "in-progress") return "primary";
    return "secondary";
  };

  const getPriorityColor = (priority: string) => {
    if (priority === "high") return "danger";
    if (priority === "medium") return "warning";
    return "success";
  };

  return (
    <>
      <Navbar />

      <div className="container py-4">
        <h2 className="text-center mb-4 fw-bold">Analytics</h2>

        {data && (
          <>
            <div className="row text-center mb-4">
              <div className="col-md-4 mb-2">
                <div className="card p-3 shadow-sm">
                  <h6>Total Tasks</h6>
                  <h3>{data.totalTasks}</h3>
                </div>
              </div>

              <div className="col-md-4 mb-2">
                <div className="card p-3 shadow-sm">
                  <h6>Status Types</h6>
                  <h3>{data.statusCounts.length}</h3>
                </div>
              </div>

              <div className="col-md-4 mb-2">
                <div className="card p-3 shadow-sm">
                  <h6>Priority Types</h6>
                  <h3>{data.priorityCounts.length}</h3>
                </div>
              </div>
            </div>

            <div className="card p-3 mb-4 shadow-sm">
              <h5 className="mb-3">Task Status</h5>

              <div className="d-flex gap-3 flex-wrap">
                {data.statusCounts.map((s: any) => (
                  <div key={s._id} className="text-center">
                    <span
                      className={`badge bg-${getStatusColor(
                        s._id
                      )} p-2`}
                    >
                      {s._id}
                    </span>
                    <p className="mt-2 mb-0">{s.count}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="card p-3 shadow-sm">
              <h5 className="mb-3">Task Priority</h5>

              <div className="d-flex gap-3 flex-wrap">
                {data.priorityCounts.map((p: any) => (
                  <div key={p._id} className="text-center">
                    <span
                      className={`badge bg-${getPriorityColor(
                        p._id
                      )} p-2`}
                    >
                      {p._id}
                    </span>
                    <p className="mt-2 mb-0">{p.count}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}