/**
 * Offer and contract invariants (issue #59, CTO Decision Review). Dependency
 * free, like check-positioning.mjs: modules are loaded through Vite's SSR
 * loader and pages rendered with React's static renderer. Run by `npm test`.
 *
 * What this protects is commercial and contractual, not visual: frozen prices,
 * a comparison whose columns cannot shift, a one-off offer that is never
 * described as monthly, a one-off checkout that is the only one on the landing
 * page and keeps the recommended call beside it, and service
 * descriptions that stay word for word identical to the Terms annexes.
 */
import assert from 'node:assert/strict';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer } from 'vite';

process.env.VITE_STRIPE_MODE = 'test';
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
const load = (path) => server.ssrLoadModule(path);
const render = (component, props = {}) => renderToStaticMarkup(createElement(component, props));

const DR = 'cto-decision-review';
const MONTHLY_PATTERN = /\/month|per month|a month|monthly|4h\/month|8 hours|eight hours|renew(s|al)? (each|every)/i;
/** Denials ("it is not a monthly allowance") are the point, not a leak. */
const MONTHLY_WORDING = {
  test: (text) => MONTHLY_PATTERN.test(text.replace(/not a monthly (allowance|subscription)/gi, '')),
};

/** issue #13's comparison, as published before issue #59, keyed by label. */
const FROZEN_COLUMNS = {
  Price: ['€1,500/month', '€2,500/month', 'from €6,000/month'],
  Capacity: ['up to 4h/month', 'up to 8h/month', 'tailored / reserved days'],
  'Strategic sessions': ['typically 2/month', 'weekly or biweekly', 'embedded cadence'],
  'Async advisory': [true, '✓ priority', true],
  'Architecture / roadmap': ['review', 'deeper review', 'ownership / governance'],
  'Quarterly Technology Review': [false, '✓ within capacity', '✓ as required'],
  'Engineering organisation': ['advice', 'deeper involvement', 'ownership / execution'],
  'Board / investor': ['occasional prep', true, true],
  'DD / high-stakes': [false, 'limited preparation', true],
  'Operational ownership': [false, false, '✓ when scoped'],
  'Hands-on execution': [false, false, '✓ when scoped'],
  // Renamed from "Subscription" by issue #59; the values did not move.
  'Billing / subscription': ['monthly', 'monthly', 'tailored agreement'],
  'Cancel anytime': [true, true, 'per scoped engagement'],
  Rollover: [false, false, 'per agreement'],
};

/** Every FAQ id published before issue #59. Ids are permanent URLs. */
const PUBLISHED_FAQ_IDS = `what-does-a-cto-do cto-vs-cpo what-is-a-cpto cto-vs-vp-eng-vs-em
cto-vs-architect-vs-tech-lead do-we-need-a-cto-yet full-time-vs-fractional-cto
what-a-fractional-cto-does-not-do how-the-engagement-runs will-you-write-code
can-you-deliver-a-project working-with-your-team we-already-have-a-cto ip-and-confidentiality
remote-or-on-site how-do-we-know-it-is-working what-is-docker what-is-kubernetes
do-we-need-kubernetes monolith-or-microservices cloud-costs technical-debt ai-readiness
how-much-security when-blockchain-makes-sense quarterly-technology-review
difference-between-plans what-advisory-capacity-means which-plan-fits-us why-consultation-first
can-i-switch-plans more-than-the-plan-includes how-billing-works how-vat-is-handled
where-are-my-invoices how-do-i-cancel what-happens-when-i-cancel if-the-provider-is-unavailable
change-payment-method just-subscribed-what-now find-my-welcome-page where-is-my-receipt
book-the-first-session prepare-for-the-first-session reach-you-between-sessions`.split(/\s+/);

const DECISION_REVIEW_FAQ_IDS = [
  'what-is-cto-decision-review',
  'decision-review-vs-advisor',
  'decision-review-more-than-four-hours',
  'what-does-decision-review-deliver',
];

/** A section's contract wording, ignoring ids (annex ids carry a prefix). */
const wording = ({ heading, paragraphs, bullets }) => ({ heading, paragraphs, bullets });
const textOf = (value) => JSON.stringify(value);

const results = [];
async function test(name, fn) {
  try {
    await fn();
    results.push(['ok', name]);
  } catch (error) {
    results.push(['FAIL', name, error]);
  }
}

