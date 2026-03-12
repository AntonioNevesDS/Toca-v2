import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { PawPrint, Heart, Calendar, MapPin, Share2, ArrowLeft, Info } from 'lucide-react';
import { api } from '../services/api';
import { Pet } from '../types';

export default function PetDetails() {
  const { id } = useParams<{ id: string }>();
  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      api.getPet(id)
        .then(setPet)
        .catch(() => navigate('/pets'))
        .finally(() => setLoading(false));
    }
  }, [id, navigate]);

  if (loading) return <div className="py-20 text-center text-gray-500">Carregando detalhes...</div>;
  if (!pet) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12"
    >
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-[#7956a6] font-bold hover:underline"
      >
        <ArrowLeft size={20} /> Voltar
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div className="space-y-4">
          <motion.img 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            src={pet.imagemUrl} 
            alt={pet.nome} 
            className="w-full h-[500px] object-cover rounded-3xl shadow-2xl border-4 border-white"
          />
        </div>

        {/* Info */}
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <h1 className="text-5xl font-bold text-[#18212f]">{pet.nome}</h1>
              <button className="p-3 bg-white rounded-2xl shadow-sm border border-gray-100 text-gray-400 hover:text-[#7956a6] transition-colors">
                <Share2 size={24} />
              </button>
            </div>
            <div className="flex flex-wrap gap-3">
              <span className="bg-[#FFCC00]/20 text-[#18212f] px-4 py-1 rounded-full text-sm font-bold border border-[#FFCC00]/30">
                {pet.tipo}
              </span>
              <span className="bg-green-50 text-green-700 px-4 py-1 rounded-full text-sm font-bold border border-green-200">
                {pet.status}
              </span>
              <span className="bg-blue-50 text-blue-700 px-4 py-1 rounded-full text-sm font-bold border border-blue-200">
                {pet.raca}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
              <div className="bg-[#7956a6]/10 p-3 rounded-xl">
                <Heart className="text-[#7956a6]" size={24} />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Porte</p>
                <p className="font-bold text-[#18212f]">{pet.porte}</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
              <div className="bg-[#7956a6]/10 p-3 rounded-xl">
                <Calendar className="text-[#7956a6]" size={24} />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Idade</p>
                <p className="font-bold text-[#18212f]">Adulto</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-[#18212f] flex items-center gap-2">
              <Info className="text-[#7956a6]" /> Sobre {pet.nome}
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              {pet.descricao}
            </p>
          </div>

          <div className="p-8 bg-[#7956a6] rounded-3xl text-white space-y-6 shadow-xl shadow-[#7956a6]/20">
            <h3 className="text-2xl font-bold">Interessado em adotar?</h3>
            <p className="opacity-90">
              O processo de adoção é simples, mas requer responsabilidade. 
              Clique no botão abaixo para iniciar sua jornada com {pet.nome}.
            </p>
            <button className="w-full bg-[#FFCC00] text-[#18212f] py-4 rounded-2xl font-bold text-xl hover:scale-[1.02] transition-transform">
              Iniciar Processo de Adoção
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
