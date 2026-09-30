import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

function App() {
  const loadMessage = async () => {
    const response = await fetch("/api/message");
    const data = (await response.json()) as { message: string };
    alert(data.message);
  };

  return (
    <main className="app-shell">
      <section className="intro">
        <p className="eyebrow">Full-stack starter</p>
        <h1>React frontend, Node.js backend, ready to build.</h1>
        <p className="summary">
          This template gives you a Vite React client and an Express API with
          TypeScript on both sides.
        </p>
        <button type="button" onClick={loadMessage}>
          Call backend
        </button>
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
