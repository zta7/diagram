import React from 'react';
import { useListItem } from '@floating-ui/react';
import { Item } from '../Item';

export const Option = React.forwardRef<HTMLElement, React.HTMLProps<HTMLElement>>(
  ({ children }, forwardRef) => {
    const { ref, index } = useListItem();
    return (
      <Item ref={ref} role="option">
        {children}
      </Item>
    );
  },
);
