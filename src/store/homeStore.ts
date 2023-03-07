/**
 * @description 存放首页的数据
 */

import type { StateCreator } from 'zustand';

type HandleType = 'add' | 'reduce';

export interface HomeProps {
  count: number;
  changeCount: (type: HandleType) => void;
}

export const homeStore: StateCreator<
  HomeProps,
  [['zustand/devtools', never]],
  [],
  HomeProps
> = (set) => ({
  count: 0,
  changeCount: (type) => {
    if (type === 'add') {
      set((state) => ({ count: state.count + 1 }));
    } else {
      set((state) => ({ count: state.count - 1 }));
    }
  },
});
