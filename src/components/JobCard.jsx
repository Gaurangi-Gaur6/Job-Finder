import { useState } from "react";
import { MapPin, BriefcaseBusiness, Bookmark, Trash2 } from "lucide-react";

function JobCard({ job, onSave, onApply, isSaved = false, showRemove = false, }) {

  const [confirmRemove, setConfirmRemove] = useState(false);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-gray-900">
            {job.title}
          </h3>

          <p className="mt-1 text-sm font-medium text-indigo-600">
            {job.company}
          </p>
        </div>

        <button
          type="button"
          onClick={() => onSave(job)}
          aria-label={isSaved ? "Remove saved job" : "Save job"}
          aria-pressed={isSaved}
          title={isSaved ? "Remove saved job" : "Save job"}
          className={`rounded-lg p-2 transition ${isSaved
            ? "bg-indigo-50 text-indigo-600"
            : "text-gray-500 hover:bg-indigo-50 hover:text-indigo-600"
            }`}
        >
          <Bookmark
            size={20}
            fill={isSaved ? "currentColor" : "none"}
          />
        </button>

      </div>

      <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
        <span className="flex items-center gap-1">
          <MapPin size={16} />
          {job.location}
        </span>

        <span className="flex items-center gap-1">
          <BriefcaseBusiness size={16} />
          {job.type}
        </span>
      </div>

      <div className="mt-5 flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700">
            {job.salary || "Salary not specified"}
          </span>

          <div className="flex flex-wrap gap-2">
            <a
              href={job.url}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              Apply Now
            </a>

            <button
              type="button"
              onClick={() => onApply(job)}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              Track Application
            </button>
          </div>
        </div>
        {showRemove && (
          <button
            type="button"
            onClick={() => setConfirmRemove(true)}
            className="rounded-lg bg-red-500 px-4 py-2 text-sm font-bold text-white"
          >
            <Trash2 size={16} className="mr-1 inline" />
            Remove
          </button>
        )}
      </div>

      {showRemove && confirmRemove && (
        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-sm text-gray-800">
            Are you sure you want to remove this saved job?
          </p>

          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={() => {
                onSave(job);
                setConfirmRemove(false);
              }}
              className="rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white hover:bg-red-700"
            >
              Yes, Remove
            </button>

            <button
              type="button"
              onClick={() => setConfirmRemove(false)}
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-700"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>

  )

}

export default JobCard;
