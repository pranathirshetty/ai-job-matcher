"use client";
import { useState } from "react";
import { login, createAccount, logout } from "../core/auth";
import { createProfile } from "../core/profileLogic";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import { useAuth } from "../context/AuthContext";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const {login}=useAuth();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
async function handleSignUp() {
  setLoading(true);
  try {
    const { user } = await createAccount(email, password);
    await Promise.all([,
      createProfile({
        uid: user.uid,
        email: user.email,
        name,
        age: age && Number(age),
        phone,
        createdAt: new Date().toISOString(),
      }),
    ]);

    alert("Account created");
    setEmail(""); setPassword(""); setName(""); setAge(""); setPhone("");
  } catch (e) {
    alert(e.message);
  } finally {
    setLoading(false);
  } 

}
async function handleLogin() {
  try {
    await login(email, password);
    alert("Logged in");
    router.push("/register");
  } catch (e) {
    alert(e.message);
  }
}
  return (
    <div className="min-h-screen md:w-full w-[100%] bg-gradient-to-b dark:bg-black from-white to-blue-100 flex flex-col bg-white/30  items-center justify-center md:p-4 p-5" >
 <Header />
     <img
          src="https://www.remotenomadjobs.com/remotenomadjobs-logo.svg?dpl=dpl_AxdciKwQrZcf2w5vvrEKuAJU2pVm"
          className="h-[30px] mt-[90px] hidden md:block ml-0 md:w-[550px]"
        />
        <div className="p-3"></div>
        <div className="flex flex-row items-center gap-6">
 <div className="dark:bg-black p-6 rounded-4xl border-dashed border-2 border-gray-200 shadow-md w-full max-w-md">

        <div className="text-2xl dark:text-blue-300 text-blue-800 font-bold mb-4 text-center animate-pulse">  Sign Up <span className="dark:text-blue-200  text-blue-500">To</span> Continue </div>
         <h2 className="text-sm dark:text-gray-300 text-gray-500 font-serif mb-4 text-center ">Enter the email you registered with or<br></br> Create a new account to join our community for free</h2>
        <input type="email" placeholder="Email" className="w-full p-3 mb-3 text-black border rounded dark:bg-gray-800 dark:text-white" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" className="w-full  p-3 mb-3 text-black border rounded dark:bg-gray-800 dark:text-white" value={password} onChange={e => setPassword(e.target.value)} />
        <div className="flex gap-4 mb-3">
          <button onClick={handleLogin} disabled={loading} className="bg-blue-600 text-white px-6 w-[150px] py-2 rounded 
                   hover:scale-90 hover:bg-blue-700 transition-transform">{loading ? 'Loading...' : 'Login'}</button>
              <button onClick={handleSignUp} disabled={loading} className="bg-green-600 text-white px-6 w-[150px] py-2 rounded 
                   hover:scale-90 hover:bg-green-700 transition-transform">{loading ? 'Loading...' : 'Sign Up'}</button>

        </div>
        
        <div className="p-3 text-sm text-gray-400 text-center">--------------------- OR ---------------------</div>
        <input type="text" placeholder="Name" className="w-full text-black p-3 mb-3 border rounded dark:bg-gray-800 dark:text-white" value={name} onChange={e => setName(e.target.value)} />
        <input type="number" placeholder="Age" min="0" max="120" className="w-full text-black p-3 mb-3 border rounded dark:bg-gray-800 dark:text-white" value={age} onChange={e => setAge(e.target.value)} />
        <input type="tel" placeholder="Phone (10 digits)" pattern="[0-9]{10}" className="w-full text-black p-3 mb-3 border rounded dark:bg-gray-800 dark:text-white" value={phone} onChange={e => setPhone(e.target.value)} />
        

       <button className="bg-pink-400 text-white px-6 py-2 rounded hover:scale-90 hover:bg-pink-500 transition-transform" onClick={async () => {
          
try {
              
if (!name || !age || !phone) {
throw new Error("Please fill in all fields");
}
if (phone.length !== 10) {
throw new Error("Phone number must be exactly 10 digits");
}
const ageNum = parseInt(age);
if ( ageNum < 0 || ageNum > 120) {
throw new Error("Age must be between 0 and 120");
}

              
await createProfile({
  name,
  age: ageNum,
  phone,
  createdAt: new Date().toISOString()
 });
alert("Profile saved successfully!");
              
setName("");
setAge("");
setPhone("");
} catch (err) {
console.error("Profile submission failed:", err);
alert("Error saving profile: " + (err.message || err));
}
}
}
>
Save Profile
</button>

      </div>
     
      </div>
    </div>
  );
}