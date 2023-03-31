import { Drop, DropIdEnum } from 'components/ui/Drop';
import ReactFlow, { useStoreApi } from 'reactflow';
import { useRef } from 'react';
import { useStore } from 'components/NetDigram/store';
import { shallow } from 'zustand/shallow';

export function Canvas({ className }: {className: string}) {
  const dropRef = useRef<HTMLDivElement | null>(null);
  const storeApi = useStoreApi();
  const {
    nodes, edges, onNodesChange, onEdgesChange, nodeTypes, edgeTypes, onInit, onConnect,
  } = useStore((state) => ({
    nodeTypes: state.nodeTypes,
    edgeTypes: state.edgeTypes,
    nodes: state.nodes,
    edges: state.edges,
    onNodesChange: state.onNodesChange,
    onEdgesChange: state.onEdgesChange,
    onConnect: state.onConnect,
    onInit: state.onInit,
  }), shallow);

  return (
    <Drop id={DropIdEnum.NETFLOW} className={className} ref={dropRef}>
      <ReactFlow
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onInit={(instance) => onInit(instance, dropRef, storeApi)}
        onConnect={onConnect}
      />
    </Drop>
  );
}
