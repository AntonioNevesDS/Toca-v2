import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "./src/db/index";

const JWT_SECRET = process.env.JWT_SECRET || "toca-dos-peludos-secret-key-2026";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  //confere se o usuario ta logado
  const authenticateToken = (req: any, res: any, next: any) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ error: "Token não fornecido" });

    jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
      if (err) return res.status(403).json({ error: "Token inválido ou expirado" });
      req.user = user;
      next();
    });
  };

  //checa se o usuario é adm
  const isAdmin = (req: any, res: any, next: any) => {
    if (req.user && req.user.role === 'admin') {
      next();
    } else {
      res.status(403).json({ error: "Acesso negado. Apenas administradores." });
    }
  };

  //rotgas da api
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // rotas de autenticacao
  app.post("/api/auth/register", async (req, res) => {
    const { nome, sobrenome, email, senha, telefone, data_nascimento, genero } = req.body;
    
    try {
      const hashedPassword = await bcrypt.hash(senha, 10);
      const stmt = db.prepare("INSERT INTO users (nome, sobrenome, email, senha, telefone, data_nascimento, genero) VALUES (?, ?, ?, ?, ?, ?, ?)");
      stmt.run(nome, sobrenome, email, hashedPassword, telefone, data_nascimento, genero);
      res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
    } catch (error: any) {
      if (error.code === 'SQLITE_CONSTRAINT') {
        res.status(400).json({ error: "Email já cadastrado." });
      } else {
        res.status(500).json({ error: "Erro ao cadastrar usuário." });
      }
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    const { email, senha } = req.body;
    const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email) as any;

    if (!user || !(await bcrypt.compare(senha, user.senha))) {
      return res.status(401).json({ error: "Email ou senha incorretos." });
    }

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role, nome: user.nome }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token, user: { id: user.id, nome: user.nome, email: user.email, role: user.role } });
  });

  //rotas para manipular os animais
  app.get("/api/pets", (req, res) => {
    const pets = db.prepare("SELECT * FROM pets ORDER BY created_at DESC").all();
    res.json(pets);
  });

  app.get("/api/pets/:id", (req, res) => {
    const pet = db.prepare("SELECT * FROM pets WHERE id = ?").get(req.params.id);
    if (!pet) return res.status(404).json({ error: "Pet não encontrado" });
    res.json(pet);
  });

  app.post("/api/pets", authenticateToken, isAdmin, (req, res) => {
    const { nome, tipo, raca, porte, idade, cor, pelo, sexo, imagemUrl, descricao } = req.body;
    const stmt = db.prepare("INSERT INTO pets (nome, tipo, raca, porte, idade, cor, pelo, sexo, imagemUrl, descricao) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    const result = stmt.run(nome, tipo, raca, porte, idade, cor, pelo, sexo, imagemUrl, descricao);
    res.status(201).json({ id: result.lastInsertRowid });
  });

  app.put("/api/pets/:id", authenticateToken, isAdmin, (req, res) => {
    const { nome, tipo, raca, porte, idade, cor, pelo, sexo, imagemUrl, descricao, status } = req.body;
    const stmt = db.prepare("UPDATE pets SET nome = ?, tipo = ?, raca = ?, porte = ?, idade = ?, cor = ?, pelo = ?, sexo = ?, imagemUrl = ?, descricao = ?, status = ? WHERE id = ?");
    stmt.run(nome, tipo, raca, porte, idade, cor, pelo, sexo, imagemUrl, descricao, status, req.params.id);
    res.json({ message: "Pet atualizado com sucesso!" });
  });

  app.delete("/api/pets/:id", authenticateToken, isAdmin, (req, res) => {
    db.prepare("DELETE FROM pets WHERE id = ?").run(Number(req.params.id));
    res.json({ message: "Pet removido com sucesso!" });
  });

  //racas
  app.get("/api/breeds", (req, res) => {
    const breeds = db.prepare("SELECT * FROM breeds ORDER BY name ASC").all();
    res.json(breeds);
  });

  app.post("/api/breeds", authenticateToken, isAdmin, (req, res) => {
    const { name, type } = req.body;
    try {
      const stmt = db.prepare("INSERT INTO breeds (name, type) VALUES (?, ?)");
      const result = stmt.run(name, type);
      res.status(201).json({ id: result.lastInsertRowid });
    } catch (error) {
      res.status(400).json({ error: "Raça já cadastrada." });
    }
  });

  app.delete("/api/breeds/:id", authenticateToken, isAdmin, (req, res) => {
    db.prepare("DELETE FROM breeds WHERE id = ?").run(req.params.id);
    res.json({ message: "Raça removida com sucesso!" });
  });

  //rotas de eventos
  app.get("/api/events", (req, res) => {
    const events = db.prepare("SELECT * FROM events ORDER BY data ASC").all();
    res.json(events);
  });

  app.post("/api/events", authenticateToken, isAdmin, (req, res) => {
    const { titulo, descricao, data, local } = req.body;
    const stmt = db.prepare("INSERT INTO events (titulo, descricao, data, local) VALUES (?, ?, ?, ?)");
    const result = stmt.run(titulo, descricao, data, local);
    res.status(201).json({ id: result.lastInsertRowid });
  });

  app.put("/api/events/:id", authenticateToken, isAdmin, (req, res) => {
    const { titulo, descricao, data, local } = req.body;
    const stmt = db.prepare("UPDATE events SET titulo = ?, descricao = ?, data = ?, local = ? WHERE id = ?");
    stmt.run(titulo, descricao, data, local, req.params.id);
    res.json({ message: "Evento atualizado com sucesso!" });
  });

  app.delete("/api/events/:id", authenticateToken, isAdmin, (req, res) => {
    db.prepare("DELETE FROM events WHERE id = ?").run(req.params.id);
    res.json({ message: "Evento removido com sucesso!" });
  });

  //rotas de voluntarios
  app.post("/api/voluntarios", (req, res) => {
    const { nome, email, telefone, area_interesse, disponibilidade, mensagem } = req.body;
    const stmt = db.prepare("INSERT INTO voluntarios (nome, email, telefone, area_interesse, disponibilidade, mensagem) VALUES (?, ?, ?, ?, ?, ?)");
    stmt.run(nome, email, telefone, area_interesse, disponibilidade, mensagem);
    res.status(201).json({ message: "Inscrição enviada com sucesso!" });
  });

  app.get("/api/voluntarios", authenticateToken, isAdmin, (req, res) => {
    const voluntarios = db.prepare("SELECT * FROM voluntarios ORDER BY created_at DESC").all();
    res.json(voluntarios);
  });

  app.patch("/api/voluntarios/:id/status", authenticateToken, isAdmin, (req, res) => {
    const { status } = req.body;
    db.prepare("UPDATE voluntarios SET status = ? WHERE id = ?").run(status, req.params.id);
    res.json({ message: "Status do voluntário atualizado!" });
  });

  //rotas de denuncias
  app.post("/api/denuncias", (req, res) => {
    const { tipo, descricao, localizacao, contato, anonimo } = req.body;
    const stmt = db.prepare("INSERT INTO denuncias (tipo, descricao, localizacao, contato, anonimo) VALUES (?, ?, ?, ?, ?)");
    stmt.run(tipo, descricao, localizacao, contato, anonimo ? 1 : 0);
    res.status(201).json({ message: "Denúncia enviada com sucesso!" });
  });

  app.get("/api/denuncias", authenticateToken, isAdmin, (req, res) => {
    const denuncias = db.prepare("SELECT * FROM denuncias ORDER BY data_denuncia DESC").all();
    res.json(denuncias);
  });

  //rotas de perfil do usuario
  app.get("/api/auth/profile", authenticateToken, (req: any, res) => {
    const user = db.prepare("SELECT id, nome, sobrenome, email, telefone, role, created_at FROM users WHERE id = ?").get(req.user.id);
    if (!user) return res.status(404).json({ error: "Usuário não encontrado" });
    res.json(user);
  });

  //config do vite pra ver as mudancas em tempo real
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
