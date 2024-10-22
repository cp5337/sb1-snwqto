import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface Task {
  id: string;
  name: string;
  description: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  vRaven: string;
}

interface HD4TaskViewProps {
  hd4Action: 'Hunt' | 'Detect' | 'Disable' | 'Disrupt' | 'Dominate';
}

const HD4TaskView: React.FC<HD4TaskViewProps> = ({ hd4Action }) => {
  const [expandedTasks, setExpandedTasks] = useState<string[]>([]);

  // Mock tasks data - in a real application, this would come from an API or state management
  const tasks: Task[] = [
    { id: '1', name: `${hd4Action} Network Vulnerabilities`, description: 'Scan and identify network vulnerabilities', status: 'In Progress', vRaven: 'vRaven-1' },
    { id: '2', name: `${hd4Action} Malware Analysis`, description: 'Analyze potential malware samples', status: 'Pending', vRaven: 'vRaven-2' },
    { id: '3', name: `${hd4Action} Threat Intel`, description: 'Gather and analyze threat intelligence', status: 'Completed', vRaven: 'vRaven-3' },
  ];

  const toggleTask = (taskId: string) => {
    setExpandedTasks(prev =>
      prev.includes(taskId)
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">{hd4Action} Tasks</h2>
      <div className="space-y-2">
        {tasks.map(task => (
          <div key={task.id} className="border border-gray-200 dark:border-gray-700 rounded-md">
            <div
              className="flex justify-between items-center p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => toggleTask(task.id)}
            >
              <span className="font-medium">{task.name}</span>
              {expandedTasks.includes(task.id) ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </div>
            {expandedTasks.includes(task.id) && (
              <div className="p-2 bg-gray-50 dark:bg-gray-900">
                <p className="text-sm mb-1">{task.description}</p>
                <p className="text-xs"><span className="font-semibold">Status:</span> {task.status}</p>
                <p className="text-xs"><span className="font-semibold">vRaven:</span> {task.vRaven}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HD4TaskView;