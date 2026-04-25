const { test, expect } = require('@playwright/test');

class JsonPlaceholderPage {
  constructor(page) {
    this.page = page;
    this.heroText     = page.getByText('Free Fake REST API', { exact: false });
    this.postsLink    = page.getByRole('link', { name: '/posts' });
    this.commentsLink = page.getByRole('link', { name: '/comments' });
    this.usersLink    = page.getByRole('link', { name: '/users' });
  }
  async goto() {
    await this.page.goto('/');
    await this.page.waitForLoadState('networkidle');
  }
}

test.describe('🌐 JSONPlaceholder Homepage — UI Tests', () => {
  let jsonPage;
  test.beforeEach(async ({ page }) => {
    jsonPage = new JsonPlaceholderPage(page);
    await jsonPage.goto();
  });

  test('Page title should contain JSONPlaceholder', async ({ page }) => {
    expect(await page.title()).toContain('JSONPlaceholder');
  });

  test('"Free Fake REST API" should be visible', async () => {
    await expect(jsonPage.heroText).toBeVisible();
  });

  test('/posts link should be visible', async () => {
    await expect(jsonPage.postsLink).toBeVisible();
  });

  test('/users link should be visible', async () => {
    await expect(jsonPage.usersLink).toBeVisible();
  });

  test('Clicking /posts navigates to posts page', async ({ page }) => {
    await jsonPage.postsLink.click();
    await page.waitForURL('**/posts');
    expect(page.url()).toContain('/posts');
  });
});
