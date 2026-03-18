# TaskWave - Gestor de Tarefas Pessoal

[![CI](https://github.com/gongabriela/GestorDeTarefas/actions/workflows/ci.yml/badge.svg)](https://github.com/gongabriela/GestorDeTarefas/actions/workflows/ci.yml)
[![CD](https://github.com/gongabriela/GestorDeTarefas/actions/workflows/deploy.yml/badge.svg)](https://github.com/gongabriela/GestorDeTarefas/actions/workflows/deploy.yml)

O **TaskWave** é uma aplicação web de gestão de tarefas (To-Do List & Kanban) desenvolvida como projeto final para o módulo de Integração de Processos. Originalmente focada em Fundamentos de Angular, a aplicação evoluiu para incluir práticas modernas de DevOps, integrando um pipeline completo de CI/CD e autenticação como serviço (BaaS).

## 🚀 Funcionalidades Principais

* **Dashboard Analítico:** Visão geral das tarefas (Total, Concluídas, Em Progresso, Atrasadas) e lista de prioridades diárias.
* **Quadro Kanban:** Organização visual das tarefas em colunas (`To Do`, `In Progress`, `Done`) com atualização dinâmica de estado.
* **Gestão Completa (CRUD):** Criação, leitura, edição e eliminação de tarefas validadas em tempo real.
* **Filtros e Pesquisa:** Pesquisa por texto e filtragem por categorias (Work, Personal, Study, Urgent).
* **Design Responsivo:** Interface Mobile-First adaptada (Dark/Neon Theme) com ícones FontAwesome otimizados via CDN.

## 🏗️ Arquitetura e Tecnologias

### Frontend & Dados
* **Framework:** Angular (v17+) com TypeScript.
* **Estilização:** CSS puro (Variables, Flexbox, Grid).
* **Armazenamento de Dados:** `localStorage` nativo do navegador para gestão rápida e local do estado das tarefas.
* **Autenticação:** Integração com **Supabase Auth** para gestão segura de login e sessões de utilizadores.

### DevOps & CI/CD
* **Integração Contínua (CI):** GitHub Actions configurado para executar validações de Linting e Build em cada Pull Request, protegendo a branch principal contra erros de compilação.
* **Entrega Contínua (CD):** Deploy automatizado e sem intervenção humana para o GitHub Pages em cada merge aprovado.
* **Segurança:** Gestão de credenciais de ambiente através de GitHub Secrets (chaves da API não expostas no código fonte).
* **Gestão de Versões:** Estratégia de feature-branches com *Pull Request Templates* e proteção rigorosa da branch `develop-idp`.

## 🌐 Live Demo (Acesso Online)

A aplicação está publicada e a ser atualizada automaticamente pelo nosso pipeline de CD. Pode testar todas as funcionalidades diretamente aqui:
**[Clique aqui para abrir o TaskWave](https://gongabriela.github.io/GestorDeTarefas/#/dashboard)**

---

## 💻 Como correr o projeto localmente

Caso pretenda clonar o projeto para análise ou desenvolvimento:

### Pré-requisitos
* [Node.js](https://nodejs.org/) (v20+) e [Angular CLI](https://angular.io/cli) instalados.
* Uma conta Supabase (apenas para configurar as variáveis de ambiente de autenticação).

### Passos de Instalação

1. Clone o repositório:
   ```bash
   git clone [https://github.com/gongabriela/GestorDeTarefas.git](https://github.com/gongabriela/GestorDeTarefas.git)
   ```
2. Navegue para a pasta e instale as dependências:
    ```bash
    cd GestorDeTarefas
    npm install
    ```
3. Configure o ambiente:
   Crie um ficheiro `src/environments/environment.development.ts` e adicione as suas credenciais do Supabase (`supabaseUrl` e `supabaseKey`).
4. Inicie o servidor local:
    ```bash
    ng serve --open
    ```
