# mycash+ - Gestão Financeira Familiar

Sistema de gestão financeira familiar desenvolvido com React, TypeScript, Vite e Tailwind CSS.

## 🚀 Tecnologias

- **React 18** - Biblioteca para interfaces
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework CSS utility-first
- **React Router** - Roteamento SPA
- **date-fns** - Manipulação de datas

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes React organizados por domínio
│   ├── layout/          # Componentes de layout (Sidebar, Header)
│   ├── dashboard/       # Componentes específicos do dashboard
│   ├── cards/           # Componentes relacionados a cartões
│   ├── transactions/    # Componentes de transações
│   ├── profile/         # Componentes de perfil
│   ├── modals/          # Componentes de modais
│   └── ui/              # Componentes base reutilizáveis (Button, Card, etc)
├── contexts/            # React Contexts para estado global
├── hooks/               # Custom hooks
├── types/               # Definições TypeScript
├── utils/               # Funções utilitárias
├── constants/           # Constantes do sistema
├── pages/               # Páginas/rotas principais
├── layouts/             # Layouts (MainLayout)
├── styles/              # Estilos globais e tokens CSS
└── services/            # Serviços (futura integração com Supabase)
```

## 🔧 Instalação

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build de produção
npm run preview
```

## 📐 Breakpoints

- **Mobile (base):** < 768px
- **Tablet:** ≥ 768px e < 1280px
- **Desktop:** ≥ 1280px e < 1920px
- **Wide / 4K:** ≥ 1920px

## 🎨 Design System

O projeto utiliza variáveis CSS semânticas e primitivas mapeadas do design system Figma, organizadas em `src/styles/tokens.css` e configuradas no Tailwind em `tailwind.config.js`.

### Hierarquia de Variáveis

1. **Semânticas:** `--color-primary`, `--spacing-card`, etc.
2. **Primitivas:** `--gray-900`, `--green-500`, etc.
3. **Conversão inteligente:** valores hex/px → token mais próximo
4. **NUNCA hardcoded:** sempre usar tokens do design system

## 📄 Tipos TypeScript

O sistema define 5 entidades principais:

- **Transaction** - Transações financeiras (receitas/despesas)
- **Goal** - Objetivos financeiros
- **CreditCard** - Cartões de crédito
- **BankAccount** - Contas bancárias
- **FamilyMember** - Membros da família

## 🌐 Rotas

- `/` - Dashboard
- `/objetivos` - Objetivos
- `/cartoes` - Cartões
- `/transacoes` - Transações
- `/perfil` - Perfil

## 📦 Status do Projeto

Este é um projeto em desenvolvimento. Atualmente implementado:

- ✅ PROMPT 0: Análise e Planejamento
- ✅ PROMPT 1: Estrutura Base e Configuração

## 📋 Licença

Este projeto é privado.
