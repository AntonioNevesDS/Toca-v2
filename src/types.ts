export interface Voluntario {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  area_interesse: string;
  disponibilidade: string;
  mensagem: string;
  data_inscricao: string;
}

export interface User {
  id: number;
  nome: string;
  sobrenome: string;
  email: string;
  role: 'user' | 'admin';
  token?: string;
}

export interface Pet {
  id: number;
  nome: string;
  tipo: string;
  raca: string;
  porte: string;
  imagemUrl: string;
  status: string;
  descricao: string;
}

export interface Event {
  id: number;
  titulo: string;
  descricao: string;
  data: string;
  local: string;
}

export interface Denuncia {
  id: number;
  tipo: string;
  descricao: string;
  localizacao: string;
  contato: string;
  anonimo: boolean;
  data_denuncia: string;
}
