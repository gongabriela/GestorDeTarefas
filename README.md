# TaskWave - Gestor de Tarefas Pessoal

O **TaskWave** é uma aplicação web de gestão de tarefas (To-Do List & Kanban) desenvolvida como projeto final para o módulo de Fundamentos de Angular. Focada em produtividade e com um design moderno (Dark/Neon Theme), permite aos utilizadores organizar o seu dia a dia de forma visual e intuitiva.

[![CI](https://github.com/gongabriela/GestorDeTarefas/actions/workflows/ci.yml/badge.svg)](https://github.com/gongabriela/GestorDeTarefas/actions/workflows/ci.yml)

## Funcionalidades Principais

* **Dashboard Analítico:** Visão geral das tarefas (Total, Concluídas, Em Progresso, Atrasadas) e lista rápida de tarefas que terminam "Hoje".
* **Quadro Kanban:** Organização visual das tarefas em colunas (`To Do`, `In Progress`, `Done`) com atualização dinâmica de estado.
* **Gestão Completa (CRUD):** Criação, leitura, edição e eliminação de tarefas com validação de formulários.
* **Filtros e Pesquisa:** Capacidade de pesquisar tarefas por texto e filtrá-las por categorias (Work, Personal, Study, Urgent).
* **Design Responsivo:** Interface 100% adaptada para Desktop, Tablets e Mobile (Mobile-First approach parcial).

## Tecnologias Utilizadas

* **Framework:** Angular (v17+)
* **Linguagens:** TypeScript, HTML5, CSS3
* **Estilização:** CSS puro com CSS Variables, Flexbox e CSS Grid. Design Intrínseco e Media Queries para responsividade.
* **Ícones:** FontAwesome

## Live Demo (Acesso Online)

A aplicação está publicada e a correr na íntegra no GitHub Pages. Pode aceder e testar todas as funcionalidades diretamente aqui:
**[Clique aqui para abrir o TaskWave](https://gongabriela.github.io/GestorDeTarefas/#/dashboard)**

---

## Como correr o projeto localmente (Para Desenvolvimento)

Caso pretenda clonar o projeto para analisar o código ou fazer modificações na sua máquina, siga os passos abaixo:

### Pré-requisitos
Certifique-se de que tem o [Node.js](https://nodejs.org/) e o [Angular CLI](https://angular.io/cli) instalados.

### Passos de Instalação

1. Clone este repositório para a sua máquina:
   ```bash
   git clone https://github.com/gongabriela/GestorDeTarefas.git
    ```

2. Navegue para a pasta do projeto:
    ```bash
    cd GestorDeTarefas
    ```

3. Instale as dependências necessárias:
    ```bash
    npm install
    ```

4. Inicie o servidor local do Angular:
    ```bash
    ng serve --open
    ```

---
