import { Locator, Page } from '@playwright/test';
import BaseElements from './BaseElements';

export default class VisitasElements extends BaseElements {
  constructor(readonly page: Page) {
    super(page);
    this.page = page;
  }

  getMainHeading(): Locator {
    return this.page.locator('h1, h2').first();
  }

  getContent(): Locator {
    return this.page.locator('main, article, .content, #content').first();
  }

  getContactLink(): Locator {
    return this.page.locator('a:has-text("Contato"), a:has-text("contato"), a[href*="contato"]').first();
  }

  // Campos de formulário comuns (se existentes na página)
  getNameField(): Locator {
    return this.page.locator('input[name="name"], input[name="your-name"], input[id*="name"], #form-field-nome').first();
  }

  getEmailField(): Locator {
    return this.page.locator('input[type="email"], input[name="email"], input[id*="email"]').first();
  }

  getPhoneField(): Locator {
    return this.page.locator('input[type="tel"], input[name="phone"], input[id*="phone"]').first();
  }

  getMessageField(): Locator {
    return this.page.locator('textarea[name="message"], textarea, textarea[id*="message"]').first();
  }

  // Campos específicos observados no site
  getResponsibleNameField(): Locator {
    return this.page.locator('#form-field-nome');
  }

  getStudentNameField(): Locator {
    return this.page.locator('#form-field-nome_aluno');
  }

  getDobField(): Locator {
    return this.page.locator('#form-field-data_nascimento_aluno');
  }

  getCityField(): Locator {
    return this.page.locator('#form-field-cidade');
  }

  getSchoolField(): Locator {
    return this.page.locator('#form-field-escola_atual');
  }

  getSubmitButton(): Locator {
    return this.page.locator('button[type="submit"], input[type="submit"], button:has-text("Enviar"), button:has-text("Enviar mensagem")').first();
  }
}
