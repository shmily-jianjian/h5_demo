// declare module '*.svg' {
//    const content: React.FC<React.SVGProps<SVGElement>>
//    export default content
//  }

/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  // 更多环境变量...
  // 可以获得ts提示当使用 import.meta.env. 的时候
  readonly VITE_APP_NAME: string;
}
