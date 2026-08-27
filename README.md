# UI Registry — Vectorized

Custom, accessible shadcn/ui Component Registry for Vectorized and shared projects.

## Usage

### 1. Direct installation via URL

You can add any component directly to your project using the shadcn CLI:

```bash
# Add custom switch (with size variants, icons, and loading state)
npx shadcn@latest add https://raw.githubusercontent.com/HugoAlmeidaMoreira/ui-registry-vectorized/main/public/r/custom-switch.json

# Or when hosted on your custom domain
npx shadcn@latest add https://ui.vectorized.pt/r/custom-switch.json
```

### 2. Configure as a Registry in `components.json`

Add the registry to your project's `components.json`:

```json
{
  "registries": {
    "@vectorized": "https://ui.vectorized.pt/r"
  }
}
```

Then install components by namespace:

```bash
npx shadcn@latest add @vectorized/custom-switch
```

---

## Available Components

| Component | Identifier | Description |
|---|---|---|
| **Custom Switch** | `custom-switch` | Switch with `sm`, `md`, `lg` sizes, color variants, thumb icons, and loading indicator. |
| **Switch** | `switch` | Enhanced drop-in replacement for standard shadcn switch. |
| **Utils** | `utils` | Standard `cn` helper combining `clsx` and `tailwind-merge`. |

---

## Development

```bash
# Install dependencies
npm install

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
