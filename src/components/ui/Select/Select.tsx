import {
  useFloating, autoUpdate, offset, useClick, useDismiss, useRole, useTypeahead, useListNavigation, useInteractions, FloatingList, FloatingFocusManager, flip, size,
} from '@floating-ui/react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import React from 'react';
import { Card } from '../Card';
import { Field } from '../Field';
import { Props, Icon } from '../Icon';

export const Select = React.forwardRef<HTMLElement, React.HTMLProps<HTMLElement> & Props>(
  ({ children }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [activeIndex, setActiveIndex] = React.useState<number|null>(null);
    const [selectedIndex, setSelectedIndex] = React.useState<number|null>(null);

    const {
      x, y, strategy, refs, context,
    } = useFloating({
      placement: 'bottom-start',
      open: isOpen,
      onOpenChange: setIsOpen,
      whileElementsMounted: autoUpdate,
      middleware: [
        offset(5),
        flip({ padding: 10 }),
        size({
          apply({ rects, elements, availableHeight }) {
            Object.assign(elements.floating.style, {
              maxHeight: `${availableHeight}px`,
              minWidth: `${rects.reference.width}px`,
            });
          },
        }),
      ],
    });
    const elementsRef = React.useRef<Array<HTMLElement | null>>([]);
    const labelsRef = React.useRef<Array<string | null>>([]);

    const click = useClick(context, { event: 'mousedown' });
    const dismiss = useDismiss(context);
    const role = useRole(context, { role: 'listbox' });
    const typeahead = useTypeahead(context, {
      listRef: labelsRef,
      activeIndex,
      selectedIndex,
      onMatch: setActiveIndex,
    });

    const listNavigation = useListNavigation(context, {
      listRef: elementsRef,
      activeIndex,
      selectedIndex,
      loop: true,
      onNavigate: setActiveIndex,
      virtual: true,
    });

    const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([click, role, dismiss, listNavigation, typeahead]);

    return (
      <FloatingList elementsRef={elementsRef} labelsRef={labelsRef}>
        <Field ref={refs.setReference} {...getReferenceProps()}>
          <div className="flex items-center">
            <div className="pr-2">123</div>
            <Icon size="sm">
              <ChevronDownIcon />
            </Icon>
          </div>
        </Field>
        {
          isOpen
            && (
              <FloatingFocusManager context={context}>
                <Card
                  ref={refs.setFloating}
                  style={{
                    position: strategy,
                    top: y ?? 0,
                    left: x ?? 0,
                  }}
                  {...getFloatingProps()}
                >
                  {children}
                </Card>
              </FloatingFocusManager>
            )
        }
      </FloatingList>
    );
  },
);
