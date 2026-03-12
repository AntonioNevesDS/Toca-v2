import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Users, Mail, Phone, Heart, Clock, CheckCircle2, MessageSquare } from 'lucide-react';
import { api } from '../services/api';

export default function Volunteer() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    area_interesse: '',
    disponibilidade: '',
    mensagem: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await api.createVolunteer(formData);
      setStatus('success');
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16"
    >
      <section className="text-center space-y-6 max-w-3xl mx-auto">
        <div className="bg-[#FFCC00] w-20 h-20 rounded-3xl flex items-center justify-center mx-auto shadow-lg rotate-6">
          <Users className="text-[#7956a6]" size={40} />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-[#18212f]">Seja um Voluntário</h1>
        <p className="text-xl text-gray-600">
          Doe seu tempo e amor para quem mais precisa. Sua ajuda pode mudar o destino de centenas de animais.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-8">
            <h2 className="text-2xl font-bold text-[#18212f]">Como você pode ajudar?</h2>
            
            <div className="space-y-6">
              {[
                { icon: Heart, title: 'Cuidado Direto', desc: 'Banho, tosa, alimentação e carinho para os pets na sede.' },
                { icon: Clock, title: 'Eventos', desc: 'Ajuda na organização e realização de feiras de adoção.' },
                { icon: MessageSquare, title: 'Divulgação', desc: 'Ajude-nos a gerenciar redes sociais e encontrar adotantes.' },
              ].map((item, i) => (
                <div key={i} className="flex gap-6">
                  <div className="bg-[#7956a6]/10 p-4 rounded-2xl h-fit">
                    <item.icon className="text-[#7956a6]" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#18212f]">{item.title}</h3>
                    <p className="text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#18212f] p-8 rounded-3xl text-white">
            <p className="text-lg italic opacity-80">
              "Ser voluntário na Toca dos Peludos foi a melhor experiência da minha vida. 
              Ver o olhar de gratidão de um animal resgatado não tem preço."
            </p>
            <p className="mt-4 font-bold">— Maria Silva, Voluntária há 2 anos</p>
          </div>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100">
          {status === 'success' ? (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-12 space-y-6"
            >
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 size={40} className="text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Inscrição Recebida!</h2>
              <p className="text-gray-600">
                Obrigado pelo interesse! Nossa equipe entrará em contato em breve para conversarmos.
              </p>
              <button 
                onClick={() => setStatus('idle')}
                className="bg-[#7956a6] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#6a1b9a] transition-colors"
              >
                Voltar
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Nome Completo</label>
                  <input
                    required
                    type="text"
                    value={formData.nome}
                    onChange={(e) => setFormData({...formData, nome: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 ring-[#7956a6] outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">E-mail</label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 ring-[#7956a6] outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Telefone / WhatsApp</label>
                <input
                  required
                  type="tel"
                  value={formData.telefone}
                  onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 ring-[#7956a6] outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Área de Interesse</label>
                <select
                  required
                  value={formData.area_interesse}
                  onChange={(e) => setFormData({...formData, area_interesse: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 ring-[#7956a6] outline-none bg-white"
                >
                  <option value="">Selecione uma área</option>
                  <option value="Cuidado com Animais">Cuidado com Animais</option>
                  <option value="Eventos e Feiras">Eventos e Feiras</option>
                  <option value="Redes Sociais e Marketing">Redes Sociais e Marketing</option>
                  <option value="Transporte de Animais">Transporte de Animais</option>
                  <option value="Outros">Outros</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Disponibilidade</label>
                <input
                  required
                  type="text"
                  placeholder="Ex: Sábados à tarde, Dias de semana após as 18h..."
                  value={formData.disponibilidade}
                  onChange={(e) => setFormData({...formData, disponibilidade: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 ring-[#7956a6] outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Por que você quer ser voluntário?</label>
                <textarea
                  rows={3}
                  value={formData.mensagem}
                  onChange={(e) => setFormData({...formData, mensagem: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 ring-[#7956a6] outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-[#7956a6] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#6a1b9a] transition-all shadow-lg shadow-[#7956a6]/20 disabled:opacity-50"
              >
                {status === 'loading' ? 'Enviando...' : 'Enviar Inscrição'}
              </button>
            </form>
          )}
        </div>
      </div>
    </motion.div>
  );
}
