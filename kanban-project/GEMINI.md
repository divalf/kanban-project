# 🚀 Kanban Project Manager - Arquivo de Contexto (`GEMINI.md`)

Este arquivo foi gerado para documentar a essência técnica do projeto, o fluxo de evolução até as versões atuais e ditar regras cruciais para que futuras Inteligências Artificiais e Desenvolvedores deivem prosseguir o trabalho a partir do ponto atual com mínimo de atrito.

---

## 📅 Estado Atual: Fase 2 (UI & Arquitetura Dinâmica) Finalizada

O "Kanban Project Manager" é um sistema de gerenciamento de fluxos de trabalho no estilo Trello, criado via Next.js + React. O objetivo da aplicação é ser uma central de acompanhamento de status de projetos em andamento focada em usabilidade limpa, dinamismo visual e que, futuramente, dispare interações automatizadas a clientes.

### 🔨 O Que Já Foi Implementado:

1. **Agnosticismo de Colunas ("Dinamismo Completo")**
   - Antes, o quadro Kanban operava dependente de 3 colunas padrão (`col-inprogress`, `col-completed`, etc). 
   - O núcleo global de gerenciamento `AppContext.tsx` foi altamente refatorado para iterar de maneira inteligente sobre qualquer quantidade / formato de colunas inseridas no estado via chaves dinâmicas.
   - **Adicionar Coluna**: Permite criação de chaves exclusivas contendo matriz randômica de cores sem repetição.
   - **Edição de Títulos**: Títulos das colunas podem ser alterados e os blocos vinculados acompanham a string modificada.

2. **Dashboard de Resumo Avançado (`DashboardView.tsx`)**
   - Agregador de cálculo progressivo lendo o dicionário (Object.values) das colunas dinâmicas.
   - Implementação de um sofisticado script que balancea porcentagens de forma fluída no gráfico de progressão em barras para nunca quebrar ou vazar visualmente (sempre cravando exatamente 100% de preenchimento, arredondando com ajustes de balanço de sobra).
   - Aplicação de sincronização de cor exata entre os blocos visuais das legendas e as propriedades intrínsecas configuradas para as colunas.

3. **Visualizações Múltiplas e Ordenação Categórica (`TasksListView.tsx` & `Board.tsx`)**
   - Carga do pacote de navegação em `Header.tsx` e `page.tsx` para chaveamento entre "Visão Status (Kanban)" e "Total de Tarefas/Clientes" (Lista de Arquivos Expandida).
   - Construção da lista unificada que lê as sub-arrays de forma achatada (`flatMap`).
   - Algoritmo no `AppProvider` disparado via `useEffect` capaz de atualizar subitamente as matrizes numéricas, reorganizando a grade real de Drag-and-Drop (Board) sob a óptica escolhida: 
     - **Mais Novos:** Com base em decodificação numérica dos IDs.
     - **Mais Antigos**: Via inversão `localeCompare({numeric: true})`.
     - **Maior Prioridade**: Mapeados através de (`Urgente`, `Alta`, `Média`, `Baixa`), limpando classes antigas de prioridade ("Tanto faz" e "Não sei") e com desempate atrelado à criação da data (ID).

4. **Engine Visual**
   - `Tailwind CSS` e interações fluídas utilizando `lucide-react` para os ícones.
   - Intercomunicação entre pacotes Drag and Drop `(@hello-pangea/dnd)`.

---

## 🤖 Manual de Sobrevivência para IA (Contextos Futuros)

Se você é uma Inteligência Artificial, LLM assistente de código, recebendo este arquivo para iniciar sua interação, **estude** os pontos a seguir antes de propor novos blocos lógicos:

1. **Dependência de Fluxo do React:** Todo o estado atual de listas e visualizações provém do context `AppContext.tsx`. Ele guarda o formato `BoardData` manipulando o estado síncrono da máquina. *Sempre prefira despachar mutações puras utilizando os setters dele e não componentize estados isolados das tabelas a menos que seja temporário para preenchimentos de form ou popups (Modais).*

2. **Cuidado Extremo no Drag & Drop:** Manipular o array em momentos impróprios quebra o mapeamento dos index do pacote (`dnd`), por conta de renderizações assíncronas do React 18+. Por conta disso, a ordenação foi engatada como "forçada e profunda" num `useEffect` do `AppProvider` recriando cópias corretas do array. Nunca adicione filtragens de sort *dentro* do JSX na View do Board.tsx.

3. **Automação Puxada Pela Movimentação Automática:** No momento atual, no arquivo `AppContext.tsx`, você notará um `console.log` sendo disparado confirmando o arrasto de um Card para a etapa final. *Este log é o esqueleto ("placeholder") do webhook.* Substitua-o nas fases mais adiante.

---

## 📍 Roadmap do Projeto e Próximos Passos (Pronto Para Seguir)

O usuário, @Dival, ditará suas prioridades. Mantenha em mente estas missões estendidas:

- [ ] **Fase 3 (Integração de Base): Supabase (Database)** 
  - Retirar as raízes simuladas do `data/mockData.ts`. Substitua por instâncias de chaves SQL RLS (`row-level-security`). Transforme as mutações do contexto em requisições assíncronas aguardando a consolidação final do servidor para re-rendering local ou utilize bibliotecas `swr` (react-query).

- [ ] **Fase 4 (Automação de E-mail): Supabase Edge Functions / Python Worker** 
  - Conectar e orquestrar as webhooks de transição do Board para disparar e-mails para o `clientEmail` que o card encapsula (Notificando orçamentos aprovados de forma transparente).

- [ ] **Fase 5 (Security Auth): Controle de Usuário** 
  - Implementação de Login com provedor Supabase (Auth Views e Protected API Routes), impedindo acessos curiosos aos componentes principais do dashboard.

- [ ] **Fase 6 (Deploy Hostinger via Coolify)** 
  - Subir a configuração Docker/Node a uma VPS sob o formato de pipelines. Use `user_workflows` configurados para guiar seus passos.

### Padrão de Engenharia Recomendado (A estética importa!)
O autor requer visuais fluidos, premiums e sofisticados. **Nunca reduza a qualidade do front-end.** Use componentes com `glassmorphism`, transições orgânicas de interações, cantos arredondados condizentes com guidelines modernas e layouts que demonstram polimento de engenharia! 

---
> 💡 *Dica Final:* Inicie verificando `AppContext.tsx`, `DashboardView.tsx` e `TasksListView.tsx` para se contextualizar nas propriedades atuais implementadas.
