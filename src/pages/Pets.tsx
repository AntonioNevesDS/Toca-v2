import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Search, Filter as FilterIcon, PawPrint, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { Pet } from '../types';
import PetFilterModal from '../components/PetFilterModal';

export default function Pets() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    tipo: 'todos',
    raca: 'todas',
    porte: 'todos',
    idade: 'todos',
    pelo: 'todos',
    sexo: 'todos',
    cor: ''
  });

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    try {
      const data = await api.getPets();
      setPets(data);
    } catch (error) {
      console.error("Erro ao buscar pets:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPets = pets.filter(pet => {
    const matchesSearch = pet.nome.toLowerCase().includes(search.toLowerCase()) ||
                         pet.descricao.toLowerCase().includes(search.toLowerCase());
    const matchesTipo = filters.tipo === 'todos' || pet.tipo === filters.tipo;
    const matchesRaca = filters.raca === 'todas' || pet.raca === filters.raca;
    const matchesPorte = filters.porte === 'todos' || pet.porte === filters.porte;
    const matchesIdade = filters.idade === 'todos' || pet.idade === filters.idade;
    const matchesPelo = filters.pelo === 'todos' || pet.pelo === filters.pelo;
    const matchesSexo = filters.sexo === 'todos' || pet.sexo === filters.sexo;
    const matchesCor = !filters.cor || pet.cor?.toLowerCase().includes(filters.cor.toLowerCase());

    return matchesSearch && matchesTipo && matchesRaca && matchesPorte && matchesIdade && matchesPelo && matchesSexo && matchesCor;
  });

  const activeFiltersCount = Object.entries(filters).filter(([key, value]) => {
    if (key === 'cor') return value !== '';
    if (key === 'raca') return value !== 'todas';
    return value !== 'todos';
  }).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#7956a6]"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12"
    >
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-[#18212f]">Encontre seu novo melhor amigo</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Temos muitos peludos esperando por uma família. Use os filtros abaixo para encontrar o pet ideal para você.
        </p>
      </div>

      {/* Search and Filter Button */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-grow w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Pesquisar por nome ou descrição..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 ring-[#7956a6]"
          />
        </div>
        
        <button
          onClick={() => setIsFilterModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-200 font-bold text-gray-700 hover:bg-gray-50 transition-colors relative w-full md:w-auto justify-center"
        >
          <FilterIcon size={20} className="text-[#7956a6]" />
          Filtros Avançados
          {activeFiltersCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-[#7956a6] text-white text-xs w-6 h-6 rounded-full flex items-center justify-center border-2 border-white">
              {activeFiltersCount}
            </span>
          )}
        </button>
      </div>

      <PetFilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApply={setFilters}
        currentFilters={filters}
      />

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPets.map((pet) => (
          <motion.div
            key={pet.id}
            layout
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ y: -10 }}
            className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 flex flex-col"
          >
            <img src={pet.imagemUrl} alt={pet.nome} className="w-full h-64 object-cover" />
            <div className="p-6 space-y-4 flex-grow flex flex-col">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-[#18212f]">{pet.nome}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                  pet.status === 'Disponível' 
                    ? 'bg-green-50 text-green-700 border-green-200' 
                    : 'bg-orange-50 text-orange-700 border-orange-200'
                }`}>
                  {pet.status}
                </span>
              </div>
              <p className="text-gray-600 line-clamp-2 flex-grow">{pet.descricao}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500 pt-4 border-t border-gray-50">
                <span className="flex items-center gap-1"><PawPrint size={16} /> {pet.tipo}</span>
                <span className="flex items-center gap-1"><Heart size={16} /> {pet.porte}</span>
              </div>
              <Link 
                to={`/pets/${pet.id}`}
                className="block w-full text-center bg-[#7956a6] text-white py-3 rounded-xl font-bold hover:bg-[#6a1b9a] transition-colors mt-4"
              >
                Ver Detalhes
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredPets.length === 0 && (
        <div className="text-center py-20 space-y-4">
          <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
            <Search size={40} className="text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-700">Nenhum pet encontrado</h3>
          <p className="text-gray-500">Tente mudar os filtros ou a pesquisa.</p>
        </div>
      )}
    </motion.div>
  );
}
