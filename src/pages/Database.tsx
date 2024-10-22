import React, { useState } from 'react';
import { Database as DatabaseIcon, Server, Search, Table, Network, Share2 } from 'lucide-react';
import MongoDBManagement from '../components/Database/MongoDBManagement';
import Neo4jManagement from '../components/Database/Neo4jManagement';
import ElasticsearchManagement from '../components/Database/ElasticsearchManagement';
import PostgreSQLManagement from '../components/Database/PostgreSQLManagement';
import SVMNeo4jInstance from '../components/Database/SVMNeo4jInstance';
import K8KnowledgeGraphs from '../components/Database/K8KnowledgeGraphs';

const Database: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'mongodb' | 'neo4j' | 'elasticsearch' | 'postgresql' | 'svm' | 'k8-graphs'>('mongodb');

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-900 min-h-screen text-xs">
      <h1 className="text-xs font-semibold mb-4 text-gray-800 dark:text-white flex items-center">
        <DatabaseIcon className="mr-2" size={12} />
        Database Management
      </h1>
      
      <div className="mb-4 flex flex-wrap">
        <button
          className={`mr-2 mb-2 px-2 py-1 text-xs rounded flex items-center ${activeTab === 'mongodb' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setActiveTab('mongodb')}
        >
          <Server size={10} className="mr-1" />
          MongoDB
        </button>
        <button
          className={`mr-2 mb-2 px-2 py-1 text-xs rounded flex items-center ${activeTab === 'neo4j' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setActiveTab('neo4j')}
        >
          <Network size={10} className="mr-1" />
          Neo4j
        </button>
        <button
          className={`mr-2 mb-2 px-2 py-1 text-xs rounded flex items-center ${activeTab === 'elasticsearch' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setActiveTab('elasticsearch')}
        >
          <Search size={10} className="mr-1" />
          Elasticsearch
        </button>
        <button
          className={`mr-2 mb-2 px-2 py-1 text-xs rounded flex items-center ${activeTab === 'postgresql' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setActiveTab('postgresql')}
        >
          <Table size={10} className="mr-1" />
          PostgreSQL
        </button>
        <button
          className={`mr-2 mb-2 px-2 py-1 text-xs rounded flex items-center ${activeTab === 'svm' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setActiveTab('svm')}
        >
          <Network size={10} className="mr-1" />
          SVM Neo4j
        </button>
        <button
          className={`px-2 py-1 text-xs rounded flex items-center ${activeTab === 'k8-graphs' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setActiveTab('k8-graphs')}
        >
          <Share2 size={10} className="mr-1" />
          K8 Knowledge Graphs
        </button>
      </div>

      {activeTab === 'mongodb' && <MongoDBManagement />}
      {activeTab === 'neo4j' && <Neo4jManagement />}
      {activeTab === 'elasticsearch' && <ElasticsearchManagement />}
      {activeTab === 'postgresql' && <PostgreSQLManagement />}
      {activeTab === 'svm' && <SVMNeo4jInstance />}
      {activeTab === 'k8-graphs' && <K8KnowledgeGraphs />}
    </div>
  );
};

export default Database;