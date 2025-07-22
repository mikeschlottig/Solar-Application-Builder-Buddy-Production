import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import SidePanel from './SidePanel';
import MainWorkspace from './MainWorkspace';
import StatusBar from './StatusBar';
import Header from './Header';
import { TabConfig } from '../types';

const tabs: TabConfig[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: '📊',
    path: '/dashboard',
    description: 'Overview and analytics'
  },
  {
    id: 'prd-builder',
    label: 'PRD Builder',
    icon: '📝',
    path: '/prd-builder',
    description: 'Product requirement documents'
  },
  {
    id: 'agent-console',
    label: 'Agent Console',
    icon: '🤖',
    path: '/agent-console',
    description: 'Multi-modal AI dashboard'
  },
  {
    id: 'editor',
    label: 'Editor',
    icon: '✏️',
    path: '/editor',
    description: 'Markdown editing with live preview'
  },
  {
    id: 'documents',
    label: 'Documents',
    icon: '📁',
    path: '/documents',
    description: 'File management and exports'
  },
  {
    id: 'mcp-servers',
    label: 'MCP Servers',
    icon: '🔌',
    path: '/mcp-servers',
    description: 'Model Context Protocol integration'
  },
  {
    id: 'code-analysis',
    label: 'Code Analysis',
    icon: '🔍',
    path: '/code-analysis',
    description: 'AI-assisted code annotation'
  }
];

const AppLayout: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarHidden, setSidebarHidden] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Responsive sidebar handling
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 767;
      const isTablet = window.innerWidth >= 768 && window.innerWidth <= 1199;
      
      if (isMobile) {
        setSidebarHidden(true);
        setSidebarCollapsed(false);
      } else if (isTablet) {
        setSidebarHidden(false);
        setSidebarCollapsed(true);
      } else {
        setSidebarHidden(false);
        // Keep user's preference on desktop
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Get current active tab
  const currentTab = tabs.find(tab => location.pathname.startsWith(tab.path))?.id || 'dashboard';

  const handleTabChange = (tabId: string) => {
    const tab = tabs.find(t => t.id === tabId);
    if (tab) {
      navigate(tab.path);
    }
  };

  const handleToggleCollapse = () => {
    if (sidebarHidden) {
      setSidebarHidden(false);
      setSidebarCollapsed(false);
    } else {
      setSidebarCollapsed(!sidebarCollapsed);
    }
  };

  const handleCloseSidebar = () => {
    if (window.innerWidth <= 767) {
      setSidebarHidden(true);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-slate-950 text-white">
      {/* Header */}
      <Header 
        onToggleSidebar={handleToggleCollapse}
        sidebarHidden={sidebarHidden}
      />
      
      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Side Panel */}
        <SidePanel
          collapsed={sidebarCollapsed}
          hidden={sidebarHidden}
          tabs={tabs}
          activeTab={currentTab}
          onTabSelect={handleTabChange}
          onToggleCollapse={handleToggleCollapse}
          onClose={handleCloseSidebar}
        />
        
        {/* Overlay for mobile */}
        {!sidebarHidden && window.innerWidth <= 767 && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={handleCloseSidebar}
          />
        )}
        
        {/* Main Workspace */}
        <MainWorkspace 
          activeTab={currentTab}
          sidebarCollapsed={sidebarCollapsed}
          sidebarHidden={sidebarHidden}
        >
          <Outlet />
        </MainWorkspace>
      </div>
      
      {/* Status Bar */}
      <StatusBar />
    </div>
  );
};

export default AppLayout;