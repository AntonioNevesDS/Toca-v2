import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, PawPrint, Calendar, ShieldAlert, Phone, Info, Home as HomeIcon, LogIn, UserPlus, LogOut, LayoutDashboard } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { User } from './types';

// Pages
import Home from './pages/Home';
import Pets from './pages/Pets';
import Events from './pages/Events';
import Denuncias from './pages/Denuncias';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/Admin';
import Sobre from './pages/Sobre';
import Contatos from './pages/Contatos';
import PetDetails from './pages/PetDetails';
import Volunteer from './pages/Volunteer';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DonationModal from './components/DonationModal';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isDonationOpen, setIsDonationOpen] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('usuarioLogado');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('usuarioLogado');
    setUser(null);
    window.location.href = '/';
  };

  return (
    <Router>
      <div className="min-h-screen bg-[#F5F5F5] flex flex-col font-sans">
        <Navbar user={user} onLogout={handleLogout} onOpenDonation={() => setIsDonationOpen(true)} />
        
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home onOpenDonation={() => setIsDonationOpen(true)} />} />
              <Route path="/sobre" element={<Sobre />} />
              <Route path="/pets" element={<Pets />} />
              <Route path="/pets/:id" element={<PetDetails />} />
              <Route path="/eventos" element={<Events />} />
              <Route path="/denuncias" element={<Denuncias />} />
              <Route path="/contatos" element={<Contatos />} />
              <Route path="/voluntario" element={<Volunteer />} />
              <Route path="/login" element={<Login setUser={setUser} />} />
              <Route path="/cadastro" element={<Register />} />
              <Route path="/admin" element={<Admin user={user} />} />
            </Routes>
          </AnimatePresence>
        </main>

        <Footer />
        <DonationModal isOpen={isDonationOpen} onClose={() => setIsDonationOpen(false)} />
      </div>
    </Router>
  );
}
