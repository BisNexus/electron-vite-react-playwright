import { test, expect } from "@playwright/test";
import type { ElectronApplication, Page } from "@playwright/test";
import path from "node:path";
import { _electron as electron } from "playwright-core";
import type { JSHandle } from "playwright";
import type { BrowserWindow } from "electron";

let electronApp: ElectronApplication;
let page: Page;

test.beforeAll(async () => {
  electronApp = await electron.launch({
    args: [".", "--no-sandbox"],
    env: { ...process.env, NODE_ENV: "development" },
  });
  page = await electronApp.firstWindow();

  const mainWin: JSHandle<BrowserWindow> =
    await electronApp.browserWindow(page);
  await mainWin.evaluate(async (win) => {
    win.webContents.executeJavaScript(
      'console.log("Execute JavaScript with e2e testing.")',
    );
  });
});

test.afterAll(async () => {
  await page.close();
  await electronApp.close();
});

test.describe("[electron-vite-react] e2e tests", async () => {
  test("startup", async () => {
    const title = await page.title();
    expect(title).toBe("Electron + Vite + React");
  });

  test("should be home page is load correctly", async () => {
    const h1 = await page.$("h1");
    const title = await h1?.textContent();
    expect(title).toBe("Electron + Vite + React");
  });

  test("should be count button can click", async () => {
    const countButton = await page.$("button");
    await countButton?.click();
    const countValue = await countButton?.textContent();
    expect(countValue).toBe("count is 1");
  });
});
