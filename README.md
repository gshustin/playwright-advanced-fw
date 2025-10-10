
# Playwright Advanced Framework (Composition)
Переписано с Selenium/Cucumber на Playwright Test + TypeScript с современными практиками:
- Композиция (никакого `extends BasePage`)
- Allure-репорты
- Глобальный setup с сохранением auth state
- UI и API тесты
- Мульти-окружения (.env.dev/.env.stage/.env.prod)

## Быстрый старт
```bash
npm i
npx playwright install
cp .env.dev .env.dev.local || true
npm run test:dev
npm run report
```

## Переменные окружения
Создайте файлы `.env.dev`, `.env.stage`, `.env.prod`:
```env
# .env.dev
BASE_URL=https://the-internet.herokuapp.com
USERNAME=tomsmith
PASSWORD=SuperSecretPassword!
API_BASE=https://reqres.in/api
```
Выбор окружения через `TEST_ENV`: `npm run test:stage` / `npm run test:prod`.

## Allure
В проект добавлен репортер `allure-playwright`. Для генерации локального отчёта нужен установленный Allure CLI:
```bash
npm run test
npm run allure:report
npm run allure:open
```

## CI (GitHub Actions)
Workflow собирает и публикует артефакты `playwright-report` и `allure-results`.
