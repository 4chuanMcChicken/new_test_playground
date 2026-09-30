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
