import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { App } from "./App";

const homePayload = {
  headline: "Build a tiny full-stack moment.",
  intro:
    "This page is rendered by React and filled with live content from the Express API.",
  status: "Backend connected",
  updatedAt: "2026-09-30T22:00:00.000Z",
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
};

describe("App", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders backend-provided page content", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue(homePayload)
      })
    );

    render(<App />);

    expect(
      await screen.findByRole("heading", {
        name: "Build a tiny full-stack moment."
      })
    ).toBeInTheDocument();
    expect(screen.getByText("Backend connected")).toBeInTheDocument();
    expect(
      screen.getByText("Load shared page copy from the backend")
    ).toBeInTheDocument();
    expect(screen.getByText("Ready to check the backend.")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Call backend" })
    ).toBeEnabled();
    expect(screen.getByText("React + Vite")).toBeInTheDocument();
  });

  it("loads the backend message when the button is clicked", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValue(homePayload)
      })
      .mockResolvedValueOnce({
        json: vi.fn().mockResolvedValue({
          message: "Hello from the Node.js backend."
        })
      });
    vi.stubGlobal("fetch", fetchMock);

    render(<App />);
    await userEvent.click(screen.getByRole("button", { name: "Call backend" }));

    expect(fetchMock).toHaveBeenNthCalledWith(1, "/api/home");
    expect(fetchMock).toHaveBeenNthCalledWith(2, "/api/message");
    expect(
      await screen.findByText("Hello from the Node.js backend.")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Call backend" })).toBeEnabled();
  });

  it("shows a fallback message when the backend cannot be reached", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValue(homePayload)
      })
      .mockRejectedValueOnce(new Error("offline"));
    vi.stubGlobal("fetch", fetchMock);

    render(<App />);
    await userEvent.click(screen.getByRole("button", { name: "Call backend" }));

    expect(
      await screen.findByText("Could not reach the backend yet.")
    ).toBeInTheDocument();
  });

  it("uses fallback page content when the home endpoint fails", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));

    render(<App />);

    expect(
      await screen.findByText("Using fallback content until the API is available.")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Build a tiny full-stack moment." })
    ).toBeInTheDocument();
  });
});
