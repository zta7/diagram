import { EventEdge } from 'components/diagram/edges/EventEdge';
import {
  FunctionBlockTemplate, FunctionBlockInspector, FunctionBlockNode, FunctionBlockType, FunctionBlockDragOverlay,
} from 'components/diagram/nodes/FunctionBlock';
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
import { get } from 'lodash';
import { BasicNode } from 'components/diagram/nodes/BasicNode';
import { SelectionToolbar } from 'components/diagram/toobar/SelectionToolbar';
import { InputNode, InputTemplate, InputType } from 'components/diagram/nodes/InputNode';
import {
  AccordionContent, AccordionItem, AccordionRoot, AccordionTrigger,
} from 'components/ui/According';
import { Item } from 'components/ui/Item';
import { MdGifBox, MdInput } from 'react-icons/md';
import { Inspector } from 'components/diagram/inspector';

const nodeTypes = {
  Text,
  [InputType]: InputTemplate,
  [FunctionBlockType]: FunctionBlockTemplate,
};

const edgeTypes = {
  EventEdge,
};

function App() {
  const dropRef = useRef<HTMLDivElement | null>(null);
  const initialNodes = [
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
  const initialEdges: Array<Edge> = [];

  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [selection, setSelection] = useState<Array<Node |Edge>>([]);
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
      // console.log(data);
      if (data instanceof BasicNode) {
        data.position = position;
        setNodes((nds) => nds.concat(data));
      }
    }
  }, [reactFlowInstance]);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds: Node[]) => applyNodeChanges(changes, nds)),
    [setNodes],
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds: Edge[]) => applyEdgeChanges(changes, eds)),
    [setEdges],
  );

  const onSelectionchange = useCallback(
    ({ nodes: _nodes, edges: _edges }: OnSelectionChangeParams) => {
      // const arr = [..._nodes, ..._edges];
      // if (arr.length === 1) setSelection(arr[0]);
      // else setSelection(null);
    },
    [setSelection],
  );

  // const getInspector = useCallback(() => {
  //   if (selection) {
  //     if (selection.type === FunctionBlockType) {
  //       return <FunctionBlockInspector node={selection as FunctionBlockNode} />;
  //     }
  //   }
  //   return '';
  // }, [selection]);

  // const onConnect = useCallback(
  //   (connection: Connection) => setEdges((eds) => {
  //     return addEdge(connection, eds)
  //   }),
  //   [setEdges]
  // );

  return (
    <div className="text-xs">
      <DndContext onDragEnd={onDragEnd}>
        <ReactFlowProvider>
          <div className="flex h-screen w-screen select-none flex-nowrap">
            <div className="flex h-full w-full grow flex-nowrap">
              <div className="h-full w-[240px] border-r">
                <div className="h-8 border-b">
                  <Input className="h-full w-full border-none" placeholder="Search" />
                </div>
                <AccordionRoot>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>用户输入控件</AccordionTrigger>
                    <AccordionContent>
                      <Drag
                        id="drag-1"
                        dropTo={[DropIdEnum.NETFLOW]}
                        dragOverlay={<FunctionBlockDragOverlay />}
                        dropData={new FunctionBlockNode(
                          {
                            id: `${Math.random()}`,
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
                        <Item className="flex items-center">
                          <MdGifBox className="mr-2" />
                          <div>FunctionBlock</div>
                        </Item>
                      </Drag>
                      <Drag
                        id="drag-2"
                        dropTo={[DropIdEnum.NETFLOW]}
                        dropData={new InputNode({
                          id: `${Math.random()}`,
                          type: 'Input',
                          position: { x: 150, y: 150 },
                          data: { value: '123' },
                        })}
                      >
                        <Item className="flex items-center">
                          <MdInput className="mr-2" />
                          <div>Input</div>
                        </Item>
                      </Drag>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger>显示控件</AccordionTrigger>
                    <AccordionContent>
                      Yes. It's unstyled by default, giving you freedom over the look and feel.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger>画布控件</AccordionTrigger>
                    <AccordionContent>
                      Yes! You can animate the Accordion with CSS or JavaScript.
                    </AccordionContent>
                  </AccordionItem>
                </AccordionRoot>

              </div>
              <div className="flex grow flex-col flex-nowrap">
                <Controls className="flex h-8 items-center border-b px-1" />
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
                  >
                    <SelectionToolbar />
                  </ReactFlow>
                </Drop>
              </div>
            </div>
            <ScrollArea className="h-full w-[240px] overflow-hidden border-l">
              <div className="absolute inset-x-0">
                <div className="flex h-8 items-center justify-center border-b">{selection?.type}</div>
                <div className="px-1">
                  <Inspector />
                </div>
              </div>
            </ScrollArea>
          </div>
        </ReactFlowProvider>
      </DndContext>
    </div>
  );
}

export default App;
