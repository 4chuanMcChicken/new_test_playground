import { useEffect, useState } from "react";

type HomeData = {
  headline: string;
  intro: string;
  status: string;
  updatedAt: string;
  metrics: Array<{
    label: string;
    value: string;
  }>;
  tasks: string[];
};

const fallbackHomeData: HomeData = {
  headline: "Build a tiny full-stack moment.",
  intro: "Loading page content from the backend API.",
  status: "Connecting",
  updatedAt: "",
  metrics: [
    { label: "Frontend", value: "React + Vite" },
    { label: "Backend", value: "Express API" },
    { label: "Mode", value: "Local dev" }
  ],
  tasks: ["Waiting for backend data"]
};

export function App() {
  const [homeData, setHomeData] = useState<HomeData>(fallbackHomeData);
  const [apiMessage, setApiMessage] = useState("Ready to check the backend.");
  const [isLoading, setIsLoading] = useState(false);
  const [pageState, setPageState] = useState<"loading" | "ready" | "error">(
    "loading"
  );

  useEffect(() => {
    let isMounted = true;

    async function loadHomeData() {
      try {
        const response = await fetch("/api/home");

        if (!response.ok) {
          throw new Error("Request failed");
        }

        const data = (await response.json()) as HomeData;

        if (isMounted) {
          setHomeData(data);
          setPageState("ready");
        }
      } catch {
        if (isMounted) {
          setPageState("error");
        }
      }
    }

    void loadHomeData();

    return () => {
      isMounted = false;
    };
  }, []);

  const loadMessage = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/message");
      const data = (await response.json()) as { message: string };
      setApiMessage(data.message);
    } catch {
      setApiMessage("Could not reach the backend yet.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="app-shell">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">{homeData.status}</p>
          <h1>{homeData.headline}</h1>
          <p className="summary">{homeData.intro}</p>

          <div className="actions">
            <button type="button" onClick={loadMessage} disabled={isLoading}>
              {isLoading ? "Calling API..." : "Call backend"}
            </button>
            <span className="hint">
              {pageState === "error"
                ? "Using fallback content until the API is available."
                : "Page content is served by Express."}
            </span>
          </div>
        </div>

        <div className="showcase" aria-label="Template status">
          <div className="status-bar">
            <span className="status-dot" />
            <span>Local workspace</span>
          </div>

          <div className="message-panel">
            <span className="panel-label">API response</span>
            <p>{apiMessage}</p>
          </div>

          <div className="task-panel">
            <span className="panel-label">Backend data</span>
            <ul>
              {homeData.tasks.map((task) => (
                <li key={task}>{task}</li>
              ))}
            </ul>
          </div>

          <div className="feature-grid">
            {homeData.metrics.map((metric) => (
              <span key={metric.label}>
                <strong>{metric.label}</strong>
                {metric.value}
              </span>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
