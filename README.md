# Playwright E2E

Projeto de testes E2E com Playwright para um único site alvo: [Sauce Demo](https://www.saucedemo.com/).

## GitHub Actions + SonarCloud

[![CI](https://github.com/mlaurajeronimo/provaTeste-e2e/actions/workflows/node.js.yml/badge.svg)](https://github.com/mlaurajeronimo/provaTeste-e2e/actions/workflows/node.js.yml)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ugioni_playwright-e2e&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=ugioni_playwright-e2e)

## Como executar

1. Instale o [Node.js](https://nodejs.org/) 22 ou superior.
2. Rode `npm ci`.
3. Rode `npx playwright install`.
4. Rode `npm test`.
5. Rode `npm run show-report` para abrir o relatório HTML.

Os artefatos de execução ficam em `./artifacts`. Para limpar, use `npm run clean`.

## Estrutura

- `src/scenarios`: cenários de teste.
- `src/support/pages`: Page Objects usados pelos cenários.
- `.github/workflows/node.js.yml`: pipeline com Playwright e SonarCloud.
- `sonar-project.properties`: configuração do projeto no SonarCloud.
