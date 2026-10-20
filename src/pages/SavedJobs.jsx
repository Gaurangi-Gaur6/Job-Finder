import JobCard from "../components/JobCard";

function SavedJobs({ savedJobs, onSave }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 md:px-8">
      <h1 className="mb-2 text-3xl font-bold text-gray-900">
        Saved Jobs
      </h1>

      <p className="mb-8 text-gray-600">
        You have saved {savedJobs.length} jobs.
      </p>


      {savedJobs.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-12 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100">
            <span className="text-2xl">🔖</span>
          </div>

          <h2 className="text-xl font-semibold text-gray-900">
            No saved jobs yet
          </h2>

          <p className="mx-auto mt-2 max-w-md text-gray-600">
            Save interesting opportunities and find them here whenever you need them.
          </p>

          <a
            href="/"
            className="mt-6 inline-block rounded-lg bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700"
          >
            Browse Jobs
          </a>
        </div>
      ) : (

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {savedJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onSave={onSave}
              isSaved={true}
              showRemove={true}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default SavedJobs;
