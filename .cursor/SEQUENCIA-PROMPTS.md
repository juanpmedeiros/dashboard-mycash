# Sequência de Prompts — mycash+ Dashboard

Executar um prompt por vez. Após cada um: build → aprovação → documentar → commit → perguntar "Avançar?".

**Breakpoints oficiais (project rules):** md: 768px, lg: 1280px, xl: 1920px. Usar 1280px para desktop (sidebar) e 768px para tablet na implementação, salvo definição explícita em contrário.

---

## PROMPT 1: Estrutura Base e Configuração

Cursor, agora vamos criar a estrutura base do projeto:

Configure a estrutura de pastas seguindo boas práticas de arquitetura React. Crie diretórios separados para componentes, contexts, hooks, types, utils e constants. Dentro de components, organize subpastas por domínio: layout (sidebar, header), dashboard, cards, modals, etc.

Configure o Tailwind CSS para reconhecer e utilizar as variables do Figma como classes customizadas. Garanta que todos os tokens semânticos e primitivos estejam mapeados corretamente no arquivo de configuração do Tailwind.

Crie os tipos TypeScript fundamentais que representam as cinco entidades principais do sistema: Transaction, Goal, CreditCard, BankAccount e FamilyMember. Cada tipo deve conter todos os campos descritos na documentação, com tipagens precisas incluindo tipos de união onde apropriado (exemplo: tipo de transação sendo "income" ou "expense").

Configure o React Router para gerenciar as cinco rotas principais do sistema, mantendo o conceito de single page application onde apenas o conteúdo central muda enquanto a estrutura de navegação permanece visível.

Requisitos de Responsividade: Desktop (≥1024px): [comportamento]; Tablet (641-1023px): [comportamento]; Mobile (≤640px): [comportamento]. Na implementação usar breakpoints oficiais (768/1280/1920) conforme project rules.

---

## PROMPT 2: Sistema de Layout e Navegação Desktop

Cursor, vamos implementar o sistema de navegação desktop com a sidebar:

Crie o componente Sidebar que ocupa o lado esquerdo da tela com altura total do viewport. Este componente deve ter dois estados visuais distintos: expandido e colapsado. No estado expandido, mostre o logotipo completo "mycash+", os nomes das seções e as informações completas do perfil do usuário. No estado colapsado, mostre apenas o ícone do logotipo, ícones das seções e apenas o avatar do perfil.

Implemente a lógica de alternância entre estados através de um botão circular posicionado na borda direita da sidebar. O ícone dentro do botão deve mudar de acordo com o estado atual: seta para esquerda quando expandida, seta para direita quando colapsada.

Configure as transições suaves entre os dois estados. Quando a sidebar expande ou colapsa, o conteúdo principal à direita deve ajustar sua margem esquerda de forma fluida e animada. Todas as transições devem ter duração adequada para serem perceptíveis mas não lentas.

Implemente o sistema de tooltip que aparece ao passar o mouse sobre itens de navegação quando a sidebar está colapsada. O tooltip deve aparecer ao lado direito do item com leve delay e conter o nome completo da seção.

Adicione o comportamento de item ativo: o item de navegação correspondente à seção atual deve ter fundo preto com texto branco e ícone verde-limão. Itens inativos devem ter fundo transparente com texto cinza.

Utilize exclusivamente as variables do design system do Figma para todas as cores, espaçamentos, tamanhos de fonte e raios de borda. Priorize sempre tokens semânticos e, quando não disponíveis, utilize tokens primitivos.

Requisitos de Responsividade: Desktop (≥1024px): [comportamento]; Tablet (641-1023px): [comportamento]; Mobile (≤640px): [comportamento]. Implementar com breakpoints oficiais (sidebar apenas ≥1280px).

---

## PROMPT 3: Sistema de Layout e Navegação Mobile

Cursor, agora vamos criar a versão mobile da navegação:

Implemente o componente HeaderMobile que substitui completamente a sidebar em viewports menores que 1024 pixels. Este header deve ser fixo no topo, ocupar largura total e permanecer visível mesmo durante scroll.

O header deve conter o logotipo "mycash+" à esquerda em tamanho apropriado para mobile e o avatar do usuário à direita. O avatar deve ser clicável e funcionar como trigger para o menu dropdown.

Crie o componente MenuDropdown que aparece quando o avatar é tocado. Este menu deve deslizar de cima para baixo com animação suave e cobrir o conteúdo abaixo sem ocupar a tela inteira (não é fullscreen).

Dentro do dropdown, liste todos os itens de navegação com ícone e texto. O item da seção atual deve aparecer destacado com fundo preto. Adicione um botão vermelho "Sair" na parte inferior do menu para logout.

Implemente a lógica de fechamento do menu: deve fechar ao clicar em qualquer item de navegação, ao clicar no botão X no canto superior direito do menu, ou ao clicar/tocar fora da área do menu no overlay escuro semi-transparente.

Configure os breakpoints corretamente para que em desktop (acima de 1024px) apenas a sidebar apareça, e em mobile/tablet (abaixo de 1024px) apenas o header apareça. Nunca devem aparecer simultaneamente. Usar 1280px como breakpoint desktop conforme project rules.

Utilize as variables do design system para todos os estilos visuais, respeitando a hierarquia de tokens semânticos primeiro, primitivos depois.

Requisitos de Responsividade: Desktop (≥1024px): [comportamento]; Tablet (641-1023px): [comportamento]; Mobile (≤640px): [comportamento].

---

## PROMPT 4: Context Global e Gerenciamento de Estado

REGRA CRÍTICA DE ARMAZENAMENTO: Este sistema NÃO suporta localStorage, sessionStorage ou qualquer browser storage API. TODO o estado deve ser gerenciado EXCLUSIVAMENTE via React state (useState, useReducer). Os dados são temporários e existem apenas durante a sessão do navegador. Futuramente, integraremos com Supabase para persistência real.

