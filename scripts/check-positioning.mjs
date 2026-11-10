/** Content/render smoke checks; not a substitute for responsive browser QA. */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer } from 'vite';

process.env.VITE_STRIPE_MODE = 'test';
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
try {
  const { LandingPage } = await server.ssrLoadModule('/src/pages/LandingPage.tsx');
  const { AdvisoryPage } = await server.ssrLoadModule('/src/pages/AdvisoryPage.tsx');
  const { positioning } = await server.ssrLoadModule('/src/data/positioning.ts');
  const { engagementModes, DELIVERY_ENQUIRY_EMAIL, MEDIUM_URL, proofCases } = await server.ssrLoadModule('/src/data/content.ts');
  const landing = renderToStaticMarkup(createElement(LandingPage, { onOpenConsultation() {} }));
  const advisory = renderToStaticMarkup(createElement(AdvisoryPage, { onOpenConsultation() {} }));

  assert.equal((landing.match(/<h1\b/g) || []).length, 1);
  assert.ok(landing.includes(positioning.hero.title));
  for (const path of ['src/data/positioning.ts', 'src/data/content.ts', 'src/data/faq.ts', 'src/data/welcome.ts']) {
    assert.ok(!/Julien|Sié|our founder|TRENDev[’']s founder/i.test(readFileSync(path, 'utf8')), `Personal branding reintroduced in ${path}`);
  }
  assert.ok(landing.includes('href="/#how-we-deliver"'));
  assert.ok(landing.includes('href="/advisory"'));
  for (const id of ['why-choose', 'how-we-deliver', 'engagements', 'how-we-work', 'offers', 'expertise', 'services', 'contact']) {
    assert.ok(landing.includes(`id="${id}"`), `Missing published anchor: ${id}`);
  }
  for (const audience of ['For founders', 'For growing startups', 'For investors']) {
    assert.ok(landing.includes(audience), `Missing audience: ${audience}`);
  }
  assert.equal(proofCases.length, 3);
  assert.ok(landing.includes('Approximately 90 engineers'));
  assert.ok(landing.includes('100+ EC2 instances'));
  // The FAQ teaser can mention prices, and the one-off CTO Decision Review card
  // shows its own (issue #59). Nothing else above the FAQ may: no subscription
  // plans, no monthly price, no pricing section.
  const beforeFaq = landing.slice(0, landing.indexOf('id="faq"'));
  const prices = beforeFaq.match(/€[\d,]+/g) ?? [];
  assert.deepEqual(prices, ['€1,500'], `Only the Decision Review price may precede the FAQ, found ${prices}`);
  assert.ok(!/\/month|per month|2,500|6,000/.test(beforeFaq), 'Do not add a landing-page subscription section');
  const offersSection = beforeFaq.slice(beforeFaq.indexOf('id="offers"'));
  assert.ok(offersSection.includes('€1,500') && offersSection.includes('one-time'), 'The review price belongs to the offers section, as one-time');
  assert.ok(!landing.includes('buy.stripe.com'), 'Delivery must not route to checkout');
  assert.ok(landing.includes(`href="${MEDIUM_URL}"`), 'FAQ teaser must link the Medium publication');
  assert.ok(DELIVERY_ENQUIRY_EMAIL.startsWith('mailto:'));
  assert.ok(landing.includes(DELIVERY_ENQUIRY_EMAIL));
  assert.ok(advisory.includes(DELIVERY_ENQUIRY_EMAIL));
  for (const price of ['1,500', '2,500', '6,000']) assert.ok(advisory.includes(price));
  assert.ok(advisory.includes('excluding applicable taxes'));
  assert.ok(advisory.includes('before starting an engagement'));
  assert.ok(advisory.includes('before purchase'), 'Decision Review keeps its own prerequisite');
  assert.ok(advisory.includes('buy.stripe.com/test_'), 'Smoke checks must use test checkout');
  assert.ok(landing.includes('free 20-minute call'));
  assert.ok(landing.includes('calendly.com'));
  const appSource = readFileSync('src/app/App.tsx', 'utf8');
  assert.ok(!appSource.includes('ConsultationModal'));
  const { welcomeSteps } = await server.ssrLoadModule('/src/data/welcome.ts');
  const { CALENDLY_URL, ADVISORY_BOOKING_URL } = await server.ssrLoadModule('/src/data/content.ts');
  const { WelcomePage } = await server.ssrLoadModule('/src/pages/WelcomePage.tsx');
  const welcome = renderToStaticMarkup(createElement(WelcomePage));
  assert.notEqual(ADVISORY_BOOKING_URL, CALENDLY_URL, 'Paid sessions need a separate event');
  assert.equal(welcomeSteps.find(step => step.id === 'schedule-session').cta.href, ADVISORY_BOOKING_URL);
  assert.ok(welcome.includes(`href="${ADVISORY_BOOKING_URL}"`), 'Onboarding must render the paid-session link');
  assert.ok(!landing.includes(ADVISORY_BOOKING_URL), 'The paid calendar is not a prospect CTA');
  assert.ok(engagementModes.some(mode => mode.engagement === 'Technical assessment & due diligence' && mode.href === '/#offers'));
  assert.ok(engagementModes.some(mode => mode.engagement === 'CTO Advisor'));
  // A single decision goes to the one-off review, recurring advice to Advisor.
  const decisionRow = engagementModes.find(mode => /one technology decision/.test(mode.need));
  assert.equal(decisionRow?.href, '/services/cto-decision-review');
  assert.match(engagementModes.find(mode => mode.engagement === 'CTO Advisor').need, /recurring/i);
  assert.ok(landing.includes('href="/services/cto-decision-review"'), 'Homepage must link the Decision Review page');
  for (const unsupported of ['Deployments from days to minutes', 'Production AI delivered in weeks', 'measurable returns']) {
    assert.ok(!landing.includes(unsupported), `Unverified claim: ${unsupported}`);
  }
  const captureRoutes = JSON.parse(readFileSync('scripts/figma-sync/routes.json', 'utf8'));
  assert.ok(captureRoutes.find(r => r.slug === 'overlay-projects').before.includes('explore our engineering resources'));
  console.log('Positioning smoke checks passed: hero, audiences, anchors, assessment, advisory, delivery, booking and capture selector.');
} finally {
  await server.close();
}
