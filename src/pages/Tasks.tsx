import React, { useState } from 'react';
import taskData from '../data/tasks.json';
import { ChevronDown, ChevronRight } from 'lucide-react';

const Tasks: React.FC = () => {
  const [expandedCategories, setExpandedCategories] = useState<number[]>([]);

  const toggleCategory = (categoryId: number) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 min-h-screen">
      <h1 className="text-sm font-semibold mb-2 text-gray-800 dark:text-white">Tasks</h1>
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th className="p-1 border border-gray-300 dark:border-gray-600 text-left">Category / Task ID</th>
              <th className="p-1 border border-gray-300 dark:border-gray-600 text-left">Task Name</th>
              <th className="p-1 border border-gray-300 dark:border-gray-600 text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            {taskData.map((category) => (
              <React.Fragment key={category.category_id}>
                <tr>
                  <td colSpan={3} className="p-1 border border-gray-300 dark:border-gray-600">
                    <button
                      onClick={() => toggleCategory(category.category_id)}
                      className="flex items-center w-full text-left font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      {expandedCategories.includes(category.category_id) ? (
                        <ChevronDown size={12} className="mr-1" />
                      ) : (
                        <ChevronRight size={12} className="mr-1" />
                      )}
                      <span>{category.category}</span>
                    </button>
                  </td>
                </tr>
                {expandedCategories.includes(category.category_id) && category.tasks.map(task => (
                  <tr key={task.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="p-1 border border-gray-300 dark:border-gray-600">{task.id}</td>
                    <td className="p-1 border border-gray-300 dark:border-gray-600">{task.task_name}</td>
                    <td className="p-1 border border-gray-300 dark:border-gray-600">{task.description}</td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tasks;