"use client";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  return (
    <header className="w-full absolute top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between text-black">
        <h1
          onClick={() => router.push("/")}
          className="text-2xl font-bold tracking-wide cursor-pointer"
        >
          JobFinder
        </h1>

        <div className="hidden md:flex gap-6 text-sm font-medium">
          <span
            onClick={() => router.push("/")}
            className="cursor-pointer hover:opacity-80"
          >
            Home
          </span>

          <span
            onClick={() => router.push("/jobs")}
            className="cursor-pointer hover:opacity-80"
          >
            Jobs
          </span>

          <span
            onClick={() => router.push("/register")}
            className="cursor-pointer hover:opacity-80"
          >
            Profile
          </span>
        </div>
      </div>
    </header>
  );
}
