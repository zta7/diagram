import * as React from 'react';
import cx from 'classnames';

export const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  (props, ref) => {
    const { className, children, ...rest } = props;
    return (
      <button
        type="button"
        ref={ref}
        className={cx(['btn btn-xs btn-square btn-ghost', className])}
        {...rest}
      >
        { children }
      </button>
    );
  },
);
