const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackObfuscator = require('webpack-obfuscator')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = (env, argv) => {
  let plugins = [
    new CleanWebpackPlugin(['dist']),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      'title': 'Logifx',
      filename: 'client/client.html',
    })
  ]
  if (argv.mode === 'production') {
    const obfuscator = new WebpackObfuscator({
      rotateUnicodeArray: true
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
      'main': './src/main.js',
      'client/client': './src/client/client.js'
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist')
    },
    plugins: plugins,
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [{
            loader: 'babel-loader?cacheDirectory',
          }]
        },
        {
          test: /\.s[ac]ss$/,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: [
                  require('autoprefixer')({grid: true})
                ]
              },
            },
            'sass-loader'
          ],
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 100 * 1024,
                name: 'img/js/[name].[ext]'
              }
            }
          ]
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.vue'],
      alias: {
        vue$: 'vue/dist/vue.esm.js',
      },
    }
  }
}
