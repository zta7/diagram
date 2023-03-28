import { useDraggable, DragOverlay } from '@dnd-kit/core';
import { FunctionBlock, FunctionBlockNode } from 'components/diagram/nodes/FunctionBlock';
import { DropIdEnum } from 'components/ui/Drop';
import { ReactElement } from 'react';

export interface DragData {
  dropTo: Array<DropIdEnum>
  dropData?: Record<string, any>
}

interface Prop {
  id: string
  children: ReactElement
  dropTo: Array<DropIdEnum>
  dropData: Record<string, any>
}

export function Drag({
  id, dropTo, children, dropData,
}: Prop) {
  const {
    attributes, listeners, setNodeRef, isDragging,
  } = useDraggable({
    id,
    data: {
      dropTo,
      dropData,
    },
  });

  const fb = new FunctionBlockNode(
    {
      id: '4',
      position: { x: 150, y: 150 },
      data: {
        name: '123',
        inputEvents: Array.from({ length: 10 }, (e, i) => ({ id: `inputEvent-${i}`, name: `inputEvent-${i}` })),
        outputEvents: Array.from({ length: 15 }, (e, i) => ({ id: `outputEvent-${i}`, name: `outputEvent-${i}` })),
        inputs: Array.from({ length: 15 }, (e, i) => ({ id: `input-${i}`, name: `input-${i}` })),
        outputs: Array.from({ length: 10 }, (e, i) => ({ id: `output-${i}`, name: `output-${i}` })),
        resource: 'fffff',
      },
    },
  );

  return (
    <div ref={setNodeRef} {...listeners} {...attributes}>
      { children }
      {
        isDragging && (
        <DragOverlay>
          Dragging ...
          {/* <FunctionBlock {...fb} /> */}
        </DragOverlay>
        )
      }
    </div>
  );
}
