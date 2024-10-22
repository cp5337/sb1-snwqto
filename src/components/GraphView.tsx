import React, { useEffect, useRef } from 'react';
import ForceGraph2D from 'react-force-graph-2d';

const GraphView: React.FC = () => {
  const fgRef = useRef();

  const graphData = {
    nodes: [
      { id: 'node1', name: 'Node 1' },
      { id: 'node2', name: 'Node 2' },
      { id: 'node3', name: 'Node 3' },
    ],
    links: [
      { source: 'node1', target: 'node2' },
      { source: 'node2', target: 'node3' },
      { source: 'node3', target: 'node1' },
    ],
  };

  useEffect(() => {
    if (fgRef.current) {
      (fgRef.current as any).zoomToFit(400);
    }
  }, []);

  return (
    <div className="h-full bg-gray-800 p-2 rounded">
      <ForceGraph2D
        ref={fgRef}
        graphData={graphData}
        nodeLabel="name"
        nodeColor={() => '#69b3a2'}
        linkColor={() => '#ffffff'}
        width={800}
        height={400}
      />
    </div>
  );
};

export default GraphView;