import pkg from './package.json'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import json from '@rollup/plugin-json'
import commonjs from 'rollup-plugin-commonjs'
import postcss from 'rollup-plugin-postcss'
import cssimport from 'postcss-import'
import autoprefixer from 'autoprefixer'
import resolve from 'rollup-plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'

const extensions = ['.js', '.jsx', '.ts', '.tsx']

process.env.BABEL_ENV = 'production'

export default [
  {
    input: './index.ts',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: pkg.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      json(),
      commonjs({
        include: 'node_modules/**',
      }),
      postcss({
        plugins: [cssimport(), autoprefixer()],
        use: ['sass'],
        config: {
          path: './postcss.config',
        },
      }),
      resolve({ extensions }),
      typescript(),
      terser(),
    ],
  },
]
