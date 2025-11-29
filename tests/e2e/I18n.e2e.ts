import { expect, test } from '@playwright/test';

test.describe('I18n', () => {
  test.describe('Language Switching', () => {
    test('should switch language from English to French using dropdown and verify text on the homepage', async ({
      page,
    }) => {
      await page.goto('/');

      // Verify English homepage loads
      await expect(page.getByRole('heading', { name: 'Welcome' })).toBeVisible();

      // Switch to French
      await page.getByLabel('lang-switcher').selectOption('fr');

      // Verify French homepage loads (heading should still be "Welcome" but content changes)
      await expect(page.getByRole('heading', { name: 'Welcome' })).toBeVisible();
      
      // Verify French content is displayed
      await expect(page.getByText(/Next js Boilerplate est le code/i)).toBeVisible();
    });

    test('should switch language from English to French using URL', async ({
      page,
    }) => {
      await page.goto('/');

      // Verify English homepage
      await expect(page.getByRole('heading', { name: 'Welcome' })).toBeVisible();
      await expect(page.getByText(/Next js Boilerplate is the perfect/i)).toBeVisible();

      // Navigate to French version
      await page.goto('/fr');

      // Verify French homepage
      await expect(page.getByRole('heading', { name: 'Welcome' })).toBeVisible();
      await expect(page.getByText(/Next js Boilerplate est le code/i)).toBeVisible();
    });
  });
});
