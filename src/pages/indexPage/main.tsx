import { useAppStore } from 'store/app';
import { shallow } from 'zustand/shallow';
import { Sidebar } from 'pages/indexPage/sidebar/main';

export function IndexPage() {
  const app = useAppStore((state) => ({ left: state.leftSidebar, right: state.rightSidebar }), shallow);
  return (
    <div className="flex h-full w-full flex-nowrap">
      {
        app.left && <Sidebar />
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
