import {Input} from 'components/ui/Input';
import { Edge, Node } from 'reactflow';
import {useState, useCallback } from 'react'
import { Select } from 'components/ui/Select';

interface InspectorProp {
  path: string,
  component: React.ReactElement
}

const InspectorMap = new Map<string, Array<InspectorProp>>([
  ['FunctionBlock', 
    [
      {
        path: 'name',
        component: <Input />
      },
      {
        path: 'resource',
        component: <Select />
      }
    ]
  ],
])

interface Props {
  selection: Array<Node | Edge>
}

export const Inspector = ({selection} : Props) => {

  const props = useCallback(() => {
    if(selection.length === 1) {
      const s = selection[0]
      const ins = InspectorMap.get(s.type as string)
      return ins || []
    }
    return []
  }, [selection])()

  return (
    <div className='p-1 absolute left-0 right-0'>
      <div className='flex flex-col flex-nowrap justify-between gap-1'>
        {
          props.map((e, i) => (
            <div key={i} className='flex flex-col flex-nowrap justify-between gap-1'>
              <div className='flex flex-row flex-nowrap justify-between gap-1 items-center'>
                <label className='font-bold capitalize'>{e.path}</label>
                {/* <span className='text-ellipsis grow w-0 truncate text-error'>Message11111111111111111111111111111111111111111111</span> */}
              </div>
              { e.component }
            </div>
          ))
        }
      </div>
    </div>
  )
}