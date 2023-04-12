import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { classed } from '@tw-classed/react';

// export const AccordionItem = React.forwardRef<
//   React.ElementRef<typeof AccordionPrimitive.Item>,
//   React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
// >(({ children, className, ...props }, forwardedRef) => (
//   <AccordionPrimitive.Item
//     className={cx(
//       '',
//       className,
//     )}
//     {...props}
//     ref={forwardedRef}
//   >
//     {children}
//   </AccordionPrimitive.Item>
// ));

// export const AccordionTrigger = React.forwardRef<
//   React.ElementRef<typeof AccordionPrimitive.Trigger>,
//   React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
// >(({ children, className, ...props }, forwardedRef) => (
//   <div>
//     <MdOutlineChevronRight aria-hidden className="transition-transform duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-data-[state=open]:rotate-180" />
//     <AccordionPrimitive.Trigger
//       className={cx(
//         'group flex flex-nowrap items-center justify-between px-2 py-1 w-full hover:bg-base-200 cursor-pointer h-8',
//         className,
//       )}
//       {...props}
//       ref={forwardedRef}
//     >
//       {children}
//     </AccordionPrimitive.Trigger>
//   </div>
// ));

// export const AccordionContent = React.forwardRef<
//   React.ElementRef<typeof AccordionPrimitive.Content>,
//   React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
// >(({ children, className, ...props }, forwardedRef) => (
//   <AccordionPrimitive.Content
//     className={cx(
//       'data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden px-2 py-1',
//       className,
//     )}
//     {...props}
//     ref={forwardedRef}
//   >
//     {children}
//   </AccordionPrimitive.Content>
// ));

// export const AccordionRoot = React.forwardRef<
//   React.ElementRef<typeof AccordionPrimitive.Root>,
//   React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>
// >(
//   (props, ref) => {
//     const { className, children, type } = props;
//     return (
//       <AccordionPrimitive.Root
//         ref={ref}
//         className={cx(
//           'w-full',
//           className,
//         )}
//         type={type}
//       >
//         {children}
//       </AccordionPrimitive.Root>
//     );
//   },
// );
export const AccordionHeader = classed(AccordionPrimitive.Header);
export const AccordionTrigger = classed(AccordionPrimitive.Trigger);
export const AccordionContent = classed(AccordionPrimitive.Content, 'data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden');
export const AccordionItem = classed(AccordionPrimitive.Item, 'px-[2px] py-[1px]');
export const AccordionRoot = classed(AccordionPrimitive.Root, 'w-full cursor-pointer');
