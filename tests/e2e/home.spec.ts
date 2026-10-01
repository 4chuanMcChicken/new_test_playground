import { expect, test } from "@playwright/test";

test("loads backend page data and calls the backend message endpoint", async ({
  page
}) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "Build a tiny full-stack moment." })
  ).toBeVisible();
  await expect(page.getByText("Backend connected")).toBeVisible();
  await expect(
    page.getByText("Load shared page copy from the backend")
  ).toBeVisible();
  await expect(page.getByText("React + Vite")).toBeVisible();

  await page.getByRole("button", { name: "Call backend" }).click();

  await expect(
    page.getByText("Hello from the Node.js backend.")
  ).toBeVisible();
});
