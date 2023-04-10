import { Button } from 'components/ui/Button';
import { FlexRow } from 'components/ui/FlexRow';
import { useAppStore } from 'store/app';
import { shallow } from 'zustand/shallow';

export function IndexPage() {
  const app = useAppStore((state) => ({ left: state.leftSidebar, right: state.rightSidebar }), shallow);
  return (
    <div className="flex h-full w-full flex-nowrap">
      {
        app.left && (
        <div className="bg-base-100 min-w-[240px]">
          <Button className="h-8 w-full">123</Button>
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
