import { useState } from "react";

function Applications({ applications, onStatusChange, onNotesChange }) {

  const [editingNoteId, setEditingNoteId] = useState(null);
  const [noteText, setNoteText] = useState("");


  const totalApplications = applications.length;

  const appliedCount = applications.filter(
    (job) => job.status === "Applied"
  ).length;

  const interviewCount = applications.filter(
    (job) => job.status === "Interview"
  ).length;

  const rejectedCount = applications.filter(
    (job) => job.status === "Rejected"
  ).length;

  const offerCount = applications.filter(
    (job) => job.status === "Offer"
  ).length;


  const total = applications.length;

  const finalOutcomeCount = applications.filter(
    (job) => job.status === "Offer" || job.status === "Rejected"
  ).length;

  const outcomeRate =
    total === 0 ? 0 : Math.round((finalOutcomeCount / total) * 100);

  const interviewRate =
    total === 0 ? 0 : Math.round((interviewCount / total) * 100);

  const offerRate =
    total === 0 ? 0 : Math.round((offerCount / total) * 100);


  return (
    <section className="mx-auto max-w-7xl px-4 py-10 md:px-8">


      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900">
          Application Dashboard
        </h1>

        <p className="mt-2 mb-6 text-gray-600">
          Track your job application progress at a glance.
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Total Applications</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">
              {totalApplications}
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Applied</p>
            <p className="mt-2 text-3xl font-bold text-indigo-600">
              {appliedCount}
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Interviews</p>
            <p className="mt-2 text-3xl font-bold text-blue-600">
              {interviewCount}
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Rejected</p>
            <p className="mt-2 text-3xl font-bold text-red-600">
              {rejectedCount}
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Offers</p>
            <p className="mt-2 text-3xl font-bold text-green-600">
              {offerCount}
            </p>
          </div>
        </div>
      </div>


      <div className="mb-10 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900">
          Application Progress
        </h2>

        <div className="mt-5">
          <div className="mb-2 flex justify-between gap-3 text-sm">
            <span className="text-gray-600">Final outcome rate</span>
            <span className="font-semibold text-gray-900">
              {outcomeRate}%
            </span>
          </div>

          <div
            className="h-3 overflow-hidden rounded-full bg-gray-100"
            role="progressbar"
            aria-label="Final outcome rate"
            aria-valuenow={outcomeRate}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="h-full rounded-full bg-green-500 transition-all duration-500"
              style={{ width: `${outcomeRate}%` }}
            />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-lg bg-blue-50 p-4">
            <p className="text-sm text-blue-700">Interview rate</p>
            <p className="mt-1 text-2xl font-bold text-blue-900">
              {interviewRate}%
            </p>
          </div>

          <div className="rounded-lg bg-green-50 p-4">
            <p className="text-sm text-green-700">Offer rate</p>
            <p className="mt-1 text-2xl font-bold text-green-900">
              {offerRate}%
            </p>
          </div>
        </div>
      </div>

      <h1 className="text-3xl font-bold text-gray-900">
        My Applications
      </h1>

      <p className="mt-2 mb-8 text-gray-600">
        Track your job application progress.
      </p>

      {applications.length === 0 ? (
        <p className="rounded-xl bg-gray-50 p-8 text-center text-gray-600">
          No applications yet. Apply to a job to start tracking!
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {applications.map((job) => (
            <div
              key={job.id}
              className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <h2 className="text-lg font-bold text-gray-900">
                {job.title}
              </h2>

              <p className="mt-1 text-indigo-600">
                {job.company}
              </p>

              <p className="mt-2 text-sm text-gray-600">
                {job.location}
              </p>

              <p className="mt-4 text-sm text-gray-500">
                Applied on:{" "}
                {job.appliedAt
                  ? new Date(job.appliedAt).toLocaleDateString()
                  : "Date unavailable"}
              </p>

              <label className="mt-4 block text-sm font-medium text-gray-700">
                Application status
              </label>

              <select
                value={job.status || "Applied"}
                onChange={(event) =>
                  onStatusChange(job.id, event.target.value)
                }
                className="mt-2 w-full rounded-lg border border-gray-300 p-2"
              >
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Rejected">Rejected</option>
                <option value="Offer">Offer</option>
              </select>


              <div className="mt-5 border-t border-gray-200 pt-4">
                <h3 className="font-semibold text-gray-900">
                  Application Notes
                </h3>

                {editingNoteId === job.id ? (
                  <div className="mt-3">
                    <textarea
                      value={noteText}
                      onChange={(event) => setNoteText(event.target.value)}
                      placeholder="Add interview details, recruiter notes, or follow-up reminders..."
                      rows={4}
                      className="w-full rounded-lg border border-gray-300 p-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    />

                    <div className="mt-2 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          onNotesChange(job.id, noteText);
                          setEditingNoteId(null);
                          setNoteText("");
                        }}
                        className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
                      >
                        Save Notes
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setEditingNoteId(null);
                          setNoteText("");
                        }}
                        className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-3">
                    {job.notes?.trim() ? (
                      <p className="whitespace-pre-wrap wrap-break text-sm text-gray-600">
                        {job.notes}
                      </p>
                    ) : (
                      <p className="text-sm text-gray-500">
                        No notes added yet.
                      </p>
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        setEditingNoteId(job.id);
                        setNoteText(job.notes || "");
                      }}
                      className="mt-3 rounded-lg border border-indigo-200 px-4 py-2 text-sm font-semibold text-indigo-600 hover:bg-indigo-50"
                    >
                      {job.notes?.trim() ? "Edit Notes" : "Add Notes"}
                    </button>
                  </div>
                )}
              </div>


              <a
                href={job.url}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-block text-sm font-semibold text-indigo-600 hover:underline"
              >
                View Job
              </a>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Applications;
