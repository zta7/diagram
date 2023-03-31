import { DndContext } from '@dnd-kit/core';
import { Stencil } from 'components/NetDigram/Stencil';
import { ReactFlowProvider } from 'reactflow';
import { Canvas } from 'components/NetDigram/Canvas';
import { useStore } from 'components/NetDigram/store';
import { shallow } from 'zustand/shallow';
import { SelectionInspector } from 'components/diagram/inspector/SelectionInspector';

export function NetDiagram() {
  const {
    onStencilDropEnd,
  } = useStore((state) => ({
    onStencilDropEnd: state.onStencilDragend,
  }), shallow);
  return (
    <div className="text-xs">
      <DndContext onDragEnd={onStencilDropEnd}>
        <ReactFlowProvider>
          <div className="flex h-screen w-screen select-none flex-nowrap">
            <div className="flex h-full w-full grow flex-nowrap">
              <div className="h-full w-[240px] border-r">
                <Stencil />
              </div>
              <div className="flex grow flex-col flex-nowrap">
                <Canvas />
              </div>
            </div>
            <SelectionInspector className='"h-full border-l" w-[240px] overflow-hidden' />
          </div>
        </ReactFlowProvider>
      </DndContext>
    </div>
  );
}
