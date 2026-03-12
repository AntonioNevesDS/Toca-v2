import React, { useState } from 'react';
import { motion } from 'motion/react';
import { LogIn, Mail, Lock, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { User } from '../types';

interface LoginProps {
  setUser: (user: User) => void;
}

export default function Login({ setUser }: LoginProps) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = await api.login({ email, senha });
      localStorage.setItem('usuarioLogado', JSON.stringify({ ...data.user, token: data.token }));
      setUser({ ...data.user, token: data.token });
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-md mx-auto px-4 py-20"
    >
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 space-y-8">
        <div className="text-center space-y-2">
          <div className="bg-[#FFCC00] w-16 h-16 rounded-2xl flex items-center justify-center mx-auto shadow-lg rotate-3">
            <LogIn className="text-[#7956a6]" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-[#18212f]">Bem-vindo de volta!</h1>
          <p className="text-gray-500">Entre com sua conta para continuar.</p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl flex items-center gap-3 text-sm font-bold"
          >
            <AlertCircle size={20} />
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
              <Mail size={16} /> Email
            </label>
            <input
              required
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 ring-[#7956a6] outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <Lock size={16} /> Senha
              </label>
              <button type="button" className="text-xs font-bold text-[#7956a6] hover:underline">
                Esqueceu a senha?
              </button>
            </div>
            <input
              required
              type="password"
              placeholder="••••••••"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 ring-[#7956a6] outline-none transition-all"
            />
          </div>

          <button
            disabled={loading}
            className="w-full bg-[#7956a6] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#6a1b9a] transition-all shadow-lg shadow-[#7956a6]/20 disabled:opacity-50"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <div className="text-center text-sm text-gray-500">
          Não tem uma conta?{' '}
          <Link to="/cadastro" className="text-[#7956a6] font-bold hover:underline">
            Cadastre-se agora
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
