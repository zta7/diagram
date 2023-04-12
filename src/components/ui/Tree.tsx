import { ChevronRightIcon } from '@heroicons/react/24/solid';
import {
  AccordionContent, AccordionItem, AccordionRoot, AccordionTrigger,
} from 'components/ui/According/main';
import { Button } from 'components/ui/Button';

type TreeNode = {
  id: string
  label: string
  children?: Array<{
    id: string
    label: string
  }>
 }

function Node({ node }: {node: TreeNode}) {
  return (
    <div>
      {
        node.children && node.children.length > 0
          ? (
            <AccordionItem value={node.id}>
              <Button className="w-full" as="div">
                <AccordionTrigger className="transition-transform data-[state=open]:rotate-90">
                  <Button as="div" icon className="hover:bg-base-300 [&:active:not(:has(button:active))]:bg-base-400 h-4 w-4">
                    <ChevronRightIcon />
                  </Button>
                </AccordionTrigger>
                <span>{node.label}</span>
              </Button>
              <AccordionContent>
                {
                  node.children.map((e) => <Node node={e} key={e.id} />)
                }
              </AccordionContent>
            </AccordionItem>
          ) : (
            <Button className="w-full" as="div">
              <div className="h-4 w-4 text-center text-xl leading-3">·</div>
              <span>{node.label}</span>
            </Button>
          )
      }
    </div>
  );
}

export function Tree({ data } : { data: Array<TreeNode> }) {
  return (
    <AccordionRoot type="multiple">
      {
        data.map((e) => (
          <Node
            node={e}
            key={e.id}
          />
        ))
      }
    </AccordionRoot>
  );
}
