import { useDroppable } from '@dnd-kit/core';
import cx from 'classnames';
import { getCanDrop } from 'components/diagram/helper';
import { get } from 'lodash';
import React, { useMemo } from 'react';
import { mergeRefs } from 'react-merge-refs';

interface Prop {
  id: DropIdEnum,
  children: React.ReactElement,
  className?: string
  asChild?: boolean
}

export enum DropIdEnum {
  'NETFLOW' = 'NETFLOW',
  'TEST' = 'TEST'
}

export const Drop = React.forwardRef<HTMLDivElement, Prop>(
  ({
    id, children, className,
  }, propRef) => {
    const { setNodeRef, active, isOver } = useDroppable({
      id,
    });

    const canDrop = useMemo(() => getCanDrop({ active, overId: id }), [id, active]);

    const _className = useMemo(() => {
      const arr = [className];
      if (canDrop) {
        if (isOver) arr.push('outline outline-primary -outline-offset-1');
        else arr.push('outline outline-secondary -outline-offset-1');
      }
      // asChild && arr.push(children.props.className);
      return cx(arr);
    }, [canDrop, isOver, className]);

    // const childrenRef = (children as any).ref;
    // const ref = useMemo(() => mergeRefs([setNodeRef, childrenRef, propRef]), [setNodeRef, childrenRef, propRef]);
    // if (asChild) {
    //   return React.cloneElement(
    //     children,
    //     { ref, ...children.props, className: _className },
    //   );
    // }
    const ref = mergeRefs([propRef, setNodeRef]);

    return (
      <div className={_className} ref={ref}>
        {children}
      </div>
    );
  },
);
