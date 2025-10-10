
import { Page } from '@playwright/test';
import { BaseActions } from '../utils/BaseActions';

export class SecurePage {
  private base: BaseActions;
  private header = 'h2';

  constructor(private page: Page) {
    this.base = new BaseActions(page);
  }

  async headerText(): Promise<string> {
    return this.base.text(this.header);
  }
}
