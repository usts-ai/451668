import React from 'react';
import { motion } from 'framer-motion';

interface MapComponentProps {
  showRoute?: boolean;
  showDrivers?: boolean;
  className?: string;
}

const MapComponent: React.FC<MapComponentProps> = ({
  showRoute = false,
  showDrivers = false,
  className = ''
}) => {
  return (
    <div className={`relative w-full h-full overflow-hidden rounded-xl bg-gray-200 ${className}`}>
      {/* Fond de carte simulé */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1600&auto=format')] bg-center bg-cover opacity-90">
        {/* Contenu simulé de la carte */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"></div>
        
        {/* Routes simulées */}
        {showRoute && (
          <motion.div 
            className="absolute left-1/4 right-1/4 top-1/3 h-1 bg-blue-500 rounded-full"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: '50%', opacity: 0.8 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        )}
        
        {/* Position utilisateur simulée */}
        <motion.div 
          className="absolute left-1/4 top-1/3 w-5 h-5 bg-blue-600 rounded-full border-2 border-white shadow-lg"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="absolute -inset-1 bg-blue-400 rounded-full opacity-30 animate-ping"></div>
        </motion.div>
        
        {/* Position destination simulée */}
        {showRoute && (
          <motion.div 
            className="absolute right-1/4 top-1/3 w-5 h-5 bg-red-600 rounded-full border-2 border-white shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8 }}
          />
        )}
        
        {/* Voitures simulées */}
        {showDrivers && (
          <>
            <motion.div 
              className="absolute left-1/3 top-1/2 w-4 h-4 bg-yellow-500 rounded-full border-2 border-white shadow-lg"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1 }}
            />
            <motion.div 
              className="absolute right-1/3 bottom-1/3 w-4 h-4 bg-yellow-500 rounded-full border-2 border-white shadow-lg"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2 }}
            />
            <motion.div 
              className="absolute right-1/2 bottom-1/4 w-4 h-4 bg-yellow-500 rounded-full border-2 border-white shadow-lg"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.4 }}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default MapComponent;
