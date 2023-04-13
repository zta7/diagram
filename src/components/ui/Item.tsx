import { classed } from '@tw-classed/react';

export const List = classed.div();
List.displayName = 'List';

export const Item = classed.div('cursor-pointer w-full hover:bg-base-200 [&:active:not(:has(button:active))]:bg-base-300 flex flex-row flex-nowrap px-3 py-1 items-center', {
  variants: {
    square: {
      true: 'rounded-none',
      false: 'rounded',
    },
    // icon: {
    //   md: 'w-4 h-4 px-[2px] py-[2px]',
    //   lg: 'w-7 h-7 px-[3px] py-[3px]',
    //   // true: 'px-[2px] py-[2px]',
    //   false: 'px-2 py-1 flex items-center flex-nowrap',
    // },
    // color: {
    //   base: 'hover:bg-base-200 [&:active:not(:has(button:active))]:bg-base-300',
    //   deeper: 'hover:bg-base-300 [&:active:not(:has(button:active))]:bg-base-400',
    // },
  },
  defaultVariants: {
    square: false,
    // icon: false,
    // color: 'base',
  },
});

Item.displayName = 'Item';

export const ItemSection = classed.div('first:pr-2 [:not(:nth-child(2)):last]:pl-2', {
  variants: {
    variant: {
      avatar: '[&:svg]:w-4',
      side: '',
    },
  },
  // defaultVariants: {
  //   square: false,
  // },
});

ItemSection.displayName = 'ItemSection';
