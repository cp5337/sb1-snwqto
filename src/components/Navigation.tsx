import React from 'react';
import { Map, Network } from 'lucide-react';
import { useLocation } from 'react-router-dom';

interface NavigationProps {
  view: 'map' | 'graph';
  setView: (view: 'map' | 'graph') => void;
}

const Navigation: React.FC<NavigationProps> = ({ view, setView }) => {
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname.slice(1);
    return path ? path.charAt(0).toUpperCase() + path.slice(1) : 'Dashboard';
  };

  const isHD4Page = ['/hunt', '/detect', '/disable', '/disrupt', '/dominate', '/'].includes(location.pathname);

  return (
    <nav className="bg-gray-800 text-white h-8 flex items-center px-3">
      <span className="text-xs font-semibold mr-2">CTAS - {getPageTitle()}</span>
      <div className="flex-grow" />
      {isHD4Page && (
        <div className="flex space-x-2">
          <button
            onClick={() => setView('map')}
            className={`p-0.5 rounded ${view === 'map' ? 'bg-blue-600' : 'bg-gray-700'}`}
          >
            <Map size={12} />
          </button>
          <button
            onClick={() => setView('graph')}
            className={`p-0.5 rounded ${view === 'graph' ? 'bg-blue-600' : 'bg-gray-700'}`}
          >
            <Network size={12} />
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navigation;