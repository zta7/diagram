import ScrollArea from 'components/ui/ScrollArea';
import { Tree } from 'components/ui/Tree';

export function Navbar() {
  const data = Array.from({ length: 10 }, (e, i) => ({
    id: `${i}`,
    label: `${i}`,
    children: Array.from({ length: 10 }, (e2, i2) => ({
      id: `${i}.${i2}`,
      label: `${i}.${i2}`,
      children: Array.from({ length: 10 }, (e3, i3) => ({
        id: `${i}.${i2}.${i3}`,
        label: `${i}.${i2}.${i3}`,
      })),
    })),
  }));

  return (
    <ScrollArea className="min-h-0 grow">
      <Tree data={data} className="px-1" />
    </ScrollArea>
  );
}
