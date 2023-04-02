import { NodeProps } from 'reactflow';
import { BasicNode } from 'components/diagram/nodes/BasicNode';
import { Input } from 'components/ui/Input';

export const InputType = 'Input';

namespace Prop {
  export interface InputData {
    value: string,
  }
  export type InputNode = BasicNode & { data: InputData }
  export type InputProps = NodeProps<InputData>
}

export class InputNode extends BasicNode {
  data: Prop.InputData;

  constructor({ data, ...rest }: Prop.InputNode) {
    super({ ...rest, type: InputType });
    this.data = data;
  }
}

export function InputTemplate({ data }: Prop.InputProps) {
  return (
    <div className=" text-red-600 focus-within:text-red-800">
      <Input value={data.value} />
    </div>
  );
}
