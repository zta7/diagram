import * as React from 'react';
import cx from 'classnames';

export const Item = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  (props, ref) => {
    const { className, children, ...rest } = props;
    return (
      <div
        ref={ref}
        className={cx(['h-8 w-full', className])}
        {...rest}
      >
        { children }
      </div>
    );
  },
);
