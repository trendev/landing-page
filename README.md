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
