import { test, expect } from 'playwright-test-coverage';
import { login } from './testingUtils';

test('list users', async ({ page }) => {
  await page.route('*/**/api/user?**', async (route) => {
    console.log('User list route hit:', route.request().url());
    const userRes = {
      users: [
        { id: 1, name: 'diner 1', email: 'a@jwt.com', roles: [{ role: 'diner' }] },
        { id: 2, name: 'admin 1', email: 'b@jwt.com', roles: [{ role: 'admin' }] },
        { id: 3, name: 'admin 2', email: 'c@jwt.com', roles: [{ role: 'admin' }] },
      ],
    };
    await route.fulfill({ json: userRes });
  });

  await page.route('*/**/api/franchise?**', async (route) => {
    const franchiseRes = { franchises: [
      {
        id: 5,
        name: 'NewFranchise',
        stores: [],
      }
    ], more: false };
    expect(route.request().method()).toBe('GET');
    await route.fulfill({ json: franchiseRes });
  });

  await page.goto('/');
  login(page);
  await page.getByRole('link', { name: 'Admin' }).click();

  await expect(page.getByRole('main')).toContainText('Users');
  await expect(page.getByRole('main')).toContainText('diner 1');
  await expect(page.getByRole('main')).toContainText('admin 1');
  await expect(page.getByRole('main')).toContainText('admin 2');
  await expect(page.getByRole('main')).toContainText('admin');
});