Cursor, vamos criar o coração do sistema - o gerenciamento de estado global:

Crie um Context Provider chamado FinanceProvider que vai armazenar e gerenciar todo o estado da aplicação. Este provider deve ser colocado no nível mais alto da árvore de componentes para que todos possam acessá-lo.

Dentro deste context, mantenha os cinco arrays principais: transactions, goals, creditCards, bankAccounts e familyMembers. Cada array deve ser tipado corretamente com os tipos TypeScript que você criou anteriormente.

Implemente as funções CRUD básicas para cada entidade: adicionar novo item, atualizar item existente, deletar item. Estas funções devem atualizar os arrays no estado e, consequentemente, causar re-renderização de todos os componentes que dependem desses dados.

Crie um segundo conjunto de estados para os filtros globais: selectedMember (ID do membro ou null), dateRange (objeto com startDate e endDate), transactionType (string podendo ser "all", "income" ou "expense"), e searchText (string para busca textual).

Implemente funções de cálculo derivadas que outros componentes vão consumir. Estas funções devem aplicar automaticamente todos os filtros ativos antes de calcular:

- getFilteredTransactions: retorna array de transações após aplicar todos os filtros ativos
- calculateTotalBalance: soma saldos de contas e subtrai faturas de cartões
- calculateIncomeForPeriod: soma todas as receitas do período filtrado
- calculateExpensesForPeriod: soma todas as despesas do período filtrado
- calculateExpensesByCategory: agrupa despesas por categoria e retorna array ordenado por valor decrescente
- calculateCategoryPercentage: para cada categoria, calcula percentual em relação à receita total
- calculateSavingsRate: calcula (receitas - despesas) / receitas × 100

Crie um hook customizado useFinance que encapsula o useContext e fornece acesso limpo a todo o estado e funções. Este hook deve ser o único ponto de acesso ao contexto em toda a aplicação.

Popule o estado inicial com dados mock realistas seguindo as especificações da documentação: três membros da família brasileira, três cartões de bancos conhecidos, vinte a trinta transações distribuídas nos últimos três meses, quatro objetivos variados, e categorias padrão brasileiras.

NÃO use localStorage, sessionStorage ou qualquer browser storage API. Use apenas React state (useState, useReducer) para armazenamento em memória.

---

## PROMPT 5: Cards de Resumo Financeiro

Cursor, vamos criar os três cards de resumo que aparecem no topo do dashboard:

Implemente o componente BalanceCard (Card de Saldo Total) com fundo completamente preto e texto branco. Este card deve ter destaque visual através de um elemento decorativo de fundo: um círculo grande desfocado (blur intenso) na cor verde-limão com opacidade baixa, parcialmente cortado pelas bordas do card.

No topo do card coloque um label pequeno "Saldo Total" em cinza claro. Abaixo, em fonte muito grande, mostre o valor do saldo total formatado como moeda brasileira completa com cifrão, separador de milhar com ponto e decimais com vírgula.

Abaixo do valor adicione um badge arredondado com fundo semi-transparente branco contendo um ícone de gráfico crescente e texto mostrando crescimento percentual comparado ao mês anterior (por exemplo "+12% esse mês"). Este cálculo deve comparar o saldo atual com o saldo de 30 dias atrás.

O valor exibido deve vir da função calculateTotalBalance do contexto global e atualizar automaticamente quando filtros mudarem.

Crie o componente IncomeCard (Card de Receitas) com fundo branco e borda sutil. No topo à esquerda coloque label "Receitas" em preto negrito. No topo à direita adicione um círculo com fundo cinza claro contendo ícone de seta diagonal apontando para baixo-esquerda, simbolizando entrada de dinheiro.

Abaixo, em fonte grande e negrito, mostre o valor total das receitas formatado como moeda. Este valor deve vir da função calculateIncomeForPeriod e respeitar os filtros ativos.

Crie o componente ExpenseCard (Card de Despesas) com estrutura similar ao de receitas mas com diferenças visuais: label "Despesas" em cinza médio, ícone em círculo com fundo vermelho muito claro mostrando seta diagonal apontando para cima-direita simbolizando saída.

O valor deve vir de calculateExpensesForPeriod e também respeitar os filtros.

Organize estes três cards horizontalmente no desktop e verticalmente no mobile. No desktop devem ter larguras proporcionais (o card de saldo pode ser um pouco maior). No mobile cada card ocupa largura total.

Implemente animações suaves de contagem nos valores: quando um valor muda devido a filtros ou novos dados, anime de zero até o valor final em aproximadamente 800ms, mostrando números intermediários rapidamente.

Siga rigorosamente a hierarquia de variáveis das Project Rules.

---

## PROMPT 6: Header do Dashboard com Controles

Cursor, vamos implementar a barra de controles no topo do dashboard:

Crie o componente DashboardHeader que contém todos os controles de filtro e ação. Este componente deve ser uma barra horizontal responsiva que se adapta conforme o tamanho da tela.

Implemente o campo de busca à esquerda com ícone de lupa. O campo deve ter placeholder "Pesquisar..." e largura fixa no desktop, ocupando largura total no mobile. Configure busca em tempo real: a cada caractere digitado, dispare a atualização do filtro searchText no contexto global sem necessidade de pressionar Enter.

A busca deve ser case-insensitive e procurar correspondências parciais tanto na descrição quanto na categoria das transações.

Adicione o botão de filtros ao lado da busca: botão circular com ícone de controles deslizantes. No desktop este botão abre um popover flutuante abaixo dele. No mobile abre um modal fullscreen que desliza de baixo para cima.

Crie o componente FilterPopover para desktop com fundo branco semi-transparente e efeito glassmorphism (backdrop blur). Dentro coloque uma seção "Tipo de Transação" com três opções de rádio: "Todos", "Receitas", "Despesas". A opção selecionada deve ter fundo preto com texto branco. Ao clicar em uma opção, atualize imediatamente o filtro transactionType no contexto global.

