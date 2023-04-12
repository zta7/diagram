import { classed } from '@tw-classed/react';

export const Button = classed.button('hover:bg-base-200 [&:active:not(:has(button:active))]:bg-base-300 cursor-pointer select-none', {
  variants: {
    square: {
      true: 'rounded-none',
      false: 'rounded',
    },
    icon: {
      true: ' text-base-800',
      false: 'px-2 py-1 flex items-center flex-nowrap gap-2',
    },
  },
  defaultVariants: {
    square: false,
    icon: false,
  },
});

Button.displayName = 'Button';
