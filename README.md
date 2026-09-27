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

  The Vercel project is `landing-page-31rm` (team `umbratrade`). Setup, in
  the project's *Settings*:
  - *Build & Deployment → Output Directory* = `build`. `vercel.json` sets it
    too, but only on branches that carry the file; without it Vercel looks
    for Vite's default `dist` and fails with `STATIC_BUILD_NO_OUT_DIR`.
  - *Git → Ignored Build Step* = "Only build Preview deployments", the
    dashboard equivalent of `deploymentEnabled.main: false`.
  - Optional: *Deployment Protection → Vercel Authentication* on previews.
  - Never attach `trendev.fr` to the Vercel project.

  The import itself always builds `main` once as a "production" deployment.
  Until `vercel.json` is on `main`, that build fails on the missing `dist`
  folder. The failure is harmless: nothing is served from Vercel in
  production.
