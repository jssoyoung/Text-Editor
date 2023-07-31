const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // Generates HTML
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'JATE'
      }),

      // Service Worker
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }),

      // Manifest.json
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'My Progressive Web App',
        short_name: 'MyPWA',
        description: 'Text Editor Progressive Web App',
        background_color: '#ffffff',
        crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
        start_url: './',
        publicPath: "./",   
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
            destination: path.join('assets', 'icons'),
          },
          // {
          //   src: path.resolve('src/images/logo.png'),
          //   size: '1024x1024' // you can also use the specifications pattern
          // },
          // {
          //   src: path.resolve('src/images/logo.png'),
          //   size: '1024x1024',
          //   purpose: 'maskable'
          // }
        ],
      }),
    ],

    module: {
      rules: [
        // CSS Loaders
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        // Babel
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};
