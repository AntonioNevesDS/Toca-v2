import React, { useState, useEffect } from 'react';
import { X, Filter, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { api } from '../services/api';

interface PetFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: any) => void;
  currentFilters: any;
}

export default function PetFilterModal({ isOpen, onClose, onApply, currentFilters }: PetFilterModalProps) {
  const [filters, setFilters] = useState(currentFilters);
  const [breeds, setBreeds] = useState<{ id: number; name: string; type: string }[]>([]);

  useEffect(() => {
    if (isOpen) {
      setFilters(currentFilters);
      fetchBreeds();
    }
  }, [isOpen, currentFilters]);

  const fetchBreeds = async () => {
    try {
      const data = await api.getBreeds();
      setBreeds(data);
    } catch (error) {
      console.error("Erro ao buscar raças:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    const resetFilters = {
      tipo: 'todos',
      raca: 'todas',
      porte: 'todos',
      idade: 'todos',
      pelo: 'todos',
      sexo: 'todos',
      cor: ''
    };
    setFilters(resetFilters);
  };

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  const filteredBreeds = breeds.filter(b => filters.tipo === 'todos' || b.type === filters.tipo);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="p-6 border-b flex justify-between items-center bg-gray-50">
              <div className="flex items-center gap-2">
                <Filter className="text-[#7956a6]" size={24} />
                <h2 className="text-2xl font-bold text-[#18212f]">Filtros Avançados</h2>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                <X size={24} className="text-gray-500" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Tipo */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Espécie</label>
                  <select
                    name="tipo"
                    value={filters.tipo}
                    onChange={handleChange}
                    className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 ring-[#7956a6] outline-none bg-white"
                  >
                    <option value="todos">Todas as Espécies</option>
                    <option value="Cachorro">Cachorro</option>
                    <option value="Gato">Gato</option>
                  </select>
                </div>

                {/* Raça */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Raça</label>
                  <select
                    name="raca"
                    value={filters.raca}
                    onChange={handleChange}
                    className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 ring-[#7956a6] outline-none bg-white"
                  >
                    <option value="todas">Todas as Raças</option>
                    {filteredBreeds.map(b => (
                      <option key={b.id} value={b.name}>{b.name}</option>
                    ))}
                  </select>
                </div>

                {/* Porte */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Porte</label>
                  <select
                    name="porte"
                    value={filters.porte}
                    onChange={handleChange}
                    className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 ring-[#7956a6] outline-none bg-white"
                  >
                    <option value="todos">Todos os Portes</option>
                    <option value="Pequeno">Pequeno</option>
                    <option value="Médio">Médio</option>
                    <option value="Grande">Grande</option>
                  </select>
                </div>

                {/* Idade */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Idade</label>
                  <select
                    name="idade"
                    value={filters.idade}
                    onChange={handleChange}
                    className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 ring-[#7956a6] outline-none bg-white"
                  >
                    <option value="todos">Todas as Idades</option>
                    <option value="Filhote">Filhote</option>
                    <option value="Adulto">Adulto</option>
                    <option value="Idoso">Idoso</option>
                  </select>
                </div>

                {/* Pelo */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Comprimento do Pelo</label>
                  <select
                    name="pelo"
                    value={filters.pelo}
                    onChange={handleChange}
                    className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 ring-[#7956a6] outline-none bg-white"
                  >
                    <option value="todos">Todos os Tipos</option>
                    <option value="Curto">Curto</option>
                    <option value="Médio">Médio</option>
                    <option value="Longo">Longo</option>
                  </select>
                </div>

                {/* Sexo */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Sexo</label>
                  <select
                    name="sexo"
                    value={filters.sexo}
                    onChange={handleChange}
                    className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 ring-[#7956a6] outline-none bg-white"
                  >
                    <option value="todos">Ambos</option>
                    <option value="Macho">Macho</option>
                    <option value="Fêmea">Fêmea</option>
                  </select>
                </div>

                {/* Cor */}
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Cor</label>
                  <input
                    type="text"
                    name="cor"
                    placeholder="Ex: Marrom, Branco, Preto..."
                    value={filters.cor}
                    onChange={handleChange}
                    className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 ring-[#7956a6] outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t bg-gray-50 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleReset}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-gray-200 font-bold text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <RotateCcw size={20} /> Limpar Filtros
              </button>
              <button
                onClick={handleApply}
                className="flex-grow bg-[#7956a6] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#6a1b9a] transition-colors shadow-lg shadow-[#7956a6]/20"
              >
                Aplicar Filtros
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
