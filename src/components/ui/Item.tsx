import { classed } from '@tw-classed/react';

export const List = classed.div('flex flex-col flex-nowrap gap-1 p-1');
List.displayName = 'List';

export const Item = classed.div('cursor-pointer w-full hover:bg-base-200 [&:active:not(:has(button:active))]:bg-base-300 flex flex-row flex-nowrap px-3 py-1 items-center', {
  variants: {
    square: {
      true: 'rounded-none',
      false: 'rounded',
    },
    active: {
      true: 'bg-base-300',
      false: '',
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

export const ItemSection = classed.div('first:mr-2', {
  variants: {
    variant: {
      side: 'items-end pl-4 text-xs text-base-400 font-light',
    },
  },
  // defaultVariants: {
  //   square: false,
  // },
});

ItemSection.displayName = 'ItemSection';
