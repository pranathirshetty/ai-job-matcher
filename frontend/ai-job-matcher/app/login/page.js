"use client";
import { useState } from "react";
import { login, createAccount, logout } from "../core/auth";
import { createProfile } from "../core/profileLogic";
import { sendEmailVerification } from "firebase/auth";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");

  const [loading, setLoading] = useState(false);

async function handleSignUp() {
  setLoading(true);
  try {
    const { user } = await createAccount(email, password);

    await Promise.all([
      sendEmailVerification(user),
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
  } catch (e) {
    alert(e.message);
  }
}


  return (
    <div
          className="min-h-screen w-full bg-[#FFFEFC] flex flex-col bg-white/30  items-center justify-center p-4"
          style={{
            backgroundImage:
              "url('https://static.vecteezy.com/system/resources/previews/010/127/860/non_2x/the-wood-text-job-on-shopping-cart-blue-background-for-business-concept-3d-rendering-photo.jpg')"}} 
    >
 <Header />
     <img
          src="https://www.remotenomadjobs.com/remotenomadjobs-logo.svg?dpl=dpl_AxdciKwQrZcf2w5vvrEKuAJU2pVm"
          className="h-[30px] mt-[90px] hidden md:block ml-0 md:w-[550px]"
        />
        <div className="p-3"></div>
 <div className="bg-white p-6 rounded-4xl border-dashed border-2 border-gray-200 shadow-md w-full max-w-md">

        <div className="text-2xl text-blue-800 font-bold mb-4 text-center animate-pulse">  Sign Up To Continue </div>
         <h2 className="text-sm text-gray-500 font-serif mb-4 text-center ">Enter the email you registered with or<br></br> Create a new account to join our community for free</h2>
        <input type="email" placeholder="Email" className="w-full p-3 mb-3 text-black border rounded" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" className="w-full  p-3 mb-3 text-black border rounded" value={password} onChange={e => setPassword(e.target.value)} />
        <div className="flex gap-4 mb-3">
          <button onClick={handleLogin} disabled={loading} className="bg-blue-600 text-white px-6 w-[150px] py-2 rounded 
                   hover:scale-90 hover:bg-blue-700 transition-transform">{loading ? 'Loading...' : 'Login'}</button>
          <button onClick={handleSignUp} disabled={loading} className="bg-green-600 text-white px-6 w-[150px] py-2 rounded 
                   hover:scale-90 hover:bg-green-700 transition-transform">{loading ? 'Loading...' : 'Sign Up'}</button>

        </div>
        
        <div className="p-3 text-sm text-gray-400 text-center">--------------------- OR ---------------------</div>
        <input type="text" placeholder="Name" className="w-full text-black p-3 mb-3 border rounded" value={name} onChange={e => setName(e.target.value)} />
        <input type="number" placeholder="Age" min="0" max="120" className="w-full text-black p-3 mb-3 border rounded" value={age} onChange={e => setAge(e.target.value)} />
        <input type="tel" placeholder="Phone (10 digits)" pattern="[0-9]{10}" className="w-full text-black p-3 mb-3 border rounded" value={phone} onChange={e => setPhone(e.target.value)} />
        

       <button
onClick={async () => {
          
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

              
const profile = await createProfile({
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
}}
className=" bg-pink-400 text-white px-6 py-2 rounded 
                   hover:scale-90 hover:bg-pink-500 transition-transform"  >
Save Profile
</button>

      </div>
      <Footer/>
    </div>
  );
}