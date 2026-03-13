import Database from 'better-sqlite3';
import path from 'path';
import bcrypt from 'bcryptjs';

const dbPath = path.join(process.cwd(), 'database.sqlite');
export const db = new Database(dbPath);

// Initialize database schema
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    sobrenome TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    telefone TEXT,
    data_nascimento TEXT,
    genero TEXT,
    senha TEXT NOT NULL,
    role TEXT DEFAULT 'user',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS pets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    tipo TEXT NOT NULL,
    raca TEXT,
    porte TEXT,
    idade TEXT,
    cor TEXT,
    pelo TEXT,
    sexo TEXT,
    imagemUrl TEXT,
    status TEXT DEFAULT 'Disponível',
    descricao TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS breeds (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    type TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    descricao TEXT,
    data TEXT,
    local TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS denuncias (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tipo TEXT NOT NULL,
    descricao TEXT NOT NULL,
    localizacao TEXT,
    contato TEXT,
    anonimo INTEGER DEFAULT 0,
    data_denuncia DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS doacoes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id INTEGER,
    valor REAL NOT NULL,
    data DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS voluntarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT NOT NULL,
    telefone TEXT,
    area_interesse TEXT,
    disponibilidade TEXT,
    mensagem TEXT,
    status TEXT DEFAULT 'PENDENTE',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Seed initial data if empty
const breedCount = db.prepare('SELECT COUNT(*) as count FROM breeds').get() as { count: number };
if (breedCount.count === 0) {
  const insertBreed = db.prepare('INSERT INTO breeds (name, type) VALUES (?, ?)');
  // Cachorros
  ['Vira-lata (SRD)', 'Poodle', 'Pinscher', 'Shih Tzu', 'Yorkshire', 'Golden Retriever', 'Labrador', 'Bulldog Francês', 'Beagle', 'Dachshund', 'Pastor Alemão', 'Rottweiler'].forEach(b => insertBreed.run(b, 'Cachorro'));
  // Gatos
  ['Vira-lata (SRD)', 'Persa', 'Siamês', 'Maine Coon', 'Angorá', 'Bengal', 'Ragdoll', 'Sphynx'].forEach(b => insertBreed.run(b, 'Gato'));
}

const petCount = db.prepare('SELECT COUNT(*) as count FROM pets').get() as { count: number };
if (petCount.count === 0) {
  const insertPet = db.prepare('INSERT INTO pets (nome, tipo, raca, porte, idade, cor, pelo, sexo, imagemUrl, descricao) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
  insertPet.run('Bolinha', 'Cachorro', 'Vira-lata (SRD)', 'Pequeno', 'Adulto', 'Marrom', 'Curto', 'Macho', 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=400', 'Um cachorrinho muito alegre e dócil.');
  insertPet.run('Luna', 'Gato', 'Siamês', 'Pequeno', 'Filhote', 'Branco e Bege', 'Curto', 'Fêmea', 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=400', 'Gatinha carinhosa que adora um colo.');
  insertPet.run('Thor', 'Cachorro', 'Golden Retriever', 'Grande', 'Adulto', 'Dourado', 'Longo', 'Macho', 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=400', 'Grande, forte e muito brincalhão.');
  insertPet.run('Mel', 'Cachorro', 'Poodle', 'Pequeno', 'Idoso', 'Branco', 'Médio', 'Fêmea', 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=400', 'Uma cadelinha muito inteligente e dócil.');
  insertPet.run('Simba', 'Gato', 'Persa', 'Médio', 'Adulto', 'Cinza', 'Longo', 'Macho', 'https://images.unsplash.com/photo-1513245539768-522411655de4?auto=format&fit=crop&q=80&w=400', 'Um gato majestoso e tranquilo.');
  insertPet.run('Pipoca', 'Cachorro', 'Beagle', 'Médio', 'Filhote', 'Tricolor', 'Curto', 'Fêmea', 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&q=80&w=400', 'Sempre agitada e pronta para uma aventura.');
}

const eventCount = db.prepare('SELECT COUNT(*) as count FROM events').get() as { count: number };
if (eventCount.count === 0) {
  const insertEvent = db.prepare('INSERT INTO events (titulo, descricao, data, local) VALUES (?, ?, ?, ?)');
  insertEvent.run('Feira de Adoção no Parque', 'Venha conhecer seu novo melhor amigo!', '2026-04-15', 'Parque Central');
  insertEvent.run('Mutirão de Banho e Tosa', 'Ajude-nos a cuidar dos nossos peludos.', '2026-05-10', 'Sede da ONG');
  insertEvent.run('Caminhada Solidária', 'Traga seu pet para uma caminhada pela causa animal.', '2026-06-20', 'Orla da Praia');
}

// Seed admin user
const adminCount = db.prepare('SELECT COUNT(*) as count FROM users WHERE role = ?').get('admin') as { count: number };
if (adminCount.count === 0) {
  (async () => {
    try {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      const insertAdmin = db.prepare('INSERT INTO users (nome, sobrenome, email, senha, role) VALUES (?, ?, ?, ?, ?)');
      insertAdmin.run('Administrador', 'Sistema', 'admin@toca.org', hashedPassword, 'admin');
    } catch (error) {
      console.error('Erro ao criar usuário admin:', error);
    }
  })();
}
