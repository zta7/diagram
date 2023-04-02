import {
  NodeTypes,
  EdgeTypes,
} from 'reactflow';
import { InputTemplate, InputType } from 'components/diagram/nodes/InputNode';
import { FunctionBlockInspector, FunctionBlockTemplate, FunctionBlockType } from 'components/diagram/nodes/FunctionBlock';
import { GroupTemplate, GroupType } from 'components/diagram/nodes/GroupNode';
import { EventEdgeTemplate, EventEdgeType } from 'components/diagram/edges/EventEdge';

export const nodeTypes = {
  [InputType]: InputTemplate,
  [FunctionBlockType]: FunctionBlockTemplate,
  [GroupType]: GroupTemplate,
} as NodeTypes;

export const edgeTypes = {
  [EventEdgeType]: EventEdgeTemplate,
} as EdgeTypes;

export const inspectorTypes = {
  [FunctionBlockType]: FunctionBlockInspector,
} as Record<string, any>;
