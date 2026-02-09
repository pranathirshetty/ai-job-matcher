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
        skills: skills.split(",").map(s => s.trim()),
        experience: { role, company, years: Number(years) },
        preferences: { domain, location, salary: Number(salary) },
      });

      router.push("/jobs");
    } catch (e) {
      alert(e.message);
    } finally {
      setSaving(false);
    }
  }

  return (
       <div className="min-h-screen w-full flex flex-row items-center justify-center bg-gradient-to-b dark:bg-black from-white to-blue-100 p-5" style={{ backgroundImage: "url('https://img.freepik.com/premium-photo/light-romantic-blue-abstract-creative-background-design_851755-200790.jpg')", backgroundSize: "cover" }}>

      <div className="dark:bg-black p-6 rounded-4xl border-dashed border-3 border-gray-300 shadow-md w-full max-w-6xl">
        <div className="flex md:flex-row flex-col items-left">
     <div className='w-full md:w p-4'>
     <div className ="flex gap-1 md:ml-[350px] ml-[5px]">
      <div className="md:w-[120px] w-[20px] md:h-[120px] h-[20px] bg-cover bg-center" style={{ backgroundImage: "url('robot.png')"}}>
  </div> 
  <div className="text-3xl dark:text-blue-300 text-[#185D72]  mt-10 font-bold  justify-center text-center">
          Job<span className="text-blue-500">Finder</span>
        </div>
     </div>
        <h2 className="font-bold text-center mb-4">Create Profile</h2>
        <div className="flex flex-col gap-3">
        <input placeholder="Name" 
         className="w-[95%]  p-3 mb-3 border rounded-full  border-2 border-gray-300 dark:bg-gray-800 dark:text-white"
          onChange={e => setName(e.target.value)} />
        <input placeholder="Skills"
           className="w-[95%]  p-3 mb-3 border rounded-full  border-2 border-gray-300 dark:bg-gray-800 dark:text-white"
          onChange={e => setSkills(e.target.value)} />
        <input placeholder="Role"    className="w-[95%]  p-3 mb-3 border rounded-full  border-2 border-gray-300 dark:bg-gray-800 dark:text-white"
         onChange={e => setRole(e.target.value)} />
        <input placeholder="Company" 
           className="w-[95%]  p-3 mb-3 border rounded-full  border-2 border-gray-300 dark:bg-gray-800 dark:text-white"
        onChange={e => setCompany(e.target.value)} />
        <input type="number" placeholder="Years"
           className="w-[95%]  p-3 mb-3 border rounded-full  border-2 border-gray-300 dark:bg-gray-800 dark:text-white"
          onChange={e => setYears(e.target.value)} />
        <input placeholder="Domain"
           className="w-[95%]  p-3 mb-3 border rounded-full  border-2 border-gray-300 dark:bg-gray-800 dark:text-white"
          onChange={e => setDomain(e.target.value)} />
        <input placeholder="Location" 
           className="w-[95%]  p-3 mb-3 border rounded-full  border-2 border-gray-300 dark:bg-gray-800 dark:text-white"
         onChange={e => setLocation(e.target.value)} />
        <input placeholder="Salary"
           className="w-[95%]  p-3 mb-3 border rounded-full  border-2 border-gray-300 dark:bg-gray-800 dark:text-white"
          onChange={e => setSalary(e.target.value)} />

        <button disabled={saving} onClick={handleSignUp}>
          {saving ? "Saving..." : "Create Profile"}
        </button>
      </div>
      </div>
      </div>
      </div>
    </div>
  );
}
