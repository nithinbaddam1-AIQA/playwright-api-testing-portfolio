const { test, expect } = require('@playwright/test');

function assertPostSchema(post) {
  expect(post).toHaveProperty('id');
  expect(post).toHaveProperty('title');
  expect(post).toHaveProperty('body');
  expect(post).toHaveProperty('userId');
  expect(typeof post.id).toBe('number');
  expect(typeof post.title).toBe('string');
  expect(typeof post.body).toBe('string');
  expect(typeof post.userId).toBe('number');
  expect(post.title.trim().length).toBeGreaterThan(0);
  expect(post.body.trim().length).toBeGreaterThan(0);
}

test.describe('📋 /posts — CRUD API Tests', () => {

  test('GET /posts → should return 200 and an array of 100 posts', async ({ request }) => {
    const response = await request.get('/posts');
    expect(response.status()).toBe(200);
    const posts = await response.json();
    expect(Array.isArray(posts)).toBeTruthy();
    expect(posts.length).toBe(100);
    assertPostSchema(posts[0]);
  });

  test('GET /posts/1 → should return the correct single post', async ({ request }) => {
    const response = await request.get('/posts/1');
    expect(response.status()).toBe(200);
    const post = await response.json();
    assertPostSchema(post);
    expect(post.id).toBe(1);
    expect(post.userId).toBe(1);
  });

  test('GET /posts/1 → all fields must have correct types', async ({ request }) => {
    const response = await request.get('/posts/1');
    const post = await response.json();
    assertPostSchema(post);
    expect(post.title.length).toBeGreaterThan(3);
  });

  test('POST /posts → should create a new post and return 201', async ({ request }) => {
    const newPost = {
      title: 'Playwright API Testing Portfolio',
      body: 'Demonstrating REST API automation with Playwright.',
      userId: 1,
    };
    const response = await request.post('/posts', { data: newPost });
    expect(response.status()).toBe(201);
    const createdPost = await response.json();
    expect(createdPost.title).toBe(newPost.title);
    expect(createdPost.body).toBe(newPost.body);
    expect(createdPost).toHaveProperty('id');
  });

  test('PUT /posts/1 → should update the post and return 200', async ({ request }) => {
    const updatedPost = { id: 1, title: 'Updated by Playwright', body: 'Updated body', userId: 1 };
    const response = await request.put('/posts/1', { data: updatedPost });
    expect(response.status()).toBe(200);
    const result = await response.json();
    expect(result.title).toBe(updatedPost.title);
  });

  test('DELETE /posts/1 → should delete the post and return 200', async ({ request }) => {
    const response = await request.delete('/posts/1');
    expect(response.status()).toBe(200);
    expect(await response.json()).toEqual({});
  });

  test('GET /posts/9999 → should return 404', async ({ request }) => {
    const response = await request.get('/posts/9999');
    expect(response.status()).toBe(404);
  });

  test('GET /posts → Content-Type should be application/json', async ({ request }) => {
    const response = await request.get('/posts');
    expect(response.headers()['content-type']).toContain('application/json');
  });
});
