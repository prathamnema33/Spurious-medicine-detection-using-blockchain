import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, ResponsiveContainer } from 'recharts';

const Analytics = () => {
  const [lineData, setLineData] = useState([
    { month: 'Jan', drugs: 45 },
    { month: 'Feb', drugs: 52 },
    { month: 'Mar', drugs: 61 },
    { month: 'Apr', drugs: 58 },
    { month: 'May', drugs: 70 },
    { month: 'Jun', drugs: 85 }
  ]);

  const [pieData, setPieData] = useState([
    { name: 'Authentic', value: 850, color: '#10b981' },
    { name: 'Fake', value: 150, color: '#ef4444' }
  ]);

  const [barData, setBarData] = useState([
    { name: 'Paracetamol', transfers: 145 },
    { name: 'Aspirin', transfers: 132 },
    { name: 'Ibuprofen', transfers: 128 },
    { name: 'Amoxicillin', transfers: 115 },
    { name: 'Omeprazole', transfers: 98 }
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update line chart (add new month)
      setLineData(prevData => {
        const lastValue = prevData[prevData.length - 1].drugs;
        const newValue = lastValue + Math.floor(Math.random() * 20 - 5);
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const currentMonth = prevData.length % 12;
        
        if (prevData.length >= 12) {
          return [...prevData.slice(1), { month: months[currentMonth], drugs: Math.max(0, newValue) }];
        }
        return [...prevData, { month: months[currentMonth], drugs: Math.max(0, newValue) }];
      });

      // Update pie chart
      setPieData(prevData => {
        const authentic = prevData[0].value + Math.floor(Math.random() * 10);
        const fake = prevData[1].value + Math.floor(Math.random() * 3);
        return [
          { name: 'Authentic', value: authentic, color: '#10b981' },
          { name: 'Fake', value: fake, color: '#ef4444' }
        ];
      });

      // Update bar chart
      setBarData(prevData => 
        prevData.map(item => ({
          ...item,
          transfers: item.transfers + Math.floor(Math.random() * 5)
        }))
      );
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            📊 Analytics Dashboard
          </h1>
          <p className="text-gray-600">Real-time blockchain statistics</p>
          <div className="mt-4 inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-sm font-semibold">Live Updates Every 5s</span>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-semibold">Total Drugs</p>
                <p className="text-4xl font-bold mt-2">{pieData[0].value + pieData[1].value}</p>
              </div>
              <div className="text-5xl">💊</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-semibold">Authentic Drugs</p>
                <p className="text-4xl font-bold mt-2">{pieData[0].value}</p>
              </div>
              <div className="text-5xl">✅</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100 text-sm font-semibold">Fake Drugs</p>
                <p className="text-4xl font-bold mt-2">{pieData[1].value}</p>
              </div>
              <div className="text-5xl">❌</div>
            </div>
          </div>
        </motion.div>

        {/* Line Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            📈 Drugs Manufactured Over Time
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="drugs" 
                stroke="#8b5cf6" 
                strokeWidth={3}
                dot={{ fill: '#8b5cf6', r: 5 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Pie and Bar Charts Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pie Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              🥧 Authentic vs Fake Drugs
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center space-x-6 mt-4">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span className="text-sm text-gray-600">Authentic: {pieData[0].value}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span className="text-sm text-gray-600">Fake: {pieData[1].value}</span>
              </div>
            </div>
          </motion.div>

          {/* Bar Chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              📊 Top 5 Most Transferred Drugs
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-15} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="transfers" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;