import * as React from 'react';

export const Select = React.forwardRef<HTMLSelectElement, React.HTMLProps<HTMLSelectElement>>(
  (props, ref) => {
    const {className} = props
    return (
      <select className='select-bordered select select-xs rounded-none focus:outline-offset-0'/>
    )
  }
)