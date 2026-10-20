
import { useState } from "react";
import { Search, MapPin } from "lucide-react";

function SearchBar({ onSearch }) {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    onSearch({
      keyword: keyword.trim(),
      location: location.trim(),
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex max-w-3xl flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-lg md:flex-row md:items-center"
    >
      <div className="flex flex-1 items-center gap-3 rounded-lg px-3 py-2">
        <Search className="h-5 w-5 shrink-0 text-indigo-600" />

        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Job title or skill"
          className="w-full outline-none"
        />
      </div>

      <div className="flex flex-1 items-center gap-3 rounded-lg px-3 py-2">
        <MapPin className="h-5 w-5 shrink-0 text-indigo-600" />

        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="City or location"
          className="w-full outline-none"
        />
      </div>

      <button
        type="submit"
        className="flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700"
      >
        <Search size={18} />
        Search Jobs
      </button>
    </form>
  );
}

export default SearchBar;
