import { test, expect, Page } from '@playwright/test'

// ─── Helpers ────────────────────────────────────────────────────────────────

/** Wait for fonts, images, and network to settle */
async function waitForPageReady(page: Page) {
  await page.waitForLoadState('networkidle')
  await page.evaluate(() => document.fonts.ready)
  // Let CSS animations (marquee, fade-in) complete initial frame
  await page.waitForTimeout(800)
}

/** Scroll to an element and wait for scroll-reveal animation to finish */
async function scrollTo(page: Page, selector: string) {
  await page.locator(selector).scrollIntoViewIfNeeded()
  await page.waitForTimeout(900) // allow 0.7 s transition + buffer
}

/** Disable CSS animations / transitions for a stable screenshot */
async function freezeAnimations(page: Page) {
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation-duration: 0s !important;
        animation-delay: 0s !important;
        transition-duration: 0s !important;
        transition-delay: 0s !important;
      }
    `,
  })
}

// ─── Tests ───────────────────────────────────────────────────────────────────

test.describe('Logo.AI – visual regression', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await waitForPageReady(page)
  })

  // ── Full page ──────────────────────────────────────────────────────────────
  test('full page – above the fold', async ({ page }) => {
    await freezeAnimations(page)
    await expect(page).toHaveScreenshot('above-the-fold.png', {
      clip: { x: 0, y: 0, width: 1440, height: 900 },
    })
  })

  // ── Navbar ─────────────────────────────────────────────────────────────────
  test('navbar – initial state', async ({ page }) => {
    await freezeAnimations(page)
    const navbar = page.locator('nav').first()
    await expect(navbar).toHaveScreenshot('navbar.png')
  })

  test('navbar – scrolled state (with blur bg)', async ({ page }) => {
    await page.evaluate(() => window.scrollBy(0, 300))
    await page.waitForTimeout(400)
    await freezeAnimations(page)
    const navbar = page.locator('nav').first()
    await expect(navbar).toHaveScreenshot('navbar-scrolled.png')
  })

  // ── Hero ───────────────────────────────────────────────────────────────────
  test('hero section', async ({ page }) => {
    await freezeAnimations(page)
    await expect(page.locator('section').first()).toHaveScreenshot('hero.png')
  })

  test('hero – email input focus state', async ({ page }) => {
    await freezeAnimations(page)
    await page.locator('input[type="email"]').first().focus()
    await expect(page.locator('section').first()).toHaveScreenshot('hero-input-focused.png')
  })

  test('hero – submitted state', async ({ page }) => {
    await page.locator('input[type="email"]').first().fill('test@example.com')
    await page.locator('button[type="submit"]').first().click()
    await page.waitForTimeout(300)
    await freezeAnimations(page)
    await expect(page.locator('section').first()).toHaveScreenshot('hero-submitted.png')
  })

  // ── Logo gallery ───────────────────────────────────────────────────────────
  test('logo gallery section', async ({ page }) => {
    await scrollTo(page, 'text=Every logo, crafted from scratch')
    await freezeAnimations(page)
    const section = page.locator('text=Every logo, crafted from scratch').locator('../..')
    await expect(section).toHaveScreenshot('logo-gallery.png')
  })

  test('logo gallery – coffee shop tab', async ({ page }) => {
    await scrollTo(page, 'text=Every logo, crafted from scratch')
    await page.locator('button:has-text("Coffee shop")').first().click()
    await page.waitForTimeout(500)
    await freezeAnimations(page)
    const section = page.locator('text=Every logo, crafted from scratch').locator('../..')
    await expect(section).toHaveScreenshot('logo-gallery-coffee-shop.png')
  })

  // ── Mockup section ─────────────────────────────────────────────────────────
  test('mockup section', async ({ page }) => {
    await scrollTo(page, 'text=From websites to packaging')
    await freezeAnimations(page)
    const section = page.locator('text=From websites to packaging').locator('../..')
    await expect(section).toHaveScreenshot('mockup-section.png')
  })

  // ── How it works ───────────────────────────────────────────────────────────
  test('how it works section', async ({ page }) => {
    await scrollTo(page, 'text=From idea to logo in seconds')
    await freezeAnimations(page)
    const section = page.locator('text=From idea to logo in seconds').locator('../..')
    await expect(section).toHaveScreenshot('how-it-works.png')
  })

  // ── Comparison table ───────────────────────────────────────────────────────
  test('comparison table', async ({ page }) => {
    await scrollTo(page, 'text=Skip the designer')
    await freezeAnimations(page)
    const section = page.locator('text=Skip the designer').locator('../..')
    await expect(section).toHaveScreenshot('comparison-table.png')
  })

  // ── Stats ──────────────────────────────────────────────────────────────────
  test('stats section', async ({ page }) => {
    await scrollTo(page, 'text=Your free logo is waiting')
    // Wait for counter animation to finish
    await page.waitForTimeout(2500)
    await freezeAnimations(page)
    const section = page.locator('text=Your free logo is waiting').locator('../..')
    await expect(section).toHaveScreenshot('stats-section.png')
  })

  // ── FAQ ────────────────────────────────────────────────────────────────────
  test('FAQ – collapsed state', async ({ page }) => {
    await scrollTo(page, 'text=Got questions')
    await freezeAnimations(page)
    const section = page.locator('text=Got questions').locator('../..')
    await expect(section).toHaveScreenshot('faq-collapsed.png')
  })

  test('FAQ – first item expanded', async ({ page }) => {
    await scrollTo(page, 'text=Got questions')
    // Click the first FAQ question
    await page.locator('[data-faq-item]').first().click()
    await page.waitForTimeout(500)
    await freezeAnimations(page)
    const section = page.locator('text=Got questions').locator('../..')
    await expect(section).toHaveScreenshot('faq-expanded.png')
  })

  // ── Blog ───────────────────────────────────────────────────────────────────
  test('blog section', async ({ page }) => {
    await scrollTo(page, 'text=Tips, trends, and inspiration')
    await freezeAnimations(page)
    const section = page.locator('text=Tips, trends, and inspiration').locator('../..')
    await expect(section).toHaveScreenshot('blog-section.png')
  })

  // ── CTA section ────────────────────────────────────────────────────────────
  test('CTA section', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await page.waitForTimeout(600)
    await freezeAnimations(page)
    const section = page.locator('text=Get my free logo').last().locator('../../..')
    await expect(section).toHaveScreenshot('cta-section.png')
  })

  // ── Footer ─────────────────────────────────────────────────────────────────
  test('footer', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await page.waitForTimeout(600)
    await freezeAnimations(page)
    const footer = page.locator('footer')
    await expect(footer).toHaveScreenshot('footer.png')
  })

  // ── Mobile sticky bar ──────────────────────────────────────────────────────
  test('mobile sticky bar appears after scrolling past hero', async ({ page }) => {
    // Only relevant on mobile viewport – skip on desktop
    const viewport = page.viewportSize()
    if (viewport && viewport.width >= 768) {
      test.skip()
    }
    await page.evaluate(() => window.scrollBy(0, 800))
    await page.waitForTimeout(400)
    await freezeAnimations(page)
    await expect(page).toHaveScreenshot('mobile-sticky-bar.png', {
      clip: { x: 0, y: viewport!.height - 100, width: viewport!.width, height: 100 },
    })
  })
})

// ─── Structural / content tests (non-visual) ─────────────────────────────────

test.describe('Logo.AI – content & structure', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await waitForPageReady(page)
  })

  test('page title is set', async ({ page }) => {
    await expect(page).toHaveTitle(/logo/i)
  })

  test('navbar logo mark is visible', async ({ page }) => {
    await expect(page.locator('nav').getByText(/logo\.ai/i).first()).toBeVisible()
  })

  test('hero headline is visible', async ({ page }) => {
    // The hero contains prominent headline text
    await expect(page.locator('h1').first()).toBeVisible()
  })

  test('hero email input and CTA button are present', async ({ page }) => {
    await expect(page.locator('input[type="email"]').first()).toBeVisible()
    await expect(page.locator('button[type="submit"]').first()).toBeVisible()
  })

  test('logo gallery section renders category tabs', async ({ page }) => {
    await scrollTo(page, 'text=Every logo, crafted from scratch')
    await expect(page.locator('button:has-text("Restaurant")').first()).toBeVisible()
    await expect(page.locator('button:has-text("Coffee shop")').first()).toBeVisible()
  })

  test('FAQ items are present and at least 6 visible', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2))
    await page.waitForTimeout(400)
    const items = page.locator('[data-faq-item]')
    await expect(items).toHaveCount(await items.count())
    expect(await items.count()).toBeGreaterThanOrEqual(6)
  })

  test('comparison table has LOGO.AI, Designer, and Other AI columns', async ({ page }) => {
    await scrollTo(page, 'text=Skip the designer')
    await expect(page.locator('text=LOGO.AI').first()).toBeVisible()
    await expect(page.locator('text=Designer').first()).toBeVisible()
    await expect(page.locator('text=Other AI').first()).toBeVisible()
  })

  test('footer links are present', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await page.waitForTimeout(300)
    const footer = page.locator('footer')
    await expect(footer).toBeVisible()
  })
})
