const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  // Entry point
  entry: './src/index.ts',
  
  // Development mode (change to 'production' for release)
  mode: 'development',
  
  // Enable source maps for debugging
  devtool: 'inline-source-map',
  
  // Module rules
  module: {
    rules: [
      {
        // TypeScript files
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  
  // Resolve extensions
  resolve: {
    extensions: ['.ts', '.js', '.json'],
  },
  
  // Output configuration
  output: {
    filename: 'content.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true, // Clean dist folder before build
  },
  
  // Copy static assets
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'manifest.json', to: 'manifest.json' },
        { from: 'styles', to: 'styles' },
        { from: 'icons', to: 'icons' },
      ],
    }),
  ],
};