Implemente o seletor de período: botão que mostra o período atual formatado como "01 jan - 31 jan, 2024". Ao clicar, abra um calendário interativo. No desktop mostre dois meses lado a lado. No mobile mostre um mês por vez com setas de navegação.

O calendário deve permitir seleção de intervalo: primeiro clique define data inicial, segundo clique define data final. O intervalo selecionado fica destacado visualmente. Adicione botões de atalho rápido: "Este mês", "Mês passado", "Últimos 3 meses", "Este ano" que definem automaticamente o intervalo correspondente.

Quando o usuário confirma a seleção (clicando fora ou em OK), atualize o filtro dateRange no contexto e o texto do botão para refletir o novo período.

Crie o widget de membros da família: mostre os avatares circulares dos membros parcialmente sobrepostos criando efeito de pilha. Cada avatar tem borda branca para destacar. Ao passar o mouse, o avatar cresce levemente e move-se para frente.

Ao clicar em um avatar, aplique o filtro de membro: o avatar selecionado ganha borda preta grossa e ícone de check verde no canto inferior direito. Todo o dashboard filtra para mostrar apenas dados daquele membro. Clicar novamente remove o filtro.

Adicione um botão circular com "+" após os avatares que abre o modal de adicionar novo membro.

No canto direito coloque o botão de destaque "Nova Transação" com fundo preto e texto branco, ícone de "+" incluído. No mobile este botão ocupa largura total com altura maior para facilitar toque.

Utilize as variables do design system rigorosamente para todos os estilos.

---

## PROMPT 7: Carrossel de Gastos por Categoria

Cursor, vamos criar o widget de categorias com gráficos donut:

Implemente o componente ExpensesByCategoryCarousel que processa e exibe despesas agrupadas por categoria. Este componente deve buscar os dados da função calculateExpensesByCategory do contexto global, que retorna um array já filtrado e ordenado.

Para cada categoria retornada, calcule o percentual que ela representa em relação à receita total do período usando calculateCategoryPercentage. Se a receita total for zero, trate este caso retornando 0% para evitar divisão por zero.

Crie o componente CategoryDonutCard que representa visualmente cada categoria. Cada card deve ter fundo branco, borda cinza clara, largura fixa de 160px e altura automática. Os cards ficam alinhados horizontalmente com espaço entre eles.

No topo de cada card renderize um gráfico donut com diâmetro de 64 pixels. O donut deve ter anel externo colorido representando o percentual e anel interno vazio (branco). A cor do anel externo vem de um array de cores que rota: primeira categoria verde-limão, segunda preta, terceira cinza médio, e assim por diante.

No centro exato do donut, sobreposto, mostre o percentual calculado em texto formatado com uma casa decimal: "30.0%".

Abaixo do donut, centralizado, mostre o nome da categoria em texto pequeno. Se o nome for muito longo e não couber na largura do card, truncue com reticências.

Abaixo do nome mostre o valor total da categoria formatado como moeda brasileira.

Configure o carrossel para ser scrollável horizontalmente. Implemente três formas de navegação: mouse wheel que move horizontalmente ao girar a rodinha, clique e arrasta para deslizar manualmente, e setas de navegação que aparecem quando o mouse está sobre a área do carrossel.

As setas devem ser botões circulares flutuantes com fundo branco e sombra, um à esquerda e outro à direita. Clicar neles desloca o carrossel aproximadamente 200 pixels na direção correspondente. As setas desaparecem quando o mouse sai da área.

Adicione gradiente de máscara nas bordas: a borda esquerda e direita do carrossel ficam progressivamente transparentes, criando efeito fade e indicando visualmente que há mais conteúdo para scrollar.

Implemente hover nos cards individuais: quando o mouse passa sobre um card, sua borda muda de cinza clara para verde-limão.

No mobile remova as setas de navegação e permita apenas scroll por toque/deslize, comportamento natural em dispositivos touch.

Utilize variables do design system para todas as cores, espaçamentos e tamanhos.

---

## PROMPT 8: Gráfico de Fluxo Financeiro

Cursor, vamos criar o gráfico de evolução de receitas e despesas:

Implemente o componente FinancialFlowChart usando uma biblioteca de gráficos que suporte gráficos de área responsivos (sugestão: Recharts). Este componente deve ser um card grande contendo título, legenda e o gráfico propriamente dito.

No topo do card coloque título "Fluxo Financeiro" com ícone de gráfico crescente à esquerda. À direita adicione uma legenda horizontal mostrando dois itens: círculo pequeno verde-limão com texto "Receitas" e círculo preto com texto "Despesas".

Configure o gráfico com altura fixa de 300 pixels e largura responsiva ocupando 100% do card. O fundo deve ser cinza claro muito suave.

Configure dois eixos: eixo horizontal (X) mostrando os nomes dos meses abreviados (Jan, Fev, Mar, etc) na parte inferior com fonte pequena e cor cinza média. Eixo vertical (Y) mostrando valores monetários formatados de forma compacta (R$ 2k, R$ 4k, R$ 6k, etc) do lado esquerdo.

Adicione linhas horizontais tracejadas muito sutis (cinza claríssimo) atravessando o gráfico em cada marca do eixo Y, criando grid que facilita leitura sem poluir visualmente.

Renderize duas áreas representando receitas e despesas. A área de receitas deve ter linha de borda verde-limão com 3 pixels de espessura conectando os pontos com curva suave. O preenchimento abaixo usa gradiente vertical: topo com verde-limão 30% opaco, base transparente.

A área de despesas tem linha de borda preta com 3 pixels de espessura, também com curva suave. O preenchimento usa gradiente: topo com preto 10% opaco, base transparente. A opacidade menor garante que ambas áreas sejam visíveis quando sobrepostas.

Implemente tooltip interativo: quando o mouse se move sobre o gráfico, uma linha vertical fina cinza clara acompanha o cursor. Ao parar sobre um ponto, mostre tooltip flutuante com fundo branco, sombra elevada e bordas arredondadas.

