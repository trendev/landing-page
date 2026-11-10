# TRENDev product icon family v1

Created 10 November 2026 from the supplied TRENDev TD logo and approved product-icon direction. These assets accompany the CTO Decision Review launch in issue #59 and the product-icon integration issue.

## Product mapping

| Product ID | Name | Visual distinction | Stripe live product |
| --- | --- | --- | --- |
| `cto-decision-review` | CTO Decision Review | Teal TD; white checkmark badge | `prod_VbQBhxpb4VHolf` |
| `cto-advisor` | CTO Advisor | Blue TD; white conversation badge | `prod_V80RH9BxsV3GmJ` |
| `cto-advisor-plus` | CTO Advisor+ | Violet TD; white plus badge | `prod_V80RKd2qiyatRS` |
| `fractional-cto` | Fractional CTO | Amber TD; white leadership/organisation badge | No matching active catalog product found; contact-only engagement |

The badge identifies the service. A checkmark does not mean that a customer's proposal is approved; the plus is part of the Advisor+ identity; amber does not imply guaranteed availability or an additional self-service subscription.

## Assets

Four original RGB PNGs, **1254 × 1254 pixels**, opaque dark-navy background. Preserve the entire square, including the lower-right badge. They are raster assets, not SVG files.

- [cto-decision-review-v1.png](../public/images/products/cto-decision-review-v1.png): 1166794 bytes; SHA-256 `285a40f74e8d31872a1b9f79e98522adc7d6006e67ae8c7a47ddd01496bcbd16`.
- [cto-advisor-v1.png](../public/images/products/cto-advisor-v1.png): 1164189 bytes; SHA-256 `4ea4ba486d5a5b57842e6234466ce35775a70fada15e1a18dd5723d6e0b5c789`.
- [cto-advisor-plus-v1.png](../public/images/products/cto-advisor-plus-v1.png): 1170179 bytes; SHA-256 `d8426ab4224de8f6b48af35e4c7b400cd7f1a1dcbdde406f81578610627cd2d1`.
- [fractional-cto-v1.png](../public/images/products/fractional-cto-v1.png): 1156027 bytes; SHA-256 `f42c0a11e47b238edbef1636932f92cb9f66cf2b45950cb0cdc0080824a08a75`.

Use the same artwork on the site and its corresponding Stripe Product. Keep image paths keyed by the stable product ID, not by array order or price: Decision Review and Advisor both start at €1,500 but have different billing and scope.

## Implementation handoff

- Show beside the product name on homepage engagement selectors, the new Decision Review promotion, /advisory cards and comparison headers, mobile comparison cards, and service pages.
- Suggested sizes: 48–64 CSS px on cards/selectors; 32–40 px in dense comparison headers; 64–80 px on service pages. Keep the name visible.
- Preserve aspect ratio with object-fit: contain; reserve width/height to prevent layout shift; do not crop into a circle or omit the product badge.
- When adjacent to the product name, use empty alt text so the name is not announced twice; if the image is the only label, give the link its full product name.
- Do not ship all four 1.1 MB masters as tiny list thumbnails. Derive optimised small assets from these masters during implementation, preserving colour, geometry and badge. Keep the masters as the source.
- Do not replace the site-wide TRENDev logo/favicon/Organization logo.
- Do not change prices, commercial scope, terms or booking behaviour as part of the icon work.
- The introductory CTA goes directly to CALENDLY_URL (the removed consultation modal must not be restored). The free 20-minute prerequisite remains visible.
- Fractional CTO remains contact-only; no Payment Link or new fixed-price subscription is implied by this icon.
- Use publicly retrievable, stable HTTPS PNG image URLs for Stripe. Never use a local workspace path, expiring signed link, authenticated private GitHub URL or SVG-only asset.
- Coordinate integration with issue #59. These files alone do not add icons to the page.

The asset branch contains only these four images and this handoff document. No application code or deployment configuration is changed.
