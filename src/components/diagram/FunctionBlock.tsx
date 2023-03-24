import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';

const handleStyle = { left: 10 };


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


export default ({ data }: any = {}) => {
  const { name, inputEvents, outputEvents, inputs, outputs } = data

  return (
    <div className='flex flex-col flex-nowrap font-bold'>
      <div className='flex flex-row items-center justify-center'>
        <input type="text" className='text-center'/>
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