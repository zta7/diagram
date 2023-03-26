import { EdgeProps, getBezierPath } from 'reactflow';
import cx from 'classnames'

export const type = 'EventEdge'

export const EventEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  selected,
}: EdgeProps) => {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const pathClassName = cx([
    'react-flow__edge-path stroke-[6px] hover:!stroke-green-500',
    selected ? '!stroke-green-500' : '!stroke-green-600'
  ])

  return (
    <g>
      <path
        id={id}
        className={pathClassName}
        d={edgePath}
      />
      {/* <text>
        <textPath href={`#${id}`} style={{ fontSize: 12 }} startOffset="10%" textAnchor="middle">
          x
        </textPath>
      </text> */}
    </g>
  );
}
