import { test, expect } from 'playwright-test-coverage';
import { login } from './testingUtils';

test('updateUser', async ({ page }) => {
  login(page);
  
  await page.route('*/**/api/order', async (route) => {
    const orderRes = {
      order: {
        items: [
          { menuId: 1, description: 'Veggie', price: 0.0038 },
          { menuId: 2, description: 'Pepperoni', price: 0.0042 },
        ],
        storeId: '4',
        franchiseId: 2,
        id: 23,
      },
      jwt: 'eyJpYXQ',
    };
    expect(route.request().method()).toBe('GET');
    await route.fulfill({ json: orderRes });
  });


  await page.route('*/**/api/user/**', async (route) => {
    const userId = route.request().url().split('/').pop();
    const userReq = {
      "id": 3,
      "name": "pizza dinerx",
      "email": "d@jwt.com",
      "roles": [
        {
          "role": "admin"
        }
      ]
    };
    const userRes = {
      user: { id: userId, name: 'diner 1', email: 'a@jwt.com', roles: [{ role: 'diner' }] },
    };
    expect(route.request().method()).toBe('PUT');
    expect(route.request().postDataJSON()).toMatchObject(userReq);
    await route.fulfill({ json: userRes });
  });
  await page.getByRole('link', { name: 'KC' }).click();

  await page.route('*/**/api/auth', async (route) => {
    await route.fulfill({});
  });


  await expect(page.getByRole('main')).toContainText('Kai Chen');

  await page.getByRole('button', { name: 'Edit' }).click();
  await expect(page.locator('h3')).toContainText('Edit user');
  await page.getByRole('textbox').first().fill('pizza dinerx');
  await page.getByRole('button', { name: 'Update' }).click();

  await page.waitForSelector('[role="dialog"].hidden', { state: 'attached' });

  await expect(page.getByRole('main')).toContainText('pizza dinerx');
});