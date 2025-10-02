import { test, expect } from 'playwright-test-coverage';
import { login } from './testingUtils';

test('home page loads', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  expect(await page.title()).toBe('JWT Pizza');
});

test('Login', async ({ page }) => {
    await login(page);
    await expect(page.locator('#navbar-dark')).toContainText('Admin');
});

test('register', async ({ page }) => {
  await page.route('*/**/api/auth', async (route) => {
    const registerReq = { name: 'New User', email: 'd@jwt.com', password: 'admin' };
    const loginRes = {
        user: {
        id: 3,
        name: 'Kai Chen',
        email: 'd@jwt.com',
        roles: [{ role: 'admin' }],
        },
        token: 'abcdef',
    };
    expect(route.request().method()).toBe('POST');
    expect(route.request().postDataJSON()).toMatchObject(registerReq);
    await route.fulfill({ json: loginRes });
  });

    await page.goto('http://localhost:5173/');

    await page.getByRole('link', { name: 'Register' }).click();
    await page.getByRole('textbox', { name: 'Full name' }).fill('New User');
    await page.getByRole('textbox', { name: 'Email address' }).fill('d@jwt.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('admin');
    await page.getByRole('button', { name: 'Register' }).click();
    await expect(page.locator('#navbar-dark')).toContainText('Logout');
});

test('logout', async ({ page }) => {
    await login(page);

    await page.route('**/api/auth', async (route) => {
        const logoutRes = { message: 'Logout successful' };
        expect(route.request().method()).toBe('DELETE');
        await route.fulfill({ json: logoutRes });
    });
    await page.getByRole('link', { name: 'Logout' }).click();
    await expect(page.locator('#navbar-dark')).toContainText('Login');
});

test('history page loads', async ({ page }) => {
  await page.goto('http://localhost:5173/history');
  await expect(page.getByText('Mama Rucci, my my')).toBeVisible();
});

test('purchase with login', async ({ page }) => {
  await page.route('*/**/api/order/menu', async (route) => {
    const menuRes = [
      {
        id: 1,
        title: 'Veggie',
        image: 'pizza1.png',
        price: 0.0038,
        description: 'A garden of delight',
      },
      {
        id: 2,
        title: 'Pepperoni',
        image: 'pizza2.png',
        price: 0.0042,
        description: 'Spicy treat',
      },
    ];
    expect(route.request().method()).toBe('GET');
    await route.fulfill({ json: menuRes });
  });

  await page.route('*/**/api/franchise**', async (route) => {
    const franchiseRes = {
      franchises: [
        {
          id: 2,
          name: 'LotaPizza',
          stores: [
            { id: 4, name: 'Lehi' },
          { id: 5, name: 'Springville' },
          { id: 6, name: 'American Fork' },
        ],
      },
      { id: 3, name: 'PizzaCorp', stores: [{ id: 7, name: 'Spanish Fork' }] },
      { id: 4, name: 'topSpot', stores: [] },
    ]};
    expect(route.request().method()).toBe('GET');
    await route.fulfill({ json: franchiseRes });
  });

  await page.route('*/**/api/order', async (route) => {
    const orderReq = {
      items: [
        { menuId: 1, description: 'Veggie', price: 0.0038 },
        { menuId: 2, description: 'Pepperoni', price: 0.0042 },
      ],
      storeId: '4',
      franchiseId: 2,
    };
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
    expect(route.request().method()).toBe('POST');
    expect(route.request().postDataJSON()).toMatchObject(orderReq);
    await route.fulfill({ json: orderRes });
  });

  await page.route('*/**/api/user/me', async (route) => {
    const res = {
      user: {
        id: 3,
        name: 'Kai Chen',
        email: 'd@jwt.com',
        roles: [{ role: 'admin' }],
      },
    };
    expect(route.request().method()).toBe('GET');
    await route.fulfill({ json: res });
  });

    await login(page);

  // Go to order page
  await page.getByRole('button', { name: 'Order now' }).click();

  // Create order
  await expect(page.locator('h2')).toContainText('Awesome is a click away');
  await page.getByRole('combobox').selectOption('4');
  await page.getByRole('link', { name: 'Image Description Veggie A' }).click();
  await page.getByRole('link', { name: 'Image Description Pepperoni' }).click();
  await expect(page.locator('form')).toContainText('Selected pizzas: 2');
  await page.getByRole('button', { name: 'Checkout' }).click();

  // Pay
  await expect(page.getByRole('main')).toContainText('Send me those 2 pizzas right now!');
  await expect(page.locator('tbody')).toContainText('Veggie');
  await expect(page.locator('tbody')).toContainText('Pepperoni');
  await expect(page.locator('tfoot')).toContainText('0.008 ₿');
  await page.getByRole('button', { name: 'Pay now' }).click();

  // Check balance
  await expect(page.getByText('0.008')).toBeVisible();
});

test('about page loads', async ({ page }) => {
  await page.goto('http://localhost:5173/about');
  await expect(page.getByRole('link', { name: 'about', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'The secret sauce' })).toBeVisible();
});
    