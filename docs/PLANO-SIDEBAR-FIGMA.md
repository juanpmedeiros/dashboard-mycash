# Plano: Sidebar 100% igual à imagem e Figma MCP

**Figma:** [Workshop Do figma MCP ao Cursor AI v.3](https://www.figma.com/design/ImkhtdI5lzzOKdeflCiBVv/?node-id=2006-1306)  
**Referência visual:** imagens anexas (Sidebar expandida).

---

## Checklist de alinhamento

| # | Requisito | Status | Notas |
|---|-----------|--------|--------|
| 1 | Sidebar fixa, `height: 100vh` | ✅ | `fixed left-0 top-0 h-screen` (h-screen = 100vh) |
| 2 | Logo + itens do menu **juntos no topo** | ✅ | Bloco único: logo + nav; sem flex-1 no nav para não empurrar |
| 3 | Dados do usuário **apenas na parte inferior** | ✅ | Bloco separado com `mt-auto` ou spacer `flex-1` entre nav e user |
| 4 | Botão abrir/fechar em **posição fixa no canto superior direito** | ✅ | `absolute top-4 right-0` (ou similar) dentro da sidebar; ícone muda (chevron esquerda ↔ direita) |
| 5 | Ícones **Material Design Outlined** (Google) | ✅ | Uso de `react-icons` (MdOutline*) ou SVGs inline com paths oficiais |
| 6 | Item **ativo:** fundo verde-limão, texto e ícone **pretos** | ✅ | Seguir imagem: `bg-primary` + `text-text-primary` + `[&_svg]:text-text-primary` |
| 7 | Item **inativo:** fundo transparente, texto e ícone **pretos** (imagem) | ✅ | `text-text-primary` para igualar imagem; hover `bg-gray-100` |
| 8 | Logo "Mycash+" com "Mycash" sublinhado | ✅ | `<span className="underline">Mycash</span>+` (expandido); colapsado: "My" + "cash+" |
| 9 | Cores/espaçamentos via **tokens** (Figma MCP) | ✅ | primary-500, surface-500, space/8,12,16,32, Label/Medium, Paragraph/Small |
| 10 | Transições suaves (width, margin-left do main) | ✅ | `duration-sidebar`, `ease-in-out` |
| 11 | Tooltip ao hover quando colapsada (delay ~400ms) | ✅ | Mantido |

---

## Estrutura do componente

```
<aside> fixed, h-screen, width: var(--sidebar-width)
├── [Topo] Logo + Toggle (fixo superior direito)
│   ├── Logo: "Mycash+" (Mycash underlined)
│   └── Button toggle: absolute top-4 right-0, chevron left/right
├── [Meio] Nav (logo + nav “juntos” = sem spacer aqui)
│   └── NavLink × 5 (Home, Objetivos, Cartões, Transações, Perfil)
├── [Spacer] flex-1 (empurra o bloco abaixo para o rodapé)
└── [Rodapé] User (sempre na parte inferior)
    ├── Expandido: avatar + nome + email (horizontal ou vertical conforme Figma)
    └── Colapsado: só avatar
```

---

## Tokens Figma MCP (node 2006:1306)

- **Colors/Primary/primary-500:** #D7FF00  
- **Colors/Surface/surface-500:** #FFFFFF  
- **Colors/Secondary/secondary-900:** #060A11  
- **space/0, 8, 12, 16, 32, 56**  
- **shape/100** (pill)  
- **Label/Medium:** Inter Semi Bold 16px, line-height 20  
- **Paragraph/Small:** Inter Regular 14px, line-height 20  
- **Nome do usuário:** Lucas Marte | **E-mail:** lucasmarte@gmail.com  

---

## Decisões de estilo (imagem > texto anterior)

- **Ativo:** fundo verde-limão (`--color-primary`), texto e ícone **pretos** (não brancos).  
- **Inativo:** fundo transparente; na imagem texto/ícone pretos; pode usar `--color-text-primary` ou `--color-text-secondary` conforme contraste desejado.  
- **Toggle:** canto **superior direito** da sidebar, ícone escuro, fundo cinza claro.

---

## Arquivos a alterar

1. **package.json** — adicionar `react-icons` (Material Design Outlined).  
2. **src/components/layout/Sidebar.tsx** — estrutura (logo+nav no topo, user no rodapé), ícones MdOutline*, cores ativo/inativo, toggle top-right, 100vh.  
3. **docs/PLANO-SIDEBAR-FIGMA.md** — este plano (checklist e referências).

---

## Validação final

- [ ] Visual em 1280px igual à imagem (expandida).  
- [ ] Colapsada: só ícones + avatar; tooltip ao hover.  
- [ ] Toggle no canto superior direito; ícone muda ao expandir/recolher.  
- [ ] Sem overflow horizontal; sidebar só em desktop (≥1280px).
