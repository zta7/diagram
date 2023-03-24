import { useCallback } from 'react';
import { Handle, Position, Node, useReactFlow } from 'reactflow';

const InputEvent = ({ name, id  } : any) => {
  return (
    <div className='relative'>
      <Handle type="target" position={Position.Left} id={id} className="w-3 h-3 -left-3 rounded-none border-none bg-green-700"/>
      <div>{name}</div>
    </div>
  )
}

const OutputEvent = ({ name, id  } : any) => {
  return (
    <div className='relative'>
      <Handle type="source" position={Position.Right} id={id} className="w-3 h-3 -right-3 rounded-none border-none bg-green-700"/>
      <div className='text-right'>{name}</div>
    </div>
  )
}

const Input = ({ name, id  } : any) => {
  return (
    <div className='relative'>
      <Handle type="target" position={Position.Left} id={id} className="w-3 h-3 -left-3 rounded-none border-none bg-orange-500"/>
      <div>{name}</div>
    </div>
  )
}

const Output = ({ name, id  } : any) => {
  return (
    <div className='relative'>
      <Handle type="source" position={Position.Right} id={id} className="w-3 h-3 -right-3 rounded-none border-none bg-orange-500"/>
      <div className='text-right'>{name}</div>
    </div>
  )
}

interface InputEvent {
  id: string
  name: string
}

interface OutputEvent {
  id: string
  name: string
}

interface Input {
  id: string
  name: string
}

interface Output {
  id: string
  name: string
}

export interface FunctionBlockData {
  name: string,
  inputEvents: Array<InputEvent>
  outputEvents: Array<OutputEvent>
  inputs: Array<Input>
  outputs: Array<Output>
}


export default ({ data, id }: Node<FunctionBlockData> ) => {
  const { name, inputEvents, outputEvents, inputs, outputs } = data
  const onNameInput = (evt: any) => {
    const {getNode, setNodes } = useReactFlow()
    const self = getNode(id) as Node
    setNodes([
      {
        ...self,
        data: {
          name: evt.target.value
        }
      }
    ])
    // name = evt.target.value
  }
  return (
    <div className='flex flex-col flex-nowrap font-bold'>
      <div className='flex flex-row items-center justify-center'>
        <input type="text" className='text-center' value={name} onInput={onNameInput}/>
      </div>
      <div className='flex flex-row flex-nowrap justify-between gap-1 border-2 border-black'>
        <div className='flex flex-col flex-nowrap'>
          {
            inputEvents.map((e: any) => {
              return <InputEvent name={e.name} id={e.id} key={e.id}/>
            })
          }
        </div>
        <div className='flex flex-col flex-nowrap'>
          {
            outputEvents.map((e: any) => {
              return <OutputEvent name={e.name} id={e.id} key={e.id}/>
            })
          }
        </div>
      </div>
      <div className='flex flex-col flex-nowrap items-center justify-center'>
        <div className='bg-blue-600 text-white px-1 border-l border-r border-black'>Block Name</div>
      </div>
      <div className='flex flex-row flex-nowrap justify-between gap-1 border-2 border-black'>
        <div className='flex flex-col flex-nowrap'>
          {
            inputs.map((e: any) => {
              return <Input name={e.name} id={e.id} key={e.id}/>
            })
          }
        </div>
        <div className='flex flex-col flex-nowrap'>
          {
            outputs.map((e: any) => {
              return <Output name={e.name} id={e.id} key={e.id}/>
            })
          }
        </div>
      </div>
    </div>
  );
}