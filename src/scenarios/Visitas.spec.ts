import { test } from '@playwright/test';
import { join } from 'path';
import { TheConfig } from 'sicolo';
import VisitasPage from '../support/pages/VisitasPage';

test.describe('Unisatc - Página de Visitas', () => {
  const CONFIG = join(__dirname, '../support/fixtures/config.yml');
  let visitasPage: VisitasPage;
  const BASE_URL = TheConfig.fromFile(CONFIG)
    .andPath('application.unisatc_visitas')
    .retrieveData();

  test.beforeEach(async ({ page }) => {
    visitasPage = new VisitasPage(page);
    await page.goto(BASE_URL);
  });

  test('Deve abrir a página de visitas e validar conteúdo', async () => {
    await visitasPage.shouldSeeHeading();
    await visitasPage.shouldHaveContent();
  });
});
