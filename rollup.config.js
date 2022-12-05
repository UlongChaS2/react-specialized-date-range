import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import { babel } from '@rollup/plugin-babel'
import pkg from './package.json'
import json from '@rollup/plugin-json'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'
import cssimport from 'postcss-import'
import autoprefixer from 'autoprefixer'

const extensions = ['.js', '.jsx', '.ts', '.tsx', '.scss']

process.env.BABEL_ENV = 'production'

export default [
  {
    input: './src/index.ts',
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
      babel({
        extensions,
        exclude: 'node_modules/**',
        presets: ['@babel/preset-react'],
        include: ['src/**/*'],
        babelHelpers: 'bundled',
      }),
      postcss({
        plugins: [cssimport(), autoprefixer()],
        extract: true,
        modules: true,
      }),
      resolve({ extensions }),
      typescript(),
      terser(),
    ],
  },
]
