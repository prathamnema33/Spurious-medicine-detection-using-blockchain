import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const TransferDrug = () => {
  const [drugId, setDrugId] = useState('');
  const [newOwner, setNewOwner] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [txHash, setTxHash] = useState('');

  const handleTransfer = async () => {
    // Validation
    if (!drugId.trim()) {
      toast.error('❌ Please enter Drug ID');
      return;
    }
    if (!newOwner.trim()) {
      toast.error('❌ Please enter New Owner Address');
      return;
    }
    if (newOwner.length < 42) {
      toast.error('❌ Invalid Ethereum address');
      return;
    }

    setIsLoading(true);
    setTxHash('');

    // Step 1: Waiting for MetaMask
    const metaMaskToast = toast.loading('⏳ Waiting for MetaMask Confirmation...');

    try {
      // Simulate MetaMask confirmation (2 seconds)
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Step 2: Transaction processing
      toast.loading('⛓️ Processing transaction on blockchain...', {
        id: metaMaskToast,
      });

      // Simulate blockchain confirmation (2 seconds)
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Generate fake transaction hash
      const fakeTxHash = '0x' + Math.random().toString(16).substr(2, 64);
      setTxHash(fakeTxHash);

      // Success notification
      toast.success('✅ Transaction Confirmed on Blockchain!', {
        id: metaMaskToast,
      });

      // Reset form after 5 seconds
      setTimeout(() => {
        setDrugId('');
        setNewOwner('');
        setTxHash('');
      }, 5000);

    } catch (error) {
      toast.error('❌ Transaction rejected!', {
        id: metaMaskToast,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        {/* Animated Card - slides from bottom */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-block p-3 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl mb-4">
              <span className="text-4xl">🔁</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800">
              Transfer Drug
            </h2>
            <p className="text-gray-500 mt-2">
              Transfer ownership to a new address
            </p>
          </div>

          {/* Form */}
          <div className="space-y-6">
            {/* Drug ID */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Drug ID
              </label>
              <input
                type="text"
                value={drugId}
                onChange={(e) => setDrugId(e.target.value)}
                placeholder="Enter Drug ID (e.g., 12345)"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors duration-200"
                disabled={isLoading}
              />
            </div>

            {/* New Owner Address */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                New Owner Address
              </label>
              <input
                type="text"
                value={newOwner}
                onChange={(e) => setNewOwner(e.target.value)}
                placeholder="0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors duration-200 font-mono text-sm"
                disabled={isLoading}
              />
              <p className="text-xs text-gray-500 mt-2">
                💡 Enter a valid Ethereum address (0x...)
              </p>
            </div>

            {/* Transfer Button */}
            <motion.button
              whileHover={{ scale: isLoading ? 1 : 1.02 }}
              whileTap={{ scale: isLoading ? 1 : 0.98 }}
              onClick={handleTransfer}
              disabled={isLoading}
              className={`w-full py-4 rounded-xl font-bold text-white text-lg transition-all duration-300 ${
                isLoading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 shadow-lg hover:shadow-xl'
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
                  Processing...
                </span>
              ) : (
                '🔁 Transfer Ownership'
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
                  ✅ Ownership Transferred Successfully
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
          className="mt-6 bg-yellow-50 border border-yellow-200 rounded-xl p-4"
        >
          <p className="text-sm text-yellow-800">
            <span className="font-semibold">⚠️ Warning:</span> Transfer ownership will permanently move the drug to the new address.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default TransferDrug;