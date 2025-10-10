
import { request, APIRequestContext, expect } from '@playwright/test';
import { loadEnv } from './config';

export class ApiClient {
  private context!: APIRequestContext;
  private baseUrl: string;

  constructor() {
    const cfg = loadEnv();
    this.baseUrl = cfg.API_BASE || '';
  }

  async init() {
    this.context = await request.newContext({
      baseURL: this.baseUrl,
      extraHTTPHeaders: { 'Content-Type': 'application/json' }
    });
  }

  async dispose() {
    await this.context.dispose();
  }

  async get<T = any>(path: string) {
    const res = await this.context.get(path);
    expect(res.ok()).toBeTruthy();
    return res.json() as Promise<T>;
  }

  async post<T = any>(path: string, body: object) {
    const res = await this.context.post(path, { data: body });
    expect(res.ok()).toBeTruthy();
    return res.json() as Promise<T>;
  }
}
