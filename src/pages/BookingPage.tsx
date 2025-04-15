import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/Button';
import MapComponent from '../components/MapComponent';
import VehicleOption from '../components/VehicleOption';
import DriverCard from '../components/DriverCard';
import { vehicleOptions, nearbyDrivers } from '../data/mockData';

const BookingPage: React.FC = () => {
  const [selectedVehicle, setSelectedVehicle] = useState(vehicleOptions[0].id);
  const [selectedDriver, setSelectedDriver] = useState<string | null>(null);
  const [bookingStep, setBookingStep] = useState<'vehicle' | 'driver' | 'confirmation'>('vehicle');
  const [estimatedPrice, setEstimatedPrice] = useState('21,50 €');
  const [estimatedTime] = useState('15 min');
  const [isLoading, setIsLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  
  // Points de départ et arrivée fictifs
  const pickupAddress = '15 Avenue des Champs-Élysées, Paris';
  const destinationAddress = 'Tour Eiffel, Champ de Mars, Paris';
  
  useEffect(() => {
    // Simuler un calcul de prix basé sur le véhicule sélectionné
    const selectedVehicleData = vehicleOptions.find(v => v.id === selectedVehicle);
    if (selectedVehicleData) {
      const basePrice = 21.5;
      const newPrice = (basePrice * selectedVehicleData.price).toFixed(2).replace('.', ',');
      setEstimatedPrice(`${newPrice} €`);
    }
  }, [selectedVehicle]);
  
  const handleSelectVehicle = (id: string) => {
    setSelectedVehicle(id);
  };
  
  const handleSelectDriver = (id: string) => {
    setSelectedDriver(id);
  };
  
  const handleContinue = () => {
    if (bookingStep === 'vehicle') {
      setIsLoading(true);
      setTimeout(() => {
        setBookingStep('driver');
        setIsLoading(false);
      }, 1500); // Simuler un chargement
    } else if (bookingStep === 'driver') {
      setIsLoading(true);
      setTimeout(() => {
        setBookingStep('confirmation');
        setIsLoading(false);
      }, 1500); // Simuler un chargement
    }
  };
  
  const handleConfirmBooking = () => {
    setIsLoading(true);
    setTimeout(() => {
      setConfirmed(true);
      setIsLoading(false);
      
      // Simuler une redirection après quelques secondes
      setTimeout(() => {
        window.location.href = '#/';
      }, 4000);
    }, 2000);
  };
  
  return (
    <div className="h-screen flex flex-col">
      {/* Background Map */}
      <div className="absolute inset-0 z-0">
        <MapComponent showRoute={true} showDrivers={bookingStep === 'driver'} />
      </div>
      
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 bg-white bg-opacity-95 backdrop-blur-sm shadow-md"
      >
        <div className="container mx-auto px-4 py-4">
          <button onClick={() => window.location.href = '#/'} className="flex items-center text-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Retour
          </button>
          
          <div className="mt-3 flex items-center justify-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${bookingStep === 'vehicle' || bookingStep === 'driver' || bookingStep === 'confirmation' ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
            <div className="h-0.5 w-12 bg-gray-300"></div>
            <div className={`w-3 h-3 rounded-full ${bookingStep === 'driver' || bookingStep === 'confirmation' ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
            <div className="h-0.5 w-12 bg-gray-300"></div>
            <div className={`w-3 h-3 rounded-full ${bookingStep === 'confirmation' ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
          </div>
        </div>
      </motion.div>
      
      {/* Content */}
      <div className="flex-grow flex flex-col justify-between">
        <div className="flex-grow"></div>
        
        <motion.div 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="relative z-10 w-full bg-white rounded-t-3xl shadow-xl p-6"
        >
          <AnimatePresence mode="wait">
            {bookingStep === 'vehicle' && (
              <motion.div 
                key="vehicle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h2 className="text-xl font-bold text-gray-900 mb-2">Sélectionner un véhicule</h2>
                <div className="flex items-center mb-6 space-x-2 text-sm text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="flex-grow">{pickupAddress} → {destinationAddress}</span>
                  <span className="font-medium">{estimatedTime}</span>
                </div>
                
                <div className="space-y-3 mb-6">
                  {vehicleOptions.map(option => (
                    <VehicleOption
                      key={option.id}
                      id={option.id}
                      type={option.type}
                      price={option.price}
                      image={option.image}
                      eta={option.eta}
                      selected={selectedVehicle === option.id}
                      onClick={handleSelectVehicle}
                    />
                  ))}
                </div>
                
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <p className="text-sm text-gray-600">Prix estimé</p>
                    <p className="text-2xl font-bold text-gray-900">{estimatedPrice}</p>
                  </div>
                  
                  <Button 
                    onClick={handleContinue}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Chargement...
                      </div>
                    ) : (
                      <>
                        Continuer
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </>
                    )}
                  </Button>
                </div>
              </motion.div>
            )}
            
            {bookingStep === 'driver' && (
              <motion.div 
                key="driver"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h2 className="text-xl font-bold text-gray-900 mb-2">Chauffeurs à proximité</h2>
                <p className="text-gray-600 mb-4">Sélectionnez un chauffeur pour votre trajet</p>
                
                <div className="space-y-3 mb-6">
                  {nearbyDrivers.map(driver => (
                    <DriverCard 
                      key={driver.id}
                      driver={driver}
                      selected={selectedDriver === driver.id}
                      onClick={() => handleSelectDriver(driver.id)}
                    />
                  ))}
                </div>
                
                <Button 
                  fullWidth
                  onClick={handleContinue}
                  disabled={!selectedDriver || isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Chargement...
                    </div>
                  ) : 'Confirmer le chauffeur'}
                </Button>
              </motion.div>
            )}
            
            {bookingStep === 'confirmation' && !confirmed && (
              <motion.div 
                key="confirmation"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h2 className="text-xl font-bold text-gray-900 mb-4">Confirmer votre réservation</h2>
                
                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-gray-700 font-medium">Itinéraire</span>
                    <span className="text-blue-600 text-sm font-medium">{estimatedTime}</span>
                  </div>
                  
                  <div className="flex items-start mb-4">
                    <div className="mt-1 mr-3">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      <div className="w-0.5 h-10 bg-gray-300 mx-auto my-1"></div>
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    </div>
                    
                    <div>
                      <p className="font-medium">{pickupAddress}</p>
                      <p className="text-sm text-gray-500 mb-4">Point de départ</p>
                      
                      <p className="font-medium">{destinationAddress}</p>
                      <p className="text-sm text-gray-500">Destination</p>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Véhicule</span>
                    <span className="font-medium">{vehicleOptions.find(v => v.id === selectedVehicle)?.type}</span>
                  </div>
                  
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Chauffeur</span>
                    <span className="font-medium">{nearbyDrivers.find(d => d.id === selectedDriver)?.name}</span>
                  </div>
                  
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Méthode de paiement</span>
                    <div className="flex items-center">
                      <span className="font-medium mr-1">Visa •••• 4242</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 rounded-xl p-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Montant total</span>
                    <span className="text-xl font-bold">{estimatedPrice}</span>
                  </div>
                </div>
                
                <Button 
                  fullWidth
                  onClick={handleConfirmBooking}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Traitement en cours...
                    </div>
                  ) : 'Confirmer la réservation'}
                </Button>
              </motion.div>
            )}
            
            {confirmed && (
              <motion.div 
                key="success"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-8"
              >
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                  className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Réservation confirmée !</h2>
                <p className="text-gray-600 mb-6">Votre chauffeur arrivera dans environ {nearbyDrivers.find(d => d.id === selectedDriver)?.eta} minutes</p>
                
                <div className="bg-blue-50 rounded-xl p-4 mb-8 max-w-xs mx-auto">
                  <p className="text-center text-sm text-blue-800">Vous pouvez suivre votre trajet dans l'application</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default BookingPage;
