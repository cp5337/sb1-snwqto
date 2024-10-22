import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Hunt from './pages/Hunt';
import Detect from './pages/Detect';
import Disable from './pages/Disable';
import Disrupt from './pages/Disrupt';
import Dominate from './pages/Dominate';

const App: React.FC = () => {
  return (
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
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
