import { useDraggable, DragOverlay } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { useCallback } from 'react'

interface Prop {
  id: string
}

export const Drag = ({id}: Prop) => {
  const {attributes, listeners, setNodeRef, setActivatorNodeRef, transform, isDragging, over} = useDraggable({
    id,
    data: {
      supports: ['type1', 'type2']
    }
  })  
  
  return (
    <div className='relative'>
      <div ref={setNodeRef}>
        {/* ... */}
        <button ref={setActivatorNodeRef} {...listeners} {...attributes}>Drag handle</button>
      </div>
      {
        isDragging && <DragOverlay>
          Drag handle
        </DragOverlay>
      }
    </div>
  );
}