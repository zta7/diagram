import { XYPosition } from 'reactflow';

// for class validation
interface Prop {
  id: string;
  position: XYPosition;
  type: string
}

export class BasicNode {
  id: string;

  position: XYPosition;

  type: string;

  constructor({ id, position, type }:Prop) {
    this.id = id;
    this.position = position;
    this.type = type;
  }
}
