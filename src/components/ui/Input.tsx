import * as React from 'react';
import cx from 'classnames'


export const Input = React.forwardRef<HTMLInputElement, React.HTMLProps<HTMLInputElement>>(
  (props, ref) => {
    const { className, ...rest } = props
    return (
    <input
      className={cx(['input input-bordered input-xs rounded-none', className])} 
      { ...rest }
    />
    )
  }
)