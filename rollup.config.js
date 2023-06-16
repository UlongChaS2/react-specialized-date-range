import { babel } from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import replace from '@rollup/plugin-replace'
import postcss from 'rollup-plugin-postcss'
import cssimport from 'postcss-import'
import autoprefixer from 'autoprefixer'
import pkg from './package.json'
import json from '@rollup/plugin-json'
const extensions = ['.js', '.jsx', '.ts', '.tsx']
process.env.NOTE_ENV = 'production'

import polyfills from 'rollup-plugin-node-polyfills'
export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    json(),
    commonjs(),
    postcss({
      plugins: [cssimport(), autoprefixer()],
      use: ['sass'],
      config: { path: './postcss.config' },
    }),
    resolve({
      extensions,
      fallback: {
        // http: require.resolve('stream-http'),
        // https: require.resolve('https-browserify'),
        // zlib: require.resolve('browserify-zlib'),
        http: false,
        https: false,
        zlib: false,
      },
      preferBuiltins: false,
    }),
    typescript({ useTsconfigDeclarationDir: true, tsconfig: './tsconfig.json' }),
    polyfills(),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**/*.(ts|tsx|js|jsx)',
      include: 'src/**/*.(ts|tsx|js|jsx)',
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.es', '.es6', '.mjs'],
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
  external: ['react', 'react-dom'],
}
