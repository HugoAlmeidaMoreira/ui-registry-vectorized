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
      "A versatile switch control with sizes (sm, md, lg), color variants, thumb icons, and loading state.",
    dependencies: [
      "@radix-ui/react-switch",
      "class-variance-authority",
      "clsx",
      "tailwind-merge"
    ],
    registryDependencies: ["utils"],
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
      "Enhanced drop-in replacement for the default shadcn switch component.",
    dependencies: [
      "@radix-ui/react-switch",
      "class-variance-authority",
      "clsx",
      "tailwind-merge"
    ],
    registryDependencies: ["custom-switch"],
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
