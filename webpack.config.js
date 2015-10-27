var path = require('path');
var webpack = require('webpack');
var BowerWebpackPlugin = require("bower-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var config = module.exports = {
  // the base path which will be used to resolve entry points
  context: __dirname,

  // the main entry point for our application's frontend JS
  entry: {
    application: './app/webpack/application.jsx',
  },
};

config.module = {
  loaders: [
    {
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel'
    },

    {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract("css?sourceMap")
    },

    {
      test: /\.less$/,
      loader: ExtractTextPlugin.extract("css?sourceMap!less?sourceMap")
    },

    {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract(
        "css?sourceMap!sass?sourceMap&includePaths[]=" + path.resolve(__dirname, './bower_components')
      )
    },

    // Needed for the css-loader when [bootstrap-webpack](https://github.com/bline/bootstrap-webpack)
    // loads bootstrap's css.
    { test: /\.(woff2?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,    loader: "file?name=[name].[hash].[ext]" },
    { test: /\.(png|jpg|swf)$/,    loader: "file?name=[name].[hash].[ext]" },

    // { test: /\.woff2?(\?v=\d+\.\d+\.\d+)?$/,   loader: "url?limit=10000&minetype=application/font-woff" },
    // { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&minetype=application/octet-stream" },
    // { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,    loader: "file" },
    // { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&minetype=image/svg+xml" }
  ]
};

config.output = {
  // this is our app/assets/javascripts directory, which is part of the Sprockets pipeline
  path: path.join(__dirname, 'app', 'assets', 'bundles'),

  // the filename of the compiled bundle, e.g. app/assets/javascripts/bundle.js
  filename: 'bundle-[name].js',

  // if the webpack code-splitting feature is enabled, this is the path it'll use to download bundles
  // publicPath: '/assets',
};

config.resolve = {
  // tell webpack which extensions to auto search when it resolves modules. With this,
  // you'll be able to do `require('./utils')` instead of `require('./utils.js')`
  extensions: ['', '.js', '.jsx'],
  // by default, webpack will search in `web_modules` and `node_modules`. Because we're using
  // Bower, we want it to look in there too
  modulesDirectories: [ 'node_modules', 'bower_components' ],

  alias: {
    emitter: "emitter-es6/dist/index.js"
  },
};

config.plugins = [
  // we need this plugin to teach webpack how to find module entry points for bower files,
  // as these may not have a package.json file
  // new webpack.ResolverPlugin([
  //   new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main'])
  // ]),resolutionresolution
  new BowerWebpackPlugin(),

  // new webpack.ProvidePlugin({
  //   $: "jquery",
  //   jQuery: 'jquery'
  // })
  new ExtractTextPlugin("bundle-[name].css"),
];


if (process.env.RAILS_ENV == "production") {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
          warnings: false
      }
    })
  )
}


