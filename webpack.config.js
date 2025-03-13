/*
 * @license
 * Copyright 2023 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License
 */
import CopyPlugin from 'copy-webpack-plugin';
import * as sass from 'sass';

export default {
  entry: {
    'components-bundle': './client/components.js',
    'styles-bundle': './client/style.scss',
  },
  mode: 'production',
  output: {
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'bundle.css',
            },
          },
          { loader: 'extract-loader' },
          { loader: 'css-loader' },
          {
            loader: 'sass-loader',
            options: {
              implementation: sass,
              webpackImporter: true,
              sassOptions: {
                includePaths: ['./node_modules'],
              },
            },
          },
        ],
      },
      {
        test: /components\.js$/,
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "./client/client.js", to: "./client-bundle.js" },
      ],
    }),
  ],
};
