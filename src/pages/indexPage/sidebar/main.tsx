import { ChevronDoubleLeftIcon } from '@heroicons/react/24/solid';
import { Button } from 'components/ui/Button';
import { Tooltip, TooltipTrigger, TooltipContent } from 'components/ui/Tooltip';
import { Navbar } from 'pages/indexPage/sidebar/Navbar';

export function Sidebar() {
  return (
    <div className="bg-base-100 group/sidebar flex w-[240px] select-none flex-col flex-nowrap">
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
      <Navbar />
    </div>
  );
}
