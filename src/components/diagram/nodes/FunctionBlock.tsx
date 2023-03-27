import { ChangeEvent, useCallback , useMemo, useState } from 'react';
import { Handle, Position, Node, useReactFlow, NodeProps, Connection, addEdge, NodeToolbar, XYPosition  } from 'reactflow';
import Icon from '@icon-park/react/es/all';
import { type as EventEdgeType} from '../edges/EventEdge';
import cx from 'classnames'
import { Input } from 'components/ui/Input';
import { Select } from 'components/ui/Select';
import { setNodes } from '../helper';

type ConnectionSource = Pick<Connection, 'source' | 'sourceHandle'>
type ConnectionTarget = Pick<Connection, 'target' | 'targetHandle'>

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
  
  export type FunctionBlockNode = Node<FunctionBlockData>
  
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
  export const InputEvent = ({ name, id  } : Prop.InputEvent) => {
    const ins = useReactFlow()
    const nodes = ins.getNodes()
    const validSources = useMemo(
      () => {
        let r: Array<ConnectionSource> = []
        nodes.forEach(n => {
          if(n.type === FunctionBlockNode.type) {
            const data = n.data as Prop.FunctionBlockData
            const sources = data.outputEvents.map(e => ({ source: n.id, sourceHandle: e.id }))
            r = r.concat(sources)
          }
        })
        return r
      },
      [nodes]
    )
  
    const isValidConnection = (connection: Connection) => {
      return Boolean(validSources.find(e => e.source === connection.source && e.sourceHandle === connection.sourceHandle))
    }
    const onConnect = useCallback(
      // () => {},
      (connection:Connection) => ins.setEdges(eds => addEdge({...connection, type: EventEdgeType}, eds)), 
      [])
  
    return (
      <div className='relative'>
        <Handle type="target" position={Position.Left} id={id} className="-left-3 h-3 w-3 rounded-none border-none bg-green-700" isValidConnection={isValidConnection} onConnect={onConnect}/>
        <div>{name}</div>
      </div>
    )
  }
  
  export const OutputEvent = ({ name, id  } : any) => {
    return (
      <div className='relative'>
        <Handle type="source" position={Position.Right} id={id} className="-right-3 h-3 w-3 rounded-none border-none bg-green-700"/>
        <div className='text-right'>{name}</div>
      </div>
    )
  }
  
  export const Input = ({ name, id  } : any) => {
    return (
      <div className='relative'>
        <Handle type="target" position={Position.Left} id={id} className="-left-3 h-3 w-3 rounded-none border-none bg-orange-500"/>
        <div>{name}</div>
      </div>
    )
  }
  
  export const Output = ({ name, id  } : any) => {
    return (
      <div className='relative'>
        <Handle type="source" position={Position.Right} id={id} className="-right-3 h-3 w-3 rounded-none border-none bg-orange-500"/>
        <div className='text-right'>{name}</div>
      </div>
    )
  }
}

// const onChange = () => {

// }

export class FunctionBlockNode {
  static type = 'FunctionBlock'
  id: string
  data: Prop.FunctionBlockData
  type: string
  position: XYPosition
  constructor({id, data, position}: Prop.FunctionBlockNode) {
    this.id = id
    this.data = data
    this.position = position
    this.type = FunctionBlockNode.type
  }
}

export const FunctionBlock =  ({ data, id, selected }:  Prop.FunctionBlockProps ) => {
  const { name, inputEvents, outputEvents, inputs, outputs, resource } = data
  const ins = useReactFlow()
  const node = ins.getNode(id) as Node
  const selectedClassName = cx([selected ? 'border-primary' : 'border-black'])
  // console.log(data)
  return (
    <>
      <NodeToolbar offset={0} className="flex flex-row">
        <Icon type="Plus"/>
        <Icon type="Delete"/>
      </NodeToolbar>
      <div className='flex flex-col flex-nowrap font-bold'>
        <div className='flex flex-row items-center justify-center'>
          <Input className='border-none bg-transparent text-center' value={node.data.name} onInput={(evt: ChangeEvent<HTMLInputElement>) => setNodes({ins, node, path: 'data.name', value: evt.target.value})}/>
          {/* <Input className='bg-transparent text-center' value={name} onInput={onNameInput}/> */}
        </div>
        <div className={`flex flex-row flex-nowrap justify-between gap-1 border-2 ${selectedClassName}`}>
          <div className='flex flex-col flex-nowrap'>
            {
              inputEvents.map((e: Prop.InputEvent) => {
                return <Port.InputEvent name={e.name} id={e.id} key={e.id}/>
              })
            }
          </div>
          <div className='flex flex-col flex-nowrap'>
            {
              outputEvents.map((e: Prop.OutputEvent) => {
                return <Port.OutputEvent name={e.name} id={e.id} key={e.id}/>
              })
            }
          </div>
        </div>
        <div className='flex flex-col flex-nowrap items-center justify-center text-white'>
          <div className={`border-x-2 bg-blue-600 px-1 text-white ${selectedClassName}`}>Block Name</div>
        </div>
        <div className={`flex flex-row flex-nowrap justify-between gap-1 border-2 ${selectedClassName}`}>
          <div className='flex flex-col flex-nowrap'>
            {
              inputs.map((e: Prop.Input) => {
                return <Port.Input name={e.name} id={e.id} key={e.id}/>
              })
            }
          </div>
          <div className='flex flex-col flex-nowrap'>
            {
              outputs.map((e: Prop.Output) => {
                return <Port.Output name={e.name} id={e.id} key={e.id}/>
              })
            }
          </div>
        </div>
        {
          resource && (
            <>
              <div className={`h-4 w-0 self-center border ${selectedClassName}`}></div>
              <Select></Select>
            </>
          )
        }
      </div>
    </>
  );
}

export const FunctionBlockInspector = ({node} : {node: FunctionBlockNode}) => {
  const ins = useReactFlow()
  return (
    <div className='flex flex-col flex-nowrap justify-between gap-1'>
        <div className='flex flex-col flex-nowrap justify-between gap-1'>
        <div className='flex flex-row flex-nowrap items-center justify-between gap-1'>
          <label>Name</label>
        </div>
        <Input value={node.data.name} onInput={(evt: ChangeEvent<HTMLInputElement>) => setNodes({ins, node, path: 'data.name', value: evt.target.value})}/>
      </div>
    </div>
  )
}