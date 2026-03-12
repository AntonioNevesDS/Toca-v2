import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, QrCode, Heart, Copy, Check } from 'lucide-react';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DonationModal({ isOpen, onClose }: DonationModalProps) {
  const [copied, setCopied] = React.useState(false);
  const pixKey = "contato@tocadospeludos.org";

  const handleCopy = () => {
    navigator.clipboard.writeText(pixKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative bg-white w-full max-w-md rounded-[40px] overflow-hidden shadow-2xl"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={24} />
            </button>

            <div className="p-8 md:p-12 text-center space-y-8">
              <div className="bg-[#7956a6]/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
                <Heart className="text-[#7956a6]" size={40} fill="currentColor" />
              </div>

              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-[#18212f]">Ajude com um PIX</h2>
                <p className="text-gray-500">Sua doação é transformada em alimento e saúde para nossos peludos.</p>
              </div>

              <div className="bg-gray-50 p-8 rounded-[32px] border-2 border-dashed border-gray-200">
                <div className="bg-white p-4 rounded-2xl shadow-sm inline-block mb-4">
                  <QrCode size={180} className="text-[#18212f]" />
                </div>
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Escaneie o QR Code</p>
                
                <div className="space-y-3">
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Ou copie a chave PIX</p>
                  <button 
                    onClick={handleCopy}
                    className="w-full bg-white border border-gray-200 p-4 rounded-2xl flex items-center justify-between group hover:border-[#7956a6] transition-colors"
                  >
                    <span className="font-bold text-[#18212f]">{pixKey}</span>
                    {copied ? <Check className="text-green-500" size={20} /> : <Copy className="text-gray-400 group-hover:text-[#7956a6]" size={20} />}
                  </button>
                </div>
              </div>

              <button 
                onClick={onClose}
                className="w-full bg-[#7956a6] text-white py-4 rounded-2xl font-bold text-lg hover:bg-[#6a1b9a] transition-all"
              >
                Concluído
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
