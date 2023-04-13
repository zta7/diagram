import { ChevronDoubleLeftIcon, Cog8ToothIcon } from '@heroicons/react/24/solid';
import { Button } from 'components/ui/Button';
import { Item, ItemSection, List } from 'components/ui/Item';
import { Tooltip, TooltipTrigger, TooltipContent } from 'components/ui/Tooltip';
import { Navbar } from 'pages/indexPage/leftSidebar/Navbar';

export function Sidebar() {
  return (
    <div className="bg-base-100 group/sidebar flex w-[240px] select-none flex-col flex-nowrap">
      <Item square className="h-11 shrink-0">
        <ItemSection className="grow overflow-hidden font-bold">Welcome</ItemSection>
        <ItemSection>
          <Button className="opacity-0 transition-opacity group-hover/sidebar:opacity-100" icon="lg" color="deeper">
            <ChevronDoubleLeftIcon />
          </Button>
        </ItemSection>
        {/* <Tooltip placement="bottom">
          <TooltipTrigger>
            <ItemSection>
              <Button className="opacity-0 transition-opacity group-hover/sidebar:opacity-100" icon="lg" as="div" color="deeper">
                <ChevronDoubleLeftIcon />
              </Button>
            </ItemSection>
          </TooltipTrigger>
          <TooltipContent>
            <div className="text-base-50">Close sidebar</div>
            <div className="text-base-400">Ctrl+\</div>
          </TooltipContent>
        </Tooltip> */}
      </Item>
      <List className="mb-4 shrink-0">
        <Item className="px-2">
          <ItemSection variant="avatar">
            <Cog8ToothIcon />
          </ItemSection>
          <ItemSection>Settings</ItemSection>
        </Item>
      </List>
      <Navbar />
    </div>
  );
}
