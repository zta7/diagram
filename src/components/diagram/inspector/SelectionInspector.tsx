import {
  useOnSelectionChange, Node, Edge, OnSelectionChangeParams,
} from 'reactflow';
import { useState } from 'react';

export function SelectionInspector() {
  const [selection, setSelection] = useState<Node | Edge | null>(null);

  useOnSelectionChange({
    onChange: (({ nodes, edges }: OnSelectionChangeParams) => {
      const arr = [...nodes, ...edges];
      if (arr.length === 1) setSelection(arr[0]);
      else setSelection(null);
    }),
  });

  return (
    <div>
      ~~~
    </div>
  );
}
