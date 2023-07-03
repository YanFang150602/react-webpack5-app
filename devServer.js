const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');

const config = {
  mode: 'development',
  entry: [
    // Runtime code for hot module replacement
    // 'webpack/hot/dev-server.js',
    // Dev server client for web socket transport, hot and live reload logic
    // 'webpack-dev-server/client/index.js?hot=true&live-reload=true',
    // Your entry
    './src/main.js',
  ],
  devtool: 'inline-source-map',
  plugins: [
    // Plugin for hot module replacement
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'Hot Module Replacement',
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  // 设置模块如何被解析
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, './src')
    },
    // 自动解析确定的扩展
    extensions: ['.js', '.jsx', '.less']
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      include: path.resolve(__dirname, './src'),
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader'
      }
    }, {
      test: /\.(less|css)$/,
      use: [{
        loader: 'style-loader'
      }, {
        loader: 'css-loader',
      }, {
        loader: 'less-loader'
      }]
    }, {
      test: /\.(ttf|eot|woff(2)?)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/font/[name].[ext]'
      }
    }, {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      type: 'asset',
      parser: {
        dataUrlCondition: {
          maxSize: 1024 * 200
        }
      },
      generator: {
        filename: 'images/[name]-[hash:8].[ext]'
      }
    }]
  }
};
const compiler = webpack(config);

// `hot` and `client` options are disabled because we added them manually
const server = new webpackDevServer({ hot: false, client: false }, compiler);

(async () => {
  await server.start();
  console.log('dev server is running');
})();
