import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Instagram, Facebook, MessageCircle } from 'lucide-react';

export default function Contatos() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12"
    >
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-[#18212f]">Fale Conosco</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Dúvidas, sugestões ou quer saber mais sobre um pet? Estamos aqui para ajudar.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 space-y-8">
            <div className="flex items-start gap-6">
              <div className="bg-[#FFCC00]/20 p-4 rounded-2xl">
                <MapPin className="text-[#7956a6]" size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#18212f]">Nossa Sede</h3>
                <p className="text-gray-500">Rua dos Peludos, 123 - Bairro Esperança</p>
                <p className="text-gray-500">São Paulo, SP - CEP 01234-567</p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="bg-[#FFCC00]/20 p-4 rounded-2xl">
                <Phone className="text-[#7956a6]" size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#18212f]">Telefone</h3>
                <p className="text-gray-500">(11) 99999-9999</p>
                <p className="text-gray-500">Atendimento: Seg a Sex, 9h às 18h</p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="bg-[#FFCC00]/20 p-4 rounded-2xl">
                <Mail className="text-[#7956a6]" size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#18212f]">E-mail</h3>
                <p className="text-gray-500">contato@tocadospeludos.org</p>
                <p className="text-gray-500">adocoes@tocadospeludos.org</p>
              </div>
            </div>
          </div>

          <div className="bg-[#7956a6] p-8 rounded-3xl text-white space-y-6">
            <h3 className="text-2xl font-bold">Redes Sociais</h3>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/toca_dos_peludos/" className="bg-white/10 p-4 rounded-2xl hover:bg-white/20 transition-colors">
                <Instagram size={32} />
              </a>
              <a href="https://www.facebook.com/tocadospeludos/?locale=pt_BR" className="bg-white/10 p-4 rounded-2xl hover:bg-white/20 transition-colors">
                <Facebook size={32} />
              </a>
              <a href="#" className="bg-white/10 p-4 rounded-2xl hover:bg-white/20 transition-colors">
                <MessageCircle size={32} />
              </a>
            </div>
          </div>
        </div>

        <div className="h-[500px] rounded-3xl overflow-hidden shadow-xl border-8 border-white">
          <iframe 
            src= "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14661.61270483995!2d-46.60360014703327!3d-23.26479561407258!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ceec0c06dee097%3A0xf5d1a3fd5cf68533!2sTerra%20Preta%2C%20Mairipor%C3%A3%20-%20SP%2C%2007600-000!5e0!3m2!1spt-BR!2sbr!4v1773431066838!5m2!1spt-BR!2sbr"
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy"
          />
        </div>
      </div>
    </motion.div>
  );
}