try {
  const pricing = await load('/src/data/pricing.ts');
  const { serviceDescriptions } = await load('/src/data/serviceDescriptions.ts');
  const { tierService } = await load('/src/lib/structuredData.ts');
  const { faqEntries } = await load('/src/data/faq.ts');
  const stripe = await load('/src/data/stripe.ts');
  const content = await load('/src/data/content.ts');
  const terms = await load('/src/data/terms/index.ts');
  const { termsV20260901: v10 } = await load('/src/data/terms/2026-09-01.ts');
  const { termsV20261110: v11 } = await load('/src/data/terms/2026-11-10.ts');
  const { pricingTiers, comparisonRows } = pricing;
  const tier = (id) => pricingTiers.find((candidate) => candidate.id === id);
  const decisionReview = serviceDescriptions.find((service) => service.slug === DR);

  await test('four offers, Decision Review first, frozen prices and billing modes', () => {
    assert.deepEqual(
      pricingTiers.map(({ id, price, priceSuffix, billing }) => [id, price, priceSuffix, billing]),
      [
        [DR, '€1,500', ' one-time', 'one-time'],
        ['cto-advisor', '€1,500', '/month', 'monthly'],
        ['cto-advisor-plus', '€2,500', '/month', 'monthly'],
        ['fractional-cto', 'From €6,000', '/month', 'tailored'],
      ],
    );
    for (const offer of pricingTiers) assert.equal(offer.taxNote, 'excluding applicable taxes');
    assert.equal(tier('fractional-cto').cta.kind, 'contact', 'Fractional CTO stays contact-only');
    assert.equal(tier(DR).cta.kind, 'checkout', 'Decision Review is bought by direct checkout (owner decision, 2026-11-10)');
    assert.equal(tier(DR).cta.label, 'Get your Decision Review');
    assert.equal(tier(DR).badge, 'Best way to start');
    assert.ok(!tier(DR).recommended, 'Advisor+ stays the recommended tier');
    assert.ok(tier('cto-advisor-plus').recommended);
  });

  await test('every comparison row has a value for every offer, and no column moved', () => {
    const ids = pricingTiers.map((offer) => offer.id).sort();
    for (const row of comparisonRows) {
      assert.deepEqual(Object.keys(row.values).sort(), ids, `${row.label}: one value per offer`);
    }
    for (const [label, frozen] of Object.entries(FROZEN_COLUMNS)) {
      const row = comparisonRows.find((candidate) => candidate.label === label);
      assert.ok(row, `Comparison lost the "${label}" row`);
      assert.deepEqual(
        [row.values['cto-advisor'], row.values['cto-advisor-plus'], row.values['fractional-cto']],
        frozen,
        `${label}: the existing offers' values must not change`,
      );
    }
    for (const label of ['Best for', 'Written output', 'First step']) {
      assert.ok(comparisonRows.some((row) => row.label === label), `Missing row: ${label}`);
    }
    const price = comparisonRows.find((row) => row.label === 'Price').values[DR];
    const capacity = comparisonRows.find((row) => row.label === 'Capacity').values[DR];
    assert.equal(price, '€1,500 one-time');
    assert.match(capacity, /^up to 4h total/);
    for (const row of comparisonRows) {
      assert.ok(!MONTHLY_WORDING.test(String(row.values[DR])), `${row.label}: Decision Review reads as monthly`);
    }
  });

  await test('four hours is a total, never a monthly allowance', () => {
    const copy = [
      textOf(tier(DR)),
      textOf(decisionReview.sections),
      decisionReview.metaDescription,
      pricing.DECISION_REVIEW_SUMMARY,
      pricing.DECISION_REVIEW_PREREQUISITE_NOTE,
      pricing.DECISION_REVIEW_BOUNDARY_NOTE,
      ...faqEntries
        .filter((entry) => DECISION_REVIEW_FAQ_IDS.includes(entry.id) && entry.id !== 'decision-review-vs-advisor')
        .map(textOf),
    ];
    for (const text of copy) assert.ok(!MONTHLY_WORDING.test(text), `Monthly wording in: ${text.slice(0, 120)}`);
    assert.ok(tier(DR).features.includes('Up to 4 hours total, including preparation and documentation.'));
    assert.ok(textOf(decisionReview.sections).includes('up to 4 hours of work in total'));
    // The one entry that names Advisor's monthly hours must say which is which.
    const versus = textOf(faqEntries.find((entry) => entry.id === 'decision-review-vs-advisor'));
    assert.ok(versus.includes('**in total**') && versus.includes('**per month**'));
  });

  await test('prerequisite wording: shared for the subscriptions, "recommended" for the review', () => {
    assert.equal(pricing.PREREQUISITE_NOTE, 'Prerequisite: a free 20-minute introductory call before starting an engagement.');
    assert.match(pricing.DECISION_REVIEW_PREREQUISITE_NOTE, /^Recommended: a free 20-minute introductory call before purchase/);
    assert.match(pricing.DECISION_REVIEW_PREREQUISITE_NOTE, /You can also buy directly: we then agree the question in writing before any work starts\.$/);
    const first = comparisonRows.find((row) => row.label === 'First step');
    assert.equal(first.values[DR], 'free 20-minute introductory call, recommended');
    for (const id of ['cto-advisor', 'cto-advisor-plus', 'fractional-cto']) {
      assert.equal(first.values[id], 'free 20-minute introductory call');
    }
  });

  await test('JSON-LD: the review is one-time, the subscriptions stay monthly, all VAT-exclusive', () => {
    const review = tierService(tier(DR));
    assert.equal(review.offers.price, 1500);
    assert.equal(review.offers.priceSpecification['@type'], 'PriceSpecification');
    assert.equal(review.offers.priceSpecification.valueAddedTaxIncluded, false);
    assert.ok(!('unitCode' in review.offers.priceSpecification), 'A one-time price has no billing unit');
    assert.ok(!/month/i.test(JSON.stringify(review)), 'Decision Review JSON-LD mentions a month');
    for (const id of ['cto-advisor', 'cto-advisor-plus', 'fractional-cto']) {
      const spec = tierService(tier(id)).offers.priceSpecification;
      assert.equal(spec.unitCode, 'MON', `${id} keeps its monthly unit`);
      assert.equal(spec.valueAddedTaxIncluded, false);
    }
    assert.equal(tierService(tier('fractional-cto')).offers.priceSpecification.minPrice, 6000);
  });

  await test('the Decision Review is bought by direct checkout, with the call beside it', async () => {
    const { LandingPage } = await load('/src/pages/LandingPage.tsx');
    const { AdvisoryPage } = await load('/src/pages/AdvisoryPage.tsx');
    const { ServicePage } = await load('/src/pages/ServicePage.tsx');
    const props = { onOpenConsultation() {} };
    const pages = {
      landing: render(LandingPage, props),
      advisory: render(AdvisoryPage, props),
      service: render(ServicePage, { ...props, slug: DR }),
    };
    const reviewLink = stripe.STRIPE_PAYMENT_LINKS[DR];
    assert.match(reviewLink, /^https:\/\/buy\.stripe\.com\/test_/);
    for (const [name, html] of Object.entries(pages)) {
      assert.ok(html.includes(`href="${reviewLink}"`), `${name} lacks the Decision Review checkout`);
    }
    // The landing page has no subscription checkout: the review is its only one.
    const landingCheckouts = [...new Set(pages.landing.match(/https:\/\/buy\.stripe\.com\/[^"]+/g))];
    assert.deepEqual(landingCheckouts, [reviewLink]);
    // Advisor checkout itself is untouched: /advisory still links test checkout.
    assert.ok(pages.advisory.includes(stripe.STRIPE_PAYMENT_LINKS['cto-advisor']));
    for (const html of [pages.landing, pages.service]) {
      assert.ok(html.includes('Get your Decision Review'));
      assert.ok(html.includes('Book a free 20-minute call first'), 'The recommended call stays beside the purchase button');
      assert.ok(html.includes('Recommended: a free 20-minute introductory call before purchase'));
      assert.ok(!html.includes(content.ADVISORY_BOOKING_URL), 'The paid-session calendar is not a prospect CTA');
    }
    assert.ok(pages.service.includes('€1,500') && pages.service.includes('one-time'));
    assert.ok(pages.service.includes('Compare the four engagements'));
    assert.ok(pages.advisory.includes('Compare the four engagements'));
    assert.equal((pages.service.match(/<h1\b/g) || []).length, 1);
    const { readFileSync } = await import('node:fs');
    assert.ok(readFileSync('src/app/App.tsx', 'utf8').includes('window.location.assign(CALENDLY_URL)'));
  });

  await test('the comparison renders the same data on desktop and mobile', async () => {
    const { ComparisonTable } = await load('/src/components/ComparisonTable.tsx');
    const html = render(ComparisonTable);
    const [mobile, desktop] = html.split('<table');
    for (const row of comparisonRows) {
      for (const [id, value] of Object.entries(row.values)) {
        if (typeof value !== 'string') continue;
        const escaped = value.replace(/&/g, '&amp;');
        assert.ok(mobile.includes(escaped), `mobile cards miss ${row.label} / ${id}`);
        assert.ok(desktop.includes(escaped), `desktop table misses ${row.label} / ${id}`);
      }
    }
    assert.equal((desktop.match(/<th[^>]*scope|<th\b/g) || []).length, comparisonRows.length + pricingTiers.length + 1);
  });

  await test('annex parity: A/B/C of Terms v1.1 match the service descriptions; A/B match v1.0', () => {
    const annex = (version, label) => version.sections.find((section) => section.label === label);
    const pairs = [['Annex A', 'cto-advisor'], ['Annex B', 'cto-advisor-plus'], ['Annex C', DR]];
    for (const [label, slug] of pairs) {
      const service = serviceDescriptions.find((candidate) => candidate.slug === slug);
      assert.deepEqual(
        annex(v11, label).subsections.map(wording),
        service.sections.map(wording),
        `${label} of v1.1 diverges from /services/${slug}`,
      );
    }
    for (const label of ['Annex A', 'Annex B']) {
      assert.deepEqual(
        annex(v11, label).subsections,
        annex(v10, label).subsections,
        `${label} must be byte-identical between v1.0 and v1.1`,
      );
    }
    assert.equal(decisionReview.version, '1.0');
    assert.equal(decisionReview.effectiveDate, v11.effectiveDate);
  });

  await test('Terms v1.1 is current and covers the review as one-off; v1.0 is superseded only', () => {
    assert.equal(v10.status, 'superseded');
    assert.equal(v10.version, '1.0');
    assert.equal(v11.status, 'effective');
    assert.equal(terms.currentTermsDate, '2026-11-10');
    // A draft still never becomes current.
    assert.ok(terms.termsVersionSummaries.every((entry) => entry.status !== 'draft' || entry.date !== terms.currentTermsDate));
    const summary = terms.termsVersionSummaries.find((entry) => entry.date === v11.effectiveDate);
    assert.deepEqual([summary.version, summary.status], [v11.version, v11.status]);
    assert.ok(textOf(v11.sections[0]).includes('CTO Decision Review one-off service'));
    const s15 = v11.sections.find((section) => section.number === 15);
    assert.ok(textOf(s15).includes('up to four (4) hours of work in total'));
    assert.ok(textOf(s15).includes('Sections 4 and 7'), 'Monthly mechanics must be switched off for the review');
    assert.ok(!textOf(v11.sections[0]).includes('Fractional CTO engagements are governed by these Terms'));
    // Direct purchase is allowed, so the call cannot be a condition of the contract.
    assert.ok(textOf(s15).includes('recommended but not required'));
    assert.ok(textOf(s15).includes('confirmed in writing before any work starts'));
  });

  await test('one-off onboarding: no paid-session calendar, no billing portal', async () => {
    const welcome = await load('/src/data/welcome.ts');
    const { WelcomePage } = await load('/src/pages/WelcomePage.tsx');
    const html = render(WelcomePage, { variant: 'decision-review' });
    assert.ok(!html.includes(content.ADVISORY_BOOKING_URL), 'One-off buyers must not get the subscriber calendar');
    assert.ok(!html.includes('billing.stripe.com'), 'No plan to manage after a one-off payment');
    assert.ok(!html.includes('working session'));
    assert.ok(html.includes('walkthrough') && html.includes('agreed documents'));
    assert.ok(!MONTHLY_WORDING.test(textOf(welcome.decisionReviewSteps)));
    const subscriber = render(WelcomePage);
    assert.ok(subscriber.includes(content.ADVISORY_BOOKING_URL), 'Subscriber onboarding is unchanged');
    const { matchRoute } = await load('/src/app/router.tsx');
    assert.deepEqual(matchRoute('/welcome/decision-review'), { kind: 'welcome', variant: 'decision-review' });
    const { staticRoutes } = await load('/src/app/staticRoutes.ts');
    for (const path of ['/services/cto-decision-review', '/welcome/decision-review', '/terms/2026-11-10']) {
      assert.ok(staticRoutes.includes(path), `${path} is not prerendered`);
    }
  });

  await test('FAQ: every published id survives, the four review entries exist and link validly', () => {
    const ids = new Set(faqEntries.map((entry) => entry.id));
    for (const id of PUBLISHED_FAQ_IDS) assert.ok(ids.has(id), `Published FAQ id removed: ${id}`);
    for (const id of DECISION_REVIEW_FAQ_IDS) assert.ok(ids.has(id), `Missing FAQ entry: ${id}`);
    assert.equal(ids.size, faqEntries.length, 'Duplicate FAQ id');
    for (const entry of faqEntries) {
      for (const related of entry.related ?? []) assert.ok(ids.has(related), `${entry.id} links unknown ${related}`);
    }
    const consultation = textOf(faqEntries.find((entry) => entry.id === 'why-consultation-first'));
    assert.ok(consultation.includes('not a free audit'), 'The required call is not a free assessment');
    assert.equal(faqEntries.filter((entry) => entry.featured).length, 4);
  });
} finally {
  await server.close();
}

for (const [status, name, error] of results) {
  console.log(`${status === 'ok' ? '✓' : '✗'} ${name}`);
  if (error) console.log(`  ${error.message.split('\n').join('\n  ')}`);
}
const failed = results.filter(([status]) => status !== 'ok').length;
console.log(failed ? `\n${failed} of ${results.length} offer checks failed.` : `\nOffer checks passed: ${results.length}.`);
process.exit(failed ? 1 : 0);
