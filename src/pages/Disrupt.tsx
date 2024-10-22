import React, { useState } from 'react';
import HD4Map from '../components/HD4Map';
import CTASGraphAnimation from '../components/CTASGraphAnimation';
import HD4TaskView from '../components/HD4TaskView';
import ScriptScrapers from '../components/ScriptScrapers';
import TransformsGraph from '../components/TransformsGraph';
import KaliToolsIntegration from '../components/KaliToolsIntegration';

interface DisruptProps {
  view: 'map' | 'graph';
}

const Disrupt: React.FC<DisruptProps> = ({ view }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'scripts' | 'transforms' | 'tools'>('overview');

  return (
    <div className="h-full bg-gray-900 text-gray-300 p-4">
      <div className="mb-4">
        <button
          className={`mr-2 px-2 py-1 text-xs rounded ${activeTab === 'overview' ? 'bg-blue-500' : 'bg-gray-700'}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={`mr-2 px-2 py-1 text-xs rounded ${activeTab === 'scripts' ? 'bg-blue-500' : 'bg-gray-700'}`}
          onClick={() => setActiveTab('scripts')}
        >
          Scripts
        </button>
        <button
          className={`mr-2 px-2 py-1 text-xs rounded ${activeTab === 'transforms' ? 'bg-blue-500' : 'bg-gray-700'}`}
          onClick={() => setActiveTab('transforms')}
        >
          Transforms
        </button>
        <button
          className={`px-2 py-1 text-xs rounded ${activeTab === 'tools' ? 'bg-blue-500' : 'bg-gray-700'}`}
          onClick={() => setActiveTab('tools')}
        >
          Tools
        </button>
      </div>

      {activeTab === 'overview' && (
        <>
          <div className="h-3/4 mb-4">
            {view === 'map' && <HD4Map hd4Action="Disrupt" />}
            {view === 'graph' && <CTASGraphAnimation />}
          </div>
          <div className="h-1/4">
            <HD4TaskView hd4Action="Disrupt" />
          </div>
        </>
      )}

      {activeTab === 'scripts' && <ScriptScrapers hd4Action="Disrupt" />}

      {activeTab === 'transforms' && <TransformsGraph hd4Action="Disrupt" />}

      {activeTab === 'tools' && <KaliToolsIntegration hd4Action="Disrupt" />}
    </div>
  );
};

export default Disrupt;