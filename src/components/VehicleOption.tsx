import React from 'react';
import { motion } from 'framer-motion';

interface VehicleOptionProps {
  id: string;
  type: string;
  price: number;
  image: string;
  eta: string;
  selected?: boolean;
  onClick?: (id: string) => void;
}

const VehicleOption: React.FC<VehicleOptionProps> = ({
  id,
  type,
  price,
  image,
  eta,
  selected = false,
  onClick
}) => {
  const handleClick = () => {
    if (onClick) onClick(id);
  };
  
  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      className={`flex items-center p-3 rounded-lg ${selected ? 'bg-blue-50 border-2 border-blue-500' : 'bg-white border border-gray-200'} mb-3 cursor-pointer`}
    >
      <div className="w-16 h-12 mr-3 rounded-md overflow-hidden flex-shrink-0">
        <img src={image} alt={type} className="w-full h-full object-cover" />
      </div>
      
      <div className="flex-grow">
        <h3 className="font-semibold text-gray-800">{type}</h3>
        <p className="text-xs text-gray-600">Arrivée dans {eta}</p>
      </div>
      
      <div className="text-right">
        <p className="font-bold text-gray-800">{price > 1 ? `${price.toFixed(1)}x` : 'Standard'}</p>
      </div>
      
      {selected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="ml-2 w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </motion.div>
      )}
    </motion.div>
  );
};

export default VehicleOption;
