const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const optimizeCss = require('optimize-css-assets-webpack-plugin');



module.exports = function(env, argv) {
  const prod = env.prod;
  const target = env.target;
  const entry = path.resolve(__dirname, '../', `pages/${target}/src/index.js`);
  const dist = path.resolve(__dirname, '../', 'dist', target);
  const htmlTemplate = path.resolve(__dirname, '../', `pages/${target}/src/index.html`);

  return {
    mode: prod ? 'production' : 'development',
    entry: entry,
    output: {
      path: dist,
      filename: '[name].[hash].js'
    },
    devServer: {
      contentBase: dist
    },
    module: {
      rules: [{
        test: /\.css$/,
        use: [{
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          'css-loader'
        ]
      }, {
        test: /\.(png|svg|jpg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            name: 'img/[name].[hash:8].[ext]',
            limit: 1024
          }
        }]
      }]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash].css'
      }),
      new optimizeCss(),
      new HtmlWebpackPlugin({
        template: htmlTemplate
      })
    ]
  };
}