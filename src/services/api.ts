import { Pet, Event, User } from '../types';

const API_URL = '/api';

// Esse arquivo é como um catálogo de endereços: ele diz pro site como falar com o servidor (backend)
export const api = {
  // Pega a lista de todos os bichinhos
  async getPets(): Promise<Pet[]> {
    const res = await fetch(`${API_URL}/pets`);
    return res.json();
  },

  // Pega os detalhes de um bichinho só, usando o ID dele
  async getPet(id: string): Promise<Pet> {
    const res = await fetch(`${API_URL}/pets/${id}`);
    if (!res.ok) throw new Error("Pet não encontrado");
    return res.json();
  },

  // Cria um novo bichinho no sistema
  async createPet(data: any, token: string) {
    const res = await fetch(`${API_URL}/pets`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // O token é como um crachá de autorização
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error((await res.json()).error);
    return res.json();
  },

  // Atualiza os dados de um bichinho que já existe
  async updatePet(id: number, data: any, token: string) {
    const res = await fetch(`${API_URL}/pets/${id}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error((await res.json()).error);
    return res.json();
  },

  // Apaga um bichinho do sistema (cuidado!)
  async deletePet(id: number, token: string) {
    const res = await fetch(`${API_URL}/pets/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` },
    });
    if (!res.ok) throw new Error((await res.json()).error);
    return res.json();
  },

  async getEvents(): Promise<Event[]> {
    const res = await fetch(`${API_URL}/events`);
    return res.json();
  },

  async createEvent(data: any, token: string) {
    const res = await fetch(`${API_URL}/events`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error((await res.json()).error);
    return res.json();
  },

  async updateEvent(id: number, data: any, token: string) {
    const res = await fetch(`${API_URL}/events/${id}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error((await res.json()).error);
    return res.json();
  },

  async deleteEvent(id: number, token: string) {
    const res = await fetch(`${API_URL}/events/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` },
    });
    if (!res.ok) throw new Error((await res.json()).error);
    return res.json();
  },

  async createVolunteer(data: any) {
    const res = await fetch(`${API_URL}/voluntarios`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error((await res.json()).error);
    return res.json();
  },

  async getVolunteers(token: string): Promise<any[]> {
    const res = await fetch(`${API_URL}/voluntarios`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    if (!res.ok) throw new Error((await res.json()).error);
    return res.json();
  },

  async updateVolunteerStatus(id: number, status: string, token: string) {
    const res = await fetch(`${API_URL}/voluntarios/${id}/status`, {
      method: 'PATCH',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) throw new Error((await res.json()).error);
    return res.json();
  },

  async register(data: any) {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error((await res.json()).error);
    return res.json();
  },

  async login(data: any): Promise<{ token: string; user: User }> {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error((await res.json()).error);
    return res.json();
  },

  async getProfile(token: string): Promise<User> {
    const res = await fetch(`${API_URL}/auth/profile`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    if (!res.ok) throw new Error((await res.json()).error);
    return res.json();
  },

  async createDenuncia(data: any) {
    const res = await fetch(`${API_URL}/denuncias`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error((await res.json()).error);
    return res.json();
  },

  async getDenuncias(token: string): Promise<any[]> {
    const res = await fetch(`${API_URL}/denuncias`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    if (!res.ok) throw new Error((await res.json()).error);
    return res.json();
  },

  async getBreeds(): Promise<{ id: number; name: string; type: string }[]> {
    const res = await fetch(`${API_URL}/breeds`);
    return res.json();
  },

  async createBreed(data: { name: string; type: string }, token: string) {
    const res = await fetch(`${API_URL}/breeds`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error((await res.json()).error);
    return res.json();
  },

  async deleteBreed(id: number, token: string) {
    const res = await fetch(`${API_URL}/breeds/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` },
    });
    if (!res.ok) throw new Error((await res.json()).error);
    return res.json();
  }
};
