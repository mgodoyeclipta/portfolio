# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # start dev server
npm run build      # production build
npm run lint       # ESLint check
npm run lint:fix   # ESLint auto-fix
```

No test framework is configured.

## Architecture

### Single source of truth
All personal/resume data lives in **`src/data/resume.tsx`** (`DATA` export). Every section — hero, about, work, education, skills, projects, hackathons, contact — is driven by this file. To add or change content, edit only this file.

`DATA` uses `as const` at the end of the object. **Empty arrays require an explicit type cast** to avoid TypeScript inferring `readonly []` (which makes element type `never`):
```ts
// wrong — causes TS errors in consuming components
hackathons: [],

// correct
hackathons: [] as { title: string; dates: string; /* ... */ }[],
```

### Page layout
`src/app/page.tsx` is the single homepage. It renders sections inline (hero, about, education, skills) and delegates to section components for more complex rendering:
- `src/components/section/work-section.tsx`
- `src/components/section/projects-section.tsx`
- `src/components/section/hackathons-section.tsx`
- `src/components/section/contact-section.tsx`

Sections that can have zero items should return `null` early to avoid empty UI shells.

### Skill icons
Skills in `DATA.skills` take a component reference (`icon: ComponentType`). Available SVG components are in `src/components/ui/svgs/` — only add a skill icon that has a file there. To add a new tech icon, create a new `.tsx` file in that directory exporting a React SVG component.

### Blog
Blog posts are MDX files in `/content/`. The content pipeline uses **content-collections** (`content-collections.ts`) with Zod schema validation. Required frontmatter: `title`, `publishedAt`, `summary`. Optional: `updatedAt`, `author`, `image`. Routes: `/blog` (list) and `/blog/[slug]` (post).

### Styling
Tailwind CSS v4 — configured via `src/app/globals.css` using `@import "tailwindcss"` (no `tailwind.config.*` file). Theme tokens are CSS variables defined in `globals.css`. Dark mode uses `.dark` class via `next-themes`.

### Animations
`BlurFade` and `BlurFadeText` from `src/components/magicui/` handle entrance animations. The `BLUR_FADE_DELAY` constant in `page.tsx` controls stagger timing — increment delay for each successive section.
