import axios from "axios";
import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import JobCard from "../components/JobCard";

const sampleJobs = [
  {
    id: 1,
    title: "Frontend Developer Intern",
    company: "TechNova",
    location: "Remote",
    type: "Internship",
    salary: "₹10,000/month",
    url: "https://www.linkedin.com/jobs/",
  },
  {
    id: 2,
    title: "React Developer Intern",
    company: "WebSphere",
    location: "Noida, India",
    type: "Internship",
    salary: "₹12,000/month",
    url: "https://www.linkedin.com/jobs/",
  },
  {
    id: 3,
    title: "Junior UI Developer",
    company: "PixelWorks",
    location: "Bengaluru, India",
    type: "Full-time",
    salary: "",
    url: "https://www.linkedin.com/jobs/",
  },
];

function Home({ savedJobs, onSave, onApply }) {

  const [searchData, setSearchData] = useState({
    keyword: "",
    location: "",
    type: "",
  });

  const [sortBy, setSortBy] = useState("");


  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(
          "https://www.arbeitnow.com/api/job-board-api"
        );

        const formattedJobs = (response.data.data || []).map((job) => ({
          id: job.slug || job.url,
          title: job.title,
          company: job.company_name,
          location: job.location || "Location not specified",
          type: job.job_types?.[0] || (job.remote ? "Remote" : "Full-time"),
          salary: job.salary || "Not specified",
          url: job.url,
        }));

        setJobs(formattedJobs);
      } catch (err) {
        console.error("API Error:", err);
        setError("Jobs load nahi ho paayi. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  function handleSearch(data) {
    setSearchData({
      keyword: "",
      location: "",
      type: "",
    });

  }

  function handleClearFilters() {
    setSearchData({
      keyword: "",
      location: "",
      type: "",
    });
  }



  const filteredJobs = jobs.filter((job) => {
    const matchesKeyword =
      job.title.toLowerCase().includes(
        searchData.keyword.toLowerCase()
      ) ||
      job.company.toLowerCase().includes(
        searchData.keyword.toLowerCase()
      );

    const matchesLocation = job.location
      .toLowerCase()
      .includes(searchData.location.toLowerCase());

    return matchesKeyword && matchesLocation;
  });


  const sortedJobs = [...filteredJobs].sort((a, b) => {
    if (sortBy === "type") {
      return a.type.localeCompare(b.type);
    }

    return 0;
  });

  return (
    <>
      <Hero onSearch={handleSearch} />

      <section className="mx-auto max-w-7xl px-4 py-10 md:px-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Explore Jobs
            </h2>
            <p className="mt-1 text-gray-600">
              Find an opportunity that matches your skills.
            </p>
          </div>
          <div className="mb-6 flex flex-wrap items-end gap-3">
            <label
              htmlFor="jobType"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Filter by job type
            </label>

            <select
              id="jobType"
              value={searchData.type}
              onChange={(e) =>
                setSearchData((previous) => ({
                  ...previous,
                  type: e.target.value,
                }))
              }
              className="w-full max-w-xs rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-indigo-500"
            >
              <option value="">All job types</option>
              <option value="Internship">Internship</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Remote">Remote</option>
            </select>

            <div>
              <label
                htmlFor="sortJobs"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Sort by job type
              </label>

              <select
                id="sortJobs"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full max-w-xs rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-indigo-500"
              >
                <option value="">Default order</option>
                <option value="type">Job type (A–Z)</option>
              </select>
            </div>


            <button
              type="button"
              onClick={handleClearFilters}
              className="mb-6 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              Clear Filters
            </button>
          </div>

          <p className="text-sm text-gray-500">
            {filteredJobs.length} jobs found
          </p>
        </div>


        {loading && (
          <p className="py-8 text-center">
            Loading jobs...</p>
        )}

        {error && !loading && (
          <p className="py-8 text-center text-red-500">
            {error}
          </p>
        )}

        {!loading && !error && filteredJobs.length === 0 && (
          <p className="rounded-xl bg-gray-50 p-8 text-center text-gray-600">
            No jobs found. Try another search.
          </p>
        )}

        {!loading && !error && filteredJobs.length > 0 && (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onSave={onSave}
                onApply={onApply}
                isSaved={savedJobs.some((item) => item.id === job.id)}
              />
            ))}
          </div>
        )}

        <p className="mt-6 text-sm text-gray-500">
          {savedJobs.length} jobs saved
        </p>

      </section>
    </>

  );
}

export default Home;
