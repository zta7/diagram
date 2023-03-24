
import FunctionBlock from 'components/diagram/FunctionBlock';
import TextNode from 'components/diagram/TextNode';
import { useCallback, useState, useMemo } from 'react';
import ReactFlow, { useNodesState, useEdgesState, addEdge, MiniMap, applyNodeChanges, applyEdgeChanges, NodeChange, EdgeChange, Edge, Node } from 'reactflow';
import 'reactflow/dist/base.css';

function App() {
  const nodeTypes = useMemo(() => ({ TextNode, FunctionBlock }), []);

  const initialNodes = [
    { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
    { id: '2', position: { x: 0, y: 0 }, data: { label: '1' } },
    { id: '3', type: 'TextNode', position: { x: 50, y: 50 }, data: {value: 123} },
    { id: '4', type: 'FunctionBlock', position: { x: 150, y: 150 }, data: {
      name: '123',
      inputEvents: Array.from({ length: 10 }, (e, i) => ({ id: `inputEvent-${i}`, name: `inputEvent-${i}` })),
      outputEvents: Array.from({ length: 15 }, (e, i) => ({ id: `outputEvent-${i}`, name: `outputEvent-${i}` })),
      inputs: Array.from({ length: 15 }, (e, i) => ({ id: `input-${i}`, name: `input-${i}` })),
      outputs: Array.from({ length: 10 }, (e, i) => ({ id: `output-${i}`, name: `output-${i}` }))
    } },
    { id: '5', type: 'FunctionBlock', position: { x: 150, y: 150 }, data: {
      name: '123',
      inputEvents: Array.from({ length: 10 }, (e, i) => ({ id: `inputEvent-${i}`, name: `inputEvent-${i}` })),
      outputEvents: Array.from({ length: 15 }, (e, i) => ({ id: `outputEvent-${i}`, name: `outputEvent-${i}` })),
      inputs: Array.from({ length: 15 }, (e, i) => ({ id: `input-${i}`, name: `input-${i}` })),
      outputs: Array.from({ length: 10 }, (e, i) => ({ id: `output-${i}`, name: `output-${i}` }))
    } },
  ];
  const initialEdges = [
    { id: 'e1-2', source: '1', target: '2' }
  ];

  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds: Node[]) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds: Edge[]) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection: any) => setEdges((eds) => {
      console.log(eds)
      return addEdge(connection, eds)
    }),
    [setEdges]
  );

  return (
    <div className="h-screen w-screen font-mono">
      <div className="flex h-full w-full flex-row">
        <div>1</div>
        <div className="w-0 grow" >
          <ReactFlow
            nodeTypes={nodeTypes}
            nodes={nodes}
            edges={edges}  
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}>
          </ReactFlow>
        </div>
        <div>
          <div>1</div>
        </div>
      </div>
    </div>
  )
}

export default App
