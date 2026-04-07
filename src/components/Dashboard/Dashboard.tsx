import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../../services/api';
import { FiUsers, FiUserPlus, FiBarChart2 } from 'react-icons/fi';

const Dashboard: React.FC = () => {
  const [totalContacts, setTotalContacts] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await api.get('/dashboard');
      setTotalContacts(response.data.total_contacts);
    } catch (error) {
      console.error('Error fetching dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    {
      title: 'Total Contacts',
      value: totalContacts,
      icon: FiUsers,
      gradient: 'from-blue-500 to-blue-600',
      delay: 0,
    },
    {
      title: 'Recent Activity',
      value: 'Active',
      icon: FiBarChart2,
      gradient: 'from-green-500 to-green-600',
      delay: 0.1,
    },
    {
      title: 'Quick Actions',
      value: 'Ready',
      icon: FiUserPlus,
      gradient: 'from-purple-500 to-purple-600',
      delay: 0.2,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back to your contact management system</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: stat.delay }}
            whileHover={{ y: -5 }}
            className={`bg-gradient-to-r ${stat.gradient} rounded-2xl shadow-lg p-6 text-white transform transition-all duration-300`}
          >
            <div className="flex items-center justify-between mb-4">
              <stat.icon className="h-8 w-8 opacity-90" />
              <span className="text-4xl font-bold">
                {loading ? (
                  <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  stat.value
                )}
              </span>
            </div>
            <h3 className="text-lg font-semibold opacity-90">{stat.title}</h3>
            <p className="text-sm opacity-75 mt-2">
              {stat.title === 'Total Contacts' &&
                `${stat.value} contact${stat.value !== 1 ? 's' : ''} in your address book`}
              {stat.title === 'Recent Activity' && 'Your account is active and ready'}
              {stat.title === 'Quick Actions' && 'Add or manage your contacts'}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-8 bg-white rounded-2xl shadow-xl p-6"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Tips</h2>
        <div className="space-y-3 text-gray-600">
          <p>✓ Use the search bar to find contacts quickly</p>
          <p>✓ Click on any contact to edit their information</p>
          <p>✓ Add email and phone numbers to keep in touch</p>
          <p>✓ Your contacts are securely stored and accessible anytime</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
