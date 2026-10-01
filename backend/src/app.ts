import cors from "cors";
import express from "express";

const corsOrigin = process.env.CORS_ORIGIN ?? "http://localhost:5173";

export const app = express();

app.use(cors({ origin: corsOrigin }));
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({
    ok: true,
    service: "new-test-playground-api",
    timestamp: new Date().toISOString()
  });
});

app.get("/api/message", (_req, res) => {
  res.json({
    message: "Hello from the Node.js backend."
  });
});

app.get("/api/home", (_req, res) => {
  res.json({
    headline: "Build a tiny full-stack moment.",
    intro:
      "This page is rendered by React and filled with live content from the Express API.",
    status: "Backend connected",
    updatedAt: new Date().toISOString(),
    metrics: [
      { label: "Frontend", value: "React + Vite" },
      { label: "Backend", value: "Express API" },
      { label: "Mode", value: "Local dev" }
    ],
    tasks: [
      "Load shared page copy from the backend",
      "Show API health in the interface",
      "Keep the workspace ready for the next feature"
    ]
  });
});
