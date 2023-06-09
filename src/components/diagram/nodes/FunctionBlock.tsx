import {
  ChangeEvent, useCallback, useMemo,
} from 'react';
import {
  Handle, Position, Node, useReactFlow, NodeProps, Connection, addEdge, useStoreApi,
} from 'reactflow';
import { Input } from 'components/ui/Input';
import { Select } from 'components/ui/Select/main';
import { EventEdgeType } from 'components/diagram/edges/EventEdge';
import { onNodeReset } from 'components/diagram/helper';
import { BasicNode } from 'components/diagram/nodes/BasicNode';
import {
  AccordionRoot, AccordionContent, AccordionItem, AccordionTrigger,
} from 'components/ui/According/main';
import { Field } from 'components/ui/Field';

type ConnectionSource = Pick<Connection, 'source' | 'sourceHandle'>
// type ConnectionTarget = Pick<Connection, 'target' | 'targetHandle'>

export const FunctionBlockType = 'FunctionBlock';

namespace Prop {
  export interface FunctionBlockData {
    name: string,
    inputEvents: Array<Prop.InputEvent>
    outputEvents: Array<Prop.OutputEvent>
    inputs: Array<Prop.Input>
    outputs: Array<Prop.Output>
    resource?: string
  }

  export type FunctionBlockProps = NodeProps<FunctionBlockData>

  export type FunctionBlockNode = BasicNode & { data: FunctionBlockData}

  export interface InputEvent {
    id: string
    name: string
  }

  export interface OutputEvent {
    id: string
    name: string
  }

  export interface Input {
    id: string
    name: string
  }

  export interface Output {
    id: string
    name: string
  }
}

namespace Port {
  export function InputEvent({ name, id } : Prop.InputEvent) {
    const ins = useReactFlow();
    const nodes = ins.getNodes();
    const validSources = useMemo(
      () => {
        let r: Array<ConnectionSource> = [];
        nodes.forEach((n) => {
          if (n.type === FunctionBlockType) {
            const data = n.data as Prop.FunctionBlockData;
            const sources = data.outputEvents.map((e) => ({ source: n.id, sourceHandle: e.id }));
            r = r.concat(sources);
          }
        });
        return r;
      },
      [nodes],
    );

    const isValidConnection = (connection: Connection) => Boolean(validSources.find((e) => e.source === connection.source && e.sourceHandle === connection.sourceHandle));
    const onConnect = useCallback(
      // () => {},
      (connection:Connection) => ins.setEdges((eds) => addEdge({ ...connection, type: EventEdgeType }, eds)),
      [ins],
    );

    return (
      <div className="relative">
        <Handle type="target" position={Position.Left} id={id} className="left-0 h-3 w-3 rounded-none border-none bg-green-700" isValidConnection={isValidConnection} onConnect={onConnect} />
        <div className="pl-4">{name}</div>
      </div>
    );
  }

  export function OutputEvent({ name, id } : Prop.OutputEvent) {
    return (
      <div className="relative">
        <Handle type="source" position={Position.Right} id={id} className="right-0 h-3 w-3 rounded-none border-none bg-green-700" />
        <div className="pr-4 text-right">{name}</div>
      </div>
    );
  }

  export function Input({ name, id } : Prop.Input) {
    return (
      <div className="relative">
        <Handle type="target" position={Position.Left} id={id} className="-left-3 h-3 w-3 rounded-none border-none bg-orange-500" />
        <div>{name}</div>
      </div>
    );
  }

  export function Output({ name, id } : Prop.Output) {
    return (
      <div className="relative">
        <Handle type="source" position={Position.Right} id={id} className="-right-3 h-3 w-3 rounded-none border-none bg-orange-500" />
        <div className="text-right">{name}</div>
      </div>
    );
  }
}

export class FunctionBlockNode extends BasicNode {
  data: Prop.FunctionBlockData;

  constructor({ data, ...rest }: Prop.FunctionBlockNode) {
    super({ ...rest, type: FunctionBlockType });
    this.data = data;
  }
}

export function FunctionBlockTemplate({
  data, id,
}: Prop.FunctionBlockProps) {
  const {
    inputEvents, outputEvents, inputs, outputs, resource,
  } = data;
  const { triggerNodeChanges, nodeInternals } = useStoreApi().getState();
  const node = nodeInternals.get(id);

  return (
    <div className="flex flex-col flex-nowrap">
      <div className="flex items-center justify-center">
        <Input
          className="border-none bg-transparent text-center"
          value={data.name}
          onInput={(evt: ChangeEvent<HTMLInputElement>) => node && onNodeReset<Prop.FunctionBlockData>({ ...node, data: { ...node.data, name: evt.target.value } }, triggerNodeChanges)}
        />
      </div>
      <div className="flex flex-nowrap justify-between gap-1 border-2 border-black">
        <div className="flex flex-col flex-nowrap">
          {
              inputEvents.map((e: Prop.InputEvent) => <Port.InputEvent name={e.name} id={e.id} key={e.id} />)
            }
        </div>
        <div className="flex flex-col flex-nowrap">
          {
              outputEvents.map((e: Prop.OutputEvent) => <Port.OutputEvent name={e.name} id={e.id} key={e.id} />)
            }
        </div>
      </div>
      <div className="flex flex-col flex-nowrap items-center justify-center text-white">
        <div className="border-x-2 border-black bg-blue-600 px-1 text-white">Block Name</div>
      </div>
      <div className="flex flex-nowrap justify-between gap-1 border-2 border-black">
        <div className="flex flex-col flex-nowrap">
          {
            inputs.map((e: Prop.Input) => <Port.Input name={e.name} id={e.id} key={e.id} />)
          }
        </div>
        <div className="flex flex-col flex-nowrap">
          {
              outputs.map((e: Prop.Output) => <Port.Output name={e.name} id={e.id} key={e.id} />)
            }
        </div>
      </div>
      {
        resource !== undefined && (
          <>
            <div className="h-4 w-0 self-center border border-black" />
            <Select />
          </>
        )
      }
    </div>
  );
}

export function FunctionBlockInspector({ node, setNode }: {node: Node, setNode: (node: Node) => void}) {
  const { triggerNodeChanges } = useStoreApi().getState();
  const onInput = (evt: ChangeEvent<HTMLInputElement>) => {
    const n = { ...node, data: { ...node.data, name: evt.target.value } };
    setNode(n);
    triggerNodeChanges([{ type: 'add', item: n }]);
    // onNodeReset<Prop.FunctionBlockData>(n, triggerNodeChanges);
  };
  return (
    <div className="flex flex-col flex-nowrap justify-between gap-1">
      <div className="flex flex-col flex-nowrap justify-between gap-1">
        <AccordionRoot type="single">
          <AccordionItem value="common">
            <AccordionTrigger>
              Style
            </AccordionTrigger>
            <AccordionContent>
              {/* <label className="flex flex-col flex-nowrap gap-1">
                Name */}
              <Field
                label="Name"
                variant="outline"
                size="sm"
              >
                <Input
                  value={node.data.name}
                  onInput={onInput}
                />
              </Field>
              {/* </label> */}
              <label className="flex flex-col flex-nowrap gap-1">
                Resource
                <Input
                  value={node.data.resource}
                  onInput={onInput}
                />
              </label>
            </AccordionContent>
          </AccordionItem>
        </AccordionRoot>
      </div>
    </div>
  );
}

export function FunctionBlockDragOverlay() {
  return (
    <div>
      This is FunctionBlock
    </div>
  );
}
