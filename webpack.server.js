const path = require('path')
const WebpackObfuscator = require('webpack-obfuscator')

module.exports = (env, argv) => {
  let plugins = [
  ]
  if (argv.mode === 'production') {
    const obfuscator = new WebpackObfuscator({
      rotateUnicodeArray: false
    })
    plugins.push(obfuscator)
  }
  return {
    target: 'node',
    node: {
      __dirname: false,
      __filename: false,
    },
    entry: {
      'main': './src/main.js'
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist')
    },
    plugins: plugins,
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [{
            loader: 'babel-loader?cacheDirectory',
          }]
        }
      ]
    }
  }
}