Dentro do tooltip exiba três linhas: nome do mês em negrito, "Receitas: R$ X.XXX,XX" em verde escuro, e "Despesas: R$ X.XXX,XX" em preto. Valores formatados com moeda completa.

Por enquanto use dados mock fixos para sete meses. Estruture o código de forma que no futuro estes dados possam vir de transações reais agrupadas por mês.

Utilize variables do design system para todas as cores e espaçamentos.

---

## PROMPT 9: Widget de Cartões de Crédito

Cursor, vamos criar o widget que exibe os cartões de crédito:

Implemente o componente CreditCardsWidget com container de fundo cinza muito claro, bordas amplamente arredondadas e espaçamento interno confortável. Este widget deve se destacar visualmente do restante do dashboard através de contraste de fundo.

No header do widget coloque ícone simples de cartão de crédito à esquerda seguido do título "Cartões" com tipografia legível e peso médio. À direita adicione botão circular com fundo branco, bordas arredondadas e ícone "+". Este botão abre o modal de criação de novo cartão.

Configure hover no botão: fundo muda suavemente para cinza claro mantendo ícone contrastante.

Abaixo do header renderize a lista de cartões verticalmente. Cada cartão deve vir do array creditCards do contexto global e ser exibido como um card independente com fundo branco, cantos arredondados e sombra suave.

Estruture cada card de cartão horizontalmente em três zonas: ícone à esquerda, informações ao centro e indicador de uso à direita.

À esquerda crie um bloco visual quadrado com cantos arredondados que recebe a cor do tema do cartão (preto, verde-limão ou branco com borda). Dentro deste bloco mostre ícone de cartão em estilo outline com cor contrastante ao fundo.

Ao centro organize verticalmente: primeira linha com nome do cartão/banco em fonte menor e cor neutra, abaixo o valor da fatura atual em fonte maior, peso forte e cor escura formatado como moeda brasileira, e por último o final do número mascarado no formato "•••• 1234" em fonte menor e cor suave.

À direita crie um badge circular ou levemente oval com texto centralizado mostrando o percentual de uso calculado como (fatura atual ÷ limite total) × 100, arredondado para inteiro e seguido de "%". A cor do badge varia com o tema do cartão, sempre garantindo contraste adequado.

Implemente interatividade: ao passar mouse sobre um card, ele eleva levemente no eixo vertical (translateY -4px ou -8px) acompanhado de aumento sutil da sombra. Transição suave de 200-300ms. Cursor muda para ponteiro indicando clicabilidade.

Ao clicar em um card, abra o modal de detalhes do cartão mostrando informações completas.

Se houver mais de três cartões visíveis, implemente paginação simples abaixo da lista com controles de avançar/voltar e indicador de página atual. No mobile suporte também gesto de swipe horizontal.

Utilize rigorosamente variables do design system para cores, espaçamentos, tamanhos e raios de borda.

---

## PROMPT 10: Widget de Próximas Despesas

Cursor, vamos criar o widget de próximas despesas com lista cronológica de contas a pagar:

Crie um widget com fundo branco, borda clara e cantos arredondados. No header mostre à esquerda um ícone de carteira (20px) seguido do título "Próximas despesas" em texto grande e negrito. À direita adicione um botão circular (40px de diâmetro) com ícone "+" e borda clara. Ao clicar neste botão, abra o modal de adicionar nova transação.

No corpo do widget renderize uma lista vertical de despesas pendentes. Busque todas as transações do tipo "despesa" que ainda não foram pagas. Ordene estas despesas por data de vencimento em ordem crescente, mostrando as mais próximas do vencimento no topo.

Cada item da lista ocupa uma linha horizontal com padding vertical generoso. Separe os itens com uma linha divisória fina cinza clara. Estruture cada item em duas colunas principais:

Do lado esquerdo empilhe verticalmente três informações: Na primeira linha mostre o título ou descrição da despesa em texto negrito médio. Na segunda linha mostre a data de vencimento formatada como "Vence dia DD/MM" em texto menor cinza escuro. Na terceira linha mostre o nome da conta ou cartão de onde será debitado em texto pequeno cinza claro.

Para identificar a origem do pagamento, implemente uma lógica: se for conta bancária, mostre apenas o nome como "Nubank conta". Se for cartão de crédito, mostre no formato "Crédito [Banco] **** [últimos 4 dígitos]" como "Crédito Nubank **** 5897".

Do lado direito alinhe à direita: Mostre o valor em texto grande e negrito no formato "R$ XXX,XX". Abaixo do valor posicione um botão circular (32px) com borda cinza, fundo transparente e ícone de check (✓) centralizado.

Configure o botão de check para que ao passar o mouse apareça fundo verde claro, borda verde e ícone verde. Ao clicar no botão, execute as seguintes ações:

1. Marque a despesa como paga atualizando seu status no sistema.
2. Anime o botão com as cores verdes.
3. Remova o item da lista com animação suave de desaparecimento.
4. Se a despesa for recorrente (como assinaturas mensais), crie automaticamente uma nova ocorrência para o próximo mês com a mesma data de vencimento mas status pendente.
5. Se a despesa for parcelada, verifique se há próxima parcela e atualize o contador.
6. Exiba mensagem de confirmação "Despesa marcada como paga!".

Quando não houver nenhuma despesa pendente na lista, mostre uma área centralizada com ícone de check circular verde, mensagem "Nenhuma despesa pendente" em texto cinza claro e borda tracejada cinza suave ao redor da área.

Por enquanto use dados fictícios de despesas pendentes com diferentes datas de vencimento para testar se a ordenação está funcionando corretamente. No futuro estas despesas serão buscadas automaticamente do sistema baseadas em transações recorrentes e parcelas de compras.

