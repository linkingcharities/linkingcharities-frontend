var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');

module.exports = {
  /*
   Splitting the application into 3 bundles
   polyfills - the standard polyfills we require to run Angular applications in most modern browsers.
   vendor - the vendor files we need: Angular, lodash, bootstrap.css...
   app - our application code.
   */
  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'app': './src/main.ts'
  },

  /*
   Webpack will only resolve these files
   */
  resolve: {
    extensions: ['', '.js', '.ts']
  },

  /*
   Loaders
   ts - a loader to transpile our Typescript code to ES5, guided by the tsconfig.json file
   angular2-template-loader - loads angular components' template and styles
   html - for component templates
   images/fonts - Images and fonts are bundled as well.
   css - The pattern matches application-wide styles; the second handles component-scoped styles (the ones specified in a component's styleUrls metadata property)
   */
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loaders: ['awesome-typescript-loader', 'angular2-template-loader']
      },
      {
        test: /\.html$/,
        loader: 'html'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file?name=assets/[name].[hash].[ext]'
      },
      {
        test: /\.css$/,
        exclude: helpers.root('src', 'app'),
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
      },
      {
        test: /\.css$/,
        include: helpers.root('src', 'app'),
        loader: 'raw'
      }
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),

    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),

    new webpack.ProvidePlugin({
      $: "jquery",
      jquery: "jquery",
      jQuery: "jquery",
      "windows.jQuery": "jquery"
    })
  ]
};
