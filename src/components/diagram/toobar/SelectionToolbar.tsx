import {
  NodeToolbar, ReactFlowState, useStore, getRectOfNodes, useReactFlow, Node,
} from 'reactflow';
import { SyntheticEvent } from 'react';
import { MdDeleteOutline, MdOutlineAddBox } from 'react-icons/md';
import { Button } from 'components/ui/Button';

const selectedNodesSelector = (state: ReactFlowState) => Array.from(state.nodeInternals.values())
  .filter((node) => node.selected);
const zoomSelector = (state: ReactFlowState) => state.transform[2];

function BaseToolbarHandles() {
  const selectedNode = useStore(selectedNodesSelector);
  const instance = useReactFlow();
  const selectedNodeIds = selectedNode.map((e) => e.id);
  const onDelete = (evt: SyntheticEvent) => {
    evt.stopPropagation();
    instance.setNodes((nds) => nds.filter((n) => !selectedNodeIds.includes(n.id)));
  };

  const onClone = (evt: SyntheticEvent) => {
    evt.stopPropagation();
    const newNodes: Array<Node> = [];
    selectedNode.forEach((e) => newNodes.push({
      id: `${Math.random()}`,
      position: { x: e.position.x + 15, y: e.position.y + 15 },
      type: e.type,
      data: { ...e.data },
    } as Node));
    instance.setNodes((nds) => nds.concat(newNodes));
  };

  return (
    <>
      <Button>
        <MdDeleteOutline onClick={onDelete} />
      </Button>
      <Button>
        <MdOutlineAddBox onClick={onClone} />
      </Button>
    </>
  );
}

export function SelectionToolbar() {
  const selectedNode = useStore(selectedNodesSelector);
  const zoom = useStore(zoomSelector);

  const isVisible = selectedNode.length > 0;
  const isMutiple = selectedNode.length > 1;
  const { width } = getRectOfNodes(selectedNode);

  return (
    <NodeToolbar
      nodeId={selectedNode.map((e) => e.id)}
      isVisible={isVisible}
      offset={0}
      className="flex justify-between outline-dotted outline-2 outline-offset-0 outline-primary"
      style={{ minWidth: (width || 0) * zoom }}
    >
      {
        isMutiple
          ? <BaseToolbarHandles />
          : <BaseToolbarHandles />
      }
    </NodeToolbar>
  );
}
