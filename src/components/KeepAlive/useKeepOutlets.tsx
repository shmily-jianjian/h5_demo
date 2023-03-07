import { useContext } from 'react';
import { matchPath, useLocation, useOutlet } from 'react-router-dom';
import { KeepAliveContext } from './context';

/**
 * @param aliveList 当前配置的需要缓存的路由路径
 * @param path 当前的路径
 * @returns 是否匹配成功
 */
const isKeepPath = (aliveList: (RegExp | string)[], path: string): boolean => {
  let isKeep = false;
  aliveList.map((item) => {
    if (item === path) {
      isKeep = true;
    }
    if (item instanceof RegExp && item.test(path)) {
      isKeep = true;
    }
    if (typeof item === 'string' && item.toLocaleLowerCase() === path) {
      isKeep = true;
    }
  });
  return isKeep;
};

export const useKeepOutlets = () => {
  const location = useLocation();
  // 这个是核心, 通过 useOutlet() 我们能获取到当前的页面(组件)
  const element = useOutlet();
  const { keepalive, keepElements } = useContext(KeepAliveContext);

  const isKeep = isKeepPath(keepalive, location.pathname);
  if (isKeep) {
    // 将页面存在ref上
    keepElements.current[location.pathname] = element;
  }

  return (
    <>
      {Object.entries(keepElements.current).map(([pathname, element]: any) => (
        <div
          style={{
            height: '100%',
            width: '100%',
            position: 'relative',
            overflow: 'hidden auto',
          }}
          key={pathname}
          hidden={!matchPath(location.pathname, pathname)}
        >
          {element}
        </div>
      ))}
      <div
        style={{
          height: '100%',
          width: '100%',
          position: 'relative',
          overflow: 'hidden auto',
        }}
        hidden={isKeep}
      >
        {!isKeep && element}
      </div>
    </>
  );
};
