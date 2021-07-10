const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./client/index.js", 

    output: {
        path: path.resolve(__dirname, "build"),
        filename: "bundle.js",
    },

    mode: 'development',
  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
      },
      {
        test: /\.css$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
        type: 'asset/inline',
      },
    ],
  },
  
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/index.html',
    }),
  ],

  resolve: {
    extensions: ['.js', '.jsx'],
  },


  devServer: {
    publicPath: '/build',
    contentBase: path.resolve(__dirname, './client/'),

    historyApiFallback: true,

    proxy: {
      '/api': 'http://localhost:3000',
    },
  }
}