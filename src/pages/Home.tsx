import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { PawPrint, Heart, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { Pet } from '../types';

interface HomeProps {
  onOpenDonation: () => void;
}

export default function Home({ onOpenDonation }: HomeProps) {
  const [pets, setPets] = useState<Pet[]>([]);

  useEffect(() => {
    api.getPets().then(data => setPets(data.slice(0, 3)));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-16 pb-16"
    >
      {/* cabeçalho */}
      <section className="relative h-[500px] overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&q=80&w=1920" 
          alt="Capa" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div 
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="max-w-2xl text-white space-y-6"
            >
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Encontre Seu Novo Melhor Amigo e Adote um Animal
              </h1>
              <p className="text-xl opacity-90">
                Mais de 12.000 Histórias Salvas. Cada adoção é um recomeço
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/pets" className="bg-[#FFCC00] text-[#18212f] px-8 py-3 rounded-xl font-bold text-lg hover:scale-105 transition-transform">
                  Quero Adotar
                </Link>
                <Link to="/sobre" className="bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-3 rounded-xl font-bold text-lg hover:bg-white/30 transition-all">
                  Conhecer ONG
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* area pets */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-[#18212f]">Nossos Peludos</h2>
            <p className="text-gray-600">Conheça alguns dos animais esperando por um lar</p>
          </div>
          <Link to="/pets" className="text-[#7956a6] font-bold flex items-center gap-2 hover:underline">
            Ver todos <ArrowRight size={20} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pets.map((pet) => (
            <motion.div
              key={pet.id}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100"
            >
              <img src={pet.imagemUrl} alt={pet.nome} className="w-full h-64 object-cover" />
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold text-[#18212f]">{pet.nome}</h3>
                  <span className="bg-[#fff7de] text-[#735c00] px-3 py-1 rounded-full text-xs font-bold border border-[#ffe59a]">
                    {pet.status}
                  </span>
                </div>
                <p className="text-gray-600 line-clamp-2">{pet.descricao}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1"><PawPrint size={16} /> {pet.tipo}</span>
                  <span className="flex items-center gap-1"><Heart size={16} /> {pet.porte}</span>
                </div>
                <Link 
                  to={`/pets/${pet.id}`}
                  className="block w-full text-center bg-[#7956a6] text-white py-3 rounded-xl font-bold hover:bg-[#6a1b9a] transition-colors"
                >
                  Ver Detalhes
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* docação */}
      <section className="bg-[#7956a6] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 text-white">
              <h2 className="text-4xl md:text-5xl font-bold">Ajude A Toca Dos Peludos</h2>
              <p className="text-lg opacity-90">
                Sua doação ajuda no resgate, alimentação e cuidados veterinários de centenas de animais.
              </p>
              <div className="grid grid-cols-3 gap-4">
                {[10, 20, 50].map(val => (
                  <button 
                    key={val} 
                    onClick={onOpenDonation}
                    className="bg-[#FFCC00] text-[#18212f] py-4 rounded-xl font-bold text-xl hover:scale-105 transition-transform"
                  >
                    R$ {val}
                  </button>
                ))}
              </div>
              <div className="flex gap-4">
                <input 
                  type="number" 
                  placeholder="Outro valor" 
                  className="flex-grow bg-white/10 border border-white/20 rounded-xl px-6 py-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 ring-[#FFCC00]"
                />
                <button 
                  onClick={onOpenDonation}
                  className="bg-[#FFCC00] text-[#18212f] px-8 py-3 rounded-xl font-bold hover:scale-105 transition-transform"
                >
                  Doar
                </button>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=800" 
                alt="Doação" 
                className="rounded-3xl shadow-2xl border-4 border-[#FFCC00]"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="bg-[#FFCC00] p-3 rounded-full">
                    <Heart className="text-[#7956a6]" />
                  </div>
                  {/* <div>
                    <p className="font-bold text-[#18212f]">Doações Recentes</p>
                    <p className="text-sm text-gray-500">R$ 1.250,00 hoje</p>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
