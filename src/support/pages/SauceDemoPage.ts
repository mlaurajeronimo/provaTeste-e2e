import { expect, Page } from '@playwright/test';
import BasePage from './BasePage';

export default class SauceDemoPage extends BasePage {
  constructor(readonly page: Page) {
    super(page);
    this.page = page;
  }

  async open(): Promise<void> {
    await this.page.goto('/');
  }

  async loginAsStandardUser(): Promise<void> {
    await this.page.locator('[data-test="username"]').fill('standard_user');
    await this.page.locator('[data-test="password"]').fill('secret_sauce');
    await this.page.locator('[data-test="login-button"]').click();
    await expect(this.page.locator('[data-test="title"]')).toHaveText(
      'Products'
    );
  }

  async addBackpackToCart(): Promise<void> {
    await this.page
      .locator('[data-test="add-to-cart-sauce-labs-backpack"]')
      .click();
    await expect(
      this.page.locator('[data-test="shopping-cart-badge"]')
    ).toHaveText('1');
  }

  async verifyBackpackInCart(): Promise<void> {
    await this.page.locator('[data-test="shopping-cart-link"]').click();
    await expect(
      this.page.locator('[data-test="inventory-item-name"]')
    ).toHaveText('Sauce Labs Backpack');
  }
}
