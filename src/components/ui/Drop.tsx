import { useDroppable } from "@dnd-kit/core";
import cx from 'classnames'
interface Prop {
  id: string,
  children: React.ReactElement,
  className?: string
}

export const Drop = ({id, children, className}: Prop) => {
  // const context = useDndContext()
  const {setNodeRef, active} = useDroppable({
    id,
    data: {
      type: 'drag-1',
    },
  });

  const _className = cx([
    className, 
    active && 'outline outline-primary -outline-offset-2'
  ])
  return (
    <div className={_className} ref={setNodeRef}>
      {children}
    </div>
  )
}