"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

export default function CreateProfilePage() {
  const { user, loading, createRegister } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [skills, setSkills] = useState("");
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [years, setYears] = useState("");
  const [domain, setDomain] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [saving, setSaving] = useState(false);

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>Please login</p>;

  async function handleSignUp() {
    setSaving(true);

    try {
      await createRegister({
        name,
        skills: skills.split(",").map((s) => s.trim()),
        experience: {
          role,
          company,
          years: Number(years),
        },
        preferences: {
          domain,
          location,
          salary: Number(salary),
        },
      });

      router.push("/jobs");
    } catch (e) {
      if (e instanceof Error) {
        alert(e.message);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } finally {
      setSaving(false);
    }
  }

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-slate-50 p-6"
      style={{
        backgroundImage:
          "url('https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3JtMzA5LWFkai0wOS14LmpwZw.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="relative w-full max-w-6xl group">
        <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-blue-600 rounded-[3rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>

        <div className="relative flex flex-col md:flex-row w-full min-h-[800px] bg-white/80 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/50">
          {/* LEFT PANEL */}
          <div className="md:w-1/3 bg-[#185D72] text-white p-12 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <h1 className="text-3xl font-black tracking-tighter mb-8">
                JobFinder
              </h1>

              <h2 className="text-4xl font-bold leading-tight mb-6">
                Step into your <br />
                <span className="text-teal-300">new career.</span>
              </h2>

              <p className="text-teal-50/80 leading-relaxed text-lg font-medium">
                Our AI analyzes your unique expertise to pinpoint roles that
                match your lifestyle.
              </p>
            </div>

            <div className="relative z-10">
              <div className="h-[2px] w-12 bg-teal-400 mb-4"></div>
              <p className="uppercase text-[15px] font-black text-teal-200/50">
                Phase 01: Profile Architecture
              </p>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="flex-1 p-8 md:p-14 bg-white/40">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center gap-4 mb-4">
                  <img
                    src="/robot.png"
                    alt="AI"
                    className="w-12 h-12 object-contain animate-pulse"
                  />
                  <h2 className="text-3xl font-black text-[#185D72] tracking-tight">
                    Smart-AI Finder
                  </h2>
                </div>
                <p className="text-slate-500 font-medium italic">
                  “Your AI-powered shortcut to the perfect job.”
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                {[
                  { placeholder: "Name", setter: setName, type: "text" },
                  { placeholder: "Skills", setter: setSkills, type: "text" },
                  { placeholder: "Role", setter: setRole, type: "text" },
                  { placeholder: "Company", setter: setCompany, type: "text" },
                  {
                    placeholder: "Years of Experience",
                    setter: setYears,
                    type: "number",
                  },
                  { placeholder: "Domain", setter: setDomain, type: "text" },
                  { placeholder: "Location", setter: setLocation, type: "text" },
                  {
                    placeholder: "Expected Salary",
                    setter: setSalary,
                    type: "text",
                  },
                ].map((input, idx) => (
                  <input
                    key={idx}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={(e) => input.setter(e.target.value)}
                    className="w-full bg-white/60 border-2 border-slate-100 p-4 rounded-2xl outline-none focus:border-teal-500/50 focus:bg-white transition-all duration-300 placeholder:text-slate-400 font-medium shadow-sm"
                  />
                ))}
              </div>

              <button
                disabled={saving}
                onClick={handleSignUp}
                className="group relative w-full overflow-hidden rounded-2xl bg-[#185D72] p-5 font-black text-white shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity"></div>
                <span className="relative flex items-center justify-center gap-2 tracking-widest uppercase text-xs">
                  {saving ? (
                    <>
                      <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Encrypting Data...
                    </>
                  ) : (
                    "Initialize AI Profile"
                  )}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
