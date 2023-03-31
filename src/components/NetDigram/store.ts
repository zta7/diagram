import { create } from 'zustand';
import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  addEdge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  applyNodeChanges,
  applyEdgeChanges,
  ReactFlowInstance,
  EdgeTypes,
  NodeTypes,
  ReactFlowState,
} from 'reactflow';
import { DragEndEvent } from '@dnd-kit/core';
import { InputTemplate, InputType } from 'components/diagram/nodes/InputNode';
import { FunctionBlockInspector, FunctionBlockTemplate, FunctionBlockType } from 'components/diagram/nodes/FunctionBlock';
import { GroupTemplate, GroupType } from 'components/diagram/nodes/GroupNode';
import { EventEdgeTemplate, EventEdgeType } from 'components/diagram/edges/EventEdge';
import {
  ComponentType, RefObject,
} from 'react';
import { getCanDrop, getDragData } from 'components/diagram/helper';
import type { StoreApi } from 'zustand';

const nodeTypes = {
  [InputType]: InputTemplate,
  [FunctionBlockType]: FunctionBlockTemplate,
  [GroupType]: GroupTemplate,
};

const edgeTypes = {
  [EventEdgeType]: EventEdgeTemplate,
};

const insepctorTypes = {
  [FunctionBlockType]: FunctionBlockInspector,
};
type onInit = (reactFlowInstance: ReactFlowInstance, dropRef: RefObject<HTMLElement | null>, store: StoreApi<ReactFlowState>) => void

type RFState = {
  instance: ReactFlowInstance | null
  storeApi: StoreApi<ReactFlowState> | null
  insepctorTypes: Record<string, ComponentType<{node: Node}>>
  dropRef: RefObject<HTMLElement | null>
  nodes: Node[];
  edges: Edge[];
  nodeTypes: NodeTypes;
  edgeTypes: EdgeTypes,
  stencilSearch: string;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  onInit: onInit;
  onStencilDragend: (evt: DragEndEvent) => void
}

export const useStore = create<RFState>((set, get) => ({
  instance: null,
  storeApi: null,
  insepctorTypes,
  nodes: [],
  edges: [],
  nodeTypes,
  edgeTypes,
  stencilSearch: '',
  dropRef: { current: null },
  onStencilDragend: (evt) => {
    const {
      activatorEvent, over, active, delta,
    } = evt;
    const {
      dropRef, instance, storeApi,
    } = get();
    if (over && getCanDrop({ active, overId: over.id }) && dropRef.current && instance && storeApi) {
      const dropBounds = dropRef.current.getBoundingClientRect();
      const position = instance.project({
        x: (activatorEvent as PointerEvent).clientX + delta.x - dropBounds.left,
        y: (activatorEvent as PointerEvent).clientY + delta.y - dropBounds.top,
      });
      const data = getDragData(active);
      // Todo 类型检查
      if (data) {
        const { triggerNodeChanges } = storeApi.getState();
        triggerNodeChanges([{
          item: { ...data, id: `${Math.random()}`, position },
          type: 'add',
        }]);
      }
    }
  },
  onInit: (instance, dropRef, storeApi) => {
    set({
      instance,
      dropRef,
      storeApi,
    });
  },
  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection: Connection) => {
    set({
      edges: addEdge(connection, get().edges),
    });
  },
}));
