import React from 'react';
import { Instagram, MessageCircle, Facebook, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#7956a6] text-white pt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12 pb-12">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="bg-white p-1 rounded-full">
              <img src="https://placehold.co/48x48?text=TP" alt="Logo" className="w-8 h-8" />
            </div>
            <span className="font-bold text-xl text-[#FFCC00]">Toca dos Peludos</span>
          </div>
          <p className="text-sm leading-relaxed opacity-90">
            Somos uma ONG dedicada ao resgate, cuidado e adoção responsável de animais. 
            Nossa missão é dar uma segunda chance para cada peludo encontrar um lar cheio de amor.
          </p>
          <div className="flex gap-4">
            <a href="https://www.instagram.com/toca_dos_peludos/" target="_blank" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors">
              <Instagram size={20} />
            </a>
            <a href="#https://www.facebook.com/tocadospeludos/?locale=pt_BR" target="_blank" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors">
              <Facebook size={20} />
            </a>
            <a href="#" target="_blank" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors">
              <MessageCircle size={20} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-[#FFCC00] font-bold text-lg mb-6">Links Rápidos</h3>
          <ul className="space-y-3">
            <li><a href="/pets" className="hover:text-[#FFCC00] transition-colors text-sm">Adotar um Pet</a></li>
            <li><a href="/doar" className="hover:text-[#FFCC00] transition-colors text-sm">Fazer Doação</a></li>
            <li><a href="/voluntario" className="hover:text-[#FFCC00] transition-colors text-sm">Ser voluntário</a></li>
            <li><a href="/eventos" className="hover:text-[#FFCC00] transition-colors text-sm">Eventos</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-[#FFCC00] font-bold text-lg mb-6">Contato</h3>
          <ul className="space-y-4">
            <li className="flex items-center gap-3 text-sm">
              <Mail className="text-[#FFCC00]" size={18} />
              <span>contato@tocadospeludos.org</span>
            </li>
            <li className="flex items-center gap-3 text-sm">
              <Phone className="text-[#FFCC00]" size={18} />
              <span>(11) 99999 - 9999</span>
            </li>
            <li className="flex items-center gap-3 text-sm">
              <MapPin className="text-[#FFCC00]" size={18} />
              <span>São Paulo, SP</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="bg-[#FFCC00] py-3 text-center text-[#18212f] font-bold text-sm">
        <p>© 2026 Toca dos Peludos. Feito com ❤️ para os animais.</p>
      </div>
    </footer>
  );
}
