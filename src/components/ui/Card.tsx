import { classed } from '@tw-classed/react';

export const Card = classed.div('bg-base-100 shadow shadow-base-500/40', {
  variants: {
    square: {
      true: 'rounded-none',
      false: 'rounded',
    },
  },
  defaultVariants: {
    square: false,
  },
});

Card.displayName = 'Card';
