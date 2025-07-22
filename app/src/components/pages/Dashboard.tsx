import React, { useState, useEffect } from 'react';

// Simple icon components
const DocumentTextIcon = () => <span className="text-inherit">📝</span>;
const ChatBubbleLeftRightIcon = () => <span className="text-inherit">💬</span>;
const CloudArrowUpIcon = () => <span className="text-inherit">☁️</span>;
const DocumentArrowDownIcon = () => <span className="text-inherit">📄</span>;

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [stats] = useState({ prds: 12, conversations: 45, documents: 28, analyses: 8 });

  const metrics = [
    { label: 'Total PRDs', value: stats.prds.toString(), icon: '📝', color: 'text-cyan-400' },
    { label: 'Conversations', value: stats.conversations.toString(), icon: '🤖', color: 'text-green-400' },
    { label: 'Documents', value: stats.documents.toString(), icon: '📄', color: 'text-blue-400' },
    { label: 'Code Analyses', value: stats.analyses.toString(), icon: '⚡', color: 'text-yellow-400' }
  ];

  const recentActivity = [
    { action: `${stats.prds} PRDs created`, time: 'This month', icon: DocumentTextIcon },
    { action: `${stats.conversations} AI conversations`, time: 'Total', icon: ChatBubbleLeftRightIcon },
    { action: `${stats.documents} documents processed`, time: 'Total', icon: DocumentArrowDownIcon },
    { action: `${stats.analyses} code analyses`, time: 'Total', icon: CloudArrowUpIcon }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-slate-400 mt-1">AI-powered development assistant overview</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 text-sm text-slate-400">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>All systems operational</span>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-slate-900/50 border border-slate-700 rounded-lg p-6 text-center">
            <div className="space-y-2">
              <div className="text-2xl">{metric.icon}</div>
              <div className={`text-2xl font-bold ${metric.color}`}>
                {metric.value}
              </div>
              <div className="text-sm text-slate-400">{metric.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Code Generation */}
        <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">AI Code Generation</h3>
            <span className="text-sm text-slate-400">Powered by OpenAI</span>
          </div>
          <div className="h-64 flex items-center justify-center bg-slate-800/50 rounded border border-slate-600">
            <div className="text-center space-y-2">
              <div className="text-4xl opacity-50">🤖</div>
              <p className="text-slate-400">AI Code Generation Engine</p>
              <p className="text-xs text-slate-500">Ready for intelligent code creation</p>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
            <span className="text-sm text-slate-400">Latest updates</span>
          </div>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <div key={index} className="flex items-center space-x-3 p-3 bg-slate-800/50 rounded border border-slate-600">
                  <Icon />
                  <div className="flex-1">
                    <p className="text-sm text-white">{activity.action}</p>
                    <p className="text-xs text-slate-400">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">API Status</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">OpenAI GPT-4</span>
              <span className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-green-400">Online</span>
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Response Time</span>
              <span className="text-xs text-cyan-400">1.2s avg</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Success Rate</span>
              <span className="text-xs text-green-400">99.8%</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Code Generation</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Components Generated</span>
              <span className="text-xs text-cyan-400">156</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">API Endpoints</span>
              <span className="text-xs text-cyan-400">89</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Tests Generated</span>
              <span className="text-xs text-cyan-400">234</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Templates</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">React Components</span>
              <span className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-green-400">45 templates</span>
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">API Routes</span>
              <span className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-green-400">23 templates</span>
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Documentation</span>
              <span className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-xs text-yellow-400">12 templates</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;