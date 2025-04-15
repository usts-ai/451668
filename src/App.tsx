import React, { useState, useEffect } from 'react';
import './App.css';
import HomePage from './pages/HomePage';
import BookingPage from './pages/BookingPage';
import HistoryPage from './pages/HistoryPage';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const [currentRoute, setCurrentRoute] = useState<string>(window.location.hash || '#/');

  // Gérer les changements de route basés sur le hash
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentRoute(window.location.hash || '#/');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Définir quelle page afficher en fonction de la route
  const renderPage = () => {
    switch (currentRoute) {
      case '#/booking':
        return <BookingPage />;
      case '#/history':
        return <HistoryPage />;
      case '#/':
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="App">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentRoute}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="h-screen"
        >
          {renderPage()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default App;
