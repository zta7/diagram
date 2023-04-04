import {
  useOnSelectionChange, OnSelectionChangeParams, Node, useStoreApi, NodeRemoveChange, NodeAddChange,
} from 'reactflow';
import {
  MdDelete, MdOutlineControlPointDuplicate,
} from 'react-icons/md';
import { Button } from 'components/ui/Button';
import { useState } from 'react';

export function SelectionControl() {
  const { triggerNodeChanges } = useStoreApi().getState();
  const [selection, setSelection] = useState<OnSelectionChangeParams | null>(null);

  useOnSelectionChange({
    onChange(params: OnSelectionChangeParams) {
      setSelection(params);
    },
  });

  const onDelete = () => {
    console.log(selection);
    if (selection) {
      const changes: Array<NodeRemoveChange> = [...selection.nodes].map((e: Node) => ({ id: e.id, type: 'remove' }));
      triggerNodeChanges(changes);
    }
  };
  const onClone = () => {
    // evt.stopPropagation();
    if (selection) {
      const changes: Array<NodeAddChange> = selection.nodes.map((e: Node) => ({
        item: {
          id: `${Math.random()}`,
          position: { x: e.position.x + 15, y: e.position.y + 15 },
          type: e.type,
          data: { ...e.data },
        },
        type: 'add',
      }));
      triggerNodeChanges(changes);
    }
  };
  return (
    <>
      <Button onClick={onDelete}><MdDelete /></Button>
      <Button onClick={onClone}><MdOutlineControlPointDuplicate /></Button>
    </>
  );
}
