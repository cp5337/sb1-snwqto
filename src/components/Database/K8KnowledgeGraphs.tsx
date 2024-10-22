import React, { useState } from 'react';
import { Share2, Plus, Trash2, Play, Square, Eye } from 'lucide-react';

interface K8Graph {
  id: string;
  name: string;
  status: 'Active' | 'Inactive';
  nodes: number;
  relationships: number;
  lastUpdated: string;
}

const K8KnowledgeGraphs: React.FC = () => {
  const [graphs, setGraphs] = useState<K8Graph[]>([
    { id: '1', name: 'K8s-ClusterTopology', status: 'Active', nodes: 1000, relationships: 5000, lastUpdated: '2023-06-15 10:30:00' },
    { id: '2', name: 'K8s-ServiceDependencies', status: 'Active', nodes: 500, relationships: 2000, lastUpdated: '2023-06-15 09:45:00' },
    { id: '3', name: 'K8s-NetworkPolicies', status: 'Inactive', nodes: 300, relationships: 1000, lastUpdated: '2023-06-14 16:20:00' },
  ]);

  const [newGraph, setNewGraph] = useState<Omit<K8Graph, 'id' | 'lastUpdated'>>({
    name: '',
    status: 'Inactive',
    nodes: 0,
    relationships: 0,
  });

  const handleAddGraph = () => {
    const id = (graphs.length + 1).toString();
    const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
    setGraphs([...graphs, { ...newGraph, id, lastUpdated: now }]);
    setNewGraph({
      name: '',
      status: 'Inactive',
      nodes: 0,
      relationships: 0,
    });
  };

  const handleRemoveGraph = (id: string) => {
    setGraphs(graphs.filter(graph => graph.id !== id));
  };

  const handleToggleStatus = (id: string) => {
    setGraphs(graphs.map(graph => 
      graph.id === id ? { ...graph, status: graph.status === 'Active' ? 'Inactive' : 'Active' } : graph
    ));
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {graphs.map(graph => (
          <div key={graph.id} className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-md text-xs">
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-semibold">{graph.name}</h2>
              <div className="flex space-x-2">
                <button onClick={() => handleToggleStatus(graph.id)} className={`p-1 rounded ${graph.status === 'Active' ? 'bg-green-500' : 'bg-gray-500'}`}>
                  {graph.status === 'Active' ? <Play size={10} /> : <Square size={10} />}
                </button>
                <button className="p-1 rounded bg-blue-500">
                  <Eye size={10} />
                </button>
                <button onClick={() => handleRemoveGraph(graph.id)} className="p-1 rounded bg-red-500">
                  <Trash2 size={10} />
                </button>
              </div>
            </div>
            <div className="space-y-1">
              <p><span className="font-semibold">Nodes:</span> {graph.nodes.toLocaleString()}</p>
              <p><span className="font-semibold">Relationships:</span> {graph.relationships.toLocaleString()}</p>
              <p><span className="font-semibold">Last Updated:</span> {graph.lastUpdated}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-md">
        <h2 className="font-semibold mb-2">Add New K8 Knowledge Graph</h2>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="text"
            placeholder="Name"
            value={newGraph.name}
            onChange={(e) => setNewGraph({ ...newGraph, name: e.target.value })}
            className="p-1 border rounded text-xs"
          />
          <input
            type="number"
            placeholder="Nodes"
            value={newGraph.nodes}
            onChange={(e) => setNewGraph({ ...newGraph, nodes: parseInt(e.target.value) })}
            className="p-1 border rounded text-xs"
          />
          <input
            type="number"
            placeholder="Relationships"
            value={newGraph.relationships}
            onChange={(e) => setNewGraph({ ...newGraph, relationships: parseInt(e.target.value) })}
            className="p-1 border rounded text-xs"
          />
        </div>
        <div className="mt-2 flex items-center">
          <button onClick={handleAddGraph} className="ml-auto bg-blue-500 text-white px-2 py-1 rounded text-xs flex items-center">
            <Plus size={10} className="mr-1" />
            Add Graph
          </button>
        </div>
      </div>
    </div>
  );
};

export default K8KnowledgeGraphs;