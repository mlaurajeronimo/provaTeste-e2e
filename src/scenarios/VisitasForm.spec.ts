import { test, expect } from '@playwright/test';
import { join } from 'path';
import { TheConfig } from 'sicolo';
import VisitasPage from '../support/pages/VisitasPage';

test.describe('Unisatc - Formulário de Visitas', () => {
  const CONFIG = join(__dirname, '../support/fixtures/config.yml');
  let visitasPage: VisitasPage;
  const BASE_URL = TheConfig.fromFile(CONFIG)
    .andPath('application.unisatc_visitas')
    .retrieveData();

  test.beforeEach(async ({ page }) => {
    visitasPage = new VisitasPage(page);
    await page.goto(BASE_URL);
  });

  test('Deve preencher e submeter o formulário de visitas com dados reais', async () => {
    const data = {
      name: 'João da Silva',
      studentName: 'Maria Silva',
      studentDob: '2015-05-10',
      email: 'joao.silva@example.com',
      phone: '+55 48 99999-9999',
      message: 'Olá, gostaria de agendar uma visita para conhecer o colégio. Obrigado.'
    };

    await visitasPage.dismissCookieBanner();

    const form = visitasPage.page.locator('#agendar_visita_colegio, #campanha_colegio').first();
    await form.waitFor({ state: 'visible', timeout: 5000 });

    await visitasPage.fillForm(data as any);

    // Validações
    await expect(visitasPage.page.locator('#form-field-nome')).toHaveValue(data.name);
    await expect(visitasPage.page.locator('#form-field-nome_aluno')).toHaveValue(data.studentName);
    await expect(visitasPage.page.locator('#form-field-data_nascimento_aluno')).toHaveValue(data.studentDob);
    await expect(visitasPage.page.locator('#form-field-email')).toHaveValue(data.email);
    await expect(visitasPage.page.locator('#form-field-telefone')).not.toHaveValue('');
  });
});
