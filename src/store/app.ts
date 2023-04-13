import { create } from 'zustand';

export const useAppStore = create(() => ({
  leftSidebar: true,
  rightSidebar: true,
}));
