import * as React from 'react';
import cx from 'classnames';
import * as Accordion from '@radix-ui/react-accordion';
import { MdOutlineChevronLeft } from 'react-icons/md';
import { Button } from './Button';

export const AccordionItem = React.forwardRef(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Item
    className={cx(
      '',
      className,
    )}
    {...props}
    ref={forwardedRef}
  >
    {children}
  </Accordion.Item>
));

export const AccordionTrigger = React.forwardRef(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Header className="flex" asChild>
    <Accordion.Trigger
      className={cx(
        'group flex flex-nowrap items-center justify-between px-2 py-1 w-full hover:bg-base-200 cursor-pointer h-8',
        className,
      )}
      {...props}
      ref={forwardedRef}
    >
      {children}
      <MdOutlineChevronLeft aria-hidden className="transition-transform duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-data-[state=open]:rotate-180" />
    </Accordion.Trigger>
  </Accordion.Header>
));

export const AccordionContent = React.forwardRef(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Content
    className={cx(
      'data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden px-2 py-1',
      className,
    )}
    {...props}
    ref={forwardedRef}
  >
    {children}
  </Accordion.Content>
));

export const AccordionRoot = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  (props, ref) => {
    const { className, children } = props;
    return (
      <Accordion.Root
        ref={ref}
        className="w-full"
        type="single"
        collapsible
      >
        {children}
      </Accordion.Root>
    );
  },
);
