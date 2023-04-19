import { Cog8ToothIcon } from '@heroicons/react/24/solid';
import { Icon } from 'components/ui/Icon';
import { Item, ItemSection, List } from 'components/ui/Item';
import { Navbar } from 'pages/indexPage/leftDrawer/Navbar';
import { CloseLeftDrawerBtn } from '../CloseLeftDrawerBtn';

export function Sidebar() {
  return (
    <div className="bg-base-100 group/sidebar flex w-[240px] flex-col flex-nowrap">
      <Item square className="h-11 shrink-0">
        <ItemSection className="grow overflow-hidden font-bold">Welcome</ItemSection>
        <ItemSection>
          <CloseLeftDrawerBtn />
        </ItemSection>
      </Item>
      <List className="mb-4 shrink-0 px-1">
        <Item>
          <ItemSection>
            <Icon size="lg">
              <Cog8ToothIcon />
            </Icon>
          </ItemSection>
          <ItemSection>Settings</ItemSection>
        </Item>
      </List>
      <Navbar />
    </div>
  );
}
