# AGENTS.md — UI Registry Vectorized

The single guide for agent sessions (Claude, OpenCode, Antigravity, Hermes) in this repository.

## What this is

`ui-registry-vectorized` is the custom component registry for Vectorized applications, built on the **shadcn/ui custom registry specification**.

It hosts accessible, styled UI components, blocks, and hooks distributed directly into consuming applications via the `shadcn` CLI (`npx shadcn add ...`).

### Why this is a Registry instead of an NPM Package

1. **Zero CSS bundling conflicts**: Components adopt the consuming application's Tailwind CSS configuration and theme tokens without awkward CSS encapsulation or stylesheet fighting.
2. **First-class customizability**: Consuming projects own the resulting code in `components/ui/` and can adapt it locally when necessary.
3. **Seamless developer experience**: Uses the official `shadcn` CLI workflows already familiar to the team.

---

## Where to run things

```bash
npm run build       # tsx scripts/build-registry.ts — generates public/r/*.json
npm run typecheck   # tsc --noEmit
```

Run both before calling any non-trivial change done.

---

## Language

- **Documentation & User Interface**: English (U.S.).
- **Code Comments**: Portuguese or English, keeping maintainer intent clear.
- **Component Prop Names & TypeScript Types**: English (U.S.).

---

## Architecture & File Structure

```text
.
├── registry/
│   ├── lib/
│   │   └── utils.ts            # Local utils for registry components
│   ├── ui/
│   │   ├── custom-switch.tsx   # Custom switch primitive
│   │   └── switch.tsx          # Drop-in replacement
│   └── schema.ts               # Registry schema definitions and items list
├── scripts/
│   └── build-registry.ts       # Compiler from registry/ -> public/r/*.json
├── public/
│   └── r/
│       ├── index.json          # Complete registry catalog
│       ├── custom-switch.json  # Distribution JSON for custom-switch
│       ├── switch.json         # Distribution JSON for switch
│       └── utils.json          # Distribution JSON for utils
├── dev/
│   └── handover-2026-08-27-ui-registry.md
├── AGENTS.md
└── README.md
```

---

## Component Authoring Rules

1. **Headless & Accessible Primitives**: Base all complex interactive components on accessible headless primitives (primarily `@radix-ui/react-*` or Base UI). Maintain full WAI-ARIA compliance (`role`, `aria-*`, focus rings, keyboard navigation).
2. **Class Variance Authority (`cva`)**: Always use `cva` for component variants (sizes, visual styles, states) to provide structured type safety.
3. **Internal vs. Distribution Imports**:
   - In `registry/ui/*.tsx`, import local utilities using `@/registry/lib/utils`.
   - `scripts/build-registry.ts` automatically rewrites these paths to standard consumer paths (`@/lib/utils` and `@/components/ui/*`) during the build step.
4. **Clean Dependencies**: Explicitly declare all runtime `dependencies` and `registryDependencies` in `registry/schema.ts`.
5. **No Hardcoded Themes**: Rely on standard semantic Tailwind variables (`bg-primary`, `text-muted-foreground`, `ring-ring`, `bg-background`) so components adapt effortlessly to dark mode and custom palettes.

---

## How to Add a New Component

1. Create the component file in `registry/ui/<name>.tsx` (or `registry/hooks/`, `registry/blocks/`).
2. Add the item definition to the `registry` array in `registry/schema.ts`.
3. Run `npm run build` to compile the distribution JSONs to `public/r/`.
4. Run `npm run typecheck` to guarantee zero TypeScript errors.
