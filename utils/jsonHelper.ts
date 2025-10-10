import fs from 'fs';
import path from 'path';

/**
 * Загружает JSON из папки fixtures
 * @param name имя файла (например: "github_response.json")
 */
export function loadJsonFixture<T = any>(name: string): T {
  const filePath = path.join(process.cwd(), 'tests', 'fixtures', name);
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw) as T;
}