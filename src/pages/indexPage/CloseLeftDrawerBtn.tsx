import { ChevronDoubleLeftIcon } from '@heroicons/react/24/solid';
import { Button } from 'components/ui/Button';
import { Icon } from 'components/ui/Icon';
import { Tooltip, TooltipContent, TooltipTrigger } from 'components/ui/Tooltip/main';

export function CloseLeftDrawerBtn() {
  return (
    <Tooltip>
      <TooltipTrigger>
        <Button className="p-[3px] opacity-0 transition-opacity group-hover/sidebar:opacity-100" color="deeper">
          <Icon size="xl">
            <ChevronDoubleLeftIcon />
          </Icon>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <div className="text-base-50">Close sidebar</div>
        <div className="text-base-400">Ctrl+\</div>
      </TooltipContent>
    </Tooltip>
  );
}
