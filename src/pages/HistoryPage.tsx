import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/Button';
import { tripHistory, currentUser } from '../data/mockData';

const HistoryPage: React.FC = () => {
  const [selectedTrip, setSelectedTrip] = useState<string | null>(null);
  
  const handleBackToHome = () => {
    window.location.href = '#/';
  };
  
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'completed':
        return <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Terminé</span>;
      case 'cancelled':
        return <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">Annulé</span>;
      case 'scheduled':
        return <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Planifié</span>;
      default:
        return null;
    }
  };
  
  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { 
      day: 'numeric', 
      month: 'long', 
      hour: '2-digit', 
      minute: '2-digit' 
    };
    return new Intl.DateTimeFormat('fr-FR', options).format(date);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white shadow-md"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button onClick={handleBackToHome} className="flex items-center text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Retour
            </button>
            
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                <img src={currentUser.profilePicture} alt="Profile" className="w-full h-full object-cover" />
              </div>
              <span className="font-medium">{currentUser.name}</span>
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-center mt-2">Historique des trajets</h1>
        </div>
      </motion.div>
      
      {/* Content */}
      <div className="container mx-auto px-4 py-6">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white shadow rounded-xl overflow-hidden"
        >
          <div className="p-4 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">Vos courses récentes</h2>
              <span className="text-sm text-blue-600">{tripHistory.length} trajets</span>
            </div>
          </div>
          
          <div className="divide-y divide-gray-100">
            {tripHistory.map(trip => (
              <motion.div 
                key={trip.id}
                whileHover={{ backgroundColor: '#f9fafb' }}
                className="p-4 cursor-pointer"
                onClick={() => setSelectedTrip(selectedTrip === trip.id ? null : trip.id)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-900">{formatDate(trip.date)}</p>
                    <p className="text-sm text-gray-600 mt-1">{trip.from} → {trip.to}</p>
                  </div>
                  
                  <div className="flex flex-col items-end">
                    <p className="font-bold text-gray-900">{trip.price.toFixed(2).replace('.', ',')} €</p>
                    <div className="mt-1">
                      {getStatusBadge(trip.status)}
                    </div>
                  </div>
                </div>
                
                <AnimatePresence>
                  {selectedTrip === trip.id && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="mt-4 overflow-hidden"
                    >
                      <div className="bg-gray-50 rounded-xl p-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Distance</p>
                            <p className="font-medium">{trip.distance} km</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Durée</p>
                            <p className="font-medium">{trip.duration} min</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Date</p>
                            <p className="font-medium">{trip.date.toLocaleDateString('fr-FR')}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Heure</p>
                            <p className="font-medium">{trip.date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</p>
                          </div>
                        </div>
                        
                        <div className="flex mt-4 space-x-2">
                          <Button variant="secondary" size="small" className="flex-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Voir les détails
                          </Button>
                          <Button variant="outline" size="small" className="flex-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Réserver à nouveau
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6"
        >
          <Button 
            variant="primary" 
            fullWidth
            onClick={handleBackToHome}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z" clipRule="evenodd" />
            </svg>
            Réserver un nouveau trajet
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default HistoryPage;
