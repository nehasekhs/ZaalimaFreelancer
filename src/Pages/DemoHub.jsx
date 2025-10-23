import React, { useEffect, useState } from "react";

export default function DemoHub() {
  const [files, setFiles] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const freelancerId = "demo-freelancer";

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const base = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const [r1, r2] = await Promise.all([
        fetch(`${base}/api/demo/files/${freelancerId}`),
        fetch(`${base}/api/demo/sessions/${freelancerId}`)
      ]);
      const d1 = await r1.json();
      const d2 = await r2.json();

      // Existing data
      const apiFiles = d1.files || [];
      const apiSessions = d2.sessions || [];

      // Add 5–6 demo watch videos (live coding demos)
      const demoVideos = [
        {
          id: "1",
          title: "Live Coding Demo: E-Commerce Product Page in React",
          status: "recording",
          recordedAt: new Date(),
          playbackUrl: "/src/vedios/Viva Web Promo 52117696 - Free Motion Graphics Templates & Presets - Google Chrome 2025-10-22 21-08-29.mp4",
        },
       
        {
          id: "2",
          title: "Live Coding Demo: MERN Stack CRUD Operations",
          status: "recording",
          recordedAt: new Date(),
          playbackUrl: "/src/vedios/Vite + React - Personal - Microsoft​ Edge 2025-09-09 21-42-37.mp4",
        },
        
       
      ];

      // Merge existing and demo sessions
      setFiles(apiFiles);
      setSessions([...apiSessions, ...demoVideos]);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="px-6 py-8 max-w-6xl mx-auto text-white">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent">
          Demo Sessions & Files
        </h1>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-400">{error}</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 p-6 rounded-xl bg-gray-900 border border-gray-800">
            <h2 className="text-xl font-semibold mb-4">Demo Sessions</h2>
            <div className="space-y-3">
              {sessions.map((s) => (
                <div
                  key={s.id}
                  className="p-4 rounded border border-gray-800 bg-gray-950"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{s.title}</p>
                      <p className="text-gray-400 text-sm">
                        {s.status === "recording"
                          ? `Recorded ${new Date(
                              s.recordedAt
                            ).toLocaleDateString()}`
                          : `Scheduled ${new Date(
                              s.scheduledAt
                            ).toLocaleDateString()}`}
                      </p>
                    </div>
                    {s.playbackUrl && (
                      <a
                        href={s.playbackUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1 rounded bg-pink-500 hover:bg-pink-600"
                      >
                        Watch
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-xl bg-gray-900 border border-gray-800">
            <h2 className="text-xl font-semibold mb-4">Demo Files</h2>
            <div className="space-y-3">
              {files.map((f) => (
                <div
                  key={f.id}
                  className="p-3 rounded bg-gray-800/60 border border-gray-700"
                >
                  <p className="font-medium">{f.title}</p>
                  <p className="text-gray-400 text-sm mb-2">{f.description}</p>
                  <a
                    href={f.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-pink-400 text-sm"
                  >
                    Open
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
