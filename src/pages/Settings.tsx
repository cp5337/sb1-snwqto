import React, { useState } from 'react';
import { Settings as SettingsIcon, User, Bell, Lock, Globe, Palette, Database, HardDrive, Zap, Upload, Link, List, Server } from 'lucide-react';
import TaskList from '../components/TaskList';
import VRavensList from '../components/VRavensList';
import taskData from '../data/tasks.json';

const SettingCard: React.FC<{ title: string; icon: React.ReactNode; onClick: () => void; isActive: boolean }> = ({ title, icon, onClick, isActive }) => (
  <div 
    className={`bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center justify-center cursor-pointer ${isActive ? 'ring-2 ring-blue-500' : ''}`}
    onClick={onClick}
  >
    <div className="text-blue-500 dark:text-blue-400 mb-4">{icon}</div>
    <h3 className="text-lg font-semibold text-center">{title}</h3>
  </div>
);

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');

  const settingsCards = [
    { title: 'General', icon: <SettingsIcon size={24} />, id: 'general' },
    { title: 'Account', icon: <User size={24} />, id: 'account' },
    { title: 'Notifications', icon: <Bell size={24} />, id: 'notifications' },
    { title: 'Security', icon: <Lock size={24} />, id: 'security' },
    { title: 'Localization', icon: <Globe size={24} />, id: 'localization' },
    { title: 'Appearance', icon: <Palette size={24} />, id: 'appearance' },
    { title: 'Data Management', icon: <Database size={24} />, id: 'data' },
    { title: 'Storage', icon: <HardDrive size={24} />, id: 'storage' },
    { title: 'Performance', icon: <Zap size={24} />, id: 'performance' },
    { title: 'Tasks', icon: <List size={24} />, id: 'tasks' },
    { title: 'vRavens', icon: <Server size={24} />, id: 'vravens' },
  ];

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
          <div className="flex space-x-4">
            <button className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-200">
              <Upload size={20} />
            </button>
            <button className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors duration-200">
              <Link size={20} />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-8">
          {settingsCards.map((card) => (
            <SettingCard 
              key={card.id} 
              title={card.title} 
              icon={card.icon} 
              onClick={() => setActiveTab(card.id)}
              isActive={activeTab === card.id}
            />
          ))}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          {activeTab === 'tasks' && <TaskList categories={taskData} />}
          {activeTab === 'vravens' && <VRavensList />}
          {activeTab !== 'tasks' && activeTab !== 'vravens' && (
            <p className="text-gray-600 dark:text-gray-300">Content for {activeTab} settings goes here.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;