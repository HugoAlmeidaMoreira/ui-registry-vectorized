import fs from "node:fs"
import path from "node:path"
import { registry, type RegistryItem } from "../registry/schema"

const REGISTRY_SCHEMA_URL = "https://ui.shadcn.com/schema/registry-item.json"
const OUTPUT_DIR = path.join(process.cwd(), "public/r")

function transformImports(content: string): string {
  // Convert registry-internal alias paths to standard shadcn consumer paths
  return content
    .replace(/@\/registry\/lib\/utils/g, "@/lib/utils")
    .replace(/@\/registry\/ui\//g, "@/components/ui/")
}

async function buildRegistry() {
  console.log("🚀 Building shadcn custom registry...")

  // Ensure public/r directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true })
  }

  const generatedItems: RegistryItem[] = []

  for (const item of registry) {
    const itemWithContent: RegistryItem = {
      $schema: REGISTRY_SCHEMA_URL,
      ...item,
      files: item.files.map((file) => {
        const filePath = path.join(process.cwd(), file.path)
        if (!fs.existsSync(filePath)) {
          throw new Error(`File not found: ${filePath} for item ${item.name}`)
        }

        const rawContent = fs.readFileSync(filePath, "utf8")
        const processedContent = transformImports(rawContent)

        return {
          ...file,
          content: processedContent,
        }
      }),
    }

    const itemJsonPath = path.join(OUTPUT_DIR, `${item.name}.json`)
    fs.writeFileSync(itemJsonPath, JSON.stringify(itemWithContent, null, 2), "utf8")
    console.log(`  ✓ Generated: public/r/${item.name}.json`)

    generatedItems.push(itemWithContent)
  }

  // Generate full index.json
  const indexPath = path.join(OUTPUT_DIR, "index.json")
  fs.writeFileSync(
    indexPath,
    JSON.stringify(
      {
        $schema: REGISTRY_SCHEMA_URL,
        name: "ui-registry-vectorized",
        homepage: "https://github.com/HugoAlmeidaMoreira/ui-registry-vectorized",
        items: generatedItems.map(({ files: _, ...rest }) => rest),
      },
      null,
      2
    ),
    "utf8"
  )
  console.log(`  ✓ Generated: public/r/index.json (Catalog)`)

  console.log(`✨ Successfully generated ${generatedItems.length} registry items!`)
}

buildRegistry().catch((err) => {
  console.error("❌ Registry build failed:", err)
  process.exit(1)
})
