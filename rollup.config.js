import compiler from '@ampproject/rollup-plugin-closure-compiler'
import multiEntry from 'rollup-plugin-multi-entry'
import pkg from './package.json'

export default {
  input: ['lib/index.js', 'lib/pipeable/*.js'],
  output: [{
    file: pkg.main,
    format: 'cjs',
  }, {
    file: pkg.module,
    format: 'es',
  }, {
    file: pkg.browser,
    format: 'umd',
    name: 'Itrabble',
  }],
  plugins: [
    multiEntry(),
    compiler(),
  ]
};
