# 🎭 Playwright API & UI Testing Portfolio

> **Built by Nithin Reddy Baddam** — QA Engineer with 3+ years in manual & automated testing, now specializing in modern API automation and AI-assisted QA workflows.

---

## 📌 What This Portfolio Demonstrates

| Skill | How It's Shown Here |
|---|---|
| REST API Testing | Full CRUD coverage of JSONPlaceholder API |
| Playwright Automation | API + UI tests in one unified framework |
| Schema Validation | JSON structure checked on every response |
| Status Code Assertions | 200, 201, 404 and error path coverage |
| AI-Assisted QA | Tests designed with GitHub Copilot & Claude |
| CI/CD Integration | GitHub Actions pipeline runs on every push |
| Clean Code Practices | Page Object Model, reusable helpers, env config |

---

## 🧰 Tech Stack
Playwright (v1.44+)   — API & browser automation
JavaScript (Node.js)  — test language
JSONPlaceholder       — public REST API (free, no auth)
GitHub Actions        — CI/CD pipeline

---

## 📁 Project Structure
playwright-api-testing-portfolio/
├── tests/
│   ├── api/
│   │   ├── posts.api.spec.js      ← GET / POST / PUT / DELETE for /posts
│   │   └── users.api.spec.js      ← GET /users, schema + data validation
│   └── ui/
│       └── posts.ui.spec.js       ← UI test on JSONPlaceholder homepage
├── .github/
│   └── workflows/
│       └── playwright.yml         ← GitHub Actions CI pipeline
├── playwright.config.js           ← Playwright configuration
├── package.json
└── README.md

---

## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/nithinbaddam1-AIQA/playwright-api-testing-portfolio.git
cd playwright-api-testing-portfolio
2. Install dependencies
npm install
npx playwright install --with-deps chromium
3. Run all tests
npx playwright test
4. Run only API tests
npx playwright test tests/api
5. Run only UI tests
npx playwright test tests/ui
6. Open the HTML report
npx playwright show-report

🧪 Test Coverage Overview
API Tests — /posts endpoint
TestMethodAssertionFetch all postsGETStatus 200, array length > 0Fetch single postGETStatus 200, correct ID returnedValidate response schemaGETid, title, body, userId all presentCreate a new postPOSTStatus 201, body echoed backUpdate a postPUTStatus 200, updated fields returnedDelete a postDELETEStatus 200Invalid post returns 404GETStatus 404 on ID 9999
API Tests — /users endpoint
TestMethodAssertionFetch all usersGETStatus 200, exactly 10 usersValidate user schemaGETname, email, address fields presentFetch user by IDGETStatus 200, correct user returned
UI Tests — JSONPlaceholder homepage
TestActionAssertionPage loads correctlyNavigateTitle contains "JSONPlaceholder"Key heading visibleDOM check"Free Fake REST API" text presentResources section existsDOM check/posts link visible on page

💡 AI-Assisted QA Notes

This project uses AI tools as a QA force multiplier — not a shortcut.


GitHub Copilot — used for generating assertion patterns and reducing boilerplate
Claude (Anthropic) — used to review edge cases and improve schema validation logic
Approach: Every AI suggestion was reviewed, understood, and validated manually before committing

This mirrors how modern QA teams use AI: to go faster while staying rigorous.

🔄 CI/CD Pipeline
Every push to main triggers GitHub Actions to:

Install Node.js 20
Install Playwright + Chromium
Run all tests
Upload the HTML report as a build artifact

See .github/workflows/playwright.yml for full config.

📬 Connect With Me

LinkedIn: linkedin.com/in/nithin-reddy-baddam-349064205
GitHub: github.com/nithinbaddam1-AIQA
Email: baddamnithin12@gmail.com


"Good QA isn't just finding bugs — it's building confidence in the system."
