// src/App.tsx
import React from 'react';
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

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
          <Sidebar />
          <div className="flex flex-col flex-1 overflow-hidden">
            <Navigation />
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900 p-4">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/hunt" element={<Hunt />} />
                <Route path="/detect" element={<Detect />} />
                <Route path="/disable" element={<Disable />} />
                <Route path="/disrupt" element={<Disrupt />} />
                <Route path="/dominate" element={<Dominate />} />
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
  );
};

export default App;
