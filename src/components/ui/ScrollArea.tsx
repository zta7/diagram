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
          className="flex select-none touch-none p-0.5 bg-gray-300 transition-colors duration-[160ms] ease-out hover:bg-gray-400 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
          orientation="vertical">
          <ScrollArea.Thumb className="flex-1 bg-gray-700 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
        </ScrollArea.Scrollbar>
        <ScrollArea.Scrollbar
          className="flex select-none touch-none p-0.5 bg-gray-300 transition-colors duration-[160ms] ease-out hover:bg-gray-400 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
          orientation="horizontal">
          <ScrollArea.Thumb className="flex-1 bg-gray-700 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
        </ScrollArea.Scrollbar>
        <ScrollArea.Corner className="bg-gray-600" />
    </ScrollArea.Root>
    )
  }
)