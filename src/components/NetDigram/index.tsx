import { DndContext } from '@dnd-kit/core';
import { Stencil } from 'components/NetDigram/Stencil';
import {
  MiniMap,
  ReactFlowProvider,
} from 'reactflow';
import { Canvas } from 'components/NetDigram/Canvas';
import { Controls } from 'components/diagram/controls';
import { SelectionToolbar } from 'components/diagram/toobar/SelectionToolbar';
import { Inspector } from 'components/NetDigram/Inspector';
import { Drop, DropIdEnum } from 'components/ui/Drop';

export function NetDiagram() {
  return (
    <div className="text-xs">
      <DndContext>
        <ReactFlowProvider>
          <SelectionToolbar />
          <div className="flex h-screen w-screen select-none flex-nowrap overflow-hidden">
            <div className="flex h-full w-full grow flex-nowrap">
              <div className="h-full w-[240px] border-r">
                <Stencil />
              </div>
              <div className="flex grow flex-col flex-nowrap">
                <Controls className="flex h-8 shrink-0 items-center border-b px-1" />
                <Drop id={DropIdEnum.NETFLOW} className="grow">
                  <Canvas />
                </Drop>
              </div>
            </div>
            <div className="flex w-[240px] flex-col flex-nowrap border-l">
              <div className="h-8 border-b">~~~</div>
              <div className="w-full grow">
                <Inspector />
              </div>
              <MiniMap
                className="relative m-0"
                zoomable
                pannable
              />
            </div>
          </div>
        </ReactFlowProvider>
      </DndContext>
    </div>
  );
}
