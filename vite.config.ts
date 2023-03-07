import react from '@vitejs/plugin-react';
import path from 'path';
import postcssPxToViewport from 'postcss-px-to-viewport-8-plugin';
import Unocss from 'unocss/vite';
import { defineConfig, loadEnv, mergeConfig } from 'vite';
import { adaptationConfig } from './config/adaptation';
// 当你使用了 legacy 时候需要下载 terser
import legacy from '@vitejs/plugin-legacy';

export default defineConfig(async ({ mode, command }) => {
  // mode: 开发模式还是生产模式 development | production ｜ 自己自定义的mode
  // command: serve(开发) | build(生产)

  const config = mergeConfig(
    {
      name: 'jianjian',
    },
    {
      name2: 'xiaojin',
    }
  );

  console.log(mode);
  console.log(command);

  const root = process.cwd();
  const env = loadEnv(mode, root);
  console.log(env);

  // if (command === 'serve') {
  //   return {
  //     // dev 独有配置
  //   }
  // } else {
  //   // command === 'build'
  //   return {
  //     // build 独有配置
  //   }
  // }
  // 根据不同的mode 和 command 可以去读区不同的 .env.xxx的环境变量 以及 去加载不同的vite配置

  return {
    plugins: [
      react(),
      legacy({
        targets: ['ie >= 11'],
        additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
      }),
      Unocss(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    css: {
      postcss: {
        plugins: [postcssPxToViewport({ ...adaptationConfig })],
      },
    },
    server: {
      host: '0.0.0.0',
      // https://i.maoyan.com/api/mmdb/movie/v3/list/hot.json?ct=%E6%B7%B1%E5%9C%B3&ci=30&channelId=4
      proxy: {
        '/api': {
          target: 'https://i.maoyan.com/api/mmdb/movie',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    esbuild: {
      // 可以帮我们全局导入一些配置
      // jsxInject: `import { Button } from 'antd-mobile'`,
    },
    build: {
      // 默认为true, vite会自动将一个异步 chunk(js文件) 模块中使用到的 CSS 代码抽取出来并为其生成一个单独的文件。也就是说会把我们写的css和插件的css打包成两个css文件
      // 设置为false的话，vite会将我们用到的css打包到一起只有一个单独的css文件
      // 最好使用默认配置 false
      cssCodeSplit: true,
      rollupOptions: {
        // https://rollupjs.org/guide/en/#big-list-of-options
      },
      // 启用/禁用 gzip 压缩大小报告。压缩大型输出文件可能会很慢，因此禁用该功能可能会提高大型项目的构建性能。 自测没反应～～
      reportCompressedSize: false,
    },

    // optimizeDeps: {
    //   esbuildOptions: {},
    // },
  };
});
