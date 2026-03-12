# Toca dos Peludos - Plataforma da ONG

Esta é uma plataforma completa desenvolvida para a ONG **Toca dos Peludos**, focada no resgate, cuidado e adoção responsável de animais.

## 🚀 Como Rodar o Projeto

1.  **Instalação**: O projeto já vem com todas as dependências necessárias configuradas no `package.json`.
2.  **Execução**:
    *   Desenvolvimento: `npm run dev` (Inicia o servidor Express com Vite integrado).
    *   Produção: `npm run build` seguido de `npm start`.
3.  **Acesso**: O site estará disponível na porta 3000.

## 🛠 Arquitetura e Tecnologias

*   **Frontend**: React 19 com TypeScript.
    *   **Estilização**: Tailwind CSS para um design responsivo e fluido.
    *   **Animações**: Motion (framer-motion) para transições suaves.
    *   **Ícones**: Lucide React.
*   **Backend**: Node.js com Express.
    *   **Banco de Dados**: SQLite (via `better-sqlite3`) para persistência local rápida e eficiente.
    *   **Autenticação**: JWT (JSON Web Tokens) para sessões seguras e Bcrypt para hashing de senhas.
*   **Segurança**:
    *   Senhas criptografadas no banco de dados.
    *   Rotas administrativas protegidas por middleware de autenticação e verificação de cargo (role).
    *   Validação de tokens em todas as requisições sensíveis.

## 📁 Estrutura de Pastas

*   `/server.ts`: Ponto de entrada do servidor Express e API.
*   `/src/db/`: Configuração e schema do banco de dados SQLite.
*   `/src/pages/`: Páginas principais da aplicação (Home, Pets, Admin, etc).
*   `/src/components/`: Componentes React reutilizáveis (Navbar, Footer).
*   `/src/services/`: Serviço de comunicação com a API.

## 🔐 Acesso Administrativo (Teste)

Para acessar o painel administrativo e gerenciar denúncias e pets:
*   **Email**: `admin@toca.org`
*   **Senha**: `admin123`

## 📋 Funcionalidades Implementadas

1.  **Home**: Destaques de pets, doações e chamadas para ação.
2.  **Pets**: Listagem completa com filtros por tipo e busca por nome.
3.  **Eventos**: Agenda de eventos da ONG.
4.  **Denúncias**: Sistema de registro de maus-tratos com opção de anonimato.
5.  **Autenticação**: Cadastro de novos usuários e login seguro.
6.  **Painel ADM**: Visualização de estatísticas, gerenciamento de pets e lista de denúncias recebidas.
7.  **Responsividade**: Design adaptado para dispositivos móveis, tablets e desktop.
