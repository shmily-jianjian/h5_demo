/**
 * @description 适配的配置
 * @url https://github.com/evrone/postcss-px-to-viewport/blob/HEAD/README_CN.md
 */

export const adaptationConfig = {
  viewportWidth: 750, // UI设计稿的宽度
  selectorBlackList: ['ignore-'], // 指定不转换为视窗单位的类名，
  mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
  replace: true, // 是否转换后直接更换属性值
  include: /\/src\//, // 如果设置了include，那将只有匹配到的文件才会被转换
  landscape: false, // 是否添加根据 landscapeWidth 生成的媒体查询条件
  landscapeUnit: 'vw', // 横屏时使用的单位
  landscapeWidth: 1125, // 横屏时使用的视窗宽度
};
