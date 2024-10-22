import React, { useState } from 'react';
import { Plus, Trash2, Play, Square, Database } from 'lucide-react';

interface MongoDBInstance {
  id: string;
  name: string;
  status: 'Active' | 'Inactive';
  version: string;
  port: number;
  dataSize: string;
}

const MongoDBManagement: React.FC = () => {
  const [instances, setInstances] = useState<MongoDBInstance[]>([
    { id: '1', name: 'CTAS-Main', status: 'Active', version: '5.0.9', port: 27017, dataSize: '2.5 GB' },
    { id: '2', name: 'ThreatIntel-DB', status: 'Active', version: '5.0.9', port: 27018, dataSize: '1.8 GB' },
    { id: '3', name: 'LogAnalysis-DB', status: 'Inactive', version: '4.4.6', port: 27019, dataSize: '5.2 GB' },
  ]);

  const [newInstance, setNewInstance] = useState<Omit<MongoDBInstance, 'id'>>({
    name: '',
    status: 'Inactive',
    version: '',
    port: 27017,
    dataSize: '0 GB',
  });

  const handleAddInstance = () => {
    const id = (instances.length + 1).toString();
    setInstances([...instances, { ...newInstance, id }]);
    setNewInstance({
      name: '',
      status: 'Inactive',
      version: '',
      port: 27017,
      dataSize: '0 GB',
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
              <p><span className="font-semibold">Data Size:</span> {instance.dataSize}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-md">
        <h2 className="font-semibold mb-2">Add New MongoDB Instance</h2>
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

export default MongoDBManagement;