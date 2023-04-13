import { ChevronRightIcon } from '@heroicons/react/24/solid';
import {
  AccordionContent, AccordionItem, AccordionRoot, AccordionTrigger,
} from 'components/ui/According/main';
import { Button } from 'components/ui/Button';
import { Item, ItemSection } from './Item';

type TreeNode = {
  id: string
  label: string
  children?: Array<{
    id: string
    label: string
  }>
 }

function Node({ node, level }: {node: TreeNode, level: number}) {
  return (
    <div>
      {
        node.children && node.children.length > 0
          ? (
            <AccordionItem value={node.id}>
              <Item className="w-full" as="div">
                {/* <div style={{ width: `${1 * level}rem` }} /> */}
                <ItemSection variant="avatar">
                  <AccordionTrigger className="transition-transform data-[state=open]:rotate-90">
                    <Button color="deeper" icon as="div">
                      <ChevronRightIcon />
                    </Button>
                  </AccordionTrigger>
                </ItemSection>
                <ItemSection>{node.label}</ItemSection>
              </Item>
              <AccordionContent>
                {
                  node.children.map((e) => <Node node={e} key={e.id} level={level + 1} />)
                }
              </AccordionContent>
            </AccordionItem>
          ) : (
            <Button className="w-full" as="div">
              {/* <div style={{ width: `${1 * level}rem` }} /> */}
              <div className="mr-2 h-4 w-4 text-center font-semibold leading-4">·</div>
              <span>{node.label}</span>
            </Button>
          )
      }
    </div>
  );
}

export function Tree({ data, className } : { data: Array<TreeNode>, className: string }) {
  return (
    <AccordionRoot type="multiple" className={className}>
      {
        data.map((e) => (
          <Node
            node={e}
            key={e.id}
            level={0}
          />
        ))
      }
    </AccordionRoot>
  );
}
