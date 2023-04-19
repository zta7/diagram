import { useAppStore } from 'store/app';
import { shallow } from 'zustand/shallow';
import { Sidebar } from 'pages/indexPage/leftDrawer/main';
import { MoreBtn } from 'pages/indexPage/MoreBtn';
import { Option, Select } from 'components/ui/Select/main';

export function IndexPage() {
  const { left, right } = useAppStore((state) => ({ left: state.leftSidebar, right: state.rightSidebar }), shallow);
  return (
    <div className="flex h-full w-full shrink-0 flex-nowrap">
      {
        left && <Sidebar />
      }
      <div className="bg-base-50 grow">
        <div className="flex h-11 flex-nowrap items-center justify-between px-4">
          <div>
            <Select type="multiple" value={[1, 2, 3]}>
              {/* <Option>123</Option>
              <Option>123</Option>
              <Option>123</Option>
              <Option>123</Option> */}
            </Select>
          </div>
          <div>
            <MoreBtn />
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
