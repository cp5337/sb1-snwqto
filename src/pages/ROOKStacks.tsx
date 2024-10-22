import React, { useState } from 'react';
import { Layers, Plus, Trash2, Play, Square, Target, Shield, Zap, Globe, Database, Cloud, BarChart2, Server } from 'lucide-react';
import StackManagement from '../components/ROOKStacks/StackManagement';
import StackAnalytics from '../components/ROOKStacks/StackAnalytics';
import VRavensMissions from '../components/ROOKStacks/VRavensMissions';
import ROOKStackManagement from '../components/ROOKStacks/ROOKStackManagement';

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
}

const ROOKStacks: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'management' | 'analytics' | 'vravens' | 'rook-management'>('management');
  const [stacks, setStacks] = useState<Stack[]>([
    { id: '1', name: 'vRaven (Energy Sector)', status: 'Active', attackSurface: 'SCADA Systems', hd4Mission: 'Hunt', target: 'Texas Power Grid', vRavenInstance: 'vRaven-Energy-1', elasticSearch: true, k8sConfig: 'energy-cluster' },
    { id: '2', name: 'vRaven (Texas Grid)', status: 'Active', attackSurface: 'Smart Meters', hd4Mission: 'Detect', target: 'ERCOT', vRavenInstance: 'vRaven-TexasGrid-1', elasticSearch: true, k8sConfig: 'texas-cluster' },
    { id: '3', name: 'vRaven (St. Mary\'s Medical)', status: 'Inactive', attackSurface: 'Hospital IoT Devices', hd4Mission: 'Disable', target: 'St. Mary\'s Medical Center', vRavenInstance: 'vRaven-StMarys-1', elasticSearch: false, k8sConfig: 'healthcare-cluster' },
    { id: '4', name: 'vRaven (NYPD)', status: 'Active', attackSurface: 'Police Database', hd4Mission: 'Dominate', target: 'NYPD HQ', vRavenInstance: 'vRaven-NYPD-1', elasticSearch: true, k8sConfig: 'law-enforcement-cluster' },
    { id: '5', name: 'vRaven (FDLE)', status: 'Inactive', attackSurface: 'Evidence Management Systems', hd4Mission: 'Disrupt', target: 'FDLE Regional Offices', vRavenInstance: 'vRaven-FDLE-1', elasticSearch: true, k8sConfig: 'florida-cluster' },
    { id: '6', name: 'vRaven (LAPD E-Crimes)', status: 'Active', attackSurface: 'Cybercrime Investigation Systems', hd4Mission: 'Hunt', target: 'LAPD E-Crimes Division', vRavenInstance: 'vRaven-LAPD-ECrimes-1', elasticSearch: true, k8sConfig: 'lapd-ecrimes-cluster' },
  ]);

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-900 min-h-screen text-xs">
      <h1 className="text-xs font-semibold mb-4 text-gray-800 dark:text-white flex items-center">
        <Layers className="mr-2" size={12} />
        Offensive ROOK Stacks
      </h1>
      
      <div className="mb-4 flex">
        <button
          className={`mr-2 px-2 py-1 text-xs rounded ${activeTab === 'management' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setActiveTab('management')}
        >
          Stack Management
        </button>
        <button
          className={`mr-2 px-2 py-1 text-xs rounded ${activeTab === 'analytics' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setActiveTab('analytics')}
        >
          Stack Analytics
        </button>
        <button
          className={`mr-2 px-2 py-1 text-xs rounded ${activeTab === 'vravens' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setActiveTab('vravens')}
        >
          vRavens Missions
        </button>
        <button
          className={`px-2 py-1 text-xs rounded ${activeTab === 'rook-management' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setActiveTab('rook-management')}
        >
          ROOK Management
        </button>
      </div>

      {activeTab === 'management' && (
        <StackManagement stacks={stacks} setStacks={setStacks} />
      )}

      {activeTab === 'analytics' && (
        <StackAnalytics stacks={stacks} />
      )}

      {activeTab === 'vravens' && (
        <VRavensMissions stacks={stacks} setStacks={setStacks} />
      )}

      {activeTab === 'rook-management' && (
        <ROOKStackManagement stacks={stacks} setStacks={setStacks} />
      )}
    </div>
  );
};

export default ROOKStacks;