Utilize as variáveis do design system para cores, espaçamentos e tamanhos. Mantenha consistência visual com os demais widgets da dashboard.

---

## PROMPT 11: Tabela de Transações Detalhada

Cursor, vamos criar a tabela completa de transações no dashboard:

Implemente o componente TransactionsTable começando com um header horizontal. À esquerda coloque título "Extrato Detalhado" em fonte grande e negrito. À direita adicione controles de busca e filtro específicos desta tabela.

Crie campo de busca local com ícone de lupa, placeholder "Buscar lançamentos..." e largura média (256px no desktop, 100% no mobile). Configure busca em tempo real que filtra conforme usuário digita, procurando correspondências em descrição OU categoria.

Ao lado da busca adicione select de tipo: dropdown com opções "Todos", "Receitas", "Despesas". Largura fixa de 140px no desktop e 100% no mobile. Ao selecionar uma opção, filtre a tabela mostrando apenas transações daquele tipo.

Configure a estrutura da tabela com borda clara arredondada contornando toda ela. O header da tabela (linha com nomes das colunas) tem fundo cinza claro se diferenciando das linhas de dados.

Defina sete colunas:

- Avatar: estreita (50px) mostrando foto circular pequena (24px) do membro responsável. Se não houver, mostre ícone de usuário genérico.
- Data: mostra data formatada como "DD/MM/AAAA" em texto cinza médio.
- Descrição: mostra ícone indicativo do tipo seguido da descrição textual. Para receitas, ícone é seta diagonal para baixo-esquerda em círculo com fundo verde claro. Para despesas, ícone é seta diagonal para cima-direita em círculo com fundo vermelho claro. Descrição em texto negrito preto.
- Categoria: nome da categoria em badge arredondado com fundo cinza claro e texto cinza médio.
- Conta/Cartão: nome da conta bancária ou cartão vinculado em texto cinza médio. Busque primeiro em bankAccounts; se não encontrar, busque em creditCards; se não encontrar em nenhuma, mostre "Desconhecido".
- Parcelas: se transação foi parcelada, mostre "3x", "6x", etc. Se foi à vista (installments = 1), mostre apenas "-".
- Valor: alinhado à direita, mostra valor com prefixo de sinal. Receitas têm "+" em verde. Despesas têm "-" em preto. Fonte negrito. Formatação completa de moeda brasileira.

Configure zebra striping sutil: linhas alternam entre fundo completamente branco e fundo com levíssimo cinza para facilitar leitura.

Implemente hover nas linhas: ao passar mouse, linha inteira fica com fundo cinza claro mais perceptível, destacando a linha.

Crie a lógica de filtragem combinada. A tabela deve considerar: Filtros globais do contexto (membro, período); Filtros locais da tabela (busca textual em descrição OU categoria, select de tipo). Todos estes filtros trabalham em conjunto (AND lógico). Ordene transações por data decrescente.

Implemente paginação mostrando apenas 5 transações por vez. Abaixo da tabela, à esquerda, mostre contador: "Mostrando 1 a 5 de 47". À direita controles de navegação: Anterior, números de página, Próxima. Página atual com fundo preto e texto branco. Se mais de 7 páginas, mostre primeiras 3, "...", últimas 2. Botões Anterior/Próxima disabled quando não aplicáveis.

Ao mudar página, role suavemente até o topo da tabela. Quando qualquer filtro muda, resete para página 1.

Se não houver transações após filtros, mostre mensagem centralizada: "Nenhum lançamento encontrado."

Busque dados de getFilteredTransactions do contexto global e aplique filtros locais da tabela.

Utilize variables do design system para todas as cores, espaçamentos e tamanhos.

---

## PROMPT 12: Modal de Nova Transação

Cursor, vamos criar o modal completo para adicionar transações:

Implemente o modal que aparece em tela cheia ocupando 100% da largura e altura da viewport com fundo branco. Divida em três áreas: header fixo no topo, conteúdo scrollável no centro e footer fixo na base.

No header: ícone grande em círculo (64px) que muda conforme o tipo (receita: fundo verde-limão com seta baixo-esquerda; despesa: fundo preto com seta cima-direita branca). Ao lado título "Nova Transação" e subtítulo em cinza. À direita botão circular grande (48px) com ícone X para fechar.

No conteúdo (scrollável, max-width 600-700px): Toggle de tipo (Receita/Despesa) no topo. Campo valor (label "Valor da Transação", R$ fixo à esquerda, altura 56px, obrigatório). Campo descrição (obrigatório). Campo categoria (dropdown, "+ Nova Categoria" no topo, filtrar categorias por tipo, obrigatório). Grid duas colunas: Select membro (opcional, opção "Família (Geral)"), Select conta/cartão (obrigatório, agrupado "Contas Bancárias" e "Cartões de Crédito"). Campo parcelamento condicional (só se cartão + despesa): dropdown 1x a 12x; desabilitar se despesa recorrente. Checkbox despesa recorrente (só se despesa): container destacado azul suave; se marcado, forçar parcelamento 1x; desabilitar se parcelamento >1x.

No footer: botões "Cancelar" (borda/transparente) e "Salvar Transação" (fundo preto, pill).

Validação ao salvar: valor > 0; descrição ≥ 3 caracteres; categoria e conta selecionadas. Se válido: criar transação com ID único, adicionar ao contexto, fechar modal com animação, toast "Transação registrada com sucesso!", limpar formulário. Fechar sem salvar ao cancelar/X/overlay.

Utilize variables do design system.

---

## PROMPT 13: Modal de Adicionar Membro

Cursor, vamos criar o modal para adicionar membros da família:

Implemente o componente AddMemberModal com estrutura similar ao modal de transação: overlay escuro, modal centralizado branco com header, conteúdo e footer.

No header: título "Adicionar Membro da Família" e botão X. No footer: "Cancelar" e "Adicionar Membro".

