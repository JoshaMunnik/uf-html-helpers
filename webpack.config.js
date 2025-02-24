import path from 'path';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
import TerserPlugin from 'terser-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  entry: './src/uf-html-helpers.ts',
  mode: 'production', // 'production
  //devtool: 'inline-source-map',
  //devtool: false,
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: 'ts-loader',
        },
        exclude: /node_modules/,
      },
    ],
  },
  resolveLoader: {
    modules: [
      path.join(__dirname, 'node_modules')
    ]
  },
  resolve: {
    extensions: ['.ts', '.js'],
    extensionAlias: {
      '.js': ['.js', '.ts'],
    },
  },
  output: {
    filename: 'uf-html-helpers.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'lib'
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          format: {
            comments: false, // Remove all comments
          },// Disable license.txt files
        },
      }),
    ],
  },
};
