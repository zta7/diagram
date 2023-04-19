import {
  autoUpdate, flip, offset, size, useDismiss, useFloating, useClick, useRole, useTypeahead, useInteractions, useListNavigation, FloatingFocusManager,
} from '@floating-ui/react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import * as React from 'react';
import { Card } from '../Card';
import { Field } from '../Field';
import { Icon } from '../Icon';
import { Item, ItemSection, List } from '../Item';
import { Select } from './Select';

// interface Props {
//   options: Array<string>
// }

// export const Select = React.forwardRef<HTMLElement, React.HTMLProps<HTMLElement> & Props>(
//   ({ options }, ref) => {
//     const [isOpen, setIsOpen] = React.useState(false);
//     const [activeIndex, setActiveIndex] = React.useState<number|null>(null);
//     const [selectedIndex, setSelectedIndex] = React.useState<number|null>(null);

//     const {
//       x, y, strategy, refs, context,
//     } = useFloating({
//       placement: 'bottom-start',
//       open: isOpen,
//       onOpenChange: setIsOpen,
//       whileElementsMounted: autoUpdate,
//       middleware: [
//         offset(5),
//         flip({ padding: 10 }),
//         size({
//           apply({ rects, elements, availableHeight }) {
//             Object.assign(elements.floating.style, {
//               maxHeight: `${availableHeight}px`,
//               minWidth: `${rects.reference.width}px`,
//             });
//           },
//         }),
//       ],
//     });
//     const listNavRef = React.useRef<Array<HTMLElement | null>>([]);
//     const listTypeaheadRef = React.useRef<Array<string | null>>([]);

//     const click = useClick(context, { event: 'mousedown' });
//     const dismiss = useDismiss(context);
//     const role = useRole(context, { role: 'listbox' });
//     const typeahead = useTypeahead(context, {
//       listRef: listTypeaheadRef,
//       activeIndex,
//       selectedIndex,
//       onMatch: setActiveIndex,
//     });

//     const listNavigation = useListNavigation(context, {
//       listRef: listNavRef,
//       activeIndex,
//       selectedIndex,
//       loop: true,
//       onNavigate: setActiveIndex,
//       virtual: true,
//     });

//     const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([click, role, dismiss, listNavigation, typeahead]);

//     return (
//       <>
//         <Field ref={refs.setReference} {...getReferenceProps()}>
//           <div className="flex items-center">
//             <div className="pr-2">123</div>
//             <Icon size="sm">
//               <ChevronDownIcon />
//             </Icon>
//           </div>
//         </Field>
//         {
//         isOpen
//           && (
//             <FloatingFocusManager context={context}>
//               <Card
//                 ref={refs.setFloating}
//                 style={{
//                   position: strategy,
//                   top: y ?? 0,
//                   left: x ?? 0,
//                 }}
//                 {...getFloatingProps()}
//               >
//                 <List>
//                   {
//                 options.map((e, i) => (
//                   <Item
//                     key={e}
//                     role="option"
//                     tabIndex={activeIndex === i ? 0 : -1}
//                     active={i === selectedIndex || i === activeIndex}
//                     aria-selected={i === selectedIndex && i === activeIndex}
//                     ref={(node) => {
//                       listNavRef.current[i] = node;
//                       listTypeaheadRef.current[i] = node?.textContent ?? null;
//                     }}
//                     {...getItemProps()}
//                   >
//                     {e}
//                   </Item>
//                 ))
//               }
//                 </List>
//               </Card>
//             </FloatingFocusManager>
//           )
//       }
//       </>
//     );
//   },
// );

export { Select };
