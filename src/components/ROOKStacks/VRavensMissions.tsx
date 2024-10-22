import React, { useState } from 'react';
import { Plus, Trash2, Edit2, Target, Shield, Zap, Square, Globe } from 'lucide-react';

interface Stack {
  id: string;
  name: string;
  status: 'Active' | 'Inactive';
  attackSurface: string;
  hd4Mission: 'Hunt' | 'Detect' | 'Disable' | 'Disrupt' | 'Dominate';
  target: string;
  vRavenInstance: string;
  elasticSearch: boolean;
  k8sConfig: string;
  ipAddress: string;
}

interface VRavensMissionsProps {
  stacks: Stack[];
  setStacks: React.Dispatch<React.SetStateAction<Stack[]>>;
}

const VRavensMissions: React.FC<VRavensMissionsProps> = ({ stacks, setStacks }) => {
  const [newVRaven, setNewVRaven] = useState<Omit<Stack, 'id'>>({
    name: '',
    status: 'Inactive',
    attackSurface: '',
    hd4Mission: 'Hunt',
    target: '',
    vRavenInstance: '',
    elasticSearch: false,
    k8sConfig: '',
    ipAddress: '',
  });

  const handleAddVRaven = () => {
    const id = (stacks.length + 1).toString();
    const ipAddress = generateRandomIP();
    setStacks([...stacks, { ...newVRaven, id, ipAddress }]);
    setNewVRaven({
      name: '',
      status: 'Inactive',
      attackSurface: '',
      hd4Mission: 'Hunt',
      target: '',
      vRavenInstance: '',
      elasticSearch: false,
      k8sConfig: '',
      ipAddress: '',
    });
  };

  const handleRemoveVRaven = (id: string) => {
    setStacks(stacks.filter(stack => stack.id !== id));
  };

  const handleToggleStatus = (id: string) => {
    setStacks(stacks.map(stack => 
      stack.id === id ? { ...stack, status: stack.status === 'Active' ? 'Inactive' : 'Active' } : stack
    ));
  };

  const getMissionIcon = (mission: Stack['hd4Mission']) => {
    switch (mission) {
      case 'Hunt': return <Target className="text-blue-500" size={12} />;
      case 'Detect': return <Shield className="text-green-500" size={12} />;
      case 'Disable': return <Zap className="text-yellow-500" size={12} />;
      case 'Disrupt': return <Square className="text-red-500" size={12} />;
      case 'Dominate': return <Globe className="text-purple-500" size={12} />;
    }
  };

  const generateRandomIP = () => {
    return `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`;
  };

  return (
    <div className="text-xs">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="px-2 py-1 text-left font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-2 py-1 text-left font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-2 py-1 text-left font-medium text-gray-500 uppercase tracking-wider">Mission</th>
              <th className="px-2 py-1 text-left font-medium text-gray-500 uppercase tracking-wider">Target</th>
              <th className="px-2 py-1 text-left font-medium text-gray-500 uppercase tracking-wider">IP</th>
              <th className="px-2 py-1 text-left font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {stacks.map(vRaven => (
              <tr key={vRaven.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-2 py-1 whitespace-nowrap">{vRaven.name}</td>
                <td className="px-2 py-1 whitespace-nowrap">
                  <span className={`px-1 inline-flex text-xxs leading-4 font-semibold rounded-full ${
                    vRaven.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {vRaven.status}
                  </span>
                </td>
                <td className="px-2 py-1 whitespace-nowrap">
                  <div className="flex items-center">
                    {getMissionIcon(vRaven.hd4Mission)}
                    <span className="ml-1">{vRaven.hd4Mission}</span>
                  </div>
                </td>
                <td className="px-2 py-1 whitespace-nowrap">{vRaven.target}</td>
                <td className="px-2 py-1 whitespace-nowrap">{vRaven.ipAddress}</td>
                <td className="px-2 py-1 whitespace-nowrap">
                  <button onClick={() => handleToggleStatus(vRaven.id)} className="text-blue-600 hover:text-blue-900 mr-1">
                    <Edit2 size={12} />
                  </button>
                  <button onClick={() => handleRemoveVRaven(vRaven.id)} className="text-red-600 hover:text-red-900">
                    <Trash2 size={12} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-2 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-md">
        <h2 className="text-xs font-semibold mb-1">Add New vRaven Mission</h2>
        <div className="grid grid-cols-3 gap-1">
          <input
            type="text"
            placeholder="Name"
            value={newVRaven.name}
            onChange={(e) => setNewVRaven({ ...newVRaven, name: e.target.value })}
            className="p-1 border rounded text-xxs"
          />
          <select
            value={newVRaven.hd4Mission}
            onChange={(e) => setNewVRaven({ ...newVRaven, hd4Mission: e.target.value as Stack['hd4Mission'] })}
            className="p-1 border rounded text-xxs"
          >
            <option value="Hunt">Hunt</option>
            <option value="Detect">Detect</option>
            <option value="Disable">Disable</option>
            <option value="Disrupt">Disrupt</option>
            <option value="Dominate">Dominate</option>
          </select>
          <input
            type="text"
            placeholder="Target"
            value={newVRaven.target}
            onChange={(e) => setNewVRaven({ ...newVRaven, target: e.target.value })}
            className="p-1 border rounded text-xxs"
          />
        </div>
        <div className="mt-1 flex items-center">
          <label className="flex items-center text-xxs">
            <input
              type="checkbox"
              checked={newVRaven.elasticSearch}
              onChange={(e) => setNewVRaven({ ...newVRaven, elasticSearch: e.target.checked })}
              className="mr-1"
            />
            Enable Elasticsearch
          </label>
          <button onClick={handleAddVRaven} className="ml-auto bg-blue-500 text-white px-1 py-0.5 rounded text-xxs flex items-center">
            <Plus size={10} className="mr-0.5" />
            Add Mission
          </button>
        </div>
      </div>
    </div>
  );
};

export default VRavensMissions;