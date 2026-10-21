import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home"
import SavedJobs from "./pages/SavedJobs";
import Applications from "./pages/Applications";


function App() {

  const [applications, setApplications] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("applications") || "[]"
      );
    } catch {
      return [];
    }
  });

  const [savedJobs, setSavedJobs] = useState(() => {
    try {
      const storedJobs = localStorage.getItem("savedJobs");
      return storedJobs ? JSON.parse(storedJobs) : [];
    } catch (error) {
      console.error("Error loading saved jobs:", error);
      return [];
    }

  });

  useEffect(() => {
    localStorage.setItem(
      "applications",
      JSON.stringify(applications)
    );
  }, [applications]);

  useEffect(() => {
    localStorage.setItem("savedJobs", JSON.stringify(savedJobs));
  }, [savedJobs]);

  function handleSave(job) {
    setSavedJobs((previous) => {
      const alreadySaved = previous.some(
        (item) => item.id === job.id
      );

      if (alreadySaved) {
        return previous.filter((item) => item.id !== job.id);
      }

      return [...previous, job];
    });
  }

  function handleApply(job) {
    setApplications((previous) => {
      const alreadyApplied = previous.some(
        (item) => item.id === job.id
      );

      if (alreadyApplied) {
        return previous;
      }

      return [
        ...previous,
        {
          ...job,
          status: "Applied",
          appliedAt: new Date().toISOString(),
          notes: "",
        },
      ];
    });
  }

  function handleStatusChange(jobId, newStatus) {
    setApplications((previous) =>
      previous.map((job) =>
        job.id === jobId
          ? { ...job, status: newStatus }
          : job
      )
    );
  }

  function handleNotesChange(jobId, newNotes) {
    setApplications((previous) =>
      previous.map((job) =>
        job.id === jobId
          ? { ...job, notes: newNotes }
          : job
      )
    );
  }


  return (
    <BrowserRouter>
      <Navbar />

      <Routes>

        <Route path="/"
          element={<Home
            savedJobs={savedJobs}
            onSave={handleSave}
            onApply={handleApply}
          />}
        />

        {/* <Route path="/jobs"
          element={<h1 className="p-8">
            Find Jobs
          </h1>}
        /> */}

        <Route
          path="/jobs"
          element={
            <div className="min-h-screen bg-white p-8 text-black">
              <h1 className="text-3xl font-bold">
                Find Jobs
              </h1>
              <p>Jobs page is working!</p>
            </div>
          }
        />

        <Route path="/saved"
          element={
            <SavedJobs
              savedJobs={savedJobs}
              onSave={handleSave}
            />
          }
        />

        <Route path="/applications"
          element={
            <
              Applications
              applications={applications}
              onStatusChange={handleStatusChange}
              onNotesChange={handleNotesChange}
            />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}


export default App;
