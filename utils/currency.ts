// Shared parsing helper for price text scraped off the page (e.g. "$29.99"),
// so every test comparing prices does it the same way instead of re-deriving
// the same replace/parseFloat one-liner.
export function parseCurrency(value: string): number {
  return parseFloat(value.replace('$', ''));
}
