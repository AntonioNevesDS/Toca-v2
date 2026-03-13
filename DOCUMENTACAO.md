# Documentação do Projeto: Toca dos Peludos

Este documento explica como o site "Toca dos Peludos" funciona, sua arquitetura, banco de dados e as principais variáveis utilizadas.

---

## 1. Arquitetura Geral

O projeto é uma aplicação **Full-Stack** construída com as seguintes tecnologias:

- **Frontend:** React (com Vite), Tailwind CSS para estilos e Lucide React para ícones.
- **Backend:** Node.js com Express.
- **Banco de Dados:** SQLite (usando a biblioteca `better-sqlite3`).
- **Autenticação:** JSON Web Tokens (JWT) e criptografia de senhas com `bcryptjs`.

---

## 2. Estrutura de Arquivos Principal

- `server.ts`: O ponto de entrada do servidor. Configura as rotas da API e integra o Vite como middleware.
- `src/db/index.ts`: Configuração e inicialização do banco de dados SQLite. Define as tabelas e insere dados iniciais (seed).
- `src/App.tsx`: Componente principal do React que gerencia as rotas e o estado global do usuário.
- `src/services/api.ts`: Serviço que centraliza todas as chamadas para as rotas do backend.
- `src/pages/`: Contém as páginas individuais do site (Home, Pets, Login, Admin, etc.).

---

## 3. Banco de Dados (SQLite)

O banco de dados possui as seguintes tabelas principais:

### Tabela `users` (Usuários)
Armazena informações de quem se cadastra no site.
- `id`: Identificador único.
- `nome`, `sobrenome`: Nome do usuário.
- `email`: Utilizado para login (único).
- `senha`: Hash da senha (criptografada).
- `role`: Nível de acesso (`user` ou `admin`).

### Tabela `pets` (Animais)
Armazena os animais disponíveis para adoção.
- `nome`: Nome do pet.
- `tipo`: Espécie (Cachorro ou Gato).
- `raca`: Raça do animal.
- `porte`: Tamanho (Pequeno, Médio, Grande).
- `idade`: Faixa etária (Filhote, Adulto, Idoso).
- `cor`: Cor predominante.
- `status`: Estado atual (Disponível, Adotado).

### Outras Tabelas
- `breeds`: Lista de raças para preencher os filtros.
- `events`: Eventos da ONG.
- `denuncias`: Registros de denúncias de maus-tratos.
- `voluntarios`: Inscrições para voluntariado.

---

## 4. Variáveis e Estados Importantes

### No Frontend (React)
- `user`: Estado que armazena os dados do usuário logado (id, nome, email, role). Se for `null`, o usuário não está logado.
- `token`: String JWT armazenada no `localStorage` para autenticar requisições protegidas.
- `filters`: Objeto utilizado na página de Pets para filtrar a lista. Contém campos como `tipo`, `raca`, `porte`, `cor`, etc.

### No Backend (Node.js)
- `JWT_SECRET`: Chave secreta usada para assinar os tokens de segurança.
- `PORT`: Porta onde o servidor roda (padrão 3000).
- `process.env.NODE_ENV`: Define se o app está em modo de desenvolvimento ou produção.

---

## 5. Como o Fluxo de Dados Funciona

1. **Inicialização:** O servidor inicia, verifica se o arquivo `database.sqlite` existe e cria as tabelas se necessário.
2. **Navegação:** O usuário acessa o site. O React Router gerencia qual página mostrar.
3. **Busca de Dados:** Quando você entra na página de Pets, o React chama `api.getPets()`, que faz uma requisição `GET /api/pets`.
4. **Filtros:** Ao digitar na busca ou selecionar um filtro, o React filtra o array de pets em memória e atualiza a tela instantaneamente. A pesquisa por texto agora abrange nome, descrição, raça, porte e cor.
5. **Autenticação:** Ao fazer login, o servidor verifica a senha, gera um Token e envia de volta. O frontend guarda esse token e o usa no cabeçalho `Authorization` para acessar áreas restritas (como o painel Admin).

---

## 6. Variáveis de Ambiente (.env)

- `JWT_SECRET`: (Opcional) Chave para segurança dos tokens.
- `GEMINI_API_KEY`: Utilizada para integrações com IA (se houver).

---

## 7. Guia de Customização

Aqui estão exemplos de como você pode modificar o site para deixá-lo com a sua cara:

### Como adicionar sua Logo
1. Vá até o arquivo `src/components/Navbar.tsx`.
2. Procure pela tag `<PawPrint ... />` dentro do componente `Navbar`.
3. Você pode substituir o ícone por uma tag `<img>`:
   ```tsx
   <img src="/caminho/para/sua/logo.png" alt="Logo" className="w-10 h-10" />
   ```
4. Certifique-se de colocar o arquivo da imagem na pasta `public/`.

### Como mudar os textos principais
- **Página Inicial:** Altere os textos no arquivo `src/pages/Home.tsx`. Procure por frases como "Adote um amigo" e substitua pelo que desejar.
- **Sobre a ONG:** Altere o arquivo `src/pages/Sobre.tsx`.
- **Contatos:** Altere o arquivo `src/pages/Contatos.tsx` para mudar o endereço, telefone e e-mail exibidos.

### Como mudar o título e ícone da aba do navegador
1. Abra o arquivo `index.html` na raiz do projeto.
2. Para o **Título**: Altere o conteúdo dentro da tag `<title>Toca dos Peludos</title>`.
3. Para o **Ícone (Favicon)**: Procure pela linha `<link rel="icon" ... />` e mude o `href` para o caminho da sua nova imagem (geralmente um arquivo `.ico` ou `.png` na pasta `public/`).

### Como mudar as cores principais
O projeto utiliza **Tailwind CSS**. As cores são aplicadas através de classes como `bg-[#7956a6]` (roxo) ou `bg-[#FFCC00]` (amarelo).
- Para mudar globalmente, você pode fazer uma busca e substituição (Find and Replace) desses códigos hexadecimais por novos, ou configurar um tema no arquivo `tailwind.config.js` (se disponível).

---

*Documento gerado em Março de 2026.*
