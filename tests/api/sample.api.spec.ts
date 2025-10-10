import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';
import { loadJsonFixture } from '../../utils/jsonHelper';

test('GitHub API matches snapshot', async ({ request }, testInfo) => {
  // Skip unless running in API project
  test.skip(testInfo.project.name !== 'api', 'Only runs in API project');

  await test.step('Send GET request to GitHub API', async () => {
  await allure.label('feature', 'API');
    const response = await request.get('https://api.github.com');
    expect(response.status()).toBe(200);

    const currentData = await response.json();

    // attach actual response to Allure
    await allure.attachment(
      'Actual GitHub API response',
      JSON.stringify(currentData, null, 2),
      'application/json'
    );

    await test.step('Compare with expected snapshot', async () => {
      const expectedData = loadJsonFixture('github_response.json');

      // attach expected snapshot
      await allure.attachment(
        'Expected snapshot',
        JSON.stringify(expectedData, null, 2),
        'application/json'
      );

      expect(currentData).toEqual(expectedData);
    });
  });
});