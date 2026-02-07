"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function Header() {
  const router = useRouter();
const [open, setOpen] = useState(false);
  return (
    <div className="absolute  top-1 left-0 w-full z-20 flex md:flex-wrap md:flex-col flex-col bg-[#FFFEFC]  text-white font-bold border-b border-gray-300">
      <div className="md:flex md:flex-wrap md:flex-row flex-col  md:w-full  items-center  md:gap-10  md:py-3 py-1 text-white font-bold">
        
          <div
  className="hidden md:block h-[40px] md:w-[230px] ml-30 bg-no-repeat bg-color-white bg-contain border border-[#FFFEFC]"
  style={{
    backgroundImage:
      "url('https://www.remotenomadjobs.com/remotenomadjobs-logo.svg?dpl=dpl_AxdciKwQrZcf2w5vvrEKuAJU2pVm')",
  }}
/>

      
  <button className="md:hover:text-amber-400cursor-pointer hover:bg-gray-200 transition-all text-black hidden md:block ml-280 w-[100px] rounded-lg h-[50px] md:transition-all" onClick={() => router.push("/login")}>
          👤 Login
        </button> 
       
 </div>
        <button
        onClick={() => setOpen(!open)}
        className="absolute right-10 top-[20px] hover:text-amber-400 md:text-4xl text-2xl text-black z-20 transition-all"
      >
        ☰
      </button>
      {open && (
       <div className="text-right align-top">
  <div className="ml-auto mr-0 flex flex-col md:w-[130px] w-[140px] gap-3 py-0 
                  bg-gray-200 dark:bg-gray-700 text-black dark:text-white font-bold">
        
        <button className="md:hover:text-amber-400 md:transition-all" onClick={() => router.push("/home")}>
          Home
        </button>
        
        <button className="hover:text-amber-400  transition-all" onClick={() => router.push("/about")}>
          About Us
        </button>
        <button className="hover:text-amber-400 transition-all" onClick={() => router.push("/chef")}>
          Chef
        </button>
        <button className="hover:text-amber-400 transition-all" onClick={() => router.push("/cart")}>
          Cart
        </button>
        <button className="hover:text-amber-400 transition-all" onClick={() => router.push("/blog")}>
          Blog
        </button>
        <button className="hover:text-amber-400 transition-all" onClick={() => router.push("/menu")}>
          Menu
        </button>
        </div>
      </div>
        

  
  )
}
</div>

)}