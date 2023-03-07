import { createContext } from 'react';

export interface KeepAliveProps {
  keepalive: (RegExp | string)[];
  keepElements?: any;
  removeCache?: (path: string) => void;
}

export const KeepAliveContext = createContext<KeepAliveProps>({
  keepalive: [],
  keepElements: {},
});
