import {
  AccordionContent, AccordionItem, AccordionRoot, AccordionTrigger,
} from 'components/ui/According/index';
import { Button } from 'components/ui/Button';
import { Tooltip, TooltipContent, TooltipTrigger } from 'components/ui/Tooltip';
import { useAppStore } from 'store/app';
import { shallow } from 'zustand/shallow';
import { ChevronDoubleLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

export function IndexPage() {
  const app = useAppStore((state) => ({ left: state.leftSidebar, right: state.rightSidebar }), shallow);
  return (
    <div className="flex h-full w-full flex-nowrap">
      {
        app.left && (
        <div className="bg-base-100 group/sidebar w-[240px] select-none">
          <Button square className="group h-11 w-full px-4" as="div">
            <div className="grow overflow-hidden font-bold">Welcome</div>
            <Tooltip placement="bottom">
              <TooltipTrigger>
                <Button className="hover:bg-base-300 [&:active:not(:has(button:active))]:bg-base-400 opacity-0 transition-opacity group-hover/sidebar:opacity-100" icon as="div">
                  <ChevronDoubleLeftIcon className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <div className="text-base-50">Close sidebar</div>
                <div className="text-base-400">Ctrl+\</div>
              </TooltipContent>
            </Tooltip>
          </Button>
          <div className="px-1">
            <AccordionRoot type="multiple">
              <AccordionItem value="1">
                <Button className="w-full" as="div">
                  <AccordionTrigger className="h-3 w-3 transition-transform data-[state=open]:rotate-90">
                    <Button as="div" icon>
                      <ChevronRightIcon />
                    </Button>
                  </AccordionTrigger>
                  <span>label</span>
                </Button>
                <AccordionContent>
                  <Button className="w-full" as="div">123</Button>
                </AccordionContent>
              </AccordionItem>
            </AccordionRoot>
          </div>
        </div>
        )
      }
      <div className="bg-base-50 grow">
        456
      </div>
      {
        app.right && (
        <div>
          789
        </div>
        )
      }
    </div>
  );
}
