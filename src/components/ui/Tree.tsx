import { ChevronRightIcon, StopIcon } from '@heroicons/react/24/solid';
import {
  AccordionContent, AccordionItem, AccordionRoot, AccordionTrigger,
} from 'components/ui/According/main';
import { Button } from 'components/ui/Button';
import { Item, ItemSection } from 'components/ui/Item';
import { Icon } from './Icon';

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
              <Item className="w-full" style={{ paddingLeft: `${1 * level + 0.75}rem` }}>
                <ItemSection>
                  <AccordionTrigger className="transition-transform data-[state=open]:rotate-90" asChild>
                    <Button color="deeper" className="p-[2px]">
                      <Icon size="sm">
                        <ChevronRightIcon />
                      </Icon>
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
            <Item className="w-full" style={{ paddingLeft: `${1 * level + 0.75}rem` }}>
              <ItemSection>
                <Icon size="sm">
                  <StopIcon />
                </Icon>
              </ItemSection>
              <ItemSection>
                {node.label}
              </ItemSection>
            </Item>
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
