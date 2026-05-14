import { Page } from '@playwright/test';
import BasePage from './BasePage';

// Versão enxuta de CadastroPage apenas com o método usado pelo SauceDemo
export default class CadastroPage extends BasePage {
  constructor(readonly page: Page) {
    super(page);
    this.page = page;
  }

  async validarCarrinho(): Promise<void> {
    await this.page.locator('[data-test="username"]').click();
    await this.page.locator('[data-test="username"]').fill('standard_user');
    await this.page.locator('[data-test="password"]').click();
    await this.page.locator('[data-test="password"]').fill('secret_sauce');
    await this.page.locator('[data-test="login-button"]').click();
    await this.page.locator('#shopping_cart_container a').click();
    await this.page.locator('[data-test="checkout"]').click();
  }
}
