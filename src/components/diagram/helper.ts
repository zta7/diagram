import { cloneDeep, set } from "lodash"
import { ReactFlowInstance, Node } from "reactflow"

interface setNodesProp {
  ins: ReactFlowInstance, 
  node: Node, 
  path: string, 
  value: any
}

export const setNodes = ({ins, node, path, value}: setNodesProp) => {
  ins.setNodes(nds => nds.map(n => {
    if(n.id === node.id) {
      n = set(cloneDeep(n), path, value)
    }
    return n
  }))
}