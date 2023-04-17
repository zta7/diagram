import { EllipsisHorizontalIcon } from '@heroicons/react/24/solid';
import { Button } from 'components/ui/Button';
import { Card } from 'components/ui/Card';
import { Icon } from 'components/ui/Icon';
import { Item, ItemSection } from 'components/ui/Item';
import { Popover, PopoverContent, PopoverTrigger } from 'components/ui/Popover';

export function MoreBtn() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="p-[3px]">
          <Icon size="xl">
            <EllipsisHorizontalIcon />
          </Icon>
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Card>
          <Item>
            <ItemSection>123</ItemSection>
            <ItemSection>123</ItemSection>
          </Item>
        </Card>
      </PopoverContent>
    </Popover>
  );
}
