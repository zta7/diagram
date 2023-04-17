import { classed, ComponentProps, deriveClassed } from '@tw-classed/react';
import { ReactNode } from 'react';

const IconBase = classed.div('', {
  variants: {
    size: {
      md: 'w-3 h-3',
      lg: 'w-4 h-4',
      xl: 'w-5 h-5',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export type IconProps = {
  children: ReactNode
};

export type Props = ComponentProps<typeof IconBase> & IconProps

export const Icon = deriveClassed<typeof IconBase, Props>(
  ({
    children, ...rest
  }, ref) => (
    <IconBase ref={ref} {...rest}>
      { children }
    </IconBase>
  ),
);

Icon.displayName = 'Icon';
