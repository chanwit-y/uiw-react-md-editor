import { useState, useCallback } from 'react';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, type NodeChange, type EdgeChange } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { DisplayMDNode } from './DisplayMDNode';

const initialNodes = [
	{
		id: 'n1',
		type: 'displayMDNode',
		position: { x: 0, y: 0 }, data: { label: 'Node 1' }
	},
	{
		id: 'n2',
		type: 'displayMDNode',
		position: { x: 500, y: 200 }, data: { label: 'Node 2' }
	},
];
const initialEdges = [{ id: 'n1-n2', source: 'n1', target: 'n2' }];

const nodeTypes = {
	displayMDNode: DisplayMDNode,
};

export const MindMap = () => {
	const [nodes, setNodes] = useState(initialNodes);
	const [edges, setEdges] = useState(initialEdges);

	const onNodesChange = useCallback(
		(changes: NodeChange<{ id: string; type: string; position: { x: number; y: number; }; data: { label: string; }; }>[]) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
		[],
	);
	const onEdgesChange = useCallback(
		(changes: EdgeChange<{ id: string; source: string; target: string; }>[]) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
		[],
	);
	const onConnect = useCallback(
		(params: any) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
		[],
	);

	return (
		<div style={{ width: '70vw', height: '100vh', border: '1px solid red' }}>
			<ReactFlow
				nodes={nodes}
				edges={edges}
				defaultViewport={{ x: 30, y: 30, zoom: 0.7 }}
				nodeTypes={nodeTypes}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				onConnect={onConnect}
				// fitView
			/>
		</div>
	);
}