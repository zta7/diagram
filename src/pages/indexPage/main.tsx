import { useAppStore } from 'store/app';
import { shallow } from 'zustand/shallow';
import { Sidebar } from 'pages/indexPage/leftSidebar/main';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/solid';
import { Button } from 'components/ui/Button';
import { Icon } from 'components/ui/Icon';

export function IndexPage() {
  const { left, right } = useAppStore((state) => ({ left: state.leftSidebar, right: state.rightSidebar }), shallow);
  return (
    <div className="flex h-full w-full shrink-0 flex-nowrap">
      {
        left && <Sidebar />
      }
      <div className="bg-base-50 grow">
        <div className="flex h-11 flex-nowrap items-center justify-between px-4">
          <div>😊</div>
          <div>
            <Button className="p-[3px]">
              <Icon size="xl">
                <EllipsisHorizontalIcon />
              </Icon>
            </Button>
          </div>
        </div>
      </div>
      {
        right && (
        <div className="bg-base-50">
          7891231
        </div>
        )
      }
    </div>
  );
}
