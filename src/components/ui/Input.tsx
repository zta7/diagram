import * as React from 'react';

export const Input = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(
  (props, ref) => {
    const {className} = props
    return (
      <input className='input input-bordered input-xs rounded-none'/>
    )
  }
)