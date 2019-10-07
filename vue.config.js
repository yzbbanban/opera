module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  devServer: {
    open: true,
    host: '0.0.0.0',
    port: 2222,
    hot: true,
    hotOnly: true,
    // 代理
    proxy: {
      '/myApi': {
        target: '线下',
        changeOrigin: true,
        pathRewrite: {
          '^/myApi': ''
        }
      }
    }
  },
  css: {
    loaderOptions: {
      // 给 sass-loader 传递选项
      sass: {
        // @/ 是 src/ 的别名
        // 所以这里假设你有 `src/variables.scss` 这个文件
        data: `@import "@/styles/index.scss";`
      }
    }
  }
}
