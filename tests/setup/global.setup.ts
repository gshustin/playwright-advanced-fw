import fs from 'fs';
import { chromium } from '@playwright/test';
import { loadEnv } from '../../utils/config';

export default async function globalSetup() {
  // 🧹 Очистка allure результатов перед стартом
  if (fs.existsSync('allure-results')) {
    fs.rmSync('allure-results', { recursive: true, force: true });
  }
  if (fs.existsSync('allure-report')) {
    fs.rmSync('allure-report', { recursive: true, force: true });
  }

  
}