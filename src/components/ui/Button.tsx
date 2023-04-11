import { classed } from '@tw-classed/react';

export const Button = classed.button('hover:bg-base-200 active:bg-base-300 cursor-pointer select-none', {
  variants: {
    square: {
      true: 'rounded-none',
      false: 'rounded-md',
    },
    icon: {
      true: 'px-1 py-1',
      false: 'px-2 py-1',
    },
  },
  defaultVariants: {
    square: false,
    icon: false,
  },
});

Button.displayName = 'Button';
