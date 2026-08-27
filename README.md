# UI Registry — Vectorized

Custom, accessible shadcn/ui Component Registry for Vectorized and shared projects.

## Usage

### 1. Direct installation via URL

You can add any component directly to your project using the shadcn CLI:

```bash
# Add the Vectorized switch primitive (sizes, variants, icons, loading state)
npx shadcn@latest add https://raw.githubusercontent.com/HugoAlmeidaMoreira/ui-registry-vectorized/main/public/r/switch-vectorized.json

# Add the drop-in Switch (reference skeuomorphic treatment by default)
npx shadcn@latest add https://raw.githubusercontent.com/HugoAlmeidaMoreira/ui-registry-vectorized/main/public/r/switch.json

# Or when hosted on your custom domain
npx shadcn@latest add https://ui.vectorized.pt/r/switch-vectorized.json
```

### 2. Configure as a Registry in `components.json`

Add the registry to your project's `components.json`:

```json
{
  "registries": {
    "@vectorized": "https://ui.vectorized.pt/r/{name}.json"
  }
}
```

Then install components by namespace:

```bash
npx shadcn@latest add @vectorized/switch-vectorized
npx shadcn@latest add @vectorized/switch
```

---

## Available Components

| Component | Identifier | Description |
|---|---|---|
| **Switch Vectorized** | `switch-vectorized` | Radix switch with `sm`, `md`, `lg` sizes, color variants, thumb icons, loading indicator, and the reference skeuomorphic appearance. |
| **Switch** | `switch` | Radix-backed drop-in switch with the reference skeuomorphic treatment (or compact shadcn appearance). |
| **Utils** | `utils` | Standard `cn` helper combining `clsx` and `tailwind-merge`. |

`Switch` uses the reference treatment by default. Set `appearance="default"` for the compact shadcn treatment.

---

## Development

```bash
# Install dependencies
npm install

# Start the interactive switch preview at http://localhost:2210
npm run dev

# Build registry JSONs to public/r/
npm run build

# Typecheck registry components and scripts
npm run typecheck
```

### Adding a new component

1. Create the component TSX under `registry/ui/<name>.tsx` (or `registry/hooks/`, `registry/blocks/`).
2. Add the item definition to `registry/schema.ts`.
3. Run `npm run build` to generate the corresponding `public/r/<name>.json` and update `public/r/index.json`.
4. Run `npm run typecheck` to verify types.
