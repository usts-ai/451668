import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { popularPlaces } from '../data/mockData';

interface LocationInputProps {
  label: string;
  placeholder: string;
  icon?: React.ReactNode;
  value: string;
  onChange: (value: string) => void;
}

const LocationInput: React.FC<LocationInputProps> = ({
  label,
  placeholder,
  icon,
  value,
  onChange
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<{id: string, name: string, address: string}[]>([]);

  const handleFocus = () => {
    setIsFocused(true);
    setSuggestions(popularPlaces);
  };

  const handleBlur = () => {
    // Retarder la disparition des suggestions pour permettre les clics
    setTimeout(() => setIsFocused(false), 200);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    
    // Filtrer les suggestions basées sur l'entrée
    if (newValue.trim()) {
      const filtered = popularPlaces.filter(
        place => place.name.toLowerCase().includes(newValue.toLowerCase()) || 
                 place.address.toLowerCase().includes(newValue.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions(popularPlaces);
    }
  };

  const handleSuggestionClick = (suggestion: {id: string, name: string, address: string}) => {
    onChange(suggestion.address);
    setIsFocused(false);
  };

  return (
    <div className="relative mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      
      <div className={`flex items-center border-2 rounded-lg bg-white overflow-hidden ${isFocused ? 'border-blue-500 shadow-md' : 'border-gray-200'}`}>
        {icon && (
          <div className="pl-3 text-gray-500">
            {icon}
          </div>
        )}
        
        <input
          type="text"
          value={value}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          className="w-full py-3 px-3 text-gray-700 focus:outline-none"
        />
      </div>
      
      <AnimatePresence>
        {isFocused && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden"
          >
            <div className="p-2 max-h-64 overflow-y-auto">
              {suggestions.map(suggestion => (
                <motion.div
                  key={suggestion.id}
                  whileHover={{ backgroundColor: '#f3f4f6' }}
                  className="p-2 rounded-md cursor-pointer"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <p className="font-medium text-gray-800">{suggestion.name}</p>
                  <p className="text-sm text-gray-600">{suggestion.address}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LocationInput;
