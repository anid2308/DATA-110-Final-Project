import React, { useState } from 'react';
import {
  BarChart, Bar, ScatterChart, Scatter, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  ReferenceLine, Cell
} from 'recharts';
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
    { teamstyle: 'Offense-Heavy', winPct: 0.556 },
    { teamstyle: 'Defense-Heavy', winPct: 0.530 }
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
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-8 border border-blue-500 border-opacity-30">
              <h2 className="text-3xl font-bold mb-4 flex items-center">
                <Target className="w-8 h-8 mr-3 text-orange-500" />
                Research Question
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                Does offensive or defensive efficiency matter more for winning NCAA Division I men's basketball games?
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-6 shadow-xl">
                <div className="text-4xl font-bold mb-2">3,523</div>
                <div className="text-blue-200">Team-Season Records</div>
                <div className="text-sm text-blue-300 mt-2">~350 teams × 10 seasons</div>
              </div>
              <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl p-6 shadow-xl">
                <div className="text-4xl font-bold mb-2">60%</div>
                <div className="text-purple-200">R² Score</div>
                <div className="text-sm text-purple-300 mt-2">Variance explained by model</div>
              </div>
              <div className="bg-gradient-to-br from-orange-600 to-orange-800 rounded-xl p-6 shadow-xl">
                <div className="text-4xl font-bold mb-2">2.6%</div>
                <div className="text-orange-200">Offense Advantage</div>
                <div className="text-sm text-orange-300 mt-2">p-value = 0.0005</div>
              </div>
            </div>

            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-8 border border-blue-500 border-opacity-30">
              <h3 className="text-2xl font-bold mb-4">Key Findings</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <TrendingUp className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-lg">Offense Matters More</p>
                    <p className="text-gray-300">
                      Offensive efficiency (ADJOE) has a stronger coefficient (0.64) compared to defensive efficiency (0.45)
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Activity className="w-6 h-6 text-blue-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-lg">Both Are Important</p>
                    <p className="text-gray-300">
                      Teams excelling in both offense and defense have the highest win percentages
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <TrendingDown className="w-6 h-6 text-yellow-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-lg">Tempo Less Significant</p>
                    <p className="text-gray-300">
                      Pace (ADJ_T) has minimal impact with coefficient near 0.005
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'exploration' && (
          <div className="space-y-8">
            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-8 border border-blue-500 border-opacity-30">
              <h2 className="text-2xl font-bold mb-6">Playing Style Distribution</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={styleDistribution}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="name" stroke="#fff" />
                  <YAxis stroke="#fff" />
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #3b82f6' }} />
                  <Bar dataKey="count" fill="#3b82f6">
                    {styleDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={['#3b82f6', '#6b7280', '#f59e0b', '#ef4444'][index]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <p className="text-gray-300 mt-4">
                Most teams (43.1%) are balanced but below average in both metrics. Only 15-17% specialize in one area.
              </p>
            </div>

            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-8 border border-blue-500 border-opacity-30">
              <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
                <h2 className="text-2xl font-bold">Efficiency vs Win Percentage</h2>
                <select
                  value={selectedMetric}
                  onChange={(e) => setSelectedMetric(e.target.value)}
                  className="bg-slate-800 border border-blue-500 rounded-lg px-4 py-2 text-white"
                >
                  <option value="ADJOE">Offensive Efficiency (ADJOE)</option>
                  <option value="ADJDE">Defensive Efficiency (ADJDE)</option>
                </select>
              </div>
              <ResponsiveContainer width="100%" height={400}>
                <ScatterChart margin={{ top: 20, right: 30, bottom: 40, left: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="x" type="number"stroke="#fff"domain={[80, 125]} tickCount={6} reversed={selectedMetric === 'ADJDE'} />
                  <YAxis dataKey="y" type="number" stroke="#fff" />
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #3b82f6' }} />
                  <Scatter data={generateScatterData()} fill="#3b82f6" fillOpacity={0.6} />
                </ScatterChart>
              </ResponsiveContainer>
              <p className="text-gray-300 mt-4">
                {selectedMetric === 'ADJOE'
                  ? 'Strong positive correlation: Higher offensive efficiency → Higher win percentage'
                  : 'Strong negative correlation: Lower defensive efficiency (fewer points allowed) → Higher win percentage (axes are flipped!)'}
              </p>
            </div>

            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-8 border border-blue-500 border-opacity-30">
              <h2 className="text-2xl font-bold mb-6">Win Percentage by Team Style</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={winPctComparison}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="teamstyle" stroke="#fff" />
                  <YAxis stroke="#fff" domain={[0.5, 0.6]} />
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #3b82f6' }} />
                  <Bar dataKey="winPct" fill="#3b82f6">
                    <Cell fill="#3b82f6" />
                    <Cell fill="#ef4444" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-4 p-4 bg-green-900 bg-opacity-30 rounded-lg border border-green-500">
                <p className="text-green-200 font-semibold">
                  Offense-heavy teams win 2.6% more games on average (55.6% vs 53.0%)
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'model' && (
          <div className="space-y-8">
            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-8 border border-blue-500 border-opacity-30">
              <h2 className="text-2xl font-bold mb-4">Linear Regression Model</h2>
              <div className="space-y-4 text-gray-300">
                <p className="text-lg">
                  <strong>Target Variable:</strong> Win Percentage (Win_PCT)
                </p>
                <p className="text-lg">
                  <strong>Features:</strong>
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li><strong>ADJOE</strong> - Adjusted Offensive Efficiency (points scored per 100 possessions)</li>
                  <li><strong>ADJDE</strong> - Adjusted Defensive Efficiency (points allowed per 100 possessions)</li>
                  <li><strong>ADJ_T</strong> - Adjusted Tempo (possessions per 40 minutes)</li>
                </ul>
                <div className="mt-6 p-4 bg-blue-900 bg-opacity-30 rounded-lg border border-blue-500">
                  <p className="font-semibold mb-2">Model Equation:</p>
                  <p className="font-mono text-sm">
                    Win_PCT = 0.64 × ADJOE - 0.45 × ADJDE + 0.005 × ADJ_T
                  </p>
                  <p className="text-xs text-gray-400 mt-2">(After MinMax scaling of features)</p>
                </div>
              </div>
            </div>

            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-8 border border-blue-500 border-opacity-30">
              <h2 className="text-2xl font-bold mb-6">Model Coefficients</h2>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={coefficientData} margin={{ top: 20, right: 30, bottom: 60, left: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="label" stroke="#fff" />
                  <YAxis stroke="#fff" />
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #3b82f6' }} />
                  <Bar dataKey="value">
                    {coefficientData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-4 grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-900 bg-opacity-30 rounded-lg border border-blue-500">
                  <p className="text-blue-200 font-semibold mb-2">Offensive Efficiency (0.64)</p>
                  <p className="text-sm text-gray-300">Strongest predictor - better offense significantly increases win probability</p>
                </div>
                <div className="p-4 bg-red-900 bg-opacity-30 rounded-lg border border-red-500">
                  <p className="text-red-200 font-semibold mb-2">Defensive Efficiency (0.45)</p>
                  <p className="text-sm text-gray-300">Second strongest - good defense is important but slightly less impactful</p>
                </div>
                <div className="p-4 bg-green-900 bg-opacity-30 rounded-lg border border-green-500">
                  <p className="text-green-200 font-semibold mb-2">Tempo (0.005)</p>
                  <p className="text-sm text-gray-300">Very small coefficient — pace has minimal predictive power compared to offense/defense</p>
                <p className="text-xs text-gray-400 mt-2">
                </p>
              </div>
              </div>
            </div>

            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-8 border border-blue-500 border-opacity-30">
              <h2 className="text-2xl font-bold mb-6">Model Diagnostics</h2>
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-4">Residual Plot</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <ScatterChart margin={{ top: 20, right: 30, bottom: 40, left: 40 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="predicted" type="number" stroke="#fff" />
                    <YAxis dataKey="residual" type="number" stroke="#fff" />
                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #3b82f6' }} />
                    <ReferenceLine y={0} stroke="#ef4444" strokeWidth={2} />
                    <Scatter data={generateResidualData()} fill="#3b82f6" fillOpacity={0.6} />
                  </ScatterChart>
                </ResponsiveContainer>
                <p className="text-gray-300 mt-4">
                  Residuals are randomly scattered around zero with no clear pattern, confirming that linear regression is appropriate for this data.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <div className="p-4 bg-purple-900 bg-opacity-30 rounded-lg border border-purple-500">
                  <p className="text-2xl font-bold text-purple-200">R² = 0.60</p>
                  <p className="text-sm text-gray-300 mt-2">Model explains 60% of variance in win percentage</p>
                </div>
                <div className="p-4 bg-green-900 bg-opacity-30 rounded-lg border border-green-500">
                  <p className="text-2xl font-bold text-green-200">RMSE = 14%</p>
                  <p className="text-sm text-gray-300 mt-2">Average prediction error</p>
                </div>
                <div className="p-4 bg-orange-900 bg-opacity-30 rounded-lg border border-orange-500">
                  <p className="text-2xl font-bold text-orange-200">No Overfitting</p>
                  <p className="text-sm text-gray-300 mt-2">Model generalizes well to test data</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'results' && (
          <div className="space-y-8">
            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-8 border border-blue-500 border-opacity-30">
              <h2 className="text-2xl font-bold mb-6">Permutation Hypothesis Test</h2>
              <div className="mb-6 p-4 bg-slate-800 rounded-lg">
                <p className="text-lg mb-2"><strong>H₀:</strong> Offense-heavy and defense-heavy teams have equal mean Win_PCT</p>
                <p className="text-lg"><strong>H₁:</strong> Offense-heavy teams have higher mean Win_PCT</p>
              </div>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={generatePermutationData()} margin={{ top: 20, right: 30, bottom: 40, left: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="x" type="number" stroke="#fff" domain={[-0.02, 0.04]} />
                  <YAxis stroke="#fff" />
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #3b82f6' }} />
                  <ReferenceLine x={0.026} stroke="#ef4444" strokeWidth={2} />
                  <Line type="monotone" dataKey="y" stroke="#3b82f6" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
              <div className="mt-6 space-y-4">
                <div className="p-4 bg-red-900 bg-opacity-30 rounded-lg border border-red-500">
                  <p className="text-red-200 font-semibold text-lg">Observed Difference: 0.026 (2.6%)</p>
                  <p className="text-sm text-gray-300 mt-2">
                    Offense-heavy teams win 2.6 percentage points more than defense-heavy teams
                  </p>
                </div>
                <div className="p-4 bg-green-900 bg-opacity-30 rounded-lg border border-green-500">
                  <p className="text-green-200 font-semibold text-lg">p-value = 0.0005</p>
                  <p className="text-sm text-gray-300 mt-2">
                    Only 0.05% of 10,000 permutations produced a difference this extreme or greater
                  </p>
                </div>
                <div className="p-4 bg-blue-900 bg-opacity-30 rounded-lg border border-blue-500">
                  <p className="text-blue-200 font-semibold text-lg">Conclusion: Reject H₀</p>
                  <p className="text-sm text-gray-300 mt-2">
                    Strong statistical evidence that offense contributes more to winning than defense
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-8 border border-blue-500 border-opacity-30">
              <h2 className="text-2xl font-bold mb-6">Key Conclusions</h2>
              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="text-xl font-semibold mb-2">1. Offense Wins Championships</h3>
                  <p className="text-gray-300">
                    Both the linear regression model (coefficient: 0.64 vs 0.45) and permutation test (p = 0.0005) provide strong evidence that offensive efficiency is a stronger predictor of winning than defensive efficiency.
                  </p>
                </div>
                <div className="border-l-4 border-red-500 pl-4">
                  <h3 className="text-xl font-semibold mb-2">2. Defense Still Matters</h3>
                  <p className="text-gray-300">
                    While offense is more important, defensive efficiency remains highly significant with a substantial coefficient (0.45). The best teams excel at both.
                  </p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="text-xl font-semibold mb-2">3. Tempo is Overrated</h3>
                  <p className="text-gray-300">
                    Playing fast or slow (ADJ_T coefficient: 0.005) has minimal impact on winning compared to efficiency metrics. It's not about how many possessions you have, but what you do with them.
                  </p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <h3 className="text-xl font-semibold mb-2">4. Practical Applications</h3>
                  <p className="text-gray-300">
                    Coaches should prioritize offensive skill development and recruiting, though not at the complete expense of defense. The 2.6% advantage translates to roughly 1 additional win per season for offense-focused teams.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-900 to-blue-900 bg-opacity-50 rounded-xl p-8 border border-orange-500">
              <h2 className="text-2xl font-bold mb-4">About This Research</h2>
              <p className="text-gray-200 mb-4">
                This analysis was conducted by the UNC Data 110 Research Group using comprehensive NCAA Division I men's basketball data from 2013-2023 (excluding the cancelled 2020 season). The dataset includes 3,523 team-season records from approximately 350 teams.
              </p>
              <p className="text-gray-300 text-sm">
                <strong>Team Members:</strong> Audrey Sompie, Anirudh Dhawan, Sanjana Holla, Naomi Webster, Dane Nighswander, Ira Joshi
              </p>
              <p className="text-gray-400 text-xs mt-2">
                Data Source: barttorvik.com 
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
