import React, { useState } from 'react';
import { Terminal, ExternalLink, Plus } from 'lucide-react';

interface KaliTool {
  name: string;
  description: string;
  category: string;
  link: string;
}

interface KaliToolsIntegrationProps {
  hd4Action: 'Hunt' | 'Detect' | 'Disable' | 'Disrupt' | 'Dominate';
}

const KaliToolsIntegration: React.FC<KaliToolsIntegrationProps> = ({ hd4Action }) => {
  const [kaliTools, setKaliTools] = useState<KaliTool[]>([
    { name: 'Nmap', description: 'Network discovery and security auditing', category: 'Information Gathering', link: 'https://nmap.org/' },
    { name: 'Metasploit', description: 'Penetration testing framework', category: 'Exploitation Tools', link: 'https://www.metasploit.com/' },
    { name: 'Wireshark', description: 'Network protocol analyzer', category: 'Sniffing & Spoofing', link: 'https://www.wireshark.org/' },
    { name: 'Aircrack-ng', description: 'WiFi security auditing tools suite', category: 'Wireless Attacks', link: 'https://www.aircrack-ng.org/' },
    { name: 'John the Ripper', description: 'Password cracking tool', category: 'Password Attacks', link: 'https://www.openwall.com/john/' },
    { name: 'Burp Suite', description: 'Web application security testing', category: 'Web Application Analysis', link: 'https://portswigger.net/burp' },
    { name: 'Hydra', description: 'Network logon cracker', category: 'Password Attacks', link: 'https://github.com/vanhauser-thc/thc-hydra' },
    { name: 'Sqlmap', description: 'Automatic SQL injection tool', category: 'Database Assessment', link: 'http://sqlmap.org/' },
    { name: 'Maltego', description: 'Open source intelligence and forensics', category: 'Information Gathering', link: 'https://www.maltego.com/' },
    { name: 'Nikto', description: 'Web server scanner', category: 'Web Application Analysis', link: 'https://cirt.net/Nikto2' },
    { name: 'macchanger', description: 'MAC address spoofer', category: 'Network Manipulation', link: 'https://github.com/alobbs/macchanger' },
    { name: 'Tor', description: 'Anonymity network', category: 'Anonymity', link: 'https://www.torproject.org/' },
  ]);

  const [showAddTool, setShowAddTool] = useState(false);
  const [newTool, setNewTool] = useState<KaliTool>({ name: '', description: '', category: '', link: '' });

  const filteredTools = kaliTools.filter(tool => {
    switch (hd4Action) {
      case 'Hunt':
        return ['Information Gathering', 'Sniffing & Spoofing', 'Anonymity'].includes(tool.category);
      case 'Detect':
        return ['Sniffing & Spoofing', 'Web Application Analysis', 'Network Manipulation'].includes(tool.category);
      case 'Disable':
        return ['Exploitation Tools', 'Password Attacks', 'Network Manipulation'].includes(tool.category);
      case 'Disrupt':
        return ['Exploitation Tools', 'Wireless Attacks', 'Network Manipulation'].includes(tool.category);
      case 'Dominate':
        return ['Exploitation Tools', 'Database Assessment', 'Anonymity'].includes(tool.category);
      default:
        return true;
    }
  });

  const handleAddTool = () => {
    setKaliTools([...kaliTools, newTool]);
    setNewTool({ name: '', description: '', category: '', link: '' });
    setShowAddTool(false);
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold flex items-center">
          <Terminal className="mr-2" size={20} />
          Kali Linux Tools for {hd4Action}
        </h2>
        <button
          onClick={() => setShowAddTool(!showAddTool)}
          className="bg-blue-500 text-white px-2 py-1 rounded text-xs flex items-center"
        >
          <Plus size={12} className="mr-1" />
          Add Tool
        </button>
      </div>
      
      {showAddTool && (
        <div className="mb-4 bg-gray-700 p-3 rounded-lg">
          <input
            type="text"
            placeholder="Tool Name"
            value={newTool.name}
            onChange={(e) => setNewTool({...newTool, name: e.target.value})}
            className="mb-2 p-1 w-full bg-gray-600 text-white rounded"
          />
          <input
            type="text"
            placeholder="Description"
            value={newTool.description}
            onChange={(e) => setNewTool({...newTool, description: e.target.value})}
            className="mb-2 p-1 w-full bg-gray-600 text-white rounded"
          />
          <input
            type="text"
            placeholder="Category"
            value={newTool.category}
            onChange={(e) => setNewTool({...newTool, category: e.target.value})}
            className="mb-2 p-1 w-full bg-gray-600 text-white rounded"
          />
          <input
            type="text"
            placeholder="Link"
            value={newTool.link}
            onChange={(e) => setNewTool({...newTool, link: e.target.value})}
            className="mb-2 p-1 w-full bg-gray-600 text-white rounded"
          />
          <button
            onClick={handleAddTool}
            className="bg-green-500 text-white px-2 py-1 rounded text-xs"
          >
            Add
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTools.map((tool, index) => (
          <div key={index} className="bg-gray-700 p-3 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">{tool.name}</h3>
              <a
                href={tool.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300"
              >
                <ExternalLink size={16} />
              </a>
            </div>
            <p className="text-sm text-gray-400 mb-2">{tool.description}</p>
            <span className="text-xs bg-gray-600 text-gray-300 px-2 py-1 rounded">
              {tool.category}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KaliToolsIntegration;