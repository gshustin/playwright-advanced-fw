
import { Page } from '@playwright/test';
import { BaseActions } from '../utils/BaseActions';

export class LoginPage {
  private base: BaseActions;
  private username = '#username';
  private password = '#password';
  private loginBtn = "button[type='submit']";

  constructor(private page: Page) {
    this.base = new BaseActions(page);
  }

  async open() {
    await this.base.goto('/login');
  }

  async login(user: string, pass: string) {
    await this.base.fill(this.username, user);
    await this.base.fill(this.password, pass);
    await this.base.click(this.loginBtn);
  }
}
