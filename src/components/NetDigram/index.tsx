import { DndContext } from '@dnd-kit/core';
import { Stencil } from 'components/NetDigram/Stencil';
import { ReactFlowProvider } from 'reactflow';
import { Canvas } from 'components/NetDigram/Canvas';
import { useStore } from 'components/NetDigram/store';
import { shallow } from 'zustand/shallow';
import { Controls } from 'components/diagram/controls';
import { SelectionToolbar } from 'components/diagram/toobar/SelectionToolbar';
import { Inspector } from 'components/NetDigram/Inspector';

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
          <SelectionToolbar />
          <div className="flex h-screen w-screen select-none flex-nowrap">
            <div className="flex h-full w-full grow flex-nowrap">
              <div className="h-full w-[240px] border-r">
                <Stencil />
              </div>
              <div className="flex grow flex-col flex-nowrap">
                <Controls className="flex h-8 shrink-0 items-center border-b px-1" />
                <Canvas className="grow" />
              </div>
            </div>
            <Inspector className="h-full w-[240px] overflow-hidden border-l" />
          </div>
        </ReactFlowProvider>
      </DndContext>
    </div>
  );
}
