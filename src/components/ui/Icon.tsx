import * as React from 'react';
import cx from 'classnames'

export const Icon = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(
  (props, ref) => {
    const { className, ...rest } = props
    return (
    <div
      className={cx(['btn-ghost btn-square btn-xs btn no-animation', className])} 
      { ...rest }
    />
    )
  }
)