No conteúdo: Nome completo (input obrigatório, mínimo 3 caracteres, placeholder "Ex: João Silva"). Função/papel (combobox obrigatório, placeholder "Ex: Pai, Mãe, Filho...", sugestões: Pai, Mãe, Filho, Filha, Avô, Avó, Tio, Tia). Avatar (duas opções: "URL" input para colar URL, ou "Upload" botão JPG/PNG max 5MB; se nenhuma, usar avatar padrão; opcional). Renda mensal (input numérico opcional, formatação moeda).

Validação: nome obrigatório ≥3 caracteres ("Por favor, insira um nome válido"); função obrigatória ("Por favor, informe a função na família"). Se válido: criar membro com ID único, adicionar a familyMembers no contexto, fechar com fade-out, toast "Membro adicionado com sucesso!". Novo membro aparece nos avatares do header e nos dropdowns. Fechar sem salvar ao cancelar/X/fora.

Utilize variables do design system.

---

## PROMPT 14: Modal de Adicionar Cartão

Cursor, vamos criar o modal para adicionar contas bancárias e cartões de crédito:

Implemente modal centralizado sobre overlay escuro. Modal fundo branco, bordas arredondadas, sombra, largura 500-600px (desktop), 90% (mobile). Header fixo (título "Adicionar Conta/Cartão", botão X), conteúdo scrollável, footer fixo ("Cancelar", "Adicionar").

No conteúdo: Toggle "Conta Bancária" | "Cartão de Crédito" no topo. Campo nome (label varia por tipo, placeholder "Ex: Nubank Conta" ou "Ex: Nubank Mastercard", obrigatório ≥3 caracteres). Campo titular (dropdown obrigatório, todos os membros).

Condicional conta bancária: Saldo inicial (numérico, moeda, obrigatório).

Condicional cartão: Dia de fechamento (1-31, obrigatório). Dia de vencimento (1-31, obrigatório). Limite total (moeda, >0, obrigatório). Últimos 4 dígitos (opcional, exatamente 4). Seção "Tema Visual": três cards clicáveis "Black", "Lime", "White" (um selecionado com borda azul, obrigatório para cartão).

Validação: nome, titular; se conta: saldo; se cartão: fechamento 1-31, vencimento 1-31, limite >0, tema. Se válido: criar objeto conforme tipo, adicionar ao array apropriado no contexto, fechar, toast "Conta/Cartão adicionado com sucesso!". Utilizar variables do design system.

---

## PROMPT 15: Modal de Detalhes do Cartão

Cursor, vamos criar o modal que mostra informações completas do cartão:

Implemente o componente CardDetailsModal (largura média-grande). Header: nome do cartão e botão X.

Conteúdo em duas áreas: (1) Informações: limite total, fatura atual, limite disponível, percentual de uso, data fechamento, data vencimento, últimos 4 dígitos (se houver); organizar em grid 2-3 colunas (desktop) / 1 col (mobile); representação visual do uso (donut ou barra de progresso). (2) Área de despesas: tabela de transações type=expense e accountId deste cartão (colunas Data, Descrição, Categoria, Parcelas, Valor); paginação 10 por vez se muitas; mensagem "Nenhuma despesa registrada neste cartão ainda" se vazio.

Botões de ação: "Ver Extrato Completo" (navega com filtro do cartão), "Adicionar Despesa" (abre modal nova transação pré-preenchido), "Editar Cartão", "Fechar". Fechar ao clicar Fechar, X ou fora.

Utilize variables do design system.

---

## PROMPT 16: Modal de Filtros Mobile

Cursor, vamos criar o modal de filtros específico para mobile:

Implemente o componente FiltersMobileModal (abre ao tocar no botão de filtros no header mobile).

Animação de entrada: slide-in de baixo para cima (translateY 100% → 0), 300ms.

Estrutura: Header fixo (título "Filtros", botão X grande, área toque ≥44px). Conteúdo scrollável (seções de filtro com espaçamento generoso). Footer fixo (botão único "Aplicar Filtros", altura 56px, fundo preto, texto branco).

No conteúdo: Seção "Tipo de Transação" (label + grid 3 colunas, botões "Todos", "Receitas", "Despesas", altura 48px; selecionado fundo preto texto branco). Seção "Membro da Família" (label + botões: "Todos", depois um por membro com avatar 32px e nome; pill shape; selecionado fundo preto, avatar borda branca). Seção "Período" (label + calendário um mês, seleção de intervalo, controles setas para mudar mês).

Comportamento: seleções em estado local temporário. Ao tocar "Aplicar Filtros", copiar para contexto global (transactionType, selectedMember, dateRange), fechar com slide-out, dashboard atualiza. Ao tocar X ou overlay, fechar sem aplicar.

Utilize variables do design system; touch targets mínimos adequados.

---

## PROMPT 17: View Completa de Cartões

Cursor, vamos criar a tela completa dedicada aos cartões de crédito:

Implemente o componente CardsView (seção ao clicar "Cartões" na navegação). Header: título "Cartões de Crédito" à esquerda, botão "Novo Cartão" à direita (fundo preto, ícone +).

Abaixo: grid responsivo (mobile 1 col, tablet 2, desktop 3) com todos os cartões do contexto. Cada card grande e detalhado: nome e logo; seção valores (limite total, fatura atual destacada, limite disponível, % uso); representação visual (barra ou donut); datas fechamento/vencimento; tema refletido (borda ou fundo); últimos dígitos se houver; botões "Ver Detalhes", "Adicionar Despesa".

Hover: card eleva e sombra aumenta. Clique no card abre modal de detalhes.

Estado vazio: ícone cartão cinza, "Nenhum cartão cadastrado", botão "Cadastrar Primeiro Cartão".

Dados de creditCards do contexto. Ordenar por fatura decrescente ou alfabeticamente.

Utilize variables do design system.

---

## PROMPT 18: View Completa de Transações

Cursor, vamos criar a tela completa dedicada às transações:

Implemente o componente TransactionsView. Header: título "Transações", botão "Nova Transação".

