import { BasicNode, BasicNodeProp } from 'components/diagram/nodes/BasicNode';
import {
  useReactFlow, getRectOfNodes, ReactFlowState, useStore, Rect,
} from 'reactflow';
import { useMemo, useEffect, useState } from 'react';
import cx from 'classnames';

export const GroupType = 'Group';

export class GroupNode extends BasicNode {
  constructor(props: BasicNodeProp) {
    super({ ...props, type: GroupType });
  }
}

const extentSelector = (state: ReactFlowState) => Array.from(state.nodeInternals.values())
  .filter((node) => node.extent === 'parent');

export function GroupTemplate({ id, selected }: any) {
  const extentNodes = useStore(extentSelector);
  const selfExtentNodes = useMemo(() => extentNodes.filter((n) => n.parentNode === id), [id, extentNodes]);
  const [rect, setRect] = useState<Rect>();
  // const {
  //   width, height, x, y,
  // } = useMemo(() => getRectOfNodes(selfExtentNodes), [selfExtentNodes]);
  const selectedClassName = cx([selected ? 'border-primary' : 'border-black']);

  useEffect(() => {
    console.log(1);
    const rect = getRectOfNodes(selfExtentNodes);
    setRect(rect);

    // instance.setNodes((nds) => nds.map((n) => {
    //   if (n.id === id) {
    //     return {
    //       ...n,
    //       position: { x: rect.x, y: rect.y },
    //     };
    //   }
    //   return n;
    // }));
  }, [selfExtentNodes]);

  return (
    <div
      style={{
        width: rect?.width, height: rect?.height,
      }}
      className={`border ${selectedClassName}`}
    >
      {/* 123 */}
    </div>
  );
}
