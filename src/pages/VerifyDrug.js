import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const VerifyDrug = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [drugData, setDrugData] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  // Mock drug database
  const mockDrugs = [
    {
      id: '12345',
      name: 'Paracetamol',
      batch: 'BATCH-2024-001',
      manufacturer: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
      currentOwner: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
      authentic: true,
      manufactureDate: '2024-01-15',
      txHash: '0xabc123def456...'
    },
    {
      id: '67890',
      name: 'Aspirin',
      batch: 'BATCH-2024-002',
      manufacturer: '0x1a2b3c4d5e6f7890abcdef1234567890abcdef12',
      currentOwner: '0x9876543210fedcba9876543210fedcba98765432',
      authentic: false,
      manufactureDate: '2024-02-20',
      txHash: '0xdef789ghi012...'
    }
  ];

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast.error('❌ Please enter Drug ID or Batch Number');
      return;
    }

    setIsSearching(true);
    setDrugData(null);

    const loadingToast = toast.loading('🔍 Searching blockchain...');

    try {
      // Simulate blockchain search (1.5 seconds)
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Find drug in mock database
      const found = mockDrugs.find(
        drug => drug.id === searchQuery || drug.batch === searchQuery
      );

      if (found) {
        setDrugData(found);
        toast.success('✅ Drug found on blockchain!', {
          id: loadingToast,
        });
      } else {
        toast.error('❌ Drug not found in blockchain', {
          id: loadingToast,
        });
      }
    } catch (error) {
      toast.error('❌ Search failed!', {
        id: loadingToast,
      });
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-2xl p-6 mb-8"
        >
          <div className="flex items-center space-x-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Enter Drug ID or Batch Number (e.g., 12345 or BATCH-2024-001)"
              className="flex-1 px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none text-lg"
              disabled={isSearching}
            />
            <motion.button
              whileHover={{ scale: isSearching ? 1 : 1.05 }}
              whileTap={{ scale: isSearching ? 1 : 0.95 }}
              onClick={handleSearch}
              disabled={isSearching}
              className={`px-8 py-4 rounded-xl font-bold text-white text-lg transition-all duration-300 ${
                isSearching
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 shadow-lg hover:shadow-xl'
              }`}
            >
              {isSearching ? '⏳' : '🔍 Search'}
            </motion.button>
          </div>
        </motion.div>

        {/* Drug Details Card - slides from right */}
        <AnimatePresence>
          {drugData && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100"
            >
              {/* Header with Authenticity Badge */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">
                    Drug Details
                  </h2>
                  <p className="text-gray-500 mt-1">Verified on blockchain</p>
                </div>
                {drugData.authentic ? (
                  <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full font-bold flex items-center space-x-2">
                    <span>✅</span>
                    <span>Authentic</span>
                  </span>
                ) : (
                  <span className="px-4 py-2 bg-red-100 text-red-800 rounded-full font-bold flex items-center space-x-2">
                    <span>❌</span>
                    <span>Fake</span>
                  </span>
                )}
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-6">
                {/* Drug ID */}
                <div className="col-span-2 sm:col-span-1">
                  <p className="text-sm font-semibold text-gray-500 mb-1">Drug ID</p>
                  <p className="text-lg font-bold text-gray-800">{drugData.id}</p>
                </div>

                {/* Drug Name */}
                <div className="col-span-2 sm:col-span-1">
                  <p className="text-sm font-semibold text-gray-500 mb-1">Drug Name</p>
                  <p className="text-lg font-bold text-gray-800">{drugData.name}</p>
                </div>

                {/* Batch Number */}
                <div className="col-span-2 sm:col-span-1">
                  <p className="text-sm font-semibold text-gray-500 mb-1">Batch Number</p>
                  <p className="text-lg font-mono text-gray-800">{drugData.batch}</p>
                </div>

                {/* Manufacture Date */}
                <div className="col-span-2 sm:col-span-1">
                  <p className="text-sm font-semibold text-gray-500 mb-1">Manufacture Date</p>
                  <p className="text-lg text-gray-800">{drugData.manufactureDate}</p>
                </div>

                {/* Manufacturer */}
                <div className="col-span-2">
                  <p className="text-sm font-semibold text-gray-500 mb-1">Manufacturer</p>
                  <p className="text-sm font-mono text-gray-600 bg-gray-50 p-3 rounded-lg break-all">
                    {drugData.manufacturer}
                  </p>
                </div>

                {/* Current Owner */}
                <div className="col-span-2">
                  <p className="text-sm font-semibold text-gray-500 mb-1">Current Owner</p>
                  <p className="text-sm font-mono text-gray-600 bg-gray-50 p-3 rounded-lg break-all">
                    {drugData.currentOwner}
                  </p>
                </div>
              </div>

              {/* Blockchain Explorer Link */}
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  toast.success('🔗 Opening blockchain explorer...');
                }}
                className="mt-6 flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
              >
                <span>🔗</span>
                <span>View on Blockchain Explorer</span>
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Helper Card */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-8 bg-purple-50 border border-purple-200 rounded-xl p-6"
        >
          <h3 className="font-bold text-purple-900 mb-3">📝 Try These Sample IDs:</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between bg-white p-3 rounded-lg">
              <span className="font-mono text-sm">12345</span>
              <span className="text-xs text-green-600 font-semibold">✅ Authentic</span>
            </div>
            <div className="flex items-center justify-between bg-white p-3 rounded-lg">
              <span className="font-mono text-sm">67890</span>
              <span className="text-xs text-red-600 font-semibold">❌ Fake</span>
            </div>
            <div className="flex items-center justify-between bg-white p-3 rounded-lg">
              <span className="font-mono text-sm">BATCH-2024-001</span>
              <span className="text-xs text-green-600 font-semibold">✅ Authentic</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VerifyDrug;