Barra de filtros avançados (horizontal desktop, vertical mobile): busca, select tipo, select categoria, select conta/cartão, select membro, date range, select status (todos/concluído/pendente). Filtros em conjunto (AND) com filtros globais.

Linha de resumo acima da tabela: total receitas, total despesas, diferença (verde/vermelho), quantidade de transações.

Renderize TransactionsTable em modo expandido: 10 linhas por página, largura total.

Ordenação clicável nos headers (Data, Valor, etc.) com ícone de seta. Botão "Exportar" (CSV ou PDF).

Estado vazio: "Nenhuma transação registrada ainda" com botão adicionar.

Dados via getFilteredTransactions + filtros locais da view.

Utilize variables do design system.

---

## PROMPT 19: View de Perfil — Aba Informações

Cursor, vamos criar a tela de perfil do usuário:

Implemente o componente ProfileView com sistema de abas no topo: "Informações" e "Configurações". Ao entrar, aba "Informações" ativa. Abas lado a lado, borda inferior na ativa.

Na aba "Informações": (1) Card perfil (fundo branco): avatar 120px, nome completo (grande negrito), função (cinza médio), email (cinza, ícone envelope), renda mensal (moeda, ícone cifrão). Opcional: botão "Editar Perfil". (2) Card "Membros da Família": lista vertical de todos os membros (avatar 48px, nome e função, renda à direita, fundo cinza claro, espaçamento). Se só um membro: mensagem + botão "Adicionar Membro da Família". Hover: fundo mais escuro. Clicar em membro pode abrir modal edição. (3) Botão vermelho "Sair" com ícone logout.

Utilize variables do design system.

---

## PROMPT 20: View de Perfil — Aba Configurações

Cursor, vamos criar a aba "Configurações" dentro da view de perfil:

Conteúdo ao clicar na aba "Configurações":

- Card "Preferências de Exibição": toggle "Modo Escuro" (desabilitado, badge "Em breve"); select moeda "Real Brasileiro (R$)"; select formato data "DD/MM/AAAA".
- Card "Notificações": toggles "Lembrete de vencimento de contas" (on), "Alerta de aproximação do limite de cartão" (on), "Resumo mensal por email" (off), "Notificações de novos objetivos alcançados" (on). Por enquanto só estado visual.
- Card "Gerenciar Categorias": "Categorias de Receita" (lista nome/cor, botão Adicionar, ícones editar/deletar); "Categorias de Despesa" (idem).
- Card "Dados e Privacidade": botão "Exportar Todos os Dados" (JSON/CSV); botão vermelho "Limpar Todos os Dados" com confirmação; texto "Esta ação não pode ser desfeita".
- Card "Sobre o mycash+": versão "v1.0.0", texto "Sistema de gestão financeira familiar", links Termos de Uso e Política de Privacidade.

Cards verticais com espaçamento; mobile empilhados; desktop alguns lado a lado se couber.

Utilize variables do design system.

---

## PROMPT 21: Animações e Transições Globais

Cursor, vamos implementar animações e transições suaves em todo o sistema:

- Transições de navegação: fade-out do conteúdo atual (200ms) e fade-in do novo (200ms), ligeiramente defasados.
- Entrada de cards/listas: fade-in + slide-up (translateY 20px→0) 300ms, stagger 50ms (tabela) ou 80ms (grids). Donuts carrossel: scale 0.8→1 + fade-in 400ms, stagger 100ms.
- Hover: botões (background 200ms ease-in-out); cards (transform + box-shadow 250ms ease-out); avatares (scale 200ms ease-in-out).
- Valores monetários: animação de contagem 0→valor em 800ms ease-out quando valor muda.
- Barras de progresso: preencher 1000ms ease-out ao aparecer/atualizar.
- Modais: abertura overlay fade-in 200ms, modal fade-in + scale 0.95→1 250ms ease-out; fechamento inverso. Modal filtros mobile: slide-in translateY(100%)→0 300ms; slide-out inverso.
- Toasts: entrada slide-in da direita + fade-in 300ms; saída fade-out + slide-out 250ms.
- Skeleton loaders: cards pulse (opacity 0.6↔1, 1500ms); linhas tabela shimmer (gradiente movendo).
- Micro-interações: checkboxes/toggles scale leve ao clicar; inputs borda destaque 200ms em foco; dropdowns fade-in + slide-down 200ms.
- Usar Framer Motion ou CSS conforme apropriado; constantes para durações/easings. Respeitar prefers-reduced-motion (desabilitar ou reduzir animações).

---

## PROMPT 22: Formatação e Utilitários

Cursor, vamos criar funções utilitárias para formatação consistente:

- Moeda: formatCurrency (número → "R$ 1.234,56" pt-BR, 2 decimais); formatCompactCurrency (valores grandes → "R$ 2,5k"); parseCurrencyInput (string input → número limpo).
- Datas: formatDate (Date → "DD/MM/AAAA"); formatDateLong ("15 de Janeiro de 2024"); formatDateRange (duas datas → "01 jan - 31 jan, 2024"); formatRelativeDate ("Hoje", "Ontem", "Há 3 dias" — date-fns locale pt-BR).
- Arrays/objetos: groupByCategory (transações → agrupado por categoria); filterByDateRange (transações + intervalo); sortByDate (asc/desc).
- Cálculos: calculatePercentage (parcial, total → % 1 decimal, tratar zero); calculateDifference (dois valores → diferença absoluta e % variação); calculateInstallmentValue (total, parcelas → valor parcela).
- Validação: isValidEmail; isValidCPF (estrutura); isValidDate; isPositiveNumber.
- IDs: generateUniqueId (UUID v4 ou crypto.randomUUID).

Organizar em arquivos por categoria (currency.utils.ts, date.utils.ts, array.utils.ts, validation.utils.ts). Export nomeado. JSDoc em cada função. Testes unitários para funções críticas.

