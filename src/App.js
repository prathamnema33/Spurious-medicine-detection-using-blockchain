import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';

// Import all pages
import ManufactureDrug from './pages/ManufactureDrug';
import TransferDrug from './pages/TransferDrug';
import VerifyDrug from './pages/VerifyDrug';
import SupplyChain from './pages/SupplyChain';
import Analytics from './pages/Analytics';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        {/* Navbar */}
        <Navbar />
        
        {/* Toast Notifications */}
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#10b981',
                secondary: '#fff',
              },
            },
            error: {
              duration: 4000,
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />

        {/* Routes */}
        <Routes>
          <Route path="/" element={<ManufactureDrug />} />
          <Route path="/transfer" element={<TransferDrug />} />
          <Route path="/verify" element={<VerifyDrug />} />
          <Route path="/supply-chain" element={<SupplyChain />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;