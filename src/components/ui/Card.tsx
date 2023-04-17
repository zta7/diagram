import { classed } from '@tw-classed/react';

export const Card = classed.div('bg-base-100 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]', {
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
