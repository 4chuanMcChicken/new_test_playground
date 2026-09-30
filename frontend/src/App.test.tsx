import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { App } from "./App";

describe("App", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders the starter content and default API message", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", { name: "Ship the idea, not the setup." })
    ).toBeInTheDocument();
    expect(screen.getByText("Ready to check the backend.")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Call backend" })
    ).toBeEnabled();
    expect(screen.getByText("Typed Express API")).toBeInTheDocument();
  });

  it("loads the backend message when the button is clicked", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue({
        message: "Hello from the Node.js backend."
      })
    });
    vi.stubGlobal("fetch", fetchMock);

    render(<App />);
    await userEvent.click(screen.getByRole("button", { name: "Call backend" }));

    expect(fetchMock).toHaveBeenCalledWith("/api/message");
    expect(
      await screen.findByText("Hello from the Node.js backend.")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Call backend" })).toBeEnabled();
  });

  it("shows a fallback message when the backend cannot be reached", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));

    render(<App />);
    await userEvent.click(screen.getByRole("button", { name: "Call backend" }));

    expect(
      await screen.findByText("Could not reach the backend yet.")
    ).toBeInTheDocument();
  });
});
