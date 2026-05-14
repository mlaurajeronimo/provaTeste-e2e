import { test } from '@playwright/test';
import SauceDemoPage from '../support/pages/SauceDemoPage';

test.describe('Sauce Demo', () => {
  let sauceDemoPage: SauceDemoPage;

  test.beforeEach(async ({ page }) => {
    sauceDemoPage = new SauceDemoPage(page);
    await sauceDemoPage.open();
  });

  test('deve adicionar um produto ao carrinho', async () => {
    await sauceDemoPage.loginAsStandardUser();
    await sauceDemoPage.addBackpackToCart();
    await sauceDemoPage.verifyBackpackInCart();
  });
});
