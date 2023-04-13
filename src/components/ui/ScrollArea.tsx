import * as ScrollArea from '@radix-ui/react-scroll-area';
import * as React from 'react';
import cx from 'classnames';

export default React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement & React.FC>>(
  (props, ref) => {
    const { children, className } = props;

    return (
      <div
        ref={ref}
        className={cx(
          'scrollbar-thin scrollbar-thumb-base-800 scrollbar-track-base-400 scrollbar-corner-base-600 overflow-auto',
          className,
        )}
      >
        {children}
      </div>
      // <ScrollArea.Root className={className} type="always" ref={ref}>
      //   <ScrollArea.Viewport className="absolute inset-0 pb-3 pr-2">
      //     {children}
      //   </ScrollArea.Viewport>
      //   <ScrollArea.Scrollbar
      //     className="bg-base-300 hover:bg-base-400 flex touch-none select-none p-0.5 transition-colors duration-[160ms] ease-out data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col"
      //     orientation="vertical"
      //   >
      //     <ScrollArea.Thumb className="bg-base-700 relative flex-1 rounded-[10px] before:absolute before:left-1/2 before:top-1/2 before:h-full before:min-h-[44px] before:w-full before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2 before:content-['']" />
      //   </ScrollArea.Scrollbar>
      //   <ScrollArea.Scrollbar
      //     className="bg-base-300 hover:bg-base-400 flex touch-none select-none p-0.5 transition-colors duration-[160ms] ease-out data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col"
      //     orientation="horizontal"
      //   >
      //     <ScrollArea.Thumb className="bg-base-700 relative flex-1 rounded-[10px] before:absolute before:left-1/2 before:top-1/2 before:h-full before:min-h-[44px] before:w-full before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2 before:content-['']" />
      //   </ScrollArea.Scrollbar>
      //   <ScrollArea.Corner className="bg-base-600" />
      // </ScrollArea.Root>
    );
  },
);
