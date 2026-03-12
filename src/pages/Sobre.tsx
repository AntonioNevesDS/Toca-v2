import React from 'react';
import { motion } from 'motion/react';
import { Heart, Users, Target, ShieldCheck } from 'lucide-react';

export default function Sobre() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20"
    >
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-[#18212f]">Nossa História</h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            A Toca dos Peludos nasceu do sonho de transformar a realidade de animais abandonados em nossa cidade. 
            O que começou com um pequeno grupo de amigos resgatando cães e gatos, hoje se tornou uma rede de 
            esperança que já salvou milhares de vidas.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            Acreditamos que cada animal merece uma segunda chance e um lar onde seja amado e respeitado. 
            Nossa missão vai além do resgate; educamos a comunidade sobre a posse responsável e combatemos 
            ativamente os maus-tratos.
          </p>
        </div>
        <div className="relative">
          <img 
            src="https://images.unsplash.com/photo-1551730459-92db2a308d6a?auto=format&fit=crop&q=80&w=800" 
            alt="Sobre nós" 
            className="rounded-3xl shadow-2xl"
          />
          <div className="absolute -bottom-6 -right-6 bg-[#FFCC00] p-8 rounded-2xl shadow-xl font-bold text-[#18212f] text-center">
            <p className="text-4xl">10+</p>
            <p className="text-sm">Anos de Luta</p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { icon: Heart, title: 'Amor', desc: 'Cuidamos de cada peludo como se fosse nosso.' },
          { icon: Users, title: 'Comunidade', desc: 'Trabalhamos juntos para um futuro melhor.' },
          { icon: Target, title: 'Missão', desc: 'Erradicar o abandono e os maus-tratos.' },
          { icon: ShieldCheck, title: 'Ética', desc: 'Transparência em todas as nossas ações.' },
        ].map((item, i) => (
          <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center space-y-4">
            <div className="bg-[#7956a6]/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto">
              <item.icon className="text-[#7956a6]" size={32} />
            </div>
            <h3 className="text-xl font-bold text-[#18212f]">{item.title}</h3>
            <p className="text-gray-500 text-sm">{item.desc}</p>
          </div>
        ))}
      </section>

      <section className="bg-[#18212f] text-white rounded-3xl p-12 md:p-20 text-center space-y-8">
        <h2 className="text-3xl md:text-5xl font-bold">Faça parte desta história</h2>
        <p className="text-xl opacity-80 max-w-3xl mx-auto">
          Seja como adotante, voluntário ou doador, sua ajuda é fundamental para continuarmos salvando vidas.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button className="bg-[#FFCC00] text-[#18212f] px-10 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform">
            Quero Ajudar
          </button>
        </div>
      </section>
    </motion.div>
  );
}
