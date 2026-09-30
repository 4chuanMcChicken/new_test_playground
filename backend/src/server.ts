import cors from "cors";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();
const port = Number(process.env.PORT ?? 3000);
const corsOrigin = process.env.CORS_ORIGIN ?? "http://localhost:5173";

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

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});
