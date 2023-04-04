import {
  applyEdgeChanges,
  Edge, EdgeProps, getBezierPath, useStoreApi,
} from 'reactflow';
import cx from 'classnames';

export const EventEdgeType = 'EventEdge';

export function EventEdgeTemplate({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  selected,
}: EdgeProps) {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const pathCx = cx([
    'react-flow__edge-path stroke-[6px] group-hover:!stroke-green-500',
    selected ? '!stroke-green-500' : '!stroke-green-600',
  ]);

  // const { setEdges } = useStoreApi().getState();

  // const onDelete = () => {
  //   // (eds: Array<Edge>) => applyEdgeChanges([], eds)
  //   // setEdges([]);
  // // setEdges((eds: Array<Edge>) => eds.map((e: Edge) => {
  //   //   if (e.id === id) return { e.id, type: 'remove' };
  //   //   return e;
  //   // }));
  // };

  return (
    <g className="group">
      <path
        id={id}
        className={pathCx}
        d={edgePath}
      />
      <text>
        <textPath className="hidden group-hover:block" href={`#${id}`} style={{ fontSize: 10, stroke: 'red' }} startOffset="50%" textAnchor="middle">
          X
        </textPath>
      </text>
    </g>
  );
}
