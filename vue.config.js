const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  configureWebpack: {
    devtool: 'source-map',
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      modules: [resolve('src')],
    },
  },
}
