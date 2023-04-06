import { InputHTMLAttributes, forwardRef } from 'react';
import cx from 'classnames';

export type InputProps = InputHTMLAttributes<HTMLInputElement>

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...rest }, ref) => (
    <input className={cx(['', className])} {...rest} ref={ref} />
  ),
);
Input.displayName = 'Input';
