import { classed } from '@tw-classed/react';

export const Button = classed.button('px-1 py-1 hover:bg-base-200 active:bg-base-300 rounded-md', {
  // variants: {
  //   color: {
  //     primary: 'bg-primary',
  //   },
  // },
  // defaultVariants: {
  //   color: 'primary',
  // },
});

Button.displayName = 'Button';
