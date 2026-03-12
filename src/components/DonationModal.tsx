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
            className="relative bg-white w-full max-w-sm rounded-[40px] overflow-hidden shadow-2xl border"
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={20} />
            </button>

            <div className="p-6 md:p-8 text-center space-y-6">
              <div className="bg-[#7956a6]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <Heart className="text-[#7956a6]" size={32} fill="currentColor" />
              </div>

              <div className="space-y-1">
                <h2 className="text-2xl font-bold text-[#18212f]">Ajude com um PIX</h2>
                <p className="text-sm text-gray-500">Sua doação ajuda nossos peludos.</p>
              </div>

              <div className="bg-gray-50 p-6 rounded-[32px] border-2 border-dashed border-gray-200">
                <div className="bg-white p-3 rounded-2xl shadow-sm inline-block mb-3">
                  <QrCode size={140} className="text-[#18212f]" />
                </div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Escaneie o QR Code</p>
                
                <div className="space-y-2">
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Ou copie a chave PIX</p>
                  <button 
                    onClick={handleCopy}
                    className="w-full bg-white border border-gray-200 p-3 rounded-xl flex items-center justify-between group hover:border-[#7956a6] transition-colors"
                  >
                    <span className="font-bold text-xs text-[#18212f]">{pixKey}</span>
                    {copied ? <Check className="text-green-500" size={16} /> : <Copy className="text-gray-400 group-hover:text-[#7956a6]" size={16} />}
                  </button>
                </div>
              </div>

              <button 
                onClick={onClose}
                className="w-full bg-[#7956a6] text-white py-3 rounded-xl font-bold text-base hover:bg-[#6a1b9a] transition-all"
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
