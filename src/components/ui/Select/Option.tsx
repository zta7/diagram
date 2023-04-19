import React from 'react';
import { useListItem } from '@floating-ui/react';
import { useSelectContext } from 'components/ui/Select/Select';
import { Item } from 'components/ui/Item';

export const Option = React.forwardRef<HTMLElement, React.HTMLProps<HTMLElement> & { value: string | number }>(
  ({ children }, forwardRef) => {
    const { ref, index } = useListItem();
    const { activeIndex, value, getItemProps } = useSelectContext();
    const isActive = activeIndex === index;
    return (
      <Item
        ref={ref}
        role="option"
        tabIndex={isActive ? 0 : -1}
        active={isActive}
        // aria-selected={isSelected}
        {...getItemProps()}
      >
        {children}
      </Item>
    );
  },
);
