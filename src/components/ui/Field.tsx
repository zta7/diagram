import { classed, ComponentProps, deriveClassed } from '@tw-classed/react';
import { ReactNode } from 'react';

const FieldBase = classed.div('w-full outline-none transition-colors flex items-center', {
  variants: {
    size: {
      default: 'h-8',
    },
    variant: {
      standard: 'border-b',
    },
    color: {
      primary: 'hover:border-primary focus-within:border-primary-focus',
    },
  },
  defaultVariants: {
    size: 'default',
    variant: 'standard',
    color: 'primary',
  },
});

export type FieldProps = {
  append?: ReactNode;
  prepend?: ReactNode
};

export type Props = ComponentProps<typeof FieldBase> & FieldProps

export const Field = deriveClassed<typeof FieldBase, Props>(
  ({
    children, append, prepend, ...rest
  }, ref) => (
    <FieldBase {...rest} ref={ref}>
      {prepend && <span className="mr-[1px]">{prepend}</span>}
      <span className="grow">{children}</span>
      {append && <span className="ml-[1px]">{append}</span>}
    </FieldBase>
  ),
);

Field.displayName = 'Field';
