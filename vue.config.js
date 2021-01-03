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

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [resolve('src/styles/variables.scss')],
    },
  },
}
