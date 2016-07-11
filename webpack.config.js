var path = require('path');
var webpack = require('webpack');
var SRC_PATH = path.resolve(__dirname, 'src');
var DIST_PATH = path.resolve(__dirname, 'static');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var IS_DEV = process.env.NODE_ENV !== 'production';

var autoprefixer = require('autoprefixer');
var precss = require('precss');

// production add hash
// hash bug see https://github.com/webpack/webpack/issues/1315
var FILE_HASH_TAG = IS_DEV ? '' : '_[hash:5]';
var CHUNK_FILE_HASH_TAG = IS_DEV ? '' : '_[chunkhash:5]';

var plugins = [
  new HtmlWebpackPlugin({
    inject: true,
    filename: 'index.html',
    template: path.join(SRC_PATH, 'index.html'),
    chunks: ['common', 'vendor', 'index'] // todo: fix duplicate common.js here
  }),
  new ExtractTextPlugin('css/[name]' + FILE_HASH_TAG + '.css', {allChunks: true}),
  new webpack.optimize.CommonsChunkPlugin(
      'vendor',
      'vendor.v20160303.js', // vendor date

      Infinity
  ),
  new webpack.DefinePlugin({
    'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development') }
  })
];

module.exports = {
  entry: {
    index: path.join(SRC_PATH, 'index.js'),
    vendor: [
      'react', 'react-redux', 'react-router', 'react-router-redux', 'react-dom', 'react-bootstrap',
      'redux', 'redux-form', 'redux-actions', 'redux-async', 'redux-thunk',
      'lodash', 'classnames', 'querystring',
      // For echarts
      'echarts/lib/echarts',
      'echarts/lib/chart/bar'
    ],
    // common style
    common: path.join(SRC_PATH, 'layouts/css/common.less'),

  },
  output: {
    path: DIST_PATH,
    publicPath: '',
    filename: 'js/[name]' + CHUNK_FILE_HASH_TAG + '.js',
    chunkFilename: `js/[name].js`
  },
  module: {
    loaders: [
      {test: /\.jsx?$/, exclude: /node_modules/, loaders: ['react-hot', 'babel-loader']},
      {test: /\.json$/, loader: 'json-loader'},
      // {
      //   test: /\.jsx?$/,
      //   loader: "babel",
      //   exclude: /node_modules/,
      //   query: {
      //     plugins: ['transform-runtime', ["antd", {"style": false}]],
      //     presets: ['es2015', 'react', 'stage-0']
      //   }
      // },

      // less url import issue
      // see:https://github.com/webpack/css-loader/issues/74
      // rewrite the publickPath of url
      // https://github.com/webpack/extract-text-webpack-plugin
      {
        test: /\.less$/,
        include: /src(\\|\/)(containers|components)/,
        loader: ExtractTextPlugin.extract(
            'style',
            'css?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!' +
            'postcss!' +
            'less?outputStyle=expanded&sourceMap&sourceMapContents'
            , {publicPath: '../'})
      },
      {
        test: /\.less$/,
        include: /src(\\|\/)layouts/,
        loader: ExtractTextPlugin.extract(
            'style',
            'css?sourceMap!' +
            'postcss!' +
            'less?outputStyle=expanded&sourceMap&sourceMapContents'
            , {publicPath: '../'})
      },
      // css
      {
        test: /\.css$/,
        include: /src/,
        loader: ExtractTextPlugin.extract(
            'style',
            'postcss!' +
            'css?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
            , {publicPath: '../'})
      },
      {
        test: /\.css$/,
        exclude: /src/,
        loader: 'style!css'
      },

      // images
      {test: /\.(png|gif|jpg|ico)$/, loader: 'url?limit=1024&name=img/[name]' + FILE_HASH_TAG + '.[ext]'},

      // font
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=1000&mimetype=application/font-woff&name=font/[name]' + FILE_HASH_TAG + '.[ext]'},
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=1000&mimetype=application/font-woff&name=font/[name]' + FILE_HASH_TAG + '.[ext]'},
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=1000&mimetype=application/octet-stream&name=font/[name]' + FILE_HASH_TAG + '.[ext]'},
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file?name=font/[name]' + FILE_HASH_TAG + '.[ext]'},
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=1000&mimetype=image/svg+xml&name=font/[name]' + FILE_HASH_TAG + '.[ext]'}
    ]
  },

  postcss: function () {
    return {
      defaults: [precss, autoprefixer],
      cleaner:  [autoprefixer({ browsers: ['last 4 versions'] })]
    };
  },
  externals:{

  },

  plugins: plugins,
  devServer: {
    hot: true,
    inline: true,
    // api proxy
    proxy: {

      '/cms/categorySource/*': {
        target: 'http://172.26.50.68:8091',
        // target: 'http://172.26.50.68:8080',
        //target: 'http://127.0.0.1:2618',
        secure: false
      },
      '/cms/source/*': {
        target: 'http://172.26.50.68:8091',
        // target: 'http://172.26.50.68:8080',
        //target: 'http://127.0.0.1:2618',
        secure: false
      },
      '/cms/push/*': {
        target: 'http://172.26.50.68:8091',
        // target: 'http://172.26.50.68:8080',
        // target: 'http://127.0.0.1:2618',
        secure: false
      },
      '/cms/topSource/*': {
        target: 'http://172.26.50.68:8091',
        //target: 'http://127.0.0.1:2618',
        secure: false
      },
      '/cms/content/*': {
        target: 'http://172.26.50.68:8091',
        //target: 'http://127.0.0.1:2618',
        secure: false
      }
      ,
      '/cms/apk/*': {
        target: 'http://172.26.50.68:8091',
        // target: 'http://127.0.0.1:2618',
        secure: false
      }
      ,
      '/cms/file/*': {
        target: 'http://172.26.50.68:8091',
        //target: 'http://127.0.0.1:2618',
        secure: false
      },
      '/boss/*': {

        // target: 'http://127.0.0.1:8080',
        target: 'http://172.26.50.66:8080',

        // target: 'http://usercare-test.tclclouds.com',
        secure: false
      }

    }
  }
};