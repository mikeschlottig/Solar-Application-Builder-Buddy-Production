import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppLayout from './layout/AppLayout';
import Dashboard from './pages/Dashboard';
import PRDBuilder from './pages/PRDBuilder';
import AgentConsole from './pages/AgentConsole';
import Editor from './pages/Editor';
import Documents from './pages/Documents';
import MCPServers from './pages/MCPServers';
import CodeAnalysis from './pages/CodeAnalysis';

const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="prd-builder" element={<PRDBuilder />} />
        <Route path="agent-console" element={<AgentConsole />} />
        <Route path="editor" element={<Editor />} />
        <Route path="documents" element={<Documents />} />
        <Route path="mcp-servers" element={<MCPServers />} />
        <Route path="code-analysis" element={<CodeAnalysis />} />
      </Route>
    </Routes>
  );
};

export default Router;