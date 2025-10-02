import { test, expect } from 'playwright-test-coverage';
import { login } from './testingUtils';

test('create franchise', async ({ page }) => {
  await page.route('*/**/api/franchise', async (route) => {
    const franchiseRes = {
      id: 5,
      name: 'NewFranchise',
      stores: [],
    };
    expect(route.request().method()).toBe('POST');
    expect(route.request().postDataJSON()).toMatchObject({ name: 'NewFranchise' });
    await route.fulfill({ json: franchiseRes });
  });

  await login(page);
  await page.getByRole('link', { name: 'Admin' }).click();
  await page.getByRole('button', { name: 'Add Franchise' }).click();
  await page.getByRole('textbox', { name: 'franchise name' }).fill('NewFranchise');
  await page.getByRole('textbox', { name: 'franchisee admin email' }).fill('d@jwt.com');
  await page.getByRole('button', { name: 'Create' }).click();
});

test('close franchise', async ({ page }) => {
  await page.route('*/**/api/franchise/*', async (route) => {
    expect(route.request().method()).toBe('DELETE');
    await route.fulfill({ status: 204 });
  });
  
  await page.route('*/**/api/franchise?**', async (route) => {
    const franchiseRes = { franchises: [
      { id: 1, name: 'PizzaHut', stores: [{ id: 3, name: 'Orem' }] },
      { id: 2, name: 'LotaPizza', stores: [{ id: 4, name: 'Lehi' }, { id: 5, name: 'Springville' }, { id: 6, name: 'American Fork' }] },
      { id: 3, name: 'PizzaCorp', stores: [{ id: 7, name: 'Spanish Fork' }] },
      { id: 4, name: 'topSpot', stores: [] },
    ]};
    expect(route.request().method()).toBe('GET');
    await route.fulfill({ json: franchiseRes });
  });
  
  await login(page);
  await page.getByRole('link', { name: 'Admin' }).click();
  await page.getByRole('row', { name: 'PizzaHut Close' }).getByRole('button').click();
  await page.getByRole('button', { name: 'Close' }).click();
});