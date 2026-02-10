"use client";
import React from "react";

type SearchBarProps = {
  onSearchTextChange: (value: string) => void;
  onDomainChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onSearchClick: () => void;
};

export default function SearchBar({
  onSearchTextChange,
  onDomainChange,
  onLocationChange,
  onSearchClick,
}: SearchBarProps) {
  return (
    <div className="w-full max-w-6xl mx-auto bg-white/70 backdrop-blur-md shadow-lg rounded-2xl mt-10 p-4">
      <div className="flex flex-col md:flex-row gap-3 items-center">

        <input
          type="text"
          placeholder="Search jobs..."
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onSearchTextChange(e.target.value)
          }
          className="flex-1 px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <select
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            onDomainChange(e.target.value)
          }
          className="px-4 py-2 rounded-xl border border-gray-300 focus:outline-none"
        >
          <option value="">Select Domain</option>
          <option value="software">Software</option>
          <option value="AI">AI / ML</option>
          <option value="cloud">Cloud</option>
          <option value="Cyber">Cyber Security</option>
          <option value="design">Design</option>
          <option value="mechanical">Mechanical</option>
          <option value="civil">Civil</option>
        </select>

        <select
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            onLocationChange(e.target.value)
          }
          className="px-4 py-2 rounded-xl border border-gray-300 focus:outline-none"
        >
          <option value="">Select Location</option>
          <option value="remote">Remote</option>
          <option value="bangalore">Bangalore</option>
          <option value="hyderabad">Hyderabad</option>
          <option value="delhi">Delhi</option>
          <option value="mumbai">Mumbai</option>
        </select>

        <button
          onClick={onSearchClick}
          className="px-6 py-2 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition"
        >
          Search
        </button>
      </div>
    </div>
  );
}
