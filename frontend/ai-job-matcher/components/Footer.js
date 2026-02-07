import React from "react";

export default function Footer(){
  return (
    <div  >
<div className="w-[100%] h-45 md:h-65 bg-[#262525] mt-180  md:mt-60 pt-20 flex flex-col">
        <div className="flex flex-row">
       <img
            className=" mt-20 w-[100px] h-[100px] text-left hidden md:block "
            src="https://restan-nextjs.vercel.app/_next/image?url=%2Fassets%2Fimg%2Fshape%2F9.png&w=1920&q=75"
            alt="logo"
          />
          
          <img
            className="md:mt-20  w-[100px] h-[50px] ml-30 pl-10 md:ml-2  "
            src="https://restan-nextjs.vercel.app/_next/image?url=%2Fassets%2Fimg%2Flogo-light.png&w=1920&q=75"
            alt="logo"
          />
          
          </div>
        <div className=" flex flex-row md:flex-col py-20 text-sm md:text-lg  md:py-6 text-right mt-[-80px]
       text-gray-400 dark:text-gray-300 pl-8 md:pr-10  ">
© Copyright 2025. Restan. All Rights Reserved        </div>


        
    </div>

      

      <div className="bg-[#1b1b1b]  text-gray-400  h-170 md:h-70 pt-6 md:mx-35 mt-[-830px] md:mt-[-400px] z-20">
    
      <div className="md:max-w-5xl   md:mx-auto  px-2  sm:px-6 lg:px-8 flex flex-col md:flex-row  md:flex flex-cols-4 md:space-x-4  ">
        <div className="md:border-r border-grey-800 w-100 ">
          <h3 className="text-white text-lg mb-4 ">About Us</h3>
          <p className="text-sm md:w-50 w-90  mb-2">
            Continued at zealously necessary is Surrounded sir motionless she end literature. Gay direction neglected.
          </p>
          <div className="flex space-x-2 p-5 py-2 md:py-5 ">
            <div className="bg-[#3f3f3f] w-[30px] h-[30px] rounded-[20%] flex items-center justify-center text-white font-bold">
              F
            </div>
            <div className="bg-[#3f3f3f] w-[30px] h-[30px] rounded-[20%]  flex items-center justify-center text-white font-bold">
              T
            </div>
            <div className="bg-[#3f3f3f] w-[30px] h-[30px] rounded-[20%] flex items-center justify-center text-white font-bold">
              I
            </div>
            <div className="bg-[#3f3f3f] w-[30px] h-[30px] rounded-[20%] flex items-center justify-center text-white font-bold">
              P
            </div>
          </div>
        </div>

        <div className="space-x-30 pl-2 md:pl-8">
          <h3 className="text-white text-lg  md:mb-4">Explore</h3>
          <ul className="md:space-y-2 text-sm p-1">
            <li>Company Profile</li>
            <li>About</li>
            <li>Help Center</li>
            <li>Career</li>
            <li>Features</li>
            <li>Contact</li>
          </ul>
        </div>

        <div  className="">
          <h3 className="text-white text-lg md:mb-4">Contact Info</h3>
          <div className="flex flex-col space-x-10">
          <div className="flex flex-row text-sm py-3">
            <div className="bg-[#826a45] w-[30px] md:w-[62px] h-[32px]  rounded-[20%] flex items-center justify-center text-white font-bold">
              <img
    src="https://img.icons8.com/?size=100&id=7880&format=png"
    width="15"
    height="8"
    alt="call"
    className=""
    />    
            </div>
            <div className="px-2 h-3 ">
175 10h Street, Office 375 Berlin, De 21562</div></div>
           <div className="flex flex-row text-sm py-3">
            <div className="bg-[#826a45] w-[32px] h-[30px]  rounded-[20%] flex items-center justify-center text-white font-bold">
              <img
    src="https://restan-nextjs.vercel.app/_next/image?url=%2Fassets%2Fimg%2Ficon%2F6.png&w=128&q=75"
    width="15"
    height="8"
    alt="call"
    />    
            </div>
            <div className="px-2 h-3 ">

+123 34598768<br/>
+554 34598734
</div></div>
           <div className="flex flex-row text-sm py-3">
            <div className="bg-[#826a45] w-[32px] h-[30px]  rounded-[20%] flex items-center justify-center text-white font-bold">
              <img
    src="https://restan-nextjs.vercel.app/_next/image?url=%2Fassets%2Fimg%2Ficon%2F7.png&w=128&q=75"
    width="15"
    height="8"
    alt="call"
    />    
            </div>
            <div className="px-2 h-3 ">
food@restan.com
</div></div>
        </div> 
</div>
        <div>
          <h3 className="text-white text-lg mb-2 md:mb-4">Newsletter</h3>
          <p className="text-sm md:mb-3">Join our list for latest news & offers.</p>
          <input
            type="email"
            placeholder="Enter your email"
          />
          <button className="w-[80%] m-4 md:m-6 py-2 bg-amber-700 text-white rounded hover:bg-amber-800">
            Subscribe
          </button>
        </div>
      </div>
      </div>
    </div>
    
    
   
    
  );
};