// Copies the previous Allure report's history/ into the fresh raw results
// before `allure generate` runs, so trend graphs (History Trend, Duration
// Trend, Retry Trend) accumulate across runs instead of resetting every time.
const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, '..', 'allure-report', 'history');
const targetDir = path.join(__dirname, '..', 'allure-results', 'history');

if (fs.existsSync(sourceDir)) {
  fs.cpSync(sourceDir, targetDir, { recursive: true });
}
