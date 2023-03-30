import { Node } from 'reactflow';

export type BasicNodeProp = Partial<Node>

export class BasicNode {
  constructor({ id, ...rest }: BasicNodeProp) {
    Object.assign(this, {
      ...rest,
      id: id === undefined ? `${Math.random()}` : id,
    });
  }
}
