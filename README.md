# my-vite-template

React 19 + TypeScript + Vite 8, with React Compiler and Oxlint.
No router, no UI kit, no state library — add only what the project needs.

## Requirements

Node **20.19+** or **22.12+**

## Start a new project

```bash
npx degit <your-username>/my-vite-template my-app
cd my-app
npm install
npm run dev
```

`degit` copies the files without the template's git history.
Using `git clone` instead? Delete the old history first:

```bash
git clone https://github.com/<your-username>/my-vite-template.git my-app
cd my-app
rm -rf .git                        # PowerShell: Remove-Item -Recurse -Force .git
git init
```

Then rename the project in two places:

- `package.json` → `"name"`
- `index.html` → `<title>`

## Scripts

| Command             | What it does                        |
| ------------------- | ----------------------------------- |
| `npm run dev`       | Dev server at http://localhost:5173 |
| `npm run build`     | Type-check + production build → `dist/` |
| `npm run preview`   | Serve the `dist/` build locally     |
| `npm run lint`      | Oxlint                              |
| `npm run typecheck` | TypeScript only                     |

## Structure

```
src/
├── assets/                  images, fonts
├── ts/
│   ├── main.tsx             entry
│   ├── App.tsx              root, loads reset.css
│   └── env.d.ts             types for .env variables
└── tools/
    ├── components/          Home.tsx …
    ├── css/                 reset.css (reset + theme), home.css …
    └── hooks/
        ├── GET/             useGet<Thing>.ts   — fetch data
        ├── POST/            usePost<Thing>.ts  — send data
        └── LOCAL/           browser-only (theme, shortcuts …)
```

## Conventions

**Components** — one file per component in `tools/components`, default export.

**CSS** — one file per component, same name in lowercase.
Class names are prefixed with the component: `home-container`, `home-menu`, `home-item`.

**Hooks** — sorted by HTTP method. Each returns its data plus `loading` and `error`.

**Theme** — colors live as variables in `reset.css` under `:root` and `:root[data-theme='dark']`.
Always use `var(--bg)`, `var(--text)`, `var(--accent)` … never hard-coded colors.
Toggle with `useTheme()` or `Ctrl+J`. The choice is saved and applied before first paint.

**Shortcuts** — `useShortcuts({ 'ctrl+k': open, escape: close })`.
Ignored while typing in inputs. `ctrl` also matches `Cmd` on Mac.

**Memoization** — React Compiler handles it. Skip `useMemo` / `useCallback`.

## Add a page

1. `src/tools/components/About.tsx`
2. `src/tools/css/about.css` → classes `about-container`, `about-…`
3. `import '../css/about.css'` at the top of the component
4. Render it from `App.tsx`

## Environment

`.env` holds the API base URL used by the hooks:

```
VITE_API_URL=https://jsonplaceholder.typicode.com
```

Put personal or secret values in `.env.local` (git-ignored).
Only variables starting with `VITE_` reach the browser — never put real secrets there.
Add new variables to `src/ts/env.d.ts` to get autocomplete.

## Deploy

`npm run build`, then upload `dist/`.
Vercel / Netlify / Cloudflare Pages detect Vite automatically:
build command `npm run build`, output folder `dist`.
