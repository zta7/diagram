import { inspectorTypes } from 'components/NetDigram/store';
import {
  useMemo,
  useState,
} from 'react';
import {
  Node,
  OnSelectionChangeParams, useOnSelectionChange,
} from 'reactflow';

export function Inspector() {
  const [select, setSelect] = useState<Node | null>(null);
  useOnSelectionChange({
    onChange({ nodes }: OnSelectionChangeParams) {
      if (nodes.length === 1) setSelect(nodes[0]);
      else setSelect(null);
    },
  });

  const NodeComponent = useMemo(() => {
    if (select && select.type && inspectorTypes[select.type]) return inspectorTypes[select.type];
    return undefined;
  }, [select]);
  return (
    <div>
      { NodeComponent && <NodeComponent node={select} setNode={(node: Node) => setSelect(node)} /> }
    </div>
  );
}
