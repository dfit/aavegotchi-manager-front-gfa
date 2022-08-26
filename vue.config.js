const { defineConfig } = require('@vue/cli-service')
const webpack = require('webpack');

module.exports = defineConfig({
  transpileDependencies: true
})

module.exports = {
  devServer: {
    hot: true,
    compress: true,
    host: 'localhost',
    port: 8080,
    open: false,
    client: {
      logging: 'warn',
      overlay: {
          warnings: false,
          errors: true
        }
    },
    static: {
      publicPath: '/'
    },
    watchFiles: {
      paths: ['src/**'],
      options: {
        usePolling: false
      }
    }
  }
}

module.exports.configureWebpack = {
  plugins: [
    // Work around for Buffer is undefined:
    // https://github.com/webpack/changelog-v5/issues/10
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ],
  resolve: {
    fallback: {
      crypto: require.resolve('crypto-browserify'),
      util: require.resolve('util'),
      stream: require.resolve('stream-browserify'),
      url: require.resolve('url'),
      https: require.resolve('https-browserify'),
      http: require.resolve('stream-http'),
      assert: require.resolve('assert'),
      os: require.resolve("os-browserify/browser"),
      buffer: require.resolve('buffer')
    }
  }
}
