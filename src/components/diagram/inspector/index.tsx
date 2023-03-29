import { ReactFlowState, useStore } from 'reactflow';

const nodesAndEdgesSelector = (state: ReactFlowState) => ({
  nodes: Array.from(state.nodeInternals.values()),
  edges: state.edges,
});

export function Inspector() {
  const { nodes, edges } = useStore(nodesAndEdgesSelector);
  console.log(nodes, edges);

  return (
    <div>
      123
    </div>
  );
}
