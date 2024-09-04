import React, { useState } from "react";
import Data from "./Data";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <div className="bg-lime-400 p-6 rounded-lg shadow-lg max-w-md mx-auto mt-8">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-4">Products Search</h1>
        <input
          className="p-2 border border-gray-300 rounded-lg w-full mb-4"
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search for products..."
        />
        <Data searchQuery={query} />
      </div>
    </div>
  );
}
