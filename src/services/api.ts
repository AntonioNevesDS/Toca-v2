import { Pet, Event, User } from '../types';

const API_URL = '/api';

// comuinicação do site com a API
export const api = {
  //lista todos os animais
  async getPets(): Promise<Pet[]> {
    const res = await fetch(`${API_URL}/pets`);
    return res.json();
  },

  //detalhes do animal
  async getPet(id: string): Promise<Pet> {
    const res = await fetch(`${API_URL}/pets/${id}`);
    if (!res.ok) throw new Error("Pet não encontrado");
    return res.json();
  },

  //cria um novo animal
  async createPet(data: any, token: string) {
    const res = await fetch(`${API_URL}/pets`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` //token
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error((await res.json()).error);
    return res.json();
  },

  //atualiza os dados do animal
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

  //apaga o animal
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
