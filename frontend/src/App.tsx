import { useState } from "react";

const features = [
  "Typed Express API",
  "Vite-powered React",
  "Workspace scripts"
];

export function App() {
  const [apiMessage, setApiMessage] = useState("Ready to check the backend.");
  const [isLoading, setIsLoading] = useState(false);

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
          <p className="eyebrow">Full-stack starter</p>
          <h1>Ship the idea, not the setup.</h1>
          <p className="summary">
            A clean React and Node.js foundation with TypeScript, a working API
            route, and enough polish to feel like a real starting point.
          </p>

          <div className="actions">
            <button type="button" onClick={loadMessage} disabled={isLoading}>
              {isLoading ? "Calling API..." : "Call backend"}
            </button>
            <span className="hint">Express answers through the Vite proxy.</span>
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

          <div className="feature-grid">
            {features.map((feature) => (
              <span key={feature}>{feature}</span>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
