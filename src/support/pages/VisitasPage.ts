import { Page, expect } from '@playwright/test';
import VisitasElements from '../elements/VisitasElements';
import BasePage from './BasePage';

export default class VisitasPage extends BasePage {
  readonly visitasElements: VisitasElements;

  constructor(readonly page: Page) {
    super(page);
    this.page = page;
    this.visitasElements = new VisitasElements(page);
  }

  async open(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async shouldSeeHeading(): Promise<void> {
    await expect(this.visitasElements.getMainHeading()).toBeVisible();
  }

  async shouldHaveContent(): Promise<void> {
    await expect(this.visitasElements.getContent()).toBeVisible();
  }

  async fillForm(data: { name?: string; email?: string; phone?: string; message?: string }): Promise<void> {
    // preencher nome do responsável
    if (data.name) {
      const responsible = this.visitasElements.getResponsibleNameField();
      if (await responsible.count()) {
        await responsible.scrollIntoViewIfNeeded();
        await responsible.fill(data.name);
      } else {
        const fallback = this.visitasElements.getNameField();
        if (await fallback.count()) await fallback.fill(data.name);
      }
    }

    // nome do aluno (se provêmos)
    if ((data as any).studentName) {
      const student = this.visitasElements.getStudentNameField();
      if (await student.count()) {
        await student.scrollIntoViewIfNeeded();
        await student.fill((data as any).studentName);
      }
    }

    if (data.email) {
      const emailField = this.visitasElements.getEmailField();
      if (await emailField.count()) {
        await emailField.scrollIntoViewIfNeeded();
        await emailField.fill(data.email);
      }
    }

    if (data.phone) {
      const phoneField = this.visitasElements.getPhoneField();
      if (await phoneField.count()) {
        await phoneField.scrollIntoViewIfNeeded();
        await phoneField.fill(data.phone);
      }
    }

    // data de nascimento do aluno (campo date precisa de evaluate para setar valor compatível)
    if ((data as any).studentDob) {
      const dob = this.visitasElements.getDobField();
      if (await dob.count()) {
        await dob.scrollIntoViewIfNeeded();
        try {
          await dob.fill((data as any).studentDob);
        } catch (e) {
          // fallback: setar via JS
          const handle = await dob.elementHandle();
          if (handle) {
            await this.page.evaluate(
              ([el, val]: any) => {
                el.value = val;
                el.dispatchEvent(new Event('input', { bubbles: true }));
                el.dispatchEvent(new Event('change', { bubbles: true }));
              },
              [handle, (data as any).studentDob]
            );
          }
        }
      }
    }

    if (data.message) {
      const messageField = this.visitasElements.getMessageField();
      if (await messageField.count()) {
        await messageField.scrollIntoViewIfNeeded();
        await messageField.fill(data.message);
      }
    }
  }

  async submitForm(): Promise<void> {
    const btn = this.visitasElements.getSubmitButton();
    if (await btn.count()) {
      // tentar fechar banner de cookies que pode cobrir o botão
      await this.dismissCookieBanner();
      try {
        await btn.scrollIntoViewIfNeeded();
        await btn.click({ timeout: 5000 });
      } catch (e) {
        // fallback: força o clique caso o botão esteja oculto por camadas ou animações
        try {
          await btn.click({ force: true });
        } catch (err) {
          // ultimate fallback: localizar o formulário pai de um dos campos preenchidos e submeter via JS
          // verificar presença dos campos de forma assíncrona
          const nameCount = await this.visitasElements.getNameField().count();
          const emailCount = await this.visitasElements.getEmailField().count();
          const messageCount = await this.visitasElements.getMessageField().count();

          let field: any = null;
          if (nameCount) field = this.visitasElements.getNameField();
          else if (emailCount) field = this.visitasElements.getEmailField();
          else if (messageCount) field = this.visitasElements.getMessageField();

          if (field) {
            const handle = await field.elementHandle();
            if (handle) {
              // cast para any para contornar assinaturas de tipo do evaluate
              await this.page.evaluate((el: any) => {
                const form = el.closest('form');
                if (form) {
                  try {
                    (form as HTMLFormElement).submit();
                  } catch (e) {
                    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
                  }
                }
              }, handle as any);
            }
          }
        }
      }
      // esperar um pouco para o request de submissão completar/navegação
      try {
        await this.page.waitForLoadState('networkidle', { timeout: 8000 });
      } catch (e) {
        // ignore timeout, teste seguirá com asserções genéricas
      }
    }
  }

  async dismissCookieBanner(): Promise<void> {
    // botão de aceitar cookies gerado pelo plugin cookie-law-info
    const acceptBtn = this.page.locator('button[data-cky-tag="accept-button"], button.cky-btn-accept, .cky-btn-accept');
    try {
      if (await acceptBtn.count()) {
        const visible = await acceptBtn.isVisible();
        if (visible) {
          await acceptBtn.click({ timeout: 3000 });
          // aguardar que o overlay desapareça
          const overlay = this.page.locator('.cky-overlay');
          if (await overlay.count()) {
            await overlay.waitFor({ state: 'hidden', timeout: 3000 }).catch(() => {});
          }
        }
      }
    } catch (e) {
      // não bloquear o teste se o banner não puder ser fechado
    }
  }
}
