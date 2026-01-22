import React, { useState } from 'react';
import { BarChart, Bar, ScatterChart, Scatter, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Activity, Target } from 'lucide-react';

const NCAABasketballAnalytics = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedMetric, setSelectedMetric] = useState('ADJOE');

  // Generate scatter data based on selected metric
  const generateScatterData = () => {
    const data = [];
    for (let i = 0; i < 200; i++) {
      if (selectedMetric === 'ADJOE') {
        const adjoe = 85 + Math.random() * 35;
        const winPct = 0.2 + (adjoe - 85) / 35 * 0.6 + (Math.random() - 0.5) * 0.2;
        data.push({ x: adjoe, y: Math.max(0, Math.min(1, winPct)) });
      } else {
        const adjde = 85 + Math.random() * 35;
        const winPct = 0.8 - (adjde - 85) / 35 * 0.6 + (Math.random() - 0.5) * 0.2;
        data.push({ x: adjde, y: Math.max(0, Math.min(1, winPct)) });
      }
    }
    return data;
  };

  // Generate residual data
  const generateResidualData = () => {
    const points = [];
    for (let i = 0; i < 150; i++) {
      const predicted = Math.random();
      const residual = (Math.random() - 0.5) * 0.3;
      points.push({ predicted, residual });
    }
    return points;
  };

  // Generate permutation data
  const generatePermutationData = () => {
    const data = [];
    for (let i = 0; i < 100; i++) {
      const x = -0.02 + (i / 100) * 0.06;
      const y = Math.exp(-Math.pow(x - 0.002, 2) / 0.00015) * 650;
      data.push({ x: x, y: y });
    }
    return data;
  };

  const coefficientData = [
    { name: 'ADJOE', label: 'Offense', value: 0.64, color: '#3b82f6' },
    { name: 'ADJDE', label: 'Defense', value: 0.45, color: '#ef4444' },
    { name: 'ADJ_T', label: 'Tempo', value: 0.005, color: '#10b981' }
  ];

  const styleDistribution = [
    { name: 'Both High', count: 876, pct: 24.9 },
    { name: 'Both Low', count: 1517, pct: 43.1 },
    { name: 'Offense Only', count: 537, pct: 15.2 },
    { name: 'Defense Only', count: 593, pct: 16.8 }
  ];

  const winPctComparison = [
    { style: 'Offense-Heavy', winPct: 0.556 },
    { style: 'Defense-Heavy', winPct: 0.530 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Header */}
      <header className="bg-black bg-opacity-50 backdrop-blur-md border-b border-blue-500 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-3">
              <Activity className="w-8 h-8 text-orange-500" />
              <div>
                <h1 className="text-2xl font-bold">NCAA Basketball Analytics</h1>
                <p className="text-sm text-gray-400">Offense vs Defense Efficiency Analysis</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">UNC Data 110 Research Group</p>
              <p className="text-xs text-gray-500">Data: 2013-2023 (excl. 2020)</p>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex flex-wrap space-x-2 bg-black bg-opacity-30 rounded-lg p-1">
          {['overview', 'exploration', 'model', 'results'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 px-4 rounded-md transition-all ${
                activeTab === tab
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-blue-900 hover:bg-opacity-30'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* ... everything unchanged above ... */}

        {activeTab === 'results' && (
          <div className="space-y-8">
            {/* ... unchanged results content ... */}

            <div className="bg-gradient-to-r from-orange-900 to-blue-900 bg-opacity-50 rounded-xl p-8 border border-orange-500">
              <h2 className="text-2xl font-bold mb-4">About This Research</h2>
              <p className="text-gray-200 mb-4">
                This analysis was conducted by the UNC Data 110 Research Group using comprehensive NCAA Division I men's basketball data from 2013-2023 (excluding the cancelled 2020 season). The dataset includes 3,523 team-season records from approximately 350 teams.
              </p>
              <p className="text-gray-300 text-sm">
                <strong>Team Members:</strong> Audrey Sompie, Anirudh Dhawan, Sanjana Holla, Naomi Webster, Dane Nighswander, Ira Joshi
              </p>
              <p className="text-gray-400 text-xs mt-2">
                Data Source: barttorvik.com | Methods: Linear Regression, Permutation Testing, MinMax Scaling
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-black bg-opacity-50 backdrop-blur-md border-t border-blue-500 mt-12 py-6">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-400">
          <p>NCAA Basketball Analytics Dashboard | Data: 2013-2023</p>
          <p className="text-sm mt-2">Interactive visualization of offensive vs defensive efficiency analysis</p>
        </div>
      </footer>
    </div>
  );
};

export default NCAABasketballAnalytics;
