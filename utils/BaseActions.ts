
import { Page, expect } from '@playwright/test';

export class BaseActions {
  constructor(private page: Page) {}

  async click(selector: string) {
    await this.page.locator(selector).click();
  }

  async fill(selector: string, text: string) {
    await this.page.locator(selector).fill(text);
  }

  async typeEnter(selector: string, text: string) {
    const l = this.page.locator(selector);
    await l.fill(text);
    await l.press('Enter');
  }

  async text(selector: string): Promise<string> {
    const txt = await this.page.locator(selector).textContent();
    return (txt ?? '').trim();
  }

  async shouldHaveText(selector: string, value: string | RegExp) {
    await expect(this.page.locator(selector)).toHaveText(value);
  }

  async goto(pathOrUrl: string) {
    await this.page.goto(pathOrUrl);
  }
}
