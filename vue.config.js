module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  lintOnSave: true,
  chainWebpack: (config) =>
  {
  },
  configureWebpack: {
    devtool: 'source-map',
    devServer: {
      headers: {
        'Access-Control-Allow-Origin': 'http://127.0.0.1:*'
      }
    }
  }
}