---

## PROMPT 23: Responsividade e Ajustes Finais

Cursor, faça uma revisão completa de responsividade do sistema já implementado, aplicando apenas ajustes incrementais de layout, sem refatorar arquitetura ou recriar componentes.

Projeto 100% mobile-first. Layout base sempre do mobile; breakpoints apenas evoluem.

Breakpoints oficiais: Mobile (base) &lt;768px; Tablet (md) ≥768 &lt;1280; Desktop (lg) ≥1280 &lt;1920; Wide (xl) ≥1920.

Layout fluido: containers principais width 100%; limitação só com max-width; overflow horizontal proibido.

Sidebar só existe no desktop (≥1280px). Em mobile/tablet não renderizar (nem display:none). Navegação via Header Mobile + drawer. Sidebar e Header Mobile nunca coexistir.

Header Mobile só &lt;1280px; some no desktop.

Grids mobile-first: mobile 1 coluna; tablet 2 quando fizer sentido; desktop 3-4; auto-fit/auto-fill. Padding main: px-4 (mobile), px-6 (tablet), px-8 (desktop). Max-width desktop 1400px, wide 1600px, mx-auto.

Tipografia: reduzir ~15% no mobile; escala progressiva (text-base md:text-lg lg:text-xl).

Tabela: no mobile cada transação vira card vertical com labels; tablet híbrido; desktop tabela completa sem scroll horizontal.

Gráficos: mobile menor altura e labels simplificados; sem overflow lateral.

Modais: mobile 100% viewport; tablet/desktop width 100% + max-width; só corpo rola.

Touch: targets mínimos 44x44px; espaço ≥8px; inputs altura mín 48px, font-size mín 16px (evitar zoom iOS).

Acessibilidade: navegação teclado, focus:ring, aria-label em botões ícone, alt em imagens, contraste ≥4.5:1 (WCAG AA).

Validar em 375px, 768px, 1280px e 1920px; corrigir overflow, quebra de grid, desalinhamento.

---

## PROMPT 24: Testes e Validação Final

Cursor, vamos finalizar o projeto com testes e validação completa:

Fluxo de teste E2E: abrir sistema → dados mock no dashboard → filtrar por membro → verificar atualização de cards/gráfico/tabela → remover filtro → seletor período "Últimos 3 meses" → busca textual → nova transação (formulário completo, salvar) → toast e transação na tabela → clicar cartão (modal detalhes) → navegar Cartões → navegar Transações (filtros) → navegar Perfil (informações, aba Configurações) → retornar Dashboard. Anotar problemas.

Validar cálculos: transações mock com valores conhecidos; conferir saldo total, receitas, despesas, percentuais.

Validar filtros combinados: membro + período + busca; contar transações esperadas; confirmar que todas exibidas atendem todos os critérios.

Validar formatações: moeda R$ 1.234,56; datas DD/MM/AAAA; percentuais uma casa decimal.

Validar responsividade: redimensionar 1920→375; sidebar/header no breakpoint correto (1280px); grids; sem overflow horizontal; textos legíveis; botões clicáveis/tocáveis.

Validar modais: centralizados, overlay, fechar por X/fora/Escape; validações ao salvar com campos vazios.

Validar acessibilidade: navegação só teclado (Tab, Enter, Escape, setas); foco visível; ordem tabulação lógica; leitor de tela (NVDA/JAWS/VoiceOver).

Validar performance: transições suaves; 100 transações mock + paginação rápida; sem memory leaks ao abrir/fechar modais.

Corrigir bugs encontrados. Tratamento de erros (divisão por zero, arrays vazios, validação formulários). Mensagens de feedback (toasts sucesso/erro, estados vazios, validação). Documentar comportamentos não óbvios. README.md: objetivo, tecnologias, instalação, rodar localmente, estrutura de pastas, principais componentes.

---

## PROMPT FINAL: Revisão e Entrega

Cursor, vamos fazer a revisão final e preparação para entrega do projeto mycash+:

Checklist de qualidade: Todas as cinco seções principais implementadas e navegáveis. Navegação (sidebar desktop + header mobile) funciona. Context global gerencia estado. Cálculos financeiros corretos e testados. Filtros globais e locais em combinação. Modais implementados com validação. Componentes usam só variables do design system. Sistema totalmente responsivo. Animações e transições suaves. Formatações moeda e data padrão brasileiro. Navegação por teclado. Contraste WCAG AA. Funciona com dados mock.

Revisar organização: estrutura de pastas clara; componentes bem nomeados; sem código duplicado; tipos TypeScript corretos; imports organizados.

Revisar comentários e documentação: JSDoc em funções complexas; comentários em lógica não óbvia; remover comentários obsoletos e console.logs; README completo.

Otimizar performance: sem re-renders desnecessários; imagens otimizadas; bundle size razoável; sem imports desnecessários.

Preparar para Supabase: identificar pontos onde dados virão do backend; comentários // TODO: integrar com Supabase; estrutura compatível com schema planejado.

Documentação de componentes: listar componentes por domínio; responsabilidade de cada um; props dos principais; hooks customizados e finalidades.

Relatório final: total de componentes; linhas de código (aproximado); funcionalidades implementadas; parcialmente implementadas ou pendentes; próximos passos sugeridos.

O sistema mycash+ está completo e funcional: interface moderna e responsiva, navegação fluida, gerenciamento de transações/objetivos/cartões, filtros e buscas, visualizações gráficas, acessibilidade, código limpo, preparado para integração com Supabase via MCP.

---

## Após cada prompt

- Atualizar **DOCUMENTATION.md**: marcar prompt como concluído, data, build, tokens usados, arquivos criados/modificados.
- Resposta no formato: PRÉ-EXECUÇÃO → IMPLEMENTADO → TOKENS → ARQUIVOS → BUILD → COMMIT → PRÓXIMOS PASSOS.
- Aguardar aprovação antes de seguir.
