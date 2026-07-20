import { expect, test } from '@playwright/test'

test('uses one Globe experience across the responsive breakpoint', async ({
  page,
}) => {
  let geoJSONRequests = 0
  page.on('request', (request) => {
    if (request.url().endsWith('/data/countries.geojson')) geoJSONRequests += 1
  })

  await page.setViewportSize({ width: 1280, height: 900 })
  await page.goto('/')
  await expect(page.getByTestId('globe-status')).toContainText('Ready')
  await expect(
    page.locator('[data-testid="globe-experience"] canvas'),
  ).toHaveCount(1)
  await expect(page.getByTestId('globe-caption')).toContainText('Click')
  const portugalMarker = page.getByRole('button', { name: 'Select Portugal' })
  await portugalMarker.focus()
  await page.keyboard.press('Enter')
  await expect(page.getByTestId('globe-caption')).toContainText('Portugal')

  await page.setViewportSize({ width: 390, height: 844 })
  await expect(
    page.locator('[data-testid="globe-experience"] canvas'),
  ).toHaveCount(1)
  await expect(page.getByTestId('globe-caption')).toContainText('Portugal')
  await portugalMarker.focus()
  await page.keyboard.press('Enter')
  await expect(page.getByTestId('globe-caption')).toContainText('Tap')
  expect(geoJSONRequests).toBe(1)
})

test('shows a recoverable local-data failure without blocking the page', async ({
  page,
}) => {
  let attempts = 0
  await page.route('**/data/countries.geojson', async (route) => {
    attempts += 1
    if (attempts === 1) {
      await route.abort()
      return
    }
    await route.continue()
  })

  await page.goto('/')
  await expect(page.getByTestId('globe-status')).toContainText(
    'Globe unavailable',
  )
  await expect(page.getByRole('link', { name: 'Read the blog' })).toBeVisible()
  await page.getByRole('button', { name: 'Retry globe' }).click()
  await expect(page.getByTestId('globe-status')).toContainText('Ready')
  expect(attempts).toBe(2)
})
