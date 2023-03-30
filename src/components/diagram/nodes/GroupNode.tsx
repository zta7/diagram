import { BasicNode, BasicNodeProp } from 'components/diagram/nodes/BasicNode';
import {
  useReactFlow, getRectOfNodes, ReactFlowState, useStore, Rect, useStoreApi,
} from 'reactflow';
import { useMemo, useEffect, useState } from 'react';
import cx from 'classnames';
import { isEqual } from 'lodash';

export const GroupType = 'Group';

export class GroupNode extends BasicNode {
  constructor(props: BasicNodeProp) {
    super({ ...props, type: GroupType });
  }
}

// const extentSelector = (state: ReactFlowState) => Array.from(state.nodeInternals.values())
//   .filter((node) => node.extent === 'parent');

export function GroupTemplate({ id, selected }: any) {
  const store = useStoreApi();
  const { triggerNodeChanges, nodeInternals } = store.getState();
  const extentNodes = useStore((state: ReactFlowState) => Array.from(state.nodeInternals.values())
    .filter((node) => node.extent === 'parent' && node.parentNode === id));
  const [rect, setRect] = useState<Rect>();

  useEffect(() => {
    const r = getRectOfNodes(extentNodes);
    if (!isEqual(rect, r)) setRect(r);
  }, [extentNodes]);

  useEffect(() => {
    const node = store.getState().nodeInternals.get(id);
    if (node && rect) {
      // node.position = { x: rect.x, y: rect.y };
      triggerNodeChanges([{ id: node.id, type: 'position', position: { x: rect.x, y: rect.y } }]);
    }
  }, [rect, id]);

  return (
    <div
      style={{
        width: rect?.width || 400, height: rect?.height || 400,
      }}
      className="border"
      // className={`border ${selectedClassName}`}
    >
      {/* 123 */}
    </div>
  );
}
