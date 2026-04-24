const { test, expect } = require('@playwright/test');

function assertUserSchema(user) {
  expect(user).toHaveProperty('id');
  expect(user).toHaveProperty('name');
  expect(user).toHaveProperty('email');
  expect(user).toHaveProperty('address');
  expect(user.address).toHaveProperty('city');
  expect(user.address).toHaveProperty('geo');
  expect(user.address.geo).toHaveProperty('lat');
  expect(user).toHaveProperty('company');
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

test.describe('👤 /users — Schema & Data Validation Tests', () => {

  test('GET /users → should return 200 and exactly 10 users', async ({ request }) => {
    const response = await request.get('/users');
    expect(response.status()).toBe(200);
    const users = await response.json();
    expect(users.length).toBe(10);
  });

  test('GET /users → every user must pass schema check', async ({ request }) => {
    const users = await (await request.get('/users')).json();
    for (const user of users) assertUserSchema(user);
  });

  test('GET /users → all emails should be valid format', async ({ request }) => {
    const users = await (await request.get('/users')).json();
    for (const user of users) {
      expect(isValidEmail(user.email), `Invalid email: ${user.email}`).toBe(true);
    }
  });

  test('GET /users/1 → should return Leanne Graham', async ({ request }) => {
    const response = await request.get('/users/1');
    const user = await response.json();
    expect(user.name).toBe('Leanne Graham');
    expect(user.address.city).toBe('Gwenborough');
  });

  test('GET /users/1 → geo lat and lng should be strings', async ({ request }) => {
    const user = await (await request.get('/users/1')).json();
    expect(typeof user.address.geo.lat).toBe('string');
    expect(typeof user.address.geo.lng).toBe('string');
  });

  test('GET /users/9999 → should return 404', async ({ request }) => {
    expect((await request.get('/users/9999')).status()).toBe(404);
  });

  test('GET /users → response within 3 seconds', async ({ request }) => {
    const start = Date.now();
    await request.get('/users');
    expect(Date.now() - start).toBeLessThan(3000);
  });
});
