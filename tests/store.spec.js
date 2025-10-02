import { test, expect } from 'playwright-test-coverage';
import { login } from './testingUtils';

test('create store', async ({ page }) => {
    // Fix: Use more explicit route pattern
    await page.route('*/api/franchise/173/store', async (route) => {
      console.log('Store creation route hit!', route.request().url()); // Add this for debugging
      
      const storeReq = {
          id: "",
          name: "NewStore"  // Remove the empty "id" field
      };
      expect(route.request().method()).toBe('POST');
      expect(route.request().postDataJSON()).toMatchObject(storeReq);
      const storeRes = {
            id: 58,
            name: "NewStore"
    };
      await route.fulfill({ json: storeRes });
        createStoreApiCount++;
    });

    // Move this AFTER the specific store route to avoid conflicts
    await page.route('*/**/api/franchise/*', async (route) => {
      // Only handle GET requests to avoid intercepting the POST to /store
      if (route.request().method() === 'GET') {
        console.log('Franchise GET route hit:', route.request().url());
        const franchiseRes = [{
            "id": 173,
            "name": "test",
            "admins": [{
                "id": 1,
                "name": "常用名字",
                "email": "a@jwt.com"
            }],
            "stores": []
        }];
        await route.fulfill({ json: franchiseRes });
      } else {
        // Let other routes handle non-GET requests
        await route.continue();
      }
    });
  

  await login(page);
  await page.getByText('FranchiseAboutHistory').getByRole('link', { name: 'Franchise' }).click();
  await page.getByRole('button', { name: 'Create store' }).click();
  await page.getByRole('textbox', { name: 'store name' }).fill('NewStore');
  await page.getByRole('button', { name: 'Create' }).click();
});

test('close store', async ({ page }) => {
  await page.route('*/**/api/franchise/2/store/4', async (route) => {
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
  await page.getByRole('row', { name: 'Lehi ₿ Close' }).getByRole('button').click();
  await expect(page.getByText('Are you sure you want to')).toBeVisible();
  await page.getByRole('button', { name: 'Close' }).click();
});