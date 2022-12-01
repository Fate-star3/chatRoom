module.exports = {
  plugins: [
    require('autoprefixer'),
    require('postcss-plugin-px2rem')({
      rootValue: 37.5, // 换算基数，1rem相当于10px,值为37.5时,1rem为20px,淘宝的flex默认为1rem为10px
      unitPrecision: 2, // 允许REM单位增长到的十进制数字。
      propBlackList: [], // 黑名单
      exclude: /(node_module)/, // 默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)\/如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
      mediaQuery: false, // （布尔值）允许在媒体查询中转换px。
      minPixelValue: 3 // 设置要替换的最小像素值(3px会被转rem)。
    })
  ]
}
