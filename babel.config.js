// module.exports = {
//   presets: ['@vue/cli-plugin-babel/preset'],
// }
// 使用babel-polyfill兼容低版本浏览器
module.exports = {
  presets: [
    // "@vue/cli-plugin-babel/preset" //原始内容
    [
      '@vue/cli-plugin-babel/preset',
      {
        useBuiltIns: 'entry', //新增修改内容
      },
    ],
  ],
}
