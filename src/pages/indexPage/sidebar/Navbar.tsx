import { ChevronRightIcon } from '@heroicons/react/24/solid';
import {
  AccordionRoot, AccordionItem, AccordionTrigger, AccordionContent, AccordionHeader,
} from 'components/ui/According/main';
import { Button } from 'components/ui/Button';
import { Tree } from 'components/ui/Tree';

export function Navbar() {
  const data = Array.from({ length: 2 }, (e, i) => ({
    id: `${i}`,
    label: `${i}`,
    children: Array.from({ length: 2 }, (e2, i2) => ({
      id: `${i}.${i2}`,
      label: `${i}.${i2}`,
      children: Array.from({ length: 2 }, (e3, i3) => ({
        id: `${i}.${i2}.${i3}`,
        label: `${i}.${i2}.${i3}`,
      })),
    })),
  }));

  return (
    <div className="overflow-y-scroll px-1">
      <Tree data={data} />
    </div>
  );
}
