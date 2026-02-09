"use client";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function JobsPage() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    async function loadJobs() {
      if (!user) return;

      try {
        const res = await fetch(`http://localhost:5000/users/${user.uid}/jobs`);
        const data = await res.json();
        console.log("Jobs fetched:", data); 
        setJobs(data.jobs || []);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      }
    }

    loadJobs();
  }, [user]);

  return (
    <div className="min-h-screen flex justify-center items-start" style={{ background: "linear-gradient(135deg, #a0b9ff, #d9e2ff)" }}>
      <div className="p-6 w-full max-w-xl">
        <h2 className="font-bold text-2xl mb-4">Recommended Jobs</h2>

        {jobs.length === 0 && <p>No jobs found.</p>}

        {jobs.map((job, i) => (
          <div key={i} className="border p-4 mb-3 rounded shadow-sm bg-white">
            <h3 className="font-semibold text-lg">{job.title}</h3>
            <p className="text-gray-700">{job.company}</p>
            <p className="text-gray-600">{job.location}</p>
            <p className="text-gray-600">{job.salary}</p>
            <p className="mt-2 text-gray-800">{job.matchReason}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
