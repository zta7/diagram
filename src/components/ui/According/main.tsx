import * as AccordionPrimitive from '@radix-ui/react-accordion';
import React from 'react';
import cx from 'classnames';
import './main.css';

export const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ children, className, ...props }, forwardedRef) => (
  <AccordionPrimitive.Item
    className={cx(
      '',
      className,
    )}
    {...props}
    ref={forwardedRef}
  >
    {children}
  </AccordionPrimitive.Item>
));

export const AccordingHeader = React.forwardRef<
React.ElementRef<typeof AccordionPrimitive.Header>,
React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Header>
>(({ children, className, ...props }, forwardedRef) => (
  <AccordionPrimitive.Header
    className={className}
    {...props}
    ref={forwardedRef}
  >
    {children}
  </AccordionPrimitive.Header>
));

export const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ children, className, ...props }, forwardedRef) => (
  <AccordionPrimitive.Trigger
    className={className}
    {...props}
    ref={forwardedRef}
  >
    {children}
  </AccordionPrimitive.Trigger>
));

export const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ children, className, ...props }, forwardedRef) => (
  // flex flex-col flex-nowrap gap-y-[1px] 加这个就height计算不对了
  <AccordionPrimitive.Content
    className={cx(
      'AccordionContent mt-[1px] overflow-hidden',
      className,
    )}
    {...props}
    ref={forwardedRef}
  >
    <div className="flex flex-col gap-[1px]">{children}</div>
  </AccordionPrimitive.Content>
));

export const AccordionRoot = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>
>(
  (props, forwardedRef) => {
    const {
      className, children, ...rest
    } = props;
    return (
      <AccordionPrimitive.Root
        ref={forwardedRef}
        className={cx(
          'w-full cursor-pointer',
          className,
        )}
        {...rest}
      >
        {children}
      </AccordionPrimitive.Root>
    );
  },
);
