import { Button } from 'components/ui/Button';
import { useAppStore } from 'store/app';
import { shallow } from 'zustand/shallow';

export function IndexPage() {
  const app = useAppStore((state) => ({ left: state.leftSidebar, right: state.rightSidebar }), shallow);
  return (
    <div className="flex h-full w-full flex-nowrap">
      {
        app.left && (
        <div className="min-w-[240px] bg-base-100">
          <Button>123</Button>
        </div>
        )
      }
      <div className="grow">
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
