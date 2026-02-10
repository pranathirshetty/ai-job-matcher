"use client";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
export default function JobsPage() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
 const router = useRouter();
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
    <div className="min-h-screen w-full flex flex-col items-center py-16 px-4 selection:bg-indigo-100"  style={{ backgroundImage: "url('https://img.freepik.com/premium-photo/soft-gradient-light-blue-background_1000823-157650.jpg')", backgroundSize: "cover", backgroundAttachment: "fixed", backgroundPosition: "center"}}>
       <div className="w-full max-w-3xl">
        <div className="relative mb-14 group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative  bg-white/40 p-10 rounded-3xl border border-white/60 shadow-2xl">
            <h2 className="font-black text-5xl text-transparent bg-clip-text bg-gradient-to-r from-[#1F5669] to-indigo-600  leading-tight" >
              Recommended <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-indigo-600">Jobs</span>
            </h2>
            <p className="text-slate-800 mt-4 text-lg font-medium opacity-80">
              We've analyzed your profile to find these {jobs.length} premium matches.
            </p>
          </div>
        </div>
        {jobs.length === 0 && (
          <div className="bg-white/30 backdrop-blur-md p-16 text-center rounded-[2rem] border border-white/40 shadow-inner">
            <div className="text-5xl mb-4 animate-bounce">📁</div>
            <p className="text-[#1F5669] font-bold text-xl uppercase tracking-widest">No Matches Yet</p>
          </div>
        )}

        <div className="flex flex-col gap-8">
          {jobs.map((job, i) => (
            <div key={i} className="group relative bg-white/60 backdrop-blur-md border border-white/80 p-1 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(31,86,105,0.15)] transition-all duration-500 hover:-translate-y-2" >
 <div className="bg-white/90 p-8 rounded-[2.3rem] border-2 border-dashed border-slate-300">   
 <div className="flex flex-col md:flex-row justify-between items-start gap-6">
  <div className="flex gap-6">
 <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-[#1F5669] to-blue-500 flex items-center justify-center text-white font-black text-2xl shadow-lg ring-4 ring-white"> {job.company?.[0] || "J"}
   </div>
      <div>
        <h3 className="font-extrabold text-2xl tracking-tight group-hover:text-blue-600 transition-colors duration-300" style={{ color: "#1F5669" }}>
              {job.title}
       </h3>
      <div className="flex flex-wrap items-center gap-4 mt-2">
      <span className="text-indigo-600 font-bold text-sm tracking-wide">@{job.company}</span>
      <span className="px-3 py-1 bg-slate-100 rounded-full text-slate-500 text-[11px] font-bold uppercase">📍 {job.location}</span>
     </div>
   </div>
 </div>
   <div className="bg-[#1F5669]/5 border border-[#1F5669]/10 px-5 py-3 rounded-2xl flex flex-col items-end">
  <span className="text-[10px] font-black uppercase text-[#1F5669]/40 tracking-widest mb-1">Annual Package</span>  <p className="text-[#1F5669] font-black text-xl leading-none">{job.salary}</p> </div>
    </div>  {job.matchReason && ( <div className="mt-8 relative">
  <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-blue-500 to-transparent opacity-30 rounded-full"></div>
    <div className="pl-6">
   <div className="flex items-center gap-2 mb-2">
  <span className="text-blue-400 text-xs">●</span>
    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Match Logic</span>
  </div> <p className="text-slate-600 text-sm leading-relaxed font-medium italic">
  "{job.matchReason}" </p>
  </div>
    </div> )}
  <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
  <div className="flex -space-x-2">
 {[1, 2, 3].map((u) => (
 <div key={u} className="h-7 w-7 rounded-full border-2 border-white bg-slate-200 overflow-hidden shadow-sm">
    <img src={`https://i.pravatar.cc/100?img=${u + 10}`} alt="user" />
    </div>  ))}
  <span className="pl-4 text-[11px] text-slate-400 font-bold self-center">12 others applied</span>  </div>
  <div className="flex gap-4">
   <button className="px-5 py-2.5 text-slate-400 font-bold text-xs uppercase tracking-widest hover:text-[#1F5669] transition-colors" >
      Save
  </button>
 <button className="px-8 py-3 bg-[#1F5669] text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-[0_10px_20px_rgba(31,86,105,0.2)] hover:bg-blue-700 hover:shadow-blue-500/30 transition-all active:scale-95" onClick={(event)=>router.push("/smart")}>
   Apply Now
    </button>
  </div>
 </div>
</div>
 </div>
 ))}
</div>
  </div>
  </div>
  );
}