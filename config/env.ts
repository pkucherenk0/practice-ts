// Central place for environment-driven config, so a base URL change is one edit,
// not a hunt through every page object / API client.
export const UI_BASE_URL = process.env.UI_BASE_URL ?? 'https://www.saucedemo.com';
export const API_BASE_URL = process.env.API_BASE_URL ?? 'https://fakestoreapi.com';
