import * as Separator from '@radix-ui/react-separator';
import * as React from 'react';

export default React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(
  (props, ref) => {
    const {className} = props
    return (
      <Separator.Root
        className="bg-red-500 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px my-[15px]" />
    )
  }
)