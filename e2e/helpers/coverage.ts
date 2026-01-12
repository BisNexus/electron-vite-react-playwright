import type { Page } from "@playwright/test";
import * as fs from "fs";
import * as path from "path";
import { ElectronApplication } from "playwright";

export async function teardown(app: ElectronApplication) {
  if (app) {
    const page = await app.firstWindow();
    await collectCoverage(page);
    await app.close();
  }
}
export async function collectCoverage(page: Page) {
  const coverage = await page.evaluate(() => {
    return (window as any).__coverage__;
  });

  if (coverage) {
    const coverageDir = path.join(process.cwd(), ".nyc_output");
    if (!fs.existsSync(coverageDir)) {
      fs.mkdirSync(coverageDir, { recursive: true });
    }

    const coverageFile = path.join(coverageDir, `coverage-${Date.now()}.json`);

    fs.writeFileSync(coverageFile, JSON.stringify(coverage));
  }
}
