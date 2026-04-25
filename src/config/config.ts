import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';

const environment = process.env.ENV || 'default';
const envFile = environment === 'default' ? '.env' : `.env.${environment}`;
const envPath = resolve(process.cwd(), envFile);

if (existsSync(envPath)) {
  const envContent = readFileSync(envPath, 'utf-8');

  for (const line of envContent.split(/\r?\n/)) {
    const trimmedLine = line.trim();

    if (!trimmedLine || trimmedLine.startsWith('#')) {
      continue;
    }

    const separatorIndex = trimmedLine.indexOf('=');

    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmedLine.slice(0, separatorIndex).trim();
    const value = trimmedLine.slice(separatorIndex + 1).trim().replace(/^['"]|['"]$/g, '');

    process.env[key] ??= value;
  }
}

export const config = {

    baseUrl: process.env.BASE_URL || 'https://www.saucedemo.com',
    headless: process.env.HEADLESS === 'true',
    browser: process.env.BROWSER || 'chromium',

    users: {
        standard: {
            username: process.env.STANDARD_USER || 'standard_user',
            password: process.env.PASSWORD || 'secret_sauce'
        },

        locked: {
            username: process.env.LOCKED_USER || 'locked_out_user',
            password: process.env.PASSWORD || 'secret_sauce'
        }
    },

    timeout: {
        default: 30000,
        navigation: 60000
    }

};
