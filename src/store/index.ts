import create from 'zustand';
// 调用redux的浏览器插件
import { devtools } from 'zustand/middleware';
import { GlobalProps, globalStore } from './globalStore';
import { HomeProps, homeStore } from './homeStore';

export const useStore = create<GlobalProps & HomeProps>()(
  devtools((...arg) => ({
    ...globalStore(...arg),
    ...homeStore(...arg),
  }))
);
