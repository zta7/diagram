import { classed } from '@tw-classed/react';

export const Button = classed.button('cursor-pointer select-none flex outline-none', {
  variants: {
    square: {
      true: 'rounded-none',
      false: 'rounded',
    },
    color: {
      base: 'hover:bg-base-200 [&:active:not(:has(button:active))]:bg-base-300',
      deeper: 'hover:bg-base-300 [&:active:not(:has(button:active))]:bg-base-400',
    },
  },
  defaultVariants: {
    square: false,
    color: 'base',
  },
});

Button.displayName = 'Button';
