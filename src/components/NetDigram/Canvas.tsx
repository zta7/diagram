import ReactFlow, {
  applyEdgeChanges, applyNodeChanges, Edge, NodeChange, useReactFlow, useStoreApi, Node, EdgeChange, addEdge, Connection,
} from 'reactflow';
import {
  useCallback, useRef, useState, useEffect,
} from 'react';
import { edgeTypes, nodeTypes } from 'components/NetDigram/store';
import { DragEndEvent, useDndMonitor } from '@dnd-kit/core';
import { getCanDrop, getDragData } from 'components/diagram/helper';

export function Canvas() {
  const [nodes, setNodes] = useState<Array<Node>>([]);
  const [edges, setEdges] = useState<Array<Edge>>([]);

  const onNodesChange = useCallback(
    (changes: Array<NodeChange>) => setNodes((nds: Array<Node>) => applyNodeChanges(changes, nds)),
    [setNodes],
  );
  const onEdgesChange = useCallback(
    (changes: Array<EdgeChange>) => setEdges((eds: Array<Edge>) => applyEdgeChanges(changes, eds)),
    [setEdges],
  );

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const dropRef = useRef<HTMLDivElement | null>(null);
  const { project } = useReactFlow();
  const { triggerNodeChanges } = useStoreApi().getState();

  useDndMonitor({
    onDragEnd(evt:DragEndEvent) {
      const {
        activatorEvent, over, active, delta,
      } = evt;
      if (over && getCanDrop({ active, overId: over.id }) && dropRef.current) {
        const dropBounds = dropRef.current.getBoundingClientRect();
        const position = project({
          x: (activatorEvent as PointerEvent).clientX + delta.x - dropBounds.left,
          y: (activatorEvent as PointerEvent).clientY + delta.y - dropBounds.top,
        });
        const data = getDragData(active);
        // Todo 类型检查
        if (data) {
          triggerNodeChanges([{
            item: { ...data, id: `${Math.random()}`, position },
            type: 'add',
          }]);
        }
      }
    },
  });

  return (
    <ReactFlow
      ref={dropRef}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
    />
  );
}
