/**
 * Hunt.tsx
 * Hunt module component for the Complex Threat Analysis System (CTAS)
 * Author: Charlie Payne
 * Date: June 15, 2023
 * 
 * This component represents the Hunt phase of the HD4 framework, focusing on
 * proactive threat hunting and intelligence gathering.
 * 
 * MVP:
 * - Basic threat hunting interface
 * - Simple visualization of potential threats
 * 
 * IOC:
 * - Integration with threat intelligence feeds
 * - Basic automated hunting scripts
 * 
 * Production:
 * - Advanced AI-driven threat hunting
 * - Integration with external threat intelligence platforms
 * - Customizable hunting playbooks
 */

import React, { useState } from 'react';
import HD4Map from '../components/HD4Map';
import CTASGraphAnimation from '../components/CTASGraphAnimation';
import HD4TaskView from '../components/HD4TaskView';
import ScriptScrapers from '../components/ScriptScrapers';
import TransformsGraph from '../components/TransformsGraph';
import KaliToolsIntegration from '../components/KaliToolsIntegration';
import PythonIntegration from '../components/PythonIntegration';
import PhishingModule from '../components/PhishingModule';
import N8NWorkflows from '../components/N8NWorkflows';

interface HuntProps {
  view: 'map' | 'graph';
}

const Hunt: React.FC<HuntProps> = ({ view }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'scripts' | 'transforms' | 'tools' | 'phishing' | 'workflows'>('overview');

  return (
    <div className="h-full bg-gray-900 text-gray-300 p-4">
      <div className="mb-4">
        {/* Tab navigation for different hunt functionalities */}
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
          className={`mr-2 px-2 py-1 text-xs rounded ${activeTab === 'tools' ? 'bg-blue-500' : 'bg-gray-700'}`}
          onClick={() => setActiveTab('tools')}
        >
          Tools
        </button>
        <button
          className={`mr-2 px-2 py-1 text-xs rounded ${activeTab === 'phishing' ? 'bg-blue-500' : 'bg-gray-700'}`}
          onClick={() => setActiveTab('phishing')}
        >
          Phishing
        </button>
        <button
          className={`px-2 py-1 text-xs rounded ${activeTab === 'workflows' ? 'bg-blue-500' : 'bg-gray-700'}`}
          onClick={() => setActiveTab('workflows')}
        >
          Workflows
        </button>
      </div>

      {activeTab === 'overview' && (
        <>
          <div className="h-3/4 mb-4">
            {/* Main hunt visualization (map or graph) */}
            {view === 'map' && <HD4Map hd4Action="Hunt" />}
            {view === 'graph' && <CTASGraphAnimation />}
          </div>
          <div className="h-1/4">
            {/* Task view for hunt-related tasks */}
            <HD4TaskView hd4Action="Hunt" />
          </div>
        </>
      )}

      {activeTab === 'scripts' && <ScriptScrapers hd4Action="Hunt" />}

      {activeTab === 'transforms' && <TransformsGraph hd4Action="Hunt" />}

      {activeTab === 'tools' && (
        <>
          <KaliToolsIntegration hd4Action="Hunt" />
          <PythonIntegration hd4Action="Hunt" />
        </>
      )}

      {activeTab === 'phishing' && <PhishingModule />}

      {activeTab === 'workflows' && <N8NWorkflows phase="Hunt" />}
    </div>
  );
};

export default Hunt;