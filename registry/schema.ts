export type RegistryItemType =
  | "registry:ui"
  | "registry:component"
  | "registry:example"
  | "registry:block"
  | "registry:hook"
  | "registry:lib"

export interface RegistryItemFile {
  path: string
  content?: string
  type: RegistryItemType
  target?: string
}

export interface RegistryItem {
  $schema?: string
  name: string
  type: RegistryItemType
  title?: string
  description?: string
  dependencies?: string[]
  devDependencies?: string[]
  registryDependencies?: string[]
  files: RegistryItemFile[]
  categories?: string[]
  meta?: Record<string, unknown>
}

export const registry: RegistryItem[] = [
  {
    name: "custom-switch",
    type: "registry:ui",
    title: "Custom Switch",
    description:
      "A versatile Radix switch with sm/md/lg sizes, semantic color variants, thumb icons, loading state, and the reference skeuomorphic appearance.",
    dependencies: [
      "@radix-ui/react-switch",
      "class-variance-authority",
      "clsx",
      "tailwind-merge"
    ],
    registryDependencies: ["@vectorized/utils"],
    files: [
      {
        path: "registry/ui/custom-switch.tsx",
        type: "registry:ui",
        target: "components/ui/custom-switch.tsx"
      }
    ],
    categories: ["inputs", "primitives"]
  },
  {
    name: "switch",
    type: "registry:ui",
    title: "Switch",
    description:
      "Radix-backed drop-in switch with the reference skeuomorphic treatment and an optional compact shadcn appearance.",
    dependencies: [
      "@radix-ui/react-switch",
      "class-variance-authority",
      "clsx",
      "tailwind-merge"
    ],
    registryDependencies: ["@vectorized/custom-switch"],
    files: [
      {
        path: "registry/ui/switch.tsx",
        type: "registry:ui",
        target: "components/ui/switch.tsx"
      }
    ],
    categories: ["inputs", "primitives"]
  },
  {
    name: "utils",
    type: "registry:lib",
    title: "Utils",
    description: "Standard clsx and tailwind-merge helper function.",
    dependencies: ["clsx", "tailwind-merge"],
    files: [
      {
        path: "registry/lib/utils.ts",
        type: "registry:lib",
        target: "lib/utils.ts"
      }
    ]
  }
]
