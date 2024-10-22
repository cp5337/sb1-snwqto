import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Shield, Zap, Target, Settings, Clipboard, Radio, Box, Database, Code, Globe, Cpu, Layers } from 'lucide-react';

const Sidebar: React.FC = () => {
  const location = useLocation();

  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', path: '/', icon: <Home size={12} /> },
    { id: 'hunt', name: 'Hunt', path: '/hunt', icon: <Search size={12} /> },
    { id: 'detect', name: 'Detect', path: '/detect', icon: <Shield size={12} /> },
    { id: 'disable', name: 'Disable', path: '/disable', icon: <Zap size={12} /> },
    { id: 'disrupt', name: 'Disrupt', path: '/disrupt', icon: <Target size={12} /> },
    { id: 'dominate', name: 'Dominate', path: '/dominate', icon: <Globe size={12} /> },
    { id: 'dvm', name: 'DVM', path: '/dvm', icon: <Cpu size={12} /> },
    { id: 'tasks', name: 'Tasks', path: '/tasks', icon: <Clipboard size={12} /> },
    { id: 'info-streams', name: 'Info Streams', path: '/info-streams', icon: <Radio size={12} /> },
    { id: 'containers', name: 'Containers', path: '/containers', icon: <Box size={12} /> },
    { id: 'database', name: 'Database', path: '/database', icon: <Database size={12} /> },
    { id: 'quick-scripts', name: 'Quick Scripts', path: '/quick-scripts', icon: <Code size={12} /> },
    { id: 'shodan', name: 'Shodan', path: '/shodan', icon: <Search size={12} /> },
    { id: 'rook-stacks', name: 'ROOK Stacks', path: '/rook-stacks', icon: <Layers size={12} /> },
    { id: 'settings', name: 'Settings', path: '/settings', icon: <Settings size={12} /> },
  ];

  return (
    <div className="w-40 h-full bg-gray-800 text-gray-300 fixed left-0 top-0 overflow-y-auto">
      <div className="p-3">
        <h2 className="text-sm font-semibold">CTAS</h2>
      </div>
      <nav className="mt-2">
        {menuItems.map((item) => (
          <Link
            key={item.id}
            to={item.path}
            className={`flex items-center px-3 py-1.5 text-xs ${
              location.pathname === item.path ? 'bg-gray-700 text-white' : 'hover:bg-gray-700'
            }`}
          >
            <span className="w-4">{item.icon}</span>
            <span className="ml-2">{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;