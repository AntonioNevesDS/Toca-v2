import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, PawPrint, Calendar, ShieldAlert, Phone, Info, Home as HomeIcon, LogIn, UserPlus, LogOut, LayoutDashboard, Heart } from 'lucide-react';
import { User } from '../types';

interface NavbarProps {
  user: User | null;
  onLogout: () => void;
  onOpenDonation: () => void;
}

export default function Navbar({ user, onLogout, onOpenDonation }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Início', path: '/', icon: HomeIcon },
    { name: 'Sobre', path: '/sobre', icon: Info },
    { name: 'Pets', path: '/pets', icon: PawPrint },
    { name: 'Eventos', path: '/eventos', icon: Calendar },
    { name: 'Denúncias', path: '/denuncias', icon: ShieldAlert },
    { name: 'Contatos', path: '/contatos', icon: Phone },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-[#FFCC00] sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-white p-1 rounded-full">
              <PawPrint className="text-[#7956a6] w-8 h-8" />
            </div>
            <span className="font-bold text-xl text-[#18212f] hidden sm:block">Toca dos Peludos</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-semibold transition-colors ${
                  isActive(link.path) ? 'text-white bg-[#7956a6]' : 'text-[#7956a6] hover:bg-[#7956a6]/10'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Auth Actions */}
          <div className="hidden md:flex items-center gap-3">
            <button 
              onClick={onOpenDonation}
              className="bg-[#7956a6] text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-[#6a1b9a] transition-colors"
            >
              Doar
            </button>
            {user ? (
              <>
                <span className="text-sm font-medium text-[#18212f]">Olá, {user.nome}!</span>
                {user.role === 'admin' && (
                  <Link to="/admin" className="p-2 text-[#7956a6] hover:bg-[#7956a6]/10 rounded-full">
                    <LayoutDashboard size={20} />
                  </Link>
                )}
                <button
                  onClick={onLogout}
                  className="bg-[#e74c3c] text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-[#c0392b] transition-colors flex items-center gap-2"
                >
                  <LogOut size={16} /> Sair
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-[#7956a6] font-bold text-sm px-4 py-2 hover:bg-[#7956a6]/10 rounded-lg transition-colors">
                  Entrar
                </Link>
                <Link to="/cadastro" className="bg-[#7956a6] text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-[#6a1b9a] transition-colors">
                  Cadastrar
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#7956a6] p-2 rounded-md hover:bg-[#7956a6]/10"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-4 px-4 space-y-2 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-semibold ${
                isActive(link.path) ? 'bg-[#7956a6] text-white' : 'text-[#7956a6] hover:bg-gray-50'
              }`}
            >
              <link.icon size={20} />
              {link.name}
            </Link>
          ))}
          <div className="pt-4 border-t border-gray-100 flex flex-col gap-2">
            <button
              onClick={() => { setIsOpen(false); onOpenDonation(); }}
              className="w-full bg-[#7956a6] text-white px-4 py-3 rounded-lg font-bold flex items-center justify-center gap-2"
            >
              <Heart size={20} /> Doar Agora
            </button>
            {user ? (
              <>
                <div className="px-4 py-2 font-bold text-[#18212f]">Olá, {user.nome}!</div>
                {user.role === 'admin' && (
                  <Link
                    to="/admin"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-[#7956a6] font-semibold hover:bg-gray-50"
                  >
                    <LayoutDashboard size={20} /> Painel Admin
                  </Link>
                )}
                <button
                  onClick={onLogout}
                  className="w-full bg-[#e74c3c] text-white px-4 py-3 rounded-lg font-bold flex items-center justify-center gap-2"
                >
                  <LogOut size={20} /> Sair
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center py-3 text-[#7956a6] font-bold border border-[#7956a6] rounded-lg"
                >
                  Entrar
                </Link>
                <Link
                  to="/cadastro"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center py-3 bg-[#7956a6] text-white font-bold rounded-lg"
                >
                  Cadastrar
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
