# QA Automation Practice Repo — TypeScript

Node + TypeScript + `@playwright/test` practice repo. Page Object Model for UI,
a typed API client for REST calls, fixtures for setup, ESLint + Prettier + strict
`tsconfig` for code quality.

Target apps: [saucedemo.com](https://www.saucedemo.com/) (UI) and
[fakestoreapi.com](https://fakestoreapi.com/) (API) — two unrelated demo services.

## Project structure

```
practice-ts/
├── playwright.config.ts           # browsers, retries, reporters, tracing
├── tsconfig.json                  # TypeScript compiler config, strict mode
├── eslint.config.mts              # ESLint flat config: typescript-eslint + eslint-plugin-playwright
├── .prettierrc                    # formatting rules
├── fixtures/
│   └── fixtures.ts                # extended `test` with the `inventoryPage` fixture
├── pages/                         # Page Object Model — one class per saucedemo.com page
│   ├── login.page.ts
│   ├── inventory.page.ts
│   ├── cart.page.ts
│   ├── checkoutStepOne.page.ts
│   ├── checkoutStepTwo.page.ts
│   └── checkoutComplete.page.ts
├── api/
│   ├── productsClient.ts          # ProductsApiClient against fakestoreapi.com, built on Playwright's APIRequestContext
│   └── types.ts                   # response types generated from the FakeStoreAPI OpenAPI spec
├── factories/
│   └── userFactory.ts             # userInfo() — fake first/last name + postcode, via @faker-js/faker
└── tests/
    ├── ui/
    │   ├── inventory.spec.ts
    │   ├── checkout.spec.ts       # full e2e happy path, steps grouped with test.step()
    │   └── saucedemo.spec.ts      # legacy: unstructured script, kept as before/after reference
    └── api/
        └── products.spec.ts       # for-loop generating one test per product ID
```

## Setup

```bash
cd ~/Documents/LearningQA/practice-ts
npm install
npx playwright install    # downloads chromium/firefox/webkit
```

## Daily workflow

```bash
npm test                      # run all tests, all three browser projects
npx playwright test -g login  # run tests matching "login"
npm run test:headed           # watch the browser work
npm run test:debug            # step through with the Playwright inspector
npm run test:smoke            # --grep @smoke
npm run test:regression       # --grep @regression
npm run test:api              # API tests only — fast, no browser
npm run test:ui               # UI tests only
npm run report                # open the last HTML report
npx tsc --noEmit              # type-check only, no build output
npm run lint                  # ESLint (typescript-eslint + Playwright rules)
npm run format                # Prettier, write mode
npm run format:check          # Prettier, check-only (CI-safe)
```

Commit after every learning session.
