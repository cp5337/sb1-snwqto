/**
 * Dashboard.tsx
 * Main dashboard component for the Complex Threat Analysis System (CTAS)
 * Author: Charlie Payne
 * Date: June 15, 2023
 * 
 * This component serves as the primary interface for users to interact with the CTAS.
 * 
 * MVP: 
 * - Display basic threat statistics
 * - Show a simplified graph of threat actors and their relationships
 * 
 * IOC:
 * - Integrate real-time data feeds
 * - Add interactive elements to the graph
 * - Implement basic AI-driven threat analysis
 * 
 * Production:
 * - Full integration with all CTAS modules
 * - Advanced AI-driven predictive analysis
 * - Customizable dashboard layouts for different user roles
 */

import React from 'react';
import ControlPanel from '../components/ControlPanel';
import VirtualRavenDashboard from '../components/VirtualRavenDashboard';
import AIIntegration from '../components/AIIntegration';
import IoTControl from '../components/IoTControl';
import { useTheme } from '../contexts/ThemeContext';

interface DashboardProps {
  view: 'map' | 'graph';
}

const Dashboard: React.FC<DashboardProps> = ({ view }) => {
  const { theme } = useTheme();

  return (
    <div className="h-full w-full p-4 overflow-auto">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Main control panel for threat visualization */}
        <div className="h-[calc(70vh-2rem)]">
          <ControlPanel view={view} />
        </div>
        
        {/* Virtual Raven dashboard for advanced threat analysis */}
        <VirtualRavenDashboard />
        
        {/* AI integration component for predictive analysis */}
        <AIIntegration />
        
        {/* IoT control panel for managing connected devices */}
        <IoTControl />
      </div>
    </div>
  );
};

export default Dashboard;