import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const SupplyChain = () => {
  const [searchId, setSearchId] = useState('');
  const [timeline, setTimeline] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  // Mock supply chain data
  const mockTimeline = {
    '12345': [
      {
        stage: 'Manufacturer',
        icon: '🏭',
        address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
        timestamp: '2024-01-15 10:30 AM',
        txHash: '0xabc123...',
        color: 'blue'
      },
      {
        stage: 'Distributor',
        icon: '🚚',
        address: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
        timestamp: '2024-01-20 02:45 PM',
        txHash: '0xdef456...',
        color: 'green'
      },
      {
        stage: 'Retailer',
        icon: '🏪',
        address: '0x1a2b3c4d5e6f7890abcdef1234567890abcdef12',
        timestamp: '2024-01-25 09:15 AM',
        txHash: '0xghi789...',
        color: 'purple'
      }
    ],
    '67890': [
      {
        stage: 'Manufacturer',
        icon: '🏭',
        address: '0x9876543210fedcba9876543210fedcba98765432',
        timestamp: '2024-02-20 11:00 AM',
        txHash: '0xjkl012...',
        color: 'blue'
      },
      {
        stage: 'Distributor',
        icon: '🚚',
        address: '0xabcdef1234567890abcdef1234567890abcdef12',
        timestamp: '2024-02-22 03:30 PM',
        txHash: '0xmno345...',
        color: 'green'
      }
    ]
  };

  const handleSearch = async () => {
    if (!searchId.trim()) {
      toast.error('❌ Please enter Drug ID');
      return;
    }

    setIsSearching(true);
    setTimeline(null);

    const loadingToast = toast.loading('📜 Loading supply chain history...');

    try {
      // Simulate blockchain query
      await new Promise(resolve => setTimeout(resolve, 1500));

      const found = mockTimeline[searchId];

      if (found) {
        setTimeline(found);
        toast.success('✅ Supply chain history loaded!', {
          id: loadingToast,
        });
      } else {
        toast.error('❌ No history found for this Drug ID', {
          id: loadingToast,
        });
      }
    } catch (error) {
      toast.error('❌ Failed to load history!', {
        id: loadingToast,
      });
    } finally {
      setIsSearching(false);
    }
  };

  const getColorClasses = (color) => {
    const colors = {
      blue: 'from-blue-500 to-blue-600 border-blue-300',
      green: 'from-green-500 to-green-600 border-green-300',
      purple: 'from-purple-500 to-purple-600 border-purple-300'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🕐 Supply Chain History
          </h1>
          <p className="text-gray-600">Track the complete journey of your drug</p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-xl p-6 mb-8"
        >
          <div className="flex items-center space-x-4">
            <input
              type="text"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Enter Drug ID (e.g., 12345)"
              className="flex-1 px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-lg"
              disabled={isSearching}
            />
            <motion.button
              whileHover={{ scale: isSearching ? 1 : 1.05 }}
              whileTap={{ scale: isSearching ? 1 : 0.95 }}
              onClick={handleSearch}
              disabled={isSearching}
              className={`px-8 py-4 rounded-xl font-bold text-white text-lg transition-all ${
                isSearching
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-lg'
              }`}
            >
              {isSearching ? '⏳' : '🔍 Track'}
            </motion.button>
          </div>
        </motion.div>

        {/* Timeline */}
        {timeline && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            {/* Vertical Line */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-green-500 to-purple-500"></div>

            {/* Timeline Items */}
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                  className="relative pl-20"
                >
                  {/* Icon Circle */}
                  <div className={`absolute left-0 w-16 h-16 rounded-full bg-gradient-to-br ${getColorClasses(item.color)} border-4 border-white shadow-lg flex items-center justify-center text-3xl`}>
                    {item.icon}
                  </div>

                  {/* Content Card */}
                  <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-gray-200 hover:shadow-xl transition-shadow duration-300">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-2xl font-bold text-gray-800">{item.stage}</h3>
                      <span className="text-sm text-gray-500">{item.timestamp}</span>
                    </div>

                    <div className="space-y-2">
                      <div>
                        <p className="text-xs font-semibold text-gray-500 mb-1">Address</p>
                        <p className="text-sm font-mono bg-gray-50 p-2 rounded text-gray-700 break-all">
                          {item.address}
                        </p>
                      </div>

                      <div className="flex items-center space-x-2 pt-2">
                        <span className="text-xs text-gray-500">Tx Hash:</span>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          onClick={() => toast.success('🔗 Transaction hash copied!')}
                          className="text-xs font-mono bg-blue-50 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors"
                        >
                          {item.txHash}
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* End Marker */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: timeline.length * 0.2 + 0.3 }}
              className="relative pl-20 pt-8"
            >
              <div className="absolute left-0 w-16 h-16 rounded-full bg-gradient-to-br from-gray-400 to-gray-500 border-4 border-white shadow-lg flex items-center justify-center">
                <span className="text-2xl">🏁</span>
              </div>
              <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl p-4 text-center">
                <p className="text-gray-700 font-semibold">End of Supply Chain</p>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Helper Card */}
        {!timeline && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-blue-50 border border-blue-200 rounded-xl p-6"
          >
            <h3 className="font-bold text-blue-900 mb-3">📝 Try These Sample Drug IDs:</h3>
            <div className="space-y-2">
              <div className="bg-white p-3 rounded-lg font-mono text-sm">
                12345 - <span className="text-gray-600">Complete journey (3 stages)</span>
              </div>
              <div className="bg-white p-3 rounded-lg font-mono text-sm">
                67890 - <span className="text-gray-600">Partial journey (2 stages)</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SupplyChain;