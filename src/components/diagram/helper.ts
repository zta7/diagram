import { get } from 'lodash';
import { Node, NodeChange } from 'reactflow';

export const getCanDrop = ({ active, overId }: any) => get(active, 'data.current.dropTo', [] as Array<string>).includes(overId);
export const getDragData = (active: any) => get(active, 'data.current.dropData');

export const onNodeReset = <T, U extends Node<T> = Node<T>>(newNode: U, triggerNodeChanges: (changes: NodeChange[]) => void) => {
  triggerNodeChanges([{
    type: 'reset',
    item: newNode,
  }]);
};
