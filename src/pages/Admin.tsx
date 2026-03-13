import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LayoutDashboard, PawPrint, ShieldAlert, Users, Plus, Trash2, CheckCircle, Clock, X, Calendar, Mail, Phone, MapPin, Pencil } from 'lucide-react';
import { User, Pet, Denuncia, Event, Voluntario } from '../types';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';

interface AdminProps {
  user: User | null;
}

export default function Admin({ user }: AdminProps) {
  const [activeTab, setActiveTab] = useState<'pets' | 'denuncias' | 'voluntarios' | 'eventos' | 'racas'>('pets');
  const [pets, setPets] = useState<Pet[]>([]);
  const [denuncias, setDenuncias] = useState<Denuncia[]>([]);
  const [voluntarios, setVoluntarios] = useState<Voluntario[]>([]);
  const [eventos, setEventos] = useState<Event[]>([]);
  const [breeds, setBreeds] = useState<{ id: number; name: string; type: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPetModalOpen, setIsPetModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [petToDelete, setPetToDelete] = useState<Pet | null>(null);
  const [editingPetId, setEditingPetId] = useState<number | null>(null);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isBreedModalOpen, setIsBreedModalOpen] = useState(false);
  const navigate = useNavigate();

  // Form states
  const [newPet, setNewPet] = useState({
    nome: '', tipo: 'Cachorro', raca: 'Vira-lata (SRD)', porte: 'Médio', idade: 'Adulto', 
    cor: '', pelo: 'Curto', sexo: 'Macho',
    descricao: '', imagemUrl: '', status: 'Disponível'
  });
  const [newEvent, setNewEvent] = useState({
    titulo: '', descricao: '', data: '', local: '', imagemUrl: ''
  });
  const [newBreed, setNewBreed] = useState({
    name: '', type: 'Cachorro'
  });

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const [petsData, denunciasData, voluntariosData, eventosData, breedsData] = await Promise.all([
          api.getPets(),
          api.getDenuncias(user.token!),
          api.getVolunteers(user.token!),
          api.getEvents(),
          api.getBreeds()
        ]);
        setPets(petsData);
        setDenuncias(denunciasData);
        setVoluntarios(voluntariosData);
        setEventos(eventosData);
        setBreeds(breedsData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, navigate]);

  const handleAddPet = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingPetId) {
        await api.updatePet(editingPetId, newPet, user!.token!);
      } else {
        await api.createPet(newPet, user!.token!);
      }
      setIsPetModalOpen(false);
      setEditingPetId(null);
      setNewPet({ 
        nome: '', tipo: 'Cachorro', raca: 'Vira-lata (SRD)', porte: 'Médio', idade: 'Adulto', 
        cor: '', pelo: 'Curto', sexo: 'Macho',
        descricao: '', imagemUrl: '', status: 'Disponível' 
      });
      const updatedPets = await api.getPets();
      setPets(updatedPets);
    } catch (err) {
      alert(editingPetId ? 'Erro ao atualizar pet' : 'Erro ao cadastrar pet');
    }
  };

  const handleEditPetClick = (pet: Pet) => {
    setNewPet({
      nome: pet.nome,
      tipo: pet.tipo,
      raca: pet.raca,
      porte: pet.porte,
      idade: pet.idade,
      cor: pet.cor || '',
      pelo: pet.pelo,
      sexo: pet.sexo,
      descricao: pet.descricao,
      imagemUrl: pet.imagemUrl,
      status: pet.status
    });
    setEditingPetId(pet.id);
    setIsPetModalOpen(true);
  };

  const handleAddBreed = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.createBreed(newBreed, user!.token!);
      setIsBreedModalOpen(false);
      setNewBreed({ name: '', type: 'Cachorro' });
      const updatedBreeds = await api.getBreeds();
      setBreeds(updatedBreeds);
    } catch (err) {
      alert('Erro ao cadastrar raça');
    }
  };

  const handleDeleteBreed = async (id: number) => {
    if (!confirm('Deseja realmente excluir esta raça?')) return;
    try {
      await api.deleteBreed(id, user!.token!);
      const updatedBreeds = await api.getBreeds();
      setBreeds(updatedBreeds);
    } catch (err) {
      alert('Erro ao excluir raça');
    }
  };

  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.createEvent(newEvent, user!.token!);
      setIsEventModalOpen(false);
      setNewEvent({ titulo: '', descricao: '', data: '', local: '', imagemUrl: '' });
      const updatedEvents = await api.getEvents();
      setEventos(updatedEvents);
    } catch (err) {
      alert('Erro ao cadastrar evento');
    }
  };

  const handleTogglePetStatus = async (pet: Pet) => {
    const newStatus = pet.status === 'Disponível' ? 'Adotado' : 'Disponível';
    try {
      await api.updatePet(pet.id, { ...pet, status: newStatus }, user!.token!);
      const updatedPets = await api.getPets();
      setPets(updatedPets);
    } catch (err) {
      alert('Erro ao atualizar status do pet');
    }
  };

  const handleDeletePet = async () => {
    if (!petToDelete) return;
    try {
      await api.deletePet(petToDelete.id, user!.token!);
      const updatedPets = await api.getPets();
      setPets(updatedPets);
      setIsDeleteModalOpen(false);
      setPetToDelete(null);
    } catch (err) {
      alert('Erro ao excluir pet');
    }
  };

  const confirmDeletePet = (pet: Pet) => {
    setPetToDelete(pet);
    setIsDeleteModalOpen(true);
  };

  if (!user || user.role !== 'admin') return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#18212f] flex items-center gap-3">
            <LayoutDashboard className="text-[#7956a6]" /> Painel Administrativo
          </h1>
          <p className="text-gray-500">Gerencie pets, denúncias, eventos e voluntários da plataforma.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setIsPetModalOpen(true)}
            className="bg-[#7956a6] text-white px-6 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-[#6a1b9a] transition-colors"
          >
            <Plus size={20} /> Novo Pet
          </button>
          <button 
            onClick={() => setIsBreedModalOpen(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} /> Nova Raça
          </button>
          <button 
            onClick={() => setIsEventModalOpen(true)}
            className="bg-[#FFCC00] text-[#18212f] px-6 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-[#e6b800] transition-colors"
          >
            <Calendar size={20} /> Novo Evento
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-6">
          <div className="bg-[#FFCC00]/20 p-4 rounded-2xl">
            <PawPrint className="text-[#7956a6]" size={32} />
          </div>
          <div>
            <p className="text-3xl font-bold text-[#18212f]">{pets.length}</p>
            <p className="text-sm text-gray-500 font-medium">Pets</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-6">
          <div className="bg-red-50 p-4 rounded-2xl">
            <ShieldAlert className="text-red-600" size={32} />
          </div>
          <div>
            <p className="text-3xl font-bold text-[#18212f]">{denuncias.length}</p>
            <p className="text-sm text-gray-500 font-medium">Denúncias</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-6">
          <div className="bg-blue-50 p-4 rounded-2xl">
            <Users className="text-blue-600" size={32} />
          </div>
          <div>
            <p className="text-3xl font-bold text-[#18212f]">{voluntarios.length}</p>
            <p className="text-sm text-gray-500 font-medium">Voluntários</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-6">
          <div className="bg-purple-50 p-4 rounded-2xl">
            <Calendar className="text-purple-600" size={32} />
          </div>
          <div>
            <p className="text-3xl font-bold text-[#18212f]">{eventos.length}</p>
            <p className="text-sm text-gray-500 font-medium">Eventos</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex border-b border-gray-100 overflow-x-auto">
          {[
            { id: 'pets', label: 'Pets', icon: PawPrint },
            { id: 'denuncias', label: 'Denúncias', icon: ShieldAlert },
            { id: 'voluntarios', label: 'Voluntários', icon: Users },
            { id: 'eventos', label: 'Eventos', icon: Calendar },
            { id: 'racas', label: 'Raças', icon: PawPrint },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 min-w-[120px] py-4 px-6 font-bold text-sm flex items-center justify-center gap-2 transition-colors ${
                activeTab === tab.id ? 'bg-[#7956a6] text-white' : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              <tab.icon size={18} /> {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {loading ? (
            <div className="py-20 text-center text-gray-500">Carregando dados...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-gray-400 text-xs uppercase tracking-wider font-bold">
                    {activeTab === 'pets' ? (
                      <>
                        <th className="pb-4 px-4">Foto</th>
                        <th className="pb-4 px-4">Nome</th>
                        <th className="pb-4 px-4">Tipo</th>
                        <th className="pb-4 px-4">Status</th>
                        <th className="pb-4 px-4 text-right">Ações</th>
                      </>
                    ) : activeTab === 'denuncias' ? (
                      <>
                        <th className="pb-4 px-4">Data</th>
                        <th className="pb-4 px-4">Tipo</th>
                        <th className="pb-4 px-4">Local</th>
                        <th className="pb-4 px-4">Contato</th>
                        <th className="pb-4 px-4 text-right">Ações</th>
                      </>
                    ) : activeTab === 'voluntarios' ? (
                      <>
                        <th className="pb-4 px-4">Nome</th>
                        <th className="pb-4 px-4">Área</th>
                        <th className="pb-4 px-4">Disponibilidade</th>
                        <th className="pb-4 px-4">Contato</th>
                        <th className="pb-4 px-4 text-right">Ações</th>
                      </>
                    ) : activeTab === 'eventos' ? (
                      <>
                        <th className="pb-4 px-4">Data</th>
                        <th className="pb-4 px-4">Título</th>
                        <th className="pb-4 px-4">Local</th>
                        <th className="pb-4 px-4 text-right">Ações</th>
                      </>
                    ) : (
                      <>
                        <th className="pb-4 px-4">Nome</th>
                        <th className="pb-4 px-4">Tipo</th>
                        <th className="pb-4 px-4 text-right">Ações</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {activeTab === 'pets' && pets.map(pet => (
                    <tr key={pet.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4">
                        <img src={pet.imagemUrl} alt="" className="w-12 h-12 rounded-xl object-cover" />
                      </td>
                      <td className="py-4 px-4 font-bold text-[#18212f]">{pet.nome}</td>
                      <td className="py-4 px-4 text-gray-500">{pet.tipo} - {pet.raca}</td>
                      <td className="py-4 px-4">
                        <button 
                          onClick={() => handleTogglePetStatus(pet)}
                          className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                            pet.status === 'Disponível' 
                              ? 'bg-green-50 text-green-700 hover:bg-green-100' 
                              : 'bg-orange-50 text-orange-700 hover:bg-orange-100'
                          }`}
                          title="Clique para alterar o status"
                        >
                          {pet.status}
                        </button>
                      </td>
                      <td className="py-4 px-4 text-right space-x-2">
                        <button 
                          onClick={() => handleEditPetClick(pet)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                          title="Editar Pet"
                        >
                          <Pencil size={18} />
                        </button>
                        <button 
                          onClick={() => confirmDeletePet(pet)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                          title="Excluir Pet"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  
                  {activeTab === 'denuncias' && denuncias.map(den => (
                    <tr key={den.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4 text-sm text-gray-500">
                        {new Date(den.data_denuncia).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4 font-bold text-red-600">{den.tipo}</td>
                      <td className="py-4 px-4 text-gray-500">{den.localizacao || '-'}</td>
                      <td className="py-4 px-4">
                        <span className="text-gray-600 text-sm">{den.anonimo ? 'Anônimo' : den.contato}</span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg"><CheckCircle size={18} /></button>
                      </td>
                    </tr>
                  ))}

                  {activeTab === 'voluntarios' && voluntarios.map(vol => (
                    <tr key={vol.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4 font-bold text-[#18212f]">{vol.nome}</td>
                      <td className="py-4 px-4 text-gray-500">{vol.area_interesse}</td>
                      <td className="py-4 px-4 text-gray-500">{vol.disponibilidade}</td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        <div className="flex flex-col">
                          <span>{vol.email}</span>
                          <span>{vol.telefone}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Mail size={18} /></button>
                      </td>
                    </tr>
                  ))}

                  {activeTab === 'eventos' && eventos.map(ev => (
                    <tr key={ev.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4 text-sm text-gray-500">
                        {new Date(ev.data).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4 font-bold text-[#18212f]">{ev.titulo}</td>
                      <td className="py-4 px-4 text-gray-500">{ev.local}</td>
                      <td className="py-4 px-4 text-right">
                        <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={18} /></button>
                      </td>
                    </tr>
                  ))}

                  {activeTab === 'racas' && breeds.map(breed => (
                    <tr key={breed.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4 font-bold text-[#18212f]">{breed.name}</td>
                      <td className="py-4 px-4 text-gray-500">{breed.type}</td>
                      <td className="py-4 px-4 text-right">
                        <button 
                          onClick={() => handleDeleteBreed(breed.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Pet Modal */}
      <AnimatePresence>
        {isPetModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden"
            >
              <div className="bg-[#7956a6] p-6 text-white flex justify-between items-center">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <PawPrint /> {editingPetId ? 'Editar Pet' : 'Novo Pet para Adoção'}
                </h2>
                <button onClick={() => { setIsPetModalOpen(false); setEditingPetId(null); }} className="hover:bg-white/20 p-2 rounded-full transition-colors">
                  <X size={24} />
                </button>
              </div>
              <form onSubmit={handleAddPet} className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[70vh] overflow-y-auto">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Nome do Pet</label>
                  <input 
                    required
                    value={newPet.nome}
                    onChange={e => setNewPet({...newPet, nome: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 ring-[#7956a6] outline-none"
                    placeholder="Ex: Rex"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Tipo</label>
                  <select 
                    value={newPet.tipo}
                    onChange={e => setNewPet({...newPet, tipo: e.target.value as any})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 ring-[#7956a6] outline-none"
                  >
                    <option value="Cachorro">Cachorro</option>
                    <option value="Gato">Gato</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Raça</label>
                  <select 
                    value={newPet.raca}
                    onChange={e => setNewPet({...newPet, raca: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 ring-[#7956a6] outline-none"
                  >
                    <option value="Vira-lata (SRD)">Vira-lata (SRD)</option>
                    {breeds.filter(b => b.type === newPet.tipo).map(b => (
                      <option key={b.id} value={b.name}>{b.name}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Porte</label>
                  <select 
                    value={newPet.porte}
                    onChange={e => setNewPet({...newPet, porte: e.target.value as any})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 ring-[#7956a6] outline-none"
                  >
                    <option value="Pequeno">Pequeno</option>
                    <option value="Médio">Médio</option>
                    <option value="Grande">Grande</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Idade</label>
                  <select 
                    value={newPet.idade}
                    onChange={e => setNewPet({...newPet, idade: e.target.value as any})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 ring-[#7956a6] outline-none"
                  >
                    <option value="Filhote">Filhote</option>
                    <option value="Adulto">Adulto</option>
                    <option value="Idoso">Idoso</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Sexo</label>
                  <select 
                    value={newPet.sexo}
                    onChange={e => setNewPet({...newPet, sexo: e.target.value as any})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 ring-[#7956a6] outline-none"
                  >
                    <option value="Macho">Macho</option>
                    <option value="Fêmea">Fêmea</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Pelo</label>
                  <select 
                    value={newPet.pelo}
                    onChange={e => setNewPet({...newPet, pelo: e.target.value as any})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 ring-[#7956a6] outline-none"
                  >
                    <option value="Curto">Curto</option>
                    <option value="Médio">Médio</option>
                    <option value="Longo">Longo</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Cor</label>
                  <input 
                    required
                    value={newPet.cor}
                    onChange={e => setNewPet({...newPet, cor: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 ring-[#7956a6] outline-none"
                    placeholder="Ex: Marrom e Branco"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Status de Adoção</label>
                  <select 
                    value={newPet.status}
                    onChange={e => setNewPet({...newPet, status: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 ring-[#7956a6] outline-none"
                  >
                    <option value="Disponível">Disponível</option>
                    <option value="Adotado">Adotado</option>
                  </select>
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-bold text-gray-700">URL da Imagem</label>
                  <input 
                    required
                    value={newPet.imagemUrl}
                    onChange={e => setNewPet({...newPet, imagemUrl: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 ring-[#7956a6] outline-none"
                    placeholder="https://..."
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-bold text-gray-700">Descrição</label>
                  <textarea 
                    required
                    value={newPet.descricao}
                    onChange={e => setNewPet({...newPet, descricao: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 ring-[#7956a6] outline-none h-32 resize-none"
                    placeholder="Conte a história do pet..."
                  />
                </div>
                <div className="md:col-span-2 pt-4">
                  <button type="submit" className="w-full bg-[#7956a6] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#6a1b9a] transition-colors">
                    {editingPetId ? 'Salvar Alterações' : 'Cadastrar Pet'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {isDeleteModalOpen && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
            >
              <div className="bg-red-600 p-6 text-white flex justify-between items-center">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <ShieldAlert /> Confirmar Exclusão
                </h2>
                <button onClick={() => setIsDeleteModalOpen(false)} className="hover:bg-white/20 p-2 rounded-full transition-colors">
                  <X size={24} />
                </button>
              </div>
              <div className="p-8 space-y-6">
                <p className="text-gray-600 text-center text-lg">
                  Deseja realmente excluir o pet <span className="font-bold text-[#18212f]">{petToDelete?.nome}</span>? 
                  Esta ação não pode ser desfeita.
                </p>
                <div className="flex gap-4">
                  <button 
                    onClick={() => setIsDeleteModalOpen(false)}
                    className="flex-1 px-6 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button 
                    onClick={handleDeletePet}
                    className="flex-1 bg-red-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-red-700 transition-colors"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Breed Modal */}
      <AnimatePresence>
        {isBreedModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
            >
              <div className="bg-blue-600 p-6 text-white flex justify-between items-center">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <PawPrint /> Nova Raça
                </h2>
                <button onClick={() => setIsBreedModalOpen(false)} className="hover:bg-white/20 p-2 rounded-full transition-colors">
                  <X size={24} />
                </button>
              </div>
              <form onSubmit={handleAddBreed} className="p-8 space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Nome da Raça</label>
                  <input 
                    required
                    value={newBreed.name}
                    onChange={e => setNewBreed({...newBreed, name: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 ring-blue-600 outline-none"
                    placeholder="Ex: Labrador"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Espécie</label>
                  <select 
                    value={newBreed.type}
                    onChange={e => setNewBreed({...newBreed, type: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 ring-blue-600 outline-none"
                  >
                    <option value="Cachorro">Cachorro</option>
                    <option value="Gato">Gato</option>
                  </select>
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors">
                  Cadastrar Raça
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Event Modal */}
      <AnimatePresence>
        {isEventModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden"
            >
              <div className="bg-[#FFCC00] p-6 text-[#18212f] flex justify-between items-center">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Calendar /> Novo Evento da ONG
                </h2>
                <button onClick={() => setIsEventModalOpen(false)} className="hover:bg-black/10 p-2 rounded-full transition-colors">
                  <X size={24} />
                </button>
              </div>
              <form onSubmit={handleAddEvent} className="p-8 space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Título do Evento</label>
                  <input 
                    required
                    value={newEvent.titulo}
                    onChange={e => setNewEvent({...newEvent, titulo: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 ring-[#FFCC00] outline-none"
                    placeholder="Ex: Feira de Adoção no Parque"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Data e Hora</label>
                    <input 
                      required
                      type="datetime-local"
                      value={newEvent.data}
                      onChange={e => setNewEvent({...newEvent, data: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 ring-[#FFCC00] outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Local</label>
                    <input 
                      required
                      value={newEvent.local}
                      onChange={e => setNewEvent({...newEvent, local: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 ring-[#FFCC00] outline-none"
                      placeholder="Ex: Praça Central"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">URL da Imagem</label>
                  <input 
                    required
                    value={newEvent.imagemUrl}
                    onChange={e => setNewEvent({...newEvent, imagemUrl: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 ring-[#FFCC00] outline-none"
                    placeholder="https://..."
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Descrição</label>
                  <textarea 
                    required
                    value={newEvent.descricao}
                    onChange={e => setNewEvent({...newEvent, descricao: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 ring-[#FFCC00] outline-none h-32 resize-none"
                    placeholder="Detalhes sobre o evento..."
                  />
                </div>
                <button type="submit" className="w-full bg-[#FFCC00] text-[#18212f] py-4 rounded-xl font-bold text-lg hover:bg-[#e6b800] transition-colors">
                  Criar Evento
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
