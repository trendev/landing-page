# TRENDev — Landing Page

Marketing landing page for TRENDev Consulting (Fractional CTO, AI, Cloud,
DevOps, and Web3 consulting).

## Stack

- [React 19](https://react.dev/)
- [Vite](https://vite.dev/) (build & dev server)
- [Tailwind CSS v4](https://tailwindcss.com/) (via `@tailwindcss/vite`)
- [lucide-react](https://lucide.dev/) icons
- TypeScript

## Project structure

```
src/
  app/App.tsx        Composition root: modal state + section assembly
  components/         Section + modal components (Header, Hero, Services, …)
  data/content.ts     Page content (expertise, services, projects, FAQ, …)
  hooks/              Reusable hooks (useBodyScrollLock)
  types.ts            Shared TypeScript types
  styles/             Tailwind entry + theme tokens
```

## Scripts

```bash
npm install        # install dependencies
npm run dev        # start the dev server at http://localhost:3000
npm run typecheck  # type-check with tsc (no emit)
npm run build      # production build to ./build
```

## Deployments

- **Production** — GitHub Pages, built by `.github/workflows/deploy.yml` on
  every push to `main` (live Stripe checkout, `trendev.fr`).
- **PR previews** — Vercel, configured by `vercel.json`. Every branch other
  than `main` gets a preview URL, which the Vercel GitHub app posts on the PR.
  Vercel never deploys `main` (`git.deploymentEnabled.main: false`), so it is
  never a production host. Previews build with `VITE_STRIPE_MODE=test`, so
  their purchase CTAs point at Stripe **test** checkout.

  One-time setup: in Vercel, *Add New → Project*, import
  `trendev/landing-page`, keep the defaults (they come from `vercel.json`),
  and deploy. Optionally restrict previews with *Settings → Deployment
  Protection → Vercel Authentication*. Do not attach `trendev.fr` to the
  Vercel project.
