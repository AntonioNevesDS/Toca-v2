import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldAlert, MapPin, Phone, Info, CheckCircle2 } from 'lucide-react';
import { api } from '../services/api';

export default function Denuncias() {
  const [formData, setFormData] = useState({
    tipo: '',
    descricao: '',
    localizacao: '',
    contato: '',
    anonimo: false
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await api.createDenuncia(formData);
      setStatus('success');
      setFormData({ tipo: '', descricao: '', localizacao: '', contato: '', anonimo: false });
    } catch (err: any) {
      setStatus('error');
      setError(err.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
            <h2 className="text-2xl font-bold text-[#18212f] flex items-center gap-2">
              <ShieldAlert className="text-[#e74c3c]" /> Emergências
            </h2>
            
            <div className="space-y-4">
              <div className="p-4 bg-red-50 rounded-2xl border border-red-100 flex items-center gap-4">
                <div className="bg-white p-2 rounded-xl shadow-sm">🛡</div>
                <div>
                  <p className="text-xs font-bold text-red-800 uppercase tracking-wider">IBAMA</p>
                  <p className="font-bold text-red-900">0800 618 080</p>
                </div>
              </div>

              <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100 flex items-center gap-4">
                <div className="bg-white p-2 rounded-xl shadow-sm">⚠</div>
                <div>
                  <p className="text-xs font-bold text-orange-800 uppercase tracking-wider">Polícia Ambiental</p>
                  <p className="font-bold text-orange-900">190</p>
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 flex items-center gap-4">
                <div className="bg-white p-2 rounded-xl shadow-sm">❤</div>
                <div>
                  <p className="text-xs font-bold text-blue-800 uppercase tracking-wider">CCZ - Zoonoses</p>
                  <p className="font-bold text-blue-900">(11) 3397-8900</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-[#FFCC00]/10 rounded-2xl border border-[#FFCC00]/30">
              <p className="text-sm text-[#18212f] leading-relaxed">
                <strong>Importante:</strong> Denunciar maus-tratos é um ato de cidadania. 
                Sua denúncia pode ser anônima e ajuda a salvar vidas.
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-2">
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-lg border border-gray-100">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-[#18212f]">Formulário de Denúncia</h1>
              <p className="text-gray-500 mt-2">Preencha os dados abaixo para registrar uma ocorrência.</p>
            </div>

            {status === 'success' ? (
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-12 space-y-6"
              >
                <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 size={40} className="text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Denúncia Enviada!</h2>
                <p className="text-gray-600 max-w-md mx-auto">
                  Obrigado por sua coragem. Nossa equipe analisará as informações e tomará as medidas necessárias.
                </p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="bg-[#7956a6] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#6a1b9a] transition-colors"
                >
                  Fazer outra denúncia
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-bold text-gray-700">Tipo de Ocorrência *</label>
                  <select
                    required
                    value={formData.tipo}
                    onChange={(e) => setFormData({...formData, tipo: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 ring-[#7956a6] outline-none"
                  >
                    <option value="">Selecione o tipo</option>
                    <option value="Maus-tratos">Maus-tratos</option>
                    <option value="Abandono">Abandono</option>
                    <option value="Envenenamento">Envenenamento</option>
                    <option value="Outros">Outros</option>
                  </select>
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-bold text-gray-700">Descrição Detalhada *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Descreva o que está acontecendo, características do animal e do agressor..."
                    value={formData.descricao}
                    onChange={(e) => setFormData({...formData, descricao: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 ring-[#7956a6] outline-none resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                    <MapPin size={16} /> Localização
                  </label>
                  <input
                    type="text"
                    placeholder="Endereço ou ponto de referência"
                    value={formData.localizacao}
                    onChange={(e) => setFormData({...formData, localizacao: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 ring-[#7956a6] outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                    <Phone size={16} /> Seu Contato (Opcional)
                  </label>
                  <input
                    type="text"
                    placeholder="Telefone ou E-mail"
                    disabled={formData.anonimo}
                    value={formData.contato}
                    onChange={(e) => setFormData({...formData, contato: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 ring-[#7956a6] outline-none disabled:bg-gray-50 disabled:text-gray-400"
                  />
                </div>

                <div className="md:col-span-2 flex items-center gap-3 p-4 bg-gray-50 rounded-2xl">
                  <input
                    type="checkbox"
                    id="anonimo"
                    checked={formData.anonimo}
                    onChange={(e) => setFormData({...formData, anonimo: e.target.checked, contato: e.target.checked ? '' : formData.contato})}
                    className="w-5 h-5 accent-[#7956a6]"
                  />
                  <label htmlFor="anonimo" className="text-sm font-bold text-gray-700 cursor-pointer">
                    Desejo fazer esta denúncia de forma anônima
                  </label>
                </div>

                {status === 'error' && (
                  <p className="md:col-span-2 text-red-600 text-sm font-bold bg-red-50 p-3 rounded-xl border border-red-100">
                    Erro: {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="md:col-span-2 bg-[#7956a6] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#6a1b9a] transition-all disabled:opacity-50 shadow-lg shadow-[#7956a6]/20"
                >
                  {status === 'loading' ? 'Enviando...' : 'Enviar Denúncia'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
