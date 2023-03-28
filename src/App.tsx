import { EventEdge } from 'components/diagram/edges/EventEdge';
import { FunctionBlock, FunctionBlockInspector, FunctionBlockNode } from 'components/diagram/nodes/FunctionBlock';
import { Text } from 'components/diagram/nodes/TextNode';
import { Input } from 'components/ui/Input';
import ScrollArea from 'components/ui/ScrollArea';
import { useCallback, useState } from 'react';
import ReactFlow, { applyNodeChanges, applyEdgeChanges, NodeChange, EdgeChange, Edge, Node, OnSelectionChangeParams, ReactFlowProvider } from 'reactflow';
import { Controls } from 'components/diagram/controls'
import { Drag } from 'components/ui/Drag';
import { Drop } from 'components/ui/Drop';
import {DndContext, DragOverlay} from '@dnd-kit/core';

const nodeTypes = {
  Text,
  FunctionBlock
}

const edgeTypes = {
  EventEdge
}

function App() {
  const [draggingId, setDraggingId] = useState(null);
  const onDragStart = useCallback((evt: any) => {
    console.log(evt)
  }, [])
  const onDragEnd = useCallback(() => setDraggingId(null), [])
  const onDragMove = useCallback((evt: any) => {
    // console.log()
  }, [])

  const initialNodes = [
    { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
    { id: '2', position: { x: 0, y: 0 }, data: { label: '1' } },
    { id: '3', type: 'Text', position: { x: 50, y: 50 }, data: { value: 123 } },
    new FunctionBlockNode(
      {
        id: '4',
        position: { x: 150, y: 150 },
        data: {
          name: '123',
          inputEvents: Array.from({ length: 10 }, (e, i) => ({ id: `inputEvent-${i}`, name: `inputEvent-${i}` })),
          outputEvents: Array.from({ length: 15 }, (e, i) => ({ id: `outputEvent-${i}`, name: `outputEvent-${i}` })),
          inputs: Array.from({ length: 15 }, (e, i) => ({ id: `input-${i}`, name: `input-${i}` })),
          outputs: Array.from({ length: 10 }, (e, i) => ({ id: `output-${i}`, name: `output-${i}` })),
          resource: 'fffff'
        }
      }),
    new FunctionBlockNode(
      {
        id: '5', type: 'FunctionBlock', position: { x: 150, y: 150 }, data: {
          name: '123',
          inputEvents: Array.from({ length: 10 }, (e, i) => ({ id: `inputEvent-${i}`, name: `inputEvent-${i}` })),
          outputEvents: Array.from({ length: 15 }, (e, i) => ({ id: `outputEvent-${i}`, name: `outputEvent-${i}` })),
          inputs: Array.from({ length: 15 }, (e, i) => ({ id: `input-${i}`, name: `input-${i}` })),
          outputs: Array.from({ length: 10 }, (e, i) => ({ id: `output-${i}`, name: `output-${i}` }))
        }
      }
    )
  ];
  const initialEdges = [
    { id: 'e1-2', source: '1', target: '2' }
  ];

  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [selection, setSelection] = useState<Node | Edge | null>(null)

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds: Node[]) => {
      changes.forEach(c => {
        if(c.type === 'reset' && c.item.id === selection?.id) {
          setSelection(c.item)
        }
      })
      return applyNodeChanges(changes, nds)
    }),
    [setNodes, selection]
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds: Edge[]) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const onSelectionchange = useCallback(
    ({ nodes, edges }: OnSelectionChangeParams) => {
      const arr = [...nodes, ...edges]
      if (arr.length === 1) setSelection(arr[0])
      else setSelection(null)
    },
    [setSelection]
  )

  const getInspector = useCallback(() => {
    if (selection) {
      if (selection.type === FunctionBlockNode.type) return <FunctionBlockInspector node={selection as FunctionBlockNode} />
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
    <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd} onDragMove={onDragMove}>
      <ReactFlowProvider>
        <div className="h-screen w-screen select-none font-mono">
          <div className="flex h-full w-full flex-row flex-nowrap">
            <div className='h-full min-w-[160px]'>
              <div className='h-8 border-b'>
                <Input className='h-full w-full border-none' placeholder='Search'/>
              </div>
              <Drag id='drag-1'/>
              <Drag id='drag-2'/>
              {/* <Drop id='drop-1'/> */}
            </div>
            <div className="flex w-0 grow flex-col flex-nowrap border-x">
              {/* <div className='h-8 border-b'>
                <button className='btn-ghost'>+</button>
              </div> */}
              <Controls className='flex h-8 flex-row flex-nowrap items-center border-b'/>

              <Drop id='drop-1' className='grow'>
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
              </Drop>
            </div>
            <ScrollArea className="h-full w-[240px] overflow-hidden">
              <div className='absolute inset-x-0'>
                <div className='flex h-8 flex-row items-center justify-center border-b'>{selection?.type}</div>
                <div className='px-1'>
                  {getInspector()}
                </div>
              </div>
            </ScrollArea>
          </div>
        </div>
      </ReactFlowProvider>
    </DndContext>
  )
}

export default App
