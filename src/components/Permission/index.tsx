/**
 * @description 用于控制路由的展示 同理也可以控制更细粒度的组件
 */

import { clearRequestListeners } from '@/request';
import { useStore } from '@/store';
import { FC, PropsWithChildren, useLayoutEffect } from 'react';

interface Iprops {
  code?: string;
}

const Permission: FC<PropsWithChildren<Iprops>> = ({ children, code }) => {
  const { userInfo, loading } = useStore();

  useLayoutEffect(() => {
    console.log(11111);
    clearRequestListeners();
  }, []);

  if (!code || userInfo.routerList.includes(code)) {
    return <>{children}</>;
  }
  return <>{loading ? <div>用户信息加载中...</div> : <div>403......</div>}</>;
};

export default Permission;
