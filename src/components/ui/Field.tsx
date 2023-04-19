import { classed, ComponentProps, deriveClassed } from '@tw-classed/react';
import { ReactNode } from 'react';

const FieldBase = classed.div('outline-none transition-colors flex items-center overflow-hidden', {
  variants: {
    size: {
      md: 'h-8 text-sm',
      sm: 'h-6 text-xs',
    },
    variant: {
      standard: 'border-b',
      outline: 'border px-1',
    },
    color: {
      primary: 'hover:border-primary focus-within:border-primary-focus',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'standard',
    color: 'primary',
  },
});

export type FieldProps = {
  append?: ReactNode;
  prepend?: ReactNode;
  label?: string
};

export type Props = ComponentProps<typeof FieldBase> & FieldProps

export const Field = deriveClassed<typeof FieldBase, Props>(
  ({
    children, append, prepend, label, ...rest
  }, ref) => (
    <div className="flex cursor-pointer flex-col">
      { label && <label className="mb-1">{label}</label>}
      <FieldBase {...rest} ref={ref}>
        {prepend && <span className="pr-[2px]">{prepend}</span>}
        <span className="grow">{children}</span>
        {append && <span className="pl-[2px]">{append}</span>}
      </FieldBase>
    </div>
  ),
);

Field.displayName = 'Field';
