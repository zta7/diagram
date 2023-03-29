import {
  useReactFlow, ReactFlowState, useStoreApi, useStore,
} from 'reactflow';
import {
  MdAddCircleOutline, MdRemoveCircleOutline, MdOutlineFitScreen, MdLockOpen, MdLockOutline,
} from 'react-icons/md';
import { Button } from 'components/ui/Button';

interface Prop {
  className: string
}

const isInteractiveSelector = (s: ReactFlowState) => s.nodesDraggable && s.nodesConnectable && s.elementsSelectable;

export function Controls({ className }: Prop) {
  const store = useStoreApi();
  const isInteractive = useStore(isInteractiveSelector);
  const ins = useReactFlow();

  const onZoomOut = () => ins.zoomOut();
  const onZoomIn = () => ins.zoomIn();
  const onFit = () => ins.fitView();
  const onToogleInteractive = () => {
    store.setState({
      nodesDraggable: !isInteractive,
      nodesConnectable: !isInteractive,
      elementsSelectable: !isInteractive,
    });
  };
  return (
    <div className={className}>
      <Button onClick={onZoomIn}><MdAddCircleOutline /></Button>
      <Button onClick={onZoomOut}><MdRemoveCircleOutline /></Button>
      <Button onClick={onFit}><MdOutlineFitScreen /></Button>
      <Button onClick={onToogleInteractive}>
        {
          isInteractive
            ? <MdLockOpen />
            : <MdLockOutline />
        }
      </Button>
    </div>
  );
}
