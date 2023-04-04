import { ViewControl } from 'components/diagram/controls/ViewControl';
import { SelectionControl } from 'components/diagram/controls/SelectionControl';

interface Prop {
  className: string
}

export function Controls({ className }: Prop) {
  return (
    <div className={className}>
      <ViewControl />
      {/* <SelectionControl /> */}
    </div>
  );
}
