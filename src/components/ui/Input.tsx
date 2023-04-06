import { InputHTMLAttributes, forwardRef } from 'react';

export type InputProps = InputHTMLAttributes<HTMLInputElement>

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => (
    <input {...props} ref={ref} />
  ),
);
Input.displayName = 'Input';
