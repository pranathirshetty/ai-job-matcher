"use client";
import { useState } from "react";
import { login, createAccount, logout } from "../core/auth";
import { createProfile } from "../core/profileLogic";
import { useRouter } from "next/navigation";
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
  const [checked, setChecked] = useState(false);
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
     <div className="min-h-screen w-full flex flex-row items-center justify-center bg-gradient-to-b dark:bg-black from-white to-blue-100 p-5" style={{ backgroundImage: "url('https://img.freepik.com/premium-photo/light-romantic-blue-abstract-creative-background-design_851755-200790.jpg')", backgroundSize: "cover" }}>

    <div className="dark:bg-black p-6 rounded-4xl border-dashed border-3 border-gray-300 shadow-md w-full max-w-6xl">
      <div className="flex md:flex-row flex-col items-left">
   <div className='w-full md:w p-4'>
   <div className ="flex gap-1">
    <div className="w-[120px] h-[120px] bg-cover bg-center" style={{ backgroundImage: "url('robot.png')"}}>
</div> 
<div className="text-3xl dark:text-blue-300 text-[#185D72]  mt-10 font-bold  justify-center text-center">
        Job<span className="text-blue-500">Finder</span>
      </div>
     
  </div>
 <div className="p-3"></div>
   
      <div className="text-2xl dark:text-blue-300 text-[#185D72] font-bold mb-4 justify-center text-center">
        Sign Up <span className="text-blue-500">To</span> Continue
      </div>
      <input type="email"
        placeholder="Email"
        className="w-[95%]  p-3 mb-3 border rounded-full  border-2 border-gray-300 dark:bg-gray-800 dark:text-white"
        value={email}
        onChange={e => setEmail(e.target.value)}/>
      <input  type="password"
        placeholder="Password"
        className="w-[95%] p-3 mb-3 border rounded-full border-2 border-gray-300 dark:bg-gray-800 dark:text-white"
        value={password}
        onChange={e => setPassword(e.target.value)}/>
          <label className="flex items-center gap-4 font-serif p-5 font-1xl">
      <input
        type="checkbox"
        checked={checked}
        onChange={() => setChecked(!checked)}
        className="form-checkbox h-5 w-5 text-blue-600"
      />
      I agree with the<span className="text-blue-700">Terms and Conditions</span>
    </label>
      <div className="flex gap-4 justify-center">
        <button onClick={handleLogin}
          disabled={loading}
          className="bg-blue-500 justify-center text-center text-white px-9 py-2 rounded-full hover:scale-90 hover:bg-blue-700 transition"> Login
        </button>
        <button onClick={handleSignUp}
          disabled={loading}
          className="bg-green-500 text-white justify-center text-center px-9 py-2 rounded-full hover:scale-90 hover:bg-green-700 transition">
          Sign Up
        </button>

      </div>
    </div>
   

  <div className="hidden md:flex w-1/2  items-center justify-center">
    <div
      className="w-[600px] h-[600px] bg-cover bg-center  animate-pulse"
      style={{
        backgroundImage: "url('workspace.png')",
      }}
    /> </div>
    </div>
</div>
  </div>

  );
}