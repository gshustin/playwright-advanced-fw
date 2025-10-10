import { execSync } from 'child_process';

async function globalTeardown() {
  console.log('📊 Generating Allure report...');

  try {
    // генерим свежий отчёт
    execSync('npx allure generate allure-results --clean -o allure-report', {
      stdio: 'inherit',
    });

    // сразу открываем
    execSync('npx allure open allure-report', {
      stdio: 'inherit',
    });
  } catch (error) {
    console.error('Failed to generate/open Allure report', error);
  }
}

export default globalTeardown;