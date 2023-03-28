import { useReactFlow, ReactFlowState, useStoreApi, useStore } from 'reactflow'
import { MdAddCircleOutline, MdRemoveCircleOutline, MdOutlineFitScreen, MdLockOpen, MdLockOutline } from "react-icons/md";

interface Prop {
  className: string
}

const isInteractiveSelector = (s: ReactFlowState) => s.nodesDraggable && s.nodesConnectable && s.elementsSelectable;
export const Controls = ({className}: Prop) => {
  const store = useStoreApi();
  const isInteractive = useStore(isInteractiveSelector);
  const ins = useReactFlow()
  const onZoomOut = () => ins.zoomOut()
  const onZoomIn = () => ins.zoomIn()
  const onFit = () => ins.fitView()
  const onToogleInteractive = () => {
    store.setState({
      nodesDraggable: !isInteractive,
      nodesConnectable: !isInteractive,
      elementsSelectable: !isInteractive,
    });
  }
  return (
    <div className={className}>
      <MdAddCircleOutline onClick={onZoomIn}/>
      <MdRemoveCircleOutline onClick={onZoomOut}/>
      <MdOutlineFitScreen onClick={onFit}/>
      <>
        {
          isInteractive ? 
            <MdLockOpen onClick={onToogleInteractive}/>:
            <MdLockOutline onClick={onToogleInteractive}/>
        }
      </>
    </div>
  )
}