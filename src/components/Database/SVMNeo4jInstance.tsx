import React, { useState } from 'react';
import { Network, Play, Square, RefreshCw, Database, Zap } from 'lucide-react';

interface SVMNeo4jInstance {
  id: string;
  name: string;
  status: 'Active' | 'Inactive';
  version: string;
  port: number;
  nodes: number;
  relationships: number;
  lastTraining: string;
  accuracy: number;
}

const SVMNeo4jInstance: React.FC = () => {
  const [instance, setInstance] = useState<SVMNeo4jInstance>({
    id: '1',
    name: 'SVM-ThreatClassifier',
    status: 'Active',
    version: '4.4.8',
    port: 7687,
    nodes: 5000000,
    relationships: 20000000,
    lastTraining: '2023-06-15 08:30:00',
    accuracy: 0.95,
  });

  const handleToggleStatus = () => {
    setInstance(prev => ({ ...prev, status: prev.status === 'Active' ? 'Inactive' : 'Active' }));
  };

  const handleRetrain = () => {
    // Simulating retraining process
    setInstance(prev => ({
      ...prev,
      lastTraining: new Date().toISOString().slice(0, 19).replace('T', ' '),
      accuracy: Math.min(0.99, prev.accuracy + Math.random() * 0.05),
    }));
  };

  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md text-xs">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-sm flex items-center">
            <Network size={14} className="mr-2" />
            {instance.name}
          </h2>
          <div className="flex space-x-2">
            <button onClick={handleToggleStatus} className={`p-1 rounded ${instance.status === 'Active' ? 'bg-green-500' : 'bg-gray-500'}`}>
              {instance.status === 'Active' ? <Play size={12} /> : <Square size={12} />}
            </button>
            <button onClick={handleRetrain} className="p-1 rounded bg-blue-500">
              <RefreshCw size={12} />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <p><span className="font-semibold">Version:</span> {instance.version}</p>
            <p><span className="font-semibold">Port:</span> {instance.port}</p>
            <p><span className="font-semibold">Nodes:</span> {instance.nodes.toLocaleString()}</p>
            <p><span className="font-semibold">Relationships:</span> {instance.relationships.toLocaleString()}</p>
          </div>
          <div className="space-y-2">
            <p><span className="font-semibold">Last Training:</span> {instance.lastTraining}</p>
            <p><span className="font-semibold">Accuracy:</span> {(instance.accuracy * 100).toFixed(2)}%</p>
            <p><span className="font-semibold">Status:</span> {instance.status}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <h3 className="font-semibold mb-2 flex items-center">
            <Database size={12} className="mr-2" />
            Data Statistics
          </h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Total Threat Patterns: 1,234,567</li>
            <li>Classified Threats: 987,654</li>
            <li>Unclassified Patterns: 246,913</li>
            <li>Average Classification Time: 0.05s</li>
          </ul>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <h3 className="font-semibold mb-2 flex items-center">
            <Zap size={12} className="mr-2" />
            Recent Classifications
          </h3>
          <ul className="list-disc list-inside space-y-1">
            <li>APT28 (Fancy Bear): 99.8% confidence</li>
            <li>Lazarus Group: 98.5% confidence</li>
            <li>APT29 (Cozy Bear): 97.2% confidence</li>
            <li>FIN7: 96.9% confidence</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SVMNeo4jInstance;