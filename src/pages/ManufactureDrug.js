import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const ManufactureDrug = () => {
  const [drugName, setDrugName] = useState('');
  const [batchNumber, setBatchNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [txHash, setTxHash] = useState('');

  // Current date
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handleManufacture = async () => {
    // Validation
    if (!drugName.trim()) {
      toast.error('❌ Please enter drug name');
      return;
    }
    if (!batchNumber.trim()) {
      toast.error('❌ Please enter batch number');
      return;
    }

    setIsLoading(true);
    setTxHash('');

    // Show loading toast
    const loadingToast = toast.loading('⏳ Manufacturing drug...');

    try {
      // Simulate blockchain transaction (2 seconds delay)
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Generate fake transaction hash
      const fakeTxHash = '0x' + Math.random().toString(16).substr(2, 64);
      setTxHash(fakeTxHash);

      // Success notification
      toast.success('✅ Drug Created Successfully!', {
        id: loadingToast,
      });

      // Reset form
      setTimeout(() => {
        setDrugName('');
        setBatchNumber('');
        setTxHash('');
      }, 5000);

    } catch (error) {
      toast.error('❌ Transaction failed!', {
        id: loadingToast,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        {/* Animated Card */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-block p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4">
              <span className="text-4xl">📦</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800">
              Manufacture Drug
            </h2>
            <p className="text-gray-500 mt-2">
              Create a new drug on blockchain
            </p>
          </div>

          {/* Form */}
          <div className="space-y-6">
            {/* Drug Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Drug Name
              </label>
              <input
                type="text"
                value={drugName}
                onChange={(e) => setDrugName(e.target.value)}
                placeholder="Enter drug name"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-200"
                disabled={isLoading}
              />
            </div>

            {/* Batch Number */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Batch Number
              </label>
              <input
                type="text"
                value={batchNumber}
                onChange={(e) => setBatchNumber(e.target.value)}
                placeholder="Enter batch number"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-200"
                disabled={isLoading}
              />
            </div>

            {/* Manufacture Date (Auto-filled) */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Manufacture Date
              </label>
              <input
                type="text"
                value={currentDate}
                readOnly
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-600 cursor-not-allowed"
              />
            </div>

            {/* Manufacture Button */}
            <motion.button
              whileHover={{ scale: isLoading ? 1 : 1.02 }}
              whileTap={{ scale: isLoading ? 1 : 0.98 }}
              onClick={handleManufacture}
              disabled={isLoading}
              className={`w-full py-4 rounded-xl font-bold text-white text-lg transition-all duration-300 ${
                isLoading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl'
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Manufacturing...
                </span>
              ) : (
                '📦 Manufacture Drug'
              )}
            </motion.button>

            {/* Transaction Hash Display */}
            {txHash && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-green-50 border-2 border-green-200 rounded-xl"
              >
                <p className="text-sm font-semibold text-green-800 mb-2">
                  ✅ Transaction Successful
                </p>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-600">Tx Hash:</span>
                  <code className="text-xs text-green-600 bg-white px-2 py-1 rounded break-all">
                    {txHash}
                  </code>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4"
        >
          <p className="text-sm text-blue-800">
            <span className="font-semibold">💡 Info:</span> This transaction will be recorded on the blockchain and cannot be modified later.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default ManufactureDrug;