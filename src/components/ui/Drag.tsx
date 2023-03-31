import { useDraggable, DragOverlay } from '@dnd-kit/core';
import { DropIdEnum } from 'components/ui/Drop';
import {
  useCallback, cloneElement, ReactNode, ReactElement,
} from 'react';
import cx from 'classnames';

// export interface DragData {
//   dropTo: Array<DropIdEnum>
//   dropData?: Record<string, any>
// }

export type DragProp = {
  id: string
  children: ReactElement
  dropTo: Array<DropIdEnum>
  dropData: Record<string, any>
  dragOverlay?: ReactNode,
  className?: string
}

export function Drag({
  id, dropTo, children, dropData, dragOverlay, className,
}: DragProp) {
  const {
    attributes, listeners, setNodeRef, isDragging,
  } = useDraggable({
    id,
    data: {
      dropTo,
      dropData,
    },
  });

  const Overlay = useCallback(() => {
    if (!isDragging) return '';
    if (dragOverlay) {
      return (
        <DragOverlay>
          {dragOverlay}
        </DragOverlay>
      );
    }
    return (
      <DragOverlay>
        {cloneElement(children, children.props)}
      </DragOverlay>
    );
  }, [isDragging, dragOverlay, children]);

  return (
    <div ref={setNodeRef} {...listeners} {...attributes} className={cx(className)}>
      { children }
      {
        Overlay()
      }
    </div>
  );
}
