import { useCallback, useMemo } from 'react';
import { Handle, Position, Node, useReactFlow, NodeProps, Connection, addEdge, NodeToolbar  } from 'reactflow';
import Icon from '@icon-park/react/es/all';
import { type as EventEdgeType} from '../edges/EventEdge';
import cx from 'classnames'
import { Input } from 'components/ui/Input';

type ConnectionSource = Pick<Connection, 'source' | 'sourceHandle'>
type ConnectionTarget = Pick<Connection, 'target' | 'targetHandle'>

export const type = 'FunctionBlock'

const FunctionBlockInputEvent = ({ name, id  } : inputEventHandle) => {
  const ins = useReactFlow()
  const nodes = ins.getNodes()
  const validSources = useMemo(
    () => {
      let r: Array<ConnectionSource> = []
      nodes.forEach(n => {
        if(n.type === type) {
          const data = n.data as FunctionBlockData
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
      <Handle type="target" position={Position.Left} id={id} className="w-3 h-3 -left-3 rounded-none border-none bg-green-700" isValidConnection={isValidConnection} onConnect={onConnect}/>
      <div>{name}</div>
    </div>
  )
}

const FunctionBlockOutputEvent = ({ name, id  } : any) => {
  return (
    <div className='relative'>
      <Handle type="source" position={Position.Right} id={id} className="w-3 h-3 -right-3 rounded-none border-none bg-green-700"/>
      <div className='text-right'>{name}</div>
    </div>
  )
}

const FunctionBlockInput = ({ name, id  } : any) => {
  return (
    <div className='relative'>
      <Handle type="target" position={Position.Left} id={id} className="w-3 h-3 -left-3 rounded-none border-none bg-orange-500"/>
      <div>{name}</div>
    </div>
  )
}

const FunctionBlockOutput = ({ name, id  } : any) => {
  return (
    <div className='relative'>
      <Handle type="source" position={Position.Right} id={id} className="w-3 h-3 -right-3 rounded-none border-none bg-orange-500"/>
      <div className='text-right'>{name}</div>
    </div>
  )
}

interface inputEventHandle {
  id: string
  name: string
}

interface FunctionBlockInputEvent {
  id: string
  name: string
}

interface FunctionBlockOutputEvent {
  id: string
  name: string
}

interface FunctionBlockInput {
  id: string
  name: string
}

interface FunctionBlockOutput {
  id: string
  name: string
}

export interface FunctionBlockData {
  name: string,
  inputEvents: Array<FunctionBlockInputEvent>
  outputEvents: Array<FunctionBlockOutputEvent>
  inputs: Array<FunctionBlockInput>
  outputs: Array<FunctionBlockOutput>
}

// const NameInput = (id: string) => {
//   const ins = useReactFlow()
//   const onNameInput = useCallback(
//     (evt: any) => ins.setNodes(nds => nds.map(node => {
//       if(node.id === id) {
//         node.data = {
//           ...node.data,
//           name: evt.target.value
//         }
//       }
//       return node
//     })),
//     []
//   )
//   return <input type="text" className='text-center' value={name} onInput={onNameInput}/>
// }

export const FunctionBlock =  ({ data, id, selected }:  NodeProps<FunctionBlockData> ) => {
  const { name, inputEvents, outputEvents, inputs, outputs } = data
  const ins = useReactFlow()
  const onNameInput = useCallback(
    (evt: any) => ins.setNodes(nds => nds.map(node => {
      if(node.id === id) {
        node.data = {
          ...node.data,
          name: evt.target.value
        }
      }
      return node
    })),
    []
  )
  const selectedClassName = cx([selected ? 'border-primary' : 'border-black'])
  return (
    <>
      <NodeToolbar offset={0} className="flex flex-row">
        <Icon type="Plus"/>
        <Icon type="Delete"/>
      </NodeToolbar>
      <div className='flex flex-col flex-nowrap font-bold'>
        <div className='flex flex-row items-center justify-center'>
          <input type="text" className='text-center' value={name} onInput={onNameInput}/>
        </div>
        <div className={`flex flex-row flex-nowrap justify-between gap-1 border-2 ${selectedClassName}`}>
          <div className='flex flex-col flex-nowrap'>
            {
              inputEvents.map((e: any) => {
                return <FunctionBlockInputEvent name={e.name} id={e.id} key={e.id}/>
              })
            }
          </div>
          <div className='flex flex-col flex-nowrap'>
            {
              outputEvents.map((e: any) => {
                return <FunctionBlockOutputEvent name={e.name} id={e.id} key={e.id}/>
              })
            }
          </div>
        </div>
        <div className='flex flex-col flex-nowrap items-center justify-center'>
          <div className={`bg-blue-600 text-white px-1 border-l-2 border-r-2 ${selectedClassName}`}>Block Name</div>
        </div>
        <div className={`flex flex-row flex-nowrap justify-between gap-1 border-2 ${selectedClassName}`}>
          <div className='flex flex-col flex-nowrap'>
            {
              inputs.map((e: any) => {
                return <FunctionBlockInput name={e.name} id={e.id} key={e.id}/>
              })
            }
          </div>
          <div className='flex flex-col flex-nowrap'>
            {
              outputs.map((e: any) => {
                return <FunctionBlockOutput name={e.name} id={e.id} key={e.id}/>
              })
            }
          </div>
        </div>
      </div>
    </>
  );
}

export const FunctionBlockInspector = () => {
  return (
    <div className='flex flex-col flex-nowrap justify-between gap-1'>
        <div className='flex flex-col flex-nowrap justify-between gap-1'>
        <div className='flex flex-row flex-nowrap justify-between gap-1 items-center'>
          <label className='font-bold'>Name</label>
        </div>
        <Input />
      </div>
    </div>
  )
}