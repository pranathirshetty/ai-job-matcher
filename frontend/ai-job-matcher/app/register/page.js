"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import Header from "@/components/Header";

export default function CreateProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [skills, setSkills] = useState("");
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [years, setYears] = useState("");
  const [jobType, setJobType] = useState("");
  const [preferences, setPreferences] = useState("");
const [experience, setExperience] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [Saving, setSaving] = useState(false);
  const { createRegister } = useAuth();
  if (!user) return <p>Please login first</p>;
  
async function handleSignUp() {
  setSaving(true);
  try {
  if(!name || !skills || !role || !company || !years || !jobType || !location || !salary) {
    throw new Error("Please fill all fields");
  }
  await createRegister({
       name,
       skills: skills.split(",").map(s => s.trim()),
       experience: {
        role,
        company,
        years: Number(years),
      },
      
     preferences: {
        jobType,
        location,
        salary: Number(salary),
      },
    })

    alert("Account created");
    setName(""); setSkills(""); setExperience(""); setPreferences(""); setRole(""); setCompany(""); setYears(""); setJobType(""); setLocation(""); setSalary("");
  } catch (e) {
    alert(e.message);
  } finally {
    setSaving(false);
  } 

}
//
 // const handleSaveProfile = async () => {
 //   setSaving(true);

   // const profile = {
   //   name,
   //   skills: skills.split(",").map(s => s.trim()),
    //  experience: {
     //   role,
     //   company,
     //   years: Number(years),
     // },
     // preferences: {
     //   jobType,
 //       location,
        //salary,
      //},
    //};

  //  try {
 //     const res = await fetch("/login", {
//        method: "POST",
//        headers: { "Content-Type": "application/json" },
//        body: JSON.stringify({
     //     userId: user.uid,
     //     profile,
   //     }),
 //     });

     // if (!res.ok) throw new Error("Failed to save profile");

     // router.push("/dashboard");
    //} catch (err) {
      //alert(err.message);
    //} finally {
     // setSaving(false);
   // }
 // };

  return (
    <div className="min-h-screen md:w-full w-[100%] bg-gradient-to-b dark:bg-black from-white to-blue-100 flex flex-col bg-white/30  items-center justify-center md:p-4 p-5" 
    style={{ backgroundImage: "url('https://strapi.dhiwise.com/uploads/2_Common_Gradient_BG_img_OG_Image_42585cc035.png?w=1200&q=75&auto=format')", backgroundSize: "cover" }}>
      <Header/>
             <div className="p-3"></div>
        <div className="flex flex-row items-center gap-6">
      <div className="dark:bg-black p-6 rounded-4xl border-dashed border-2 border-gray-200 shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold text-center bg-gradient-to-r from-blue-800 to-purple-700 text-white p-2 rounded animate-beats">Create Profile</h2>
        <div className="text-sm text-gray-500 mb-4 text-center mt-2"></div>

        <input placeholder="Name"  className="w-full p-3 mb-3 text-black border rounded dark:bg-gray-800 dark:text-white" 
         onChange={e => setName(e.target.value)} 
         />
        <input placeholder="Skills"  className="w-full p-3 mb-3 text-black border rounded dark:bg-gray-800 dark:text-white" 
         onChange={e => setSkills(e.target.value)} 
         />
        <input placeholder="Role"  className="w-full p-3 mb-3 text-black border rounded dark:bg-gray-800 dark:text-white" 
        onChange={e => setRole(e.target.value)} 
        />
        <input placeholder="Company" className="w-full p-3 mb-3 text-black border rounded dark:bg-gray-800 dark:text-white"
        onChange={e => setCompany(e.target.value)}
         />
        <input type="number" 
        placeholder="Years" className="w-full p-3 mb-3 text-black border rounded dark:bg-gray-800 dark:text-white"
         onChange={e => setYears(e.target.value)} />
        <input placeholder="Job Type"  className="w-full p-3 mb-3 text-black border rounded dark:bg-gray-800 dark:text-white" 
        onChange={e => setJobType(e.target.value)} />
        <input placeholder="Location"  className="w-full p-3 mb-3 text-black border rounded dark:bg-gray-800 dark:text-white" 
        onChange={e => setLocation(e.target.value)} />
        <input placeholder="Salary Range"  className="w-full p-3 mb-3 text-black border rounded dark:bg-gray-800 dark:text-white" 
        onChange={e => setSalary(e.target.value)} />

        <button
          onClick={handleSignUp}
          disabled={Saving}
          className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 w-[150px] py-2 rounded 
                   hover:scale-90 hover:bg-blue-700 transition-transform justify-center flex mx-auto"
        >
          {Saving ? "Creating Account..." : "Create Account"}
        </button>
      </div>
      </div>
    </div>
  );
}
