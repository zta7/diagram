import {
  useOnSelectionChange, Node, Edge, OnSelectionChangeParams,
} from 'reactflow';
import { useState } from 'react';
import ScrollArea from 'components/ui/ScrollArea';

export function Inspector({ className }: {className: string}) {
  const [selection, setSelection] = useState<Node | Edge | null>(null);

  useOnSelectionChange({
    onChange: (({ nodes, edges }: OnSelectionChangeParams) => {
      const arr = [...nodes, ...edges];
      if (arr.length === 1) setSelection(arr[0]);
      else setSelection(null);
    }),
  });

  return (
    <ScrollArea className={className}>
      <div className="absolute inset-x-0">
        <div className="flex h-8 items-center justify-center border-b">Ins</div>
        <div className="px-1">
          ~~~
        </div>
      </div>
    </ScrollArea>
  );
}
