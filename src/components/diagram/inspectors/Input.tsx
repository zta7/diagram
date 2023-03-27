import { Input as InputA } from "components/ui/Input"
import { get, set, cloneDeep } from "lodash"
import { ChangeEvent } from "react"
import { ReactFlowInstance, Node } from "reactflow"

interface InspectorInputProp {
  ins: ReactFlowInstance, 
  node: Node, 
  path: string, 
  className?: string
}

export const InspectorInput = ({ins, node, path, className} : InspectorInputProp) => {
  const value = get(node, path, '')
  const onInput = (evt: ChangeEvent<HTMLInputElement>) => {
    ins.setNodes(nds => nds.map(n => {
      if(n.id === node.id) {
        n = set(cloneDeep(n), path, evt.target.value)
      }
      return n
    }))
  }

  return (
    <InputA value={value} onInput={onInput} className={className}/>
  )
}