import * as React from 'react';

export const Select = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(
  (props, ref) => {
    const {className} = props
    return (
      <select className='select select-bordered select-xs rounded-none'/>
    )
  }
)