/**
 * @description 存放全局共用的数据
 */

import type { StateCreator } from 'zustand';

// 模拟异步请求
export function requestData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          userInfo: {
            name: 'jianjian123',
            age: 12,
            routerList: ['home'],
          },
        },
      });
    }, 2000);
  });
}

export interface GlobalProps {
  userInfo: {
    name: string;
    age: number;
    routerList: string[];
  };
  loading?: boolean;
  requestUserInfo: () => Promise<void>;
  modifyUserInfo: () => void;
}

export const globalStore: StateCreator<
  GlobalProps,
  [['zustand/devtools', never]],
  [],
  GlobalProps
> = (set) => ({
  userInfo: {
    name: 'jianjian',
    age: 23,
    routerList: [],
  },
  loading: false,
  modifyUserInfo: () =>
    set((state) => ({
      userInfo: {
        name: 'xiaojin',
        age: state.userInfo.age + (Math.random() + 10),
        routerList: ['list', 'home'],
      },
    })),
  // 异步方法
  requestUserInfo: async () => {
    set({ loading: true });
    const res: any = await requestData();
    set({ userInfo: res.data.userInfo, loading: false });
  },
});
