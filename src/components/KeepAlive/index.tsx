import React, { FC, PropsWithChildren, useRef } from 'react';
import { KeepAliveContext } from './context';
import type { KeepAliveProps } from './context';

const KeepAlive: FC<PropsWithChildren<KeepAliveProps>> = (props) => {
  const { keepalive, children, ...others } = props;
  // 存储缓存的页面
  const keepElements = useRef<any>({});
  // 清除缓存页面
  const removeCache = (path: string) => (keepElements.current[path] = null);

  return (
    <KeepAliveContext.Provider
      value={{
        keepalive,
        keepElements,
        removeCache,
        ...others,
      }}
    >
      {children}
    </KeepAliveContext.Provider>
  );
};

export default KeepAlive;
