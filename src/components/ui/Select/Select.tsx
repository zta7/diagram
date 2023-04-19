import {
  useFloating, autoUpdate, offset, useClick, useDismiss, useRole, useTypeahead, useListNavigation, useInteractions, FloatingList, FloatingFocusManager, flip, size, useMergeRefs, Placement,
} from '@floating-ui/react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { Card } from 'components/ui/Card';
import { Field } from 'components/ui/Field';
import { Icon } from 'components/ui/Icon';
import React from 'react';

type value = string | number
type values = Array<value>

interface SelectSingleImplProps { value: value }
interface SelectMultipleImplProps { value: values }

export interface SelectSingleProps extends SelectSingleImplProps { type: 'single' }
export interface SelectMultipleProps extends SelectMultipleImplProps { type: 'multiple' }

export const useSelect = ({ type, value: _value }: (SelectSingleProps | SelectMultipleProps)) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState<number|null>(null);
  const [value, setValue] = React.useState(_value);
  const elementsRef = React.useRef<Array<HTMLElement | null>>([]);
  const labelsRef = React.useRef<Array<string | null>>([]);

  const data = useFloating({
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

  const { context } = data;

  const click = useClick(context, { event: 'mousedown' });
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'listbox' });
  const typeahead = useTypeahead(context, {
    listRef: labelsRef,
    activeIndex,
    onMatch: setActiveIndex,
  });

  const listNavigation = useListNavigation(context, {
    listRef: elementsRef,
    activeIndex,
    loop: true,
    onNavigate: setActiveIndex,
    // virtual: true,
  });

  const interactions = useInteractions([click, role, dismiss, listNavigation, typeahead]);

  return React.useMemo(() => ({
    isOpen,
    setIsOpen,
    activeIndex,
    setActiveIndex,
    value,
    setValue,
    elementsRef,
    labelsRef,
    ...data,
    ...interactions,
  }), [activeIndex, data, interactions, isOpen, value]);
};
type ContextType = ReturnType<typeof useSelect> | null;
const SelectContext = React.createContext<ContextType>(null);

export const useSelectContext = () => {
  const context = React.useContext(SelectContext);
  if (context == null) {
    throw new Error('Select components must be wrapped in <Select />');
  }
  return context;
};

export const Select = React.forwardRef<HTMLElement, React.HTMLProps<HTMLElement> &(SelectSingleProps | SelectMultipleProps)>(
  ({ children, type, value }, forwardRef) => {
    const select = useSelect({ type, value });
    const {
      elementsRef, labelsRef, getReferenceProps, getFloatingProps, isOpen, refs, context, strategy, x, y,
    } = select;

    const ref = useMergeRefs([refs.setReference, forwardRef]);

    return (
      <SelectContext.Provider value={select}>
        <FloatingList elementsRef={elementsRef} labelsRef={labelsRef}>
          <Field ref={ref} {...getReferenceProps()}>
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
      </SelectContext.Provider>
    );
  });
