import { Node, NodeProps } from 'reactflow';
import { BasicNode } from 'components/diagram/nodes/BasicNode';
import { Input } from 'components/ui/Input';

export const InputType = 'Input';

namespace Prop {
  export interface InputData {
    value: string,
  }
  export type InputNode = Node<InputData>
  export type InputProps = NodeProps<InputData>
}

export class InputNode extends BasicNode {
  data: Prop.InputData;

  constructor({ id, data, position }: Prop.InputNode) {
    super({ id, position, type: InputType });
    this.data = data;
  }
}

export function InputTemplate({ data }: Prop.InputProps) {
  return (
    <div>
      <Input value={data.value} />
    </div>
  );
}
