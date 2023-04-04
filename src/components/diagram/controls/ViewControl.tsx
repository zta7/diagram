import {
  useReactFlow, ReactFlowState, useStoreApi, useStore,
} from 'reactflow';
import {
  MdAddCircleOutline, MdRemoveCircleOutline, MdOutlineFitScreen, MdLockOpen, MdLockOutline,
} from 'react-icons/md';
import { Button } from 'components/ui/Button';

const isInteractiveSelector = (s: ReactFlowState) => s.nodesDraggable && s.nodesConnectable && s.elementsSelectable;

export function ViewControl() {
  const store = useStoreApi();
  const isInteractive = useStore(isInteractiveSelector);
  const { zoomOut, zoomIn, fitView } = useReactFlow();

  const onZoomOut = () => zoomOut();
  const onZoomIn = () => zoomIn();
  const onFit = () => fitView();
  const onToogleInteractive = () => {
    store.setState({
      nodesDraggable: !isInteractive,
      nodesConnectable: !isInteractive,
      elementsSelectable: !isInteractive,
    });
  };
  return (
    <>
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
    </>
  );
}
