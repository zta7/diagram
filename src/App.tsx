import { EventEdge } from 'components/diagram/edges/EventEdge';
import { FunctionBlock, FunctionBlockInspector, FunctionBlockNode } from 'components/diagram/nodes/FunctionBlock';
import { Text } from 'components/diagram/nodes/TextNode';
import { Input } from 'components/ui/Input';
import ScrollArea from 'components/ui/ScrollArea';
import {
  useCallback, useRef, useState,
} from 'react';
import ReactFlow, {
  applyNodeChanges, applyEdgeChanges, NodeChange, EdgeChange, Edge, Node,
  OnSelectionChangeParams, ReactFlowProvider, ReactFlowInstance,
} from 'reactflow';
import { Controls } from 'components/diagram/controls';
import { Drag } from 'components/ui/Drag';
import { Drop, DropIdEnum } from 'components/ui/Drop';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { getCanDrop } from 'components/diagram/helper';
import { get, isObject, isPlainObject } from 'lodash';
import { BasicNode } from 'components/diagram/nodes/BasicNode';

const nodeTypes = {
  Text,
  FunctionBlock,
};

const edgeTypes = {
  EventEdge,
};

function App() {
  const dropRef = useRef<HTMLElement | null>(null);
  const [draggingId, setDraggingId] = useState(null);
  const onDragStart = useCallback((evt: any) => {
    console.log(draggingId, evt);
  }, []);
  const onDragMove = useCallback((evt: any) => {
    console.log(evt);
  }, []);

  const initialNodes = [
    { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
    { id: '2', position: { x: 0, y: 0 }, data: { label: '1' } },
    {
      id: '3', type: 'Text', position: { x: 50, y: 50 }, data: { value: 123 },
    },
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
          resource: 'fffff',
        },
      },
    ),
    new FunctionBlockNode(
      {
        id: '5',
        type: 'FunctionBlock',
        position: { x: 150, y: 150 },
        data: {
          name: '123',
          inputEvents: Array.from({ length: 10 }, (e, i) => ({ id: `inputEvent-${i}`, name: `inputEvent-${i}` })),
          outputEvents: Array.from({ length: 15 }, (e, i) => ({ id: `outputEvent-${i}`, name: `outputEvent-${i}` })),
          inputs: Array.from({ length: 15 }, (e, i) => ({ id: `input-${i}`, name: `input-${i}` })),
          outputs: Array.from({ length: 10 }, (e, i) => ({ id: `output-${i}`, name: `output-${i}` })),
        },
      },
    ),
  ];
  const initialEdges = [
    { id: 'e1-2', source: '1', target: '2' },
  ];

  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [selection, setSelection] = useState<Node | Edge | null>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);

  const onDragEnd = useCallback((evt: DragEndEvent) => {
    const {
      activatorEvent, over, active, delta,
    } = evt;
    if (over && getCanDrop({ active, overId: over.id }) && dropRef.current && reactFlowInstance) {
      const dropBounds = dropRef.current.getBoundingClientRect();
      const position = reactFlowInstance.project({
        x: (activatorEvent as PointerEvent).clientX + delta.x - dropBounds.left,
        y: (activatorEvent as PointerEvent).clientY + delta.y - dropBounds.top,
      });
      const data = get(active, 'data.current.dropData');
      if (data instanceof BasicNode) {
        data.position = position;
        setNodes((nds) => nds = nds.concat(data));
      }
    }
  }, []);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds: Node[]) => {
      changes.forEach((c) => {
        if (c.type === 'reset' && c.item.id === selection?.id) {
          setSelection(c.item);
        }
      });
      return applyNodeChanges(changes, nds);
    }),
    [setNodes, selection],
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds: Edge[]) => applyEdgeChanges(changes, eds)),
    [setEdges],
  );

  const onSelectionchange = useCallback(
    ({ nodes: _nodes, edges: _edges }: OnSelectionChangeParams) => {
      const arr = [..._nodes, ..._edges];
      if (arr.length === 1) setSelection(arr[0]);
      else setSelection(null);
    },
    [setSelection],
  );

  const getInspector = useCallback(() => {
    if (selection) {
      if (selection.type === FunctionBlockNode.type) {
        return <FunctionBlockInspector node={selection as FunctionBlockNode} />;
      }
    }
    return '';
  }, [selection]);

  // const onConnect = useCallback(
  //   (connection: Connection) => setEdges((eds) => {
  //     return addEdge(connection, eds)
  //   }),
  //   [setEdges]
  // );

  return (
    <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd} onDragMove={onDragMove}>
      <ReactFlowProvider>
        <div className="flex h-screen w-screen select-none flex-row flex-nowrap font-mono">
          <div className="flex h-full w-full grow flex-row flex-nowrap">
            <div className="h-full min-w-[160px] border-r">
              <div className="h-8 border-b">
                <Input className="h-full w-full border-none" placeholder="Search" />
              </div>
              <Drag
                id="drag-1"
                dropTo={[DropIdEnum.NETFLOW]}
                dropData={new FunctionBlockNode(
                  {
                    id: 'test',
                    type: 'FunctionBlock',
                    position: { x: 150, y: 150 },
                    data: {
                      name: '123',
                      inputEvents: Array.from({ length: 10 }, (e, i) => ({ id: `inputEvent-${i}`, name: `inputEvent-${i}` })),
                      outputEvents: Array.from({ length: 15 }, (e, i) => ({ id: `outputEvent-${i}`, name: `outputEvent-${i}` })),
                      inputs: Array.from({ length: 15 }, (e, i) => ({ id: `input-${i}`, name: `input-${i}` })),
                      outputs: Array.from({ length: 10 }, (e, i) => ({ id: `output-${i}`, name: `output-${i}` })),
                    },
                  },
                )}
              >
                <span>Drag1</span>
              </Drag>
              <Drag id="drag-2" dropTo={[DropIdEnum.TEST]} dropData={{}}>
                <span>Drag2</span>
              </Drag>
            </div>
            <div className="flex grow flex-col flex-nowrap">
              <Controls className="flex h-8 flex-row items-center border-b" />
              <Drop id={DropIdEnum.NETFLOW} className="grow" ref={dropRef}>
                <ReactFlow
                  nodeTypes={nodeTypes}
                  edgeTypes={edgeTypes}
                  nodes={nodes}
                  edges={edges}
                  onNodesChange={onNodesChange}
                  onEdgesChange={onEdgesChange}
                  onSelectionChange={onSelectionchange}
                  onInit={setReactFlowInstance}
                />
              </Drop>
            </div>
          </div>
          <ScrollArea className="h-full w-[240px] overflow-hidden border-l">
            <div className="absolute inset-x-0">
              <div className="flex h-8 flex-row items-center justify-center border-b">{selection?.type}</div>
              <div className="px-1">
                {getInspector()}
              </div>
            </div>
          </ScrollArea>
        </div>
      </ReactFlowProvider>
    </DndContext>
  );
}

export default App;
