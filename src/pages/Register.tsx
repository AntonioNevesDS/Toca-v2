import React, { useState } from 'react';
import { motion } from 'motion/react';
import { UserPlus, Mail, Lock, User as UserIcon, Phone, Calendar, Users } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';

export default function Register() {
  const [formData, setFormData] = useState({
    nome: '',
    sobrenome: '',
    email: '',
    senha: '',
    confirmaSenha: '',
    telefone: '',
    data_nascimento: '',
    genero: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.senha !== formData.confirmaSenha) {
      setError('As senhas não coincidem');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await api.register(formData);
      alert('Cadastro realizado com sucesso! Faça login para continuar.');
      navigate('/login');
    } catch (err: any) {
      setError(err.message || 'Erro ao cadastrar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-2xl mx-auto px-4 py-12"
    >
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100 space-y-8">
        <div className="text-center space-y-2">
          <div className="bg-[#FFCC00] w-16 h-16 rounded-2xl flex items-center justify-center mx-auto shadow-lg -rotate-3">
            <UserPlus className="text-[#7956a6]" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-[#18212f]">Crie sua conta</h1>
          <p className="text-gray-500">Junte-se a nós e ajude a salvar vidas.</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl text-sm font-bold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
              <UserIcon size={16} /> Nome
            </label>
            <input
              required
              type="text"
              placeholder="Seu nome"
              value={formData.nome}
              onChange={(e) => setFormData({...formData, nome: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 ring-[#7956a6] outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
              <UserIcon size={16} /> Sobrenome
            </label>
            <input
              required
              type="text"
              placeholder="Seu sobrenome"
              value={formData.sobrenome}
              onChange={(e) => setFormData({...formData, sobrenome: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 ring-[#7956a6] outline-none"
            />
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
              <Mail size={16} /> Email
            </label>
            <input
              required
              type="email"
              placeholder="seu@email.com"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 ring-[#7956a6] outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
              <Phone size={16} /> Telefone
            </label>
            <input
              required
              type="tel"
              placeholder="(11) 99999-9999"
              value={formData.telefone}
              onChange={(e) => setFormData({...formData, telefone: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 ring-[#7956a6] outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
              <Calendar size={16} /> Data de Nascimento
            </label>
            <input
              required
              type="date"
              value={formData.data_nascimento}
              onChange={(e) => setFormData({...formData, data_nascimento: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 ring-[#7956a6] outline-none"
            />
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
              <Users size={16} /> Gênero
            </label>
            <select
              required
              value={formData.genero}
              onChange={(e) => setFormData({...formData, genero: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 ring-[#7956a6] outline-none bg-white"
            >
              <option value="">Selecione</option>
              <option value="feminino">Feminino</option>
              <option value="masculino">Masculino</option>
              <option value="outro">Outro</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
              <Lock size={16} /> Senha
            </label>
            <input
              required
              type="password"
              placeholder="••••••••"
              value={formData.senha}
              onChange={(e) => setFormData({...formData, senha: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 ring-[#7956a6] outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
              <Lock size={16} /> Confirmar Senha
            </label>
            <input
              required
              type="password"
              placeholder="••••••••"
              value={formData.confirmaSenha}
              onChange={(e) => setFormData({...formData, confirmaSenha: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 ring-[#7956a6] outline-none"
            />
          </div>

          <button
            disabled={loading}
            className="md:col-span-2 bg-[#7956a6] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#6a1b9a] transition-all shadow-lg shadow-[#7956a6]/20 disabled:opacity-50 mt-4"
          >
            {loading ? 'Cadastrando...' : 'Criar Conta'}
          </button>
        </form>

        <div className="text-center text-sm text-gray-500">
          Já tem uma conta?{' '}
          <Link to="/login" className="text-[#7956a6] font-bold hover:underline">
            Faça login
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
