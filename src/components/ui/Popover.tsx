import * as React from 'react';
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  useMergeRefs,
  Placement,
  FloatingPortal,
  FloatingFocusManager,
  useId,
  FloatingOverlay,
  useHover,
  useFocus,
  safePolygon,
} from '@floating-ui/react';

interface PopoverOptions {
  initialOpen?: boolean;
  placement?: Placement;
  modal?: boolean;
  trigger?: 'click' | 'hover'
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function usePopover({
  initialOpen = false,
  placement = 'bottom',
  modal,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
}: PopoverOptions = {}) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(initialOpen);
  const [labelId, setLabelId] = React.useState<string | undefined>();
  const [descriptionId, setDescriptionId] = React.useState<
    string | undefined
  >();

  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = setControlledOpen ?? setUncontrolledOpen;

  const data = useFloating({
    placement,
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(5),
      flip({
        fallbackAxisSideDirection: 'end',
      }),
      shift({ padding: 5 }),
    ],
  });

  const { context } = data;

  const click = useClick(context, {
    enabled: controlledOpen == null,
  });
  const hover = useHover(context, {
    move: false,
    delay: { open: 200 },
    enabled: controlledOpen == null,
    handleClose: safePolygon({
      blockPointerEvents: true,
    }),
  });

  // const focus = useFocus(context, {
  //   enabled: controlledOpen == null,
  // });

  const role = useRole(context);

  const interactions = useInteractions([hover, role, click]);

  return React.useMemo(
    () => ({
      open,
      setOpen,
      ...interactions,
      ...data,
      modal,
      labelId,
      descriptionId,
      setLabelId,
      setDescriptionId,
    }),
    [open, setOpen, interactions, data, modal, labelId, descriptionId],
  );
}

type ContextType =
  | (ReturnType<typeof usePopover> & {
      setLabelId: React.Dispatch<React.SetStateAction<string | undefined>>;
      setDescriptionId: React.Dispatch<
        React.SetStateAction<string | undefined>
      >;
    })
  | null;

const PopoverContext = React.createContext<ContextType>(null);

export const usePopoverContext = () => {
  const context = React.useContext(PopoverContext);

  if (context == null) {
    throw new Error('Popover components must be wrapped in <Popover />');
  }

  return context;
};

export function Popover({
  children,
  modal = false,
  ...rest
}: {
  children: React.ReactNode;
} & PopoverOptions) {
  // This can accept any props as options, e.g. `placement`,
  // or other positioning options.
  const popover = usePopover({ modal, ...rest });
  return (
    <PopoverContext.Provider value={popover}>
      {children}
    </PopoverContext.Provider>
  );
}

interface PopoverTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
}

export const PopoverTrigger = React.forwardRef<
  HTMLElement,
  React.HTMLProps<HTMLElement> & PopoverTriggerProps
>(({ children, asChild = false, ...props }, propRef) => {
  const context = usePopoverContext();
  const childrenRef = (children as any).ref;
  const ref = useMergeRefs([context.refs.setReference, propRef, childrenRef]);

  // `asChild` allows the user to pass any element as the anchor
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(
      children,
      context.getReferenceProps({
        ref,
        ...props,
        ...children.props,
        'data-state': context.open ? 'open' : 'closed',
      }),
    );
  }

  return (
    <div
      ref={ref}
      // type="button"
      // The user can style the trigger based on the state
      data-state={context.open ? 'open' : 'closed'}
      {...context.getReferenceProps(props)}
    >
      {children}
    </div>
  );
});

export const PopoverContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement>
>((props, propRef) => {
  const { context: floatingContext, ...context } = usePopoverContext();
  const ref = useMergeRefs([context.refs.setFloating, propRef]);

  console.log('render');
  return (
    <FloatingPortal root={document.getElementById('app')}>
      {context.open && (
        <FloatingOverlay>
          <FloatingFocusManager context={floatingContext} modal={context.modal}>
            <div
              ref={ref}
              style={{
                position: context.strategy,
                top: context.y ?? 0,
                left: context.x ?? 0,
                width: 'max-content',
                ...props.style,
              }}
              aria-labelledby={context.labelId}
              aria-describedby={context.descriptionId}
              {...context.getFloatingProps(props)}
            >
              {props.children}
            </div>
          </FloatingFocusManager>
        </FloatingOverlay>
      )}
    </FloatingPortal>
  );
});

// export const PopoverHeading = React.forwardRef<
//   HTMLHeadingElement,
//   React.HTMLProps<HTMLHeadingElement>
// >(({ children, ...props }, ref) => {
//   const { setLabelId } = usePopoverContext();
//   const id = useId();

//   // Only sets `aria-labelledby` on the Popover root element
//   // if this component is mounted inside it.
//   React.useLayoutEffect(() => {
//     setLabelId(id);
//     return () => setLabelId(undefined);
//   }, [id, setLabelId]);

//   return (
//     <h2 {...props} ref={ref} id={id}>
//       {children}
//     </h2>
//   );
// });

// export const PopoverDescription = React.forwardRef<
//   HTMLParagraphElement,
//   React.HTMLProps<HTMLParagraphElement>
// >(({ children, ...props }, ref) => {
//   const { setDescriptionId } = usePopoverContext();
//   const id = useId();

//   // Only sets `aria-describedby` on the Popover root element
//   // if this component is mounted inside it.
//   React.useLayoutEffect(() => {
//     setDescriptionId(id);
//     return () => setDescriptionId(undefined);
//   }, [id, setDescriptionId]);

//   return (
//     <p {...props} ref={ref} id={id}>
//       {children}
//     </p>
//   );
// });

// export const PopoverClose = React.forwardRef<
//   HTMLButtonElement,
//   React.ButtonHTMLAttributes<HTMLButtonElement>
// >((props, ref) => {
//   const { setOpen } = usePopoverContext();
//   return (
//     <button
//       type="button"
//       ref={ref}
//       {...props}
//       onClick={(event) => {
//         props.onClick?.(event);
//         setOpen(false);
//       }}
//     />
//   );
// });
