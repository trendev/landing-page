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
  const { ConsultationModal } = await server.ssrLoadModule('/src/components/modals/ConsultationModal.tsx');
  const { positioning } = await server.ssrLoadModule('/src/data/positioning.ts');
  const { engagementModes, DELIVERY_ENQUIRY_EMAIL, proofCases } = await server.ssrLoadModule('/src/data/content.ts');
  const landing = renderToStaticMarkup(createElement(LandingPage, { onOpenConsultation() {} }));
  const advisory = renderToStaticMarkup(createElement(AdvisoryPage, { onOpenConsultation() {} }));
  const consultation = renderToStaticMarkup(createElement(ConsultationModal, { onClose() {} }));

  assert.equal((landing.match(/<h1\b/g) || []).length, 1);
  assert.ok(landing.includes(positioning.hero.title));
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
  // The existing FAQ teaser can mention prices; there must be no pricing section.
  assert.ok(!landing.slice(0, landing.indexOf('id="faq"')).includes('€'), 'Do not add a landing-page pricing section');
  assert.ok(!landing.includes('buy.stripe.com'), 'Delivery must not route to checkout');
  assert.ok(DELIVERY_ENQUIRY_EMAIL.startsWith('mailto:'));
  assert.ok(landing.includes(DELIVERY_ENQUIRY_EMAIL));
  assert.ok(advisory.includes(DELIVERY_ENQUIRY_EMAIL));
  for (const price of ['1,500', '2,500', '6,000']) assert.ok(advisory.includes(price));
  assert.ok(advisory.includes('excluding applicable taxes'));
  assert.ok(advisory.includes('before subscribing'));
  assert.ok(advisory.includes('buy.stripe.com/test_'), 'Smoke checks must use test checkout');
  assert.ok(!consultation.includes('buy.stripe.com'));
  assert.ok(consultation.includes('calendly.com'));
  assert.ok(engagementModes.some(mode => mode.engagement === 'Technical assessment & due diligence' && mode.href === '/#offers'));
  assert.ok(engagementModes.some(mode => mode.engagement === 'CTO Advisor'));
  for (const unsupported of ['Deployments from days to minutes', 'Production AI delivered in weeks', 'measurable returns']) {
    assert.ok(!landing.includes(unsupported), `Unverified claim: ${unsupported}`);
  }
  const captureRoutes = JSON.parse(readFileSync('scripts/figma-sync/routes.json', 'utf8'));
  assert.ok(captureRoutes.find(r => r.slug === 'overlay-projects').before.includes('explore our engineering resources'));
  console.log('Positioning smoke checks passed: hero, audiences, anchors, assessment, advisory, delivery, booking and capture selector.');
} finally {
  await server.close();
}
