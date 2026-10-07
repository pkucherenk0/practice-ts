# QA Automation Practice Repo — TypeScript

Node + TypeScript + `@playwright/test` practice repo. Page Object Model for UI,
a typed API client for REST calls, fixtures for setup, ESLint + Prettier + strict
`tsconfig` for code quality.

Target apps: [saucedemo.com](https://www.saucedemo.com/) (UI) and
[fakestoreapi.com](https://fakestoreapi.com/) (API) — two unrelated demo services.

## Project structure

```
practice-ts/
├── playwright.config.ts           # browsers, retries, reporters, tracing, auth setup-project dependency
├── tsconfig.json                  # TypeScript compiler config, strict mode
├── eslint.config.mts              # ESLint flat config: typescript-eslint + eslint-plugin-playwright
├── .prettierrc                    # formatting rules
├── allure-categories.json         # Allure failure-classification rules (Timeout/Network/Assertion/etc.)
├── config/
│   └── env.ts                     # UI_BASE_URL / API_BASE_URL — one place to change target environment
├── fixtures/
│   └── fixtures.ts                # extended `test` with the `inventoryPage` fixture + Allure browser tagging
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
├── utils/
│   └── currency.ts                # parseCurrency() — shared "$29.99" -> 29.99 parsing for price assertions
├── scripts/
│   └── copy-allure-history.js     # carries Allure trend history forward across report generations
└── tests/
    ├── setup/
    │   └── auth.setup.ts          # logs in once, saves storageState — every UI project depends on this
    ├── ui/
    │   ├── inventory.spec.ts
    │   ├── checkout.spec.ts       # full e2e happy path, steps grouped with test.step()
    │   ├── saucedemo.spec.ts      # burger menu navigation + price sort
    │   └── visual.spec.ts         # toHaveScreenshot() baseline, @visual only, chromium only
    └── api/
        └── products.spec.ts       # for-loop generating one test per product ID — tagged @api, see note below
```

**Note on API tests in CI:** every test carries a `@ui` or `@api` tag (in addition to
`@regression`/`@smoke`). CI runs `playwright test --grep @ui` only — `tests/api/products.spec.ts`
calls the live fakestoreapi.com, which sits behind Cloudflare and bot-challenges CI/datacenter
IPs (403 + HTML "Just a moment..." page instead of JSON), so API tests are excluded from CI by
tag rather than skipped inline. Run them locally with `npm run test:api`.

**Note on auth:** `tests/setup/auth.setup.ts` runs once per `npx playwright test` invocation
(as the `setup` project every other project `dependencies` on) and saves the logged-in session
to `playwright/.auth/user.json` (git-ignored). Individual tests never log in through the UI
themselves anymore — `fixtures.ts`'s `inventoryPage` fixture just opens the inventory page directly.

**Note on visual regression:** `tests/ui/visual.spec.ts` is tagged `@visual`, not `@ui`, so it's
excluded from `npm run test:ui` / CI — macOS (local) and the Ubuntu CI runner render fonts
differently, which would make a cross-OS baseline comparison flake constantly. Run it locally with
`npm run test:visual` (compare) or `npm run test:visual:update` (recapture baseline after a real UI change).

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
npm run test:api              # --grep @api — fast, no browser (local only, Cloudflare-blocked in CI)
npm run test:ui               # --grep @ui — what CI runs
npm run test:visual           # --grep @visual, chromium only — compares against saved baseline
npm run test:visual:update    # same, but recaptures the baseline (after an intentional UI change)
npm run report                # open the last HTML report
npx tsc --noEmit              # type-check only, no build output
npm run lint                  # ESLint (typescript-eslint + Playwright rules)
npm run format                # Prettier, write mode
npm run format:check          # Prettier, check-only (CI-safe)
```

Commit after every learning session.
