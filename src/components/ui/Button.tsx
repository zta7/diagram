import { classed } from '@tw-classed/react';

export const Button = classed.button('px-1 py-1 hover:bg-base-200 [&:active:not(:has(:active))]:bg-base-300 rounded-md', {
  variants: {
    square: {
      true: 'rounded-none',
      false: 'rounded-md',
    },
  },
  defaultVariants: {
    square: false,
  },
});

Button.displayName = 'Button';
