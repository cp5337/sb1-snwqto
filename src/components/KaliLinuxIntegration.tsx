import React, { useState } from 'react';
import { Terminal, Play, Square } from 'lucide-react';

interface KaliTool {
  name: string;
  description: string;
  status: 'Ready' | 'Running' | 'Stopped';
}

const KaliLinuxIntegration: React.FC = () => {
  const [kaliTools, setKaliTools] = useState<KaliTool[]>([
    { name: 'Nmap', description: 'Network scanning and discovery', status: 'Ready' },
    { name: 'Metasploit', description: 'Penetration testing framework', status: 'Ready' },
    { name: 'Wireshark', description: 'Network protocol analyzer', status: 'Ready' },
    { name: 'Aircrack-ng', description: 'Wireless security auditing', status: 'Ready' },
    { name: 'John the Ripper', description: 'Password cracking tool', status: 'Ready' },
  ]);

  const handleToolAction = (index: number) => {
    setKaliTools(prevTools => {
      const newTools = [...prevTools];
      newTools[index].status = newTools[index].status === 'Running' ? 'Stopped' : 'Running';
      return newTools;
    });
  };

  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <Terminal className="mr-2" size={24} />
        Kali Linux Tools Integration
      </h2>
      <div className="space-y-4">
        {kaliTools.map((tool, index) => (
          <div key={index} className="flex items-center justify-between bg-gray-700 p-3 rounded-lg">
            <div>
              <h3 className="font-semibold">{tool.name}</h3>
              <p className="text-sm text-gray-300">{tool.description}</p>
            </div>
            <div className="flex items-center">
              <span className={`mr-2 px-2 py-1 rounded text-xs ${
                tool.status === 'Running' ? 'bg-green-500' : 
                tool.status === 'Stopped' ? 'bg-red-500' : 'bg-yellow-500'
              }`}>
                {tool.status}
              </span>
              <button 
                onClick={() => handleToolAction(index)}
                className="p-1 bg-blue-500 rounded hover:bg-blue-600"
              >
                {tool.status === 'Running' ? <Square size={16} /> : <Play size={16} />}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KaliLinuxIntegration;