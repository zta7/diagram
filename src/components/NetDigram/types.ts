import { EventEdgeType, EventEdgeTemplate } from 'components/diagram/edges/EventEdge';
import { FunctionBlockType, FunctionBlockTemplate, FunctionBlockInspector } from 'components/diagram/nodes/FunctionBlock';
import { GroupType, GroupTemplate } from 'components/diagram/nodes/GroupNode';
import { InputType, InputTemplate } from 'components/diagram/nodes/InputNode';
import { ComponentType } from 'react';
import { NodeTypes, EdgeTypes, Node } from 'reactflow';

export const nodeTypes = {
  [InputType]: InputTemplate,
  [FunctionBlockType]: FunctionBlockTemplate,
  [GroupType]: GroupTemplate,
} as NodeTypes;

export const edgeTypes = {
  [EventEdgeType]: EventEdgeTemplate,
} as EdgeTypes;

export const insepctorTypes = {
  [FunctionBlockType]: FunctionBlockInspector,
} as Record<string, ComponentType<{node: Node}>>;
