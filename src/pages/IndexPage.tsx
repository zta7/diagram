import { Button } from 'components/ui/Button';
import { useAppStore } from 'store/app';
import { shallow } from 'zustand/shallow';

export function IndexPage() {
  const app = useAppStore((state) => ({ left: state.leftSidebar, right: state.rightSidebar }), shallow);
  return (
    <div className="flex h-full w-full flex-nowrap">
      {
        app.left && (
        <div className="bg-base-100 w-[240px]">
          <Button square className="[&:active:not(:has(button:active))]:bg-base-300 flex h-8 w-full flex-nowrap items-center justify-between" as="div">
            {/* <FlexRow className="h-8 w-full"> */}
            <div className="overflow-hidden">Labelllll...............................LabelllllLabelllllLabelllllLabelllllLabelllllLabelllllLabelllll</div>
            <Button className="hover:bg-base-300 active:bg-base-400" icon>TT</Button>
            {/* </FlexRow> */}
          </Button>
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
