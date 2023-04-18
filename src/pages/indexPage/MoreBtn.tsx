import { ChevronRightIcon, EllipsisHorizontalIcon, SwatchIcon } from '@heroicons/react/24/outline';
import { Button } from 'components/ui/Button';
import { Card } from 'components/ui/Card';
import { Menu, MenuItem } from 'components/ui/DropdownMenu/main';
import { Icon } from 'components/ui/Icon';
import { Item, ItemSection } from 'components/ui/Item';
import { Popover, PopoverContent, PopoverTrigger } from 'components/ui/Popover';

export function MoreBtn() {
  return (
    <Popover>
      <PopoverTrigger>
        <Button className="p-[3px]">
          <Icon size="xl">
            <EllipsisHorizontalIcon />
          </Icon>
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        123
      </PopoverContent>
    </Popover>
  );
}
