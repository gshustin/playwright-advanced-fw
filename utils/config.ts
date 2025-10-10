
import * as dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

export interface TestConfig {
  BASE_URL: string;
  USERNAME: string;
  PASSWORD: string;
  API_BASE?: string;
}

function loadDotenvByEnv(envName: string) {
  const fname = `.env.${envName}`;
  const full = path.resolve(process.cwd(), fname);
  if (fs.existsSync(full)) {
    dotenv.config({ path: full });
  } else {
    dotenv.config({ path: path.resolve(process.cwd(), '.env') });
  }
}

export function loadEnv(): TestConfig {
  const envName = process.env.TEST_ENV || 'dev';
  loadDotenvByEnv(envName);
  return {
    BASE_URL: process.env.BASE_URL || 'https://the-internet.herokuapp.com',
    USERNAME: process.env.USERNAME || 'tomsmith',
    PASSWORD: process.env.PASSWORD || 'SuperSecretPassword!',
    API_BASE: process.env.API_BASE || 'https://reqres.in/api'
  };
}
