import { EventEmitter } from "node:events";
import { createMocks } from "node-mocks-http";
import { describe, expect, it } from "vitest";
import { app } from "./app.js";

async function sendRequest(url: string, headers: Record<string, string> = {}) {
  const { req, res } = createMocks(
    {
      method: "GET",
      url,
      headers
    },
    {
      eventEmitter: EventEmitter
    }
  );

  await new Promise<void>((resolve, reject) => {
    res.on("end", resolve);
    res.on("error", reject);
    app.handle(req, res);
  });

  return res;
}

describe("backend API", () => {
  it("returns health information", async () => {
    const response = await sendRequest("/health");

    expect(response.statusCode).toBe(200);
    expect(response._getJSONData()).toEqual({
      ok: true,
      service: "new-test-playground-api",
      timestamp: expect.any(String)
    });
    expect(Date.parse(response._getJSONData().timestamp)).not.toBeNaN();
  });

  it("returns the frontend message payload", async () => {
    const response = await sendRequest("/api/message");

    expect(response.statusCode).toBe(200);
    expect(response._getJSONData()).toEqual({
      message: "Hello from the Node.js backend."
    });
  });

  it("allows the configured frontend origin", async () => {
    const response = await sendRequest("/api/message", {
      origin: "http://localhost:5173"
    });

    expect(response.statusCode).toBe(200);
    expect(response.getHeader("access-control-allow-origin")).toBe(
      "http://localhost:5173"
    );
  });
});
