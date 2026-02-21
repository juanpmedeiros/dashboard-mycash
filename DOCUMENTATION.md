# mycash+ — Documentação

**Fonte de verdade (design):** [Figma — Workshop Do figma MCP ao Cursor AI v.3](https://www.figma.com/design/ImkhtdI5lzzOKdeflCiBVv/Workshop---Do-figma-MCP-ao-Cursor-AI-v.3--Community-?node-id=42-3096)

---

## Progresso

- [x] PROMPT 0: Análise e Planejamento Inicial
- [x] PROMPT 1: Estrutura Base e Configuração
- [x] PROMPT 2: Sistema de Layout e Navegação Desktop
- [x] PROMPT 3: Sistema de Layout e Navegação Mobile
- [ ] PROMPT 4: Context Global e Gerenciamento de Estado
- [ ] PROMPT 5: Cards de Resumo Financeiro
- [ ] PROMPT 6: Header do Dashboard com Controles
- [ ] PROMPT 7: Carrossel de Gastos por Categoria
- [ ] PROMPT 8: Gráfico de Fluxo Financeiro
- [ ] PROMPT 9: Widget de Cartões de Crédito
- [ ] PROMPT 10: Widget de Próximas Despesas
- [ ] PROMPT 11: Tabela de Transações Detalhada
- [ ] PROMPT 12: Modal de Nova Transação
- [ ] PROMPT 13: Modal de Adicionar Membro
- [ ] PROMPT 14: Modal de Adicionar Cartão
- [ ] PROMPT 15: Modal de Detalhes do Cartão
- [ ] PROMPT 16: Modal de Filtros Mobile
- [ ] PROMPT 17: View Completa de Cartões
- [ ] PROMPT 18: View Completa de Transações
- [ ] PROMPT 19: View de Perfil — Aba Informações
- [ ] PROMPT 20: View de Perfil — Aba Configurações
- [ ] PROMPT 21: Animações e Transições Globais
- [ ] PROMPT 22: Formatação e Utilitários
- [ ] PROMPT 23: Responsividade e Ajustes Finais
- [ ] PROMPT 24: Testes e Validação Final
- [ ] PROMPT FINAL: Revisão e Entrega

---

## PROMPT 0: Análise e Planejamento Inicial

**Status:** ✅ Concluído  
**Data:** 21/02/2025  
**Figma:** node-id=42-3096 (Dashboard principal)

### 1. Componentes visuais e hierarquia (telas Dashboard, Cartões, Transações, Perfil)

Mapeamento a partir do frame **Dashboard** no Figma e regras do projeto.

#### Sidebar (desktop ≥1280px)

| Componente        | Descrição                                      | Filhos / notas                    |
|------------------|------------------------------------------------|-----------------------------------|
| `Sidebar`        | Container da navegação lateral                 | Logo, Nav, UserProfile            |
| Logo/Título      | "Mycash+" + ícone chevron (recolher)           | —                                 |
| `NavigationList` | Lista de links com ícone + texto              | NavLink (Home ativo, Cartões)     |
| `UserProfileCard`| Avatar + nome + email no rodapé da sidebar    | Avatar, nome, email               |

#### Área principal (main)

| Componente              | Descrição                                      | Uso                              |
|-------------------------|------------------------------------------------|----------------------------------|
| **Header (topo do main)** | Barra com busca, data, filtro, avatares, CTA | SearchBar, DatePicker, PrimaryButton "+ Nova transação" |
| **Cards de categorias**  | 4 cards (Aluguel, Alimentação, Mercado, Academia) | Mini donut, nome, valor; grid 4 col (desktop) |
| **Cards de resumo**      | 3 cards: Saldo total, Receitas, Despesas      | Ícone, título, valor; grid 3 col  |
| **Fluxo financeiro**     | Gráfico de área (Receitas x Despesas, 12 meses) | ChartContainer + legenda         |
| **Cards & contas**       | Lista Nubank, Inter, Picpay com vencimento    | Lista vertical, ícone "+", seta   |
| **Próximas despesas**    | Lista "Conta de Luz" com valor, data, check   | Lista vertical, ícone "+"         |
| **Extrato detalhado**    | Tabela + busca + filtro + paginação           | TableComponent, SearchBar, Pagination |

**Hierarquia resumida:**

```
App
└── MainLayout
    ├── [lg+] Sidebar (Expanded | Collapsed)
    └── [<lg] HeaderMobile + Drawer
    └── main (width: 100%, max-width, padding por breakpoint)
        └── DashboardPage | CartoesPage | TransacoesPage | PerfilPage
```

Telas **Cartões**, **Transações** e **Perfil** serão mapeadas em detalhe quando formos implementar (PROMPT 5); a navegação e o layout base seguem o mesmo padrão.

---

### 2. Variáveis do design system (tokens)

Ordem obrigatória no código: **1º Semântica → 2º Primitiva → 3º Conversão** (nunca hardcoded).

#### Cores

| Uso no Figma / visual      | Semântica (preferir)     | Primitiva (fallback)   |
|----------------------------|--------------------------|-------------------------|
| Home ativo, Receitas, check| `--color-primary`        | `--lime-500` / `--green-500` |
| Saldo total                | `--color-info` / `--color-secondary` | `--blue-500` / `--blue-600` |
| Despesas, alerta           | `--color-danger`         | `--red-500` / `--red-600` |
| Fundo página               | `--color-background-default` | `--gray-50`          |
| Fundo cards                | `--color-surface-default`| `--gray-100`             |
| Bordas / separadores       | `--color-border-default` | `--gray-200` / `--gray-300` |
| Texto principal            | `--color-text-primary`   | `--gray-800` / `--gray-900` |
| Texto secundário           | `--color-text-secondary` | `--gray-500` / `--gray-600` |
| Placeholder                | `--color-text-placeholder` | `--gray-400`         |
| Botão primário (Nova transação) | `--button-bg-primary` | `--gray-800` / `--gray-900` |

#### Espaçamento

| Uso                     | Semântica              | Primitiva / valor (referência)     |
|-------------------------|------------------------|------------------------------------|
| Padding horizontal main | `--spacing-page-x`     | Mobile 16px, Tablet 24px, Desktop 32px |
| Gap entre seções/cards  | `--spacing-container-gap` | 24px / 32px (gap-6, gap-8)      |
| Padding interno card     | `--spacing-card-padding` | p-6 (24px)                      |
| Escala genérica         | `--spacing-sm/md/lg`   | 8px, 16px, 24px, 32px             |

#### Tipografia

| Uso           | Semântica (ex.)        | Primitiva / Tailwind        |
|---------------|------------------------|-----------------------------|
| Título seção  | `--text-heading-xl`    | text-xl md:text-2xl lg:text-3xl |
| Título card   | `--text-heading-lg`    | text-lg md:text-xl          |
| Valor resumo  | `--text-display-xl`    | text-3xl md:text-4xl        |
| Corpo         | `--text-body-base`     | text-base md:text-lg        |
| Detalhes/datas| `--text-body-sm`       | text-sm md:text-base        |
| Pesos         | —                      | font-normal, font-semibold, font-bold |

#### Shape

| Uso              | Semântica              | Primitiva / Tailwind   |
|------------------|------------------------|------------------------|
| Cards, inputs    | `--border-radius-default` | rounded-lg          |
| Botões           | `--border-radius-sm`   | rounded-md             |
| Avatares, donuts | `--border-radius-full` | rounded-full           |
| Sombra cards     | `--shadow-default`     | shadow-sm / shadow-md  |

**Documentar todas as conversões** (hex → primitiva, px → spacing) no formato da resposta obrigatória após cada prompt.

---

### 3. Navegação e estados

- **Desktop (≥1280px):**
  - **Sidebar** visível; estados **Expanded** (larga, texto) e **Collapsed** (estreita, só ícones).
  - Sidebar **empurra** o conteúdo (não overlay).
  - Header do tipo “barra no topo do main” (busca, data, botão Nova transação); **não** é o Header Mobile.
- **Mobile e tablet (<1280px):**
  - **Sidebar não é renderizada.**
  - **Header Mobile** com menu (hambúrguer) que abre **Drawer** com os mesmos itens (Home, Cartões, etc.) e perfil.
  - Ações principais (ex.: Nova transação) no Header Mobile.
- **Regra crítica:** nunca renderizar Sidebar e Header Mobile ao mesmo tempo.

---

### 4. Arquitetura e estratégia de componentização

- **Stack:** React, TypeScript, Vite, Tailwind CSS, Supabase.
- **Estrutura de pastas:**
  - `src/components/ui/` — atômicos (Button, Input, Card, Avatar, etc.).
  - `src/components/layout/` — Sidebar, HeaderDesktop, HeaderMobile, MainLayout, Drawer.
  - `src/components/domain/` ou `src/features/dashboard/` — CategorySpendingCard, FinancialSummaryCard, FinancialFlowChart, CardsAccountsList, UpcomingExpensesList, DetailedStatementTable.
  - `src/pages/` — Dashboard, Cartões, Transações, Perfil (só composição).
  - `src/layouts/` — MainLayout (Sidebar ou HeaderMobile + outlet).
  - `src/hooks/`, `src/services/`, `src/types/`, `src/styles/` (tokens.css).
- **Princípios:** componente com uma responsabilidade; páginas sem lógica de negócio; layout fluido (width 100%, max-width onde necessário); mobile-first; tokens sem hardcoded.

---

## PROMPT 1: Estrutura Base e Configuração

**Status:** ✅ Concluído  
**Data:** 21/02/2025  
**Build:** ✅ (1 tentativa)

### Implementado

- Projeto Vite + React + TypeScript inicializado.
- Estrutura de pastas: `components` (layout, dashboard, cards, modals, ui), `contexts`, `hooks`, `types`, `utils`, `constants`, `pages`, `layouts`, `styles`.
- Tailwind CSS configurado com breakpoints oficiais (md: 768px, lg: 1280px, xl: 1920px) e extensão de tema para cores, spacing, font, borderRadius e boxShadow usando variáveis CSS.
- `src/styles/tokens.css` com variáveis semânticas e primitivas (cores, espaçamento, tipografia, shape).
- Tipos TypeScript: `Transaction` (type "income" | "expense"), `Goal`, `CreditCard` (theme "black" | "lime" | "white"), `BankAccount`, `FamilyMember`.
- React Router com cinco rotas: `/` (Dashboard), `/objetivos`, `/cartoes`, `/transacoes`, `/perfil`; MainLayout com Outlet; páginas placeholder.
- Constantes de rotas em `constants/routes.ts`.

### Tokens

**Semânticas:** --color-primary, --color-background-default, --color-surface-default, --color-text-primary, --color-text-secondary, --spacing-page-x, --spacing-container-gap, --spacing-card-padding.  
**Primitivas:** --gray-50 a --gray-900, --lime-500, --green-500, --blue-500, --red-500, --spacing-sm/md/lg/xl.

### Arquivos criados/modificados

- package.json, vite.config.ts, tsconfig.json, tsconfig.node.json, index.html, postcss.config.js, tailwind.config.js
- src/styles/tokens.css, src/styles/index.css
- src/types/*.ts (transaction, goal, creditCard, bankAccount, familyMember, index)
- src/constants/routes.ts, src/constants/index.ts
- src/utils/index.ts, src/contexts/index.ts, src/hooks/index.ts
- src/components/{layout,dashboard,cards,modals,ui}/index.ts
- src/pages/*.tsx e index.ts
- src/layouts/MainLayout.tsx, src/layouts/index.ts
- src/App.tsx, src/main.tsx, src/vite-env.d.ts

### Build

Tentativas: 1 | Erros: 0

---

## PROMPT 2: Sistema de Layout e Navegação Desktop

**Status:** ✅ Concluído  
**Data:** 21/02/2025  
**Build:** ✅

### Implementado

- **Sidebar** (`src/components/layout/Sidebar.tsx`): altura total do viewport (fixed left), dois estados — expandido (logo "mycash+", nomes das seções, perfil completo) e colapsado (ícone "m", apenas ícones, avatar).
- Botão circular na borda direita da sidebar para alternar estados; ícone seta esquerda (expandida) / seta direita (colapsada).
- Transições suaves (width e margin-left) com `duration-sidebar` (250ms); conteúdo principal com `margin-left: var(--sidebar-width)` animado.
- Tooltip ao passar o mouse nos itens quando colapsada: aparece à direita do item com delay 400ms, nome da seção.
- Item ativo: fundo preto (`--button-bg-primary`), texto branco (`--button-text-primary`), ícone verde-limão (`--color-primary`); inativos: fundo transparente, texto cinza (`--color-text-secondary`).
- **MainLayout** (`src/layouts/MainLayout.tsx`): estado `isSidebarExpanded`; Sidebar renderizada apenas em `lg:` (≥1280px); `data-sidebar="expanded"|"collapsed"` no wrapper para `--sidebar-width` via CSS (0 em &lt;1280px, 256px/80px em desktop).
- Tokens em `tokens.css`: `--sidebar-width`, `--sidebar-width-expanded`, `--sidebar-width-collapsed`, `--sidebar-transition-duration`; media query 1280px para aplicar largura atual.

### Tokens utilizados

**Semânticas:** --color-primary, --color-text-primary, --color-text-secondary, --button-bg-primary, --button-text-primary, --spacing-md, --font-size-*.  
**Primitivas:** --gray-100, --gray-300 (avatar placeholder).

### Arquivos criados/modificados

- src/components/layout/Sidebar.tsx (criado)
- src/components/layout/index.ts (export Sidebar)
- src/layouts/MainLayout.tsx (estado sidebar, data-sidebar, main com margin-left animado)
- src/styles/tokens.css (--sidebar-width, media query data-sidebar)

---

## PROMPT 3: Sistema de Layout e Navegação Mobile

**Status:** ✅ Concluído  
**Data:** 21/02/2025  
**Build:** ✅

### Implementado

- **HeaderMobile** (`src/components/layout/HeaderMobile.tsx`): substitui a Sidebar em viewports &lt;1280px (lg). Fixo no topo, largura total, visível no scroll. Logo "Mycash+" à esquerda (tamanho mobile), avatar à direita como trigger do menu.
- **MenuDropdown** (`src/components/layout/MenuDropdown.tsx`): abre ao tocar no avatar. Desliza de cima para baixo com animação suave; não ocupa tela inteira (max-height 70vh, scroll interno). Lista de navegação com ícone + texto (ROUTE_LIST); item da seção atual com fundo preto (`bg-button-primary`). Botão vermelho "Sair" no rodapé (`bg-danger`). Fecha ao clicar em item de navegação, no botão X (canto superior direito) ou no overlay escuro semi-transparente.
- **Breakpoints:** Desktop (≥1280px): apenas Sidebar (`hidden lg:block` / `lg:hidden`). Mobile/Tablet (&lt;1280px): apenas HeaderMobile. Nunca os dois simultaneamente. Uso do breakpoint oficial lg (1280px) conforme project rules.
- **MainLayout:** renderiza HeaderMobile em `lg:hidden` e Sidebar em `hidden lg:block`; main com `pt-[var(--header-mobile-height)]` quando header mobile visível e `lg:pt-0` no desktop.
- **Tokens:** `--header-mobile-height` (56px), `--dropdown-transition-duration` (250ms); cores e tipografia via semânticos (--button-bg-primary, --button-primary-text, --color-danger, --surface-sidebar, --text-primary, --spacing-*).
- **navIcons** compartilhado (`navIcons.tsx`) entre Sidebar e MenuDropdown (Material Design Outlined).

### Tokens utilizados

**Semânticas:** --header-mobile-height, --dropdown-transition-duration, --color-danger, --button-bg-primary, --button-text-primary, --color-text-primary, --color-surface-sidebar, --spacing-*.  
**Primitivas:** --gray-100, --gray-300.

### Arquivos criados/modificados

- src/components/layout/HeaderMobile.tsx (criado)
- src/components/layout/MenuDropdown.tsx (criado)
- src/components/layout/navIcons.tsx (criado, ícones compartilhados)
- src/components/layout/Sidebar.tsx (passa a usar navIcons)
- src/components/layout/index.ts (export HeaderMobile, MenuDropdown)
- src/layouts/MainLayout.tsx (HeaderMobile lg:hidden, main pt header-mobile)
- src/styles/tokens.css (--header-mobile-height, --dropdown-transition-duration)

---

## Sequência de prompts (1 em diante)

| # | Nome | Objetivo resumido |
|---|------|-------------------|
| 1 | Estrutura Base e Configuração | Pastas por domínio, Tailwind com variáveis Figma, tipos Transaction/Goal/CreditCard/BankAccount/FamilyMember, React Router (5 rotas), responsividade |
| 2 | Sistema de Layout e Navegação Desktop | Sidebar altura total, estados expandido/colapsado, botão alternância, transições, tooltip quando colapsada, item ativo (fundo preto, ícone verde-limão) |
| 3 | Sistema de Layout e Navegação Mobile | HeaderMobile fixo (&lt;1024px), avatar como trigger, MenuDropdown com animação, itens + botão Sair, fechamento por item/X/overlay |
| 4 | Context Global e Gerenciamento de Estado | FinanceProvider, 5 arrays (transactions, goals, creditCards, bankAccounts, familyMembers), CRUD, filtros, funções derivadas (getFilteredTransactions, calculateTotalBalance, etc.), useFinance, dados mock; sem localStorage |
| 5 | Cards de Resumo Financeiro | BalanceCard (fundo preto, círculo verde desfocado, badge crescimento %), IncomeCard, ExpenseCard; layout horizontal/vertical; animação contagem 800ms |
| 6 | Header do Dashboard com Controles | Busca tempo real, botão filtros (popover desktop / modal mobile), seletor período com calendário e atalhos, widget avatares membros, botão Nova Transação |
| 7 | Carrossel de Gastos por Categoria | ExpensesByCategoryCarousel, CategoryDonutCard (donut 64px, % central, nome, valor), scroll horizontal, wheel/arrastar/setas, fade nas bordas, hover borda verde-limão |
| 8 | Gráfico de Fluxo Financeiro | FinancialFlowChart (Recharts), áreas receitas/despesas, grid tracejado, tooltip, dados mock agrupados por mês |
| 9 | Widget de Cartões de Crédito | CreditCardsWidget, lista de cards (ícone, nome, fatura, limite, % uso), hover elevate, clique abre modal detalhes, paginação se &gt;3 |
| 10 | Widget de Próximas Despesas | Lista despesas pendentes por vencimento, botão check (marca paga, animação, remove item, cria próxima se recorrente), estado vazio |
| 11 | Tabela de Transações Detalhada | TransactionsTable, 7 colunas, busca local + select tipo, filtros combinados com contexto, ordenação por data, paginação 5 por página, zebra/hover |
| 12 | Modal de Nova Transação | Fullscreen, toggle receita/despesa, valor/descrição/categoria/membro/conta, parcelamento condicional, checkbox recorrente, validação, toast sucesso |
| 13 | Modal de Adicionar Membro | Nome, função (combobox), avatar (URL ou upload), renda opcional, validação, toast, atualiza familyMembers |
| 14 | Modal de Adicionar Cartão | Toggle conta/cartão, nome, titular, campos condicionais (saldo / fechamento, vencimento, limite, dígitos, tema), validação, toast |
| 15 | Modal de Detalhes do Cartão | Informações (limite, fatura, disponível, %, datas, dígitos), donut/barra de uso, tabela despesas do cartão, ações (Ver extrato, Adicionar despesa, Editar, Fechar) |
| 16 | Modal de Filtros Mobile | Slide-in de baixo, seções tipo/membro/período (calendário), botão Aplicar Filtros, aplica ao contexto ao confirmar |
| 17 | View Completa de Cartões | CardsView, grid responsivo de cartões detalhados, botão Novo Cartão, estado vazio |
| 18 | View Completa de Transações | TransactionsView, filtros avançados, linha de resumo (receitas/despesas/diferença/qtd), tabela expandida (10/página), ordenação por coluna, exportar CSV/PDF |
| 19 | View de Perfil — Aba Informações | ProfileView com abas, aba Informações: card perfil (avatar, nome, função, email, renda), lista membros família, botão Sair |
| 20 | View de Perfil — Aba Configurações | Aba Configurações: preferências exibição, notificações (toggles), gerenciar categorias, dados e privacidade (exportar/limpar), Sobre |
| 21 | Animações e Transições Globais | Transições navegação, entrada cards (fade+slide-up stagger), hover consistente, animação valores 800ms, barras progresso, modais (fade+scale), toasts, skeleton loaders, prefers-reduced-motion |
| 22 | Formatação e Utilitários | formatCurrency, formatCompactCurrency, parseCurrencyInput; formatDate, formatDateLong, formatDateRange, formatRelativeDate; groupByCategory, filterByDateRange, sortByDate; calculatePercentage, etc.; validação (email, CPF, data); generateUniqueId; JSDoc e testes unitários |
| 23 | Responsividade e Ajustes Finais | Mobile-first, breakpoints oficiais (768/1280/1920), sidebar só ≥1280px, tabela vira cards no mobile, gráficos adaptáveis, modais fluidos, touch 44px, acessibilidade, validar 375/768/1280/1920 |
| 24 | Testes e Validação Final | Fluxo E2E (abrir, filtrar membro/período/busca, nova transação, modais, navegação), validar cálculos/filtros/formatações/responsividade/modais/acessibilidade/performance, correção de bugs, tratamento de erros, feedback e README |
| FINAL | Revisão e Entrega | Checklist qualidade, organização código, comentários/documentação, performance, TODOs Supabase, documentação componentes, relatório final (totais, funcionalidades, próximos passos) |

**To-do e breakpoints**

- **To-do:** A sequência de implementação é a lista acima (PROMPT 1 → … → PROMPT 24 → PROMPT FINAL). Executar um prompt por vez; após cada um: build → aprovação → documentar → commit.
- **Breakpoints:** As project rules definem os breakpoints oficiais (md: 768px, lg: 1280px, xl: 1920px). Alguns prompts (1–3, 16) mencionam 1024px / 640px; na implementação, usar **1280px** para "desktop" (sidebar) e **768px** para "tablet", para manter consistência com as regras do projeto, salvo definição explícita em contrário.

Ciclo por prompt: reler rules → Figma se necessário → implementar → `npm run build` até passar → informar → aguardar aprovação → documentar + commit → perguntar se pode seguir.

---

## Build e commits

- **Build:** obrigatório antes de cada commit; corrigir até passar.
- **Commits:** `feat:`, `fix:`, `docs:`, `refactor:` + descrição curta.

---

## Comandos reconhecidos

- **Próximo** — Avançar para o próximo prompt.
- **Revisar [arquivo]** — Revisar arquivo específico.
- **Refazer** — Refazer o prompt atual com correções.
- **Status** — Ver progresso geral.
- **Tokens** — Ver mapeamento de conversões.
