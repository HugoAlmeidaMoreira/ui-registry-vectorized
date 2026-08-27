import * as React from "react"
import { createRoot } from "react-dom/client"
import { Switch } from "../registry/ui/switch"
import "./styles.css"

type GeometryPiece = {
  name: string
  dimensions: string
  note: string
  shape: React.ReactNode
}

const geometryPieces: GeometryPiece[] = [
  {
    name: "Outer rim",
    dimensions: "164 × 84",
    note: "The outermost pseudo-element behind the shell.",
    shape: (
      <div
        aria-hidden="true"
        style={{
          width: 164,
          height: 84,
          borderRadius: 42,
          background: "linear-gradient(to bottom, #969494, #fff)",
        }}
      />
    ),
  },
  {
    name: "Outer shell",
    dimensions: "160 × 80",
    note: "The visible switch body above the rim.",
    shape: (
      <div
        aria-hidden="true"
        style={{
          width: 160,
          height: 80,
          borderRadius: 40,
          background: "linear-gradient(to bottom, #9e9e9e 30%, #f4f4f4)",
          boxShadow: "0 2px 0 0 #fff, 0 -2px 0 0 #969494",
        }}
      />
    ),
  },
  {
    name: "Trail frame",
    dimensions: "120 × 50 · radius 25",
    note: "The outer trail with rounded ends.",
    shape: (
      <div
        aria-hidden="true"
        style={{
          width: 120,
          height: 50,
          padding: 2,
          boxSizing: "border-box",
          borderRadius: 25,
          background: "linear-gradient(to bottom, #8b8c8e 20%, #f4f4f4)",
        }}
      />
    ),
  },
  {
    name: "Trail fill (off)",
    dimensions: "116 × 46 · radius 23",
    note: "The inactive fill inside the trail frame.",
    shape: (
      <div
        aria-hidden="true"
        style={{
          width: 116,
          height: 46,
          borderRadius: 23,
          background: "#828080",
          boxShadow: "inset 0 0 30px 0 rgba(0, 0, 0, 0.8)",
        }}
      />
    ),
  },
  {
    name: "Trail fill (on)",
    dimensions: "116 × 46 · radius 23",
    note: "The active fill inside the trail frame.",
    shape: (
      <div
        aria-hidden="true"
        style={{
          width: 116,
          height: 46,
          borderRadius: 23,
          background: "#f7931e",
          boxShadow: "inset 0 0 30px 0 rgba(0, 0, 0, 0.6)",
        }}
      />
    ),
  },
  {
    name: "Thumb body",
    dimensions: "60 × 60 · radius 30",
    note: "The moving thumb, including its drop shadow.",
    shape: (
      <div
        aria-hidden="true"
        style={{
          width: 60,
          height: 60,
          borderRadius: 30,
          background: "linear-gradient(to top, #9e9e9e 20%, #f4f4f4)",
          boxShadow: "0 5px 10px 0 rgba(0, 0, 0, 0.7)",
        }}
      />
    ),
  },
  {
    name: "Thumb inset",
    dimensions: "52 × 52 · radius 26",
    note: "The inset circle inside the thumb.",
    shape: (
      <div
        aria-hidden="true"
        style={{
          width: 52,
          height: 52,
          borderRadius: 26,
          background: "#d5d4d4",
        }}
      />
    ),
  },
]

function GeometryPieceCard({ piece, index }: { piece: GeometryPiece; index: number }) {
  return (
    <li className="rounded-xl border border-border bg-card p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-semibold">{piece.name}</h3>
            <code className="shrink-0 rounded bg-muted px-2 py-1 text-xs text-muted-foreground">
              {piece.dimensions}
            </code>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{piece.note}</p>
        </div>
      </div>
      <div className="mt-4 flex min-h-[140px] items-center justify-center overflow-auto rounded-lg bg-[#dbdbdb] p-4">
        {piece.shape}
      </div>
    </li>
  )
}

function App() {
  const [checked, setChecked] = React.useState(true)
  const [loading, setLoading] = React.useState(false)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto flex max-w-5xl flex-col gap-8 px-6 py-12 sm:px-10">
        <header className="flex flex-col gap-3">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            Vectorized UI Registry
          </p>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Switch preview</h1>
              <p className="mt-2 max-w-2xl text-muted-foreground">
                A live playground for the Radix-backed switch adapted from the landing reference.
              </p>
            </div>
            <code className="w-fit rounded-md border bg-card px-3 py-2 text-sm text-muted-foreground">
              npm run dev · :2210
            </code>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(260px,0.75fr)]">
          <article className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold">Reference treatment</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Click the control or press Space/Enter while focused.
                </p>
              </div>
              <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                {checked ? "checked" : "unchecked"}
              </span>
            </div>

            <div className="flex min-h-[220px] items-center justify-center rounded-xl bg-[#dbdbdb] p-6">
              <Switch
                checked={checked}
                onCheckedChange={setChecked}
                aria-label="Reference feature switch"
              />
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <code className="rounded bg-muted px-2 py-1">&lt;Switch /&gt;</code>
            </div>
          </article>

          <aside className="flex flex-col gap-6">
            <article className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold">Loading state</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Radix interaction is disabled while loading.
                  </p>
                </div>
                <Switch loading={loading} defaultChecked aria-label="Loading example" />
              </div>
              <button
                type="button"
                className="mt-5 rounded-md border border-border px-3 py-2 text-sm font-medium transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                onClick={() => setLoading((value) => !value)}
              >
                {loading ? "Stop loading" : "Show loading"}
              </button>
            </article>
          </aside>
        </section>

        <section className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold">Geometry breakdown</h2>
              <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
                Each reference piece is isolated below so you can identify the exact element that
                needs adjustment.
              </p>
            </div>
            <code className="rounded bg-muted px-2 py-1 text-xs text-muted-foreground">
              reference units · 160 × 80
            </code>
          </div>

          <ol className="mt-6 flex flex-col gap-4">
            {geometryPieces.map((piece, index) => (
              <GeometryPieceCard key={piece.name} piece={piece} index={index} />
            ))}
          </ol>
        </section>

        <footer className="rounded-2xl border border-dashed border-border bg-card/60 p-5 text-sm text-muted-foreground">
          <p>
            The preview imports the source directly from <code>registry/ui/switch.tsx</code>. Edit
            the component, save, and Vite will refresh this page automatically.
          </p>
        </footer>
      </main>
    </div>
  )
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
