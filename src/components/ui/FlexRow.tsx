import { ReactNode } from 'react';
import cx from 'classnames';

interface Props {
  className: string,
  children: ReactNode
}

export function FlexRow({ className, children }: Props) {
  return (
    <div
      className={cx(['flex flex-row items-center', className])}
    >
      { children }
    </div>
  );
}
