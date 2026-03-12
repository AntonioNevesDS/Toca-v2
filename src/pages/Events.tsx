import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Calendar as CalendarIcon, MapPin, Clock } from 'lucide-react';
import { api } from '../services/api';
import { Event } from '../types';

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    api.getEvents().then(setEvents);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-[#18212f]">Por que Realizamos Eventos?</h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Nossos eventos ajudam animais resgatados a encontrarem novos lares, fortalecem nossa rede de voluntários 
            e só são possíveis graças ao apoio e às doações de pessoas que acreditam nessa causa.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="/pets" className="bg-[#FFCC00] text-[#18212f] px-8 py-3 rounded-xl font-bold hover:scale-105 transition-transform">
              Ver Pets Disponíveis
            </a>
            <button className="bg-[#7956a6] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#6a1b9a] transition-colors">
              Fazer uma doação
            </button>
          </div>
        </div>
        <div className="relative">
          <img 
            src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=800" 
            alt="Eventos" 
            className="rounded-3xl shadow-2xl rotate-2"
          />
          <div className="absolute -top-6 -right-6 bg-[#FFCC00] p-6 rounded-2xl shadow-xl font-bold text-[#18212f] rotate-12">
            Próximo Evento em breve!
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <h2 className="text-3xl font-bold text-[#18212f]">Eventos Disponíveis</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <motion.div
              key={event.id}
              whileHover={{ scale: 1.02 }}
              className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 space-y-6"
            >
              <div className="bg-[#7956a6]/10 w-14 h-14 rounded-2xl flex items-center justify-center">
                <CalendarIcon className="text-[#7956a6]" size={28} />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-[#18212f]">{event.titulo}</h3>
                <p className="text-gray-600">{event.descricao}</p>
              </div>
              <div className="space-y-3 pt-4 border-t border-gray-50">
                <div className="flex items-center gap-3 text-sm text-gray-500 font-medium">
                  <Clock size={18} className="text-[#7956a6]" />
                  <span>{new Date(event.data).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-500 font-medium">
                  <MapPin size={18} className="text-[#7956a6]" />
                  <span>{event.local}</span>
                </div>
              </div>
              <button className="w-full bg-[#7956a6] text-white py-3 rounded-xl font-bold hover:bg-[#6a1b9a] transition-colors">
                Tenho Interesse
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
