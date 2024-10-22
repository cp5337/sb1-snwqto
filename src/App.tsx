import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Navigation from './components/Navigation';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Hunt from './pages/Hunt';
import Detect from './pages/Detect';
import Disable from './pages/Disable';
import Disrupt from './pages/Disrupt';
import Dominate from './pages/Dominate';
import DVM from './pages/DVM';
import Tasks from './pages/Tasks';
import InfoStreams from './pages/InfoStreams';
import Containers from './pages/Containers';
import Database from './pages/Database';
import QuickScripts from './pages/QuickScripts';
import Shodan from './pages/Shodan';
import ROOKStacks from './pages/ROOKStacks';
import Settings from './pages/Settings';
import { connectToMongoDB } from './utils/mongodb';
import ErrorBoundary from './components/ErrorBoundary';

const App: React.FC = () => {
  const [view, setView] = useState<'map' | 'graph'>('map');
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'failed'>('connecting');

  useEffect(() => {
    const initMongoDB = async () => {
      try {
        await connectToMongoDB();
        setConnectionStatus('connected');
      } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        setConnectionStatus('failed');
      }
    };

    initMongoDB();
  }, []);

  if (connectionStatus === 'connecting') {
    return <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <p className="text-lg text-gray-800 dark:text-gray-200">Connecting to database...</p>
    </div>;
  }

  if (connectionStatus === 'failed') {
    return <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <p className="text-lg text-red-600 dark:text-red-400">Failed to connect to the database. Please check your connection and try again.</p>
    </div>;
  }

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <Router>
          <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
            <Sidebar />
            <div className="flex flex-col flex-1 ml-40 overflow-hidden">
              <Navigation view={view} setView={setView} />
              <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900 p-4">
                <Routes>
                  <Route path="/" element={<Dashboard view={view} />} />
                  <Route path="/hunt" element={<Hunt view={view} />} />
                  <Route path="/detect" element={<Detect view={view} />} />
                  <Route path="/disable" element={<Disable view={view} />} />
                  <Route path="/disrupt" element={<Disrupt view={view} />} />
                  <Route path="/dominate" element={<Dominate view={view} />} />
                  <Route path="/dvm" element={<DVM />} />
                  <Route path="/tasks" element={<Tasks />} />
                  <Route path="/info-streams" element={<InfoStreams />} />
                  <Route path="/containers" element={<Containers />} />
                  <Route path="/database" element={<Database />} />
                  <Route path="/quick-scripts" element={<QuickScripts />} />
                  <Route path="/shodan" element={<Shodan />} />
                  <Route path="/rook-stacks" element={<ROOKStacks />} />
                  <Route path="/settings" element={<Settings />} />
                </Routes>
              </main>
            </div>
          </div>
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;