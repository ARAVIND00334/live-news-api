```javascript
// registration_form_submission.spec.js
import { test, expect } from '@playwright/test';
import * as path from 'path';

test.describe('Registration Form Submission', () => {
  let page;

  // Before each test, navigate to the index.html file
  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    // Assuming index.html is in the same directory as the test file
    const htmlPath = path.resolve(__dirname, 'index.html');
    await page.goto(`file://${htmlPath}`);
  });

  test.afterEach(async () => {
    await page.close();
  });

  test('should correctly capture and display all form fields in the table', async () => {
    const testData = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      number: '1234567890',
      aadharnumber: '987654321098',
      gender: 'male',
    };

    // 1. Fill out the form fields
    await page.fill('#name', testData.name);
    await page.fill('#email', testData.email);
    await page.fill('#number', testData.number);
    await page.fill('#aadharnumber', testData.aadharnumber);

    // Select the gender radio button
    if (testData.gender === 'male') {
      await page.check('#male');
    } else {
      await page.check('#female');
    }

    // 2. Submit the form
    await page.click('button[type="submit"]');

    // 3. Verify the data is displayed in the table
    // Locate the table body and then the last row added
    const tableBody = page.locator('#tablebody');
    const newRow = tableBody.locator('tr').last();

    // Ensure the new row exists and is visible
    await expect(newRow).toBeVisible();

    // Get all cell texts from the new row
    const cells = await newRow.locator('td').allTextContents();

    // Assert that each field's data is correctly displayed in the table cells
    await expect(cells[0]).toBe(testData.name);
    await expect(cells[1]).toBe(testData.email);
    // Number fields might be stored as numbers, but retrieved as strings.
    // Ensure they match.
    await expect(cells[2]).toBe(testData.number);
    await expect(cells[3]).toBe(testData.aadharnumber);
    await expect(cells[4]).toBe(testData.gender);

    // Optional: Verify that the form fields are cleared (if script.js does this)
    // await expect(page.locator('#name')).toHaveValue('');
    // await expect(page.locator('#email')).toHaveValue('');
    // ...
  });

  test('should handle submission of female gender correctly', async () => {
    const testData = {
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      number: '0987654321',
      aadharnumber: '123456789012',
      gender: 'female',
    };

    await page.fill('#name', testData.name);
    await page.fill('#email', testData.email);
    await page.fill('#number', testData.number);
    await page.fill('#aadharnumber', testData.aadharnumber);
    await page.check('#female'); // Select female

    await page.click('button[type="submit"]');

    const tableBody = page.locator('#tablebody');
    const newRow = tableBody.locator('tr').last();

    await expect(newRow).toBeVisible();
    const cells = await newRow.locator('td').allTextContents();

    await expect(cells[0]).toBe(testData.name);
    await expect(cells[1]).toBe(testData.email);
    await expect(cells[2]).toBe(testData.number);
    await expect(cells[3]).toBe(testData.aadharnumber);
    await expect(cells[4]).toBe(testData.gender);
  });
});
```