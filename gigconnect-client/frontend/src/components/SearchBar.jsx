import React, { useState } from "react";
import { Search } from "lucide-react"; 
import { useNavigate, useLocation } from "react-router-dom";

/**
 * SearchBar component
 * - Has internal state for input and category.
 * - When used in Home/Gigs, it can accept onSearch props. But to keep it simple and usable from Navbar:
 *   we navigate to /gigs with query params ?q=...&cat=...
 */

const SearchBar = () => {
  const [query, setQuery] = useState("");

  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search gigs..."
        className="w-full px-4 py-2 rounded-full bg-gray-800 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
        <Search className="w-5 h-5" />
      </button>
    </div>
  );
};

export default SearchBar;