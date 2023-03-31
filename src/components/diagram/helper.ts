import { cloneDeep, get, set } from 'lodash';
import { ReactFlowInstance, Node } from 'reactflow';

interface setNodesProp {
  ins: ReactFlowInstance,
  node: Node,
  path: string,
  value: any
}

export const setNodes = ({
  ins, node, path, value,
}: setNodesProp) => {
  ins.setNodes((nds) => nds.map((n) => {
    if (n.id === node.id) {
      return set(cloneDeep(n), path, value);
    }
    return n;
  }));
};

export const getCanDrop = ({ active, overId }: any) => get(active, 'data.current.dropTo', [] as Array<string>).includes(overId);
export const getDragData = (active: any) => get(active, 'data.current.dropData');
