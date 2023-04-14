import { classed } from '@tw-classed/react';

export const Button = classed.button('cursor-pointer select-none', {
  variants: {
    square: {
      true: 'rounded-none',
      false: 'rounded',
    },
    icon: {
      md: 'px-[2px] py-[2px]',
      lg: 'px-[3px] py-[3px]',
      // true: 'w-full h-full',
      false: 'px-2 py-1 flex items-center flex-nowrap',
    },
    color: {
      base: 'hover:bg-base-200 [&:active:not(:has(button:active))]:bg-base-300',
      deeper: 'hover:bg-base-300 [&:active:not(:has(button:active))]:bg-base-400',
    },
  },
  defaultVariants: {
    square: false,
    icon: false,
    color: 'base',
  },
});

Button.displayName = 'Button';
