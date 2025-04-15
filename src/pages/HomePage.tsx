import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/Button';
import MapComponent from '../components/MapComponent';
import LocationInput from '../components/LocationInput';
import { currentUser } from '../data/mockData';

const HomePage: React.FC = () => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [showHomeContent, setShowHomeContent] = useState(true);
  
  const handleStartBooking = () => {
    if (!pickup || !destination) {
      // Animation de rappel si les champs sont vides
      const inputElements = document.querySelectorAll('input');
      inputElements.forEach(el => {
        if (!el.value) {
          el.parentElement?.classList.add('animate-shake');
          setTimeout(() => {
            el.parentElement?.classList.remove('animate-shake');
          }, 500);
        }
      });
      return;
    }
    
    setShowHomeContent(false);
    // Ici on passerait normalement à la page de sélection de véhicule
    window.location.href = '#/booking';
  };
  
  const handleViewHistory = () => {
    window.location.href = '#/history';
  };
  
  return (
    <div className="h-screen flex flex-col">
      {/* Background Map */}
      <div className="absolute inset-0 z-0">
        <MapComponent showDrivers={true} />
      </div>

      {/* Content */}
      <AnimatePresence>
        {showHomeContent && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="relative z-10 mt-auto mx-auto w-full max-w-md px-4 pb-8"
          >
            {/* Glass Panel */}
            <motion.div 
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-white bg-opacity-90 backdrop-blur-lg rounded-3xl shadow-xl p-6"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-200">
                  <img src={currentUser.profilePicture} alt="Profile" className="w-full h-full object-cover" />
                </div>
                <div className="ml-3">
                  <h2 className="text-xl font-bold text-gray-900">Bonjour, {currentUser.name.split(' ')[0]}</h2>
                  <p className="text-gray-600">Où souhaitez-vous aller aujourd'hui ?</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <LocationInput
                  label="Point de départ"
                  placeholder="Adresse de prise en charge"
                  value={pickup}
                  onChange={setPickup}
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  }
                />
                
                <LocationInput
                  label="Destination"
                  placeholder="Où allez-vous ?"
                  value={destination}
                  onChange={setDestination}
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  }
                />
              </div>
              
              <div className="mt-6">
                <Button 
                  variant="primary" 
                  fullWidth 
                  onClick={handleStartBooking}
                  className="py-4"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Réserver un véhicule
                </Button>
              </div>
              
              <div className="mt-4 flex justify-center">
                <button 
                  className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
                  onClick={handleViewHistory}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Voir l'historique des courses
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Feature Pills */}
      <div className="absolute top-6 left-0 right-0 flex justify-center">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex space-x-2 bg-white/80 backdrop-blur-sm px-3 py-2 rounded-full shadow-lg"
        >
          <span className="text-xs font-medium text-gray-700 px-3 py-1 bg-blue-100 rounded-full">Tarifs spéciaux</span>
          <span className="text-xs font-medium text-gray-700 px-3 py-1 bg-green-100 rounded-full">Chauffeurs vérifiés</span>
          <span className="text-xs font-medium text-gray-700 px-3 py-1 bg-purple-100 rounded-full">Paiement facile</span>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;
