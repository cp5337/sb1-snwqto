import React, { useState } from 'react';
import { Plus, Trash2, Play, Square, Search } from 'lucide-react';

interface ElasticsearchInstance {
  id: string;
  name: string;
  status: 'Active' | 'Inactive';
  version: string;
  port: number;
  indices: number;
  documents: number;
}

const ElasticsearchManagement: React.FC = () => {
  const [instances, setInstances] = useState<ElasticsearchInstance[]>([
    { id: '1', name: 'LogAnalysis', status: 'Active', version: '7.17.5', port: 9200, indices: 50, documents: 10000000 },
    { id: '2', name: 'ThreatIntel', status: 'Active', version: '7.17.5', port: 9201, indices: 30, documents: 5000000 },
    { id: '3', name: 'NetworkTraffic', status: 'Inactive', version: '7.10.2', port: 9202, indices: 20, documents: 2000000 },
  ]);

  const [newInstance, setNewInstance] = useState<Omit<ElasticsearchInstance, 'id'>>({
    name: '',
    status: 'Inactive',
    version: '',
    port: 9200,
    indices: 0,
    documents: 0,
  });

  const handleAddInstance = () => {
    const id = (instances.length + 1).toString();
    setInstances([...instances, { ...newInstance, id }]);
    setNewInstance({
      name: '',
      status: 'Inactive',
      version: '',
      port: 9200,
      indices: 0,
      documents: 0,
    });
  };

  const handleRemoveInstance = (id: string) => {
    setInstances(instances.filter(instance => instance.id !== id));
  };

  const handleToggleStatus = (id: string) => {
    setInstances(instances.map(instance => 
      instance.id === id ? { ...instance, status: instance.status === 'Active' ? 'Inactive' : 'Active' } : instance
    ));
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {instances.map(instance => (
          <div key={instance.id} className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-md text-xs">
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-semibold">{instance.name}</h2>
              <div className="flex space-x-2">
                <button onClick={() => handleToggleStatus(instance.id)} className={`p-1 rounded ${instance.status === 'Active' ? 'bg-green-500' : 'bg-gray-500'}`}>
                  {instance.status === 'Active' ? <Play size={10} /> : <Square size={10} />}
                </button>
                <button onClick={() => handleRemoveInstance(instance.id)} className="p-1 rounded bg-red-500">
                  <Trash2 size={10} />
                </button>
              </div>
            </div>
            <div className="space-y-1">
              <p><span className="font-semibold">Version:</span> {instance.version}</p>
              <p><span className="font-semibold">Port:</span> {instance.port}</p>
              <p><span className="font-semibold">Indices:</span> {instance.indices}</p>
              <p><span className="font-semibold">Documents:</span> {instance.documents.toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-md">
        <h2 className="font-semibold mb-2">Add New Elasticsearch Instance</h2>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="text"
            placeholder="Name"
            value={newInstance.name}
            onChange={(e) => setNewInstance({ ...newInstance, name: e.target.value })}
            className="p-1 border rounded text-xs"
          />
          <input
            type="text"
            placeholder="Version"
            value={newInstance.version}
            onChange={(e) => setNewInstance({ ...newInstance, version: e.target.value })}
            className="p-1 border rounded text-xs"
          />
          <input
            type="number"
            placeholder="Port"
            value={newInstance.port}
            onChange={(e) => setNewInstance({ ...newInstance, port: parseInt(e.target.value) })}
            className="p-1 border rounded text-xs"
          />
        </div>
        <div className="mt-2 flex items-center">
          <button onClick={handleAddInstance} className="ml-auto bg-blue-500 text-white px-2 py-1 rounded text-xs flex items-center">
            <Plus size={10} className="mr-1" />
            Add Instance
          </button>
        </div>
      </div>
    </div>
  );
};

export default ElasticsearchManagement;