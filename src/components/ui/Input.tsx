import { Field, FieldProps } from 'components/ui/Field';
import { InputHTMLAttributes, forwardRef } from 'react';

export type InputProps = InputHTMLAttributes<HTMLInputElement> & FieldProps

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ append, prepend, ...rest }, ref) => (
    <Field append={append} prepend={prepend}>
      <input {...rest} ref={ref} />
    </Field>
  ),
);
Input.displayName = 'Input';
