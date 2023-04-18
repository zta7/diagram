import { classed } from '@tw-classed/react';

export const Card = classed.div('bg-base-100 shadow', {
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
