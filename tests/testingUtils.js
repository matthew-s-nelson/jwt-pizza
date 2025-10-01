import { expect } from 'playwright-test-coverage';

export async function login(page) {
    await page.route('**/api/auth', async (route) => {
    const loginReq = { email: 'd@jwt.com', password: 'admin' };
    const loginRes = {
        user: {
        id: 3,
        name: 'Kai Chen',
        email: 'd@jwt.com',
        roles: [{ role: 'admin' }],
        },
        token: 'abcdef',
    };
    expect(route.request().method()).toBe('PUT');
    expect(route.request().postDataJSON()).toMatchObject(loginReq);
    await route.fulfill({ json: loginRes });
    });

    await page.goto('http://localhost:5173/');

    await page.getByRole('link', { name: 'Login' }).click();
    await page.getByRole('textbox', { name: 'Email address' }).fill('d@jwt.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('admin');
    await page.getByRole('button', { name: 'Login' }).click();
}