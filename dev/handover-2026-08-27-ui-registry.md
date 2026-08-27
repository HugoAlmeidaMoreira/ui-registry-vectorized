# Handover — Criação do UI Registry Vectorized

**2026-08-27.** Sessão de inicialização e estruturação do repositório `ui-registry-vectorized`.

Este repositório serve como o **Custom Registry do shadcn/ui** para os projetos do ecossistema Vectorized (e.g. `centops-vectorized`, `home-vectorized`, `vectorized-business`, `vectorized-gestao-clinica`) e para partilha pública ou interna de componentes customizados.

---

## 1. Porque é que isto existe

Surgiu da necessidade de criar e partilhar versões próprias de componentes shadcn/ui (iniciando com o `CustomSwitch`), com variantes e comportamentos que o shadcn vanilla não traz por defeito (múltiplos tamanhos, ícones dinâmicos no thumb, variantes semânticas de cor, estado de loading com spinner).

Em vez de empacotar como uma biblioteca NPM tradicional (que traz atritos de compilação de CSS, duplicação de runtime de Tailwind e perda de flexibilidade local), optou-se pela especificação oficial de **Custom Registry do shadcn**:
- O código do componente é copiado diretamente para o projeto que o consome (`components/ui/`).
- O componente herda o tema Tailwind e as variáveis CSS (`primary`, `ring`, `background`, etc.) do projeto hospedeiro sem conflitos de estilos.
- A instalação é feita através do comando padrão `npx shadcn add <url-ou-namespace>`.

---

## 2. O que foi construído e verificado

### Estrutura do Repositório

```text
ui-registry-vectorized/
├── registry/
│   ├── lib/
│   │   └── utils.ts            # Utilitário cn (clsx + tailwind-merge)
│   ├── ui/
│   │   ├── custom-switch.tsx   # Componente CustomSwitch avançado
│   │   └── switch.tsx          # Re-export de compatibilidade / drop-in
│   └── schema.ts               # Definição e catálogo dos itens do registry
├── scripts/
│   └── build-registry.ts       # Script de build que gera public/r/*.json
├── public/
│   └── r/
│       ├── index.json          # Catálogo geral de componentes
│       ├── custom-switch.json  # JSON de instalação do custom-switch
│       ├── switch.json         # JSON de instalação do switch
│       └── utils.json          # JSON de instalação do utils
├── dev/
│   └── handover-2026-08-27-ui-registry.md
├── AGENTS.md                   # Guia exclusivo para agentes neste repositório
├── README.md                   # Guia de utilização e instalação
├── package.json
└── tsconfig.json
```

### Funcionalidades do `CustomSwitch`

- **Acessibilidade:** Baseado na primitiva `@radix-ui/react-switch` (WAI-ARIA `role="switch"`, estados de foco, suporte a teclado e leitores de ecrã).
- **Tamanhos (`size`):**
  - `sm` (`h-4 w-7`): Ideal para tabelas densas e listas compactas.
  - `md` (`h-6 w-11`): Tamanho standard para formulários.
  - `lg` (`h-7 w-14`): Para ecrãs de definições ou controlos de topo.
- **Variantes semânticas (`variant`):** `default` (primary), `success` (emerald), `warning` (amber), `destructive` (red).
- **Ícones no Thumb:**
  - `thumbIcon`: Elemento estático ou função `(checked: boolean) => ReactNode`.
  - `checkedIcon` e `uncheckedIcon`: Ícones dedicados por estado.
- **Estado de Loading (`loading`):** Apresenta um spinner dentro do thumb e bloqueia interações (`aria-busy`).

### Compilação do Registry

O script `scripts/build-registry.ts`:
1. Lê as definições em `registry/schema.ts`.
2. Lê o código-fonte TSX dos ficheiros referenciados.
3. Transforma automaticamente os aliases internos do registry (`@/registry/lib/utils` -> `@/lib/utils` e `@/registry/ui/*` -> `@/components/ui/*`), garantindo que o código injetado no projeto consumidor fica imediatamente pronto a funcionar.
4. Gera os ficheiros JSON em `public/r/*.json` em conformidade com o schema `https://ui.shadcn.com/schema/registry-item.json`.

Verificado via `npm run build` e `npm run typecheck` (0 erros).

---

## 3. Como consumir nos projetos

### Opção A: Instalação direta por URL

```bash
# A partir do GitHub Raw (imediato):
npx shadcn@latest add https://raw.githubusercontent.com/HugoAlmeidaMoreira/ui-registry-vectorized/main/public/r/custom-switch.json
```

### Opção B: Configuração via Namespace no `components.json`

No projeto que vai usar o componente, adicionar a chave `registries` no `components.json`:

```json
{
  "registries": {
    "@vectorized": "https://raw.githubusercontent.com/HugoAlmeidaMoreira/ui-registry-vectorized/main/public/r"
  }
}
```

E depois correr apenas:

```bash
npx shadcn@latest add @vectorized/custom-switch
```

---

## 4. Hospedagem e Deploy

Para disponibilizar os ficheiros com um domínio limpo (ex: `https://ui.vectorized.pt/r/custom-switch.json`):
1. **GitHub Pages:** Apontar o GitHub Pages para a branch `main` ou pasta `public`.
2. **Cloudflare Pages / Vercel:** Fazer deploy com output directory `public`.
3. **Ingress no Cluster Talos / Vectorized:** Servir a pasta estática via Nginx/Caddy sob o wildcard `*.vectorized.pt`.

---

## 5. Próximos Passos & Backlog

1. **GitHub Actions:** Criar workflow de CI em `.github/workflows/build-and-test.yml` para correr `npm run typecheck` e `npm run build` em cada PR.
2. **Novos Componentes:**
   - Adicionar mais componentes partilhados (ex: *Segmented Control*, *Status Badge Pill*, *Theme Toggle Switch* pré-configurado com ícones sol/lua).
   - Componentes compostos e blocks (ex: *Settings Section Card*, *Data Split View*).
3. **Documentação / Showcase:** Adicionar opcionalmente uma página Next.js mínima no repositório para pré-visualização interativa dos componentes com documentação visual.
