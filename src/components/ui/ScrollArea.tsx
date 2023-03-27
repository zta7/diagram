import * as ScrollArea from '@radix-ui/react-scroll-area';
import * as React from 'react';

export default React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement & React.FC>>(
  (props, ref) => {
    const {children, className} = props    
    return (
      <ScrollArea.Root className={className}>
        <ScrollArea.Viewport className="rounded">
          {children}
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar
          className="flex touch-none select-none bg-gray-300 p-0.5 transition-colors duration-[160ms] ease-out hover:bg-gray-400 data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col"
          orientation="vertical">
          <ScrollArea.Thumb className="relative flex-1 rounded-[10px] bg-gray-700 before:absolute before:top-1/2 before:left-1/2 before:h-full before:min-h-[44px] before:w-full before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2 before:content-['']" />
        </ScrollArea.Scrollbar>
        <ScrollArea.Scrollbar
          className="flex touch-none select-none bg-gray-300 p-0.5 transition-colors duration-[160ms] ease-out hover:bg-gray-400 data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col"
          orientation="horizontal">
          <ScrollArea.Thumb className="relative flex-1 rounded-[10px] bg-gray-700 before:absolute before:top-1/2 before:left-1/2 before:h-full before:min-h-[44px] before:w-full before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2 before:content-['']" />
        </ScrollArea.Scrollbar>
        <ScrollArea.Corner className="bg-gray-600" />
    </ScrollArea.Root>
    )
  }
)