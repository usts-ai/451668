import React from 'react';
import { motion } from 'framer-motion';
import { Driver } from '../data/mockData';

interface DriverCardProps {
  driver: Driver;
  selected?: boolean;
  onClick?: () => void;
}

const DriverCard: React.FC<DriverCardProps> = ({ driver, selected = false, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`p-4 rounded-xl bg-white shadow-lg mb-3 cursor-pointer ${selected ? 'border-2 border-blue-500' : ''}`}
    >
      <div className="flex items-center">
        <div className="w-16 h-16 rounded-full overflow-hidden mr-4 flex-shrink-0 border-2 border-gray-100">
          <img src={driver.photo} alt={driver.name} className="w-full h-full object-cover" />
        </div>
        
        <div className="flex-grow">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-gray-800">{driver.name}</h3>
              <div className="flex items-center mt-1">
                <div className="bg-yellow-400 p-1 rounded text-xs font-bold text-white flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {driver.rating}
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-600">{driver.carModel}</p>
              <p className="text-xs text-gray-500">{driver.licensePlate}</p>
            </div>
          </div>
          
          <div className="mt-3 flex justify-between items-center">
            <div className="bg-gray-100 rounded-lg p-1.5 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs font-medium">{driver.eta} min</span>
            </div>
            
            <div className="bg-gray-100 rounded-lg p-1.5 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-xs font-medium">{(driver.distance / 1000).toFixed(1)} km</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DriverCard;
