import { EventEdge } from 'components/diagram/edges/EventEdge';
import { FunctionBlock, FunctionBlockInspector } from 'components/diagram/nodes/FunctionBlock';
import { Text } from 'components/diagram/nodes/TextNode';
import ScrollArea from 'components/ui/ScrollArea';
import { useCallback, useState } from 'react';
import ReactFlow, {  applyNodeChanges, applyEdgeChanges, NodeChange, EdgeChange, Edge, Node, OnSelectionChangeParams, ReactFlowProvider, useReactFlow } from 'reactflow';
import { Inspector } from './components/diagram/Inspector';

const nodeTypes = {
  Text,
  FunctionBlock
}

const edgeTypes = {
  EventEdge
}

function App() {
  const initialNodes = [
    { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
    { id: '2', position: { x: 0, y: 0 }, data: { label: '1' } },
    { id: '3', type: 'Text', position: { x: 50, y: 50 }, data: {value: 123} },
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
    { id: 'e1-2', source: '1', target: '2'}
  ];

  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [selection, setSelection] = useState<Node | Edge | null>(null)


  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds: Node[]) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds: Edge[]) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const onSelectionchange = useCallback(
    ({nodes, edges}: OnSelectionChangeParams) => {
      const arr = [...nodes, ...edges]
      if(arr.length === 1) setSelection(arr[0])
      else setSelection(null)
    },
    [setSelection]
  )

  const getInspector = useCallback(() => {
    if(selection) {
      if(selection.type === 'FunctionBlock') return <FunctionBlockInspector />
    }
    return ''
  }, [selection])


  // const onConnect = useCallback(
  //   (connection: Connection) => setEdges((eds) => {
  //     return addEdge(connection, eds)
  //   }),
  //   [setEdges]
  // );

  return (
    <ReactFlowProvider>
      <div className="h-screen w-screen font-mono select-none">
        <div className="flex h-full w-full flex-row flex-nowrap">
          <div className='h-full'>
            1
          </div>
          <div className="w-0 grow" >
            <ReactFlow
              nodeTypes={nodeTypes}
              edgeTypes={edgeTypes}
              nodes={nodes}
              edges={edges}  
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onSelectionChange={onSelectionchange}
              // onConnect={onConnect}
              >
            </ReactFlow>
          </div>
          <ScrollArea className="w-[240px] h-full overflow-hidden">
            <div className='p-1 absolute left-0 right-0'>
              { getInspector() }
            </div>
          </ScrollArea>
        </div>
      </div>
    </ReactFlowProvider>
  )
}

export default App
